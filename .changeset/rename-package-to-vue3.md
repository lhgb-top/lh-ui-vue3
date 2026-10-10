---
"@lh-ui/vue3": minor
---

包名重命名为 `@lh-ui/vue3`（原 `@lh-ui/lh-ui-plus`），并同步 UMD 产物命名。

- npm 包名：`@lh-ui/lh-ui-plus` → `@lh-ui/vue3`，安装命令变为 `npm install @lh-ui/vue3`，全量/按需引入路径前缀全部跟进
- UMD 产物：`dist/lh-ui-plus.js` → `dist/vue3.js`，CDN 全局变量 `LhUIPlus` → `LhUI3`（`unpkg` / `jsdelivr` / `exports["./dist"]` 同步更新）
- 内部别名 `lh-ui` → `@lh-ui/vue3`（tsconfig / vite / vitest / docs / 两个 rollup 配置），rollup 别名表补齐此前缺失的库入口条目
- 文档站品牌名 `lh-ui-plus`（站点标题、SEO、GitHub 仓库地址、hostname）保持不变

**升级方式**：旧名 `@lh-ui/lh-ui-plus` 不再发布新版本，请卸载后改装 `@lh-ui/vue3`，并全量替换代码中的包名引用。
