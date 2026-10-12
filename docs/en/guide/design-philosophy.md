# Design Philosophy

lh-ui-plus follows the philosophy "Beauty of tradition, foundation of code", integrating Chinese traditional aesthetics into modern frontend engineering.

## Chinese Aesthetic Design

### Color System

Our color palette is inspired by traditional Chinese pigments:

| Color | Source | Value | Usage |
|-------|--------|-------|-------|
| Indigo | Blue-and-white porcelain | `#2B4C7C` | Primary (`--lh-primary-color`) |
| Songhua Green | Bamboo leaves | `#5B8C5A` | Success (`--lh-success-color`) |
| Golden | Autumn leaves | `#C4A35A` | Warning (`--lh-warning-color`) |
| Cinnabar | Seal paste | `#B23A3A` | Danger (`--lh-danger-color`) |
| Dai (ink-wash grey) | Faded ink wash | `#7A7A7A` | Info (`--lh-info-color`) |
| Ink | Five shades of ink | `#2C2C2C` | Text (`--lh-text-color-primary`) |
| Xuan Paper | Ancient paper | `#FAF6F0` | Background (`--lh-bg-color`) |

For the full palette and its layers, see [Theme Customization](/en/guide/theme-customization).

### Pattern Backgrounds

6 traditional SVG pattern backgrounds built in (applied via `--lh-bg-pattern`, whose value is the matching CSS variable):

- **willow** — Willow leaf (`--lh-pattern-willow`)
- **cloud** — Auspicious cloud (`--lh-pattern-cloud`)
- **water** — Water wave (`--lh-pattern-water`)
- **snow** — Snowflake (`--lh-pattern-snow`)
- **plum** — Plum blossom (`--lh-pattern-plum`)
- **bamboo** — Bamboo leaf (`--lh-pattern-bamboo`)

## Cross-Framework Architecture

Core logic extracted as pure functions, decoupled from any framework:

```
@lh-ui/share           Pure logic + style source (framework-agnostic, consumed as an npm dependency)
packages/components/    Vue 3 component wrapper
packages/composables/  Vue-specific composables
```

## TypeScript Driven

Full-stack TypeScript type safety:

- Strong Props/Emit type definitions
- Type-safe event callback payloads
- IDE auto-completion
- Type coverage guarded by `pnpm typecheck` (controlled index signatures remain for dynamic utility types like `LhSxProps`)

## CSS Variable Theme System

88+ CSS design tokens with `--lh-*` prefix. Supports real-time theme switching, dark mode, and ConfigProvider global configuration.

## Internationalization

Built-in ConfigProvider system for multi-language management.
Complete built-in locales: zh-CN, en-US; ja-JP, ko-KR, de-DE, fr-FR are registered as structural placeholders (untranslated parts fall back to English) and can be filled in following the [i18n guide](/en/guide/i18n).

## Accessibility

- Keyboard navigation
- ARIA attributes
- WCAG 2.1 AA color contrast

> Beauty of tradition, foundation of code.