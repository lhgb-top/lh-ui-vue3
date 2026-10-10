---
"@lh-ui/vue3": minor
---

新增 LhCard 卡片组件：header/cover/主体/footer 四区结构，阴影三档（always/hover/never）。`clickable` 时整卡承担 button 键盘语义（`role="button"` + `tabindex="0"` + Enter/Space 激活 + `:focus-visible` 焦点环，APG button pattern）；`loading` 时内容区以自绘骨架占位并输出 `aria-busy="true"`。接入 `useLhComponentTheme`（themeVars/bgPattern/componentTheme 全链路）与 `sx` 快速布局——sx 高频组件接入完成 **5/5**（Button、Input、Dialog、Tooltip、Card）。ConfigProvider 的 `LhThemeableComponent` 白名单新增 `'card'`。
