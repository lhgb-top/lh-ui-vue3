/**
 * 私有 registry 打包脚本
 *
 * 把同一份构建产物以私有包名 `@lhgb/vue3` 打包，并伪造 npm registry
 * 元数据 JSON，让 Nginx 静态目录当一个只读 registry：
 *
 *   private-registry/
 *   ├── @lhgb/vue3              # 元数据 JSON（无扩展名，Nginx 强制 application/json）
 *   └── tarballs/@lhgb/vue3/
 *       └── lhgb-vue3-<version>.tgz
 *
 * 客户端在 .npmrc 写 `@lhgb:registry=https://www.lhgb.top/lhgb` 后即可
 * `pnpm add @lhgb/vue3`，走标准版本解析与 dist-tags，与公共包
 * `@lh-ui/vue3` 同源同版本，仅 name / registry 不同。
 *
 * 用法：
 *   node scripts/pack-private.mjs              # 构建后执行，产出 private-registry/
 *   node scripts/pack-private.mjs --dry-run    # 只打印将生成的清单，不落盘
 *   node scripts/pack-private.mjs --incremental  # 读已有元数据，合并新版本
 */
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const resolvePath = (p) => path.resolve(root, p)

const PRIVATE_NAME = '@lhgb/vue3'
const PRIVATE_REGISTRY = 'https://www.lhgb.top/lhgb'
const OUT_DIR = resolvePath('private-registry')
const STAGE_DIR = resolvePath('private-dist')

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const incremental = args.includes('--incremental')

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

function writeJson(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8')
}

function hashTarball(file) {
  const buf = fs.readFileSync(file)
  const sha512 = crypto.createHash('sha512').update(buf).digest('base64')
  const sha1 = crypto.createHash('sha1').update(buf).digest('hex')
  return { integrity: `sha512-${sha512}`, shasum: sha1 }
}

function main() {
  const pkg = readJson(resolvePath('package.json'))

  if (pkg.name !== '@lh-ui/vue3') {
    throw new Error(`意外：package.json 的 name 是 ${pkg.name}，本脚本假定公共包名为 @lh-ui/vue3`)
  }

  const version = pkg.version
  const publishFields = [
    'es',
    'lib',
    'dist',
    'main',
    'module',
    'types',
    'unpkg',
    'jsdelivr',
    'exports',
    'files',
    'sideEffects',
    'peerDependencies',
    'engines',
    'dependencies',
    'description',
    'license',
    'author',
    'keywords',
  ]

  // 1. 生成临时发布目录：改 name 与 publishConfig，其余发布相关字段原样保留
  const staged = {
    name: PRIVATE_NAME,
    version,
    publishConfig: { access: 'restricted', registry: PRIVATE_REGISTRY },
  }
  for (const key of publishFields) {
    if (key in pkg) staged[key] = pkg[key]
  }

  const tarName = `lhgb-vue3-${version}.tgz`
  const metaFile = path.join(OUT_DIR, PRIVATE_NAME)
  // tarball 与元数据文件不能同名同目录（文件系统不允许 @lhgb/vue3 文件与 @lhgb/vue3/ 目录并存），
  // tarball 单独放 tarballs/ 子目录，URL 仍在 registry 根下
  const tarDest = path.join(OUT_DIR, 'tarballs', PRIVATE_NAME, tarName)
  const tarUrl = `${PRIVATE_REGISTRY}/tarballs/${PRIVATE_NAME}/${tarName}`

  if (dryRun) {
    console.log('[dry-run] 将生成的 registry 元数据与 tarball：\n')
    console.log(`  ${path.relative(root, metaFile)}`)
    console.log(`  ${path.relative(root, tarDest)}\n`)
    console.log('  元数据关键字段：')
    console.log(`    name:       ${PRIVATE_NAME}`)
    console.log(`    version:    ${version}`)
    console.log(`    tarball:    ${tarUrl}`)
    console.log(`    dist-tags:  { "latest": "${version}" }`)
    console.log(`    integrity:  <待打包后计算>\n`)
    console.log('提示：先执行 pnpm build 产出 es/lib/dist，再跑本脚本。')
    return
  }

  // 2. 临时目录执行 npm pack
  fs.rmSync(STAGE_DIR, { recursive: true, force: true })
  fs.mkdirSync(STAGE_DIR, { recursive: true })
  writeJson(path.join(STAGE_DIR, 'package.json'), staged)

  for (const dir of ['es', 'lib', 'dist']) {
    const src = resolvePath(dir)
    if (fs.existsSync(src)) {
      fs.cpSync(src, path.join(STAGE_DIR, dir), { recursive: true })
    } else {
      console.warn(`警告：${dir}/ 不存在，请先执行 pnpm build`)
    }
  }

  // Windows 上 npm 实际是 npm.cmd，Node 的 CVE-2024-27980 修复后无 shell 时执行 .cmd 会抛
  // EINVAL/ENOENT，必须走 shell；参数全为固定字符串，无注入风险
  execFileSync('npm', ['pack', '--ignore-scripts', '--json'], {
    cwd: STAGE_DIR,
    stdio: ['ignore', 'pipe', 'inherit'],
    shell: true,
  })

  // npm pack 的产物名是 lhgb-vue3-<version>.tgz
  const packed = path.join(STAGE_DIR, tarName)
  if (!fs.existsSync(packed)) {
    throw new Error(`npm pack 未产出预期文件 ${tarName}`)
  }

  // 3. 算 integrity / shasum，拼装 registry 元数据
  const { integrity, shasum } = hashTarball(packed)

  const metadata = incremental && fs.existsSync(metaFile)
    ? readJson(metaFile)
    : {
        _id: PRIVATE_NAME,
        name: PRIVATE_NAME,
        'dist-tags': {},
        versions: {},
      }

  metadata.name = PRIVATE_NAME
  metadata._id = PRIVATE_NAME
  metadata['dist-tags'].latest = version
  const versionDoc = {
    name: PRIVATE_NAME,
    version,
    dist: { tarball: tarUrl, integrity, shasum },
  }
  // 客户端解析依赖树时读 registry 元数据里的依赖声明，而非下载 tarball 后才解析，
  // 因此 peer/运行时依赖/引擎范围也要写进版本文档，否则私服包与公共包在依赖解析阶段不等价
  for (const key of ['dependencies', 'peerDependencies', 'engines']) {
    if (key in staged) versionDoc[key] = staged[key]
  }

  metadata.versions[version] = versionDoc

  // 4. 输出
  // 增量模式保留历史版本 tarball，只覆盖本次产物；非增量模式整体重建输出目录
  if (!incremental) {
    fs.rmSync(OUT_DIR, { recursive: true, force: true })
  }
  fs.mkdirSync(path.dirname(tarDest), { recursive: true })
  fs.copyFileSync(packed, tarDest)
  writeJson(metaFile, metadata)

  fs.rmSync(STAGE_DIR, { recursive: true, force: true })

  console.log(`已生成私有 registry 产物（${version}）：`)
  console.log(`  ${path.relative(root, metaFile)}`)
  console.log(`  ${path.relative(root, tarDest)}`)
  console.log(`  integrity: ${integrity}`)
  console.log(`  shasum:    ${shasum}`)
  console.log(`\n上传 ${OUT_DIR} 下的内容到服务器 Nginx 根目录（见 scripts/nginx-private-registry.conf.example）。`)
}

try {
  main()
} catch (err) {
  console.error(err instanceof Error ? err.message : err)
  process.exitCode = 1
}
