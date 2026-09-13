# Form 表单

`LhForm` 和 `LhFormItem` 提供模型绑定、必填校验和字段错误展示。

## 基础用法

<DemoBlock title="基础用法">
  <LhForm ref="formRef" :model="formModel" :rules="formRules" label-width="80px" style="max-width: 420px">
    <LhFormItem prop="name" label="姓名" required>
      <LhInput v-model="formModel.name" placeholder="请输入姓名" />
    </LhFormItem>
    <LhFormItem prop="email" label="邮箱" required>
      <LhInput v-model="formModel.email" placeholder="请输入邮箱" />
    </LhFormItem>
    <LhFormItem>
      <LhButton type="primary" @click="submitForm">提交</LhButton>
      <LhButton plain @click="resetForm" style="margin-left: 8px">重置</LhButton>
    </LhFormItem>
  </LhForm>
</DemoBlock>

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'

const formRef = ref()
const formModel = reactive({
  name: '',
  email: '',
})

const formRules = {
  name: [{ required: true, message: '请输入姓名' }],
  email: [{ required: true, message: '请输入邮箱' }],
}

async function submitForm() {
  const valid = await formRef.value.validate()
  if (valid) {
    console.log('提交成功', formModel)
  }
}

function resetForm() {
  formRef.value?.resetFields()
}
</script>

<template>
  <LhForm ref="formRef" :model="formModel" :rules="formRules" label-width="80px">
    <LhFormItem prop="name" label="姓名" required>
      <LhInput v-model="formModel.name" placeholder="请输入姓名" />
    </LhFormItem>
    <LhFormItem prop="email" label="邮箱" required>
      <LhInput v-model="formModel.email" placeholder="请输入邮箱" />
    </LhFormItem>
    <LhFormItem>
      <LhButton type="primary" @click="submitForm">提交</LhButton>
      <LhButton plain @click="resetForm" style="margin-left: 8px">重置</LhButton>
    </LhFormItem>
  </LhForm>
</template>
```

## LhForm Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| model | 表单数据对象 | `Record<string, unknown>` | 必填 |
| rules | 字段校验规则 | `Record<string, LhFormRule[]>` | — |
| label-position | 标签位置 | `'left' \| 'right' \| 'top'` | `'right'` |
| label-width | 标签宽度 | `string \| number` | — |
| inline | 是否使用行内布局 | `boolean` | `false` |

## LhFormItem Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| prop | 对应 model 的字段路径，支持 `user.name` | `string` | — |
| label | 标签文本 | `string` | — |
| required | 是否必填 | `boolean` | `false` |
| rules | 当前字段校验规则，优先级高于 Form rules | `LhFormRule[]` | — |

## 校验规则

```ts
type LhFormRule = {
  required?: boolean
  message?: string
  validator?: (value: unknown, model: Record<string, unknown>) => string | undefined
}
```

`LhForm` 暴露 `validate()` 和 `resetFields()` 方法，分别用于校验全部字段和恢复字段初始值。

<script setup lang="ts">
import { reactive, ref } from 'vue'

const formRef = ref()
const formModel = reactive({
  name: '',
  email: '',
})

const formRules = {
  name: [{ required: true, message: '请输入姓名' }],
  email: [{ required: true, message: '请输入邮箱' }],
}

async function submitForm() {
  const valid = await formRef.value.validate()
  if (valid) {
    console.log('提交成功', formModel)
  }
}

function resetForm() {
  formRef.value?.resetFields()
}
</script>
