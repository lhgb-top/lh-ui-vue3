---
"@lh-ui/vue3": patch
---

补齐 LhUpload 到 @lh-ui/share 0.3.0 的破坏性变更迁移：`isExtensionRejected(fileName, accept)` →
`isFileRejected(file, accept)`。漏改导致 VitePress 文档站预构建 `@lh-ui/share/core/upload` 时报
「does not provide an export named 'isExtensionRejected'」，组件运行时校验亦失效。

- `packages/components/upload/src/index.vue`：import 改名，调用改为传整个 `File`（与 lh-ui-vue2 对齐）
- 行为修正：accept 为 `image/*` 等通配规则时不再恒真放行，改为比对 `file.type`——core 层是类型校验的
  最后一道防线，不能依赖原生 `<input accept>` 的建议性过滤
