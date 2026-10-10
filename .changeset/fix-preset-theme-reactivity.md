---
"@lh-ui/vue3": patch
---

修复文档站切换预设主题后内容区域不响应、必须刷新页面才生效的问题。根因：FOUC（首屏防闪）脚本写的是 `documentElement` 内联样式（优先级 1,0,0,0），而运行时 `usePresetTheme` 写的是普通样式表（优先级 0,1,0），切换时新样式被内联样式压过，只有刷新重建页面才重新应用。

统一为同一机制：新增 `packages/theme/src/themes` 导出 `buildPresetStyleText(vars)` 与 `PRESET_THEME_STYLE_ID`，构建期把每个预设序列化为 `:root { --lh-primary-* }` 样式文本（含暗色块），FOUC 与 `applyPreset` 运行时共用同一个 `<style id="lh-preset-theme">` 元素；`applyPreset` 每次应用后把该元素挪到 `head` 末尾，保证开发模式 Vite 运行时注入的组件样式之后（生产构建 CSS 为静态 `<link>` 且在脚本之前，无此问题）。顺带修复 `.gitignore` 中 `theme/` 未锚定根目录、误伤 `packages/theme/src/themes/` 源码目录的问题（改为 `/theme/`）。
