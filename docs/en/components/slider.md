# Slider

`LhSlider` is an input control for selecting from a range of values.

## Basic Usage

<DemoBlock title="Basic Usage">
  <LhSlider v-model="baseValue" />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const baseValue = ref(0)
</script>

<template>
  <LhSlider v-model="baseValue" />
</template>
```

```vue options
<script>
export default {
  data() {
    return { baseValue: 0 }
  },
}
</script>

<template>
  <LhSlider v-model="baseValue" />
</template>
```

## Range Mode

<DemoBlock title="Range Mode">
  <LhSlider v-model="rangeMode" range :min="0" :max="100" />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const rangeMode = ref([20, 50])
</script>

<template>
  <LhSlider v-model="rangeMode" range :min="0" :max="100" />
</template>
```

```vue options
<script>
export default {
  data() {
    return { rangeMode: [20, 50] }
  },
}
</script>

<template>
  <LhSlider v-model="rangeMode" range :min="0" :max="100" />
</template>
```

## Step

<DemoBlock title="Step">
  <LhSlider v-model="stepValue" :step="10" />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const stepValue = ref(0)
</script>

<template>
  <LhSlider v-model="stepValue" :step="10" />
</template>
```

```vue options
<script>
export default {
  data() {
    return { stepValue: 0 }
  },
}
</script>

<template>
  <LhSlider v-model="stepValue" :step="10" />
</template>
```

## Marks

<DemoBlock title="Marks">
  <LhSlider v-model="marksValue" :marks="customMarks" />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const marksValue = ref(0)
const customMarks = {
  0: '0°C',
  25: '25°C',
  50: '50°C',
  75: '75°C',
  100: '100°C',
}
</script>

<template>
  <LhSlider v-model="marksValue" :marks="customMarks" />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      marksValue: 0,
      customMarks: {
        0: '0°C',
        25: '25°C',
        50: '50°C',
        75: '75°C',
        100: '100°C',
      },
    }
  },
}
</script>

<template>
  <LhSlider v-model="marksValue" :marks="customMarks" />
</template>
```

## Show Input

<DemoBlock title="Show Input">
  <LhSlider v-model="inputValue" show-input />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref(50)
</script>

<template>
  <LhSlider v-model="inputValue" show-input />
</template>
```

```vue options
<script>
export default {
  data() {
    return { inputValue: 50 }
  },
}
</script>

<template>
  <LhSlider v-model="inputValue" show-input />
</template>
```

## Disabled

<DemoBlock title="Disabled">
  <LhSlider v-model="disabledValue" :value="50" disabled />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const disabledValue = ref(50)
</script>

<template>
  <LhSlider v-model="disabledValue" :value="50" disabled />
</template>
```

```vue options
<script>
export default {
  data() {
    return { disabledValue: 50 }
  },
}
</script>

<template>
  <LhSlider v-model="disabledValue" :value="50" disabled />
</template>
```

## Size

<DemoBlock title="Size">
  <LhSlider v-model="smallValue" size="small" />
  <LhSlider v-model="mediumValue" size="medium" />
  <LhSlider v-model="largeValue" size="large" />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const smallValue = ref(50)
const mediumValue = ref(50)
const largeValue = ref(50)
</script>

<template>
  <LhSlider v-model="smallValue" size="small" />
  <LhSlider v-model="mediumValue" size="medium" />
  <LhSlider v-model="largeValue" size="large" />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      smallValue: 50,
      mediumValue: 50,
      largeValue: 50,
    }
  },
}
</script>

<template>
  <LhSlider v-model="smallValue" size="small" />
  <LhSlider v-model="mediumValue" size="medium" />
  <LhSlider v-model="largeValue" size="large" />
</template>
```

## Custom Theme

Slider can apply custom theme colors.

<DemoBlock title="Celadon Theme">
  <LhConfigProvider :theme-vars="cerblueTheme">
    <LhSlider v-model="themeValue" />
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhConfigProvider, LhSlider } from '@lh-ui/vue3'

const value = ref(50)
const cerblueTheme = {
  'primary-color': '#2B4C7C',
  'primary-color-hover': '#3D649E',
  'primary-color-bg': '#E8EDF3',
}
</script>

<template>
  <LhConfigProvider :theme-vars="cerblueTheme">
    <LhSlider v-model="value" />
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { LhConfigProvider, LhSlider } from '@lh-ui/vue3'

export default {
  data() {
    return {
      value: 50,
      cerblueTheme: {
        'primary-color': '#2B4C7C',
        'primary-color-hover': '#3D649E',
        'primary-color-bg': '#E8EDF3',
      },
    }
  },
}
</script>

<template>
  <LhConfigProvider :theme-vars="cerblueTheme">
    <LhSlider v-model="value" />
  </LhConfigProvider>
</template>
```

## Internationalization

<DemoBlock title="Internationalization">
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhSlider v-model="value" />
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhConfigProvider, LhSlider } from '@lh-ui/vue3'
import { zhCN } from '@lh-ui/vue3'
import { enUS } from '@lh-ui/vue3'

const locale = ref('zh-CN')
const value = ref(50)
</script>

<template>
  <!-- Locale messages -->
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhSlider v-model="value" />
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { LhConfigProvider, LhSlider } from '@lh-ui/vue3'
import { zhCN } from '@lh-ui/vue3'
import { enUS } from '@lh-ui/vue3'

export default {
  data() {
    return {
      locale: 'zh-CN',
      value: 50,
      zhCN: zhCN,
      enUS: enUS,
    }
  },
}
</script>

<template>
  <!-- Locale messages -->
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhSlider v-model="value" />
  </LhConfigProvider>
</template>
```

## Slider API

### Props

| Prop        | Description                            | Type                                             | Default     |
| ----------- | -------------------------------------- | ------------------------------------------------ | ----------- |
| modelValue | Slider value | `number \| [number, number]` | `null` |
| min | Minimum value | `number` | `0` |
| max | Maximum value | `number` | `100` |
| step | Step value | `number` | `1` |
| disabled | Disabled | `boolean` | `false` |
| range | Enable range selection | `boolean` | `false` |
| showInput | Show input box | `boolean` | `false` |
| size | Size | `"small" \| "medium" \| "large" \| "mini" \| "x-large"` | `'medium'` |
| marks | Mark points | `{ [x: number]: string; }` | — |
| sx | Shorthand layout props (e.g. `{ mt: 2, w: '50%' }`), applied as inline styles on the root element | `LhSxProps` | — |

### Events

| Event              | Description                         | Type                                              |
| ------------------ | ----------------------------------- | ------------------------------------------------- |
| update:model-value | Triggered when value changes        | `(value: number \| [number, number]) => void`     |
| change             | Triggered when value is confirmed   | `(value: number \| [number, number]) => void`     |

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## Type Definitions

The TypeScript type structures exported by this component (auto-extracted from `packages/components/slider/src/types.ts` and `@lh-ui/share/core/*` sources; click each entry to expand; see the Props table above for attribute descriptions):

<details id="type-LhSliderProps">
<summary><code>LhSliderProps</code></summary>

```ts
export interface LhSliderProps {
  modelValue?: number | [number, number] | null
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  range?: boolean
  showInput?: boolean
  size?: LhComponentSize
  marks?: Record<number, string>
  sx?: LhSxProps
}
```

</details>

<details id="type-LhSliderSize">
<summary><code>LhSliderSize</code></summary>

```ts
export type LhSliderSize = LhComponentSize
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

const baseValue = ref(0)
const rangeValue = ref(50)
const rangeMode = ref([20, 50])
const stepValue = ref(0)
const marksValue = ref(0)
const inputValue = ref(50)
const disabledValue = ref(50)
const smallValue = ref(50)
const mediumValue = ref(50)
const largeValue = ref(50)
const themeValue = ref(50)
const locale = ref('zh-CN')
const value = ref(50)
const cerblueTheme = {
  'primary-color': '#2B4C7C',
  'primary-color-hover': '#3D649E',
  'primary-color-bg': '#E8EDF3',
}
const customMarks = {
  0: '0°C',
  25: '25°C',
  50: '50°C',
  75: '75°C',
  100: '100°C',
}
</script>