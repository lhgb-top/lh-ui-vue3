# Form

`LhForm` provides form validation and data submission capabilities.

## Basic Usage

<DemoBlock title="Basic Usage">
  <LhForm :model="form" label-width="80px">
    <LhFormItem label="Name">
      <LhInput v-model="form.name" placeholder="Enter name" />
    </LhFormItem>
    <LhFormItem label="Email">
      <LhInput v-model="form.email" placeholder="Enter email" />
    </LhFormItem>
  </LhForm>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { reactive } from 'vue'
import { LhForm, LhFormItem, LhInput } from '@lh-ui/vue3'

const form = reactive({
  name: '',
  email: '',
})
</script>

<template>
  <LhForm :model="form" label-width="80px">
    <LhFormItem label="Name">
      <LhInput v-model="form.name" placeholder="Enter name" />
    </LhFormItem>
    <LhFormItem label="Email">
      <LhInput v-model="form.email" placeholder="Enter email" />
    </LhFormItem>
  </LhForm>
</template>
```

```vue options
<script>
import { reactive } from 'vue'
import { LhForm, LhFormItem, LhInput } from '@lh-ui/vue3'

export default {
  components: { LhForm, LhFormItem, LhInput },
  data() {
    return {
      form: reactive({
        name: '',
        email: '',
      }),
    }
  },
}
</script>

<template>
  <LhForm :model="form" label-width="80px">
    <LhFormItem label="Name">
      <LhInput v-model="form.name" placeholder="Enter name" />
    </LhFormItem>
    <LhFormItem label="Email">
      <LhInput v-model="form.email" placeholder="Enter email" />
    </LhFormItem>
  </LhForm>
</template>
```

## Form Validation

<DemoBlock title="Form Validation">
  <LhForm ref="formRef" :model="formModel" :rules="formRules" label-width="80px">
    <LhFormItem label="Name" prop="name">
      <LhInput v-model="formModel.name" />
    </LhFormItem>
    <LhFormItem label="Email" prop="email">
      <LhInput v-model="formModel.email" />
    </LhFormItem>
    <LhFormItem>
      <LhButton type="primary" @click="submitForm">Submit</LhButton>
      <LhButton plain @click="resetForm">Reset</LhButton>
    </LhFormItem>
  </LhForm>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { LhForm, LhFormItem, LhInput, LhButton } from '@lh-ui/vue3'

const formRef = ref()
const formModel = reactive({
  name: '',
  email: '',
})

const formRules = {
  name: [{ required: true, message: 'Please enter name' }],
  email: [{ required: true, message: 'Please enter email' }],
}

async function submitForm() {
  const valid = await formRef.value.validate()
  if (valid) {
    console.log('Submitted', formModel)
  }
}

function resetForm() {
  formRef.value?.resetFields()
}
</script>

<template>
  <LhForm ref="formRef" :model="formModel" :rules="formRules" label-width="80px">
    <LhFormItem label="Name" prop="name">
      <LhInput v-model="formModel.name" />
    </LhFormItem>
    <LhFormItem label="Email" prop="email">
      <LhInput v-model="formModel.email" />
    </LhFormItem>
    <LhFormItem>
      <LhButton type="primary" @click="submitForm">Submit</LhButton>
      <LhButton plain @click="resetForm">Reset</LhButton>
    </LhFormItem>
  </LhForm>
</template>
```

```vue options
<script>
import { LhForm, LhFormItem, LhInput, LhButton } from '@lh-ui/vue3'

export default {
  components: { LhForm, LhFormItem, LhInput, LhButton },
  data() {
    return {
      formModel: { name: '', email: '' },
      formRules: {
        name: [{ required: true, message: 'Please enter name' }],
        email: [{ required: true, message: 'Please enter email' }],
      },
    }
  },
  methods: {
    async submitForm() {
      const valid = await this.$refs.formRef.validate()
      if (valid) {
        console.log('Submitted', this.formModel)
      }
    },
    resetForm() {
      this.$refs.formRef?.resetFields()
    },
  },
}
</script>

<template>
  <LhForm ref="formRef" :model="formModel" :rules="formRules" label-width="80px">
    <LhFormItem label="Name" prop="name">
      <LhInput v-model="formModel.name" />
    </LhFormItem>
    <LhFormItem label="Email" prop="email">
      <LhInput v-model="formModel.email" />
    </LhFormItem>
    <LhFormItem>
      <LhButton type="primary" @click="submitForm">Submit</LhButton>
      <LhButton plain @click="resetForm">Reset</LhButton>
    </LhFormItem>
  </LhForm>
</template>
```

## Custom Theme

Forms can apply custom theme colors.

<DemoBlock title="Celadon Theme Form">
  <LhConfigProvider :theme-vars="cerblueTheme">
    <LhForm :model="themeForm" label-width="80px" style="max-width: 420px">
      <LhFormItem label="Name">
        <LhInput v-model="themeForm.name" />
      </LhFormItem>
      <LhFormItem>
        <LhButton type="primary">Submit</LhButton>
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
  <!-- Celadon theme -->
  <LhConfigProvider :theme-vars="cerblueTheme">
    <LhForm :model="themeForm" label-width="80px">
      <LhFormItem label="Name">
        <LhInput v-model="themeForm.name" />
      </LhFormItem>
      <LhFormItem>
        <LhButton type="primary">Submit</LhButton>
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
  <!-- Celadon theme -->
  <LhConfigProvider :theme-vars="cerblueTheme">
    <LhForm :model="themeForm" label-width="80px">
      <LhFormItem label="Name">
        <LhInput v-model="themeForm.name" />
      </LhFormItem>
      <LhFormItem>
        <LhButton type="primary">Submit</LhButton>
      </LhFormItem>
    </LhForm>
  </LhConfigProvider>
</template>
```

## Internationalization

<DemoBlock title="Internationalized form">
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
  <!-- Internationalization -->
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
  <!-- Internationalization -->
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

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## Type Definitions

The TypeScript type structures exported by this component (auto-extracted from `packages/components/form/src/types.ts` and `@lh-ui/share/core/*` sources; click each entry to expand; see the Props table above for attribute descriptions):

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

  sx?: SxProps
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
<summary><code>LhFormRule</code> <sub>(from @lh-ui/share/core/form)</sub></summary>

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
import { LhForm, LhFormItem, LhInput, LhButton, LhConfigProvider } from '@lh-ui/vue3'

const form = reactive({
  name: '',
  email: '',
})

const formRef = ref()
const formModel = reactive({
  name: '',
  email: '',
})

const formRules = {
  name: [{ required: true, message: 'Please enter name' }],
  email: [{ required: true, message: 'Please enter email' }],
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
    console.log('Submitted', formModel)
  }
}

function resetForm() {
  formRef.value?.resetFields()
}
const locale = ref('zh-CN')
const fpModel = reactive({ name: '', city: '' })
</script>


## Label position and inline layout

`label-position` switches label alignment (`left` / `right` / `top`); `inline` lays form items out horizontally; `required` on a FormItem shows the required marker.

<DemoBlock title="label-position / inline">
  <LhForm :model="fpModel" label-position="top" inline>
    <LhFormItem prop="name" label="Name" required>
      <LhInput v-model="fpModel.name" />
    </LhFormItem>
    <LhFormItem prop="city" label="City">
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
    <LhFormItem prop="name" label="Name" required>
      <LhInput v-model="fpModel.name" />
    </LhFormItem>
    <LhFormItem prop="city" label="City">
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
    <LhFormItem prop="name" label="Name" required>
      <LhInput v-model="fpModel.name" />
    </LhFormItem>
    <LhFormItem prop="city" label="City">
      <LhInput v-model="fpModel.city" />
    </LhFormItem>
  </LhForm>
</template>
```

## API

### LhForm Props

| Prop | Description | Type | Default |
|------|------|------|--------|
| model | Form data object | `{ [x: string]: unknown; }` | — |
| rules | Validation rules | `{ [x: string]: LhFormRule[]; }` | — |
| labelPosition | Label position | `"left" \| "right" \| "top"` | `'right'` |
| labelWidth | Label width | `string \| number` | — |
| inline | Inline layout | `boolean` | `false` |
| sx | Quick layout props | `SxProps` | — |

### LhFormItem Props

| Prop | Description | Type | Default |
|------|------|------|--------|
| prop | Field path in model, supports `user.name` | `string` | — |
| label | Label text | `string` | — |
| required | Required indicator | `boolean` | `false` |
| rules | Field-level validation rules, overrides Form rules | `LhFormRule[]` | — |

### Validation Rules

```ts
type LhFormRule = {
  required?: boolean
  message?: string
  validator?: (value: unknown, model: Record<string, unknown>) => string | undefined
}
```

`LhForm` exposes `validate()` and `resetFields()` methods.

## Accessibility

- The `LhFormItem` error message carries `role="alert"`, so screen readers announce it the moment validation fails
- The content area references the message via `aria-describedby`, giving assistive technology the "field → error" mapping; the link is removed when there is no error
- Form controls (Input / Select / Checkbox / Radio / Switch / Slider / InputNumber / DatePicker / TimePicker / Cascader) read the validation state of their enclosing `LhFormItem` and set `aria-invalid` on the control while it has an error; the attribute is removed once the error clears, and controls placed outside a `LhFormItem` are unaffected
- The default required message comes from the `form.required` locale key ("This field is required" in English) and follows the ConfigProvider locale; a rule-level `message` takes precedence

