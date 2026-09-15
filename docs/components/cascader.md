---
pageClass: custom-container
---

# Cascader 级联选择器

级联选择器用于多层级数据的场景，例如：省市地区选择。

## 基础用法

<DemoBlock title="独立使用">
    <lh-cascader v-model="value1" :options="options1" />
</DemoBlock>

```vue
<script setup>
import { ref } from 'vue'

const value = ref([])
const options = [
  {
    value: 'zhinan',
    label: '指南',
    children: [
      {
        value: 'sheji',
        label: '设计指南',
        children: [
          { value: 'yuansze', label: '颜色' },
          { value: 'fuziyuanze', label: '字体' },
        ],
      },
      {
        value: 'shejiguize',
        label: '设计规则',
      },
    ],
  },
  {
    value: 'zujian',
    label: '组件',
    children: [
      { value: 'jiben', label: '基础' },
      { value: 'fankui', label: '反馈' },
    ],
  },
]
</script>

<template>
  <lh-cascader v-model="value" :options="options" />
</template>
```


## 多选模式

设置为多选模式，可以选择多个结果。

<DemoBlock title="多选模式">
    <lh-cascader v-model="value2" :options="options2" multiple />
</DemoBlock>

```vue
<script setup>
import { ref } from 'vue'

const value = ref([])
const options = [
  {
    value: 'zhinan',
    label: '指南',
    children: [
      { value: 'sheji', label: '设计指南' },
      { value: 'shejiguize', label: '设计规则' },
    ],
  },
  {
    value: 'zujian',
    label: '组件',
    children: [
      { value: 'jiben', label: '基础组件' },
      { value: 'fankui', label: '反馈组件' },
    ],
  },
]
</script>

<template>
  <lh-cascader v-model="value" :options="options" multiple />
</template>
```


## 选项禁用

通过 `disabled` 属性禁用节点。

<DemoBlock title="选项禁用">
  <lh-cascader v-model="value3" :options="options3" />
</DemoBlock>

```vue
<script setup>
import { ref } from 'vue'

const value = ref([])
const options = [
  {
    value: 'zhinan',
    label: '指南',
    disabled: true,
    children: [
      { value: 'sheji', label: '设计指南' },
    ],
  },
  {
    value: 'zujian',
    label: '组件',
    children: [
      { value: 'jiben', label: '基础组件' },
      { value: 'fankui', label: '反馈组件', disabled: true },
    ],
  },
]
</script>

<template>
  <lh-cascader v-model="value" :options="options" />
</template>
```

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| model-value | 绑定值 | `(string \| number)[]` | `[]` |
| options | 选项列表 | `LhCascaderNode[]` | `[]` |
| size | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| disabled | 是否禁用 | `boolean` | `false` |
| clearable | 是否可清除 | `boolean` | `true` |
| placeholder | 占位符 | `string` | `'请选择'` |
| readonly | 是否只读 | `boolean` | `false` |
| multiple | 是否多选 | `boolean` | `false` |
| filterable | 是否可搜索 | `boolean` | `false` |
| check-strictly | 任意层级节点可选 | `boolean` | `false` |
| emit-path | 返回值是否包含完整路径 | `boolean` | `true` |
| cascading | 是否级联关联 | `boolean` | `true` |
| separator | 分隔符 | `string` | `'/'` |
| collapse-tags | 多选模式下是否折叠标签 | `boolean` | `false` |
| show-all-levels | 是否在输入框显示完整路径 | `boolean` | `true` |
| item-config | 节点字段别名 | `object` | `{}` |

## Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 选中值变化时触发 | `(value: (string \| number)[], path: LhCascaderNode[] \| null)` |
| update:model-value | 绑定值变化时触发 | `value: (string \| number)[]` |

## 数据结构

`LhCascaderNode` 类型定义：

```ts
interface LhCascaderNode {
  value: string | number
  label: string
  disabled?: boolean
  leaf?: boolean
  children?: LhCascaderNode[]
}
```

<script setup lang="ts">
import { ref } from 'vue'
const value1 = ref([])
const options1 = [
  {
    value: 'zhinan',
    label: '指南',
    children: [
      {
        value: 'sheji',
        label: '设计指南',
        children: [
          { value: 'yuansze', label: '颜色' },
          { value: 'fuziyuanze', label: '字体' },
        ],
      },
      {
        value: 'shejiguize',
        label: '设计规则',
      },
    ],
  },
  {
    value: 'zujian',
    label: '组件',
    children: [
      { value: 'jiben', label: '基础' },
      { value: 'fankui', label: '反馈' },
    ],
  },
]

const value2 = ref([])
const options2 = [
  {
    value: 'zhinan',
    label: '指南',
    children: [
      { value: 'sheji', label: '设计指南' },
      { value: 'shejiguize', label: '设计规则' },
    ],
  },
  {
    value: 'zujian',
    label: '组件',
    children: [
      { value: 'jiben', label: '基础组件' },
      { value: 'fankui', label: '反馈组件' },
    ],
  },
]

const value3 = ref([])
const options3 = [
  {
    value: 'zhinan',
    label: '指南',
    disabled: true,
    children: [
      { value: 'sheji', label: '设计指南' },
    ],
  },
  {
    value: 'zujian',
    label: '组件',
    children: [
      { value: 'jiben', label: '基础组件' },
      { value: 'fankui', label: '反馈组件', disabled: true },
    ],
  },
]
</script>
