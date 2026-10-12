# Select 选择器

`LhSelect` 用于从选项列表中选择一个值，支持禁用选项、清空和键盘操作。

## 基础用法

<DemoBlock title="基础用法">
  <LhSelect v-model="selectedCity" :options="cityOptions" placeholder="请选择城市" style="width: 220px" />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhSelect } from '@lh-ui/vue3'

const selectedCity = ref('beijing')
const cityOptions = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '深圳', value: 'shenzhen' },
]
</script>

<template>
  <!-- 基础用法 -->
  <LhSelect v-model="selectedCity" :options="cityOptions" placeholder="请选择城市" />
</template>
```

```vue options
<script>
import { LhSelect } from '@lh-ui/vue3'

export default {
  components: { LhSelect },
  data() {
    return {
      selectedCity: 'beijing',
      cityOptions: [
        { label: '北京', value: 'beijing' },
        { label: '上海', value: 'shanghai' },
        { label: '深圳', value: 'shenzhen' },
      ],
    }
  },
}
</script>

<template>
  <!-- 基础用法 -->
  <LhSelect v-model="selectedCity" :options="cityOptions" placeholder="请选择城市" />
</template>
```

## 可清空与禁用

<DemoBlock title="可清空与禁用">
  <div class="demo-row">
    <LhSelect v-model="selectedRegion" :options="regionOptions" clearable placeholder="请选择地区" style="width: 220px" />
    <LhSelect v-model="selectedDisabled" :options="disabledOptions" disabled placeholder="已禁用" style="width: 220px" />
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhSelect } from '@lh-ui/vue3'

const selectedRegion = ref('')
const selectedDisabled = ref('north')
const regionOptions = [
  { label: '华北', value: 'north' },
  { label: '华东', value: 'east' },
  { label: '华南', value: 'south' },
]
const disabledOptions = [
  { label: '华北', value: 'north', disabled: true },
  { label: '华东', value: 'east' },
  { label: '华南', value: 'south' },
]
</script>

<template>
  <!-- 可清空 -->
  <LhSelect v-model="selectedRegion" :options="regionOptions" clearable placeholder="请选择地区" />
  <!-- 已禁用 -->
  <LhSelect v-model="selectedDisabled" :options="disabledOptions" disabled placeholder="已禁用" />
</template>
```

```vue options
<script>
import { LhSelect } from '@lh-ui/vue3'

export default {
  components: { LhSelect },
  data() {
    return {
      selectedRegion: '',
      selectedDisabled: 'north',
      regionOptions: [
        { label: '华北', value: 'north' },
        { label: '华东', value: 'east' },
        { label: '华南', value: 'south' },
      ],
      disabledOptions: [
        { label: '华北', value: 'north', disabled: true },
        { label: '华东', value: 'east' },
        { label: '华南', value: 'south' },
      ],
    }
  },
}
</script>

<template>
  <!-- 可清空 -->
  <LhSelect v-model="selectedRegion" :options="regionOptions" clearable placeholder="请选择地区" />
  <!-- 已禁用 -->
  <LhSelect v-model="selectedDisabled" :options="disabledOptions" disabled placeholder="已禁用" />
</template>
```

## 自定义主题

为选择器应用自定义主题色。

<DemoBlock title="青花瓷主题">
  <LhConfigProvider :theme-vars="cerblueTheme">
    <LhSelect v-model="selectedTheme" :options="cityOptions" placeholder="请选择" style="width: 220px" />
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhConfigProvider, LhSelect } from '@lh-ui/vue3'

const selectedTheme = ref('beijing')
const cityOptions = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
]
const cerblueTheme = {
  'primary-color': '#2B4C7C',
  'primary-color-hover': '#3D649E',
  'primary-color-bg': '#E8EDF3',
}
</script>

<template>
  <LhConfigProvider :theme-vars="cerblueTheme">
    <!-- 青花瓷主题 -->
    <LhSelect v-model="selectedTheme" :options="cityOptions" placeholder="请选择" />
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { LhConfigProvider, LhSelect } from '@lh-ui/vue3'

export default {
  components: { LhConfigProvider, LhSelect },
  data() {
    return {
      selectedTheme: 'beijing',
      cityOptions: [
        { label: '北京', value: 'beijing' },
        { label: '上海', value: 'shanghai' },
      ],
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
    <!-- 青花瓷主题 -->
    <LhSelect v-model="selectedTheme" :options="cityOptions" placeholder="请选择" />
  </LhConfigProvider>
</template>
```

更多主题请参考 [主题定制](/guide/theme-customization)。

## 国际化

选择器可以通过 `LhConfigProvider` 和 `t` 函数实现国际化。

<DemoBlock title="国际化">
  <LhConfigProvider :locale="messages">
    <LhSelect
      v-model="selected"
      :options="cityOptions"
      :placeholder="locale === 'zh-CN' ? '请选择城市' : 'Please select city'"
      style="width: 220px"
    />
    <LhButton @click="locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'">
      {{ locale === 'zh-CN' ? '切换至英文' : 'Switch to Chinese' }}
    </LhButton>
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref, computed } from 'vue'
import { LhConfigProvider, LhSelect, LhButton, zhCN, enUS } from '@lh-ui/vue3'

const locale = ref('zh-CN')
const selected = ref('beijing')
const cityOptions = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '深圳', value: 'shenzhen' },
]
const messages = computed(() => (locale.value === 'zh-CN' ? zhCN : enUS))
</script>

<template>
  <LhConfigProvider :locale="messages">
    <!-- 城市选择 -->
    <LhSelect
      v-model="selected"
      :options="cityOptions"
      :placeholder="locale === 'zh-CN' ? '请选择城市' : 'Please select city'"
    />
    <!-- 切换语言 -->
    <LhButton @click="locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'">
      {{ locale === 'zh-CN' ? '切换至英文' : 'Switch to Chinese' }}
    </LhButton>
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { LhConfigProvider, LhSelect, LhButton, zhCN, enUS } from '@lh-ui/vue3'

export default {
  components: { LhConfigProvider, LhSelect, LhButton },
  data() {
    return {
      locale: 'zh-CN',
      selected: 'beijing',
      cityOptions: [
        { label: '北京', value: 'beijing' },
        { label: '上海', value: 'shanghai' },
        { label: '深圳', value: 'shenzhen' },
      ],
    }
  },
  computed: {
    messages() {
      return this.locale === 'zh-CN' ? zhCN : enUS
    },
  },
}
</script>

<template>
  <LhConfigProvider :locale="messages">
    <!-- 城市选择 -->
    <LhSelect
      v-model="selected"
      :options="cityOptions"
      :placeholder="locale === 'zh-CN' ? '请选择城市' : 'Please select city'"
    />
    <!-- 切换语言 -->
    <LhButton @click="locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'">
      {{ locale === 'zh-CN' ? '切换至英文' : 'Switch to Chinese' }}
    </LhButton>
  </LhConfigProvider>
</template>
```

## 尺寸

<DemoBlock title="尺寸">
  <div class="demo-row">
    <LhSelect v-model="demoSizeSmall" :options="sizeOptions" size="small" placeholder="small" style="width: 180px" />
    <LhSelect v-model="demoSizeMedium" :options="sizeOptions" size="medium" placeholder="medium" style="width: 180px" />
    <LhSelect v-model="demoSizeLarge" :options="sizeOptions" size="large" placeholder="large" style="width: 180px" />
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhSelect } from '@lh-ui/vue3'

const demoSizeSmall = ref('a')
const demoSizeMedium = ref('a')
const demoSizeLarge = ref('a')
const sizeOptions = [
  { label: '选项一', value: 'a' },
  { label: '选项二', value: 'b' },
  { label: '选项三', value: 'c' },
]
</script>

<template>
  <!-- small -->
  <LhSelect v-model="demoSizeSmall" :options="sizeOptions" size="small" placeholder="small" />
  <!-- medium -->
  <LhSelect v-model="demoSizeMedium" :options="sizeOptions" size="medium" placeholder="medium" />
  <!-- large -->
  <LhSelect v-model="demoSizeLarge" :options="sizeOptions" size="large" placeholder="large" />
</template>
```

```vue options
<script>
import { LhSelect } from '@lh-ui/vue3'

export default {
  components: { LhSelect },
  data() {
    return {
      demoSizeSmall: 'a',
      demoSizeMedium: 'a',
      demoSizeLarge: 'a',
      sizeOptions: [
        { label: '选项一', value: 'a' },
        { label: '选项二', value: 'b' },
        { label: '选项三', value: 'c' },
      ],
    }
  },
}
</script>

<template>
  <!-- small -->
  <LhSelect v-model="demoSizeSmall" :options="sizeOptions" size="small" placeholder="small" />
  <!-- medium -->
  <LhSelect v-model="demoSizeMedium" :options="sizeOptions" size="medium" placeholder="medium" />
  <!-- large -->
  <LhSelect v-model="demoSizeLarge" :options="sizeOptions" size="large" placeholder="large" />
</template>
```

## 无障碍与挂载容器

`aria-label` 用于无障碍描述，`name` 为原生表单名称，`popper-container` 指定下拉面板的挂载容器。

<DemoBlock title="无障碍与挂载容器">
  <div class="demo-row">
    <LhSelect v-model="demoA11y" :options="sizeOptions" aria-label="请选择城市" name="city" placeholder="aria-label 与 name" style="width: 240px" />
    <LhSelect v-model="demoContainer" :options="sizeOptions" popper-container="body" placeholder="挂载到 body" style="width: 240px" />
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhSelect } from '@lh-ui/vue3'

const demoA11y = ref('')
const demoContainer = ref('')
const sizeOptions = [
  { label: '选项一', value: 'a' },
  { label: '选项二', value: 'b' },
  { label: '选项三', value: 'c' },
]
</script>

<template>
  <!-- aria-label 与 name -->
  <LhSelect v-model="demoA11y" :options="sizeOptions" aria-label="请选择城市" name="city" placeholder="aria-label 与 name" />
  <!-- 挂载到 body -->
  <LhSelect v-model="demoContainer" :options="sizeOptions" popper-container="body" placeholder="挂载到 body" />
</template>
```

```vue options
<script>
import { LhSelect } from '@lh-ui/vue3'

export default {
  components: { LhSelect },
  data() {
    return {
      demoA11y: '',
      demoContainer: '',
      sizeOptions: [
        { label: '选项一', value: 'a' },
        { label: '选项二', value: 'b' },
        { label: '选项三', value: 'c' },
      ],
    }
  },
}
</script>

<template>
  <!-- aria-label 与 name -->
  <LhSelect v-model="demoA11y" :options="sizeOptions" aria-label="请选择城市" name="city" placeholder="aria-label 与 name" />
  <!-- 挂载到 body -->
  <LhSelect v-model="demoContainer" :options="sizeOptions" popper-container="body" placeholder="挂载到 body" />
</template>
```

## Select API

### Props

| 属性        | 说明                   | 类型                             | 默认值            |
| ----------- | ---------------------- | -------------------------------- | ----------------- |
| modelValue | 当前值 | `unknown` | — |
| options | 选项列表 | `[LhSelectOption](#type-LhSelectOption)`[] | `() => []` |
| placeholder | 占位文本（未传时取语言包 `select.placeholder`，中文「请选择」） | `string` | `''` |
| disabled | 是否禁用 | `boolean` | `false` |
| clearable | 是否显示清空按钮 | `boolean` | `false` |
| size | 选择器尺寸 | `"small" \| "medium" \| "large"` | `'medium'` |
| name | — | `string` | — |
| ariaLabel | 无可见标签时的辅助文本 | `string` | — |
| popperContainer | — | `string \| HTMLElement` | `'body'` |
| sx | sx 快速布局属性 | `LhSxProps` | — |

### Events

| 事件              | 说明         | 参数             |
| ----------------- | ------------ | ---------------- |
| update:modelValue | 值发生变化   | `value: unknown` |
| change            | 选择发生变化 | `value, option`  |
| clear             | 点击清空     | —                |

### Option

```ts
type LhSelectOption = {
  label: string
  value: unknown
  disabled?: boolean
}
```

支持 `ArrowUp`、`ArrowDown` 移动高亮项，`Enter` 确认选择，`Escape` 关闭下拉菜单。


<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/select/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

<details id="type-LhSelectSize">
<summary><code>LhSelectSize</code></summary>

```ts
export type LhSelectSize = 'small' | 'medium' | 'large'
```

</details>

<details id="type-LhSelectProps">
<summary><code>LhSelectProps</code></summary>

```ts
export interface LhSelectProps {
  modelValue?: unknown
  options?: LhSelectOption[]
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  size?: LhSelectSize
  name?: string
  ariaLabel?: string
  popperContainer?: 'body' | HTMLElement | string
  /** sx 快速布局属性 */
  sx?: LhSxProps
}
```

</details>

<details id="type-LhSelectOption">
<summary><code>LhSelectOption</code> <sub>（来自 @lh-ui/share/core/select）</sub></summary>

```ts
export interface LhSelectOption {
  label: string
  value: unknown
  disabled?: boolean
}
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { LhConfigProvider } from '~/components'
import '@lh-ui/share/styles/config-provider'
import zhCN from '@lh-ui/share/locales/lang/zh-CN'
import enUS from '@lh-ui/share/locales/lang/en-US'

const selectedCity = ref('beijing')
const selectedRegion = ref('')
const selectedDisabled = ref('north')
const selectedTheme = ref('beijing')

const cityOptions = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '深圳', value: 'shenzhen' },
]

const regionOptions = [
  { label: '华北', value: 'north' },
  { label: '华东', value: 'east' },
  { label: '华南', value: 'south' },
]

const disabledOptions = [
  { label: '华北', value: 'north', disabled: true },
  { label: '华东', value: 'east' },
  { label: '华南', value: 'south' },
]

const sizeOptions = [
  { label: '选项一', value: 'a' },
  { label: '选项二', value: 'b' },
  { label: '选项三', value: 'c' },
]

const demoSizeSmall = ref('a')
const demoSizeMedium = ref('a')
const demoSizeLarge = ref('a')
const demoA11y = ref('')
const demoContainer = ref('')

const locale = ref('zh-CN')
const selected = ref('beijing')
const messages = computed(() => (locale.value === 'zh-CN' ? zhCN : enUS))

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

## Slots

| 插槽  | 说明                               | 默认内容                                       |
| ----- | ---------------------------------- | ---------------------------------------------- |
| empty | 选项为空时下拉面板的自定义空状态内容 | 语言包 `select.noData`（中文「暂无数据」）     |
