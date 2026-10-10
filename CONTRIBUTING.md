# 贡献指南

感谢你对 lh-ui-plus 的关注！本文档提供了项目贡献的规范与流程。

## 快速开始

```bash
# 克隆项目
git clone https://github.com/your-org/lh-ui-plus.git
cd lh-ui-plus

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 运行测试
pnpm test

# 类型检查
pnpm typecheck

# 代码检查
pnpm lint

# 构建
pnpm build

# 开发文档
pnpm docs:dev
```

## 项目结构

```
lh-ui-plus/
├── packages/
│   ├── components/     # Vue 组封装层
│   │   └── <component>/
│   │       ├── index.ts    # 入口 + install()
│   │       ├── types.ts    # 类型 re-export
│   │       └── src/
│   │           ├── index.vue   # 组件模板
│   │           ├── index.ts    # useLhXxx composable
│   │           └── types.ts    # Props 接口
│   ├── composables/    # Vue 组合式函数（useLhTheme / useLhPopper …）
│   ├── imperative/     # 命令式挂载（message / notification / loading 服务）
│   └── locale/         # 对 @lh-ui/share/locales 的 Vue 响应式适配壳
├── src/                # 库入口（聚合导出 + theme 转发）
├── tests/              # 测试
│   ├── unit/           # 工具 / 注册表单测（core 单测在 @lh-ui/share）
│   └── components/     # 组件集成测试
├── docs/               # VitePress 文档
├── dev/                # 开发调试场
└── scripts/            # 构建脚本
```

> 框架无关的纯逻辑（core）、组件样式（styles）、主题预设（theme）、常量（constants）、语言包（locales）、纯工具（utils）均已收敛到 `@lh-ui/share`，本仓库以 npm 依赖消费，不再持有源码。

## 新增组件

新增组件必须完成以下步骤：

1. **Core 逻辑** — 在 `@lh-ui/share` 仓库的 `src/core/<name>/`（logic.ts + types.ts + index.ts）+ 该仓库的单元测试；本仓库 `pnpm up @lh-ui/share` 拉到新版本
2. **组件封装** — `packages/components/<name>/` (src + types + index.ts)；样式在 `@lh-ui/share` 的 `styles/<name>/index.scss`，本仓库不写样式
3. **注册组件** — 更新 `packages/components/index.ts` 的 `lhComponents` 数组和 exports
4. **导出入口** — 更新 `src/index.ts`（命名导出 + 类型导出 + `@lh-ui/share/styles/<name>` 样式导入）
5. **注册测试** — 更新 `tests/unit/components-registry.spec.ts` 的期望数组
6. **组件测试** — `tests/components/<name>.spec.ts`
7. **文档页面** — `docs/components/<name>.md`
8. **侧边栏** — `docs/.vitepress/config.ts` 中添加导航链接
9. **Changeset** — `pnpm changeset` 创建变更说明

验证命令：
```bash
pnpm lint          # 0 errors, 0 warnings
pnpm typecheck     # 无输出
pnpm vitest run    # 全部用例通过
pnpm docs:build    # 通过
pnpm build         # EXIT=0
```

## 代码规范

- **命名空间**：CSS 类使用 `lh-` 前缀（如 `lh-button__text--primary`）
- **Composables 前缀**：`useLh` 前缀（如 `useLhConfigProvider`）
- **路径别名**：`~/*` → `packages/*`（本仓库）；框架无关逻辑与样式走 npm 子路径 `@lh-ui/share/*`，**不要**给 `@lh-ui/share` 配别名，否则会绕过 external 被打进产物
- **导入规范**：组件 `types.ts` 从 `@lh-ui/share/core/<name>` 子路径导入，常量从 `@lh-ui/share/constants` 导入
- **样式**：组件样式唯一源在 `@lh-ui/share/styles/<name>`，本仓库不写样式声明
- **格式化**：单引号、无分号、2 空格缩进、100 字符行宽

## 提交规范

```
feat: 新增 Select 下拉选择组件
fix: 修复 Input 焦点丢失问题
docs: 更新安装文档
test: 补充 Button 边界测试
refactor: 重构 ConfigProvider 响应式逻辑
```

## AI 辅助约定

项目由 AI agent 辅助维护。验证命令由用户手动执行，AI 不会自动运行测试/构建。
