---
"@lh-ui/vue3": patch
---

接线此前文档中「声明但未在组件源码生效」的死属性：select、tree、tree-select、date-picker、tabs 等组件的Props 表与 `packages/components/*/src` 实现对齐，props 声明、默认值与透传全部落地，`pnpm api:check` 57 个组件 × 2 种语言 0 漂移。文档 Props 表由 `gen-api-tables.mjs` 依据 `types.ts` 全量重建后保持自动核对。
