# Frequently Asked Questions

## Installation & Setup

### How to install @lh-ui/vue3?

```bash
pnpm add @lh-ui/vue3
```

### How to import components?

```ts
import LhUiPlus from '@lh-ui/vue3'
import '@lh-ui/vue3/dist/index.css'

app.use(LhUiPlus)
```

### How to import on-demand?

```ts
import { LhButton, LhInput } from '@lh-ui/vue3'
```

## Theme Customization

### How to customize theme colors?

```vue
<LhConfigProvider :theme-vars="{ 'primary-color': '#e63946' }">
  <App />
</LhConfigProvider>
```

### How to use dark mode?

```ts
import { useLhTheme } from '@lh-ui/vue3'
const { theme, toggleTheme } = useLhTheme()
```

`useLhTheme` returns `{ theme, setTheme, toggleTheme }`: `theme` is the current mode (`light` / `dark`), `toggleTheme` switches it, `setTheme` sets it directly.

### How to switch preset themes?

Use `useLhPresetTheme`:

```ts
import { useLhPresetTheme } from '@lh-ui/vue3'
const { preset, setPreset, presets } = useLhPresetTheme()
setPreset('songhua') // switches to Pine Green, written to :root and persisted
```

Pass `applyToRoot: false` to only take the returned `themeVars` and hand them to `LhConfigProvider` for a scoped effect. See [Theme Presets](/en/guide/themes).

## Internationalization

### How to switch language?

```vue
<script setup lang="ts">
import { LhConfigProvider, enUS } from '@lh-ui/vue3'
</script>

<template>
  <LhConfigProvider :locale="enUS">
    <App />
  </LhConfigProvider>
</template>
```

Locale messages are named exports (`zhCN` / `enUS`) from the package root.

### How to add a new language?

Language packs live in the shared layer `@lh-ui/share` (`@lh-ui/share/locales/lang/`); this repo no longer ships its own. Register a new language at runtime with `lhlocale.use({ locale: 'xx-XX', messages })` — `lhlocale` is exported from `@lh-ui/vue3`.

## Component Usage

### How to use sx quick layout?

```vue
<LhButton :sx="{ mt: 2, px: 4 }">Button</LhButton>
```

`sx` only supports layout properties (size `w` / `h`, spacing `m*` / `p*`, flex `display` / `flex`, etc.); use `type` or theme variables for colors.

### How to enable pattern backgrounds?

```vue
<LhConfigProvider :pattern-components="['button', 'dialog']">
  <LhButton bg-pattern="var(--lh-pattern-willow)">Patterned button</LhButton>
</LhConfigProvider>
```

`patternComponents` takes lowercase component names (`'button'` / `'dialog'`, no `Lh` prefix); `bg-pattern` accepts a CSS variable (e.g. `var(--lh-pattern-willow)`) or an image URL. See [Pattern Backgrounds](/en/guide/theme-patterns).

## Development

### How to contribute?

See [Contributing Guide](/en/guide/contributing).

### AI Assisted Development

The project is maintained with AI agent assistance. Verification commands are run by users manually.