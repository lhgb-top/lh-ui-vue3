import { readFileSync, writeFileSync } from 'fs'
import { resolve, join } from 'path'

const docsDir = resolve(import.meta.dirname, '..', 'docs', 'components')
const filesToCheck = [
  'avatar', 'badge', 'button', 'cascader', 'checkbox', 'config-provider',
  'date-picker', 'descriptions', 'dialog', 'form', 'icon', 'input-number',
  'input', 'progress', 'radio', 'select', 'slider', 'statistic', 'switch',
  'tag', 'time-picker', 'tooltip',
]

let report = []

for (const file of filesToCheck) {
  const filePath = join(docsDir, `${file}.md`)
  try {
    let content = readFileSync(filePath, 'utf-8')
    let changed = false

    // === FIX 1: Replace section headers with code block tags ===
    // "## Composition API\n\n```vue" → "```vue composition"
    const compHeaderMatches = content.match(/## Composition API\s*\n+```vue\b/gi)
    if (compHeaderMatches) {
      content = content.replace(/## Composition API\s*\n+```vue/gi, '```vue composition')
      changed = true
    }

    // "## Options API\n\n```vue" → "```vue options"
    const optHeaderMatches = content.match(/## Options API\s*\n+```vue\b/gi)
    if (optHeaderMatches) {
      content = content.replace(/## Options API\s*\n+```vue/gi, '```vue options')
      changed = true
    }

    // === FIX 2: Tag unmarked code blocks ===
    // ```vue  followed by <script setup → ```vue composition
    content = content.replace(/^```vue\s*$\n\s*<script setup[^\n]*>/gm, m => {
      return m.replace('```vue', '```vue composition')
    })
    changed = true

    // ```vue followed by <script>\n...export default → ```vue options
    content = content.replace(/^```vue\s*$\n\s*<script>)(\s*\n\s*export default)/gm,
      m => m.replace('```vue', '```vue options')
    )
    changed = true

    // ```vue followed by import { ... } from → ```vue composition
    content = content.replace(/^```vue\s*$\n\s*import \{[^}]*\} from/gm,
      m => m.replace('```vue', '```vue composition')
    )
    changed = true

    // === FIX 3: Add missing options API pair after each composition block ===
    // Match a complete ```vue composition block and check if followed by ```vue options
    // This is complex, so we use a simpler approach: add options after composition blocks
    // that don't have a matching options block

    // Pattern: ```vue composition ... ``` \n\n ```vue options
    // If composition is NOT followed by options, insert the options version
    content = content.replace(
      /(```vue composition\n[\s\S]*?\n```)\n\n((?!```vue options)[\s\S]*)/g,
      (match, _compBlock, following) => {
        // Check if the next block is already a ```vue options
        if (following.trimStart().startsWith('```vue options')) return match
        // Auto-generation of options blocks is not implemented yet
        return match // Don't auto-generate, just report
      }
    )

    writeFileSync(filePath, content, 'utf-8')
    
    const compCount = (content.match(/^```vue composition/gm) || []).length
    const optCount = (content.match(/^```vue options/gm) || []).length
    const totalVue = (content.match(/^```vue\b/gm) || []).length
    
    if (compCount > 0 && optCount === 0) {
      report.push(`⚠️  ${file}.md: ${compCount} composition blocks, 0 options — NEEDS MANUAL OPTIONS PAIR`)
    } else if (compCount > 0 && optCount > 0) {
      report.push(`✅ ${file}.md: ${compCount} composition + ${optCount} options`)
    } else if (totalVue > 0 && compCount === 0) {
      report.push(`ℹ️  ${file}.md: ${totalVue} template-only blocks (no API style needed)`)
    }
    if (changed) {
      report[report.length - 1] += ' [format fixed]'
    }
  } catch (e) {
    report.push(`❌ ${file}.md error: ${e.message}`)
  }
}

console.log('\n=== Doc API Style Report ===\n')
report.forEach(r => console.log(r))
console.log('\n⚠️  Files marked "NEEDS MANUAL OPTIONS PAIR" need their matching ```vue options blocks added manually.')