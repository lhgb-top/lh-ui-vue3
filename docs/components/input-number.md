# InputNumber 计数器

`LhInputNumber` 用于输入数字，支持范围限制、步长和精度控制。

## 基础用法

<DemoBlock title="基础用法">
  <LhInputNumber v-model="count" />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhInputNumber } from '@lh-ui/vue3'

const count = ref(0)
</script>

<template>
  <LhInputNumber v-model="count" />
</template>
```

```vue options
<script>
import { LhInputNumber } from '@lh-ui/vue3'

export default {
  components: { LhInputNumber },
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <LhInputNumber v-model="count" />
</template>
```

## 范围限制

<DemoBlock title="范围限制">
  <LhInputNumber v-model="level" :min="1" :max="10" />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhInputNumber } from '@lh-ui/vue3'

const level = ref(5)
</script>

<template>
  <LhInputNumber v-model="level" :min="1" :max="10" />
</template>
```

```vue options
<script>
import { LhInputNumber } from '@lh-ui/vue3'

export default {
  components: { LhInputNumber },
  data() {
    return {
      level: 5
    }
  }
}
</script>

<template>
  <LhInputNumber v-model="level" :min="1" :max="10" />
</template>
```

## 自定义主题

应用青花瓷主题色。

<DemoBlock title="青花瓷主题">
  <LhConfigProvider :theme-vars="cerblueTheme">
    <LhInputNumber v-model="themeCount" />
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhConfigProvider, LhInputNumber } from '@lh-ui/vue3'

const count = ref(0)
const cerblueTheme = {
  'primary-color': '#2B4C7C',
  'primary-color-hover': '#3D649E',
  'primary-color-bg': '#E8EDF3',
}
</script>

<template>
  <LhConfigProvider :theme-vars="cerblueTheme">
    <LhInputNumber v-model="count" />
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { LhConfigProvider, LhInputNumber } from '@lh-ui/vue3'

export default {
  data() {
    return {
      count: 0,
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
    <LhInputNumber v-model="count" />
  </LhConfigProvider>
</template>
```

## 国际化

<DemoBlock title="国际化">
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhInputNumber v-model="count" :placeholder="locale === 'zh-CN' ? '请输入数字' : 'Enter number'" />
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhConfigProvider, LhInputNumber } from '@lh-ui/vue3'
import { zhCN } from '@lh-ui/vue3'
import { enUS } from '@lh-ui/vue3'

const locale = ref('zh-CN')
const count = ref(0)
</script>

<template>
  <!-- 语言包配置 -->
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <!-- 占位文本随语言切换 -->
    <LhInputNumber v-model="count" :placeholder="locale === 'zh-CN' ? '请输入数字' : 'Enter number'" />
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { LhConfigProvider, LhInputNumber } from '@lh-ui/vue3'
import { zhCN } from '@lh-ui/vue3'
import { enUS } from '@lh-ui/vue3'

export default {
  data() {
    return {
      locale: 'zh-CN',
      count: 0,
      zhCN: zhCN,
      enUS: enUS,
    }
  },
}
</script>

<template>
  <!-- 语言包配置 -->
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <!-- 占位文本随语言切换 -->
    <LhInputNumber v-model="count" :placeholder="locale === 'zh-CN' ? '请输入数字' : 'Enter number'" />
  </LhConfigProvider>
</template>
```

## 步长与精度

<DemoBlock title="步长与精度">
  <LhInputNumber v-model="demoStep" :step="2" />
  <LhInputNumber v-model="demoPrecision" :precision="2" placeholder="保留2位小数" />
  <LhInputNumber v-model="demoStrict" :step="10" step-strictly placeholder="只能是10的倍数" />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const value = ref<number | null>(1)
</script>

<template>
  <LhInputNumber v-model="value" :step="2" />
  <LhInputNumber v-model="value" :precision="2" placeholder="保留2位小数" />
  <LhInputNumber v-model="value" :step="10" step-strictly placeholder="只能是10的倍数" />
</template>
```

```vue options
<script>
export default {
  data() {
    return { value: 1 }
  },
}
</script>

<template>
  <LhInputNumber v-model="value" :step="2" />
  <LhInputNumber v-model="value" :precision="2" placeholder="保留2位小数" />
  <LhInputNumber v-model="value" :step="10" step-strictly placeholder="只能是10的倍数" />
</template>
```

## 尺寸与控制按钮

<DemoBlock title="尺寸与控制按钮">
  <LhInputNumber v-model="demoSmall" size="small" />
  <LhInputNumber v-model="demoMedium" size="medium" />
  <LhInputNumber v-model="demoLarge" size="large" />
  <LhInputNumber v-model="demoNoControls" :controls="false" placeholder="无控制按钮" />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const value = ref<number | null>(1)
</script>

<template>
  <LhInputNumber v-model="value" size="small" />
  <LhInputNumber v-model="value" size="medium" />
  <LhInputNumber v-model="value" size="large" />
  <LhInputNumber v-model="value" :controls="false" placeholder="无控制按钮" />
</template>
```

```vue options
<script>
export default {
  data() {
    return { value: 1 }
  },
}
</script>

<template>
  <LhInputNumber v-model="value" size="small" />
  <LhInputNumber v-model="value" size="medium" />
  <LhInputNumber v-model="value" size="large" />
  <LhInputNumber v-model="value" :controls="false" placeholder="无控制按钮" />
</template>
```

## 禁用与表单名称

<DemoBlock title="禁用与表单名称">
  <LhInputNumber v-model="demoDisabled" disabled />
  <LhInputNumber v-model="demoNamed" name="quantity" placeholder="name=quantity" />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const value = ref<number | null>(1)
</script>

<template>
  <LhInputNumber v-model="value" disabled />
  <LhInputNumber v-model="value" name="quantity" placeholder="name=quantity" />
</template>
```

```vue options
<script>
export default {
  data() {
    return { value: 1 }
  },
}
</script>

<template>
  <LhInputNumber v-model="value" disabled />
  <LhInputNumber v-model="value" name="quantity" placeholder="name=quantity" />
</template>
```

## InputNumber API

### Props

| 属性            | 说明                 | 类型                   | 默认值      |
| --------------- | -------------------- | ---------------------- | ----------- |
| modelValue | 当前值 | `number` | `null` |
| min | 最小值 | `number` | `-Infinity` |
| max | 最大值 | `number` | `Infinity` |
| step | 步长 | `number` | `1` |
| stepStrictly | 输入值是否为 step 倍数 | `boolean` | `false` |
| precision | 数值精度 | `number` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| size | 尺寸 | `"small" \| "medium" \| "large" \| "mini" \| "x-large"` | `'medium'` |
| controls | 是否显示控制按钮 | `boolean` | `true` |
| placeholder | 占位文本 | `string` | `''` |
| name | 原生表单名称 | `string` | `''` |
| sx | 快速布局属性（如 `{ mt: 2, w: '50%' }`），转内联样式作用于根元素 | `LhSxProps` | — |

### Events

| 事件              | 说明         | 参数             |
| ----------------- | ------------ | ---------------- |
| update:modelValue | 值发生变化   | `value: number`  |
| change            | 值确认改变   | `value: number`  |

支持键盘上下箭头增减数值。


<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/input-number/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

<details id="type-LhInputNumberProps">
<summary><code>LhInputNumberProps</code></summary>

```ts
export interface LhInputNumberProps {
  modelValue?: number | null
  min?: number
  max?: number
  step?: number
  stepStrictly?: boolean
  precision?: number
  disabled?: boolean
  size?: LhComponentSize
  controls?: boolean
  placeholder?: string
  name?: string
  /** sx 快速布局属性 */
  sx?: LhSxProps
}
```

</details>

<details id="type-LhInputNumberSize">
<summary><code>LhInputNumberSize</code></summary>

```ts
export type LhInputNumberSize = LhComponentSize
```

</details>

<details id="type-LhComponentSize">
<summary><code>LhComponentSize</code> <sub>（来自 @lh-ui/share/core/shared）</sub></summary>

```ts
export type LhComponentSize = (typeof LH_SIZE_CONST)[keyof typeof LH_SIZE_CONST]
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
import { ref } from 'vue'
import { LhConfigProvider } from '~/components'
import '@lh-ui/share/styles/config-provider'
import zhCN from '@lh-ui/share/locales/lang/zh-CN'
import enUS from '@lh-ui/share/locales/lang/en-US'

const count = ref(0)
const level = ref(5)
const score = ref(0.5)
const num = ref(0)
const disabledNum = ref(5)
const themeCount = ref(0)
const locale = ref('zh-CN')
const demoStep = ref(2)
const demoPrecision = ref(1)
const demoStrict = ref(10)
const demoSmall = ref(1)
const demoMedium = ref(1)
const demoLarge = ref(1)
const demoNoControls = ref(1)
const demoDisabled = ref(5)
const demoNamed = ref(1)
const cerblueTheme = {
  'primary-color': '#2B4C7C',
  'primary-color-hover': '#3D649E',
  'primary-color-bg': '#E8EDF3',
}
</script>