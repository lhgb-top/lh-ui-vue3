# TimePicker 时间选择器

`LhTimePicker` 是一个用于选择时间的选择器组件，支持时、分、秒的精确选择。

## 基础用法

<DemoBlock title="基础用法">
  <LhTimePicker v-model="baseTime" />
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const baseTime = ref(new Date())
</script>

<template>
  <LhTimePicker v-model="baseTime" />
</template>
```

## 禁用状态

<DemoBlock title="禁用状态">
  <LhTimePicker v-model="disabledTime" disabled />
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const disabledTime = ref(new Date())
</script>

<template>
  <LhTimePicker v-model="disabledTime" disabled />
</template>
```

## 时间格式化

<DemoBlock title="时间格式化">
  <LhTimePicker v-model="formatTime1" format="HH:mm" />
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const formatTime1 = ref(new Date())
</script>

<template>
  <LhTimePicker v-model="formatTime1" format="HH:mm" />
</template>
```

## 清除按钮

<DemoBlock title="清除按钮">
  <LhTimePicker v-model="clearTime" clearable />
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const clearTime = ref(new Date())
</script>

<template>
  <LhTimePicker v-model="clearTime" clearable />
</template>
```

## 自定义时间范围

<DemoBlock title="自定义时间范围">
  <LhTimePicker v-model="rangeTime" :start="8" :end="20" />
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const rangeTime = ref(new Date())
</script>

<template>
  <LhTimePicker v-model="rangeTime" :start="8" :end="20" />
</template>
```

## 尺寸

<DemoBlock title="尺寸">
  <LhTimePicker v-model="smallTime" size="small" />
  <LhTimePicker v-model="mediumTime" size="medium" />
  <LhTimePicker v-model="largeTime" size="large" />
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const smallTime = ref(new Date())
const mediumTime = ref(new Date())
const largeTime = ref(new Date())
</script>

<template>
  <LhTimePicker v-model="smallTime" size="small" />
  <LhTimePicker v-model="mediumTime" size="medium" />
  <LhTimePicker v-model="largeTime" size="large" />
</template>
```

## 步进

<DemoBlock title="步进">
  <LhTimePicker v-model="stepTime" :stepMinute="5" :stepSecond="10" />
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const stepTime = ref(new Date())
</script>

<template>
  <LhTimePicker v-model="stepTime" :stepMinute="5" :stepSecond="10" />
</template>
```

## TimePicker API

| 属性           | 说明             | 类型                         | 默认值     |
| -------------- | ---------------- | ---------------------------- | ---------- |
| model-value    | 绑定的时间       | `Date \| null`               | `null`     |
| size           | 尺寸             | `'small' \| 'medium' \| 'large'` | `'medium'` |
| disabled       | 是否禁用         | `boolean`                    | `false`    |
| clearable      | 是否显示清除按钮 | `boolean`                    | `true`     |
| placeholder    | 占位文本         | `string`                     | `''`       |
| format         | 时间格式         | `string`                     | `'HH:mm:ss'` |
| readonly       | 输入框只读       | `boolean`                    | `true`     |
| arrowControl   | 是否显示箭头     | `boolean`                    | `false`    |
| start          | 开始小时         | `number`                     | `0`        |
| end            | 结束小时         | `number`                     | `24`       |
| stepHour       | 小时步进         | `number`                     | `1`        |
| stepMinute     | 分钟步进         | `number`                     | `1`        |
| stepSecond     | 秒步进           | `number`                     | `1`        |

## TimePicker Events

| 事件名             | 说明             | 类型                   |
| ------------------ | ---------------- | ---------------------- |
| update:model-value | 值改变时触发     | `(value: Date) => void` |
| change             | 值确认改变时触发 | `(value: Date) => void` |

<script setup lang="ts">
import { ref } from 'vue'

const baseTime = ref(new Date())
const disabledTime = ref(new Date())
const formatTime1 = ref(new Date())
const clearTime = ref(new Date())
const rangeTime = ref(new Date())
const smallTime = ref(new Date())
const mediumTime = ref(new Date())
const largeTime = ref(new Date())
const stepTime = ref(new Date())
</script>