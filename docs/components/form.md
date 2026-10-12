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


```vue composition
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { LhForm, LhFormItem, LhInput, LhButton, LhMessage } from '@lh-ui/vue3'

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
    LhMessage.success('提交成功')
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

```vue options
<script>
import { LhForm, LhFormItem, LhInput, LhButton, LhMessage } from '@lh-ui/vue3'

export default {
  components: { LhForm, LhFormItem, LhInput, LhButton },
  data() {
    return {
      formModel: { name: '', email: '' },
      formRules: {
        name: [{ required: true, message: '请输入姓名' }],
        email: [{ required: true, message: '请输入邮箱' }],
      },
    }
  },
  methods: {
    async submitForm() {
      const valid = await this.$refs.formRef.validate()
      if (valid) {
        LhMessage.success('提交成功')
        console.log('提交成功', this.formModel)
      }
    },
    resetForm() { this.$refs.formRef?.resetFields() },
  },
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
      <LhButton plain @click="resetForm">重置</LhButton>
    </LhFormItem>
  </LhForm>
</template>
```

## 自定义主题

表单可以应用自定义主题色。

<DemoBlock title="青花瓷主题表单">
  <LhConfigProvider :theme-vars="cerblueTheme">
    <LhForm :model="themeForm" label-width="80px" style="max-width: 420px">
      <LhFormItem label="姓名">
        <LhInput v-model="themeForm.name" />
      </LhFormItem>
      <LhFormItem>
        <LhButton type="primary">提交</LhButton>
      </LhFormItem>
    </LhForm>
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { reactive } from 'vue'
import { LhConfigProvider, LhForm, LhFormItem, LhInput, LhButton } from '@lh-ui/vue3'

const themeForm = reactive({ name: '' })
const cerblueTheme = {
  'primary-color': '#2B4C7C',
  'primary-color-hover': '#3D649E',
  'primary-color-bg': '#E8EDF3',
}
</script>

<template>
  <!-- 青花瓷主题 -->
  <LhConfigProvider :theme-vars="cerblueTheme">
    <LhForm :model="themeForm" label-width="80px">
      <LhFormItem label="姓名">
        <LhInput v-model="themeForm.name" />
      </LhFormItem>
      <LhFormItem>
        <LhButton type="primary">提交</LhButton>
      </LhFormItem>
    </LhForm>
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { LhConfigProvider, LhForm, LhFormItem, LhInput, LhButton } from '@lh-ui/vue3'

export default {
  data() {
    return {
      themeForm: { name: '' },
      cerblueTheme: {
        'primary-color': '#2B4C7C',
        'primary-color-hover': '#3D649E',
        'primary-color-bg': '#E8EDF3',
      },
    }
  },
}
</script>

<template>
  <!-- 青花瓷主题 -->
  <LhConfigProvider :theme-vars="cerblueTheme">
    <LhForm :model="themeForm" label-width="80px">
      <LhFormItem label="姓名">
        <LhInput v-model="themeForm.name" />
      </LhFormItem>
      <LhFormItem>
        <LhButton type="primary">提交</LhButton>
      </LhFormItem>
    </LhForm>
  </LhConfigProvider>
</template>
```

## 国际化

<DemoBlock title="国际化表单">
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhForm :model="formModel" label-width="80px">
      <LhFormItem :label="locale === 'zh-CN' ? '姓名' : 'Name'">
        <LhInput v-model="formModel.name" :placeholder="locale === 'zh-CN' ? '请输入姓名' : 'Enter name'" />
      </LhFormItem>
      <LhFormItem>
        <LhButton type="primary">{{ locale === 'zh-CN' ? '提交' : 'Submit' }}</LhButton>
      </LhFormItem>
    </LhForm>
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { LhConfigProvider, LhForm, LhFormItem, LhInput, LhButton } from '@lh-ui/vue3'
import { zhCN } from '@lh-ui/vue3'
import { enUS } from '@lh-ui/vue3'

const locale = ref('zh-CN')
const formModel = reactive({ name: '' })
</script>

<template>
  <!-- 国际化配置 -->
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhForm :model="formModel" label-width="80px">
      <LhFormItem :label="locale === 'zh-CN' ? '姓名' : 'Name'">
        <LhInput v-model="formModel.name" :placeholder="locale === 'zh-CN' ? '请输入姓名' : 'Enter name'" />
      </LhFormItem>
      <LhFormItem>
        <LhButton type="primary">{{ locale === 'zh-CN' ? '提交' : 'Submit' }}</LhButton>
      </LhFormItem>
    </LhForm>
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { LhConfigProvider, LhForm, LhFormItem, LhInput, LhButton } from '@lh-ui/vue3'
import { zhCN } from '@lh-ui/vue3'
import { enUS } from '@lh-ui/vue3'

export default {
  data() {
    return {
      locale: 'zh-CN',
      formModel: { name: '' },
      zhCN: zhCN,
      enUS: enUS,
    }
  },
}
</script>

<template>
  <!-- 国际化配置 -->
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhForm :model="formModel" label-width="80px">
      <LhFormItem :label="locale === 'zh-CN' ? '姓名' : 'Name'">
        <LhInput v-model="formModel.name" :placeholder="locale === 'zh-CN' ? '请输入姓名' : 'Enter name'" />
      </LhFormItem>
      <LhFormItem>
        <LhButton type="primary">{{ locale === 'zh-CN' ? '提交' : 'Submit' }}</LhButton>
      </LhFormItem>
    </LhForm>
  </LhConfigProvider>
</template>
```

## 标签位置与行内布局

`label-position` 切换标签对齐（`left` / `right` / `top`）；`inline` 让表单项水平排列。

<DemoBlock title="label-position / inline">
  <LhForm :model="fpModel" label-position="top" inline>
    <LhFormItem prop="name" label="名称" required>
      <LhInput v-model="fpModel.name" />
    </LhFormItem>
    <LhFormItem prop="city" label="城市">
      <LhInput v-model="fpModel.city" />
    </LhFormItem>
  </LhForm>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { reactive } from 'vue'
const fpModel = reactive({ name: '', city: '' })
</script>

<template>
  <LhForm :model="fpModel" label-position="top" inline>
    <LhFormItem prop="name" label="名称" required>
      <LhInput v-model="fpModel.name" />
    </LhFormItem>
    <LhFormItem prop="city" label="城市">
      <LhInput v-model="fpModel.city" />
    </LhFormItem>
  </LhForm>
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      fpModel: { name: '', city: '' },
    }
  },
}
</script>

<template>
  <LhForm :model="fpModel" label-position="top" inline>
    <LhFormItem prop="name" label="名称" required>
      <LhInput v-model="fpModel.name" />
    </LhFormItem>
    <LhFormItem prop="city" label="城市">
      <LhInput v-model="fpModel.city" />
    </LhFormItem>
  </LhForm>
</template>
```

## LhForm Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| model | 表单数据对象 | `{ [x: string]: unknown; }` | — |
| rules | 字段校验规则 | `{ [x: string]: LhFormRule[]; }` | — |
| labelPosition | 标签位置 | `"left" \| "right" \| "top"` | `'right'` |
| labelWidth | 标签宽度 | `string \| number` | — |
| inline | 是否使用行内布局 | `boolean` | `false` |
| sx | sx 快速布局属性 | `LhSxProps` | — |

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

`LhForm` 暴露 `validate()` 和 `resetFields()` 方法。

## 无障碍

- `LhFormItem` 的错误文案带 `role="alert"`，校验失败时屏幕阅读器立即播报
- 内容区通过 `aria-describedby` 关联错误文案，辅助技术可读取「字段 → 错误」的对应关系；无错误时关联自动移除
- 表单控件（Input / Select / Checkbox / Radio / Switch / Slider / InputNumber / DatePicker / TimePicker / Cascader）读取所属 `LhFormItem` 的校验状态，校验失败时在控件上标记 `aria-invalid`，错误消除后自动移除；控件放在 `LhFormItem` 之外时不受影响
- 必填兜底文案取自语言包 `form.required`（中文「此项为必填」），随 ConfigProvider 语言切换；`rules` 里的 `message` 优先级更高

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/form/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

<details id="type-LhFormLabelPosition">
<summary><code>LhFormLabelPosition</code></summary>

```ts
export type LhFormLabelPosition = 'left' | 'right' | 'top'
```

</details>

<details id="type-LhFormProps">
<summary><code>LhFormProps</code></summary>

```ts
export interface LhFormProps {
  model: Record<string, unknown>
  rules?: Record<string, LhFormRule[]>
  labelPosition?: LhFormLabelPosition
  labelWidth?: string | number
  inline?: boolean
  /** sx 快速布局属性 */
  sx?: LhSxProps
}
```

</details>

<details id="type-LhFormItemProps">
<summary><code>LhFormItemProps</code></summary>

```ts
export interface LhFormItemProps {
  prop?: string
  label?: string
  required?: boolean
  rules?: LhFormRule[]
}
```

</details>

<details id="type-LhFormRule">
<summary><code>LhFormRule</code> <sub>（来自 @lh-ui/share/core/form）</sub></summary>

```ts
export interface LhFormRule {
  required?: boolean
  message?: string
  validator?: (value: unknown, model: Record<string, unknown>) => string | undefined
}
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
import { reactive, ref } from 'vue'
import zhCN from '@lh-ui/share/locales/lang/zh-CN'
import enUS from '@lh-ui/share/locales/lang/en-US'
import { LhConfigProvider, LhMessage } from '~/components'
import '@lh-ui/share/styles/config-provider'

const formRef = ref()
const formModel = reactive({
  name: '',
  email: '',
})

const formRules = {
  name: [{ required: true, message: '请输入姓名' }],
  email: [{ required: true, message: '请输入邮箱' }],
}

const themeForm = reactive({ name: '' })
const cerblueTheme = {
  'primary-color': '#2B4C7C',
  'primary-color-hover': '#3D649E',
  'primary-color-bg': '#E8EDF3',
}

async function submitForm() {
  const valid = await formRef.value.validate()
  if (valid) {
    // 校验通过给一个可见反馈：只 console.log 用户在界面上看不到任何变化
    LhMessage.success('提交成功')
    console.log('提交成功', formModel)
  }
}

function resetForm() {
  formRef.value?.resetFields()
}
const locale = ref('zh-CN')
const fpModel = reactive({ name: '', city: '' })
</script>

