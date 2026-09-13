# Radio 单选框

`LhRadio` 支持独立单选值，`LhRadioGroup` 支持多个选项的单选分组。

## 独立使用

<DemoBlock title="独立使用">
  <LhRadio v-model="gender" value="male" label="男" />
  <LhRadio v-model="gender" value="female" label="女" />
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const gender = ref('male')
</script>

<template>
  <LhRadio v-model="gender" value="male" label="男" />
  <LhRadio v-model="gender" value="female" label="女" />
</template>
```

## 分组使用

<DemoBlock title="分组使用">
  <LhRadioGroup v-model="selectedFramework" name="framework">
    <LhRadio value="vue" label="Vue" />
    <LhRadio value="react" label="React" />
    <LhRadio value="svelte" label="Svelte" />
  </LhRadioGroup>
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const selectedFramework = ref('vue')
</script>

<template>
  <LhRadioGroup v-model="selectedFramework" name="framework">
    <LhRadio value="vue" label="Vue" />
    <LhRadio value="react" label="React" />
    <LhRadio value="svelte" label="Svelte" />
  </LhRadioGroup>
</template>
```

## Radio API

| 属性        | 说明             | 类型                             | 默认值      |
| ----------- | ---------------- | -------------------------------- | ----------- |
| model-value | 独立模式的选中值 | `unknown`                        | —           |
| value       | 提交的值         | `unknown`                        | —           |
| label       | 标签文本         | `string`                         | —           |
| disabled    | 是否禁用         | `boolean`                        | `false`     |
| name        | 原生表单名称     | `string`                         | —           |
| size        | 尺寸             | `'small' \| 'medium' \| 'large'` | `'medium'`  |

## RadioGroup API

| 属性        | 说明             | 类型                             | 默认值      |
| ----------- | ---------------- | -------------------------------- | ----------- |
| model-value | 当前选中的值     | `unknown`                        | —           |
| disabled    | 是否禁用整个分组 | `boolean`                        | `false`     |
| name        | 原生表单名称     | `string`                         | —           |
| size        | 分组内单选框尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'`  |

两种组件都会触发 `update:modelValue` 和 `change`，参数为新的选中值。

<script setup lang="ts">
import { ref } from 'vue'

const gender = ref('male')
const selectedFramework = ref('vue')
</script>