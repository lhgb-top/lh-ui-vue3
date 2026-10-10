/**
 * 诊断脚本：找出文档页 DemoBlock 中使用、但页面缺少 <script setup> 声明的标识符。
 * 仅用于一次性审计，不参与构建。
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()

function walk(dir) {
  return fs.readdirSync(dir).flatMap((f) => {
    const p = path.join(dir, f)
    return fs.statSync(p).isDirectory() ? walk(p) : p.endsWith('.md') ? [p] : []
  })
}

function analyze(file) {
  const src = fs.readFileSync(file, 'utf8')
  const noCode = src.replace(/```[\s\S]*?```/g, '')
  const hasPageScript = /<script setup[\s\S]*?<\/script>/.test(noCode)
  // DemoBlock 区域使用的标识符
  const used = new Set()
  // v-for 循环变量与插槽作用域变量是模板局部量，不是页面状态
  const locals = new Set()
  const patterns = [
    /v-model(?::[\w-]+)?="([\w.]+)"/g,
    /@[\w.]+="(\w+)\s*=/g,
    /:(?:value|model-value|visible|show|disabled|loading|content|title|max|min|step|options|format)="(\w+)"/g,
    /\{\{\s*(\w+)(?:\.|\s|\})/g,
  ]
  const localPatterns = [
    /v-for="([\w,\s]+)\s+(?:in|of)\s+/g,
    /(?:#\w+|v-slot)="?\{([^}"]+)\}/g,
  ]
  for (const re of localPatterns) {
    let m
    while ((m = re.exec(noCode))) m[1].split(/[,\s]+/).forEach((s) => /^\w+$/.test(s) && locals.add(s))
  }
  for (const re of patterns) {
    let m
    while ((m = re.exec(noCode))) {
      const id = m[1].split('.')[0]
      if (!locals.has(id)) used.add(id)
    }
  }

  // composition 代码块 script 部分中的声明
  const declared = new Map()
  const vueImports = new Set()
  const collectDecls = (script) => {
    const importVue = script.match(/import\s*\{([^}]+)\}\s*from\s*['"]vue['"]/)
    if (importVue) importVue[1].split(',').forEach((s) => vueImports.add(s.trim()))
    for (const m of script.matchAll(/^const (\w+) = (ref|reactive|computed|shallowRef)(?:<[^>(]*>)?\(/gm)) {
      declared.set(m[1], m[2])
    }
    for (const m of script.matchAll(/^const (\w+) =$/gm)) {
      declared.set(m[1], 'expr')
    }
    for (const m of script.matchAll(/^const (\w+) = \[/gm)) {
      declared.set(m[1], 'array')
    }
    for (const m of script.matchAll(/^function (\w+)/gm)) {
      declared.set(m[1], 'function')
    }
  }
  const fences = [...src.matchAll(/```vue composition([\s\S]*?)```/g)].map((m) => m[1])
  for (const f of fences) {
    const scriptMatch = f.match(/<script setup[^>]*>([\s\S]*?)<\/script>/)
    if (scriptMatch) collectDecls(scriptMatch[1])
  }
  // 页面级 <script setup> 的声明（DemoBlock 实时演示依赖它）
  const pageScriptMatch = noCode.match(/<script setup[^>]*>([\s\S]*?)<\/script>/)
  if (pageScriptMatch) collectDecls(pageScriptMatch[1])

  const missing = [...used].filter(
    (id) =>
      !declared.has(id) &&
      !['true', 'false', 'null', 'undefined', 'JSON', 'Math', 'String', 'Number', 'Date'].includes(id) &&
      !/^[\d.]+$/.test(id),
  )
  return { hasPageScript, used: [...used], declared: [...declared.keys()], vueImports: [...vueImports], missing }
}

const files = [...walk(path.join(ROOT, 'docs/components')), ...walk(path.join(ROOT, 'docs/en/components'))]
let affected = 0
for (const file of files) {
  const r = analyze(file)
  if (r.used.length === 0) continue
  if (r.hasPageScript) {
    if (r.missing.length > 0) {
      affected++
      console.log(`[PAGE MISSING] ${file}`)
      console.log(`               MISSING: ${r.missing.join(', ')}`)
    }
    continue
  }
  // 模板只引用字面量/局部量（missing 为空）时不需要页面级 script
  if (r.missing.length === 0) continue
  affected++
  console.log(`[NO SCRIPT ] ${file}`)
  console.log(`            declared in fences: ${r.declared.join(', ') || '(none)'}`)
  console.log(`            MISSING: ${r.missing.join(', ')}`)
}
console.log(`\nAffected pages: ${affected}`)
