---
"@lh-ui/vue3": patch
---

文档站构建优化：

- **消除 Sass 弃用警告**：`docs/.vitepress/config.ts` 启用 modern Sass API（`scss.api = 'modern'`），消除全部 34 条 `legacy-js-api` Deprecation Warning。项目 SCSS 全部使用 `@use` 现代语法，已逐一用 modern API 编译验证 43 个样式文件均通过。
- **支持子路径部署**：新增 `DOCS_BASE` / `DOCS_HOSTNAME` 环境变量，`base`、sitemap hostname、`og:url` 与 JSON-LD `url` 全部跟随配置，无需改动源码即可部署到子路径。
- **`robots.txt` 动态生成**：新增 `scripts/build-docs.mjs`，在 `docs:build` 末尾按部署配置重写 Sitemap 地址（静态文件无法读取环境变量）。
- **修复 LhHome 语言切换的硬编码路径**：改用 `withBase('/en/')` / `withBase('/')`，子路径部署下中英文切换不会跳错。
- 贡献指南中英文版新增「文档站部署」一节，说明环境变量用法及 Windows Git Bash 的 MSYS 路径转换注意事项。
