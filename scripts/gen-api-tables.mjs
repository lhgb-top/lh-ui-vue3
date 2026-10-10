// EVAL-1 API 表格自动化（方案 A：自研 TS compiler API，无新依赖）
//
// 用法：
//   node scripts/gen-api-tables.mjs --check            全站漂移核对（有漂移时退出码 1）
//   node scripts/gen-api-tables.mjs --fix              重建文档主组件 Props 表（见下）
//   node scripts/gen-api-tables.mjs --markdown=button  打印单个组件的规范化 Props 表
//
// 事实来源（canonical）：
//   - 属性集合 + 类型：packages/components/<name>/src/types.ts 的 LhXxxProps 接口（含 JSDoc）
//   - 默认值：SFC <script setup> 里 withDefaults 的第二个实参（本地/types.ts 常量引用解析成字面量）
//
// --fix 的重建口径（幂等，可反复跑）：
//   - 行序 = types.ts 声明顺序；说明列优先沿用文档现文案（同名多行取第一个非「—」的），
//     缺则回退 types.ts 的 JSDoc；类型列保留文档现写法（展示口径属人工润色，漂移只报不改）；
//     默认值一律与源对齐；文档里源中不存在的「幽灵行」保留在表尾，等人工确认。
//   - 表格单元格内的竖线统一转义为 `\|`。
// R26-LINK：类型/默认值列与页尾「类型定义」章节联动——整格恰为单个类型名（可带 []）或
// LH_ 常量名时，包成 `[`X`](#type-X)` / `[`X`](#const-X)` 页内锚点链接；
// normType/normDefault 在比对前剥掉链接壳，旧表（无链接）与链接态均可通过 --check。
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { getDocAnchors } from './gen-type-docs.mjs'

const require = createRequire(import.meta.url)
const ts = require('typescript')
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PKG_DIR = path.join(root, 'packages/components')
const DOC_DIRS = {
  zh: path.join(root, 'docs/components'),
  en: path.join(root, 'docs/en/components'),
}

const COMPILER_OPTIONS = {
  noEmit: true,
  skipLibCheck: true,
  baseUrl: root,
  target: ts.ScriptTarget.ESNext,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  paths: {
    // core 常量与逻辑已随 @lh-ui/share 发布，moduleResolution: Bundler 直接走 node_modules
    '~/*': ['./packages/*'],
  },
}

function readText(file) {
  return fs.readFileSync(file, 'utf8')
}

// ---------- 类型格式化 ----------

// `(typeof X)[keyof typeof X]` 形态的别名要展开成字面量联合，与文档口径一致。
// 联合别名逐成员递归展开；其余别名用 InTypeAlias 让 checker 打印别名右侧的展开式，
// 避免 typeToString 只打出别名名。
function formatType(checker, type) {
  if (type.aliasSymbol) {
    if (type.flags & ts.TypeFlags.Union) {
      return type.types.map((t) => formatType(checker, t)).join(' | ')
    }
    return checker.typeToString(
      type,
      undefined,
      ts.TypeFormatFlags.InTypeAlias | ts.TypeFormatFlags.NoTruncation,
    )
  }
  return checker.typeToString(type, undefined, ts.TypeFormatFlags.NoTruncation)
}

function getJsDocText(source, node) {
  const ranges = ts.getLeadingCommentRanges(source.getFullText(), node.getFullStart()) || []
  const parts = []
  for (const r of ranges) {
    const raw = source.getFullText().slice(r.pos, r.end)
    const m = raw.match(/\/\*\*([\s\S]*?)\*\//)
    if (m) parts.push(m[1].split('\n').map((l) => l.replace(/^\s*\*\s?/, '').trim()).filter(Boolean).join(' '))
  }
  return parts.join(' ')
}

// 收集一份源码里顶层「名字 = 对象字面量」的常量表，用于解析 LH_X_CONST.foo 形态的默认值
function collectConstObjects(source, map) {
  for (const st of source.statements) {
    if (ts.isVariableStatement(st)) {
      for (const d of st.declarationList.declarations) {
        if (ts.isIdentifier(d.name) && d.initializer && ts.isObjectLiteralExpression(d.initializer)) {
          map.set(d.name.text, d.initializer)
        }
      }
    }
  }
}

// ---------- types.ts：Props 接口 ----------

function parsePropsInterface(file, componentName) {
  const source = ts.createSourceFile(file, readText(file), ts.ScriptTarget.Latest, true)
  // 可能存在多个 *Props 接口（LhTimelineItemProps 等），优先取与组件同名的
  const names = source.statements
    .filter((st) => ts.isInterfaceDeclaration(st) && st.name.text.endsWith('Props'))
    .map((st) => st.name.text)
  if (names.length === 0) return null
  const exact = `Lh${mainTitle(componentName)}Props`
  return { ifaceName: names.includes(exact) ? exact : names[0], propsCount: 1 }
}

// 在 program 的 SourceFile 里定位接口成员（getTypeAtLocation 要求节点属于 program）
function resolvePropsFromProgram(program, typesFile, ifaceName) {
  const sf = program.getSourceFile(typesFile)
  if (!sf) return null
  let iface
  for (const st of sf.statements) {
    if (ts.isInterfaceDeclaration(st) && st.name.text === ifaceName) {
      iface = st
      break
    }
  }
  if (!iface) return null
  const checker = program.getTypeChecker()
  const props = []
  for (const m of iface.members) {
    if (!ts.isPropertySignature(m) || !m.type) continue
    props.push({
      name: m.name.getText(sf).replace(/^['"]|['"]$/g, ''),
      required: !m.questionToken,
      jsdoc: getJsDocText(sf, m),
      typeResolved: formatType(checker, checker.getTypeAtLocation(m.type)),
    })
  }
  return props
}

// ---------- SFC：withDefaults 默认值 ----------

function parseSfcDefaults(vueFile, typesFile) {
  const scriptMatch = readText(vueFile).match(/<script[^>]*>([\s\S]*?)<\/script>/)
  if (!scriptMatch) return new Map()
  const source = ts.createSourceFile(vueFile, scriptMatch[1], ts.ScriptTarget.Latest, true)

  // SFC 本地常量 + types.ts 常量（withDefaults 常引用 types.ts 里的 LH_X_CONST）
  const consts = new Map()
  collectConstObjects(source, consts)
  const typesSource = ts.createSourceFile(typesFile, readText(typesFile), ts.ScriptTarget.Latest, true)
  collectConstObjects(typesSource, consts)

  function evalInit(node) {
    if (!node) return '—'
    if (ts.isStringLiteral(node)) return `'${node.text}'`
    if (ts.isNumericLiteral(node)) return node.text
    if (node.kind === ts.SyntaxKind.TrueKeyword) return 'true'
    if (node.kind === ts.SyntaxKind.FalseKeyword) return 'false'
    if (ts.isIdentifier(node) && node.text === 'undefined') return '—'
    if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression)) {
      const obj = consts.get(node.expression.text)
      const prop = obj?.properties.find(
        (p) => ts.isPropertyAssignment(p) && p.name.getText(source) === node.name.text,
      )
      if (prop) return evalInit(prop.initializer)
    }
    return node.getText(source)
  }

  const defaults = new Map()
  for (const st of source.statements) {
    if (!ts.isVariableStatement(st)) continue
    for (const d of st.declarationList.declarations) {
      if (!d.initializer || !ts.isCallExpression(d.initializer)) continue
      if (d.initializer.expression.getText(source) !== 'withDefaults') continue
      const arg = d.initializer.arguments[1]
      if (arg && ts.isObjectLiteralExpression(arg)) {
        for (const p of arg.properties) {
          if (ts.isPropertyAssignment(p)) {
            defaults.set(p.name.getText(source), evalInit(p.initializer))
          }
        }
      }
    }
  }
  return defaults
}

// ---------- 汇总每个组件的 canonical 数据 ----------

function collectComponents() {
  const out = []
  for (const dir of fs.readdirSync(PKG_DIR, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue
    const name = dir.name
    const typesFile = path.join(PKG_DIR, name, 'src/types.ts')
    const vueFile = path.join(PKG_DIR, name, 'src/index.vue')
    if (!fs.existsSync(typesFile) || !fs.existsSync(vueFile)) continue
    const parsed = parsePropsInterface(typesFile, name)
    if (!parsed || parsed.propsCount === 0) continue

    const program = ts.createProgram([typesFile], COMPILER_OPTIONS)
    const props = resolvePropsFromProgram(program, typesFile, parsed.ifaceName)
    if (!props || props.length === 0) continue

    const defaults = parseSfcDefaults(vueFile, typesFile)
    for (const p of props) {
      if (defaults.has(p.name)) p.default = defaults.get(p.name)
      else if (!p.required) p.default = '—'
      if (!p.jsdoc) p.jsdoc = '—'
    }
    out.push({ name, props })
  }
  return out
}

// ---------- 文档 Props 表解析（转义感知：单元格内 `\|` 不切分） ----------

const HEADER_NAMES = new Set(['属性名', '属性', 'Name', 'Prop', 'Attribute', '参数'])

const pascal = (s) => s.charAt(0).toUpperCase() + s.slice(1)

// date-picker → DatePicker，用于匹配「### DatePicker Props / ## DatePicker API」这类限定标题
const mainTitle = (name) => name.split('-').map(pascal).join('')

// 一行 4 列表格 → 去掉首尾管道后按未转义竖线切分；不是表格行返回 null
function splitRow(line) {
  const m = line.trim().match(/^\|(.+)\|$/)
  if (!m) return null
  return m[1].split(/(?<!\\)\|/).map((c) => c.trim())
}

function splitSections(lines) {
  const sections = []
  let cur = { title: '', start: 0, lines: [] }
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const m = line.match(/^(#{1,6})\s+(.*?)\s*$/)
    if (m) {
      sections.push(cur)
      cur = { title: m[2], start: i, lines: [] }
    } else {
      cur.lines.push(line)
    }
  }
  sections.push(cur)
  return sections
}

// 从一段内容里解析主 Props 表：返回 { rows, headerIdx, sepIdx }，rows 为原始单元格数组
function parsePropsRows(lines) {
  let headerIdx = -1
  const rows = []
  for (let i = 0; i < lines.length; i++) {
    const cells = splitRow(lines[i])
    if (!cells) {
      if (rows.length) break
      continue
    }
    if (rows.length === 0) {
      if (headerIdx === -1) {
        if (cells.length === 4 && HEADER_NAMES.has(cells[0].replace(/`/g, ''))) {
          headerIdx = i
        }
        continue
      }
      if (/^:?-{3,}/.test(cells[0])) continue
    }
    if (cells.length !== 4) break
    rows.push(cells)
  }
  return headerIdx === -1 ? null : { rows, headerIdx }
}

// 页面里可能有多张 Props 表（LhForm / LhFormItem 等），取属于主组件的那张：
// 标题形态「Props」「API」「LhXxx Props」「DatePicker API」等；精确匹配优先，
// 前缀匹配（LhLoadingMask → loading）兜底
function findDocPropsSection(mdFile, componentName) {
  const sections = splitSections(readText(mdFile).split(/\r?\n/))
  const main = mainTitle(componentName).toLowerCase()
  let fallback = null
  for (const sec of sections) {
    const qualified = sec.title.match(/^(?:Lh)?([\w-]+)\s+(Props|API)$/i)
    let exact
    let matches
    if (qualified) {
      const name = qualified[1].replace(/-/g, '').toLowerCase()
      exact = name === main
      // 前缀匹配兜底（LhLoadingMask → loading），精确匹配优先
      matches = exact || name.startsWith(main)
    } else {
      matches = /^(Props|API)$/i.test(sec.title)
      exact = matches
    }
    if (!matches) continue
    const parsed = parsePropsRows(sec.lines)
    if (parsed) {
      if (exact) return { sec, ...parsed }
      if (!fallback) fallback = { sec, ...parsed }
    }
  }
  return fallback
}

// ---------- 归一化 ----------

// 行名归一化：去反引号、kebab → camel、v-model 别名 → modelValue、v-model:x → x
function normPropName(raw) {
  let name = raw.replace(/`/g, '').replace(/\\\|/g, '|').trim()
  const vmColon = name.match(/^v-model[:：](.+)$/)
  if (vmColon) return normPropName(vmColon[1])
  if (/^(v-model|model-value|modelValue)(\s*\/\s*(v-model|model-value))?$/i.test(name)) return 'modelValue'
  return name.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
}

// 默认值归一化：去反引号与空白、剥工厂函数前缀、空串/undefined/— 归并为 —、剥文档尾注「0（不折叠）」
// R26-LINK：比对前剥掉锚点链接壳 `[inner](#...)` → inner（链接是展示态，不参与漂移判定）
function normDefault(raw) {
  let s = (raw ?? '').replace(/\[([^\]]+)\]\(#[^)]*\)/g, '$1').replace(/`/g, '').replace(/\\\|/g, '|').trim()
  s = s.replace(/[(（][^)）]*[)）]\s*$/, '')
  s = s.replace(/^\(\)\s*=>\s*/, '')
  if (s === '' || s === '—' || s === '-' || s === 'undefined' || s === "''" || s === '""') return '—'
  return s.replace(/\s+/g, '')
}

const normType = (s) =>
  (s ?? '')
    .replace(/\[([^\]]+)\]\(#[^)]*\)/g, '$1')
    .replace(/`/g, '')
    .replace(/\\\|/g, '|')
    .replace(/\s+/g, '')
    .replace(/"/g, "'")
    // checker 把 Record<string, X> 打成索引签名对象字面量，归一到 Record 形态
    .replace(/\{\[x:(string|number)\]:([^;}]+);?\}/g, 'Record<$1,$2>')
    // 联合类型比较顺序无关
    .split('|').sort().join('|')

const escapePipe = (s) => s.replace(/(?<!\\)\|/g, '\\|')

// ---------- 锚点链接（R26-LINK） ----------

const anchorCache = new Map()
function anchorsOf(component) {
  if (!anchorCache.has(component)) anchorCache.set(component, getDocAnchors(component))
  return anchorCache.get(component)
}

/**
 * 类型/默认值格联动：整格恰为单个类型名（可带 [] 后缀）或 LH_ 常量名时，
 * 包成页内锚点链接跳到页尾「类型定义」章节；复合类型（联合/函数/字面量）保持纯代码。
 */
function linkifyCell(rawText, kind, anchors) {
  const m = rawText.match(/^([A-Z][A-Za-z0-9]*)(\[\])?$/)
  if (m && anchors.has(m[1])) return `\`[${m[1]}](#type-${m[1]})\`${m[2] ?? ''}`
  if (kind === 'default' && /^LH_[A-Z0-9_]+$/.test(rawText) && anchors.has(rawText)) {
    return `\`[${rawText}](#const-${rawText})\``
  }
  return `\`${rawText}\``
}

const isBlank = (cell) => !cell || cell === '—' || cell === '-'

// ---------- 模式 ----------

const args = process.argv.slice(2)
const components = collectComponents()

if (args[0]?.startsWith('--markdown=')) {
  const c = components.find((x) => x.name === args[0].split('=')[1])
  if (!c) {
    console.error(`组件不存在或缺 Props 接口：${args[0].split('=')[1]}`)
    process.exit(1)
  }
  console.log('| 属性名 | 说明 | 类型 | 默认值 |')
  console.log('| --- | --- | --- | --- |')
  for (const p of c.props) {
    const anchors = anchorsOf(c.name)
    const typeCell = linkifyCell(escapePipe(p.typeResolved), 'type', anchors)
    const defCell = p.default === '—' ? '—' : linkifyCell(escapePipe(p.default), 'default', anchors)
    console.log(`| ${p.name} | ${p.jsdoc} | ${typeCell} | ${defCell} |`)
  }
  process.exit(0)
}

if (args[0] === '--fix') {
  const fixes = []
  for (const [lang, dir] of Object.entries(DOC_DIRS)) {
    for (const c of components) {
      const mdFile = path.join(dir, `${c.name}.md`)
      if (!fs.existsSync(mdFile)) continue
      const found = findDocPropsSection(mdFile, c.name)
      if (!found) continue
      const { sec, rows, headerIdx } = found
      const src = new Map(c.props.map((p) => [p.name, p]))

      // 收集文档现文案：同名多行取第一个非空的说明
      const descByName = new Map()
      const ghostLines = []
      for (const cells of rows) {
        const name = normPropName(cells[0])
        if (!src.has(name)) {
          ghostLines.push(`| ${cells.join(' | ')} |`)
          continue
        }
        if (!descByName.has(name) || (isBlank(descByName.get(name)) && !isBlank(cells[1]))) {
          descByName.set(name, cells[1])
        }
      }

      // 重建表体：说明列优先沿用文档现文案；类型列一律与源对齐（展示口径自动化后以源为准）
      const anchors = anchorsOf(c.name)
      const body = c.props.map((p) => {
        const desc = escapePipe(descByName.get(p.name) ?? (p.jsdoc !== '—' ? p.jsdoc : '—'))
        const typeCell = linkifyCell(escapePipe(p.typeResolved ?? '—'), 'type', anchors)
        const defCell = p.default === '—' || p.default == null ? '—' : linkifyCell(escapePipe(p.default), 'default', anchors)
        return `| ${p.name} | ${desc} | ${typeCell} | ${defCell} |`
      })

      const newLines = [
        ...sec.lines.slice(0, headerIdx + 2), // 表头与分隔行之前的内容原样保留
        ...body,
        ...ghostLines,
        ...sec.lines.slice(headerIdx + 2 + rows.length),
      ]
      const text = readText(mdFile)
      const eol = text.includes('\r\n') ? '\r\n' : '\n'
      const allLines = text.split(/\r?\n/)
      // sec.start 是标题行下标，段内容从 sec.start + 1 起整体替换
      allLines.splice(sec.start + 1, sec.lines.length, ...newLines)
      fs.writeFileSync(mdFile, allLines.join(eol))
      fixes.push(`[${lang}] ${c.name}.md：重建 ${c.props.length} 行（幽灵 ${ghostLines.length}）`)
    }
  }
  console.log(fixes.length ? fixes.join('\n') : '无修复。')
  process.exit(0)
}

// --check（默认）：全站漂移核对
let drift = 0
const report = []
for (const [lang, dir] of Object.entries(DOC_DIRS)) {
  for (const c of components) {
    const mdFile = path.join(dir, `${c.name}.md`)
    if (!fs.existsSync(mdFile)) {
      report.push(`[${lang}] ${c.name}.md 缺失`)
      drift++
      continue
    }
    const found = findDocPropsSection(mdFile, c.name)
    if (!found) {
      report.push(`[${lang}] ${c.name}.md 未找到主组件 Props 表`)
      drift++
      continue
    }
    const docNames = new Map()
    for (const cells of found.rows) {
      const name = normPropName(cells[0])
      if (!docNames.has(name)) docNames.set(name, cells)
    }
    for (const p of c.props) {
      const cells = docNames.get(p.name)
      if (!cells) {
        report.push(`[${lang}] ${c.name}.md 缺属性 ${p.name}（类型 \`${p.typeResolved}\`，默认 \`${p.default}\`）`)
        drift++
        continue
      }
      if (p.default !== '—' && normDefault(cells[3]) !== normDefault(p.default)) {
        report.push(`[${lang}] ${c.name}.${p.name} 默认值漂移：文档 \`${cells[3]}\` vs 源 \`${p.default}\``)
        drift++
      }
      const docT = normType(cells[2])
      const srcT = normType(p.typeResolved)
      if (!isBlank(cells[2]) && docT && srcT && docT !== srcT) {
        report.push(`[${lang}] ${c.name}.${p.name} 类型漂移：文档 \`${cells[2]}\` vs 源 \`${p.typeResolved}\``)
        drift++
      }
    }
    for (const [name, cells] of docNames) {
      if (!c.props.some((p) => p.name === name)) {
        report.push(`[${lang}] ${c.name}.md 幽灵属性 ${cells[0]}（types.ts 无此声明）`)
        drift++
      }
    }
  }
}

if (report.length) {
  console.log(report.join('\n'))
}
console.log(`\n核对 ${components.length} 个组件 × ${Object.keys(DOC_DIRS).length} 种语言，漂移 ${drift} 处。`)
process.exit(drift > 0 ? 1 : 0)
