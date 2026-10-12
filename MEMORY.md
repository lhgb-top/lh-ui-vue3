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
  `unpkg`/`jsdelivr` 指向 `dist/vue3.js`，由 build 的最后一步生成。
- dts 构建（`rollup.dts.config.js`）把 `.vue` 与 `.s?css` 一律 external。**每个 SFC 必须交付旁置的 `.vue.d.ts`**（`DefineComponent<Props, Record<string, any>, any>`
  形状，参考 skeleton/alert）——否则 dts 产物残留未解析的 `./src/*.vue` 导入，verify-dts 必红
  （Wave B 曾漏 7 份，22 处失败）。
- **SFC 内禁止写 `<style>` 块**——而且迁移后本仓库**不再持有任何样式源**：组件样式在
  `@lh-ui/share/styles/<name>/index.scss`，主题令牌在 `@lh-ui/share/styles/theme/common/`。
  组件目录下的 `style/` 已随迁移整体删除。
- `:root` token 唯一定义处（迁移后）：`@lh-ui/share/styles/theme/common/var.scss`（明色）、
  `var-dark.scss`（暗色 `[data-theme='dark']/.dark`）、`patterns.scss`（花纹）；
  `@lh-ui/share/styles/theme/index.scss` 只是聚合入口，不要在里面重复声明变量。
- 组件样式**只允许引用 var.scss 里真实存在的 token**。曾发现 Element-Plus 风格 token 泄漏
  （`--lh-text-color-primary`、`--lh-border-color`、`--lh-*-color-light-5/9`、`--lh-white` 等），
  fallback 硬编码色会静默击穿主题。组件局部覆盖钩子（`--lh-btn-size`、`--lh-tooltip-bg` 等）可豁免。
  这条规则的执行侧在 share 仓库（`pnpm verify:styles`），本仓库只消费。
- **主题 TS 预设也在 share**：`getThemeVars` / `LH_THEME_PRESETS` / `buildPresetStyleText` 从
  `@lh-ui/share/theme` 引入；`src/theme.ts` 只是一层 `export *` 转发，保住 `@lh-ui/vue3/theme`
  子路径导出，不要在里面加新逻辑。

## 架构契约

- **迁移后两层**：`@lh-ui/share`（npm 依赖，框架无关的 core 纯函数 / 样式 / 主题 / 常量 / 语言包 /
  纯工具）→ `packages/components`（SFC 薄壳）+ `packages/composables`（Vue 组合式）+
  `packages/imperative`（命令式挂载）+ `packages/locale`（share 的 Vue 响应式适配壳）。
  新行为进 share 的 core + 那边的单测（**core 单测唯一一份在 share 仓库**）；本仓库只接线 + 组件集成测试。
- **ConfigProvider 注入的是 `ComputedRef<LhConfigContext>`**（键 `CONFIG_PROVIDER_KEY`）。
  消费方必须读 `.value`（`configContext?.value.size`）才能建立响应式依赖——旧实现 `reactive()`
  快照导致 provider props 变化不传导，2026-09-15 实测修复。`useLhComponentTheme` 已内部解包。
- **`lhlocale.t` 是箭头函数属性**（share 的 `lhlocale` 同样安全），`const t = lhlocale.t` 解构安全。
  组件内要用响应式翻译时，包一层并触碰 `lhlocale.version.value`：
  `const t = (p, f?) => { void lhlocale.version.value; return lhlocale.t(p, f) }`。
  注意 `lhlocale` 现从 `~/locale` 引入（适配壳），share 侧的 `@lh-ui/share/locales` 是纯事件发射器。
- 组件主题优先级：组件 `themeVars` > `ConfigProvider.componentTheme[name]` > 全局 `themeVars`；
  `bg-pattern` 额外受 `patternComponents` 白名单控制。
- 注册链（新组件 5 处同步）：`packages/components/index.ts`（lhComponents 有序数组 + 导出）、
  `src/index.ts`（命名/类型/样式三段）、`docs/.vitepress/theme/index.ts`、
  `docs/.vitepress/config.ts` 侧边栏、`tests/unit/components-registry.spec.ts` 期望数组。
  registry spec 同时做「目录 ↔ 注册」反向断言，漏一处必红。
- **收集型子组件（Item/Pane/Step 类）的两种取序模式（2026-09-20 实证）**：
  ① 需要 vnode **props**（name/label 等静态值）→ 父级 computed 从 `slots.default()` 过滤
  `vnode.type` 读取，无身份依赖，首帧正确（Tabs 页签头用此模式）；
  ② 需要**自身序号/总数** → 禁止用 vnode 身份（`getCurrentInstance().vnode` 在父级收集列表里
  `indexOf` 恒 -1——插槽 fn 每次调用产生新对象，编译插槽下子组件全部不渲染，docs 已踩坑）；
  用 **setup 阶段注册 token 进父级 reactive 数组**（顺序=setup顺序=插槽顺序），子级
  `indexOf(token)` 定位，卸载时注销；注册在挂载微任务批次内收敛（无可见闪烁），
  测试断言序号相关内容前必须 `await nextTick()`（breadcrumb/steps 用此模式）。

## Import 规范（2026-10 迁移至 @lh-ui/share 后）

- 组件 `src/types.ts`：组件类型走 `@lh-ui/share/core/<name>`，共享类型走 `@lh-ui/share/core/shared/*`；
  **禁用根 barrel `@lh-ui/share/core`**。常量走 `@lh-ui/share/constants`。
- **不要给 `@lh-ui/share` 配路径别名**——走 node_modules exports（`moduleResolution: bundler`）
  才能让 rollup/vite 的 external 命中；配别名会把 share 打进产物。唯一例外是 scss 前缀
  `@lh-ui/share/styles`（rollup 别名指向 node_modules，供 sass 插件读取源文件）。
- 样式导入用 `@lh-ui/share/styles/<name>`（**不带 `/index.scss` 后缀**——`./styles/*` 导出已自动补
  `/index.scss`，带后缀会变成 `<n>/index.scss/index.scss` 解析失败）；只有 `theme/index.scss` 与
  `theme/common/*.scss` 是显式键，需写全。
- 测试：`~/components/<name>`；**禁用 `../../packages/...`**。core 单测不在这写（在 share 仓库）。
- `src/index.ts`、`dev/`、`docs/.vitepress/`：组件/composables/locale 走 `~/`（库入口用 `@lh-ui/vue3` 别名），
  share 走 npm 子路径。
- `lh-types/*` 只能 `import type`（无运行时别名，会被擦除）。
- Vite/Vitest/Rollup/docs 四套别名表与 tsconfig paths 保持一致（含 `@`、`@lh-ui/vue3`）。

## 历史教训

- 「构建已验证 ✅」曾连续数轮是假的——es/lib 是旧产物、dist 不存在、样式为空文件。
  判断构建健康唯一标准：**退出码 0 + 产物冒烟**（大小、裸导入、token 存在性），构建产物目录
  （es/lib/dist/theme）全部 gitignore，不能当证据。
- Badge 曾「已注册有测试但视觉完全没实现」：修饰类挂错元素 + teleport 移出 wrapper。
  新组件交付时测试断言要对着 SCSS 选择器写（类挂根元素还是内容元素要和样式一致）。
- `pnpm format` 只覆盖配置文件与 changeset；packages/src 的格式要手动贴合 prettier 风格
  （单引号、无分号、printWidth 100、singleAttributePerLine）。
- 文档页交互 DemoBlock 引用页面级状态时**必须补页面级 `<script setup>`**，否则运行时
  Vue warn 且演示无效——交付文档后跑 `node scripts/fix-docs-demo-state.mjs` 审计
  （DOC-2 修过一轮，Wave B 又复发一次；该脚本的 MISSING 报告需人工滤掉数字/字面量误报）。
- 组件的 `ul/ol` 在文档站会被 `.vp-doc ul/ol`（类+元素选择器，(0,1,1)）覆盖 list-style 与
  padding/margin——组件样式必须用复合选择器（`nav ol.x`、`ol[role='list'].x`）或 li 直接规则
  兜底，单类名规则会被压过（分页页码前出现列表圆点即此因）。
  **SCSS 语法注意**：`&` 只能出现在复合选择器开头——`nav ul&__pages` 这类「元素前缀 + &」的
  嵌套写法会报错（sass 编译 500），穿透反制一律写成**顶层复合选择器**（`nav ul.x { ... }`）。

## 项目当前状态快照（2026-09-20 校准，Wave B 已交付待验证）

- **2026-09-20 全链路门禁首次全绿并经复跑确认**（lint 0/0、typecheck、650 用例、build、
  verify-dts、docs:build）——第二~十一轮累计交付全部收口。教训存档：core 层类型只声明在
  `types.ts`，`logic.ts` 必须 import 而非重复声明（skeleton 曾炸 TS2308 + rollup 歧义）。
- **第十二轮 Wave B 已交付（待验证）**：Breadcrumb(+Item)、Pagination、Tabs(+TabPane)、
  Steps(+Step)；组件目录 28→32、注册实例 32→39、预期 d.ts 32→36；语言包新增
  breadcrumb/pagination/tabs/steps 键组（6 文件同步）。Tabs 严格对齐 APG（roving tabindex）。
- 下一批次：Wave C（Popover → Popconfirm → Drawer → Dropdown，先做 popper/focus-trap 基建），
  待 Wave B 验证确认后启动。
- 状态唯一权威记录为 `ai/项目分析.md`。
