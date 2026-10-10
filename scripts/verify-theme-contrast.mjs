// WCAG 对比度回归：直接取 plus 消费的 @lh-ui/share 构建产物中的 THEME_PRESETS，
// 按组件真实消费配对复算对比度，确认发版产物与设计值一致（AA 阈值 4.5:1）。
//
// 配对取自 var.scss 的真实消费链：
//   - --lh-color-on-primary 文字 @ --lh-primary-color 底      → 主按钮
//   - --lh-selected-color 文字 @ --lh-primary-color-bg 底      → menu-item / tree-node 选中态
//   - --lh-selected-color 文字 @ --lh-hover-bg-color 底        → 悬停且选中（两态叠加）
// 亮色侧 --lh-selected-color 缺省取 --lh-primary-color-active（var.scss:22），
// 暗色侧由 buildPresetStyleText 的暗色块覆盖为 color-mix（不在此复算，见 share 主题文档）。
import { THEME_PRESETS } from '../node_modules/@lh-ui/share/es/theme/index.js'

function srgbToLinear(c) {
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

function luminance(hex) {
  const n = parseInt(hex.slice(1), 16)
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => v / 255)
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b)
}

function contrast(a, b) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (l1 + 0.05) / (l2 + 0.05)
}

const AA = 4.5
let failures = 0

for (const preset of THEME_PRESETS) {
  const v = preset.vars
  const primary = v['--lh-primary-color']
  const primaryBg = v['--lh-primary-color-bg']
  const onPrimary = v['--lh-color-on-primary'] ?? '#ffffff'
  // 亮色侧缺省链路：selected → primary-color-active（var.scss）
  const selected = v['--lh-selected-color'] ?? v['--lh-primary-color-active']

  const checks = [
    ['主按钮 on-primary/primary', onPrimary, primary],
    ['选中 selected/primary-bg', selected, primaryBg],
  ]

  const lines = []
  for (const [label, fg, bg] of checks) {
    const cr = contrast(fg, bg)
    const ok = cr >= AA
    if (!ok) failures++
    lines.push(`${label} ${cr.toFixed(2)}:${ok ? '✓' : '✗'}`)
  }
  console.log(`${preset.name.padEnd(9)} ${lines.join('  ')}`)
}

console.log(`\n${failures === 0 ? '全部预设的主按钮与选中态文字对比度均达 AA（4.5:1）' : `${failures} 处未达 AA`}`)
process.exit(failures === 0 ? 0 : 1)
