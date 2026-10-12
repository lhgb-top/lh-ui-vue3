---
"@lh-ui/vue3": patch
---

修复 `LhMessage.success/info/warning/danger/loading` 快捷方法的 `options` 参数误要求 `content` 的问题。

这些快捷方法的首参已是 `content`（如 `LhMessage.success('已保存', { showClose: true })`），
但第二个参数的类型仍沿用必填 `content` 的 `LhMessageOptions`，导致传 options 时编译报
“缺少属性 content”。现收紧为 `Omit<LhMessageOptions, 'content'>`，与实际调用形态一致。
