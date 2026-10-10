/**
 * d.ts 冒烟检查
 *
 * rollup-plugin-dts 的解析在依赖缺失时会静默产出残缺声明，CI 里不易察觉。
 * 构建后跑一遍，保证发布的类型可用：
 *   1. es/ 与 lib/ 下存在 .d.ts 产物
 *   2. 声明里的相对 import/export 路径都能落到真实文件（允许 .js/.d.ts 扩展名补全）
 *   3. 裸导入（bare specifier）仅允许 vue —— 出现别的说明 alias 漏接，产物不可用
 *
 * 用法：node scripts/verify-dts.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const resolvePath = (p) => path.resolve(root, p)

// @lh-ui/share 是运行时依赖，其声明随包发布，允许出现在产物里
const ALLOWED_BARE = new Set(['vue', '@lh-ui'])

/** 从一段声明文本里提取所有 import/export ... from '...' 的来源 */
const SPEC_RE = /(?:^|[;\n])\s*(?:import|export)\s[^;]*?\sfrom\s*['"]([^'"]+)['"]/g

function collectSpecifiers(file) {
  const content = fs.readFileSync(file, 'utf8')
  const specs = []
  let match
  while ((match = SPEC_RE.exec(content)) !== null) {
    specs.push(match[1])
  }
  // import 'side-effect' 形式（无 from）
  const SIDE_RE = /(?:^|[;\n])\s*import\s*['"]([^'"]+)['"]/g
  while ((match = SIDE_RE.exec(content)) !== null) {
    specs.push(match[1])
  }
  return specs
}

/** 相对路径声明可能省略扩展名，按 .d.ts -> .js -> 目录/index.d.ts -> 目录/index.js 兜底 */
function resolvesTo(spec, fromFile) {
  const base = path.resolve(path.dirname(fromFile), spec)
  const candidates = [
    base,
    `${base}.d.ts`,
    `${base}.js`,
    `${base}/index.d.ts`,
    `${base}/index.js`,
  ]
  return candidates.some((c) => fs.existsSync(c) && fs.statSync(c).isFile())
}

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry)
    if (fs.statSync(full).isDirectory()) walk(full, acc)
    else if (full.endsWith('.d.ts')) acc.push(full)
  }
  return acc
}

let failures = 0
const report = (msg) => {
  console.error(`  ✗ ${msg}`)
  failures++
}

for (const dir of ['es', 'lib']) {
  const files = walk(resolvePath(dir))
  if (files.length === 0) {
    report(`${dir}/ 下没有任何 .d.ts 产物 —— 构建可能未跑 build:dts`)
    continue
  }

  console.log(`${dir}/: ${files.length} 个声明文件`)
  for (const file of files) {
    const rel = path.relative(root, file)
    for (const spec of collectSpecifiers(file)) {
      if (spec.startsWith('.')) {
        if (!resolvesTo(spec, file)) report(`${rel}: 无法解析的相对路径 "${spec}"`)
      } else {
        const bare = spec.split('/')[0]
        if (!ALLOWED_BARE.has(bare)) {
          report(`${rel}: 出现非白名单裸导入 "${spec}"（alias 可能漏接）`)
        }
      }
    }
  }
}

if (failures === 0) {
  console.log('d.ts 校验通过：路径可解析、无非法裸导入')
  process.exit(0)
}
console.error(`d.ts 校验失败：${failures} 处问题`)
process.exit(1)
