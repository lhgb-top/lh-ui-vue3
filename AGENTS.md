# AGENTS.md

Project guidance for the **lh-ui-plus** repository comes first. The user-maintained personal
assistant conventions are preserved at the bottom of this file — keep that section, don't delete it.

## What this repository is

An enterprise-grade Vue 3 + TypeScript UI component library with a Chinese "国风/水墨" visual
language. It ships ESM/CJS/UMD builds, VitePress component docs, and a pnpm workspace. The core idea:
component **logic, types, constants, locales, theme, and all component SCSS live in the
framework-agnostic `@lh-ui/share` package** (npm dependency), and the Vue components here are thin
wrappers that wire props, templates, and styles to it.

## Layout and layer rules

- `@lh-ui/share`（npm 依赖，`^0.2.0`）— 框架无关共享层，**本仓库不持有其源码**：
    - `@lh-ui/share/core/<name>` — 纯函数逻辑与类型（零框架导入）；单测唯一一份在 share 仓库
    - `@lh-ui/share/styles/<name>` — 组件 SCSS **唯一源**（`styles/` 是红线，UI 库不得拷贝手改）
    - `@lh-ui/share/styles/theme/common/` — 令牌与 CSS 变量（主题真源）
    - `@lh-ui/share/constants`、`@lh-ui/share/locales/lang/*`、`@lh-ui/share/theme`
- `packages/components/<name>/` — the Vue layer, one folder per component:
    - `src/index.vue` — template, `defineProps`/`defineEmits`, `defineOptions({ name: 'LhXxx' })`
    - `src/index.ts` — the `useLhXxx(props, emit)` composable that calls core logic and shared composables
    - `src/types.ts` — props interface plus `LH_XXX_TYPE_CONST` / `LH_XXX_SIZE_CONST` spread from `@lh-ui/share/constants`
    - `types.ts` — re-exports `./src/types`
    - `index.ts` — default export, `.install()` for on-demand use, and type re-exports
    - （样式不再放本仓库：组件 scss 由 `@lh-ui/share/styles/<name>` 提供）
- `packages/components/index.ts` — the `lhComponents` registry array plus named exports.
- `src/index.ts` — the public entry: combines every component, locale, type export, and the global
  style import (`@lh-ui/share/styles/<name>` per component).
- `packages/composables/index.ts` — shared `useLh*` composables: `useLhSize`, `useLhDisabled`,
  `useLhNamespace`, `useLhVModel`, `useLhComponentTheme`.
- `packages/locale/index.ts` — Vue 响应式语言壳：把 share 的 `lhlocale`（纯事件发射器）包成
  `ref(version)`，组件里 `void lhlocale.version.value` 即可订阅语言切换。
- `packages/imperative/index.ts` — 命令式调用（loading/message/notification 的 service 创建）。
- `dev/` — Vite playground; `tests/` — Vitest; `docs/` — VitePress site.

Rule of thumb: new behavior belongs in `@lh-ui/share`'s `src/core/<name>/` with a unit test **in the
share repo**; the Vue component here only wires props, template, and styles.

## Commands

| Task | Command |
| --- | --- |
| Playground dev server | `pnpm dev` |
| Typecheck | `pnpm typecheck` (`tsc --noEmit`) |
| Lint / autofix | `pnpm lint` / `pnpm lint:fix` |
| Unit tests (utils, registry) | `pnpm test:unit` |
| Component tests | `pnpm test:components` |
| Watch mode | `pnpm test` |
| Coverage | `pnpm test:coverage` |
| Build | `pnpm build` (`build:esm`, `build:cjs`, `build:umd`, `build:dts`) |
| Docs | `pnpm docs:dev` / `pnpm docs:build` |
| Release note | `pnpm changeset` |

Always prefer the narrowest command for the area you touched, e.g.
`pnpm vitest run tests/components/button.spec.ts`, then widen to `lint` + `typecheck`.

### Verification is manual (user-run) — AI does not auto-execute

Unit tests, builds, typecheck, lint, and docs builds are run **by the user**, not by the AI agent.
Do not execute `pnpm test*`, `pnpm build*`, `pnpm typecheck`, `pnpm lint`, or `pnpm docs:*` unless the
user explicitly asks for it in the current request. After delivering changes:

1. List the exact commands the user should run, in order.
2. Never mark a gate as ✅/passed in docs or reports without a user-confirmed run — write
   「已交付（待手动验证）」 instead. `ai/项目分析.md` tracks the authoritative status.

### Git 操作红线 — AI 不得自行改动 git 状态

未经用户在当前请求中明确同意，AI 不得执行任何改动 git 状态或历史的指令，包括但不限于
`commit`、`push`、`git add`（含 `--renormalize`/`-A`）、`reset`、`revert`、`restore`、
`checkout -- <file>`、`stash`、`merge`、`rebase`、`tag`、`rm --cached`。只读指令
（`status`、`diff`、`log`、`show`、`branch` 查看）不受限。确需变更操作时：先询问用户，
说明要执行什么、影响范围和理由，得到同意后再执行；工作区/暂存区留给用户自行掌控。

## Imports and aliases

Use the aliases already wired into `tsconfig.json`, Vite, Vitest, and Rollup instead of long relative
paths: `~/*` → `packages/*`, `@/*` → `src/*`, `@lh-ui/vue3` → `src/index.ts`. `types` and `lh-types/*`
resolve to the repo-root `types/` directory; all current `lh-types/*` usages are type-only imports, so
they are erased at runtime and have no bundler alias — keep them `import type` (the dts build does alias
`lh-types` so type imports get inlined into the published declarations). `@lh-ui/share/*` 走 node_modules
的 exports 映射（`moduleResolution: bundler` 免映射），**不要**给它配路径别名——否则会绕过 external
打入产物。

Import rules enforced by convention:

- Component `src/types.ts` imports core types from the **subpath** `@lh-ui/share/core/<name>`, and shared
  types from `@lh-ui/share/core/shared` — never from the root barrel (it defeats tree-shaking and
  layering).
- 组件样式只 `@import`/`@use` `@lh-ui/share/styles/*`；本仓库不写任何样式声明（红线）。
- Tests import via `~/components/<name>` / `@lh-ui/share/core/<name>`, never `../../packages/...`.
- `src/index.ts`, `dev/`, and `docs/.vitepress/` import components/styles/themes via `~/` (and
  `@lh-ui/vue3` for the library entry), never `../packages/...`.

### PT/sx 决策（2026-09-15，详见 `ai/pt-sx-research.md`）

- **PT (PassThrough)**：**不实现**。CSS 变量主题系统 + `themeVars` prop 已覆盖 95% 定制需求。PT 破坏封装且维护成本过高。
- **sx（轻量版）**：**计划接入**。sx 工具函数已在 `@lh-ui/share/core/shared`（sx 模块），计划先接入 3-5 个高频组件（Button、Input、Dialog、Tooltip 等）作为演示。
  - 接入方式：在组件 Props 声明 `sx?: SxProps`，根元素绑定 `:style="sxToStyle(props.sx)"`
  - 首页展示文案："CSS 变量主题系统 + sx 快速布局"
  - 详细调研见 `ai/pt-sx-research.md`

## Conventions

- **BEM with the `lh` namespace**: `lh-button`, `lh-button__text`, `lh-button--primary`.
- **Theming**: CSS variables are named `--lh-*` and defined once in
  `@lh-ui/share/styles/theme/common/var.scss`. Components must not re-declare them on their own element;
  they cascade from the ConfigProvider parent. Priority is component `themeVars` prop >
  `ConfigProvider.componentTheme[name]` > global `themeVars`, and `bg-pattern` is additionally gated
  by the `patternComponents` whitelist.
- **Formatting** (`.prettierrc.json`): single quotes, no semicolons, 2-space indent, `printWidth` 100,
  `singleAttributePerLine: true`. Note `pnpm format` only covers config files and `.changeset/`, so it
  will not format `packages/` or `src/` — match the style by hand.
- **ESLint**: `no-explicit-any` is off, unused vars warn unless prefixed with `_`,
  `vue/multi-word-component-names` is off. `theme/`, `es/`, `lib/`, `dist/` are ignored.
- Existing comments, docs, and commit messages are written in Chinese; keep that when editing.
- The package has one runtime dependency — `@lh-ui/share`（core 逻辑 / 常量 / 语言包 / 主题 / 全部组件
  scss）。share 先发版、本库随其后（见 share 仓库 AGENTS.md 红线 5）；升级 share 后需全量回归。

## Adding or changing a component

1. Add pure logic in `@lh-ui/share`'s `src/core/<name>/` with a unit test **in the share repo**
   （share 单测唯一一份，本仓库不重复；发版先于本库）。
2. Create `packages/components/<name>/` following the file layout above.
3. Register in **both** `packages/components/index.ts` (`lhComponents` + exports) and `src/index.ts`
   (named export, type export, and the `@lh-ui/share/styles/<name>` import).
4. Update the expected name list in `tests/unit/components-registry.spec.ts` — it asserts the exact
   ordered registry, so a new component fails it until this is updated.
5. Add a Vitest spec under `tests/components/`, a `docs/components/<name>.md` page **and** its sidebar
   entry in `docs/.vitepress/config.ts`, plus a `.changeset/*.md` note.
6. Verification is user-run: after delivering all files, hand the user the command list
   (`pnpm lint`, `pnpm typecheck`, focused tests, `pnpm docs:build`, `pnpm build`). See
   「Verification is manual」 above — do not run them yourself unless asked.

## Gotchas

- `tests/unit/components-registry.spec.ts` asserts the **exact ordered** `lhComponents` array **and**
  reverse-checks that every directory under `packages/components/` is registered — a new component
  dir fails this test until it is added to `packages/components/index.ts`.
- The root `theme/` directory and `es/`, `lib/`, `dist/`, `coverage/`, `docs/.vitepress/{dist,cache}`
  are build artifacts. Never hand-edit them; the theme source of truth is
  `node_modules/@lh-ui/share/styles/theme/`. Nothing under those paths is committed.
- `rollup.config.js` discovers components by scanning `packages/components/*`, so a component that is
  not wired into `src/index.ts` will build but stay unexported from the package entry.
- Vitest runs in `jsdom` with `globals: true`. Existing specs still import `describe`/`it`/`expect`
  explicitly — follow that style for consistency.
- Install with pnpm from the repo root (`.npmrc` sets `shamefully-hoist = true`).
- User-facing text belongs in `@lh-ui/share/locales/lang/{zh-CN,en-US}.ts`（share 仓库）；本仓库
  `packages/locale` 只做 Vue 响应式壳。新增语言用 `lhlocale.use({ locale, messages })` 运行时注册。
- `@lh-ui/share` 的 `./styles/*` 导出已含 `/index.scss` 后缀：写 `@lh-ui/share/styles/button`，
  **不要**写 `@lh-ui/share/styles/button/index.scss`（后者会解析到不存在的双重后缀路径）。

## Read before touching sensitive areas

- `docs/project/development-guide.md` — the canonical 项目开发规范 (directory duties, new-component
  checklist, git rules). Keep it in sync when you change these conventions.
- `.github/agents/lh-ui-plus-maintainer.agent.md` — maintainer working style and quality bar.
- `ai/项目分析.md` — ongoing architecture analysis and optimization notes.
- `.changeset/README.md` — release-note workflow.

---

# Personal workspace conventions (user-maintained)

## First Run
If `BOOTSTRAP.md` exists, that's your birth certificate. Follow it, figure out who you are, then delete it. You won't need it again.

## Session Startup
- Context already includes: AGENTS.md, SOUL.md, USER.md, recent daily memory, MEMORY.md (main sessions only). Do not manually reread them.

## Memory
- You wake up fresh each session. These files are your continuity.
- Daily notes: `memory/YYYY-MM-DD.md` — raw logs. Long-term: `MEMORY.md` — curated memories, distilled essence, not raw logs.
- Document lessons learned and mistakes so future-you doesn't repeat them.

## Red Lines
- Don't exfiltrate private data. Don't run destructive commands without asking.
- `trash` > `rm`. When in doubt, ask.

## External vs Internal
- Ask first: sending emails/posts, anything leaving the machine, anything uncertain.

## Group Chats
- You're a participant, not the user's proxy. Think before sharing.
- Respond when mentioned, adding value, or correcting misinformation. Stay silent during casual banter.
- Quality > quantity. One thoughtful response beats three fragments.
- Use emoji reactions naturally — one per message.

## Tools
- Discord/WhatsApp: no markdown tables. Discord links: wrap in `<>`. WhatsApp: no headers.

## Heartbeats
- Proactive work: organize memory, check projects, update docs, commit changes.
- Every few days: review daily notes, distill into MEMORY.md, remove outdated info.

## Make It Yours
- Evolve this file as you figure out what works.
