# Tag 标签

`LhTag` 用于标识和分类。

## 基础用法

<DemoBlock title="基础用法">
  <LhTag>标签一</LhTag>
  <LhTag>标签二</LhTag>
  <LhTag>标签三</LhTag>
</DemoBlock>

```vue
<template>
  <LhTag>标签一</LhTag>
  <LhTag>标签二</LhTag>
  <LhTag>标签三</LhTag>
</template>
```

## 类型

<DemoBlock title="类型">
  <LhTag type="primary">主要标签</LhTag>
  <LhTag type="success">成功标签</LhTag>
  <LhTag type="warning">警告标签</LhTag>
  <LhTag type="danger">危险标签</LhTag>
  <LhTag type="info">信息标签</LhTag>
</DemoBlock>

```vue
<template>
  <LhTag type="primary">主要标签</LhTag>
  <LhTag type="success">成功标签</LhTag>
  <LhTag type="warning">警告标签</LhTag>
  <LhTag type="danger">危险标签</LhTag>
  <LhTag type="info">信息标签</LhTag>
</template>
```

## 尺寸

<DemoBlock title="尺寸">
  <LhTag size="small">小标签</LhTag>
  <LhTag size="medium">中标签</LhTag>
  <LhTag size="large">大标签</LhTag>
</DemoBlock>

```vue
<template>
  <LhTag size="small">小标签</LhTag>
  <LhTag size="medium">中标签</LhTag>
  <LhTag size="large">大标签</LhTag>
</template>
```

## 可关闭

<DemoBlock title="可关闭">
  <LhTag v-if="show1" closable @close="show1 = false">标签一</LhTag>
  <LhTag v-if="show2" type="primary" closable @close="show2 = false">标签二</LhTag>
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const show1 = ref(true)
const show2 = ref(true)
</script>

<template>
  <LhTag v-if="show1" closable @close="show1 = false">标签一</LhTag>
  <LhTag v-if="show2" type="primary" closable @close="show2 = false">标签二</LhTag>
</template>
```

## 圆角与标记

<DemoBlock title="圆角与标记">
  <LhTag round>圆角标签</LhTag>
  <LhTag hit>标记标签</LhTag>
  <LhTag round hit>圆角标记</LhTag>
</DemoBlock>

```vue
<template>
  <LhTag round>圆角标签</LhTag>
  <LhTag hit>标记标签</LhTag>
  <LhTag round hit>圆角标记</LhTag>
</template>
```

## API

| 属性       | 说明               | 类型                                             | 默认值     |
| ---------- | ------------------ | ------------------------------------------------ | ---------- |
| type       | 标签类型           | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | `'default'` |
| size       | 尺寸               | `'small' \| 'medium' \| 'large'`                 | `'medium'` |
| closable   | 是否可关闭         | `boolean`                                        | `false`    |
| disabled   | 是否禁用           | `boolean`                                        | `false`    |
| round      | 是否为圆角         | `boolean`                                        | `false`    |
| hit        | 是否有边框描边     | `boolean`                                        | `false`    |
| onClose    | 关闭时的回调       | `(e: Event) => void`                             | —          |

| 事件  | 说明         | 类型          |
| ----- | ------------ | ------------- |
| click | 点击标签时触发 | `(e: MouseEvent) => void` |
| close | 关闭标签时触发 | `(e: Event) => void` |

<script setup lang="ts">
import { ref } from 'vue'

const show1 = ref(true)
const show2 = ref(true)
</script>