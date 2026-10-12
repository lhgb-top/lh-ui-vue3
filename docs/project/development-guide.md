# 项目开发规范

## 目录职责

- `@lh-ui/share`（npm 依赖）：框架无关的纯函数、类型、主题变量与全部组件 SCSS 源，优先独立测试。
- `packages/components/`：Vue 组件、组件类型。
- `packages/components/index.ts`：全量组件注册清单和命名导出。
- `packages/composables/`、`packages/locale/`、`packages/imperative/`：Vue 专属的 composables、响应式语言壳与命令式调用。
- `tests/unit/`：工具和注册清单测试（框架无关的 Core 单测在 `@lh-ui/share` 仓库，本仓库不重复）。
- `tests/components/`：组件渲染和交互测试。
- `docs/components/`：组件 API、示例和引入方式。示例代码块约定（中英镜像一致）：
  **所有示例一律成对**——`vue composition` 围栏（`<script setup lang="ts">`）后紧跟
  `vue options` 围栏（`export default`），不再允许单个未标记 `vue` 纯模板块。静态示例
  （模板只含字面量 props）两块均配空脚本；含状态示例的组合式脚本用类型化 `ref`、选项式脚本用
  `data()`/`methods`，状态名与页尾页面级 `<script setup>`（DemoBlock 实时演示）保持一致。
  用 `node scripts/check-api-style-pairs.mjs --check` 校验（须 0 缺口），
  `node scripts/fix-docs-demo-state.mjs` 审计 DemoBlock 状态声明（须 0 affected）。
- `ai/`：阶段性分析和优化记录；稳定的开发规范同步到本目录。

## 命名规范

- **反域名根**：`top.lhgb`（反写 `www.lhgb.top`），是 lh-ui 家族所有仓的命名根。
- **JS / npm 端**：包名维持 `@lh-ui/*` scope——npm 包名不允许点号，`top.lhgb` 无法直接做包名；
  反域名落在元信息层，`package.json` 的 `homepage` / `repository` / `author` 统一用 `lhgb.top`。
- **原生端**：`lh-ui-android` / `lh-ui-ios` / `lh-ui-harmony` / `lh-ui-windows` 的 applicationId /
  bundleId / package / 根命名空间才使用 `top.lhgb.*` 形式（不在本仓）。
- **`LH` 前缀（非第三方符号必须带）**：常量 `LH_XXX`；类型 / 接口 `LhXxx`；composable `useLhXxx`；
  模块级单例或小写对象 `lhXxx`。BEM 类名 `lh-xxx`、组件 `name: 'LhXxx'` 同属此规范。
  `@lh-ui/share`（兄弟仓）与第三方依赖的导出符号不强制，本仓只约束自己声明的符号。

## 本地开发联动（家族布局）

家族布局下（`lh-ui-plus` 与 `lh-ui-share` 同父目录），本地 dev / test / typecheck / build 四条路径
全部脱离 npm 发版：前三条解析到**同级 share 仓源码**（改 share 即时生效，无需构建），
构建链解析到**同级 share 仓已构建产物**。share 的 npm 产物只服务终端用户。四条路径各自独立的守卫，
兄弟仓不存在时（CI 单仓 clone、独立下载）自动回退已安装的 npm 包，两种布局都能跑：

| 路径 | 机制 | 入口 |
| --- | --- | --- |
| `pnpm dev` / `pnpm docs:dev` | vite alias 正则解析 `@lh-ui/share/**` → 兄弟仓 `src/` 与 `styles/` | `scripts/local-share-alias.mjs`（`createLocalShareAliases`） |
| `pnpm test` / `pnpm vitest` | 同上（vitest 配置复用同一套 alias） | 同上 |
| `pnpm typecheck` | 生成 `tsconfig.dev.json`，`paths` 里追加 `@lh-ui/share/*` → 兄弟仓源码 | `scripts/gen-dev-tsconfig.mjs` |
| `pnpm build:local` | 把 `node_modules/@lh-ui/share` 改挂到兄弟仓目录，构建链读其 `es/` + `lib/` + `styles/` | `scripts/link-local-share.mjs` |

注意：

- **根 `tsconfig.json` 不配 share paths**：rollup-plugin-dts 按 `ts.findConfigFile` 向上找到的就是
  它，加了源码映射会把兄弟仓 `.ts` 拉进每个 dts program（`rollup.dts.config.js` 注释记录过 120 program
  OOM）。dev typecheck 只能走生成的 `tsconfig.dev.json`（已 gitignore，不要手改、不要提交）。
- **构建链不配 rollup/vite 别名**：rollup 的 external 门禁 `['vue', /^@lh-ui\/share/]` 匹配的是
  bare 导入符，别名会把 share 源码打进产物、破坏 external 与按需引入。`pnpm build:local` 只改
  `node_modules/@lh-ui/share` 的指向（解析路径仍是 bare `@lh-ui/share/**`，external 照常生效），
  因此既不绕过 external，也不需要 share 先发版。兄弟仓未 `pnpm build` 时脚本会跳过并提示，
  避免读到产物空洞。`--restore` 或一次 `pnpm install` 即可还原回 npm 包。
- **发版链仍走 npm**：`pnpm build`（含 `prepublishOnly`）读 npm 包，share 必须先发版（家族红线）。
  `build:local` 只用于本地验证。
- **`scripts/verify-theme-contrast.mjs` / `gen-type-docs.mjs`** 跟随 `node_modules/@lh-ui/share`
  解析：`build:local` 联动时它们读兄弟仓产物，未联动时读 npm 制品。
- **单仓 clone 前置条件**：回退 npm 包时 `dev/main.ts` 引入的 `@lh-ui/share/styles/index.scss`
  需要 share ≥ 0.4.0。

## 新增组件检查清单

1. 创建组件目录、独立入口、`src/index.vue`、`src/types.ts` 和样式入口；每个 SFC（含 `group.vue`
   等子组件）旁需有同名 `.vue.d.ts` shim（`DefineComponent<LhXxxProps, Record<string, any>, any>`），
   否则发布的 d.ts 会残留无法解析的 `.vue` 导入。
2. 在 `packages/components/index.ts` 和 `src/index.ts` 中加入导出及全量注册。
3. 为可复用逻辑在 `@lh-ui/share` 的 `src/core/<component>/` 增加对应 Unit 测试（在 share 仓库完成）。
4. 增加组件测试、API 文档和 Changeset。
5. 依次执行 `pnpm lint`、`pnpm typecheck`、相关测试、`pnpm docs:build` 和 `pnpm build`。

## Git 记录约定

- 源码、测试、文档、配置和 `.changeset/` 必须提交。
- `node_modules/`、coverage、构建产物、缓存、日志和本地环境文件不提交。
- `.env.example` 可以提交，真实 `.env` 文件不得提交。
- 不要手动提交 `es/`、`lib/`、`dist/`、`theme/` 等构建输出，发布时由构建脚本生成。
- **AI / agent 不得自行执行改动 git 状态或历史的操作**（`commit`、`push`、`git add` 含
  `--renormalize`、`reset`、`revert`、`restore`、`checkout` 还原、`stash`、`merge`、`rebase`
  等）；只读指令（`status`/`diff`/`log`/`show`）不受限。确需使用时必须先询问维护者，说明
  操作内容、影响范围和理由，经同意后执行。工作区与暂存区始终由维护者掌控。
