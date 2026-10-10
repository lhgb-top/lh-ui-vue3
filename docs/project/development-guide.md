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
