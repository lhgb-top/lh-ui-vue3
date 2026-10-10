---
"@lh-ui/vue3": patch
---

修复 Steps / Button / Input / Avatar 四个组件的 `icon` 类属性不生效的问题。

原先这些属性被渲染成一个空 `<i :class="icon">`，但本库没有任何图标字体，所以图标永远显示不出来。现在统一改为渲染内置的 `LhIcon` 组件：

- `LhStep` / `LhButton` 的 `icon`、`LhInput` 的 `prefix-icon` / `suffix-icon`、`LhAvatar` 的 `icon` 均接受内置图标名（`LhIconName`，如 `user`、`search`、`date`），由 `LhIcon` 渲染对应 SVG 图标
- 上述属性的类型从 `string` 收紧为 `LhIconName`，编辑器可自动补全
- `LhStep` 新增 `#icon` 插槽，可完全自定义步骤图标的渲染
- Steps 的完成/错误状态色、Avatar 的字号缩放（新增 `svg` 跟随 `em` 缩放的样式）均自动套用到图标上
