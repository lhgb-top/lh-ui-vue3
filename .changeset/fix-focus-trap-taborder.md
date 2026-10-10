---
"@lh-ui/vue3": patch
---

修复焦点圈（Dialog / Drawer / Popover / Popconfirm 共用的 `getFocusableElements`）两处 Tab 序列枚举缺陷：

- `tabindex="-1"` 的元素原本仍会被计入焦点圈——选择器只在 `[tabindex]` 通用分支排除了 `-1`，`button` 等标签名分支不看 tabindex。这类元素可用脚本聚焦但不在 Tab 序列中，Tab 循环会把焦点送到一个键盘永远到不了的位置
- `hidden` / `aria-hidden="true"` / `display:none` / `visibility:hidden` 只检查了元素自身，挂在祖先节点上时整棵子树仍被当作可落入目标，`aria-hidden` 子树内的按钮会成为 Tab 落点
