---
"@lh-ui/vue3": minor
---

关闭存量无障碍债务 DEBT-3：表单控件读取所属 `LhFormItem` 的校验状态，校验失败时在控件上标记 `aria-invalid`，错误消除后属性自动移除；控件放在 `LhFormItem` 之外时不受影响。

- 新增 form-item → 控件的上下文通道（`LH_FORM_ITEM_CONTEXT_KEY`），`item.vue` 以 reactive 代理暴露响应式错误文案
- 覆盖十个表单控件：Input / Select / Checkbox / Radio / Switch / Slider / InputNumber / DatePicker / TimePicker / Cascader。有原生控件的（Input、Checkbox、Radio、InputNumber）标记在原生控件上；复合触发器的（Select 的 combobox、Switch 的 switch role、Slider 与三个 Picker 的根元素）标记在触发器上
- Checkbox / Radio 置于 Group 内再嵌入 FormItem 时，上下文正常穿透
- 屏幕阅读器配合 `LhFormItem` 既有的 `role="alert"` 错误播报与 `aria-describedby` 关联，形成完整的「字段 → 错误」可感知链路
