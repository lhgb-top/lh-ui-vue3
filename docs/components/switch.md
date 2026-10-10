# Switch 开关

`LhSwitch` 用于在两个对立状态之间切换。

## 基础用法

<DemoBlock title="基础用法">
  <LhSwitch v-model="status" />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const status = ref(false)
</script>

<template>
  <!-- 基础开关 -->
  <LhSwitch v-model="status" />
</template>
```

```vue options
<script>
export default {
  data() {
    return { status: false }
  },
}
</script>

<template>
  <!-- 基础开关 -->
  <LhSwitch v-model="status" />
</template>
```

## 文本标签

<DemoBlock title="文本标签">
  <LhSwitch v-model="notification" active-text="开" inactive-text="关" />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const notification = ref(true)
</script>

<template>
  <LhSwitch v-model="notification" active-text="开" inactive-text="关" />
</template>
```

```vue options
<script>
export default {
  data() {
    return { notification: true }
  },
}
</script>

<template>
  <LhSwitch v-model="notification" active-text="开" inactive-text="关" />
</template>
```

## 尺寸

<DemoBlock title="尺寸">
  <LhSwitch v-model="smallVal" size="small" />
  <LhSwitch v-model="mediumVal" size="medium" />
  <LhSwitch v-model="largeVal" size="large" />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const smallVal = ref(false)
const mediumVal = ref(false)
const largeVal = ref(false)
</script>

<template>
  <LhSwitch v-model="smallVal" size="small" />
  <LhSwitch v-model="mediumVal" size="medium" />
  <LhSwitch v-model="largeVal" size="large" />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      smallVal: false,
      mediumVal: false,
      largeVal: false,
    }
  },
}
</script>

<template>
  <LhSwitch v-model="smallVal" size="small" />
  <LhSwitch v-model="mediumVal" size="medium" />
  <LhSwitch v-model="largeVal" size="large" />
</template>
```

## 禁用与 Loading

<DemoBlock title="禁用与 Loading">
  <LhSwitch v-model="disabledVal" disabled />
  <LhSwitch v-model="loadingVal" loading />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const disabledVal = ref(true)
const loadingVal = ref(true)
const swName = ref(false)
</script>

<template>
  <LhSwitch v-model="disabledVal" disabled />
  <LhSwitch v-model="loadingVal" loading />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      disabledVal: true,
      loadingVal: true,
    }
  },
}
</script>

<template>
  <LhSwitch v-model="disabledVal" disabled />
  <LhSwitch v-model="loadingVal" loading />
</template>
```

## 自定义主题

为开关应用自定义主题色。

<DemoBlock title="青花瓷主题">
  <LhConfigProvider :theme-vars="cerblueTheme">
    <LhSwitch v-model="status" />
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhConfigProvider, LhSwitch } from '@lh-ui/vue3'

const cerblueTheme = {
  'primary-color': '#2B4C7C',
  'primary-color-hover': '#3D649E',
  'primary-color-bg': '#E8EDF3',
}
</script>

<template>
  <!-- 青花瓷主题 -->
  <LhConfigProvider :theme-vars="cerblueTheme">
    <LhSwitch v-model="status" />
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { LhConfigProvider, LhSwitch } from '@lh-ui/vue3'

export default {
  components: { LhConfigProvider, LhSwitch },
  data() {
    return {
      status: false,
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
    <LhSwitch v-model="status" />
  </LhConfigProvider>
</template>
```

## 国际化

通过 `LhConfigProvider` 配置全局语言包。

<DemoBlock title="国际化">
  <LhConfigProvider :locale="messages">
    <LhSwitch v-model="status" />
    <LhButton @click="locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'">
      切换语言
    </LhButton>
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref, computed } from 'vue'
import { LhConfigProvider, LhSwitch, LhButton } from '@lh-ui/vue3'
import { zhCN } from '@lh-ui/vue3'
import { enUS } from '@lh-ui/vue3'

const locale = ref('zh-CN')
const messages = computed(() => locale.value === 'zh-CN' ? zhCN : enUS)
const status = ref(false)
</script>

<template>
  <!-- 语言包配置 -->
  <LhConfigProvider :locale="messages">
    <LhSwitch v-model="status" />
    <LhButton @click="locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'">
      切换语言
    </LhButton>
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { ref, computed } from 'vue'
import { LhConfigProvider, LhSwitch, LhButton } from '@lh-ui/vue3'
import { zhCN } from '@lh-ui/vue3'
import { enUS } from '@lh-ui/vue3'

export default {
  components: { LhConfigProvider, LhSwitch, LhButton },
  data() {
    return {
      locale: 'zh-CN',
      status: false,
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
  <!-- 语言包配置 -->
  <LhConfigProvider :locale="messages">
    <LhSwitch v-model="status" />
    <LhButton @click="locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'">
      切换语言
    </LhButton>
  </LhConfigProvider>
</template>
```

## 原生 name

`name` 设置原生 input 的 name 属性（表单提交用）。

<DemoBlock title="name">
  <LhSwitch v-model="swName" name="notifications" />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const value = ref(false)
</script>

<template>
  <LhSwitch v-model="value" name="notifications" />
</template>
```

```vue options
<script>
export default {
  data() {
    return { value: false }
  },
}
</script>

<template>
  <LhSwitch v-model="value" name="notifications" />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 当前状态 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |
| name | 原生表单名称 | `string` | `''` |
| size | 尺寸 | `"small" \| "medium" \| "large" \| "mini" \| "x-large"` | `'medium'` |
| activeText | 开启时文本 | `string` | `''` |
| inactiveText | 关闭时文本 | `string` | `''` |
| sx | sx 快速布局属性 | `SxProps` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 状态改变 | `(value: boolean)` |
| change | 状态改变 | `(value: boolean)` |

触发 `update:modelValue`（新的布尔值）和 `change` 事件。支持键盘 Enter 和 Space 切换。

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/switch/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

<details id="type-LhSwitchProps">
<summary><code>LhSwitchProps</code></summary>

```ts
export interface LhSwitchProps {
  modelValue?: boolean
  disabled?: boolean
  loading?: boolean
  name?: string
  size?: LhComponentSize
  activeText?: string
  inactiveText?: string
  /** sx 快速布局属性 */
  sx?: SxProps
}
```

</details>

<details id="type-LhSwitchSize">
<summary><code>LhSwitchSize</code></summary>

```ts
export type LhSwitchSize = LhComponentSize
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
import { ref, computed } from 'vue'
import zhCN from '@lh-ui/share/locales/lang/zh-CN'
import enUS from '@lh-ui/share/locales/lang/en-US'

const status = ref(false)
const locale = ref('zh-CN')
const messages = computed(() => locale.value === 'zh-CN' ? zhCN : enUS)
const notification = ref(true)
const smallVal = ref(false)
const mediumVal = ref(false)
const largeVal = ref(false)
const disabledVal = ref(true)
const loadingVal = ref(true)
const swName = ref(false)
</script>