---
'@lh-ui/vue3': minor
---

# ThemeStudio 重写为双兼容 Options API（行为不变）

`docs/.vitepress/components/ThemeStudio.vue` 与 lh-ui-vue2 侧逐字节共享。vue2 docs 已于
2026-10-10 迁移 VuePress 1.x（Vue 2.7 原生运行时，vue-loader 15 不支持 `<script setup>`），
共享组件统一改为**双兼容 Options API**（Vue 3 与 Vue 2.7 均可运行）：

- 去 `vitepress` 的 `useData` 依赖：语言检测改 `$lang`（VuePress 原生）+ pathname 前缀兜底
  （VitePress 侧）；英文页 SSR 首帧可能先以中文渲染、水合后纠正（单页影响，可接受）。
- 模板不使用 TS 断言（`as`）/ v-model 参数等 Vue3 专属语法；模块常量经 computed 暴露给模板。
- `Vue.extend` → `defineComponent`：Vue 3.5 已移除 `extend` 导出，`import Vue from 'vue'` +
  `Vue.extend(...)` 在 VitePress 构建期直接报 `"default" is not exported by vue`，
  `docs:build` 全线失败；`defineComponent` 两代都有，双兼容成立。
- 预设选择、逐令牌编辑、明暗预览、SCSS 导出等功能与交互完全不变。

> 共享约定已登记 plus AGENTS.md「与 vue2 共享的 docs 组件」条目；
> `pnpm verify:docs-sync` 继续守护两仓逐字节一致。docs 组件不在 npm 产物内。
