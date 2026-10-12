# Slider 滑块

`LhSlider` 是一个创建区间输入控件的滑块组件，用户可以在 min 和 max 之间拖拽来选择值。

## 基础用法

<DemoBlock title="基础用法">
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

## 自定义范围

<DemoBlock title="自定义范围">
  <LhSlider v-model="rangeValue" :min="10" :max="200" />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const rangeValue = ref(50)
</script>

<template>
  <LhSlider v-model="rangeValue" :min="10" :max="200" />
</template>
```

```vue options
<script>
export default {
  data() {
    return { rangeValue: 50 }
  },
}
</script>

<template>
  <LhSlider v-model="rangeValue" :min="10" :max="200" />
</template>
```

## 范围选择

<DemoBlock title="范围选择">
  <LhSlider v-model="rangeMode" range />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const rangeMode = ref([20, 50])
</script>

<template>
  <LhSlider v-model="rangeMode" range />
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
  <LhSlider v-model="rangeMode" range />
</template>
```

## 步进

<DemoBlock title="步进">
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

## 标记

<DemoBlock title="标记">
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

## 显示输入框

<DemoBlock title="显示输入框">
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

## 禁用

<DemoBlock title="禁用">
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

## 尺寸

<DemoBlock title="尺寸">
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

## 自定义主题

滑块可以应用自定义主题色。

<DemoBlock title="青花瓷主题">
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

## 国际化

<DemoBlock title="国际化">
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
  <!-- 语言包配置 -->
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
  <!-- 语言包配置 -->
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhSlider v-model="value" />
  </LhConfigProvider>
</template>
```

## Slider API

### Props

| 属性        | 说明                  | 类型                                             | 默认值     |
| ----------- | --------------------- | ------------------------------------------------ | ---------- |
| modelValue | 滑块的值 | `number \| [number, number]` | `null` |
| min | 最小值 | `number` | `0` |
| max | 最大值 | `number` | `100` |
| step | 步进值 | `number` | `1` |
| disabled | 是否禁用 | `boolean` | `false` |
| range | 是否启用范围选择 | `boolean` | `false` |
| showInput | 是否显示输入框 | `boolean` | `false` |
| size | 尺寸 | `"small" \| "medium" \| "large" \| "mini" \| "x-large"` | `'medium'` |
| marks | 标记点 | `{ [x: number]: string; }` | — |
| sx | 快速布局属性（如 `{ mt: 2, w: '50%' }`），转内联样式作用于根元素 | `LhSxProps` | — |

### Events

| 事件名            | 说明              | 类型                                       |
| ----------------- | ----------------- | ------------------------------------------ |
| update:model-value | 值改变时触发   | `(value: number \| [number, number]) => void` |
| change            | 值确认改变时触发 | `(value: number \| [number, number]) => void` |


<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/slider/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

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
  /** sx 快速布局属性 */
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
<summary><code>LhComponentSize</code> <sub>（来自 @lh-ui/share/core/shared）</sub></summary>

```ts
export type LhComponentSize = (typeof LH_SIZE_CONST)[keyof typeof LH_SIZE_CONST]
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
import { ref } from 'vue'
import { LhConfigProvider } from '~/components'
import '@lh-ui/share/styles/config-provider'
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