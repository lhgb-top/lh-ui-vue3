# Contributing Guide

Welcome to contribute to lh-ui-plus! This document provides detailed contribution workflow.

## Prerequisites

- Node.js 18+
- pnpm
- Basic Git operations

## Installation

```bash
git clone https://github.com/lhgb-top/lh-ui-plus.git
cd lh-ui-plus
pnpm install
```

## Development Workflow

### 1. Start Dev Server

```bash
pnpm dev
```

### 2. Run Tests

```bash
pnpm test:unit      # Core unit tests
pnpm test:components  # Component integration tests
pnpm test            # All tests
```

### 3. Type Check

```bash
pnpm typecheck
```

### 4. Lint

```bash
pnpm lint
pnpm lint:fix       # Auto-fix
```

### 5. Build

```bash
pnpm build
```

### 6. Docs

```bash
pnpm docs:dev
```

## Adding a Component

See AGENTS.md §"Adding or changing a component" for full process.

Summary:

1. `@lh-ui/share`'s `src/core/<name>/` — Core logic + unit tests (done in the share repo; consumed here as an npm dependency)
2. `packages/components/<name>/` — Vue component wrapper
3. `packages/components/index.ts` — Register to `lhComponents`
4. `src/index.ts` — Update exports
5. `tests/unit/components-registry.spec.ts` — Update expected array
6. `tests/components/<name>.spec.ts` — Component tests
7. `docs/components/<name>.md` — Doc page
8. `docs/.vitepress/config.ts` — Sidebar navigation

Verification:

```bash
pnpm lint          # 0 errors, 0 warnings
pnpm typecheck     # No output
pnpm vitest run    # All pass
pnpm docs:build    # Success
```

## Docs Site Deployment

The docs deployment path is configured in `docs/.env.production` (single source of truth); the production build is simply:

```bash
pnpm docs:build
```

| Env var | Description | Default | Example |
|---------|-------------|---------|---------|
| `DOCS_BASE` | Site base path; leading and trailing slashes required | `/` | `/lhui/plus/` |
| `DOCS_HOSTNAME` | Canonical site origin, used for sitemap and SEO meta | `https://www.lhgb.top` | `https://your-site.com` |

Both variables apply to asset paths, the sitemap, `og:url` and other SEO tags, as well as the `robots.txt` regenerated at the end of the build.

> Why an .env file instead of an inline variable: Vite loads env *after* evaluating the user config, so `docs/.vitepress/config.ts` must call `loadEnv` explicitly to read these values at build time. Also, Windows Git Bash mangles an inline `DOCS_BASE=/lhui/plus/` via MSYS path conversion into a local absolute path. An inline var (`DOCS_BASE=/xxx/ pnpm docs:build`) still works as a temporary override, but editing `.env.production` is more reliable for real deployments.

### Unified Deployment Prefix

The FengMo portal (www.lhgb.top) lists all LH-UI component libraries on its hub page (`/ui`) using the unified convention **`/lhui/{lib-name}/`** for docs deployment paths — not bound to framework names. This library (Vue 3) deploys to **`/lhui/plus/`** (already set in `docs/.env.production`); the production build command is:

```bash
pnpm docs:build
```

Upload the build output to `/home/webuser/nginx/lh-ui/plus/` on the server (see the `/lhui/plus/` location in the frontend workspace's `docs/nginx-proxy.conf`). Future libraries (Vue 2 / React / Uniapp) extend under `/lhui/{lib-name}/` the same way.

## Code Conventions

- CSS classes use `lh-` prefix (e.g., `lh-button__text--primary`)
- Composables use `Lh` prefix (e.g., `useLhConfigProvider`)
- Constants use UPPER_SNAKE_CASE (e.g., `LH_TYPES_CONST`)
- Path aliases: `~/*` → `packages/*` (this repo); framework-agnostic logic and styles live in `@lh-ui/share`, imported via npm subpaths (`@lh-ui/share/core/*`, `@lh-ui/share/styles/*`)
- Formatting: single quotes, no semicolons, 2-space indent, 100 char line width

## Commit Format

```
feat: Add new Select dropdown component
fix: Fix Input focus loss issue
docs: Update installation docs
test: Add Button edge case tests
refactor: Refactor ConfigProvider reactive logic
```

## AI Convention

The project is maintained with AI agent assistance. All verification commands are run by users manually.