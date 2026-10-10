# @lh-ui/share 共享层实施计划

> 状态：**M0a 已交付、验证通过、本地发版 0.1.0 完成，2026-10-01**——仓库已建于 `lh-ui/lh-ui-share/`（git 已 init，tag `@lh-ui/share@0.1.0`）。验证链由 AI 代跑（用户授权）：lint 0 error、typecheck（strict）0 error、vitest **57 文件 / 517 用例全过**、build（es/lib preserveModules）通过、build:styles（theme 明暗 + 58 组件）通过、build:dts + verify-dts 通过、npm pack 598 文件 / 227 KB tarball（`lh-ui-share-0.1.0.tgz`）。**npm 发布暂缓**——用户决定后续统一发布到 npm 仓库，届时 `npm publish lh-ui-share-0.1.0.tgz` 或在仓库内 `pnpm publish` 即可。**M0b 联调补丁（已并入 0.1.0 提交 03fe825）**：① `types` barrel 补 `./components/base` 导出（LhSizes/LhTypes 等供 UI 库消费；注意 `.d.ts` 输入 tsc 不发射，base/index/utils 三个声明文件已改为 `.ts`）；② `utils` barrel 补 `createNamespace`/`LhNamespace`/`stripCssVarName` 导出。修复记录（M0a 当日）：新建 `src/locales/index.ts` 聚合入口、`src/types/index.ts` 移除 ambient 的 theme 导出、`src/utils/index.ts` 移除 composables（Vue 依赖）残留 re-export、tsconfig include 收窄到 src（与 plus 对齐）。当前消费方：`lh-ui/lh-ui-vue2`（M0b 已完成并全链验证）。总纲见 `ai/多端组件库规划.md`（v2，share 化修订）。
>
> 定位：lh-ui 家族**唯一的框架无关共享层**，npm 包名 `@lh-ui/share`；独立仓库 `D:\MyProgrammingLanguagesWorkspace\MyPersonalProject\lh-ui\lh-ui-share\`（与 lh-ui-plus 等平级），独立构建、独立发版。设计本意：**一个 core（纯函数），各框架只是 UI 层**——本包就是那个 core 及其附属的框架无关资产。

---

## 一、内容清单（从 lh-ui-plus 提取）

| 模块 | 源（lh-ui-plus） | 去向（share） | 说明 |
| --- | --- | --- | --- |
| core 组件逻辑（56 组件 logic/types + shared） | `packages/core/**` | `src/core/**` | 已验证零框架导入；含 `core/shared/{sx,pt,popper,focus-trap}` |
| theme SCSS 令牌 | `packages/theme/src/common/**` | `styles/theme/common/**` | 令牌随 `styles/` 发布（供各库与使用方 `@use`），聚合入口 `styles/theme/index.scss` |
| theme TS 预设 | `packages/theme/src/{types.ts,themes/**,index.ts}` | `src/theme/**` | `getThemeVars`/`THEME_PRESETS` |
| 常量 | `packages/constants/index.ts` | `src/constants/index.ts` | core 类型推导源头 |
| 语言包 | `packages/locales/lang/**` | `src/locales/lang/**` | 纯对象 |
| LhLocale 类 | `packages/locales/index.ts` | `src/locales/locale.ts` | **去响应式改造**（§四，关键设计变更） |
| 类型包 | `types/**`（lh-types） | `src/types/**` | dts 构建内联 |
| 纯工具 | `packages/utils/{index,css-var}.ts` | `src/utils/**` | debounce/throttle/deepMerge/css-var 等 |
| BEM 工具 | `composables.ts` 内 `useLhNamespace`（纯字符串函数） | `src/utils/namespace.ts` | 从 Vue composable 还原为纯函数 `createNamespace` |
| **组件样式源** | `packages/components/*/style/index.scss` | `styles/<name>/index.scss` | **唯一样式源**（§五，TDesign 式） |
| core 单元测试 | `tests/unit/core/**` | `tests/unit/core/**` | **唯一一份**（v1 计划的三份拷贝作废） |

不进入 share：一切响应式胶水（composables/hooks）、SFC/tsx 模板、install/插件体系、命令式服务、各库 docs/dev。

---

## 二、目录树

```
lh-ui-share/
├── package.json            # name: @lh-ui/share；零 dependencies；files: es/ lib/ dist/ styles/
├── vite.config.ts          # lib mode（es/cjs）
├── rollup.dts.config.js    # dts 聚合
├── tsconfig.json / tsconfig.build.json / eslint（无 vue/react 插件）
├── scripts/
│   ├── extract-from-plus.mjs   # 一次性提取脚本（§七），此后 share 为准源
│   ├── build-styles.mjs        # sass modern：编译 theme/index.css、theme-dark、styles.css 全量
│   └── verify-dts.mjs
├── src/
│   ├── core/               # <name>/{logic,types,index}.ts + shared/<tool>/index.ts + index.ts
│   ├── theme/
│   │   ├── types.ts        # ThemePreset / ThemePresetName / ThemeVars
│   │   ├── themes/         # cerblue/songhua/zhusha/shuimo/golden 预设（TS）
│   │   └── index.ts        # getThemeVars / THEME_PRESETS
│   ├── constants/index.ts
│   ├── locales/
│   │   ├── lang/*.ts       # 6 语言包
│   │   ├── types.ts        # re-export src/types/locale
│   │   └── locale.ts       # LhLocale 纯 emitter 版（§四）
│   ├── types/              # locale.ts / theme.ts（.ts 编译镜像）/ components（ambient）/ global.d.ts
│   └── utils/              # index.ts、css-var.ts、namespace.ts
├── styles/                 # 样式唯一源：<name>/index.scss + theme/common/*.scss（令牌，随包发布）
├── tests/unit/core/        # core 单测（唯一一份）
└── index.ts                # 全量聚合入口
```

---

## 三、exports 与构建

```jsonc
// package.json exports（子路径分层，对齐 plus 的 '@lh-ui/core/<name>' 惯例）
{
  "exports": {
    ".":           { "types": "./es/index.d.ts", "import": "./es/index.js", "require": "./lib/index.js" },
    "./core/*":    { "types": "./es/core/*/index.d.ts", "import": "./es/core/*/index.js", "require": "./lib/core/*/index.js" },
    "./constants": { /* 同构 */ },
    "./locales":   { /* 同构 */ },
    "./theme":     { /* TS 预设 */ },
    "./types":     { /* 纯类型 */ },
    "./utils":     { /* 同构 */ },
    "./theme.css":      "./dist/theme/index.css",      // :root 变量 + 明色
    "./theme-dark.css": "./dist/theme/index-dark.css",
    "./styles/*":       "./styles/*/index.scss",       // scss 源（供各库构建期 @use）
    "./styles.css":     "./dist/styles/index.css"      // 全量组件样式产物（独立使用场景）
  }
}
```

- 构建：vite lib mode（es/cjs）+ rollup-plugin-dts；`build-styles.mjs` 产出 `dist/theme/`、`dist/styles/`。
- **零依赖**：external 无；dts 内联 `src/types`。
- CI 门禁：grep 禁止 `from 'vue'` / `from 'react'` / `from '@dcloudio'` 出现在 `src/`（延续 plus 的 core 纯度纪律，扩大到整包）。

---

## 四、LhLocale 去响应式改造（关键设计变更）

plus 版的 `version = ref(0)` 是 Vue 响应式，不能进 share。改造为**纯事件发射器**：

```ts
// share/src/locales/locale.ts —— 框架无关
export type LhLocaleListener = (version: number) => void

export class LhLocale {
  private registry = new Map<string, Record<string, unknown>>()
  private listeners = new Set<LhLocaleListener>()
  private _version = 0
  get version(): number { return this._version }
  subscribe(l: LhLocaleListener): () => void { this.listeners.add(l); return () => this.listeners.delete(l) }
  private bump(): void { this._version += 1; this.listeners.forEach((l) => l(this._version)) }
  use(locale, messages): void { /* 注册 + bump() */ }
  setLocale(locale): void { /* 切换 + bump() */ }
  t(path: string, fallback?: string): string { /* 点路径查找 + fallback，纯逻辑 */ }
}
export const lhlocale = new LhLocale()
```

各 UI 库的响应式适配层（不属于 share）：

```ts
// vue2 / vue3 / uniapp：ref 包装
const version = ref(lhlocale.version)
lhlocale.subscribe((v) => { version.value = v })
const t = (path: string, fallback?: string) => { void version.value; return lhlocale.t(path, fallback) }

// react：useSyncExternalStore
const version = useSyncExternalStore(lhlocale.subscribe, () => lhlocale.version)
```

plus 的 `void lhlocale.version.value` 惯用法在 vue2/uniapp 适配层语义不变（切语言 → version 自增 → 订阅写 ref → 依赖 t() 的组件重渲染）。

---

## 五、样式源规范（唯一源，TDesign 式）

参照市面主流：**TDesign** 的 `tdesign-common`（样式源唯一存放共享仓，各框架包构建时编译进自己的 dist）、**Prime**（`@primeuix/themes` 共享主题包被 PrimeReact/PrimeVue/PrimeNG 共同消费）、**Ant Design Vue**（转译 antd 样式随包发布）。结论：**源唯一在 share，产物随各库发布**——既不漂移，用户也只需装一个包。

1. `styles/<name>/index.scss`：BEM `lh-*` + `!default` + `var(--lh-*, fallback)`，与 plus 现有样式同构。
2. **过渡类名双写**（一份源同时服务 Vue2/Vue3/React）：

```scss
// share/styles/dialog/index.scss
.lh-dialog-fade-enter,            // Vue2
.lh-dialog-fade-enter-from {      // Vue3 / React(useTransition)
  opacity: 0;
}
.lh-dialog-fade-leave,            // Vue2
.lh-dialog-fade-leave-to {        // Vue3 / React
  opacity: 0;
}
```

（多余的 `-enter` 规则对 Vue3/React 无害——永远不会被施加。）

3. **hairline 标记约定**：细边框规则后置 `/* hairline */` 注释，uniapp 的 px→rpx 转译据此跳过（保留 px 精度）。**M0a 暂缓，M4（uniapp 消费前）统一补齐**——AGENTS.md 已登记。
4. 纪律：UI 库**禁止**手写或拷贝修改组件样式；一切样式改动只在 share 仓库发生。

---

## 六、测试

- `tests/unit/core/**` 从 plus 整目录迁移（纯函数，唯一一份）；vitest node/jsdom。
- `composables.spec` 中纯函数部分（namespace/css-var 等）随迁；响应式用例留给各 UI 库的适配层测试。
- 样式冒烟：build-styles 编译全量通过 + 产物含 `--lh-primary-color` 断言。

---

## 七、提取与发布流程

1. 脚手架：package.json / tsconfig / eslint（无框架插件）/ vitest / CI（lint → typecheck → test → build → verify-dts）。
2. `node scripts/extract-from-plus.mjs`：按 §一 清单从 `../lh-ui-plus` 复制到 `src/` 与 `styles/` + 人工 diff 审查。
3. 首次适配（一次性，已完成）：LhLocale 去 ref 改造（§四）、`useLhNamespace` 还原为 `createNamespace` 纯函数、组件样式过渡类名双写（§五，13 个文件）、import 路径重构为包内相对路径（70 个文件）、types ambient 声明的旧路径修复。
4. 测试迁移与接线，`pnpm vitest run` 全绿。
5. build + verify-dts + `npm pack --dry-run` 白名单检查 → 发 `@lh-ui/share 0.1.0`（changesets，`access: "public"`）。

**版本升级纪律**：share 改动 → 本仓库 changeset → 发版 → 各 UI 库 `pnpm up @lh-ui/share` + 回归 → 各库发自己的版本。发布顺序硬约束：**share 先发，UI 库随其后**。

---

## 八、验证命令清单（用户手动执行）

```
pnpm lint
pnpm typecheck
pnpm vitest run              # core 单测（应与 plus 迁移前同结果）
pnpm build                   # es/lib/dist EXIT=0
node scripts/verify-dts.mjs
npm pack --dry-run           # files 白名单检查
```

---

## 九、风险

| # | 风险 | 对策 |
| --- | --- | --- |
| R1 | 提取遗漏/改坏（LhLocale 改造影响 plus 惯用法） | 提取后人工 diff；t() 语义用例原样迁移 |
| R2 | 裸包名 SCSS `@use` 在各库构建链的解析差异 | M1 在 vue2 库先用 vite NodePackageImporter 验证；回退方案 loadPaths |
| R3 | 过渡类名双写的维护歧义 | 样式源加注释说明双写原因；CI grep 禁止单写 |
| R4 | share 发版节奏与 UI 库脱节 | 升级纪律 + 各库 CI 定期 `pnpm up @lh-ui/share` 冒烟（可选） |
