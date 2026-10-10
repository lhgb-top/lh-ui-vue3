---
'@lh-ui/vue3': minor
---

新增 Dropdown 下拉菜单组件

- 提供 `LhDropdown` 与 `LhDropdownItem` 两个组件，触发器可以是任意元素，菜单项通过 `command` 标识并随 `command` 事件抛出
- 支持 `hover` / `click` / `contextmenu` 三种触发方式，`contextmenu` 会阻止浏览器默认右键菜单
- 键盘交互遵循 WAI-ARIA menu 模式：方向键循环（跳过禁用项）、Home/End 跳首尾、Enter/Space 触发并关闭、Esc 关闭并归还焦点
- 禁用项使用 `aria-disabled` 以保留在无障碍树中，但方向键与回车均不触发事件
- 支持 12 种 `placement`、`max-height` 菜单限高、`v-model:visible` 受控模式与编程式 `show` / `hide` / `toggle`
