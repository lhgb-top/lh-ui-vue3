# Getting Started

## Create a Vue 3 Project

```bash
# Create a Vite project using pnpm
pnpm create vite my-app --template vue-ts
cd my-app
```

## Install @lh-ui/vue3

```bash
pnpm add @lh-ui/vue3
```

## Full Import (main.ts)

```ts
import { createApp } from 'vue'
import App from './App.vue'
import LhUiPlus from '@lh-ui/vue3'
import '@lh-ui/vue3/dist/index.css'

const app = createApp(App)
app.use(LhUiPlus)
app.mount('#app')
```

## Use Components

```vue
<script setup lang="ts">
</script>

<template>
  <div>
    <LhButton type="primary">Primary</LhButton>
    <LhButton type="success">Success</LhButton>
    <LhButton type="warning">Warning</LhButton>
    <LhButton type="danger">Danger</LhButton>
    <LhButton type="info">Info</LhButton>
  </div>
</template>
```

## Global Config & Theming

`LhConfigProvider` provides global config (locale, size) and theme variables (`themeVars`), each passed as an individual prop:

```vue
<script setup lang="ts">
import { zhCN } from '@lh-ui/vue3'
</script>

<template>
  <LhConfigProvider
    :locale="zhCN"
    size="medium"
    :theme-vars="{ 'primary-color': '#5B8C5A' }"
  >
    <LhButton type="primary">Button</LhButton>
  </LhConfigProvider>
</template>
```

- `locale`: locale messages, imported as named exports (`zhCN` / `enUS`) from the package root.
- `size`: global size — `small` / `medium` / `large` / `mini`.
- `themeVars`: theme variables; the `--lh-` prefix may be omitted. Preset themes can be switched with `useLhPresetTheme` — see [Theme Presets](/en/guide/themes).

## Demo

<DemoBlock>
  <div class="demo-row">
    <LhButton type="primary">Primary</LhButton>
    <LhButton type="success">Success</LhButton>
    <LhButton type="warning">Warning</LhButton>
    <LhButton type="danger">Danger</LhButton>
    <LhButton>Default</LhButton>
  </div>
  <div class="demo-row" style="margin-top: 12px;">
    <LhButton type="primary" plain>Plain</LhButton>
    <LhButton type="primary" round>Rounded</LhButton>
    <LhButton type="primary" circle>C</LhButton>
    <LhButton type="primary" loading>Loading</LhButton>
    <LhButton type="primary" disabled>Disabled</LhButton>
  </div>
</DemoBlock>

<style scoped>
.demo-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}
</style>