---
"@lh-ui/vue3": minor
---

命名规范收敛：非第三方公共符号补齐 `LH` 前缀（breaking rename），并补本地开发联动说明

**公共 API 改名（breaking，需迁移）**

- `usePresetTheme` → `useLhPresetTheme`（与 `useLhTheme` 同构，迁移全局预设主题切换的 import 即可）
- `LocalePath` → `LhLocalePath`（本仓再导出的类型别名；`@lh-ui/share/locales` 侧原名保持不变）

模块内部符号同步改名（不进公共入口，外部无感）：`mountComponent` → `mountLhComponent`、
`createIconComponent` → `createLhIconComponent`、`CONFIG_PROVIDER_KEY` → `LH_CONFIG_PROVIDER_KEY`、
`DropdownItemRecord` → `LhDropdownItemRecord`、`showLoading` / `closeLoading` / `closeLoadingOn`
→ `showLhLoading` / `closeLhLoading` / `closeLhLoadingOn`、message 与 notification store 的
`messageConfig` / `messageRecords` / `openMessage` / `closeMessage` 等全部加 `lh` / `Lh` 前缀。

**命名规范**（详见 `docs/project/development-guide.md`）：反域名根 `top.lhgb`（反写 `www.lhgb.top`）；
npm 端包名维持 `@lh-ui/*`（npm 包名不允许点号，反域名只落 `homepage` / `repository` 等元信息）；
非第三方符号必须带 `LH` 前缀——常量 `LH_XXX`、类型/接口 `LhXxx`、composable `useLhXxx`、
模块级单例 `lhXxx`。原生端仓（android / ios / harmony / c）的 applicationId / bundleId /
package 才使用 `top.lhgb.*` 形式。

**本地开发联动**：家族布局下 `pnpm typecheck` 现在也解析到同级 `lh-ui-share` 仓源码
（`scripts/gen-dev-tsconfig.mjs` 生成 `tsconfig.dev.json`，带兄弟仓存在性守卫，
CI 单仓 clone 时自动回退 npm 包类型）；新增 `pnpm build:local`
（`scripts/link-local-share.mjs`），把 `node_modules/@lh-ui/share` 改挂到兄弟仓**已构建产物**——
share 未发版时本地构建不再被 npm 产物滞后卡断，bare 引用与 external 语义不变
（`pnpm build` / 发版链仍读 npm 包，保持「share 先发版」的家族红线）。根 `tsconfig.json` 与
rollup 配置逐字节不动，发布声明仍保留 bare `@lh-ui/share/**` 引用。
