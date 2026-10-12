---
'@lh-ui/vue3': minor
---

# 主题定制台 + 本地联动 alias + docs 示例规范

## docs 站（用户可见）

- **新增「主题定制台」页**（中英双语，`guide/theme-studio`）：选预设作起点 →
  按语义令牌分组调色 → 预览区 `document.documentElement.style.setProperty` 实时生效
  （含明/暗切换）→ 导出一份 scss（`:root { --lh-* }` + 暗色块 +
  `@use '@lh-ui/share/styles/index.scss'`），一键复制。页面复用 share 的
  `THEME_PRESETS` / `getThemeVars` / `buildPresetStyleText` 原语，仅依赖
  vue + vitepress + `@lh-ui/share/theme`。
  （修复控制台告警：颜色输入框 `v-model` 会把空串（可选令牌跟随默认链路）和
  `getComputedStyle` 取回的 `color-mix(...)` 计算值直接写进 `<input type="color">`，
  被浏览器拒绝并刷 "does not conform to the required format"。改为只采纳 hex 初始化 +
  颜色输入框取值经 `colorInputValue` 保护，非 hex 一律回退占位色。）
- **示例代码统一 npm 包名**：`theme-studio` 页中 4 处误写的 `lh-ui-plus`（仓库名）
  改为实际包名 `@lh-ui/vue3`。

## 开发体验（不发版，docs/scripts 均不在 files 内）

- **带守卫的本地联动 alias**：`vite.config.ts` / `vitest.config.ts` /
  `docs/.vitepress/config.ts` 在家族布局下把 `@lh-ui/share/**` 解析到同级 share 仓的
  **源码**（改 share 即时热更新，无需构建或发版）；兄弟仓不存在时（CI 单仓 clone）
  守卫返回空、自动回退 npm 包，两种布局都能跑。bare `@lh-ui/share` 排在子路径正则之后，
  避免前缀匹配吞掉子路径。
  （修复：styles alias 此前把 `@lh-ui/share/styles/<name>` 映射到 `styles/<name>`，
  但 share 源码布局是 `styles/<name>/index.scss`——exports 用 `"./styles/*": "./styles/*/index.scss"`
  补了这层而 alias 没有，导致 docs 里 58 条无后缀样式 import 解析失败。已按 exports 语义
  拆成三条有序规则：带扩展名原样落盘 / `theme/common/<x>` 补 `.scss` / 组件名补 `/index.scss`。）
- **`verify:docs-sync`**（`scripts/verify-docs-sync.mjs`）：
  ① 校验与 lh-ui-vue2 共享的 docs 组件（`ThemeStudio.vue`）逐字节一致；
  ② 校验展示围栏的 import 只用 npm 包名，禁止 `~/` / `@/` 库内部 alias
  （页面级 `<script setup>` 走站点自身 alias，不受限）。
- AGENTS.md 补充示例代码规范、共享 docs 组件以本仓为源头的约定与 Commands 表入口。

> 发布顺序：先发 @lh-ui/share（本次 0.4.0），本仓随后 `pnpm up @lh-ui/share` 回归。
