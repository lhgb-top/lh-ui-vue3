# Input 输入框

输入框组件，支持文本输入、密码、字数统计等功能。

## 基础用法

<DemoBlock title="基础用法">
  <LhInput v-model="demoInput1" placeholder="请输入内容" style="width: 100%; max-width: 300px" />
  <div style="margin-top: 8px; color: var(--vp-c-text-2); font-size: 14px;">
    当前值: {{ demoInput1 }}
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <!-- 基础输入框 -->
  <LhInput v-model="value" placeholder="请输入内容" />
</template>
```

```vue options
<script>
export default {
  data() {
    return { value: '' }
  },
}
</script>

<template>
  <!-- 基础输入框 -->
  <LhInput v-model="value" placeholder="请输入内容" />
</template>
```

## 不同类型

<DemoBlock title="不同类型">
  <div class="demo-row">
    <LhInput v-model="demoInput2" placeholder="文本输入" style="width: 100%; max-width: 300px" />
  </div>
  <div class="demo-row">
    <LhInput v-model="demoInput3" type="password" placeholder="密码输入" show-password style="width: 100%; max-width: 300px" />
  </div>
  <div class="demo-row">
    <LhInput v-model="demoInput4" placeholder="可清空输入" clearable style="width: 100%; max-width: 300px" />
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const text = ref('')
const password = ref('')
const clearable = ref('已填充')
</script>

<template>
  <LhInput v-model="text" placeholder="文本输入" />
  <LhInput v-model="password" type="password" placeholder="密码输入" show-password />
  <LhInput v-model="clearable" placeholder="可清空输入" clearable />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      text: '',
      password: '',
      clearable: '已填充',
    }
  },
}
</script>

<template>
  <LhInput v-model="text" placeholder="文本输入" />
  <LhInput v-model="password" type="password" placeholder="密码输入" show-password />
  <LhInput v-model="clearable" placeholder="可清空输入" clearable />
</template>
```

## 禁用状态

<DemoBlock title="禁用状态">
  <LhInput v-model="demoInput5" disabled placeholder="禁用输入框" style="width: 100%; max-width: 300px" />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <LhInput v-model="value" disabled placeholder="禁用输入框" />
</template>
```

```vue options
<script>
export default {
  data() {
    return { value: '' }
  },
}
</script>

<template>
  <LhInput v-model="value" disabled placeholder="禁用输入框" />
</template>
```

## 字数统计

<DemoBlock title="字数统计">
  <LhInput v-model="demoInput6" :maxlength="10" show-word-limit placeholder="最多10个字" style="width: 100%; max-width: 300px" />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <LhInput v-model="value" :maxlength="10" show-word-limit placeholder="最多10个字" />
</template>
```

```vue options
<script>
export default {
  data() {
    return { value: '' }
  },
}
</script>

<template>
  <LhInput v-model="value" :maxlength="10" show-word-limit placeholder="最多10个字" />
</template>
```

## 插槽

<DemoBlock title="前后缀插槽">
  <div class="demo-row">
    <LhInput v-model="demoInput7" style="flex: 1 1 180px; max-width: 260px">
      <template #prefix>🔍</template>
    </LhInput>
    <LhInput v-model="demoInput8" style="flex: 1 1 180px; max-width: 260px">
      <template #suffix>unit</template>
    </LhInput>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>

<template>
  <LhInput v-model="value">
    <template #prefix>🔍</template>
  </LhInput>
  <LhInput v-model="value">
    <template #suffix>unit</template>
  </LhInput>
</template>
```

```vue options
<script>
export default {
  data() {
    return { value: '' }
  },
}
</script>

<template>
  <LhInput v-model="value">
    <template #prefix>🔍</template>
  </LhInput>
  <LhInput v-model="value">
    <template #suffix>unit</template>
  </LhInput>
</template>
```

## 自定义主题

<DemoBlock title="自定义主题">
  <LhConfigProvider :theme-vars="cerblueTheme">
    <LhInput placeholder="青花瓷输入框" />
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhConfigProvider, LhInput } from '@lh-ui/vue3'

const cerblueTheme = {
  'primary-color': '#2B4C7C',
  'primary-color-hover': '#3D649E',
  'primary-color-bg': '#E8EDF3',
  'bg-color': '#F0F4F8',
}
</script>

<template>
  <!-- 通过 theme-vars 定制主题变量 -->
  <LhConfigProvider :theme-vars="cerblueTheme">
    <LhInput placeholder="青花瓷输入框" />
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { LhConfigProvider, LhInput } from '@lh-ui/vue3'

export default {
  data() {
    return {
      cerblueTheme: {
        'primary-color': '#2B4C7C',
        'primary-color-hover': '#3D649E',
        'primary-color-bg': '#E8EDF3',
        'bg-color': '#F0F4F8',
      },
    }
  },
}
</script>

<template>
  <!-- 通过 theme-vars 定制主题变量 -->
  <LhConfigProvider :theme-vars="cerblueTheme">
    <LhInput placeholder="青花瓷输入框" />
  </LhConfigProvider>
</template>
```

## sx 快速布局

通过 `sx` 属性快速设置间距，无需编写额外 CSS。

<DemoBlock title="sx 快速布局">
  <LhInput placeholder="上方间距 2" :sx="{ mt: 2 }" />
  <LhInput placeholder="水平间距 1，下方间距 3" :sx="{ mx: 1, mb: 3 }" />
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- 上方间距 2 -->
  <LhInput placeholder="上方间距 2" :sx="{ mt: 2 }" />
  <!-- 水平间距 1，下方间距 3 -->
  <LhInput placeholder="水平间距 1，下方间距 3" :sx="{ mx: 1, mb: 3 }" />
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- 上方间距 2 -->
  <LhInput placeholder="上方间距 2" :sx="{ mt: 2 }" />
  <!-- 水平间距 1，下方间距 3 -->
  <LhInput placeholder="水平间距 1，下方间距 3" :sx="{ mx: 1, mb: 3 }" />
</template>
```

> sx 基于 `8px` 基准：`mt: 2` → `marginTop: 16px`。完整属性请参考 [sx 快速布局](/guide/theme-customization#sx-快速布局)。

## 国际化

<DemoBlock title="国际化">
  <LhConfigProvider :locale="messages">
    <LhInput />
    <LhButton @click="locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'">切换语言</LhButton>
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref, computed } from 'vue'
import { LhConfigProvider, LhInput, LhButton, zhCN, enUS } from '@lh-ui/vue3'

const locale = ref('zh-CN')
const messages = computed(() => locale.value === 'zh-CN' ? zhCN : enUS)
</script>

<template>
  <!-- 通过 ConfigProvider 注入语言包 -->
  <LhConfigProvider :locale="messages">
    <LhInput />
    <LhButton @click="locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'">切换语言</LhButton>
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { LhConfigProvider, LhInput, LhButton, zhCN, enUS } from '@lh-ui/vue3'

export default {
  components: { LhConfigProvider, LhInput, LhButton },
  data() {
    return { locale: 'zh-CN' }
  },
  computed: {
    messages() {
      return this.locale === 'zh-CN' ? zhCN : enUS
    },
  },
  methods: {
    toggleLocale() {
      this.locale = this.locale === 'zh-CN' ? 'en-US' : 'zh-CN'
    },
  },
}
</script>

<template>
  <!-- 通过 ConfigProvider 注入语言包 -->
  <LhConfigProvider :locale="messages">
    <LhInput />
    <LhButton @click="toggleLocale">切换语言</LhButton>
  </LhConfigProvider>
</template>
```

## 尺寸与只读

<DemoBlock title="尺寸与只读">
  <div class="demo-row">
    <LhInput v-model="demoInputSize1" size="small" placeholder="small" style="width: 100%; max-width: 220px" />
    <LhInput v-model="demoInputSize2" size="medium" placeholder="medium" style="width: 100%; max-width: 220px" />
    <LhInput v-model="demoInputSize3" size="large" placeholder="large" style="width: 100%; max-width: 220px" />
  </div>
  <div class="demo-row">
    <LhInput v-model="demoInputReadonly" readonly placeholder="只读输入框" style="width: 100%; max-width: 300px" />
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <LhInput v-model="value" size="small" placeholder="small" />
  <LhInput v-model="value" size="medium" placeholder="medium" />
  <LhInput v-model="value" size="large" placeholder="large" />
  <LhInput v-model="value" readonly placeholder="只读输入框" />
</template>
```

```vue options
<script>
export default {
  data() {
    return { value: '' }
  },
}
</script>

<template>
  <LhInput v-model="value" size="small" placeholder="small" />
  <LhInput v-model="value" size="medium" placeholder="medium" />
  <LhInput v-model="value" size="large" placeholder="large" />
  <LhInput v-model="value" readonly placeholder="只读输入框" />
</template>
```

## 前后缀图标

通过 `prefix-icon` / `suffix-icon` 设置前后缀图标，取内置 `LhIcon` 图标名（如 `search`、`date`）。

<DemoBlock title="前后缀图标">
  <div class="demo-row">
    <LhInput v-model="demoInputPrefix" prefix-icon="search" placeholder="前缀图标" style="width: 100%; max-width: 260px" />
    <LhInput v-model="demoInputSuffix" suffix-icon="date" placeholder="后缀图标" style="width: 100%; max-width: 260px" />
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <LhInput v-model="value" prefix-icon="search" placeholder="前缀图标" />
  <LhInput v-model="value" suffix-icon="date" placeholder="后缀图标" />
</template>
```

```vue options
<script>
export default {
  data() {
    return { value: '' }
  },
}
</script>

<template>
  <LhInput v-model="value" prefix-icon="search" placeholder="前缀图标" />
  <LhInput v-model="value" suffix-icon="date" placeholder="后缀图标" />
</template>
```

## 原生属性与自适应高度

`autocomplete`、`native-type`、`autofocus`、`minlength` 等原生属性会透传给内部输入框；`autosize` 用于 textarea 根据内容自适应高度。

<DemoBlock title="原生属性与自适应高度">
  <div class="demo-row">
    <LhInput v-model="demoInputNative" autocomplete="off" native-type="text" :minlength="3" placeholder="autocomplete off" style="width: 100%; max-width: 260px" />
    <LhInput v-model="demoInputFocus" autofocus placeholder="自动聚焦" style="width: 100%; max-width: 260px" />
  </div>
  <div class="demo-row">
    <LhInput v-model="demoInputAutosize" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="自适应高度" style="width: 100%; max-width: 300px" />
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <LhInput v-model="value" autocomplete="off" native-type="text" :minlength="3" placeholder="autocomplete off" />
  <LhInput v-model="value" autofocus placeholder="自动聚焦" />
  <LhInput v-model="value" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="自适应高度" />
</template>
```

```vue options
<script>
export default {
  data() {
    return { value: '' }
  },
}
</script>

<template>
  <LhInput v-model="value" autocomplete="off" native-type="text" :minlength="3" placeholder="autocomplete off" />
  <LhInput v-model="value" autofocus placeholder="自动聚焦" />
  <LhInput v-model="value" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="自适应高度" />
</template>
```

## Input API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue | 绑定值 | `string` | — |
| type | 输入框类型 | `"number" \| "text" \| "textarea" \| "password" \| "email" \| "url" \| "tel" \| "date" \| "time"` | `'text'` |
| size | — | `"small" \| "medium" \| "large" \| "mini" \| "x-large"` | `'medium'` |
| disabled | 禁用状态 | `boolean` | `false` |
| readonly | 只读状态 | `boolean` | `false` |
| placeholder | 占位文本 | `string` | — |
| maxlength | 最大输入长度 | `number` | — |
| minlength | — | `number` | — |
| showWordLimit | 是否显示字数统计 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |
| prefixIcon | 前缀图标名称（内置 LhIcon 图标） | `LhIconName` | — |
| suffixIcon | 后缀图标名称（内置 LhIcon 图标） | `LhIconName` | — |
| autofocus | — | `boolean` | `false` |
| autocomplete | — | `string` | — |
| nativeType | — | `string` | — |
| autosize | — | `boolean \| { minRows?: number; maxRows?: number; }` | `false` |
| resize | — | `"none" \| "both" \| "horizontal" \| "vertical"` | `'vertical'` |
| name | — | `string` | — |
| rows | — | `number` | — |
| tabindex | — | `string \| number` | — |
| form | — | `string` | — |
| inputStyle | — | `{ [x: string]: string; }` | — |
| label | — | `string` | — |
| themeVars | 组件级主题变量，覆盖 ConfigProvider 配置 | `{ [x: string]: string; }` | — |
| bgPattern | 组件级背景花纹，覆盖 ConfigProvider 配置 | `string` | — |
| sx | sx 快速布局属性 | `SxProps` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值更新事件 | `(value: string)` |
| input | 输入事件 | `(value: string)` |
| change | 值改变事件 | `(value: string)` |
| focus | 获取焦点事件 | `(event: FocusEvent)` |
| blur | 失去焦点事件 | `(event: FocusEvent)` |
| clear | 清空事件 | — |
| keydown | 原生 keydown 事件 | `(event: KeyboardEvent)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| prefix | 输入框头部内容 |
| suffix | 输入框尾部内容 |

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/input/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

<details id="type-LhInputType">
<summary><code>LhInputType</code></summary>

```ts
export type LhInputType = typeof LH_INPUT_TYPE_CONST[keyof typeof LH_INPUT_TYPE_CONST]
```

</details>

<details id="type-LhInputSize">
<summary><code>LhInputSize</code></summary>

```ts
/**
 * Input 尺寸
 */
export type LhInputSize = typeof LH_SIZE_CONST[keyof typeof LH_SIZE_CONST]
```

</details>

<details id="type-LhInputState">
<summary><code>LhInputState</code></summary>

```ts
export type LhInputState = typeof LH_INPUT_STATE_CONST[keyof typeof LH_INPUT_STATE_CONST]
```

</details>

<details id="type-LhInputProps">
<summary><code>LhInputProps</code></summary>

```ts
/**
 * Input Props 接口
 */
export interface LhInputProps {
  modelValue?: string
  type?: LhInputType
  size?: LhInputSize
  disabled?: boolean
  readonly?: boolean
  placeholder?: string
  maxlength?: number
  minlength?: number
  showWordLimit?: boolean
  clearable?: boolean
  /** 前缀图标名称（内置 LhIcon 图标，如 `search`） */
  prefixIcon?: LhIconName
  /** 后缀图标名称（内置 LhIcon 图标，如 `date`） */
  suffixIcon?: LhIconName
  autofocus?: boolean
  autocomplete?: string
  nativeType?: string
  autosize?: boolean | { minRows?: number; maxRows?: number }
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
  name?: string
  rows?: number
  tabindex?: number | string
  form?: string
  inputStyle?: Record<string, string>
  label?: string
  /** 组件级主题变量，覆盖 ConfigProvider 配置 */
  themeVars?: Record<string, string>
  /** 组件级背景花纹，覆盖 ConfigProvider 配置 */
  bgPattern?: string
  /** sx 快速布局属性 */
  sx?: SxProps
}
```

</details>

<details id="type-LhIconName">
<summary><code>LhIconName</code> <sub>（来自 @lh-ui/share/core/icon (svgs.ts)）</sub></summary>

```ts
export type LhIconName = keyof typeof LH_ICON_SVGS_CONST
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import zhCN from '@lh-ui/share/locales/lang/zh-CN'
import enUS from '@lh-ui/share/locales/lang/en-US'
const demoInput1 = ref('')
const demoInput2 = ref('')
const demoInput3 = ref('')
const demoInput4 = ref('')
const demoInput5 = ref('禁用状态')
const demoInput6 = ref('')
const demoInput7 = ref('')
const demoInput8 = ref('')
const demoInputSize1 = ref('')
const demoInputSize2 = ref('')
const demoInputSize3 = ref('')
const demoInputReadonly = ref('')
const demoInputPrefix = ref('')
const demoInputSuffix = ref('')
const demoInputNative = ref('')
const demoInputFocus = ref('')
const demoInputAutosize = ref('')
</script>

<style scoped>
.demo-row {
  /* 宿主 .demo-block__content 是横向 flex，子项默认按 max-content 取宽；
     demo-row 没有确定宽度时，其内部固定宽输入框会把行撑到 300px，
     在 305px 级别窄屏里溢出内容区。改为占满行宽 + 允许换行，
     输入框即可随容器收缩、装不下时自动折行 */
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
  margin-bottom: 8px;
}
</style>