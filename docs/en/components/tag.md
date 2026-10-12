# Tag

`LhTag` is used for tagging and classification.

## Basic Usage

<DemoBlock title="Basic Usage">
  <div class="demo-row">
    <LhTag>Tag 1</LhTag>
    <LhTag>Tag 2</LhTag>
    <LhTag>Tag 3</LhTag>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhTag } from '@lh-ui/vue3'
</script>

<template>
  <div class="demo-row">
    <LhTag>Tag 1</LhTag>
    <LhTag>Tag 2</LhTag>
    <LhTag>Tag 3</LhTag>
  </div>
</template>
```

```vue options
<script>
import { LhTag } from '@lh-ui/vue3'

export default {
  components: { LhTag },
}
</script>

<template>
  <div class="demo-row">
    <LhTag>Tag 1</LhTag>
    <LhTag>Tag 2</LhTag>
    <LhTag>Tag 3</LhTag>
  </div>
</template>
```

## Type

<DemoBlock title="Type">
  <LhTag type="primary">Primary</LhTag>
  <LhTag type="success">Success</LhTag>
  <LhTag type="warning">Warning</LhTag>
  <LhTag type="danger">Danger</LhTag>
  <LhTag type="info">Info</LhTag>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhTag type="primary">Primary</LhTag>
  <LhTag type="success">Success</LhTag>
  <LhTag type="warning">Warning</LhTag>
  <LhTag type="danger">Danger</LhTag>
  <LhTag type="info">Info</LhTag>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhTag type="primary">Primary</LhTag>
  <LhTag type="success">Success</LhTag>
  <LhTag type="warning">Warning</LhTag>
  <LhTag type="danger">Danger</LhTag>
  <LhTag type="info">Info</LhTag>
</template>
```

## Size

<DemoBlock title="Size">
  <LhTag size="small">Small</LhTag>
  <LhTag size="medium">Medium</LhTag>
  <LhTag size="large">Large</LhTag>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhTag size="small">Small</LhTag>
  <LhTag size="medium">Medium</LhTag>
  <LhTag size="large">Large</LhTag>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhTag size="small">Small</LhTag>
  <LhTag size="medium">Medium</LhTag>
  <LhTag size="large">Large</LhTag>
</template>
```

## Closable

<DemoBlock title="Closable">
  <LhTag v-if="show1" closable @close="show1 = false">Tag 1</LhTag>
  <LhTag v-if="show2" type="primary" closable @close="show2 = false">Tag 2</LhTag>
  <LhTag disabled>Disabled tag</LhTag>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhTag } from '@lh-ui/vue3'

const show1 = ref(true)
const show2 = ref(true)
</script>

<template>
  <LhTag v-if="show1" closable @close="show1 = false">Tag 1</LhTag>
  <LhTag v-if="show2" type="primary" closable @close="show2 = false">Tag 2</LhTag>
  <LhTag disabled>Disabled tag</LhTag>
</template>
```

```vue options
<script>
import { LhTag } from '@lh-ui/vue3'

export default {
  components: { LhTag },
  data() {
    return {
      show1: true,
      show2: true,
    }
  },
}
</script>

<template>
  <LhTag v-if="show1" closable @close="show1 = false">Tag 1</LhTag>
  <LhTag v-if="show2" type="primary" closable @close="show2 = false">Tag 2</LhTag>
</template>
```

## Round & Hit

<DemoBlock title="Round & Hit">
  <LhTag round>Rounded</LhTag>
  <LhTag hit>Hit</LhTag>
  <LhTag round hit>Round & Hit</LhTag>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhTag round>Rounded</LhTag>
  <LhTag hit>Hit</LhTag>
  <LhTag round hit>Round & Hit</LhTag>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhTag round>Rounded</LhTag>
  <LhTag hit>Hit</LhTag>
  <LhTag round hit>Round & Hit</LhTag>
</template>
```

## Custom Theme

Apply custom colors to tags.

<DemoBlock title="Pine Green Theme">
  <LhConfigProvider :theme-vars="songhuaTheme">
    <div class="demo-row">
      <LhTag type="primary">Pine Green</LhTag>
      <LhTag type="success">Success</LhTag>
    </div>
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhConfigProvider, LhTag } from '@lh-ui/vue3'

const songhuaTheme = {
  'primary-color': '#5B8C5A',
  'primary-color-hover': '#7BB079',
  'primary-color-bg': '#E8F5E8',
}
</script>

<template>
  <!-- Scoped theme: pine green -->
  <LhConfigProvider :theme-vars="songhuaTheme">
    <LhTag type="primary">Pine Green</LhTag>
    <LhTag type="success">Success</LhTag>
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { LhConfigProvider, LhTag } from '@lh-ui/vue3'

export default {
  components: { LhConfigProvider, LhTag },
  data() {
    return {
      songhuaTheme: {
        'primary-color': '#5B8C5A',
        'primary-color-hover': '#7BB079',
        'primary-color-bg': '#E8F5E8',
      },
    }
  },
}
</script>

<template>
  <!-- Scoped theme: pine green -->
  <LhConfigProvider :theme-vars="songhuaTheme">
    <LhTag type="primary">Pine Green</LhTag>
    <LhTag type="success">Success</LhTag>
  </LhConfigProvider>
</template>
```

## Internationalization

Tag text can be internationalized via `LhConfigProvider` and locale packages.

<DemoBlock title="Internationalization">
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhTag>{{ locale === 'zh-CN' ? '标签' : 'Tag' }}</LhTag>
    <LhButton @click="locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'">
      {{ locale === 'zh-CN' ? '切换英文' : 'Switch to English' }}
    </LhButton>
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhConfigProvider, LhTag } from '@lh-ui/vue3'
import { zhCN } from '@lh-ui/vue3'
import { enUS } from '@lh-ui/vue3'

const locale = ref('zh-CN')
</script>

<template>
  <!-- Switch locale packs via ConfigProvider -->
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhTag>{{ locale === 'zh-CN' ? '标签' : 'Tag' }}</LhTag>
    <LhButton @click="locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'">
      {{ locale === 'zh-CN' ? '切换英文' : 'Switch to English' }}
    </LhButton>
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { LhConfigProvider, LhTag, LhButton } from '@lh-ui/vue3'
import { zhCN } from '@lh-ui/vue3'
import { enUS } from '@lh-ui/vue3'

export default {
  components: { LhConfigProvider, LhTag, LhButton },
  data() {
    return {
      locale: 'zh-CN',
      zhCN: zhCN,
      enUS: enUS,
    }
  },
}
</script>

<template>
  <!-- Switch locale packs via ConfigProvider -->
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhTag>{{ locale === 'zh-CN' ? '标签' : 'Tag' }}</LhTag>
    <LhButton @click="locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'">
      {{ locale === 'zh-CN' ? '切换英文' : 'Switch to English' }}
    </LhButton>
  </LhConfigProvider>
</template>
```

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## Type Definitions

The TypeScript type structures exported by this component (auto-extracted from `packages/components/tag/src/types.ts` and `@lh-ui/share/core/*` sources; click each entry to expand; see the Props table above for attribute descriptions):

<details id="type-LhTagProps">
<summary><code>LhTagProps</code></summary>

```ts
export interface LhTagProps {
  type?: LhTagType
  size?: LhTagSize
  closable?: boolean
  disabled?: boolean
  round?: boolean
  hit?: boolean
  onClose?: (e: Event) => void
  sx?: LhSxProps
}
```

</details>

<details id="type-LhTagSize">
<summary><code>LhTagSize</code></summary>

```ts
export type LhTagSize = LhComponentSize
```

</details>

<details id="type-LhTagType">
<summary><code>LhTagType</code> <sub>(from @lh-ui/share/core/tag)</sub></summary>

```ts
export type LhTagType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'
```

</details>

<details id="type-LhComponentSize">
<summary><code>LhComponentSize</code> <sub>(from @lh-ui/share/core/shared)</sub></summary>

```ts
export type LhComponentSize = (typeof LH_SIZE_CONST)[keyof typeof LH_SIZE_CONST]
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
import { ref } from 'vue'
import zhCN from '@lh-ui/share/locales/lang/zh-CN'
import enUS from '@lh-ui/share/locales/lang/en-US'

const show1 = ref(true)
const show2 = ref(true)
const songhuaTheme = {
  'primary-color': '#5B8C5A',
  'primary-color-hover': '#7BB079',
  'primary-color-bg': '#E8F5E8',
}
const locale = ref('zh-CN')
</script>

<style scoped>
.demo-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}
</style>

## Tag API

### Props

| Prop        | Description          | Type                                            | Default     |
| ----------- | -------------------- | ------------------------------------------------ | ----------- |
| type | Tag type | `"primary" \| "success" \| "warning" \| "danger" \| "info" \| "default"` | `'default'` |
| size | Size | `"small" \| "medium" \| "large" \| "mini" \| "x-large"` | `'medium'` |
| closable | Closable | `boolean` | `false` |
| disabled | Disabled | `boolean` | `false` |
| round | Rounded | `boolean` | `false` |
| hit | Border stroke | `boolean` | `false` |
| onClose | Custom close handling | `(e: Event) => void` | — |
| sx | Shorthand layout props (e.g. `{ mt: 2, w: '50%' }`), applied as inline styles on the root element | `LhSxProps` | — |

### Events

| Event | Description                | Type                        |
| ----- | -------------------------- | --------------------------- |
| click | Click event                | `(e: MouseEvent) => void`   |
| close | Close button clicked       | `(e: Event) => void`        |

### Slots

| Slot    | Description               |
| ------- | ------------------------- |
| default | Tag content               |

### Accessibility

- The close button is icon-only; its `aria-label` comes from the `tag.close` locale key ("Close" in English) and follows the ConfigProvider locale
- The button's `<svg>` icon is marked `aria-hidden` so screen readers do not announce it twice
- The tag text itself stays readable without any extra labeling