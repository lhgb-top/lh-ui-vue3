# MEMORY.md — lh-ui-plus 长期记忆

> 项目级精炼记忆（非流水日志）。按主题组织，事实经实测验证后写入。
> 详细过程与证据见 `ai/项目分析.md`（附录有命令输出）；本文件只保留结论与规则。

## 协作约定（最高优先级）

- **验证全部由用户手动执行**（test / build / typecheck / lint / docs build）。
  AI 不主动运行这些命令，除非用户当轮明确要求。
- 未拿到用户确认的运行结果前，任何门禁不得标 ✅ —— 一律写「已交付（待手动验证）」。
- 交付时附上用户应执行的命令清单（按顺序：lint → typecheck → 相关测试 → docs:build → build）。
- `ai/项目分析.md` 是项目状态的唯一权威记录，动过代码就要同步更新它，不得遗漏或篡改历史记录
  （旧结论以「勘误」方式保留，不直接删除）。

## 构建管线（2026-09-15 大修后的关键事实）

- 样式产物由 `scripts/build-styles.mjs` 用 sass 官方 API 直出：
  `theme/index.css`、`dist/index.css`（主题+全部组件）、`dist/<name>/style.css`、
  `es|lib/<name>/style/index.css`。**`rollup-plugin-scss` 不支持 `outputDir`**，旧配置静默产空文件，
  这是历史上「样式从未生成过」的根因——不要再往 rollup 配置里加 outputDir。
- `pnpm build` = ESM/CJS rollup + 样式脚本 + dts + UMD 四步串联；`package.json` 的
  `unpkg`/`jsdelivr` 指向 `dist/lh-ui-plus.js`，由 build 的最后一步生成。
- dts 构建（`rollup.dts.config.js`）把 `.vue` 与 `.s?css` 一律 external；别名表含 `lh-constants`
  （曾误写 `constants`）。
- **SFC 内禁止写 `<style>` 块**——样式一律放 `style/index.scss`（`@use '../../../theme/src/common/index.scss' as *`
  开头）。rollup 的 scss 插件虽已兜底匹配 `&lang.css` 虚拟模块，但规范仍必须遵守。
- `:root` token 唯一定义处：`theme/src/common/var.scss`（明色）、`var-dark.scss`（暗色
  `[data-theme='dark']/.dark`）、`patterns.scss`（花纹）。`theme/src/index.scss` 只是聚合入口，
  不要在里面重复声明变量。
- 组件样式**只允许引用 var.scss 里真实存在的 token**。曾发现 Element-Plus 风格 token 泄漏
  （`--lh-text-color-primary`、`--lh-border-color`、`--lh-*-color-light-5/9`、`--lh-white` 等），
  fallback 硬编码色会静默击穿主题。组件局部覆盖钩子（`--lh-btn-size`、`--lh-tooltip-bg` 等）可豁免。

## 架构契约

- 三层：`packages/core`（纯函数，禁 Vue）→ `packages/components`（SFC 薄壳）→ `packages/theme`。
  新行为进 core + 单测；组件只接线。
- **ConfigProvider 注入的是 `ComputedRef<LhConfigContext>`**（键 `CONFIG_PROVIDER_KEY`）。
  消费方必须读 `.value`（`configContext?.value.size`）才能建立响应式依赖——旧实现 `reactive()`
  快照导致 provider props 变化不传导，2026-09-15 实测修复。`useLhComponentTheme` 已内部解包。
- **`lhlocale.t` 是箭头函数属性**，`const t = lhlocale.t` 解构安全。组件内要用响应式翻译时，
  包一层并触碰 `lhlocale.version.value`：
  `const t = (p, f?) => { void lhlocale.version.value; return lhlocale.t(p, f) }`。
- 组件主题优先级：组件 `themeVars` > `ConfigProvider.componentTheme[name]` > 全局 `themeVars`；
  `bg-pattern` 额外受 `patternComponents` 白名单控制。
- 注册链（新组件 5 处同步）：`packages/components/index.ts`（lhComponents 有序数组 + 导出）、
  `src/index.ts`（命名/类型/样式三段）、`docs/.vitepress/theme/index.ts`、
  `docs/.vitepress/config.ts` 侧边栏、`tests/unit/components-registry.spec.ts` 期望数组。
  registry spec 同时做「目录 ↔ 注册」反向断言，漏一处必红。

## Import 规范（2026-09-15 全库清洗后）

- 组件 `src/types.ts`：组件类型走 `@lh-ui/core/<name>`，共享类型走 `@lh-ui/core/shared`；
  **禁用根 barrel `@lh-ui/core/index`**。
- 测试：`~/components/<name>`、`~/core/<name>`；**禁用 `../../packages/...`**。
- `src/index.ts`、`dev/`、`docs/.vitepress/`：一律 `~/`（库入口用 `lh-ui` 别名）。
- `lh-types/*` 只能 `import type`（无运行时别名，会被擦除）。
- Vite/Vitest/Rollup/docs 四套别名表与 tsconfig paths 保持一致（含 `@`、`lh-ui`）。

## 历史教训

- 「构建已验证 ✅」曾连续数轮是假的——es/lib 是旧产物、dist 不存在、样式为空文件。
  判断构建健康唯一标准：**退出码 0 + 产物冒烟**（大小、裸导入、token 存在性），构建产物目录
  （es/lib/dist/theme）全部 gitignore，不能当证据。
- Badge 曾「已注册有测试但视觉完全没实现」：修饰类挂错元素 + teleport 移出 wrapper。
  新组件交付时测试断言要对着 SCSS 选择器写（类挂根元素还是内容元素要和样式一致）。
- `pnpm format` 只覆盖配置文件与 changeset；packages/src 的格式要手动贴合 prettier 风格
  （单引号、无分号、printWidth 100、singleAttributePerLine）。

## 项目当前状态快照（2026-09-15 第三轮）

- 18 个组件目录 / 21 个注册实例；上一轮全门禁绿（lint 0 err/20 warn、467 tests、build 含 UMD/dts）。
- 第三轮交付（待用户手动验证）：全库 import 别名化、dev 补 Badge 示例、src 补 Tag 类型导出、
  CI workflow、覆盖率地板阈值、lint 警告清零、新四组件 Avatar/Progress/Statistic/Descriptions。
- 细节与验证清单见 `ai/项目分析.md` §5.1''' 与附录 A-3。
