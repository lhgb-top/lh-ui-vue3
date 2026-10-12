# DatePicker 日期选择器

`LhDatePicker` 是一个用于选择日期时间的选择器组件，支持日期、月份、年份等多种选择模式。

## 基础用法

<DemoBlock title="基础用法">
  <LhDatePicker v-model="baseDate" />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const baseDate = ref(new Date(2024, 0, 1))
</script>

<template>
  <LhDatePicker v-model="baseDate" />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      baseDate: new Date(2024, 0, 1),
    }
  },
}
</script>

<template>
  <LhDatePicker v-model="baseDate" />
</template>
```

## 禁用状态

<DemoBlock title="禁用状态">
  <LhDatePicker v-model="disabledDate" disabled />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const disabledDate = ref(new Date())
</script>

<template>
  <LhDatePicker v-model="disabledDate" disabled />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      disabledDate: new Date(),
    }
  },
}
</script>

<template>
  <LhDatePicker v-model="disabledDate" disabled />
</template>
```

## 日期格式化

<DemoBlock title="日期格式化">
  <LhDatePicker v-model="formatDate" format="MM/dd/yyyy" />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const formatDate = ref(new Date())
</script>

<template>
  <LhDatePicker v-model="formatDate" format="MM/dd/yyyy" />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      formatDate: new Date(),
    }
  },
}
</script>

<template>
  <LhDatePicker v-model="formatDate" format="MM/dd/yyyy" />
</template>
```

## 清除按钮

<DemoBlock title="清除按钮">
  <LhDatePicker v-model="clearDate" clearable />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const clearDate = ref(new Date())
</script>

<template>
  <LhDatePicker v-model="clearDate" clearable />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      clearDate: new Date(),
    }
  },
}
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

```vue composition
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

```vue options
<script>
export default {
  data() {
    return {
      smallDate: new Date(),
      mediumDate: new Date(),
      largeDate: new Date(),
    }
  },
}
</script>

<template>
  <LhDatePicker v-model="smallDate" size="small" />
  <LhDatePicker v-model="mediumDate" size="medium" />
  <LhDatePicker v-model="largeDate" size="large" />
</template>
```

## 选择模式

`mode` 支持 `'date'`（默认）/ `'month'` / `'year'`。面板内点击标题可逐级下钻：日期 → 月份 → 年份；月份/年份模式下打开面板即落在对应网格，点击直接选中并关闭（无底部按钮）。

<DemoBlock title="月份与年份模式">
  <div class="demo-row">
    <LhDatePicker v-model="monthDate" mode="month" />
    <LhDatePicker v-model="yearDate" mode="year" />
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const monthDate = ref(new Date())
const yearDate = ref(new Date(2024, 0, 1))
</script>

<template>
  <LhDatePicker v-model="monthDate" mode="month" />
  <LhDatePicker v-model="yearDate" mode="year" />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      monthDate: new Date(),
      yearDate: new Date(2024, 0, 1),
    }
  },
}
</script>

<template>
  <LhDatePicker v-model="monthDate" mode="month" />
  <LhDatePicker v-model="yearDate" mode="year" />
</template>
```

## 占位、只读与定制

`placeholder` 自定义占位文本；`readonly` 只读（面板可看不可选）；`range-separator` 自定义区间分隔符；`cell-class-name` 给日期单元格加自定义类；`popper-class` 定制面板样式。

<DemoBlock title="placeholder / readonly / range-separator">
  <LhDatePicker v-model="dp1" placeholder="请选择入住日期" />
  <LhDatePicker :model-value="dp2" readonly />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
const dp1 = ref(null)
const dp2 = ref(new Date())
</script>

<template>
  <!-- 占位文本 -->
  <LhDatePicker v-model="dp1" placeholder="请选择入住日期" />
  <!-- 只读 -->
  <LhDatePicker :model-value="dp2" readonly />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      dp1: null,
      dp2: new Date(),
    }
  },
}
</script>

<template>
  <!-- 占位文本 -->
  <LhDatePicker v-model="dp1" placeholder="请选择入住日期" />
  <!-- 只读 -->
  <LhDatePicker :model-value="dp2" readonly />
</template>
```

## DatePicker API

> **注意**：`datetime` / 区间选择目前**只有类型预留，没有对应的选择 UI**（时间列与区间面板未实现，
> 见家族台账 P-08）。外部传入区间值 `[Date, Date]` 时面板可正常展示，但面板内确认不会覆盖区间值。

| 属性            | 说明             | 类型                                                   | 默认值      |
| --------------- | ---------------- | ------------------------------------------------------ | ----------- |
| modelValue | 绑定的日期 | `Date \| [Date, Date]` | `null` |
| mode | 选择模式 | `"date" \| "month" \| "year" \| "datetime"` | `'date'` |
| size | 尺寸 | `"small" \| "medium" \| "large" \| "mini" \| "x-large"` | `'medium'` |
| disabled | 是否禁用 | `boolean` | `false` |
| clearable | 是否显示清除按钮 | `boolean` | `true` |
| placeholder | 占位文本（未传时按 format 生成，取语言包 `datepicker.year/month`） | `string` | `''` |
| format | 日期格式 | `string` | `'yyyy-MM-dd'` |
| readonly | 输入框只读 | `boolean` | `true` |
| rangeSeparator | 范围分隔符 | `string` | `'~'` |
| cellClassName | — | `(date: Date) => string` | — |
| popperClass | — | `string` | — |
| sx | 快速布局属性（如 `{ mt: 2, w: '50%' }`），转内联样式作用于触发器根元素（浮层面板不受影响） | `LhSxProps` | — |

## DatePicker Events

| 事件名             | 说明             | 类型                                  |
| ------------------ | ---------------- | ------------------------------------- |
| update:model-value | 值改变时触发     | `(value: Date \| [Date, Date]) => void` |
| change             | 值确认改变时触发 | `(value: Date \| [Date, Date]) => void` |

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/date-picker/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

<details id="type-LhDatePickerProps">
<summary><code>LhDatePickerProps</code></summary>

```ts
export interface LhDatePickerProps {
  modelValue?: Date | [Date, Date] | null
  mode?: LhDatePickerMode
  size?: LhComponentSize
  disabled?: boolean
  clearable?: boolean
  placeholder?: string
  format?: string
  readonly?: boolean
  rangeSeparator?: string
  cellClassName?: (date: Date) => string
  popperClass?: string
  /** sx 快速布局属性 */
  sx?: LhSxProps
}
```

</details>

<details id="type-LhDatePickerMode">
<summary><code>LhDatePickerMode</code> <sub>（来自 @lh-ui/share/core/date-picker）</sub></summary>

```ts
/**
 * DatePicker 模式
 */
export type LhDatePickerMode = 'date' | 'month' | 'year' | 'datetime'
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

const baseDate = ref(new Date(2024, 0, 1))
const disabledDate = ref(new Date(2024, 0, 1))
const formatDate = ref(new Date())
const clearDate = ref(new Date())
const smallDate = ref(new Date())
const mediumDate = ref(new Date())
const largeDate = ref(new Date())
const monthDate = ref(new Date())
const yearDate = ref(new Date(2024, 0, 1))
const dp1 = ref(null)
const dp2 = ref(new Date())
</script>

<style scoped>
.demo-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}
</style>