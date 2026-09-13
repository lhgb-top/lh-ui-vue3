# Slider 滑块

`LhSlider` 是一个创建区间输入控件的滑块组件，用户可以在 min 和 max 之间拖拽来选择值。

## 基础用法

<DemoBlock title="基础用法">
  <LhSlider v-model="baseValue" />
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const baseValue = ref(0)
</script>

<template>
  <LhSlider v-model="baseValue" />
</template>
```

## 自定义范围

<DemoBlock title="自定义范围">
  <LhSlider v-model="rangeValue" :min="10" :max="200" />
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const rangeValue = ref(50)
</script>

<template>
  <LhSlider v-model="rangeValue" :min="10" :max="200" />
</template>
```

## 范围选择

<DemoBlock title="范围选择">
  <LhSlider v-model="rangeMode" range />
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const rangeMode = ref([20, 50])
</script>

<template>
  <LhSlider v-model="rangeMode" range />
</template>
```

## 步进

<DemoBlock title="步进">
  <LhSlider v-model="stepValue" :step="10" />
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const stepValue = ref(0)
</script>

<template>
  <LhSlider v-model="stepValue" :step="10" />
</template>
```

## 标记

<DemoBlock title="标记">
  <LhSlider v-model="marksValue" :marks="customMarks" />
</DemoBlock>

```vue
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

## 显示输入框

<DemoBlock title="显示输入框">
  <LhSlider v-model="inputValue" show-input />
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref(50)
</script>

<template>
  <LhSlider v-model="inputValue" show-input />
</template>
```

## 禁用

<DemoBlock title="禁用">
  <LhSlider v-model="disabledValue" :value="50" disabled />
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const disabledValue = ref(50)
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

```vue
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

## Slider API

| 属性        | 说明                  | 类型                                             | 默认值     |
| ----------- | --------------------- | ------------------------------------------------ | ---------- |
| model-value | 滑块的值              | `number \| [number, number] \| null`             | `null`     |
| min         | 最小值                | `number`                                         | `0`        |
| max         | 最大值                | `number`                                         | `100`      |
| step        | 步进值                | `number`                                         | `1`        |
| disabled    | 是否禁用              | `boolean`                                        | `false`    |
| range       | 是否启用范围选择      | `boolean`                                        | `false`    |
| show-input  | 是否显示输入框        | `boolean`                                        | `false`    |
| size        | 尺寸                  | `'small' \| 'medium' \| 'large'`                 | `'medium'` |
| marks       | 标记点                | `Record<number, string>`                         | `undefined`|

## Slider Events

| 事件名            | 说明              | 类型                                       |
| ----------------- | ----------------- | ------------------------------------------ |
| update:model-value | 值改变时触发   | `(value: number \| [number, number]) => void` |
| change            | 值确认改变时触发 | `(value: number \| [number, number]) => void` |

<script setup lang="ts">
import { ref } from 'vue'

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
const customMarks = {
  0: '0°C',
  25: '25°C',
  50: '50°C',
  75: '75°C',
  100: '100°C',
}
</script>