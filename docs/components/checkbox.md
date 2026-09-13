# Checkbox 复选框

`LhCheckbox` 支持独立布尔值，`LhCheckboxGroup` 支持多个选项的数组值。

## 独立使用

<DemoBlock title="独立使用">
  <LhCheckbox v-model="accepted" label="我已阅读并同意" />
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const accepted = ref(false)
</script>

<template>
  <LhCheckbox v-model="accepted" label="我已阅读并同意" />
</template>
```

## 分组使用

<DemoBlock title="分组使用">
  <LhCheckboxGroup v-model="selectedFrameworks" name="framework">
    <LhCheckbox value="vue" label="Vue" />
    <LhCheckbox value="react" label="React" />
    <LhCheckbox value="svelte" label="Svelte" />
  </LhCheckboxGroup>
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const selected = ref(['vue'])
</script>

<template>
  <LhCheckboxGroup v-model="selected" name="framework">
    <LhCheckbox value="vue" label="Vue" />
    <LhCheckbox value="react" label="React" />
    <LhCheckbox value="svelte" label="Svelte" />
  </LhCheckboxGroup>
</template>
```

## Checkbox API

| 属性          | 说明               | 类型                             | 默认值     |
| ------------- | ------------------ | -------------------------------- | ---------- |
| model-value   | 独立模式的选中状态 | `boolean`                        | `false`    |
| value         | 分组模式提交的值   | `unknown`                        | —          |
| label         | 标签文本           | `string`                         | —          |
| disabled      | 是否禁用           | `boolean`                        | `false`    |
| indeterminate | 是否为半选状态     | `boolean`                        | `false`    |
| size          | 尺寸               | `'small' \| 'medium' \| 'large'` | `'medium'` |

## CheckboxGroup API

| 属性        | 说明             | 类型                             | 默认值     |
| ----------- | ---------------- | -------------------------------- | ---------- |
| model-value | 已选值列表       | `unknown[]`                      | `[]`       |
| disabled    | 是否禁用整个分组 | `boolean`                        | `false`    |
| name        | 原生表单名称     | `string`                         | —          |
| size        | 分组内复选框尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |

两种组件都会触发 `update:modelValue`；分组组件额外触发 `change`，参数为新的值数组。

<script setup lang="ts">
import { ref } from 'vue'

const accepted = ref(false)
const selectedFrameworks = ref(['vue'])
</script>
