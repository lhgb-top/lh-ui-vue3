import dts from 'rollup-plugin-dts'
import alias from '@rollup/plugin-alias'
import fs from 'fs'
import path from 'path'

const root = process.cwd()
const resolvePath = (relativePath) => path.resolve(root, relativePath)

function getComponentNames() {
  const componentsDir = resolvePath('packages/components')
  if (!fs.existsSync(componentsDir)) return []

  return fs.readdirSync(componentsDir).filter((name) => {
    return fs.statSync(path.join(componentsDir, name)).isDirectory()
  })
}

// external 选项先于插件 resolveId 生效，因此 shim 判定必须放在这里：
// 相对 .vue 且存在配对 .vue.d.ts 时不外置，交给 external-non-script-assets 解析内联
const isExternal = (source, importer) => {
  if (/^vue(?:\/|$)/.test(source) || /\.(s?css|sass|less)$/.test(source)) return true
  // @lh-ui/share 的类型随包发布，声明里保持 bare 引用即可
  if (/^@lh-ui\/share(?:\/|$)/.test(source)) return true
  if (/\.vue$/.test(source)) {
    if (importer && source.startsWith('.')) {
      return !fs.existsSync(path.resolve(path.dirname(importer), `${source}.d.ts`))
    }
    return true
  }
  return false
}

function createDeclarationEntries(input, outputPath) {
  const plugins = [
    alias({
      entries: [
        { find: '~', replacement: resolvePath('packages') },
        { find: 'lh-types', replacement: resolvePath('types') },
        { find: /^types\//, replacement: `${resolvePath('types')}/` },
        { find: 'types', replacement: resolvePath('types') },
        { find: '@lh-ui/vue3', replacement: resolvePath('src/index.ts') },
      ],
    }),
    {
      name: 'external-non-script-assets',
      resolveId(source, importer) {
        // 相对 .vue 说明符：SFC 旁配对的 .vue.d.ts shim 承载组件值类型，解析过去由 dts 内联
        if (source.startsWith('.') && source.endsWith('.vue') && importer) {
          const shim = path.resolve(path.dirname(importer), `${source}.d.ts`)
          if (fs.existsSync(shim)) return shim
        }
        // 声明文件不承载样式，直接外置，避免 dts 解析 CSS/SCSS 失败
        if (source.endsWith('.vue') || /\.(s?css|sass|less)$/.test(source)) {
          return { id: source, external: true }
        }
        return null
      },
    },
    dts(),
  ]

  // 声明文件与模块格式无关，es 与 lib 的 .d.ts 逐字节相同：
  // 只生成 es 一份，closeBundle 时镜像复制到 lib，把 dts program 数量砍半
  // （迁移后每个入口都要解析 @lh-ui/share 的类型图，120 个 program 会在默认堆下 OOM）
  return {
    input: resolvePath(input),
    output: {
      file: resolvePath(`es/${outputPath}.d.ts`),
      format: 'es',
    },
    external: isExternal,
    plugins,
  }
}

// 全部 bundle 落盘后把 es 的声明镜像到 lib（内容一致，无需再跑一遍 rollup-plugin-dts）
const mirrorDeclarationsToLib = {
  name: 'mirror-dts-to-lib',
  closeBundle() {
    const esDir = resolvePath('es')
    for (const file of fs.readdirSync(esDir, { recursive: true })) {
      if (!String(file).endsWith('.d.ts')) continue
      const src = path.join(esDir, String(file))
      const dest = path.join(resolvePath('lib'), String(file))
      fs.mkdirSync(path.dirname(dest), { recursive: true })
      fs.copyFileSync(src, dest)
    }
  },
}

const entries = [
  createDeclarationEntries('src/index.ts', 'index'),
  createDeclarationEntries('src/theme.ts', 'theme/index'),
]

for (const name of getComponentNames()) {
  const input = `packages/components/${name}/index.ts`
  if (fs.existsSync(resolvePath(input))) {
    entries.push(createDeclarationEntries(input, `${name}/index`))
  }
}

// closeBundle 在所有 bundle 之后触发一次，挂到最后一个入口上即可
entries[entries.length - 1].plugins.push(mirrorDeclarationsToLib)

export default entries
