# 贡献指南

欢迎为 lh-ui-plus 贡献代码！本文档提供详细的贡献流程。

## 前提条件

- Node.js 18+
- pnpm 安装相依
- Git 基本操作

## 安装相依

```bash
git clone https://github.com/lhgb-top/lh-ui-plus.git
cd lh-ui-plus
pnpm install
```

## 开发流程

### 1. 启动开发服务器

```bash
pnpm dev
```

### 2. 运行测试

```bash
pnpm test:unit      # Core 层单元测试
pnpm test:components  # 组件集成测试
pnpm test            # 全部测试
```

### 3. 类型检查

```bash
pnpm typecheck
```

### 4. 代码检查

```bash
pnpm lint
pnpm lint:fix       # 自动修复
```

### 5. 构建

```bash
pnpm build
```

### 6. 查看文档

```bash
pnpm docs:dev
```

## 新增组件

完整流程请参考 AGENTS.md §"Adding or changing a component"。

简要步骤：

1. `@lh-ui/share` 的 `src/core/<name>/` — 核心逻辑 + 单元测试（在 share 仓库完成，本仓库以 npm 依赖消费）
2. `packages/components/<name>/` — Vue 组件封装
3. `packages/components/index.ts` — 注册到 `lhComponents`
4. `src/index.ts` — 更新出口
5. `tests/unit/components-registry.spec.ts` — 更新期望数组
6. `tests/components/<name>.spec.ts` — 组件测试
7. `docs/components/<name>.md` — 文档页面
8. `docs/.vitepress/config.ts` — 侧边栏导航

验证命令：

```bash
pnpm lint          # 0 errors, 0 warnings
pnpm typecheck     # 无输出
pnpm vitest run    # 全部用例通过
pnpm docs:build    # 通过
```

## 文档站部署

文档站的部署路径由 `docs/.env.production` 集中配置（单一数据源），生产构建直接：

```bash
pnpm docs:build
```

| 环境变量 | 说明 | 默认值 | 示例 |
|----------|------|--------|------|
| `DOCS_BASE` | 站点 base 路径，首尾必须带斜杠 | `/` | `/lhui/plus/` |
| `DOCS_HOSTNAME` | 站点规范域名，用于 sitemap 与 SEO meta | `https://www.lhgb.top` | `https://your-site.com` |

这两个变量会同时作用于资源路径、sitemap、`og:url` 等 SEO 标签，以及构建末尾重新生成的 `robots.txt`。

> 为什么放在 .env 而不是行内变量：Vite 内置的 env 加载发生在用户 config 求值**之后**，`docs/.vitepress/config.ts` 必须显式 `loadEnv` 才能在生产构建时读到这些值；此外 Windows Git Bash 的 MSYS 会把行内的 `DOCS_BASE=/lhui/plus/` 自动转成本地绝对路径。临时覆盖仍可用行内变量（`DOCS_BASE=/xxx/ pnpm docs:build`），但日常部署改 `.env.production` 更稳妥。

### 统一发布前缀约定

风默门户（www.lhgb.top）的 LH-UI 组件库导航页（`/ui`）按 **`/lhui/{库名}/`** 统一约定各组件库文档站的部署路径，不与框架名绑定。本库（Vue 3 版）部署在 **`/lhui/plus/`**（已写入 `docs/.env.production`），生产构建命令：

```bash
pnpm docs:build
```

构建产物上传到服务器 `/home/webuser/nginx/lh-ui/plus/`（Nginx location 片段的权威参考副本见
家族 [`docs/部署/nginx-lhui.conf.md`](../../../docs/部署/nginx-lhui.conf.md)，线上真身在前端工作区
`docs/nginx-proxy.conf`）。家族八站已全部按此约定部署：

| 仓库 | base | alias 目录 | cleanUrls |
| --- | --- | --- | --- |
| lh-ui-plus（本库） | `/lhui/plus/` | `/home/webuser/nginx/lh-ui/plus/` | 否 |
| lh-ui-vue2 | `/lhui/vue2/` | `/home/webuser/nginx/lh-ui/vue2/` | 否（VuePress 1.x） |
| lh-ui-react | `/lhui/react/` | `/home/webuser/nginx/lh-ui/react/` | 否 |
| lh-ui-uniapp | `/lhui/uniapp/` | `/home/webuser/nginx/lh-ui/uniapp/` | 是 |
| lh-ui-android | `/lhui/android/` | `/home/webuser/nginx/lh-ui/android/` | 是 |
| lh-ui-ios | `/lhui/ios/` | `/home/webuser/nginx/lh-ui/ios/` | 是 |
| lh-ui-harmony | `/lhui/harmony/` | `/home/webuser/nginx/lh-ui/harmony/` | 是 |
| lh-ui-windows | `/lhui/windows/` | `/home/webuser/nginx/lh-ui/windows/` | 是 |

原生血脉四站（android / ios / harmony / windows）是 VitePress 站内嵌静态 HTML 模拟器，部署方式与
web 血脉四站完全相同。新增库仍按 `/lhui/{库名}/` 各自扩展 location 与 `.env.production`。

> cleanUrls 站（uniapp 及原生四端）的 Nginx `try_files` 必须含 `$uri.html`，否则无后缀 URL
> 取不到预渲染的 `.html`；非 cleanUrls 站不需要这一段。详见参考副本的「三条契约」节。

## 代码规范

- CSS 类使用 `lh-` 前缀（如 `lh-button__text--primary`）
- Composables 必须使用 `Lh` 前缀（如 `useLhConfigProvider`）
- 常量对象必须使用全大写蛇形命名（如 `LH_TYPES_CONST`）
- 路径别名：`~/*` → `packages/*`（本仓库）；框架无关逻辑与样式在 `@lh-ui/share`，走 npm 子路径导入（`@lh-ui/share/core/*`、`@lh-ui/share/styles/*`）
- 格式化：单引号、无分号、2 空格缩进、100 字符行宽

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
