# Migration Guide

Steps and notes for migrating from other UI libraries to lh-ui-plus.

## From Element Plus

### Key Differences

| Feature | Element Plus | lh-ui-plus |
|---------|-------------|------------|
| Prefix | `el-` | `lh-` |
| Theme | SCSS variables | CSS variables (88+ tokens) |
| Dark Mode | Built-in (toggle via `html.dark` class) | Built-in (`data-theme` + `useLhTheme`) |
| Pattern Background | ❌ | ✅ 6 presets |

### Component Mapping

| Element Plus | lh-ui-plus |
|-------------|------------|
| `ElButton` | `LhButton` |
| `ElInput` | `LhInput` |
| `ElForm` | `LhForm` |
| `ElSelect` | `LhSelect` |
| `ElDialog` | `LhDialog` |

### Migration Steps

1. Replace import paths
2. Replace component tag prefixes
3. Check themeVars configuration
4. Run `pnpm lint` and `pnpm typecheck`

## From Ant Design Vue

Ant Design uses `a-` prefix, lh-ui-plus uses `lh-` prefix.

| Ant Design Vue | lh-ui-plus |
|---------------|------------|
| `a-button` | `LhButton` |
| `a-input` | `LhInput` |
| `a-form` | `LhForm` |

## General Tips

1. **Run tests first** — Ensure project builds before migrating
2. **Replace one component at a time** — Do not replace all at once
3. **Check theme differences** — CSS variables vs SCSS variables mapping
4. **Review API docs** — Confirm props/events compatibility
