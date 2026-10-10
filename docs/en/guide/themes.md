# Theme Presets

lh-ui-plus ships 5 Chinese-style preset themes, ready to use. Two ways to apply them:

- **Global switching** (recommended): `usePresetTheme` writes preset variables to `:root`, applying site-wide and persisted to localStorage.
- **Scoped switching**: `LhConfigProvider :theme-vars` only affects its own subtree — suitable for showing multiple themes side by side on one page.

Preset variables are available via `getThemeVars(name)` (from `@lh-ui/vue3/theme`); the `name` values are listed in the sections below.

## Site-level Theme Switching

This site provides a "Theme preset" dropdown in the top navigation bar to switch between the 5 Chinese-style themes. Your choice is persisted to `localStorage['lh-docs-preset']` and survives page refreshes.

> The theme preset and light/dark mode are **two independent axes**: the 🌙/☀️ toggle in the navbar switches between light and dark, while the "Theme preset" dropdown switches the color palette (Ceramic Blue, Vermilion, Pine Green, etc.). Presets also apply in dark mode, producing dark variants of each palette.

## The `themeVars` and `bgPattern` props

Every lh-ui-plus component supports local theme overrides via `LhConfigProvider` or its own `themeVars` prop; pattern backgrounds are controlled uniformly through the `bgPattern` prop (patterns come from the ConfigProvider `patternComponents` whitelist). Because these are cross-component capabilities, they are not demonstrated on every component page — see [Theme Customization](/en/guide/theme-customization) and [Pattern Background](/en/guide/theme-patterns) instead.

## Ceramic Blue (Default)

The default theme — classic blue-and-white porcelain, elegant and clean. Preset name: `cerblue`.

<DemoBlock title="Ceramic Blue Theme">
  <LhConfigProvider :theme-vars="cerblueTheme">
    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <LhButton type="primary">Primary</LhButton>
      <LhButton type="success">Success</LhButton>
      <LhButton type="warning">Warning</LhButton>
      <LhButton type="danger">Danger</LhButton>
      <LhTag type="primary">Tag</LhTag>
      <LhSwitch />
    </div>
  </LhConfigProvider>
</DemoBlock>

```vue
<script setup lang="ts">
import { LhConfigProvider, LhButton, LhTag, LhSwitch } from '@lh-ui/vue3'
import { getThemeVars } from '@lh-ui/vue3/theme'

// getThemeVars returns keys already prefixed with --lh-; ConfigProvider prefixing is
// idempotent, so the result can be passed straight to :theme-vars
const cerblueTheme = getThemeVars('cerblue')
</script>

<template>
  <LhConfigProvider :theme-vars="cerblueTheme">
    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <LhButton type="primary">Primary</LhButton>
      <LhButton type="success">Success</LhButton>
      <LhButton type="warning">Warning</LhButton>
      <LhButton type="danger">Danger</LhButton>
      <LhTag type="primary">Tag</LhTag>
      <LhSwitch />
    </div>
  </LhConfigProvider>
</template>
```

## Pine Green

Bamboo forest, vibrant and fresh. Preset name: `songhua`.

```vue
<script setup lang="ts">
import { LhConfigProvider, LhButton, LhTag, LhSwitch } from '@lh-ui/vue3'
import { getThemeVars } from '@lh-ui/vue3/theme'

const songhuaTheme = getThemeVars('songhua')
</script>

<template>
  <LhConfigProvider :theme-vars="songhuaTheme">
    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <LhButton type="primary">Primary</LhButton>
      <LhTag type="primary">Tag</LhTag>
      <LhSwitch />
    </div>
  </LhConfigProvider>
</template>
```

## Vermilion

Traditional seal red, ceremonial and dignified. Preset name: `zhusha`.

```vue
<script setup lang="ts">
import { LhConfigProvider, LhButton, LhTag, LhSwitch } from '@lh-ui/vue3'
import { getThemeVars } from '@lh-ui/vue3/theme'

const zhushaTheme = getThemeVars('zhusha')
</script>

<template>
  <LhConfigProvider :theme-vars="zhushaTheme">
    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <LhButton type="primary">Primary</LhButton>
      <LhTag type="primary">Tag</LhTag>
      <LhSwitch />
    </div>
  </LhConfigProvider>
</template>
```

## Ink Wash

Ink painting style, minimalist and pure. Preset name: `shuimo`.

```vue
<script setup lang="ts">
import { LhConfigProvider, LhButton, LhTag, LhSwitch } from '@lh-ui/vue3'
import { getThemeVars } from '@lh-ui/vue3/theme'

const shuimoTheme = getThemeVars('shuimo')
</script>

<template>
  <LhConfigProvider :theme-vars="shuimoTheme">
    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <LhButton type="primary">Primary</LhButton>
      <LhTag type="primary">Tag</LhTag>
      <LhSwitch />
    </div>
  </LhConfigProvider>
</template>
```

## Golden Autumn

Deep autumn golden yellow, warm and rich. Preset name: `golden`.

```vue
<script setup lang="ts">
import { LhConfigProvider, LhButton, LhTag, LhSwitch } from '@lh-ui/vue3'
import { getThemeVars } from '@lh-ui/vue3/theme'

const goldenTheme = getThemeVars('golden')
</script>

<template>
  <LhConfigProvider :theme-vars="goldenTheme">
    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <LhButton type="primary">Primary</LhButton>
      <LhTag type="primary">Tag</LhTag>
      <LhSwitch />
    </div>
  </LhConfigProvider>
</template>
```

## Theme Comparison

| Theme | Preset name | Primary `--lh-primary-color` | Primary background `--lh-primary-color-bg` | Description |
|-------|-------------|------------------------------|--------------------------------------------|-------------|
| Ceramic Blue | `cerblue` | `#2B4C7C` | `#E8EDF3` | Blue-and-white porcelain, elegant |
| Pine Green | `songhua` | `#5B8C5A` | `#E8F5E8` | Bamboo forest, vibrant |
| Vermilion | `zhusha` | `#B23A3A` | `#FDF0F0` | Traditional seal red, ceremonial |
| Ink Wash | `shuimo` | `#2C2C2C` | `#F5F5F5` | Ink painting, minimalist |
| Golden Autumn | `golden` | `#B8860B` | `#FBF6EA` | Autumn golden, warm |

> Presets only cover the primary color scale. `--lh-primary-color-bg` is the lightened background of the primary color, not the page background.

## Programmatic Switching

Two mechanisms, chosen by scope:

- **Global switching** (recommended): `usePresetTheme` writes preset variables to `:root`, applies site-wide and persists to localStorage, surviving refreshes. No `LhConfigProvider` wrapper required.
- **Scoped switching**: `LhConfigProvider :theme-vars` only affects its own subtree — suitable for showing multiple themes side by side on one page.

### Global Preset Switching

The buttons below write to `:root`, so the entire docs site would be affected — which is why this page does not demo global switching inline.

```vue
<script setup lang="ts">
import { LhButton, usePresetTheme } from '@lh-ui/vue3'

const { preset, setPreset, presets } = usePresetTheme()
</script>

<template>
  <LhButton
    v-for="theme in presets"
    :key="theme.name"
    :type="preset === theme.name ? 'primary' : 'default'"
    @click="setPreset(theme.name)"
  >
    {{ theme.labelEn }}
  </LhButton>
</template>
```

### Scoped Switching

Pass `applyToRoot: false` to skip the global write and only take the returned `themeVars` (with `--lh-` prefixes stripped for ConfigProvider), letting the Provider control the scope.

Keep the switcher buttons **outside** `LhConfigProvider`, otherwise the buttons themselves get re-themed:

<DemoBlock title="Scoped preset switching">
  <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px">
    <LhButton
      v-for="theme in presets"
      :key="theme.name"
      size="small"
      :type="preset === theme.name ? 'primary' : 'default'"
      @click="setPreset(theme.name)"
    >
      {{ theme.labelEn }}
    </LhButton>
  </div>
  <LhConfigProvider :theme-vars="presetThemeVars">
    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <LhButton type="primary">Primary</LhButton>
      <LhButton type="success">Success</LhButton>
      <LhButton type="warning">Warning</LhButton>
      <LhButton type="danger">Danger</LhButton>
      <LhTag type="primary">Tag</LhTag>
      <LhSwitch />
    </div>
  </LhConfigProvider>
</DemoBlock>

```vue
<script setup lang="ts">
import { LhConfigProvider, LhButton, LhTag, LhSwitch, usePresetTheme } from '@lh-ui/vue3'

const { preset, setPreset, presets, themeVars } = usePresetTheme({ applyToRoot: false })
</script>

<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px">
    <LhButton
      v-for="theme in presets"
      :key="theme.name"
      :type="preset === theme.name ? 'primary' : 'default'"
      @click="setPreset(theme.name)"
    >
      {{ theme.labelEn }}
    </LhButton>
  </div>
  <LhConfigProvider :theme-vars="themeVars">
    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <LhButton type="primary">Primary</LhButton>
      <LhButton type="success">Success</LhButton>
      <LhButton type="warning">Warning</LhButton>
      <LhButton type="danger">Danger</LhButton>
      <LhTag type="primary">Tag</LhTag>
      <LhSwitch />
    </div>
  </LhConfigProvider>
</template>
```

> **Prefix conventions**: ConfigProvider prefixing is idempotent — `getThemeVars()` (from `@lh-ui/vue3/theme`) returns keys already prefixed with `--lh-` and can be passed to `:theme-vars` as-is, while `usePresetTheme()`'s `themeVars` comes pre-stripped. Both work directly with `:theme-vars`; no manual prefix handling needed.

<script setup lang="ts">
import { LhConfigProvider, LhButton, LhTag, LhSwitch } from '~/components'
import { usePresetTheme } from '~/composables'
import { getThemeVars } from '@lh-ui/share/theme'
import '@lh-ui/share/styles/config-provider'
import '@lh-ui/share/styles/button'
import '@lh-ui/share/styles/tag'
import '@lh-ui/share/styles/switch'

// getThemeVars keys already carry the --lh- prefix; ConfigProvider prefixing is idempotent
const cerblueTheme = getThemeVars('cerblue')

// Scoped preset demo: applyToRoot: false only returns themeVars, scope owned by ConfigProvider
const { preset, setPreset, presets, themeVars: presetThemeVars } = usePresetTheme({
  applyToRoot: false,
})
</script>
