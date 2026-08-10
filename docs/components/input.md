# Input 输入框

输入框组件，支持文本输入、密码、字数统计等功能。

## 基础用法

```vue
<template>
  <LhInput v-model="value" placeholder="请输入内容" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>
```

## 不同类型

```vue
<template>
  <LhInput v-model="text" placeholder="文本输入" />
  <LhInput v-model="password" type="password" placeholder="密码输入" show-password />
</template>
```

## 禁用状态

```vue
<template>
  <LhInput v-model="value" disabled placeholder="禁用输入框" />
</template>
```

## 字数统计

```vue
<template>
  <LhInput v-model="value" maxlength="10" show-word-limit placeholder="最多10个字" />
</template>
```

## Input API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue | 绑定值 | `string` | `''` |
| type | 输入框类型 | `'text' \| 'password'` | `'text'` |
| placeholder | 占位文本 | `string` | `'请输入'` |
| disabled | 禁用状态 | `boolean` | `false` |
| readonly | 只读状态 | `boolean` | `false` |
| maxlength | 最大输入长度 | `number` | — |
| showWordLimit | 是否显示字数统计 | `boolean` | `false` |
| showPassword | 是否显示密码切换按钮 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值更新事件 | `(value: string)` |
| input | 输入事件 | `(value: string)` |
| change | 值改变事件 | `(value: string)` |
| focus | 获取焦点事件 | `(event: FocusEvent)` |
| blur | 失去焦点事件 | `(event: FocusEvent)` |
| clear | 清空事件 | — |

### Slots

| 插槽名 | 说明 |
|--------|------|
| prefix | 输入框头部内容 |
| suffix | 输入框尾部内容 |
| prepend | 输入框前置内容 |
| append | 输入框后置内容 |