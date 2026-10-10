# 无障碍访问 (Accessibility)

lh-ui-plus 致力于为全球用户提供无障碍的 UI 体验。

## 键盘导航

所有交互组件均支持键盘操作：

| 按键 | 动作 |
|------|------|
| `Tab` | 在可聚焦元素间切换 |
| `Enter` / `Space` | 激活按钮/开关 |
| `Escape` | 关闭 Dialog/Select 弹出层 |
| `Arrow Up/Down` | 在 Select/Cascader 选项中上下移动 |

## ARIA 属性

组件按需输出 ARIA 属性（以下为实际渲染结果）：

```html
<!-- Button 禁用态：原生 disabled，可被 Tab 跳过 -->
<button disabled>...</button>

<!-- Switch 开关：button + role/aria-checked -->
<button role="switch" aria-checked="false">...</button>

<!-- Checkbox：原生 input，语义由标签提供 -->
<input type="checkbox" />

<!-- Dialog 对话框：aria-modal + aria-label 指向标题 -->
<div role="dialog" aria-modal="true" aria-label="对话框标题">
  ...
</div>
```

> 原生语义优先：Button 用原生 `disabled`、Checkbox 用原生 `<input type="checkbox">`，不再重复添加 `aria-disabled` / `role="checkbox"` —— 给原生元素叠加冗余 ARIA 反而违反规范。

## 屏幕阅读器

- 纯图标按钮需手动传 `aria-label`（见下方开发建议）
- Dialog 关闭按钮自带 `aria-label="close"`
- 组件透传原生属性：任何未显式处理的特性会落到根元素，可按需补充 `aria-*`

## 颜色对比度

正文与主色调按 **WCAG 2.1 AA** 目标选取（正常文字 ≥ 4.5:1，大文字与非文字元素 ≥ 3:1）；国风低饱和配色下建议用 [主题定制](/guide/theme-customization) 的 `--lh-text-color-*` 层级而非自选颜色，以保证对比度。

## 焦点管理

- 根元素统一提供 `:focus-visible` 焦点环：键盘导航时显示、鼠标点击不显示
- Dialog/Select 弹出层支持 `Escape` 关闭
- 键盘可操作性：可聚焦元素均为原生 `<button>` / `<input>`，天然支持 `Tab` 遍历

> 焦点陷阱与焦点还原（打开 Dialog 时聚焦首个元素、关闭后回到触发按钮）尚未实现，欢迎在 [Issue](https://github.com) 中跟进。

## 开发建议

### 为组件添加 aria-label

```vue
<LhButton aria-label="关闭对话框" @click="close">
  <LhIcon name="close" />
</LhButton>
```

### 使用活区公告

```vue
<script setup lang="ts">
import { ref } from 'vue'
const message = ref('')
</script>

<template>
  <div aria-live="polite">{{ message }}</div>
</template>
```

### Skip Navigation

```html
<a href="#main" class="skip-link">Skip to main content</a>
```

## 测试工具

推荐使用以下工具检测无障碍问题：

- **axe DevTools** — 浏览器插件
- **WAVE** — Web Accessibility Evaluation Tool
- **lighthouse** — 内置无障碍审计

---

> 无障碍不是可选功能，而是基本人权。
> — Web Accessibility Initiative (WAI)