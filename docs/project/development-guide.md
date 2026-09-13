# 项目开发规范

## 目录职责

- `packages/core/`：框架无关的纯函数和类型，优先独立测试。
- `packages/components/`：Vue 组件、组件类型和样式。
- `packages/components/index.ts`：全量组件注册清单和命名导出。
- `packages/theme/`：主题变量和 SCSS。
- `tests/unit/`：Core、工具和注册清单测试。
- `tests/components/`：组件渲染和交互测试。
- `docs/components/`：组件 API、示例和引入方式。
- `ai/`：阶段性分析和优化记录；稳定的开发规范同步到本目录。

## 新增组件检查清单

1. 创建组件目录、独立入口、`src/index.vue`、`src/types.ts` 和样式入口。
2. 在 `packages/components/index.ts` 和 `src/index.ts` 中加入导出及全量注册。
3. 为可复用逻辑增加 `packages/core/<component>/` 和对应 Unit 测试。
4. 增加组件测试、API 文档和 Changeset。
5. 依次执行 `pnpm lint`、`pnpm typecheck`、相关测试、`pnpm docs:build` 和 `pnpm build`。

## Git 记录约定

- 源码、测试、文档、配置和 `.changeset/` 必须提交。
- `node_modules/`、coverage、构建产物、缓存、日志和本地环境文件不提交。
- `.env.example` 可以提交，真实 `.env` 文件不得提交。
- 不要手动提交 `es/`、`lib/`、`dist/`、`theme/` 等构建输出，发布时由构建脚本生成。
