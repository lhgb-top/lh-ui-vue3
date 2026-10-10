---
'@lh-ui/vue3': patch
---

全部 58 个组件的中英文文档新增「类型定义」章节：自动提取组件 Props 接口与 `@lh-ui/core/*` 相关类型（含别名再导出与二级转发解析）的源码原文，以可展开的 `<details>` 列表呈现，用户可直接查看完整 TS 类型结构；新增 `pnpm types:check` / `types:fix` 门禁脚本（`scripts/gen-type-docs.mjs`）防止文档与源码漂移。
