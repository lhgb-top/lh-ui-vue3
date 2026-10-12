/**
 * 从 CHANGELOG.md 提取指定版本的发版说明，输出到 stdout（供 release.yml 的留档
 * 任务生成 GitHub Release / Gitee 发行版正文）。
 *
 * CHANGELOG 只增不减，master 上含全部历史版本段落；找不到段落时（如 1.0.0 首发
 * 走手动发布、未跑 changeset version）输出兜底说明，不让留档任务失败。
 *
 * 用法：node scripts/release-notes.mjs <version>
 */
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const version = process.argv[2]

if (!version) {
  console.error('[release-notes] 缺少版本参数，用法：node scripts/release-notes.mjs <version>')
  process.exit(1)
}

function fallback(reason) {
  return [
    `# @lh-ui/vue3@${version}`,
    '',
    reason,
    '',
    `- npm：https://www.npmjs.com/package/@lh-ui/vue3/v/${version}`,
    '- 完整变更历史见仓库 CHANGELOG.md',
  ].join('\n')
}

let changelog
try {
  changelog = readFileSync(join(root, 'CHANGELOG.md'), 'utf8')
} catch {
  console.log(fallback('CHANGELOG.md 尚不存在，本版本走手动发布流程，无 changeset 记录。'))
  process.exit(0)
}

const lines = changelog.split('\n')
const start = lines.findIndex((line) => line.trim() === `## ${version}`)
if (start === -1) {
  console.log(
    fallback(
      `CHANGELOG.md 中没有 ${version} 的段落（该版本未跑 changeset version），全部改动见 git 历史与 npm 包内容。`,
    ),
  )
  process.exit(0)
}

// 到下一个二级标题（## x.y.z）为止；### Minor Changes 这类三级标题不匹配
let end = lines.findIndex((line, i) => i > start && /^## /.test(line))
if (end === -1) end = lines.length

console.log(lines.slice(start, end).join('\n').trimEnd())
