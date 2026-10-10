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

  return [
    {
      input: resolvePath(input),
      output: {
        file: resolvePath(`es/${outputPath}.d.ts`),
        format: 'es',
      },
      external: isExternal,
      plugins,
    },
    {
      input: resolvePath(input),
      output: {
        file: resolvePath(`lib/${outputPath}.d.ts`),
        format: 'es',
      },
      external: isExternal,
      plugins,
    },
  ]
}

const entries = [
  ...createDeclarationEntries('src/index.ts', 'index'),
  ...createDeclarationEntries('src/theme.ts', 'theme/index'),
]

for (const name of getComponentNames()) {
  const input = `packages/components/${name}/index.ts`
  if (fs.existsSync(resolvePath(input))) {
    entries.push(...createDeclarationEntries(input, `${name}/index`))
  }
}

export default entries
