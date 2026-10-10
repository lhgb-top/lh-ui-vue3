---
"@lh-ui/vue3": patch
---

修复发布链路的四个问题：

- **发布包瘦身**：`files` 白名单由 `["packages"]` 改为 `["es", "lib", "dist", "packages/components/*/style"]`，不再把 `packages/components/*/src/` 下的 Vue/SCSS 源码打进 npm 包（`files` 优先级高于 `.npmignore`，旧排除规则实际已失效），按需引入所需的 style scss 仍在包内。
- **`lh-ui/theme` 子路径可用**：rollup 新增 `packages/theme/index.ts` 构建入口（产出 `es/theme`、`lib/theme` 及对应 `.d.ts`），package.json `exports` 补上 `"./theme"`，`import { getThemeVars } from 'lh-ui/theme'` 在 npm 消费侧可解析。
- **产物模块类型声明**：根 package.json 不含 `"type"` 字段导致 `es/*.js` 被 Node 按 CJS 解释；构建脚本现在在 `es/` 写入嵌套 `{"type":"module"}`、`lib/` 写入 `{"type":"commonjs"}`，不污染源码目录、不影响 `dist/` 的 UMD 产物。
- **d.ts 冒烟检查**：新增 `node scripts/verify-dts.mjs`（`pnpm verify:dts`），校验 `es/`、`lib/` 的声明文件存在、相对导入路径可解析、裸导入仅允许 `vue`；CI 在 `pnpm build` 后自动执行。

另修复 `.gitignore` 中 `./theme/` 的非法前缀语法（应为 `theme/`）。
