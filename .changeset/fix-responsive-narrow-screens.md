---
"@lh-ui/vue3": patch
---

响应式修复（窄屏 320px 布局异常）：

- **LhInput**：`.lh-input__wrapper` 固定 `width: 240px` 无上限，表单项内容区/窄屏容器里溢出（表单 min-content 因此被撑到 320px）。补 `max-width: 100%`，默认宽度不变、可随容器收缩。
- **LhSelect / LhDatePicker / LhTimePicker / LhCascader**：同类问题，根元素补 `max-width: 100%`；LhSelect 触发器文本与 LhCascader 输入框补 `min-width: 0`，省略号在窄容器里真正生效，不再顶出右侧箭头。
- **LhForm**：根元素补 `min-width: 0`，解开 flex 子项的 min-content 下限；LhConfigProvider 同理（包裹表单时它才是被撑破的那一层）。
- **LhSlider**：轨道 `width: 100%` 与右侧 `showInput` 数值列相加溢出，改 `flex: 1; min-width: 0`；同时移除轨道上残留的 `padding-left/right: X%` 内联样式（按钮与进度条均为绝对定位、自带百分比，该 padding 只会破坏 flex 尺寸计算）。
- **LhSpace**：`wrap` 默认值 `false` → `true`（仅水平方向生效，与 Element Plus 一致），窄屏自动换行而非溢出；文档 API 表同步更新。
- **docs 示例**：input.md 固定 `width: 300px/260px` 的输入框改为 `width: 100%; max-width`/`flex` 形态，`.demo-row` 占满行宽并允许换行；dev 示例卡片 `width: 280px` 同样改为 `width: 100%; max-width: 280px`。
