# Checkbox

`LhCheckbox` is used for selecting multiple options from a set.

## Basic Usage

<DemoBlock title="Single Checkbox">
  <LhCheckbox v-model="accepted" label="I have read and agree" />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhCheckbox } from '@lh-ui/vue3'

const accepted = ref(false)
</script>

<template>
  <LhCheckbox v-model="accepted" label="I have read and agree" />
</template>
```

```vue options
<script>
import { LhCheckbox } from '@lh-ui/vue3'

export default {
  components: { LhCheckbox },
  data() {
    return {
      accepted: false
    }
  },
}
</script>

<template>
  <LhCheckbox v-model="accepted" label="I have read and agree" />
</template>
```

## Checkbox Group

Use `LhCheckboxGroup` to manage multiple checkboxes.

<DemoBlock title="Checkbox Group">
  <div class="demo-row">
    <LhCheckboxGroup v-model="selectedFrameworks">
      <LhCheckbox value="vue" label="Vue" />
      <LhCheckbox value="react" label="React" />
    </LhCheckboxGroup>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhCheckbox, LhCheckboxGroup } from '@lh-ui/vue3'

const selected = ref(['vue'])
</script>

<template>
  <div style="display: flex; gap: 12px">
    <LhCheckboxGroup v-model="selected">
      <LhCheckbox value="vue" label="Vue" />
      <LhCheckbox value="react" label="React" />
    </LhCheckboxGroup>
  </div>
</template>
```

```vue options
<script>
import { LhCheckbox, LhCheckboxGroup } from '@lh-ui/vue3'

export default {
  components: { LhCheckbox, LhCheckboxGroup },
  data() {
    return {
      selected: ['vue'],
    }
  },
}
</script>

<template>
  <div style="display: flex; gap: 12px">
    <LhCheckboxGroup v-model="selected">
      <LhCheckbox value="vue" label="Vue" />
      <LhCheckbox value="react" label="React" />
    </LhCheckboxGroup>
  </div>
</template>
```

## Custom Theme

Checkboxes can apply custom theme colors.

<DemoBlock title="Celadon Theme">
  <LhConfigProvider :theme-vars="cerblueTheme">
    <div class="demo-row">
      <LhCheckboxGroup v-model="selectedTheme">
        <LhCheckbox value="option1" label="Option 1" />
        <LhCheckbox value="option2" label="Option 2" />
      </LhCheckboxGroup>
    </div>
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhConfigProvider, LhCheckbox, LhCheckboxGroup } from '@lh-ui/vue3'

const selected = ref(['option1'])
const cerblueTheme = {
  'primary-color': '#2B4C7C',
  'primary-color-hover': '#3D649E',
  'primary-color-bg': '#E8EDF3',
}
</script>

<template>
  <LhConfigProvider :theme-vars="cerblueTheme">
    <LhCheckboxGroup v-model="selected">
      <LhCheckbox value="option1" label="Option 1" />
      <LhCheckbox value="option2" label="Option 2" />
    </LhCheckboxGroup>
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { LhConfigProvider, LhCheckbox, LhCheckboxGroup } from '@lh-ui/vue3'

export default {
  components: { LhConfigProvider, LhCheckbox, LhCheckboxGroup },
  data() {
    return {
      selected: ['option1'],
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
  <LhConfigProvider :theme-vars="cerblueTheme">
    <LhCheckboxGroup v-model="selected">
      <LhCheckbox value="option1" label="Option 1" />
      <LhCheckbox value="option2" label="Option 2" />
    </LhCheckboxGroup>
  </LhConfigProvider>
</template>
```

## Internationalization

Checkbox text can be internationalized via `LhConfigProvider`.

<DemoBlock title="Internationalization">
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhCheckboxGroup v-model="selected">
      <LhCheckbox value="vue" :label="locale === 'zh-CN' ? 'Vue框架' : 'Vue Framework'" />
      <LhCheckbox value="react" :label="locale === 'zh-CN' ? 'React框架' : 'React Framework'" />
    </LhCheckboxGroup>
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhConfigProvider, LhCheckbox, LhCheckboxGroup } from '@lh-ui/vue3'
import { zhCN } from '@lh-ui/vue3'
import { enUS } from '@lh-ui/vue3'

const locale = ref('zh-CN')
const selected = ref(['vue'])
</script>

<template>
  <!-- Locale configuration -->
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhCheckboxGroup v-model="selected">
      <LhCheckbox value="vue" :label="locale === 'zh-CN' ? 'Vue框架' : 'Vue Framework'" />
      <LhCheckbox value="react" :label="locale === 'zh-CN' ? 'React框架' : 'React Framework'" />
    </LhCheckboxGroup>
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { LhConfigProvider, LhCheckbox, LhCheckboxGroup } from '@lh-ui/vue3'
import { zhCN } from '@lh-ui/vue3'
import { enUS } from '@lh-ui/vue3'

export default {
  components: { LhConfigProvider, LhCheckbox, LhCheckboxGroup },
  data() {
    return {
      locale: 'zh-CN',
      selected: ['vue'],
      zhCN: zhCN,
      enUS: enUS,
    }
  },
}
</script>

<template>
  <!-- Locale configuration -->
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhCheckboxGroup v-model="selected">
      <LhCheckbox value="vue" :label="locale === 'zh-CN' ? 'Vue框架' : 'Vue Framework'" />
      <LhCheckbox value="react" :label="locale === 'zh-CN' ? 'React框架' : 'React Framework'" />
    </LhCheckboxGroup>
  </LhConfigProvider>
</template>
```

## Disabled, Indeterminate & Size

Single checkboxes support `disabled`, `indeterminate`, `name` and `size`; groups support `disabled`, `name` and `size`.

<DemoBlock title="Disabled, Indeterminate & Size">
  <div class="demo-row">
    <LhCheckbox v-model="enCbDisabled" disabled label="Disabled" />
    <LhCheckbox v-model="enCbIndeterminate" :indeterminate="enCbHalf" label="Indeterminate" />
    <LhCheckbox v-model="enCbName" name="agreement" label="name=agreement" />
  </div>
  <div class="demo-row">
    <LhCheckbox v-model="enCbSmall" size="small" label="small" />
    <LhCheckbox v-model="enCbLarge" size="large" label="large" />
  </div>
  <div class="demo-row">
    <LhCheckboxGroup v-model="enCbGroupDisabled" disabled name="plan">
      <LhCheckbox value="a" label="Option A" />
      <LhCheckbox value="b" label="Option B" />
    </LhCheckboxGroup>
    <LhCheckboxGroup v-model="enCbGroupSize" size="large">
      <LhCheckbox value="a" label="Option A" />
      <LhCheckbox value="b" label="Option B" />
    </LhCheckboxGroup>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const enCbDisabled = ref(true)
const enCbIndeterminate = ref(false)
const enCbHalf = ref(true)
const enCbName = ref(false)
const enCbSmall = ref(false)
const enCbLarge = ref(false)
const enCbGroupDisabled = ref<string[]>([])
const enCbGroupSize = ref<string[]>([])
</script>

<template>
  <!-- Disabled -->
  <LhCheckbox v-model="enCbDisabled" disabled label="Disabled" />
  <!-- Indeterminate -->
  <LhCheckbox v-model="enCbIndeterminate" :indeterminate="enCbHalf" label="Indeterminate" />
  <!-- Native name -->
  <LhCheckbox v-model="enCbName" name="agreement" label="name=agreement" />
  <!-- Small size -->
  <LhCheckbox v-model="enCbSmall" size="small" label="small" />
  <!-- Large size -->
  <LhCheckbox v-model="enCbLarge" size="large" label="large" />
  <!-- Whole group disabled -->
  <LhCheckboxGroup v-model="enCbGroupDisabled" disabled name="plan">
    <LhCheckbox value="a" label="Option A" />
    <LhCheckbox value="b" label="Option B" />
  </LhCheckboxGroup>
  <!-- Group-wide large size -->
  <LhCheckboxGroup v-model="enCbGroupSize" size="large">
    <LhCheckbox value="a" label="Option A" />
    <LhCheckbox value="b" label="Option B" />
  </LhCheckboxGroup>
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      enCbDisabled: true,
      enCbIndeterminate: false,
      enCbHalf: true,
      enCbName: false,
      enCbSmall: false,
      enCbLarge: false,
      enCbGroupDisabled: [],
      enCbGroupSize: [],
    }
  },
}
</script>

<template>
  <!-- Disabled -->
  <LhCheckbox v-model="enCbDisabled" disabled label="Disabled" />
  <!-- Indeterminate -->
  <LhCheckbox v-model="enCbIndeterminate" :indeterminate="enCbHalf" label="Indeterminate" />
  <!-- Native name -->
  <LhCheckbox v-model="enCbName" name="agreement" label="name=agreement" />
  <!-- Small size -->
  <LhCheckbox v-model="enCbSmall" size="small" label="small" />
  <!-- Large size -->
  <LhCheckbox v-model="enCbLarge" size="large" label="large" />
  <!-- Whole group disabled -->
  <LhCheckboxGroup v-model="enCbGroupDisabled" disabled name="plan">
    <LhCheckbox value="a" label="Option A" />
    <LhCheckbox value="b" label="Option B" />
  </LhCheckboxGroup>
  <!-- Group-wide large size -->
  <LhCheckboxGroup v-model="enCbGroupSize" size="large">
    <LhCheckbox value="a" label="Option A" />
    <LhCheckbox value="b" label="Option B" />
  </LhCheckboxGroup>
</template>
```

## Checkbox API

### LhCheckbox Props

| Prop          | Description               | Type                             | Default     |
| ------------- | ------------------------- | -------------------------------- | ----------- |
| modelValue | Checked state (standalone mode) | `boolean` | `false` |
| value | Value submitted in group mode | `unknown` | — |
| label | Label text | `string` | — |
| disabled | Disabled | `boolean` | `false` |
| indeterminate | Indeterminate state | `boolean` | `false` |
| name | — | `string` | — |
| size | Size | `"small" \| "medium" \| "large"` | `'medium'` |
| sx | sx quick-layout props | `SxProps` | — |

### LhCheckboxGroup Props

| Prop        | Description             | Type                             | Default     |
| ----------- | ----------------------- | -------------------------------- | ----------- |
| model-value | Selected values list    | `unknown[]`                      | `[]`        |
| disabled    | Disable entire group    | `boolean`                        | `false`     |
| name        | Native form name        | `string`                         | —           |
| size        | Checkbox size in group  | `'small' \| 'medium' \| 'large'` | `'medium'`  |

### Events

| Event              | Description         | Parameter             |
| ------------------ | ------------------- | --------------------- |
| update:modelValue  | Value changed       | `value: boolean` or `value[]` |
| change             | Selection changed   | `value`          |

### Slots

| Slot    | Description     |
| ------- | --------------- |
| default | Custom content  |

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## Type Definitions

The TypeScript type structures exported by this component (auto-extracted from `packages/components/checkbox/src/types.ts` and `@lh-ui/share/core/*` sources; click each entry to expand; see the Props table above for attribute descriptions):

<details id="type-LhCheckboxSize">
<summary><code>LhCheckboxSize</code></summary>

```ts
export type LhCheckboxSize = 'small' | 'medium' | 'large'
```

</details>

<details id="type-LhCheckboxProps">
<summary><code>LhCheckboxProps</code></summary>

```ts
export interface LhCheckboxProps {
  modelValue?: boolean
  value?: unknown
  label?: string
  disabled?: boolean
  indeterminate?: boolean
  name?: string
  size?: LhCheckboxSize
  sx?: SxProps
}
```

</details>

<details id="type-LhCheckboxGroupProps">
<summary><code>LhCheckboxGroupProps</code></summary>

```ts
export interface LhCheckboxGroupProps {
  modelValue?: unknown[]
  disabled?: boolean
  name?: string
  size?: LhCheckboxSize
}
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
import { ref } from 'vue'
import zhCN from '@lh-ui/share/locales/lang/zh-CN'
import enUS from '@lh-ui/share/locales/lang/en-US'

const accepted = ref(false)
const selectedFrameworks = ref(['vue'])
const selectedTheme = ref(['option1'])
const locale = ref('zh-CN')
const selected = ref(['vue'])
const enCbDisabled = ref(true)
const enCbIndeterminate = ref(false)
const enCbHalf = ref(true)
const enCbName = ref(false)
const enCbSmall = ref(false)
const enCbLarge = ref(false)
const enCbGroupDisabled = ref([])
const enCbGroupSize = ref([])
const cerblueTheme = {
  'primary-color': '#2B4C7C',
  'primary-color-hover': '#3D649E',
  'primary-color-bg': '#E8EDF3',
}
</script>

<style scoped>
.demo-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}
</style>