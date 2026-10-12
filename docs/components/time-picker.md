# TimePicker 时间选择器

`LhTimePicker` 是一个用于选择时间的选择器组件，支持时、分、秒的精确选择。

## 基础用法

<DemoBlock title="基础用法">
  <LhTimePicker v-model="baseTime" />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const baseTime = ref(new Date())
</script>

<template>
  <LhTimePicker v-model="baseTime" />
</template>
```

```vue options
<script>
export default {
  data() {
    return { baseTime: new Date() }
  },
}
</script>

<template>
  <LhTimePicker v-model="baseTime" />
</template>
```

## 禁用状态

<DemoBlock title="禁用状态">
  <LhTimePicker v-model="disabledTime" disabled />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const disabledTime = ref(new Date())
</script>

<template>
  <LhTimePicker v-model="disabledTime" disabled />
</template>
```

```vue options
<script>
export default {
  data() {
    return { disabledTime: new Date() }
  },
}
</script>

<template>
  <LhTimePicker v-model="disabledTime" disabled />
</template>
```

## 时间格式化

<DemoBlock title="时间格式化">
  <LhTimePicker v-model="formatTime1" format="HH:mm" />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const formatTime1 = ref(new Date())
</script>

<template>
  <LhTimePicker v-model="formatTime1" format="HH:mm" />
</template>
```

```vue options
<script>
export default {
  data() {
    return { formatTime1: new Date() }
  },
}
</script>

<template>
  <LhTimePicker v-model="formatTime1" format="HH:mm" />
</template>
```

## 清除按钮

<DemoBlock title="清除按钮">
  <LhTimePicker v-model="clearTime" clearable />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const clearTime = ref(new Date())
</script>

<template>
  <LhTimePicker v-model="clearTime" clearable />
</template>
```

```vue options
<script>
export default {
  data() {
    return { clearTime: new Date() }
  },
}
</script>

<template>
  <LhTimePicker v-model="clearTime" clearable />
</template>
```

## 自定义时间范围

<DemoBlock title="自定义时间范围">
  <LhTimePicker v-model="rangeTime" :start="8" :end="20" />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const rangeTime = ref(new Date())
</script>

<template>
  <LhTimePicker v-model="rangeTime" :start="8" :end="20" />
</template>
```

```vue options
<script>
export default {
  data() {
    return { rangeTime: new Date() }
  },
}
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

```vue composition
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

```vue options
<script>
export default {
  data() {
    return {
      smallTime: new Date(),
      mediumTime: new Date(),
      largeTime: new Date(),
    }
  },
}
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

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const stepTime = ref(new Date())
</script>

<template>
  <LhTimePicker v-model="stepTime" :stepMinute="5" :stepSecond="10" />
</template>
```

```vue options
<script>
export default {
  data() {
    return { stepTime: new Date() }
  },
}
</script>

<template>
  <LhTimePicker v-model="stepTime" :stepMinute="5" :stepSecond="10" />
</template>
```

## 占位、只读与方向键控制

`placeholder` 自定义占位文本；`readonly` 只读；`arrow-control` 用方向键在列间滚动选择；`start` / `end` 限定时间范围；`step-hour` / `step-minute` / `step-second` 自定义各列步进。

<DemoBlock title="placeholder / readonly">
  <LhTimePicker v-model="tp1" placeholder="选择提醒时间" />
  <LhTimePicker :model-value="tp2" readonly />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
const tp1 = ref(null)
const tp2 = ref(new Date())
</script>

<template>
  <!-- 占位文本 -->
  <LhTimePicker v-model="tp1" placeholder="选择提醒时间" />
  <!-- 只读 -->
  <LhTimePicker :model-value="tp2" readonly />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      tp1: null,
      tp2: new Date(),
    }
  },
}
</script>

<template>
  <!-- 占位文本 -->
  <LhTimePicker v-model="tp1" placeholder="选择提醒时间" />
  <!-- 只读 -->
  <LhTimePicker :model-value="tp2" readonly />
</template>
```

## TimePicker API

| 属性           | 说明             | 类型                         | 默认值     |
| -------------- | ---------------- | ---------------------------- | ---------- |
| modelValue | 绑定的时间 | `Date` | `null` |
| size | 尺寸 | `"small" \| "medium" \| "large" \| "mini" \| "x-large"` | `'medium'` |
| disabled | 是否禁用 | `boolean` | `false` |
| clearable | 是否显示清除按钮 | `boolean` | `true` |
| placeholder | 占位文本（未传时按 format 生成，取语言包 `timepicker.hour/minute/second`） | `string` | `''` |
| format | 时间格式 | `string` | `'HH:mm:ss'` |
| readonly | 输入框只读 | `boolean` | `true` |
| arrowControl | 是否显示箭头 | `boolean` | `false` |
| start | 开始小时 | `number` | `0` |
| end | 结束小时 | `number` | `24` |
| stepHour | 小时步进 | `number` | `1` |
| stepMinute | 分钟步进 | `number` | `1` |
| stepSecond | 秒步进 | `number` | `1` |
| sx | 快速布局属性（如 `{ mt: 2, w: '50%' }`），转内联样式作用于触发器根元素（浮层面板不受影响） | `LhSxProps` | — |

## TimePicker Events

| 事件名             | 说明             | 类型                   |
| ------------------ | ---------------- | ---------------------- |
| update:model-value | 值改变时触发     | `(value: Date) => void` |
| change             | 值确认改变时触发 | `(value: Date) => void` |

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/time-picker/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

<details id="type-LhTimePickerProps">
<summary><code>LhTimePickerProps</code></summary>

```ts
export interface LhTimePickerProps {
  modelValue?: Date | null
  size?: LhComponentSize
  disabled?: boolean
  clearable?: boolean
  placeholder?: string
  format?: string
  readonly?: boolean
  arrowControl?: boolean
  start?: number
  end?: number
  stepHour?: number
  stepMinute?: number
  stepSecond?: number
  /** sx 快速布局属性 */
  sx?: LhSxProps
}
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

const baseTime = ref(new Date())
const disabledTime = ref(new Date())
const formatTime1 = ref(new Date())
const clearTime = ref(new Date())
const rangeTime = ref(new Date())
const smallTime = ref(new Date())
const mediumTime = ref(new Date())
const largeTime = ref(new Date())
const stepTime = ref(new Date())
const tp1 = ref(null)
const tp2 = ref(new Date())
</script>
