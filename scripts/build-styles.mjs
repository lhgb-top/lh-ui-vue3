/**
 * 样式构建
 *
 * rollup-plugin-scss 不支持 outputDir（会被静默忽略），
 * 旧配置因此只产出空文件，真实样式被塞进 assets/output-<hash>.css。
 * 这里改用 sass 官方 API 直接编译，产物路径与文档一致：
 *   - theme/index.css             主题变量
 *   - dist/index.css              主题 + 全部组件样式（文档指南引用）
 *   - dist/<name>/style.css       单组件样式（文档按需引入引用）
 *   - es|lib/<name>/style/index.css  构建产物内的组件样式
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

// 1. 主题变量
const themeCss = await compile(resolvePath('packages/theme/src/index.scss'))
writeFile(resolvePath('theme/index.css'), themeCss)
writeFile(resolvePath('dist/index.css'), themeCss)

// 2. 单组件样式
const componentCss = []
for (const name of componentNames) {
  const input = resolvePath(`packages/components/${name}/style/index.scss`)
  if (!fs.existsSync(input)) continue

  const css = await compile(input)
  componentCss.push(css)

  writeFile(resolvePath(`dist/${name}/style.css`), css)
  writeFile(resolvePath(`es/${name}/style/index.css`), css)
  writeFile(resolvePath(`lib/${name}/style/index.css`), css)
}

// 3. 全量样式（主题 + 组件）
writeFile(
  resolvePath('dist/index.css'),
  `${themeCss}\n${componentCss.join('\n')}`,
)

console.log(
  `styles built: theme + ${componentNames.length} components -> theme/, dist/, es/, lib/`,
)
