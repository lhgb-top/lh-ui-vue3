---
'@lh-ui/vue3': patch
---

全站组件文档示例补全 `<script>` 并区分 API 风格：中英双语 116 页中 264 处仅有 `<template>` 的示例全部转为 `vue composition`（`<script setup lang="ts">`）+ `vue options`（`export default`）相邻成对——静态示例配空脚本、含状态示例补类型化 `ref` 与 `data()`/`methods`（状态名与页面级演示脚本一致），另为 122 处未打标的既有 script 块补齐风格标签，未标记围栏清零，「API 风格」切换器在每个示例上均生效；`check-api-style-pairs.mjs` 新增纯模板块缺口检查并固化新约定，`fix-docs-demo-state.mjs` 修正 v-for/插槽局部量与字面量误报。
