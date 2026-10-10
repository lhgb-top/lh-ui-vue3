/**
 * API 风格配对检查（DOC-APISCRIPT 之后的新基准约定）
 *
 * 基准约定（docs/components/button.md）：
 * - 所有示例一律成对：```vue composition 围栏（<script setup lang="ts">）后必须紧跟 ```vue options 围栏（export default）
 * - 静态示例（模板只含字面量 props）：两块均配空脚本（循 button.md「不同尺寸」先例）
 * - 含状态示例：组合式脚本用类型化 ref，选项式脚本用 data()/methods，状态名与页面级 <script setup> 一致
 * - 不再允许「单个未标记 ```vue 围栏」的纯模板示例
 *
 * 用法：
 *   node scripts/check-api-style-pairs.mjs --check        # 只报告缺口
 *   node scripts/check-api-style-pairs.mjs --fix          # 机械修复：未标记围栏按内容打标
 *   node scripts/check-api-style-pairs.mjs --check-demos  # 报告模式：逐节对比 DemoBlock 实例与围栏代码的属性漂移（不阻断 CI）
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const dirs = [join(root, 'docs', 'components'), join(root, 'docs', 'en', 'components')]

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry)
    return statSync(full).isDirectory() ? walk(full) : [full]
  })
}

const FENCE_RE = /^(```vue[^\n]*)\n([\s\S]*?)^```$/gm

/** 按内容分类围栏：composition / options / neutral（无 script） */
function classify(tag, body) {
  if (tag === 'vue composition') return 'composition'
  if (tag === 'vue options') return 'options'
  if (/<script\s+setup/.test(body)) return 'composition'
  if (/<script>|<script\s+>/.test(body) && /export\s+default/.test(body)) return 'options'
  return 'neutral'
}

const isCheck = process.argv.includes('--check')
const isFix = process.argv.includes('--fix')
let totalGaps = 0
let totalTagged = 0
const pageReports = []

for (const dir of dirs) {
  for (const file of walk(dir).filter((f) => f.endsWith('.md'))) {
    const src = readFileSync(file, 'utf8')
    let working = src
    const fences = [...src.matchAll(FENCE_RE)]
    const gaps = []

    for (let i = 0; i < fences.length; i++) {
      const [full, tagRaw, body] = fences[i]
      const tag = tagRaw.trim().replace(/^```/, '').trim()
      const kind = classify(tag, body)
      const line = src.slice(0, fences[i].index).split('\n').length

      // 机械修复：未标记但内容可判定 → 打标
      if (isFix && tag === 'vue' && kind !== 'neutral') {
        const fixed = full.replace('```vue', `\`\`\`vue ${kind}`)
        working = working.replace(full, fixed)
        totalTagged++
        continue
      }

      // 缺口判定：composition 后未紧跟 options
      if (kind === 'composition') {
        const next = fences[i + 1]
        const nextTag = next ? next[1].trim().replace(/^```/, '').trim() : ''
        if (nextTag !== 'vue options') {
          gaps.push(`L${line} composition 围栏缺 options 对应`)
        }
      }
      // 未标记的 export-default 围栏（打标修复覆盖不到的异常态）
      if (tag === 'vue' && kind === 'options') {
        gaps.push(`L${line} 未标记围栏含 export default（应标 options）`)
      }
      // 未标记的纯模板围栏：新约定要求补 composition/options 成对
      if (tag === 'vue' && kind === 'neutral' && /<template[\s>]/.test(body)) {
        gaps.push(`L${line} 未标记纯模板围栏（应补 composition/options 成对）`)
      }
    }

    if (gaps.length > 0) {
      totalGaps += gaps.length
      pageReports.push(`${file.replace(root, '')}\n  ${gaps.join('\n  ')}`)
    }
    if (isFix && working !== src) writeFileSync(file, working)
  }
}

if (isFix) {
  console.log(`--fix：打标 ${totalTagged} 个未标记围栏（content 判定）`)
}
console.log(pageReports.length > 0 ? pageReports.join('\n') : '')
console.log(
  isCheck || !isFix
    ? `核对 ${dirs.length} 个目录，配对缺口 ${totalGaps} 处。`
    : `核对 ${dirs.length} 个目录，剩余配对缺口 ${totalGaps} 处（需人工/agent 生成 options 变体）。`,
)
if (totalGaps > 0 && isCheck) process.exitCode = 1

// ---------- --check-demos：DemoBlock 实例 ↔ 围栏代码 属性漂移报告（仅报告，不阻断） ----------

if (isCheck && process.argv.includes('--check-demos')) {
  // 提取开标签属性：name="lit" | :name="bind" | @event="cb" | bare。
  // 忽略装饰属性（demo 常加 style/class 包裹布局）。
  const ATTR_RE = /([@:a-zA-Z][\w:.-]*)(?:=(?:"[^"]*"|'[^']*'|\{[^}]*\}))?/g
  const IGNORED_ATTRS = new Set(['style', 'class', 'key'])

  function parseAttrs(tagText) {
    const attrs = {}
    const inner = tagText.replace(/^Lh\w+/, '')
    for (const m of inner.matchAll(ATTR_RE)) {
      const name = m[1]
      if (IGNORED_ATTRS.has(name)) continue
      const raw = m[0]
      let value = true
      if (raw.endsWith('}')) value = raw.slice(raw.indexOf('{') + 1, -1)
      else if (raw.endsWith('"') || raw.endsWith("'")) value = raw.slice(raw.indexOf(raw[raw.length - 1]) + 1, -1)
      attrs[name] = typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : value
    }
    return attrs
  }

  // 比对时归一化：v-model 的绑定名、@事件回调名属页面内自由命名，不构成漂移；
  // 无值的裸布尔属性（disabled、clearable 等）只看“有无”不看值。
  function normalizeAttr(name, value) {
    if (name === 'v-model' || name === 'modelValue' || name === 'v-model:visible') return '$vmodel'
    if (name.startsWith('@') || name.startsWith('on')) return '$event'
    return value === true ? '$bool' : value
  }

  function signature(attrs) {
    return Object.entries(attrs)
      .map(([k, v]) => `${k}=${normalizeAttr(k, v)}`)
      .sort()
      .join('&')
  }

  // 收集一段文本里所有 Lh 组件开标签（支持跨行属性）
  function collectElements(text) {
    const out = []
    const tagRe = /<(Lh[A-Z]\w*)((?:"[^"]*"|'[^']*'|[^"'>])*?)>/g
    for (const m of text.matchAll(tagRe)) {
      out.push({ name: m[1], attrs: parseAttrs(m[2]) })
    }
    return out
  }

  function diffKeys(a, b) {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)])
    const diffs = []
    for (const k of keys) {
      const av = a[k] === undefined ? undefined : normalizeAttr(k, a[k])
      const bv = b[k] === undefined ? undefined : normalizeAttr(k, b[k])
      if (String(av) !== String(bv)) diffs.push(`${k}: demo=${JSON.stringify(a[k] ?? null)} 代码=${JSON.stringify(b[k] ?? null)}`)
    }
    return diffs
  }

  const demoReports = []
  let demoDriftCount = 0

  for (const dir of dirs) {
    for (const file of walk(dir).filter((f) => f.endsWith('.md'))) {
      const src = readFileSync(file, 'utf8')
      const rel = file.replace(root, '')
      // 按 ## 分节，节内对比 DemoBlock 元素与「代表围栏」（composition，无则首个 options）元素
      const headingRe = /^## /gm
      const starts = [...src.matchAll(headingRe)].map((m) => m.index)
      const sections = starts.map((s, i) => {
        const end = i + 1 < starts.length ? starts[i + 1] : src.length
        return src.slice(s, end)
      })

      for (const sec of sections) {
        const title = (sec.match(/^## (.+)/m) || [])[1] || ''
        const demoEls = [...sec.matchAll(/<DemoBlock[^>]*>([\s\S]*?)<\/DemoBlock>/g)].flatMap((m) =>
          collectElements(m[1]),
        )
        const secFences = [...sec.matchAll(FENCE_RE)]
        // 代表围栏 = composition（配对约定的主代码侧）；无 composition 时退回首个 options
        const repFences = secFences.filter((m) => classify(m[1], m[2]) === 'composition')
        if (repFences.length === 0 && secFences.length > 0) repFences.push(secFences[0])
        const fenceEls = repFences.flatMap((m) =>
          collectElements((m[2].match(/<template[\s\S]*<\/template>/) || [''])[0]),
        )

        if (demoEls.length === 0 && fenceEls.length === 0) continue

        const issues = []
        if (demoEls.length > 0 && secFences.length === 0) {
          issues.push('本节有 DemoBlock 实例但没有代码围栏')
        }
        if (demoEls.length === 0 && fenceEls.length > 0) {
          issues.push('本节只有代码围栏没有 DemoBlock 实例（孤儿代码节）')
        }

        // 按组件分组做有消耗的贪心匹配：精确签名优先，其次最小差异
        const names = new Set([...demoEls.map((e) => e.name), ...fenceEls.map((e) => e.name)])
        for (const name of names) {
          const demos = demoEls.filter((e) => e.name === name)
          const fences = fenceEls.filter((e) => e.name === name)
          const fenceUsed = new Set()
          for (const de of demos) {
            const sig = signature(de.attrs)
            let best = fences.findIndex((fe, i) => !fenceUsed.has(i) && signature(fe.attrs) === sig)
            if (best === -1 && fences.length > fenceUsed.size) {
              let bestScore = Infinity
              fences.forEach((fe, i) => {
                if (fenceUsed.has(i)) return
                const score = diffKeys(de.attrs, fe.attrs).length
                if (score < bestScore) {
                  bestScore = score
                  best = i
                }
              })
              issues.push(`${name} 属性漂移 → ${diffKeys(de.attrs, fences[best].attrs).join('；') || '仅顺序不同'}`)
            } else if (best === -1) {
              issues.push(`demo 的 <${name}> 在代码围栏中无对应行`)
            }
            if (best !== -1) fenceUsed.add(best)
          }
          fences.forEach((_, i) => {
            if (!fenceUsed.has(i)) issues.push(`代码围栏中的 <${name}> 在 DemoBlock 实例中无对应（孤儿代码行）`)
          })
        }

        if (issues.length > 0) {
          demoDriftCount += issues.length
          demoReports.push(`${rel}〔${title}〕\n  ${issues.join('\n  ')}`)
        }
      }
    }
  }
  console.log(demoReports.length > 0 ? `\n${demoReports.join('\n')}` : '\n各节 DemoBlock 实例与围栏代码一致。')
  console.log(`--check-demos：${demoDriftCount} 处漂移（报告模式，不阻断）。`)
}
