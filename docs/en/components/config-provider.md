# ConfigProvider

`LhConfigProvider` provides a context for global configuration including theme, locale, size, and component-level styling.

## Basic Usage

Configure the overall size and locale for all child components.

<DemoBlock title="Global size and locale">
  <LhConfigProvider :locale="zhCN" size="large">
    <LhButton>Large Button</LhButton>
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhConfigProvider, LhButton, zhCN } from '@lh-ui/vue3'
</script>

<template>
  <!-- Global size and locale -->
  <LhConfigProvider :locale="zhCN" size="large">
    <LhButton>Large Button</LhButton>
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { LhConfigProvider, LhButton, zhCN } from '@lh-ui/vue3'

export default {
  components: { LhConfigProvider, LhButton },
  data() {
    return {
      zhCN: zhCN,
    }
  },
}
</script>

<template>
  <!-- Global size and locale -->
  <LhConfigProvider :locale="zhCN" size="large">
    <LhButton>Large Button</LhButton>
  </LhConfigProvider>
</template>
```

## Theme Variables

Override CSS variables for custom theming.

<DemoBlock title="Custom theme variables">
  <LhConfigProvider :theme-vars="themeVars">
    <LhButton type="primary">Custom Theme</LhButton>
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhConfigProvider, LhButton } from '@lh-ui/vue3'

const themeVars = {
  'primary-color': '#2B4C7C',
  'primary-color-hover': '#3D649E',
  'primary-color-bg': '#E8EDF3',
}
</script>

<template>
  <!-- Global theme variables -->
  <LhConfigProvider :theme-vars="themeVars">
    <LhButton type="primary">Custom Theme</LhButton>
  </LhConfigProvider>
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      themeVars: {
        'primary-color': '#2B4C7C',
        'primary-color-hover': '#3D649E',
        'primary-color-bg': '#E8EDF3',
      },
    }
  },
}
</script>

<template>
  <!-- Global theme variables -->
  <LhConfigProvider :theme-vars="themeVars">
    <LhButton type="primary">Custom Theme</LhButton>
  </LhConfigProvider>
</template>
```

## Component-Level Theme

Apply theme to specific components.

<DemoBlock title="Per-component theme">
  <LhConfigProvider :component-theme="{ button: { 'primary-color': '#e6a23c' } }">
    <LhButton type="primary">Golden Button</LhButton>
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhConfigProvider, LhButton } from '@lh-ui/vue3'
</script>

<template>
  <!-- Per-component theme -->
  <LhConfigProvider :component-theme="{ button: { 'primary-color': '#e6a23c' } }">
    <LhButton type="primary">Golden Button</LhButton>
  </LhConfigProvider>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- Per-component theme -->
  <LhConfigProvider :component-theme="{ button: { 'primary-color': '#e6a23c' } }">
    <LhButton type="primary">Golden Button</LhButton>
  </LhConfigProvider>
</template>
```

## Locale Switching

<DemoBlock title="Locale switching">
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhButton @click="toggle">
      {{ locale === 'zh-CN' ? 'Switch to English' : '切换中文' }}
    </LhButton>
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhConfigProvider, LhButton, zhCN, enUS } from '@lh-ui/vue3'

const locale = ref('zh-CN')
function toggle() {
  locale.value = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
}
</script>

<template>
  <!-- Locale switching -->
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhButton @click="toggle">
      {{ locale === 'zh-CN' ? 'Switch to English' : '切换中文' }}
    </LhButton>
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { zhCN, enUS } from '@lh-ui/vue3'

export default {
  data() {
    return { locale: 'zh-CN' }
  },
  methods: {
    toggle() {
      this.locale = this.locale === 'zh-CN' ? 'en-US' : 'zh-CN'
    },
  },
}
</script>

<template>
  <!-- Locale switching -->
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhButton @click="toggle">
      {{ locale === 'zh-CN' ? 'Switch to English' : '切换中文' }}
    </LhButton>
  </LhConfigProvider>
</template>
```

## Pattern Whitelist

`pattern-components` restricts which components may render the `bg-pattern` pattern background. Components not on the whitelist ignore the pattern setting.

<DemoBlock title="pattern-components">
  <LhConfigProvider
    :theme-vars="{ 'bg-pattern': 'var(--lh-pattern-plum)' }"
    :pattern-components="['button', 'card']"
  >
    <LhButton type="primary">Patterned button</LhButton>
    <LhInput placeholder="No pattern applied" />
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhConfigProvider
    :theme-vars="{ 'bg-pattern': 'var(--lh-pattern-plum)' }"
    :pattern-components="['button', 'card']"
  >
    <LhButton type="primary">Patterned button</LhButton>
    <LhInput placeholder="No pattern applied" />
  </LhConfigProvider>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhConfigProvider
    :theme-vars="{ 'bg-pattern': 'var(--lh-pattern-plum)' }"
    :pattern-components="['button', 'card']"
  >
    <LhButton type="primary">Patterned button</LhButton>
    <LhInput placeholder="No pattern applied" />
  </LhConfigProvider>
</template>
```

## Props

| Prop | Description | Type | Default |
|------|-------------|------|---------|
| size | Global size | `LhSizes` | — |
| locale | i18n configuration | `LocaleType` | — |
| themeVars | Global theme variables | `{ [x: string]: string; }` | — |
| patternComponents | Pattern background whitelist | `[LhThemeableComponent](#type-LhThemeableComponent)`[] | — |
| componentTheme | Component-specific theme | `{ button?: Record<string, string>; input?: Record<string, string>; dialog?: Record<string, string>; tooltip?: Record<string, string>; icon?: Record<string, string>; card?: Record<string, string>; alert?: Record<string, string>; popover?: Record<string, string>; popconfirm?: Record<string, string>; drawer?: Record<string, string>; dropdown?: Record<string, string>; message?: Record<string, string>; notification?: Record<string, string>; loading?: Record<string, string>; timeline?: Record<string, string>; collapse?: Record<string, string>; rate?: Record<string, string>; segmented?: Record<string, string>; calendar?: Record<string, string>; affix?: Record<string, string>; backtop?: Record<string, string>; image?: Record<string, string>; menu?: Record<string, string>; table?: Record<string, string>; layout?: Record<string, string>; tree?: Record<string, string>; transfer?: Record<string, string>; upload?: Record<string, string>; anchor?: Record<string, string>; steps?: Record<string, string>; }` | — |

## Slots

| Slot | Description |
|------|-------------|
| default | Child components to configure |

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## Type Definitions

The TypeScript type structures exported by this component (auto-extracted from `packages/components/config-provider/src/types.ts` and `@lh-ui/share/core/*` sources; click each entry to expand; see the Props table above for attribute descriptions):

<details id="type-LhThemeableComponent">
<summary><code>LhThemeableComponent</code></summary>

```ts
export type LhThemeableComponent =
  | 'button'
  | 'input'
  | 'dialog'
  | 'tooltip'
  | 'icon'
  | 'card'
  | 'alert'
  | 'popover'
  | 'popconfirm'
  | 'drawer'
  | 'dropdown'
  | 'message'
  | 'notification'
  | 'loading'
  | 'timeline'
  | 'collapse'
  | 'rate'
  | 'segmented'
  | 'calendar'
  | 'affix'
  | 'backtop'
  | 'image'
  | 'menu'
  | 'table'
  | 'layout'
  | 'tree'
  | 'transfer'
  | 'upload'
  | 'anchor'
  | 'steps'
```

</details>

<details id="type-LhConfigProviderProps">
<summary><code>LhConfigProviderProps</code></summary>

```ts
export interface LhConfigProviderProps {
  size?: LhSizes
  locale?: LocaleType
  themeVars?: Record<string, string>
  patternComponents?: LhThemeableComponent[]
  componentTheme?: Partial<Record<LhThemeableComponent, Record<string, string>>>
}
```

</details>

<!-- lh-types:end -->

<script setup lang="ts">
import { ref } from 'vue'
import zhCN from '@lh-ui/share/locales/lang/zh-CN'
import enUS from '@lh-ui/share/locales/lang/en-US'

const locale = ref('zh-CN')
function toggle() {
  locale.value = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
}
const themeVars = {
  'primary-color': '#2B4C7C',
  'primary-color-hover': '#3D649E',
  'primary-color-bg': '#E8EDF3',
}
</script>
