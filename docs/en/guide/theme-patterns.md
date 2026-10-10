# Pattern Background System

lh-ui-plus provides unique traditional Chinese pattern backgrounds that can be applied to components.

## Available Patterns

- `willow` — Willow leaf (`--lh-pattern-willow`)
- `cloud` — Auspicious cloud (`--lh-pattern-cloud`)
- `water` — Water wave (`--lh-pattern-water`)
- `snow` — Snowflake (`--lh-pattern-snow`)
- `plum` — Plum blossom (`--lh-pattern-plum`)
- `bamboo` — Bamboo leaf (`--lh-pattern-bamboo`)

## Global Configuration

Apply a pattern globally through ConfigProvider — set the `bg-pattern` theme variable and whitelist the components that should receive it:

```vue
<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <LhConfigProvider
    :theme-vars="{ 'bg-pattern': 'var(--lh-pattern-cloud)' }"
    :pattern-components="['button', 'dialog']"
  >
    <LhButton type="primary">Cloud Pattern Button</LhButton>
    <LhDialog v-model="visible">
      <p>Dialog with cloud pattern background</p>
    </LhDialog>
  </LhConfigProvider>
</template>
```

## Component-level Pattern

A pattern set on a component itself (via `bgPattern` or its own `themeVars`) is not subject to the whitelist:

```vue
<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <LhButton type="primary" bg-pattern="var(--lh-pattern-plum)">
    Plum Pattern
  </LhButton>

  <LhDialog v-model="visible" bg-pattern="var(--lh-pattern-bamboo)">
    <p>Bamboo pattern dialog</p>
  </LhDialog>
</template>
```

## Pattern Components Whitelist

`patternComponents` takes lowercase component names (no `Lh` prefix). Only listed components pick up the global `bg-pattern`:

```vue
<template>
  <LhConfigProvider
    :theme-vars="{ 'bg-pattern': 'var(--lh-pattern-willow)' }"
    :pattern-components="['button', 'dialog', 'input']"
  >
    <!-- Only button / dialog / input get the pattern -->
  </LhConfigProvider>
</template>
```

> `bg-pattern` accepts a CSS variable (e.g. `var(--lh-pattern-willow)`) or an image URL — a bare pattern name like `willow` is invalid CSS and renders nothing.