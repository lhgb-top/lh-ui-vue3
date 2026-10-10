/**
 * 样式构建
 *
 * 样式唯一源是 @lh-ui/share（红线 2）：本仓库不再持有任何组件 scss，
 * 输入统一取自已安装的 share 包，产物路径保持不变：
 *   - theme/index.css             主题变量
 *   - dist/index.css              主题 + 全部组件样式（文档指南引用）
 *   - dist/<name>/style.css       单组件样式（文档按需引入引用）
 *   - es|lib/<name>/style/index.css  构建产物内的组件样式
 *
 * 组件清单仍按 packages/components 扫描：share 的 styles 与本仓库组件一一对应，
 * 但只有本仓库真实存在的组件才需要产物（避免孤儿输出）。
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as sass from 'sass'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const resolvePath = (p) => path.resolve(root, p)

function writeFile(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, content, 'utf8')
}

async function compile(input) {
  const result = await sass.compileAsync(input, {
    style: 'expanded',
    loadPaths: [resolvePath('node_modules')],
    silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin'],
  })
  return result.css
}

function getComponentNames() {
  const dir = resolvePath('packages/components')
  return fs
    .readdirSync(dir)
    .filter((name) => fs.statSync(path.join(dir, name)).isDirectory())
}

const componentNames = getComponentNames()

// 样式源统一来自 @lh-ui/share（styles/ 是唯一源，本仓库不持有组件 scss）
const shareStyles = resolvePath('node_modules/@lh-ui/share/styles')

// 1. 主题变量
const themeCss = await compile(path.join(shareStyles, 'theme/index.scss'))
writeFile(resolvePath('theme/index.css'), themeCss)
writeFile(resolvePath('dist/index.css'), themeCss)

// 2. 单组件样式
const componentCss = []
for (const name of componentNames) {
  const input = path.join(shareStyles, `${name}/index.scss`)
  if (!fs.existsSync(input)) continue

  const css = await compile(input)
  componentCss.push(css)

  writeFile(resolvePath(`dist/${name}/style.css`), css)
  writeFile(resolvePath(`es/${name}/style/index.css`), css)
  writeFile(resolvePath(`lib/${name}/style/index.css`), css)

  // scss 源文件随 es 产物分发：npm files 不支持通配符（packages/components/*/style 不生效），
  // 拷到这里让 `@lh-ui/vue3/style/<name>` 子路径导出始终可用，新增组件自动覆盖。
  // share 源里的 @use 是相对路径（'../theme/common/index.scss'），在 es/<name>/style/ 下会指错，
  // 改写为 bare specifier，下游 sass 配 node_modules loadPaths 即可解析
  const scssSource = fs.readFileSync(input, 'utf8').replace(
    /@use\s+['"]\.\.\/theme\/common\/index\.scss['"]/g,
    "@use '@lh-ui/share/styles/theme/common/index.scss'",
  )
  writeFile(resolvePath(`es/${name}/style/index.scss`), scssSource)
}

// 3. 全量样式（主题 + 组件）
writeFile(
  resolvePath('dist/index.css'),
  `${themeCss}\n${componentCss.join('\n')}`,
)

// 4. 嵌套 package.json：声明产物目录的模块类型
// 根 package.json 不含 "type" 字段，es/*.js 会被 Node 按 CJS 解释导致 ESM 产物不可用。
// 在产物目录内放嵌套声明，既修正模块类型，又不污染源码目录、不影响 dist/ 的 UMD 产物。
writeFile(resolvePath('es/package.json'), JSON.stringify({ type: 'module' }, null, 2) + '\n')
writeFile(resolvePath('lib/package.json'), JSON.stringify({ type: 'commonjs' }, null, 2) + '\n')

console.log(
  `styles built: theme + ${componentNames.length} components -> theme/, dist/, es/, lib/`,
)
