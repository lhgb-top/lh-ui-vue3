# Checkbox 复选框

`LhCheckbox` 支持独立布尔值，`LhCheckboxGroup` 支持多个选项的数组值。

## 独立使用

<DemoBlock title="独立使用">
  <LhCheckbox v-model="accepted" label="我已阅读并同意" />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhCheckbox } from '@lh-ui/vue3'

const accepted = ref(false)
</script>

<template>
  <LhCheckbox v-model="accepted" label="我已阅读并同意" />
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
  }
}
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

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhCheckbox, LhCheckboxGroup } from '@lh-ui/vue3'

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

```vue options
<script>
import { LhCheckbox, LhCheckboxGroup } from '@lh-ui/vue3'

export default {
  components: { LhCheckbox, LhCheckboxGroup },
  data() {
    return {
      selected: ['vue']
    }
  }
}
</script>

<template>
  <LhCheckboxGroup v-model="selected" name="framework">
    <LhCheckbox value="vue" label="Vue" />
    <LhCheckbox value="react" label="React" />
    <LhCheckbox value="svelte" label="Svelte" />
  </LhCheckboxGroup>
</template>
```

## 自定义主题

为复选框应用自定义主题色。

<DemoBlock title="青花瓷主题">
  <LhConfigProvider :theme-vars="cerblueTheme">
    <div class="demo-row">
      <LhCheckboxGroup v-model="selectedTheme">
        <LhCheckbox value="option1" label="选项一" />
        <LhCheckbox value="option2" label="选项二" />
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
      <LhCheckbox value="option1" label="选项一" />
      <LhCheckbox value="option2" label="选项二" />
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
      <LhCheckbox value="option1" label="选项一" />
      <LhCheckbox value="option2" label="选项二" />
    </LhCheckboxGroup>
  </LhConfigProvider>
</template>
```

更多主题请参考 [主题定制](/guide/theme-customization)。

## 国际化

复选框文字可以通过 `LhConfigProvider` 配合语言包实现国际化切换。

<DemoBlock title="国际化">
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
  <!-- 语言包配置 -->
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
  <!-- 语言包配置 -->
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhCheckboxGroup v-model="selected">
      <LhCheckbox value="vue" :label="locale === 'zh-CN' ? 'Vue框架' : 'Vue Framework'" />
      <LhCheckbox value="react" :label="locale === 'zh-CN' ? 'React框架' : 'React Framework'" />
    </LhCheckboxGroup>
  </LhConfigProvider>
</template>
```

## 禁用、半选与尺寸

独立复选框通过 `disabled` 禁用、`indeterminate` 展示半选状态、`size` 调整尺寸；分组通过 `disabled` 禁用整组、`size` 统一调整组内尺寸。

<DemoBlock title="禁用、半选与尺寸">
  <div class="demo-row">
    <LhCheckbox v-model="demoCbDisabled" disabled label="禁用状态" />
    <LhCheckbox v-model="demoCbIndeterminate" :indeterminate="demoIndeterminate" label="半选状态" />
    <LhCheckbox v-model="demoCbSmall" size="small" label="small" />
    <LhCheckbox v-model="demoCbLarge" size="large" label="large" />
  </div>
  <div class="demo-row">
    <LhCheckboxGroup v-model="demoCbGroupDisabled" disabled>
      <LhCheckbox value="a" label="选项 A" />
      <LhCheckbox value="b" label="选项 B" />
    </LhCheckboxGroup>
    <LhCheckboxGroup v-model="demoCbGroupSize" size="large">
      <LhCheckbox value="a" label="选项 A" />
      <LhCheckbox value="b" label="选项 B" />
    </LhCheckboxGroup>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const demoCbDisabled = ref(true)
const demoCbIndeterminate = ref(false)
const demoIndeterminate = ref(true)
const demoCbSmall = ref(false)
const demoCbLarge = ref(false)
const demoCbGroupDisabled = ref<string[]>([])
const demoCbGroupSize = ref<string[]>([])
</script>

<template>
  <!-- 禁用 -->
  <LhCheckbox v-model="demoCbDisabled" disabled label="禁用状态" />
  <!-- 半选 -->
  <LhCheckbox v-model="demoCbIndeterminate" :indeterminate="demoIndeterminate" label="半选状态" />
  <!-- 小尺寸 -->
  <LhCheckbox v-model="demoCbSmall" size="small" label="small" />
  <!-- 大尺寸 -->
  <LhCheckbox v-model="demoCbLarge" size="large" label="large" />
  <!-- 禁用整组 -->
  <LhCheckboxGroup v-model="demoCbGroupDisabled" disabled>
    <LhCheckbox value="a" label="选项 A" />
    <LhCheckbox value="b" label="选项 B" />
  </LhCheckboxGroup>
  <!-- 组内统一大尺寸 -->
  <LhCheckboxGroup v-model="demoCbGroupSize" size="large">
    <LhCheckbox value="a" label="选项 A" />
    <LhCheckbox value="b" label="选项 B" />
  </LhCheckboxGroup>
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      demoCbDisabled: true,
      demoCbIndeterminate: false,
      demoIndeterminate: true,
      demoCbSmall: false,
      demoCbLarge: false,
      demoCbGroupDisabled: [],
      demoCbGroupSize: [],
    }
  },
}
</script>

<template>
  <!-- 禁用 -->
  <LhCheckbox v-model="demoCbDisabled" disabled label="禁用状态" />
  <!-- 半选 -->
  <LhCheckbox v-model="demoCbIndeterminate" :indeterminate="demoIndeterminate" label="半选状态" />
  <!-- 小尺寸 -->
  <LhCheckbox v-model="demoCbSmall" size="small" label="small" />
  <!-- 大尺寸 -->
  <LhCheckbox v-model="demoCbLarge" size="large" label="large" />
  <!-- 禁用整组 -->
  <LhCheckboxGroup v-model="demoCbGroupDisabled" disabled>
    <LhCheckbox value="a" label="选项 A" />
    <LhCheckbox value="b" label="选项 B" />
  </LhCheckboxGroup>
  <!-- 组内统一大尺寸 -->
  <LhCheckboxGroup v-model="demoCbGroupSize" size="large">
    <LhCheckbox value="a" label="选项 A" />
    <LhCheckbox value="b" label="选项 B" />
  </LhCheckboxGroup>
</template>
```

## Checkbox API

### LhCheckbox Props

| 属性          | 说明               | 类型                             | 默认值     |
| ------------- | ------------------ | -------------------------------- | ---------- |
| modelValue | 独立模式的选中状态 | `boolean` | `false` |
| value | 分组模式提交的值 | `unknown` | — |
| label | 标签文本 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| indeterminate | 是否为半选状态 | `boolean` | `false` |
| name | — | `string` | — |
| size | 尺寸 | `"small" \| "medium" \| "large"` | `'medium'` |
| sx | sx 快速布局属性 | `LhSxProps` | — |

### LhCheckboxGroup Props

| 属性        | 说明             | 类型                             | 默认值     |
| ----------- | ---------------- | -------------------------------- | ---------- |
| model-value | 独立模式的选中状态 | `unknown[]` | `[]` |
| disabled    | 是否禁用整个分组 | `boolean`                        | `false`    |
| name        | 原生表单名称     | `string`                         | —          |
| size        | 分组内复选框尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |

### Events

| 事件              | 说明         | 参数             |
| ----------------- | ------------ | ---------------- |
| update:modelValue | 值发生变化   | `value: boolean` 或 `value[]` |
| change            | 选择发生变化 | `value`          |

### Slots

| 插槽名  | 说明     |
| ------- | -------- |
| default | 自定义内容 |


<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/checkbox/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

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
  /** sx 快速布局属性 */
  sx?: LhSxProps
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
import { LhConfigProvider } from '~/components'
import '@lh-ui/share/styles/config-provider'
import zhCN from '@lh-ui/share/locales/lang/zh-CN'
import enUS from '@lh-ui/share/locales/lang/en-US'

const accepted = ref(false)
const selectedFrameworks = ref(['vue'])
const selectedTheme = ref(['option1'])
const locale = ref('zh-CN')
const selected = ref(['vue'])
const demoCbDisabled = ref(true)
const demoCbIndeterminate = ref(false)
const demoIndeterminate = ref(true)
const demoCbSmall = ref(false)
const demoCbLarge = ref(false)
const demoCbGroupDisabled = ref([])
const demoCbGroupSize = ref([])
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
