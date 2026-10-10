---
"@lh-ui/vue3": minor
---

存量组件无障碍债务补齐（`ai/组件扩充计划.md` §5.3）：

- **LhFormItem**：错误文案带 `role="alert"`，校验失败时屏读立即播报；内容区经 `aria-describedby` 关联错误文案，无错误时自动移除关联。顺带修复一个 i18n 缺陷——`packages/core/form/logic.ts` 此前硬编码英文兜底 `'This field is required'`，现改为由组件层传入语言包 `form.required`（中「此项为必填」/英 "This field is required"），core 层不再含文案，`form.required` 死键随之激活；`LhForm.validateField()` 同步传入该兜底文案，避免表单级必填校验静默放行
- **LhProgress**：根元素补 `role="progressbar"` + `aria-valuemin/max/now` + `aria-valuetext`（同步可见文案，含 `format` 自定义格式），对齐 WAI-ARIA progressbar 模式
- **LhStatistic**：数值区补 `aria-live="polite"`，`value` 变化时温和播报
- **LhTag**：纯图标的关闭按钮补 `aria-label`（取语言包 `tag.close`，`tag.close` 死键随之激活），图标 `<svg>` 标记 `aria-hidden`
- **LhBadge**：小圆点模式的角标是纯装饰，标记 `aria-hidden`；数值模式文本保留可读
- **LhAvatar**：字体图标标记 `aria-hidden`；图标 / 文字模式由根元素承担 `role="img"`，`alt` 作为无障碍名称
- **LhDescriptions**：条目改用 `<dl>` / `<dt>` / `<dd>` 语义结构（样式类名不变，已重置 `dl` 与 `dd` 的 UA 默认外边距），补位元素标记 `aria-hidden`

中英文档（form、tag、badge、avatar、statistic、progress、descriptions 共 14 页）新增「无障碍」小节。`aria-invalid` 需表单控件侧读取 form-item 上下文，登记为后续债务单独排期。
