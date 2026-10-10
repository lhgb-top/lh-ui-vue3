---
"@lh-ui/vue3": patch
---

文档站全站 API 表与源码对齐：以 `packages/components/*/src/types.ts` 的 Props 接口与各组件 `withDefaults` 默认值为事实来源，重建 72 个中英文档的主组件 Props 表（补齐 Input、Dialog、Tooltip 等长期缺失的属性行、校正漂移的默认值与类型展开式，保留人工说明文案）。新增 `pnpm api:check` / `pnpm api:fix` 两个脚本（自研 TS compiler API 解析，无新依赖）用于持续核对，避免 API 表再次漂移。
