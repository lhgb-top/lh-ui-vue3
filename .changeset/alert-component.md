---
"@lh-ui/vue3": minor
---

新增 LhAlert 警告提示组件：info/success/warning/danger 四语义，可带图标、标题与关闭按钮，plain 朴素描边样式。**live region 角色随语义联动**（APG）：`warning`/`danger` 为 `role="alert"` 立即播报，`info`/`success` 为 `role="status"` 温和播报；关闭按钮为真实 `<button>`，aria-label 取语言包 `alert.close`（中「关闭警告」/英 "Dismiss alert"，6 份语言文件同步）。语义色浅底由 `color-mix()` 从语义色派生，自动跟随主题与明暗模式。接入 `useLhComponentTheme` 与 `sx`；ConfigProvider 的 `LhThemeableComponent` 白名单新增 `'alert'`。
