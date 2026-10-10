# 发布指南

本文档说明如何把 `@lh-ui/vue3` 发布到 npm 公共仓库，以及如何把它托管到私有服务器（tarball 直链与 registry 元数据两种方式）。

发布支持**手动与 CI 自动双通道**：本地执行 changeset 命令，由人确认版本号与变更说明后再发包（下文「发布流程」）；推送到 main 且 `.changeset/**` 有变动时，GitHub Actions 会自动执行 version + publish（见「GitHub Actions 自动发布」）。

## 前置准备

### 1. npm 账号与 scope 所有权

- 注册 [npm](https://www.npmjs.com/) 账号，开启两步验证（2FA）。
- 确认你的账号拥有 `@lh-ui` 这个 scope 的发布权限：scope 是先到先得的，首次发布 `@lh-ui/*` 包的账号即成为该 scope 的 owner。
- 本地登录：

  ```bash
  npm whoami          # 确认当前登录账号
  npm login           # 未登录时按提示完成登录 + 2FA
  ```

### 2. 确认 registry 指向公共仓库

仓库根 `.npmrc` 只配了 `shamefully-hoist = true`，没有写死 registry，默认走 `https://registry.npmjs.org/`。`package.json` 的 `publishConfig` 也锁定了公共仓库：

```json
"publishConfig": {
  "access": "public",
  "registry": "https://registry.npmjs.org/"
}
```

> **不要**在仓库根 `.npmrc` 里写私有 registry 地址——那会把发包也导向私有源。临时切换 registry 请用项目外的用户级 `~/.npmrc` 或命令行参数。

### 3. 一次发包包含什么

`files` 白名单只发布构建产物：`es/`（ESM + 类型 + 组件样式）、`lib/`（CJS）、`dist/`（UMD + 全量样式）。源码、文档、测试、脚本都通过 `.npmignore` 排除。执行发布命令时 `prepublishOnly` 会自动先跑一遍 `pnpm build`，所以**不用手动先构建**。

## 发布流程

### 第 1 步：写 changeset

每个用户可见的改动都应该有一条 changeset。如果本次改动已经写过了，跳到第 2 步。

```bash
pnpm changeset
```

按交互提示选择 `@lh-ui/vue3`、bump 类型（major / minor / patch）和变更说明。

> **注意：本仓库的 changeset 是累积的。** 当前 `.changeset/` 下堆积了数十条未消费的 changeset，执行第 2 步的 `changeset version` 时会**一次性全部消费、合并成同一个版本**。如果你想分批发布，需要先用 git 分支或手动挪走部分 changeset 文件来控制节奏。

### 第 2 步：升版本号、生成 CHANGELOG

```bash
pnpm changeset:version
```

这条命令会：

- 按 changeset 的最高 bump 级别计算新版本号，写入 `package.json`
- 汇总所有 changeset 生成 `CHANGELOG.md`
- 删除已消费的 `.changeset/*.md`（`config.json` 里 `commit: false`，不会自动提交）

执行后**务必人工检查**：

```bash
git status              # 确认 changeset 被消费、CHANGELOG 已生成
git diff package.json   # 确认版本号符合预期
```

### 第 3 步：发布

```bash
pnpm changeset:publish
```

它内部执行 `pnpm publish`，流程是：

1. 触发 `prepublishOnly` → `pnpm build`（ESM / CJS / UMD / 类型 / 样式全量构建）
2. 按 `publishConfig` 打包并推送到 npm 公共仓库
3. 生成并推送 git tag（格式 `@lh-ui/vue3@<version>`）

因为 `publishConfig.access` 是 `public`，scoped 包也会公开可见，不需要额外加 `--access public`。

### 第 4 步：推送（由你执行）

```bash
git push --follow-tags
```

## 发布前自检

正式发包前，用 dry-run 看一眼实际打包内容：

```bash
npm pack --dry-run
```

确认输出里：

- 只包含 `es/`、`lib/`、`dist/` 三个目录
- **不含** `src/`、`packages/`、`docs/`、`tests/`、`scripts/`、`ai/`
- 体积合理（UMD 全量包约 600KB，全量样式约 700KB，属预期范围）

## 发布后验证

```bash
# 1. npm 上能看到新版本
npm view @lh-ui/vue3
npm view @lh-ui/vue3 versions

# 2. 新建沙盒项目实测三种模块格式
pnpm create vite verify-pkg --template vue-ts
cd verify-pkg && pnpm add @lh-ui/vue3
```

在沙盒项目里逐一验证：

| 验证项 | 写法 |
| ------ | ---- |
| 完整引入（ESM） | `import LhUiPlus from '@lh-ui/vue3'` + `import '@lh-ui/vue3/dist/index.css'` |
| 按需引入组件 | `import { LhButton } from '@lh-ui/vue3'` |
| 按需引入样式（需 sass） | `import '@lh-ui/vue3/style/button'` |
| 按需引入样式（免 sass） | `import '@lh-ui/vue3/style-css/button'` |
| 主题工具 | `import { getThemeVars } from '@lh-ui/vue3/theme'` |
| CDN（数分钟后刷新） | `https://unpkg.com/@lh-ui/vue3` |

## 私有服务器托管（静态 tarball）

npm 公共仓库是主发布渠道；如果你需要一份自托管的镜像（内网使用、npm 被墙、或想锁定特定版本），把 tarball 放到你自己的服务器上是最轻量的方案，**不需要搭建私有 npm registry**。

### 1. 打包 tarball

```bash
pnpm build
npm pack
```

生成的文件名是 `lh-ui-vue3-<version>.tgz`——npm 会把 scope 里的 `@lh-ui/` 转成 `lh-ui-vue3-`（斜杠变连字符）。也可以用 `npm pack --dry-run` 提前确认。

### 2. 上传到服务器

沿用现有 nginx 站点的目录约定（文档站部署在 `/home/webuser/nginx/lh-ui/plus/`），在其下新建 `packages/` 目录，按版本分目录存放：

```
/home/webuser/nginx/lh-ui/plus/
├── index.html              # 文档站
└── packages/
    ├── 1.0.0/
    │   └── lh-ui-vue3-1.0.0.tgz
    ├── 1.1.0/
    │   └── lh-ui-vue3-1.1.0.tgz
    └── latest              # 软链，指向当前推荐版本
        └── lh-ui-vue3-1.1.0.tgz
```

对应 URL：

```
https://www.lhgb.top/lhui/plus/packages/1.0.0/lh-ui-vue3-1.0.0.tgz
```

`packages/` 是静态文件目录，复用现有站点的 nginx 配置即可，不需要新增 location：

```nginx
# 已有的文档站 location 已覆盖 /lhui/plus/ 前缀，
# packages/ 作为其子目录自动可访问，只需确保
# .tgz 的 Content-Type 能被下载（nginx 默认 octet-stream 即可）
location /lhui/plus/ {
    alias /home/webuser/nginx/lh-ui/plus/;
    autoindex off;
}
```

### 3. 从私有服务器安装

三种等价写法，任选其一：

```bash
# pnpm
pnpm add https://www.lhgb.top/lhui/plus/packages/1.0.0/lh-ui-vue3-1.0.0.tgz

# npm
npm install https://www.lhgb.top/lhui/plus/packages/1.0.0/lh-ui-vue3-1.0.0.tgz

# yarn
yarn add https://www.lhgb.top/lhui/plus/packages/1.0.0/lh-ui-vue3-1.0.0.tgz
```

或直接写进 `package.json`：

```json
{
  "dependencies": {
    "@lh-ui/vue3": "https://www.lhgb.top/lhui/plus/packages/1.0.0/lh-ui-vue3-1.0.0.tgz"
  }
}
```

### 4. 注意事项

- **绕过 registry 依赖解析**：tarball 安装不查 registry，依赖直接来自 tarball 内的声明。本包零运行时 `dependencies`，只有 `peerDependencies.vue`，所以消费侧项目里有 Vue 3 就能装上、能跑。
- **没有版本元数据**：`npm update` 对 tarball 依赖无效，升级必须手动换 URL（或改 `latest` 软链后重装）。适合做**版本锁定镜像**，不适合频繁更新。
- **https 是必须的**：pnpm / npm / yarn 默认拒绝 http 的 tarball 地址。
- **`pnpm-lock.yaml` 里会是完整 URL + integrity hash**：团队协作时锁文件可正确复现安装，无需访问 npm。

## 私有服务器托管（registry 元数据）

上面的 tarball 直链能用，但 `pnpm update` 无效、lockfile 里是一串 URL。若你希望消费侧像用普通包一样 `pnpm add @lhgb/vue3`、走版本解析与 `dist-tags`，可以让 Nginx 静态目录额外伪造一份 npm registry 元数据，充当**只读 registry**。两种方式可以共存。

### 1. 打包

```bash
pnpm build
node scripts/pack-private.mjs
```

脚本做的事：把同一份构建产物改名为 `@lhgb/vue3`（仅 `name` / `publishConfig` 不同），`npm pack` 产出 tarball，计算 `integrity`（sha512）与 `shasum`（sha1），拼装 registry 元数据 JSON，输出到 `private-registry/`：

```
private-registry/
├── @lhgb/vue3              # 元数据 JSON（无扩展名）
└── tarballs/@lhgb/vue3/
    └── lhgb-vue3-1.0.0.tgz
```

常用参数：

- `--dry-run`：只打印将生成的文件清单与元数据，不落盘，用于发包前核对
- `--incremental`：读取已有元数据再合并新版本，避免覆盖历史版本

### 2. 部署到服务器

把 `private-registry/` 的内容上传到服务器目录，并套用 `scripts/nginx-private-registry.conf.example` 的 location（与文档站 `/lhui/plus/` 同一套 Nginx，独立 location）：

```
/home/webuser/nginx/lhgb/
├── @lhgb/vue3
└── tarballs/@lhgb/vue3/
    └── lhgb-vue3-1.0.0.tgz
```

Nginx 配置的关键是 `default_type application/json`——元数据文件没有扩展名，不强制声明类型客户端会按纯文本解析失败：

```nginx
location /lhgb/ {
  alias /home/webuser/nginx/lhgb/;
  default_type application/json;
  autoindex off;

  location ~ \.tgz$ {
    default_type application/octet-stream;
  }
}
```

### 3. 从私有 registry 安装

项目级或用户级 `.npmrc` 加一行：

```ini
@lhgb:registry=https://www.lhgb.top/lhgb
```

三种包管理器统一：

```bash
pnpm add @lhgb/vue3
# 或
npm install @lhgb/vue3
# 或
yarn add @lhgb/vue3
```

### 4. 与公共包的关系

`@lhgb/vue3` 与 `@lh-ui/vue3` **同源同版本**，构建产物完全相同，仅 `name` 与 `registry` 不同，二者可互换：

- 内网 / npm 被墙 / 需要锁定发布源的场景用 `@lhgb/vue3`
- 对外开放、希望被 unpkg / jsdelivr CDN 命中的场景用 `@lh-ui/vue3`

### 5. 注意事项

- **元数据要增量更新**：每次发包后用 `--incremental` 合并新版本，直接覆盖会丢失历史版本元数据，旧版本将无法安装。
- **tarball 不可移动**：元数据里的 `tarball` URL 是绝对路径，文件位置与 URL 必须一一对应。
- **同样必须 https**：pnpm / npm / yarn 默认拒绝 http 地址。
- **不要把 `@lhgb` registry 写进仓库根 `.npmrc`**：根 `.npmrc` 只保留 `shamefully-hoist = true`，私服地址写到用户级 `~/.npmrc`，避免污染发包链路。

## GitHub Actions 自动发布

除手动流程外，`.github/workflows/release.yml` 提供自动发布通道：

- **触发条件**：推送到 `main` 且 `.changeset/**` 或 `package.json` 有变动；或仓库 Actions 页面手动触发（`workflow_dispatch`）。
- **行为**：跑 `pnpm build` + `pnpm verify:dts` 后执行 changesets/action 的 version + publish；没有待发布的 changeset 时**什么都不做**，所以挂在 push 上是安全的。
- **所需 secret**：在仓库 Settings → Secrets and variables → Actions 配置 `NPM_TOKEN`——在 npm 生成 Granular Access Token，勾选 `@lh-ui` 组织的 publish 权限。

手动与自动通道可以并存：本地 `pnpm changeset:publish` 适合需要人工确认每一次发包的场景；CI 适合沉淀好 changeset 后自动滚雪球式发布。

## 回滚

```bash
# 标记某版本已废弃（推荐，不影响已安装的用户）
npm deprecate @lh-ui/vue3@1.0.0 "该版本存在 xx 问题，请升级到 1.0.1"

# 彻底下架：仅发布 72 小时内可行，且无其他包依赖时
npm unpublish @lh-ui/vue3@1.0.0
```

CDN（unpkg / jsdelivr）的缓存会在数小时到一天内失效，回滚后可在沙盒项目用带版本号的 URL 验证旧版本是否仍可装。
