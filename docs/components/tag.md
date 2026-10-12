# Tag 标签

`LhTag` 用于标识和分类。

## 基础用法

<DemoBlock title="基础用法">
  <div class="demo-row">
    <LhTag>标签一</LhTag>
    <LhTag>标签二</LhTag>
    <LhTag>标签三</LhTag>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhTag } from '@lh-ui/vue3'
</script>

<template>
  <LhTag>标签一</LhTag>
  <LhTag>标签二</LhTag>
  <LhTag>标签三</LhTag>
</template>
```

```vue options
<script>
import { LhTag } from '@lh-ui/vue3'

export default {
  components: { LhTag }
}
</script>

<template>
  <LhTag>标签一</LhTag>
  <LhTag>标签二</LhTag>
  <LhTag>标签三</LhTag>
</template>
```

## 类型

<DemoBlock title="类型">
  <LhTag type="primary">主要标签</LhTag>
  <LhTag type="success">成功标签</LhTag>
  <LhTag type="warning">警告标签</LhTag>
  <LhTag type="danger">危险标签</LhTag>
  <LhTag type="info">信息标签</LhTag>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhTag type="primary">主要标签</LhTag>
  <LhTag type="success">成功标签</LhTag>
  <LhTag type="warning">警告标签</LhTag>
  <LhTag type="danger">危险标签</LhTag>
  <LhTag type="info">信息标签</LhTag>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhTag type="primary">主要标签</LhTag>
  <LhTag type="success">成功标签</LhTag>
  <LhTag type="warning">警告标签</LhTag>
  <LhTag type="danger">危险标签</LhTag>
  <LhTag type="info">信息标签</LhTag>
</template>
```

## 尺寸

<DemoBlock title="尺寸">
  <LhTag size="small">小标签</LhTag>
  <LhTag size="medium">中标签</LhTag>
  <LhTag size="large">大标签</LhTag>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhTag size="small">小标签</LhTag>
  <LhTag size="medium">中标签</LhTag>
  <LhTag size="large">大标签</LhTag>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhTag size="small">小标签</LhTag>
  <LhTag size="medium">中标签</LhTag>
  <LhTag size="large">大标签</LhTag>
</template>
```

## 可关闭

<DemoBlock title="可关闭">
  <LhTag v-if="show1" closable @close="show1 = false">标签一</LhTag>
  <LhTag v-if="show2" type="primary" closable @close="show2 = false">标签二</LhTag>
  <LhTag disabled>禁用标签</LhTag>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const show1 = ref(true)
const show2 = ref(true)
</script>

<template>
  <LhTag v-if="show1" closable @close="show1 = false">标签一</LhTag>
  <LhTag v-if="show2" type="primary" closable @close="show2 = false">标签二</LhTag>
  <LhTag disabled>禁用标签</LhTag>
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      show1: true,
      show2: true,
    }
  },
}
</script>

<template>
  <LhTag v-if="show1" closable @close="show1 = false">标签一</LhTag>
  <LhTag v-if="show2" type="primary" closable @close="show2 = false">标签二</LhTag>
</template>
```

## 圆角与标记

<DemoBlock title="圆角与标记">
  <LhTag round>圆角标签</LhTag>
  <LhTag hit>标记标签</LhTag>
  <LhTag round hit>圆角标记</LhTag>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhTag round>圆角标签</LhTag>
  <LhTag hit>标记标签</LhTag>
  <LhTag round hit>圆角标记</LhTag>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhTag round>圆角标签</LhTag>
  <LhTag hit>标记标签</LhTag>
  <LhTag round hit>圆角标记</LhTag>
</template>
```

## 自定义主题

为标签应用自定义颜色主题。

<DemoBlock title="松花绿主题">
  <LhConfigProvider :theme-vars="songhuaTheme">
    <div class="demo-row">
      <LhTag type="primary">松花绿标签</LhTag>
      <LhTag type="success">成功</LhTag>
    </div>
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhConfigProvider, LhTag } from '@lh-ui/vue3'

const songhuaTheme = {
  'primary-color': '#5B8C5A',
  'primary-color-hover': '#7BB079',
  'primary-color-bg': '#E8F5E8',
}
</script>

<template>
  <!-- 局部主题：松花绿 -->
  <LhConfigProvider :theme-vars="songhuaTheme">
    <LhTag type="primary">松花绿标签</LhTag>
    <LhTag type="success">成功</LhTag>
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { LhConfigProvider, LhTag } from '@lh-ui/vue3'

export default {
  components: { LhConfigProvider, LhTag },
  data() {
    return {
      songhuaTheme: {
        'primary-color': '#5B8C5A',
        'primary-color-hover': '#7BB079',
        'primary-color-bg': '#E8F5E8',
      },
    }
  },
}
</script>

<template>
  <!-- 局部主题：松花绿 -->
  <LhConfigProvider :theme-vars="songhuaTheme">
    <LhTag type="primary">松花绿标签</LhTag>
    <LhTag type="success">成功</LhTag>
  </LhConfigProvider>
</template>
```

更多主题请参考 [主题定制](/guide/theme-customization)。

## 国际化

标签文字可以通过 `LhConfigProvider` 配合语言包实现国际化切换。

<DemoBlock title="国际化">
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhTag>{{ locale === 'zh-CN' ? '标签' : 'Tag' }}</LhTag>
    <LhButton @click="locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'">
      {{ locale === 'zh-CN' ? '切换英文' : 'Switch to Chinese' }}
    </LhButton>
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhConfigProvider, LhTag } from '@lh-ui/vue3'
import { zhCN } from '@lh-ui/vue3'
import { enUS } from '@lh-ui/vue3'

const locale = ref('zh-CN')
</script>

<template>
  <!-- 通过 ConfigProvider 切换语言包 -->
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhTag>{{ locale === 'zh-CN' ? '标签' : 'Tag' }}</LhTag>
    <LhButton @click="locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'">
      {{ locale === 'zh-CN' ? '切换英文' : 'Switch to Chinese' }}
    </LhButton>
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { LhConfigProvider, LhTag, LhButton } from '@lh-ui/vue3'
import { zhCN } from '@lh-ui/vue3'
import { enUS } from '@lh-ui/vue3'

export default {
  components: { LhConfigProvider, LhTag, LhButton },
  data() {
    return {
      locale: 'zh-CN',
      zhCN: zhCN,
      enUS: enUS,
    }
  },
}
</script>

<template>
  <!-- 通过 ConfigProvider 切换语言包 -->
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhTag>{{ locale === 'zh-CN' ? '标签' : 'Tag' }}</LhTag>
    <LhButton @click="locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'">
      {{ locale === 'zh-CN' ? '切换英文' : 'Switch to Chinese' }}
    </LhButton>
  </LhConfigProvider>
</template>
```

## Tag API

### Props

| 属性       | 说明               | 类型                                             | 默认值     |
| ---------- | ------------------ | ------------------------------------------------ | ---------- |
| type | 标签类型 | `"primary" \| "success" \| "warning" \| "danger" \| "info" \| "default"` | `'default'` |
| size | 尺寸 | `"small" \| "medium" \| "large" \| "mini" \| "x-large"` | `'medium'` |
| closable | 是否可关闭 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| round | 是否为圆角 | `boolean` | `false` |
| hit | 是否有边框描边 | `boolean` | `false` |
| onClose | 关闭时的自定义处理 | `(e: Event) => void` | — |
| sx | 快速布局属性（如 `{ mt: 2, w: '50%' }`），转内联样式作用于根元素 | `LhSxProps` | — |

### Events

| 事件  | 说明         | 类型          |
| ----- | ------------ | ------------- |
| click | 点击标签时触发 | `(e: MouseEvent) => void` |
| close | 关闭标签时触发 | `(e: Event) => void` |

### Slots

| 插槽名  | 说明     |
| ------- | -------- |
| default | 标签内容 |

### 无障碍

- 关闭按钮是纯图标按钮，`aria-label` 取语言包 `tag.close`（中文「关闭」），随 ConfigProvider 语言切换
- 关闭按钮内的图标 `<svg>` 标记为 `aria-hidden`，避免屏读重复播报
- 标签文本本身可直接读取，无需额外命名

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/tag/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

<details id="type-LhTagProps">
<summary><code>LhTagProps</code></summary>

```ts
export interface LhTagProps {
  type?: LhTagType
  size?: LhTagSize
  closable?: boolean
  disabled?: boolean
  round?: boolean
  hit?: boolean
  /** 关闭时的自定义处理 */
  onClose?: (e: Event) => void
  /** sx 快速布局属性 */
  sx?: LhSxProps
}
```

</details>

<details id="type-LhTagSize">
<summary><code>LhTagSize</code></summary>

```ts
export type LhTagSize = LhComponentSize
```

</details>

<details id="type-LhTagType">
<summary><code>LhTagType</code> <sub>（来自 @lh-ui/share/core/tag）</sub></summary>

```ts
export type LhTagType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'
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

const show1 = ref(true)
const show2 = ref(true)
const songhuaTheme = {
  'primary-color': '#5B8C5A',
  'primary-color-hover': '#7BB079',
  'primary-color-bg': '#E8F5E8',
}
const locale = ref('zh-CN')
</script>

<style scoped>
.demo-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}
</style>