# InputNumber 计数器

`LhInputNumber` 用于输入数字，支持范围限制、步长和精度控制。

## 基础用法

<DemoBlock title="基础用法">
  <LhInputNumber v-model="count" />
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <LhInputNumber v-model="count" />
</template>
```

## 范围限制

<DemoBlock title="范围限制">
  <LhInputNumber v-model="level" :min="1" :max="10" />
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const level = ref(5)
</script>

<template>
  <LhInputNumber v-model="level" :min="1" :max="10" />
</template>
```

## 步长与精度

<DemoBlock title="步长与精度">
  <LhInputNumber v-model="score" :min="0" :max="1" :step="0.1" :precision="1" />
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const score = ref(0.5)
</script>

<template>
  <LhInputNumber v-model="score" :min="0" :max="1" :step="0.1" :precision="1" />
</template>
```

## 尺寸

<DemoBlock title="尺寸">
  <LhInputNumber v-model="num" size="small" />
  <LhInputNumber v-model="num" size="medium" />
  <LhInputNumber v-model="num" size="large" />
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const num = ref(0)
</script>

<template>
  <LhInputNumber v-model="num" size="small" />
  <LhInputNumber v-model="num" size="medium" />
  <LhInputNumber v-model="num" size="large" />
</template>
```

## 禁用

<DemoBlock title="禁用">
  <LhInputNumber v-model="disabledNum" disabled />
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const disabledNum = ref(5)
</script>

<template>
  <LhInputNumber v-model="disabledNum" disabled />
</template>
```

## API

| 属性            | 说明                 | 类型                   | 默认值      |
| --------------- | -------------------- | ---------------------- | ----------- |
| model-value     | 当前值               | `number \| null`       | `null`      |
| min             | 最小值               | `number`               | `-Infinity` |
| max             | 最大值               | `number`               | `Infinity`  |
| step            | 步长                 | `number`               | `1`         |
| step-strictly   | 输入值是否为 step 倍数 | `boolean`              | `false`     |
| precision       | 数值精度             | `number`               | —           |
| disabled        | 是否禁用             | `boolean`              | `false`     |
| size            | 尺寸                 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| controls        | 是否显示控制按钮     | `boolean`              | `true`      |
| placeholder     | 占位文本             | `string`               | —           |
| name            | 原生表单名称         | `string`               | —           |

触发 `update:modelValue`（新的数值）和 `change` 事件。支持键盘上下箭头增减。

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const level = ref(5)
const score = ref(0.5)
const num = ref(0)
const disabledNum = ref(5)
</script>