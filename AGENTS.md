# AGENTS.md

Project guidance for the **lh-ui-plus** repository comes first. The user-maintained personal
assistant conventions are preserved at the bottom of this file — keep that section, don't delete it.

## What this repository is

An enterprise-grade Vue 3 + TypeScript UI component library with a Chinese "国风/水墨" visual
language. It ships ESM/CJS/UMD builds, VitePress component docs, and a pnpm workspace. The core idea:
component **logic is extracted into framework-agnostic pure functions** in `packages/core/`, and the
Vue components are thin wrappers that wire props, templates, and styles to it.

## Layout and layer rules

- `packages/core/` — **no Vue imports allowed**. One folder per component containing `logic.ts`,
  `types.ts`, `index.ts`. This is where testable behavior lives; tests go in `tests/unit/core/`.
- `packages/components/<name>/` — the Vue layer, one folder per component:
    - `src/index.vue` — template, `defineProps`/`defineEmits`, `defineOptions({ name: 'LhXxx' })`
    - `src/index.ts` — the `useLhXxx(props, emit)` composable that calls core logic and shared composables
    - `src/types.ts` — props interface plus `LH_XXX_TYPE_CONST` / `LH_XXX_SIZE_CONST` spread from `lh-constants`
    - `types.ts` — re-exports `./src/types`
    - `index.ts` — default export, `.install()` for on-demand use, and type re-exports
    - `style/index.scss` — styles, starting with `@use '../../../theme/src/common/index.scss' as *`
- `packages/components/index.ts` — the `lhComponents` registry array plus named exports.
- `src/index.ts` — the public entry: combines every component, locale, type export, and global `style` import.
- `packages/utils/composables.ts` — shared `useLh*` composables: `useLhSize`, `useLhDisabled`,
  `useLhNamespace`, `useLhVModel`, `useLhComponentTheme`.
- `packages/theme/src/common/` — SCSS design tokens and CSS variables (the real theme source).
- `packages/constants/index.ts` — shared type/size/language constants.
- `packages/locales/` — i18n messages and the `lhlocale` helper.
- `dev/` — Vite playground; `tests/` — Vitest; `docs/` — VitePress site.

Rule of thumb: new behavior belongs in `packages/core` with a unit test; the Vue component only wires
props, template, and styles.

## Commands

| Task | Command |
| --- | --- |
| Playground dev server | `pnpm dev` |
| Typecheck | `pnpm typecheck` (`tsc --noEmit`) |
| Lint / autofix | `pnpm lint` / `pnpm lint:fix` |
| Unit tests (core, utils, registry) | `pnpm test:unit` |
| Component tests | `pnpm test:components` |
| Watch mode | `pnpm test` |
| Coverage | `pnpm test:coverage` |
| Build | `pnpm build` (`build:esm`, `build:cjs`, `build:umd`, `build:dts`) |
| Docs | `pnpm docs:dev` / `pnpm docs:build` |
| Release note | `pnpm changeset` |

Always prefer the narrowest command for the area you touched, e.g.
`pnpm vitest run tests/unit/core/button.spec.ts`, then widen to `lint` + `typecheck`.

### Verification is manual (user-run) — AI does not auto-execute

Unit tests, builds, typecheck, lint, and docs builds are run **by the user**, not by the AI agent.
Do not execute `pnpm test*`, `pnpm build*`, `pnpm typecheck`, `pnpm lint`, or `pnpm docs:*` unless the
user explicitly asks for it in the current request. After delivering changes:

1. List the exact commands the user should run, in order.
2. Never mark a gate as ✅/passed in docs or reports without a user-confirmed run — write
   「已交付（待手动验证）」 instead. `ai/项目分析.md` tracks the authoritative status.

## Imports and aliases

Use the aliases already wired into `tsconfig.json`, Vite, Vitest, and Rollup instead of long relative
paths: `~/*` → `packages/*`, `@lh-ui/core/*` → `packages/core/*`, `lh-constants` →
`packages/constants`, `@/*` → `src/*`, `lh-ui` → `src/index.ts`. `types` and `lh-types/*` resolve to
the repo-root `types/` directory; all current `lh-types/*` usages are type-only imports, so they are
erased at runtime and have no bundler alias — keep them `import type`.

Import rules enforced by convention (violations were cleaned up 2026-09-15):

- Component `src/types.ts` imports core types from the **subpath** `@lh-ui/core/<name>`, and shared
  types from `@lh-ui/core/shared` — never from the root barrel `@lh-ui/core/index` (it defeats
  tree-shaking and layering).
- Tests import via `~/components/<name>` / `~/core/<name>`, never `../../packages/...`.
- `src/index.ts`, `dev/`, and `docs/.vitepress/` import components/styles/themes via `~/` (and
  `lh-ui` for the library entry), never `../packages/...`.

## Conventions

- **BEM with the `lh` namespace**: `lh-button`, `lh-button__text`, `lh-button--primary`.
- **Theming**: CSS variables are named `--lh-*` and defined once in
  `packages/theme/src/common/var.scss`. Components must not re-declare them on their own element;
  they cascade from the ConfigProvider parent. Priority is component `themeVars` prop >
  `ConfigProvider.componentTheme[name]` > global `themeVars`, and `bg-pattern` is additionally gated
  by the `patternComponents` whitelist.
- **Formatting** (`.prettierrc.json`): single quotes, no semicolons, 2-space indent, `printWidth` 100,
  `singleAttributePerLine: true`. Note `pnpm format` only covers config files and `.changeset/`, so it
  will not format `packages/` or `src/` — match the style by hand.
- **ESLint**: `no-explicit-any` is off, unused vars warn unless prefixed with `_`,
  `vue/multi-word-component-names` is off. `theme/`, `es/`, `lib/`, `dist/` are ignored.
- Existing comments, docs, and commit messages are written in Chinese; keep that when editing.
- The package currently has zero runtime `dependencies` — avoid adding one without justification.

## Adding or changing a component

1. Add pure logic in `packages/core/<name>/` with a unit test in `tests/unit/core/`.
2. Create `packages/components/<name>/` following the file layout above.
3. Register in **both** `packages/components/index.ts` (`lhComponents` + exports) and `src/index.ts`
   (named export, type export, and the `style/index.scss` import).
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
  are build artifacts. Never hand-edit them; the theme source of truth is `packages/theme/`. Nothing
  under those paths is committed.
- `rollup.config.js` discovers components by scanning `packages/components/*`, so a component that is
  not wired into `src/index.ts` will build but stay unexported from the package entry.
- Vitest runs in `jsdom` with `globals: true`. Existing specs still import `describe`/`it`/`expect`
  explicitly — follow that style for consistency.
- Install with pnpm from the repo root (`.npmrc` sets `shamefully-hoist = true`).
- User-facing text belongs in `packages/locales/lang/{zh-CN,en-US}.ts`; add both locales together.

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
