# DatePicker 日期选择器

`LhDatePicker` 是一个用于选择日期时间的选择器组件，支持日期、月份、年份等多种选择模式。

## 基础用法

<DemoBlock title="基础用法">
  <LhDatePicker v-model="baseDate" />
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const baseDate = ref(new Date(2024, 0, 1))
</script>

<template>
  <LhDatePicker v-model="baseDate" />
</template>
```

## 禁用状态

<DemoBlock title="禁用状态">
  <LhDatePicker v-model="disabledDate" disabled />
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const disabledDate = ref(new Date())
</script>

<template>
  <LhDatePicker v-model="disabledDate" disabled />
</template>
```

## 日期格式化

<DemoBlock title="日期格式化">
  <LhDatePicker v-model="formatDate" format="MM/dd/yyyy" />
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const formatDate = ref(new Date())
</script>

<template>
  <LhDatePicker v-model="formatDate" format="MM/dd/yyyy" />
</template>
```

## 清除按钮

<DemoBlock title="清除按钮">
  <LhDatePicker v-model="clearDate" clearable />
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const clearDate = ref(new Date())
</script>

<template>
  <LhDatePicker v-model="clearDate" clearable />
</template>
```

## 尺寸

<DemoBlock title="尺寸">
  <LhDatePicker v-model="smallDate" size="small" />
  <LhDatePicker v-model="mediumDate" size="medium" />
  <LhDatePicker v-model="largeDate" size="large" />
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const smallDate = ref(new Date())
const mediumDate = ref(new Date())
const largeDate = ref(new Date())
</script>

<template>
  <LhDatePicker v-model="smallDate" size="small" />
  <LhDatePicker v-model="mediumDate" size="medium" />
  <LhDatePicker v-model="largeDate" size="large" />
</template>
```

## DatePicker API

| 属性            | 说明             | 类型                                                   | 默认值      |
| --------------- | ---------------- | ------------------------------------------------------ | ----------- |
| model-value     | 绑定的日期       | `Date \| [Date, Date] \| null`                         | `null`      |
| mode            | 选择模式         | `'date' \| 'month' \| 'year' \| 'datetime'`            | `'date'`    |
| size            | 尺寸             | `'small' \| 'medium' \| 'large'`                       | `'medium'`  |
| disabled        | 是否禁用         | `boolean`                                              | `false`     |
| clearable       | 是否显示清除按钮 | `boolean`                                              | `false`     |
| placeholder     | 占位文本         | `string`                                               | `undefined` |
| format          | 日期格式         | `string`                                               | `'yyyy-MM-dd'` |
| readonly        | 输入框只读       | `boolean`                                              | `false`     |
| rangeSeparator  | 范围分隔符       | `string`                                               | `'至'`      |

## DatePicker Events

| 事件名             | 说明             | 类型                                  |
| ------------------ | ---------------- | ------------------------------------- |
| update:model-value | 值改变时触发     | `(value: Date \| [Date, Date]) => void` |
| change             | 值确认改变时触发 | `(value: Date \| [Date, Date]) => void` |

<script setup lang="ts">
import { ref } from 'vue'

const baseDate = ref(new Date(2024, 0, 1))
const disabledDate = ref(new Date(2024, 0, 1))
const formatDate = ref(new Date())
const clearDate = ref(new Date())
const smallDate = ref(new Date())
const mediumDate = ref(new Date())
const largeDate = ref(new Date())
</script>