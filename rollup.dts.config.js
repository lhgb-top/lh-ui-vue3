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

function createDeclarationEntries(input, outputPath) {
  const plugins = [
    alias({
      entries: [
        { find: '~', replacement: resolvePath('packages') },
        { find: 'lh-constants', replacement: resolvePath('packages/constants') },
        { find: /^types\//, replacement: `${resolvePath('types')}/` },
        { find: 'types', replacement: resolvePath('types') },
        { find: '@lh-ui/core', replacement: resolvePath('packages/core') },
      ],
    }),
    {
      name: 'external-non-script-assets',
      resolveId(source) {
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
      external: [/\.vue$/, /\.(s?css|sass|less)$/, /^vue(?:\/|$)/],
      plugins,
    },
    {
      input: resolvePath(input),
      output: {
        file: resolvePath(`lib/${outputPath}.d.ts`),
        format: 'es',
      },
      external: [/\.vue$/, /\.(s?css|sass|less)$/, /^vue(?:\/|$)/],
      plugins,
    },
  ]
}

const entries = [
  ...createDeclarationEntries('src/index.ts', 'index'),
  ...createDeclarationEntries('packages/constants/index.ts', 'constants/index'),
  ...createDeclarationEntries('packages/locales/index.ts', 'locale/index'),
]

for (const name of getComponentNames()) {
  const input = `packages/components/${name}/index.ts`
  if (fs.existsSync(resolvePath(input))) {
    entries.push(...createDeclarationEntries(input, `${name}/index`))
  }
}

export default entries
