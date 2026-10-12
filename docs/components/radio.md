# Radio 单选框

`LhRadio` 支持独立单选值，`LhRadioGroup` 支持多个选项的单选分组。

## 独立使用

<DemoBlock title="独立使用">
  <LhRadio v-model="gender" value="male" label="男" />
  <LhRadio v-model="gender" value="female" label="女" />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhRadio } from '@lh-ui/vue3'

const gender = ref('male')
</script>

<template>
  <LhRadio v-model="gender" value="male" label="男" />
  <LhRadio v-model="gender" value="female" label="女" />
</template>
```

```vue options
<script>
import { LhRadio } from '@lh-ui/vue3'

export default {
  components: { LhRadio },
  data() {
    return {
      gender: 'male'
    }
  }
}
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

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhRadio, LhRadioGroup } from '@lh-ui/vue3'

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

```vue options
<script>
import { LhRadio, LhRadioGroup } from '@lh-ui/vue3'

export default {
  components: { LhRadio, LhRadioGroup },
  data() {
    return {
      selectedFramework: 'vue'
    }
  }
}
</script>

<template>
  <LhRadioGroup v-model="selectedFramework" name="framework">
    <LhRadio value="vue" label="Vue" />
    <LhRadio value="react" label="React" />
    <LhRadio value="svelte" label="Svelte" />
  </LhRadioGroup>
</template>
```

## 自定义主题

为单选框应用自定义主题色。

<DemoBlock title="青花瓷主题">
  <LhConfigProvider :theme-vars="cerblueTheme">
    <div class="demo-row">
      <LhRadioGroup v-model="selectedTheme">
        <LhRadio value="option1" label="选项一" />
        <LhRadio value="option2" label="选项二" />
        <LhRadio value="option3" label="选项三" />
      </LhRadioGroup>
    </div>
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhConfigProvider, LhRadio, LhRadioGroup } from '@lh-ui/vue3'

const selectedTheme = ref('option1')
const cerblueTheme = {
  'primary-color': '#2B4C7C',
  'primary-color-hover': '#3D649E',
  'primary-color-bg': '#E8EDF3',
}
</script>

<template>
  <!-- 青花瓷主题色 -->
  <LhConfigProvider :theme-vars="cerblueTheme">
    <LhRadioGroup v-model="selectedTheme">
      <LhRadio value="option1" label="选项一" />
      <LhRadio value="option2" label="选项二" />
      <LhRadio value="option3" label="选项三" />
    </LhRadioGroup>
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { LhConfigProvider, LhRadio, LhRadioGroup } from '@lh-ui/vue3'

export default {
  components: { LhConfigProvider, LhRadio, LhRadioGroup },
  data() {
    return {
      selectedTheme: 'option1',
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
  <!-- 青花瓷主题色 -->
  <LhConfigProvider :theme-vars="cerblueTheme">
    <LhRadioGroup v-model="selectedTheme">
      <LhRadio value="option1" label="选项一" />
      <LhRadio value="option2" label="选项二" />
      <LhRadio value="option3" label="选项三" />
    </LhRadioGroup>
  </LhConfigProvider>
</template>
```

更多主题请参考 [主题定制](/guide/theme-customization)。

## 国际化

单选框文字可以通过 `LhConfigProvider` 配合语言包实现国际化切换。

<DemoBlock title="国际化">
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhRadioGroup v-model="selected">
      <LhRadio value="vue" :label="locale === 'zh-CN' ? 'Vue框架' : 'Vue Framework'" />
      <LhRadio value="react" :label="locale === 'zh-CN' ? 'React框架' : 'React Framework'" />
    </LhRadioGroup>
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhConfigProvider, LhRadio, LhRadioGroup, zhCN, enUS } from '@lh-ui/vue3'

const locale = ref('zh-CN')
const selected = ref('vue')
</script>

<template>
  <!-- 按当前语言注入语言包 -->
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhRadioGroup v-model="selected">
      <!-- 文案随语言切换 -->
      <LhRadio value="vue" :label="locale === 'zh-CN' ? 'Vue框架' : 'Vue Framework'" />
      <LhRadio value="react" :label="locale === 'zh-CN' ? 'React框架' : 'React Framework'" />
    </LhRadioGroup>
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { LhConfigProvider, LhRadio, LhRadioGroup, zhCN, enUS } from '@lh-ui/vue3'

export default {
  components: { LhConfigProvider, LhRadio, LhRadioGroup },
  data() {
    return {
      locale: 'zh-CN',
      selected: 'vue',
      zhCN: zhCN,
      enUS: enUS,
    }
  },
}
</script>

<template>
  <!-- 按当前语言注入语言包 -->
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhRadioGroup v-model="selected">
      <!-- 文案随语言切换 -->
      <LhRadio value="vue" :label="locale === 'zh-CN' ? 'Vue框架' : 'Vue Framework'" />
      <LhRadio value="react" :label="locale === 'zh-CN' ? 'React框架' : 'React Framework'" />
    </LhRadioGroup>
  </LhConfigProvider>
</template>
```

## 禁用与尺寸

单选框通过 `disabled` 禁用、`size` 调整尺寸；分组通过 `disabled` 禁用整组、`size` 统一调整组内尺寸。

<DemoBlock title="禁用与尺寸">
  <div class="demo-row">
    <LhRadio v-model="demoRadioDisabled" value="1" disabled label="禁用选项" />
    <LhRadio v-model="demoRadioDisabled2" value="1" disabled label="禁用且选中" />
  </div>
  <div class="demo-row">
    <LhRadio v-model="demoRadioSmall" value="1" size="small" label="small" />
    <LhRadio v-model="demoRadioLarge" value="1" size="large" label="large" />
  </div>
  <div class="demo-row">
    <LhRadioGroup v-model="demoRadioGroupDisabled" disabled>
      <LhRadio value="a" label="选项 A" />
      <LhRadio value="b" label="选项 B" />
    </LhRadioGroup>
    <LhRadioGroup v-model="demoRadioGroupSize" size="large">
      <LhRadio value="a" label="选项 A" />
      <LhRadio value="b" label="选项 B" />
    </LhRadioGroup>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhRadio, LhRadioGroup } from '@lh-ui/vue3'

const demoRadioDisabled = ref('')
const demoRadioDisabled2 = ref('1')
const demoRadioSmall = ref('1')
const demoRadioLarge = ref('1')
const demoRadioGroupDisabled = ref('a')
const demoRadioGroupSize = ref('a')
</script>

<template>
  <!-- 禁用 -->
  <LhRadio v-model="demoRadioDisabled" value="1" disabled label="禁用选项" />
  <!-- 禁用且选中 -->
  <LhRadio v-model="demoRadioDisabled2" value="1" disabled label="禁用且选中" />
  <!-- small 尺寸 -->
  <LhRadio v-model="demoRadioSmall" value="1" size="small" label="small" />
  <!-- large 尺寸 -->
  <LhRadio v-model="demoRadioLarge" value="1" size="large" label="large" />
  <!-- 整组禁用 -->
  <LhRadioGroup v-model="demoRadioGroupDisabled" disabled>
    <LhRadio value="a" label="选项 A" />
    <LhRadio value="b" label="选项 B" />
  </LhRadioGroup>
  <!-- 组内统一 large 尺寸 -->
  <LhRadioGroup v-model="demoRadioGroupSize" size="large">
    <LhRadio value="a" label="选项 A" />
    <LhRadio value="b" label="选项 B" />
  </LhRadioGroup>
</template>
```

```vue options
<script>
import { LhRadio, LhRadioGroup } from '@lh-ui/vue3'

export default {
  components: { LhRadio, LhRadioGroup },
  data() {
    return {
      demoRadioDisabled: '',
      demoRadioDisabled2: '1',
      demoRadioSmall: '1',
      demoRadioLarge: '1',
      demoRadioGroupDisabled: 'a',
      demoRadioGroupSize: 'a',
    }
  },
}
</script>

<template>
  <!-- 禁用 -->
  <LhRadio v-model="demoRadioDisabled" value="1" disabled label="禁用选项" />
  <!-- 禁用且选中 -->
  <LhRadio v-model="demoRadioDisabled2" value="1" disabled label="禁用且选中" />
  <!-- small 尺寸 -->
  <LhRadio v-model="demoRadioSmall" value="1" size="small" label="small" />
  <!-- large 尺寸 -->
  <LhRadio v-model="demoRadioLarge" value="1" size="large" label="large" />
  <!-- 整组禁用 -->
  <LhRadioGroup v-model="demoRadioGroupDisabled" disabled>
    <LhRadio value="a" label="选项 A" />
    <LhRadio value="b" label="选项 B" />
  </LhRadioGroup>
  <!-- 组内统一 large 尺寸 -->
  <LhRadioGroup v-model="demoRadioGroupSize" size="large">
    <LhRadio value="a" label="选项 A" />
    <LhRadio value="b" label="选项 B" />
  </LhRadioGroup>
</template>
```

## Radio API

### LhRadio Props

| 属性        | 说明             | 类型                             | 默认值      |
| ----------- | ---------------- | -------------------------------- | ----------- |
| modelValue | 独立模式的选中值 | `unknown` | — |
| value | 提交的值 | `unknown` | — |
| label | 标签文本 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| name | 原生表单名称 | `string` | — |
| size | 尺寸 | `"small" \| "medium" \| "large" \| "mini" \| "x-large"` | `'medium'` |
| sx | sx 快速布局属性 | `LhSxProps` | — |

### LhRadioGroup Props

| 属性        | 说明             | 类型                             | 默认值      |
| ----------- | ---------------- | -------------------------------- | ----------- |
| model-value | 独立模式的选中值 | `unknown` | — |
| disabled    | 是否禁用整个分组 | `boolean`                        | `false`     |
| name        | 原生表单名称     | `string`                         | —           |
| size        | 分组内单选框尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'`  |

### Events

| 事件              | 说明         | 参数             |
| ----------------- | ------------ | ---------------- |
| update:modelValue | 值发生变化   | `value: unknown` |
| change            | 选择发生变化 | `value: unknown` |

### Slots

| 插槽名  | 说明     |
| ------- | -------- |
| default | 自定义内容 |


<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/radio/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

<details id="type-LhRadioSize">
<summary><code>LhRadioSize</code></summary>

```ts
export type LhRadioSize = typeof LH_SIZE_CONST[keyof typeof LH_SIZE_CONST]
```

</details>

<details id="type-LhRadioProps">
<summary><code>LhRadioProps</code></summary>

```ts
export interface LhRadioProps {
  modelValue?: unknown
  value?: unknown
  label?: string
  disabled?: boolean
  name?: string
  size?: LhRadioSize
  /** sx 快速布局属性 */
  sx?: LhSxProps
}
```

</details>

<details id="type-LhRadioGroupProps">
<summary><code>LhRadioGroupProps</code></summary>

```ts
export interface LhRadioGroupProps {
  modelValue?: unknown
  disabled?: boolean
  name?: string
  size?: LhRadioSize
}
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
import { ref } from 'vue'
import { LhConfigProvider } from '~/components'
import zhCN from '@lh-ui/share/locales/lang/zh-CN'
import enUS from '@lh-ui/share/locales/lang/en-US'
import '@lh-ui/share/styles/config-provider'

const gender = ref('male')
const selectedFramework = ref('vue')
const selectedTheme = ref('option1')
const demoRadioDisabled = ref('')
const demoRadioDisabled2 = ref('1')
const demoRadioSmall = ref('1')
const demoRadioLarge = ref('1')
const demoRadioGroupDisabled = ref('a')
const demoRadioGroupSize = ref('a')
const locale = ref('zh-CN')
const selected = ref('vue')
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