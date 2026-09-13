# Dialog 对话框

模态对话框组件，用于展示重要信息或确认操作。

## 基础用法

<DemoBlock title="基础用法">
  <LhButton @click="dialogVisible1 = true">打开对话框</LhButton>
  <LhDialog v-model="dialogVisible1" title="提示">
    <p>这是一个对话框内容</p>
    <template #footer>
      <LhButton @click="dialogVisible1 = false">取消</LhButton>
      <LhButton type="primary" @click="dialogVisible1 = false">确定</LhButton>
    </template>
  </LhDialog>
</DemoBlock>

```vue
<template>
  <LhButton @click="visible = true">打开对话框</LhButton>
  <LhDialog v-model="visible" title="提示">
    <p>这是一个对话框内容</p>
  </LhDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
</script>
```

## 自定义宽高

<DemoBlock title="自定义宽度">
  <LhButton @click="dialogVisible2 = true">打开大对话框</LhButton>
  <LhDialog v-model="dialogVisible2" title="大对话框" width="600px">
    <p>自定义尺寸的对话框</p>
    <template #footer>
      <LhButton @click="dialogVisible2 = false">关闭</LhButton>
    </template>
  </LhDialog>
</DemoBlock>

```vue
<template>
  <LhButton @click="visible = true">打开大对话框</LhButton>
  <LhDialog v-model="visible" title="提示" width="600px">
    <p>自定义尺寸的对话框</p>
  </LhDialog>
</template>
```

## 可拖拽

<DemoBlock title="可拖拽">
  <LhButton @click="dialogVisible3 = true">打开可拖拽对话框</LhButton>
  <LhDialog v-model="dialogVisible3" title="可拖拽对话框" draggable>
    <p>拖拽标题栏可以移动此对话框。</p>
    <template #footer>
      <LhButton @click="dialogVisible3 = false">关闭</LhButton>
    </template>
  </LhDialog>
</DemoBlock>

## Dialog API

### Props

| 属性名            | 说明               | 类型               | 默认值   |
| ----------------- | ------------------ | ------------------ | -------- |
| modelValue        | 是否显示对话框     | `boolean`          | `false`  |
| title             | 对话框标题         | `string`           | —        |
| width             | 对话框宽度         | `string \| number` | —        |
| top               | 对话框顶部偏移     | `string`           | `'15vh'` |
| closeOnClickModal | 点击遮罩层是否关闭 | `boolean`          | `true`   |
| showClose         | 是否显示关闭按钮   | `boolean`          | `true`   |
| draggable         | 是否可拖拽         | `boolean`          | `false`  |

### Events

| 事件名            | 说明         | 回调参数           |
| ----------------- | ------------ | ------------------ |
| update:modelValue | 显示状态改变 | `(value: boolean)` |
| open              | 打开动画结束 | —                  |
| close             | 关闭动画结束 | —                  |

### Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 对话框内容     |
| header  | 对话框标题区域 |
| footer  | 对话框底部区域 |

<script setup lang="ts">
import { ref } from 'vue'
const dialogVisible1 = ref(false)
const dialogVisible2 = ref(false)
const dialogVisible3 = ref(false)
</script>
