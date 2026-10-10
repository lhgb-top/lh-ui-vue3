---
"@lh-ui/vue3": patch
---

文档站首页打磨：「组件预览」区改为**分组组件总览**（7 组 58 项全量导航 chip，点击直达文档页，中英文站联动）；横幅「组件」计数由 `docs/.vitepress/data/components.ts` 数据源派生（不再硬编码，与侧边栏对齐）；新增 Table 多级表头/筛选/列宽拖拽、Tree 懒加载/checkStrictly、Grid 响应式断点/push-pull、BackTop scrollend 示例（中英同步）；修复 tooltip 页实时示例引用未声明状态的 demo-state 缺陷（中英）。
