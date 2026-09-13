# Select 选择器

`LhSelect` 用于从选项列表中选择一个值，支持禁用选项、清空和键盘操作。

## 基础用法

<DemoBlock title="基础用法">
  <LhSelect v-model="selectedCity" :options="cityOptions" placeholder="请选择城市" style="width: 220px" />
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('beijing')
const options = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '深圳', value: 'shenzhen' },
]
</script>

<template>
  <LhSelect v-model="value" :options="options" placeholder="请选择城市" />
</template>
```

## 可清空与禁用

<DemoBlock title="可清空与禁用">
  <div class="demo-row">
    <LhSelect v-model="selectedRegion" :options="regionOptions" clearable placeholder="请选择地区" style="width: 220px" />
    <LhSelect v-model="selectedDisabled" :options="disabledOptions" disabled placeholder="已禁用" style="width: 220px" />
  </div>
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = [
  { label: '华北', value: 'north' },
  { label: '华东', value: 'east' },
  { label: '华南', value: 'south' },
]
</script>

<template>
  <LhSelect v-model="value" :options="options" clearable placeholder="请选择地区" />
  <LhSelect v-model="value" :options="options" disabled placeholder="已禁用" />
</template>
```

## Select API

### Props

| 属性        | 说明                   | 类型                             | 默认值            |
| ----------- | ---------------------- | -------------------------------- | ----------------- |
| model-value | 当前值                 | `unknown`                        | —                 |
| options     | 选项列表               | `LhSelectOption[]`               | `[]`              |
| placeholder | 占位文本               | `string`                         | `'Please select'` |
| disabled    | 是否禁用               | `boolean`                        | `false`           |
| clearable   | 是否显示清空按钮       | `boolean`                        | `false`           |
| size        | 选择器尺寸             | `'small' \| 'medium' \| 'large'` | `'medium'`        |
| aria-label  | 无可见标签时的辅助文本 | `string`                         | —                 |

### Events

| 事件              | 说明         | 参数             |
| ----------------- | ------------ | ---------------- |
| update:modelValue | 值发生变化   | `value: unknown` |
| change            | 选择发生变化 | `value, option`  |
| clear             | 点击清空     | —                |

### Option

```ts
type LhSelectOption = {
  label: string
  value: unknown
  disabled?: boolean
}
```

支持 `ArrowUp`、`ArrowDown` 移动高亮项，`Enter` 确认选择，`Escape` 关闭下拉菜单。

<script setup lang="ts">
import { ref } from 'vue'

const selectedCity = ref('beijing')
const selectedRegion = ref('')
const selectedDisabled = ref('north')

const cityOptions = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '深圳', value: 'shenzhen' },
]

const regionOptions = [
  { label: '华北', value: 'north' },
  { label: '华东', value: 'east' },
  { label: '华南', value: 'south' },
]

const disabledOptions = [
  { label: '华北', value: 'north', disabled: true },
  { label: '华东', value: 'east' },
  { label: '华南', value: 'south' },
]
</script>

<style scoped>
.demo-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}
</style>
