---
"@lh-ui/vue3": minor
---

迁移到 @lh-ui/share 共享层：框架无关的 core 逻辑、常量、语言包、主题与全部组件 SCSS 统一由
`@lh-ui/share`（npm 依赖，已发 0.3.0）提供，本仓库不再持有这些源码。

- 新增运行时依赖 `@lh-ui/share`；`@lh-ui/vue3/theme` 子路径改为转发 `@lh-ui/share/theme`
  （公开导出面不变：`getThemeVars` / `THEME_PRESETS` / 五个预设 / 主题类型）。
- 删除 `packages/{core,constants,theme,locales,utils}` 与各组件 `style/` 目录；样式唯一源回归
  share，本仓库 build-styles 改为编译已安装包的 scss，`@lh-ui/vue3/style/<name>` 的 scss 拷贝
  修正了原先指向不存在目录的相对 `@use`。
- 测试收敛：`tests/unit/core/`（53 组件 spec + shared/）与 `tests/unit/utils/css-var.spec.ts`
  全部删除——core 单测唯一一份在 share（迁移中补齐了 divider 的 `borderStyle` 用例）；
  本仓库单测只剩 Vue 专属层（composables / locale / 组件注册表 + 58 个组件集成测试）。
- 样式导入统一为 `@lh-ui/share/styles/<name>`（不带 `/index.scss` 后缀，share 的 `./styles/*`
  导出已自动补全）；`CONTRIBUTING.md` / `MEMORY.md` / `.npmignore` 同步更新。
- 行为改进（`packages/locale` 响应式壳）：`use()` 不再覆写已注册的内置语言包、`setLocale()`
  对未注册语言回退到默认包、新增 `tm()` 复数翻译；`version` 为 `ref`，组件内
  `void lhlocale.version.value` 即可订阅语言切换。
- 构建配置跟进：rollup/dts/vite/vitest 别名清理、`@lh-ui/share` 保持 external、`verify-dts`
  白名单放行 `@lh-ui`；覆盖率阈值随 `packages/core` 单测迁出而清空，需重测后回填。
