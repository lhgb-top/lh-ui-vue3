# Tooltip 提示

文字提示组件，用于鼠标悬停时显示额外信息。

## 基础用法

<DemoBlock title="基础用法">
  <div class="demo-row">
    <LhTooltip content="这是一个提示信息">
      <LhButton>悬停显示提示</LhButton>
    </LhTooltip>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhTooltip, LhButton } from '@lh-ui/vue3'
</script>

<template>
  <!-- 基础用法 -->
  <LhTooltip content="这是一个提示信息">
    <LhButton>悬停显示提示</LhButton>
  </LhTooltip>
</template>
```

```vue options
<script>
import { LhTooltip, LhButton } from '@lh-ui/vue3'

export default {
  components: { LhTooltip, LhButton },
}
</script>

<template>
  <!-- 基础用法 -->
  <LhTooltip content="这是一个提示信息">
    <LhButton>悬停显示提示</LhButton>
  </LhTooltip>
</template>
```

## 不同位置

<DemoBlock title="不同位置">
  <div class="demo-row">
    <LhTooltip content="上方提示" placement="top">
      <LhButton>上</LhButton>
    </LhTooltip>
    <LhTooltip content="下方提示" placement="bottom">
      <LhButton>下</LhButton>
    </LhTooltip>
    <LhTooltip content="左侧提示" placement="left">
      <LhButton>左</LhButton>
    </LhTooltip>
    <LhTooltip content="右侧提示" placement="right">
      <LhButton>右</LhButton>
    </LhTooltip>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- 上 -->
  <LhTooltip content="上方提示" placement="top">
    <LhButton>上</LhButton>
  </LhTooltip>
  <!-- 下 -->
  <LhTooltip content="下方提示" placement="bottom">
    <LhButton>下</LhButton>
  </LhTooltip>
  <!-- 左 -->
  <LhTooltip content="左侧提示" placement="left">
    <LhButton>左</LhButton>
  </LhTooltip>
  <!-- 右 -->
  <LhTooltip content="右侧提示" placement="right">
    <LhButton>右</LhButton>
  </LhTooltip>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- 上 -->
  <LhTooltip content="上方提示" placement="top">
    <LhButton>上</LhButton>
  </LhTooltip>
  <!-- 下 -->
  <LhTooltip content="下方提示" placement="bottom">
    <LhButton>下</LhButton>
  </LhTooltip>
  <!-- 左 -->
  <LhTooltip content="左侧提示" placement="left">
    <LhButton>左</LhButton>
  </LhTooltip>
  <!-- 右 -->
  <LhTooltip content="右侧提示" placement="right">
    <LhButton>右</LhButton>
  </LhTooltip>
</template>
```

## 自定义延迟

<DemoBlock title="自定义延迟">
  <LhTooltip content="延迟1秒显示" :show-after="1000">
    <LhButton>延迟提示</LhButton>
  </LhTooltip>
  <LhTooltip content="进入 300ms 后显示，移出 500ms 后隐藏" :open-delay="300" :close-delay="500">
    <LhButton>open-delay / close-delay</LhButton>
  </LhTooltip>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhTooltip, LhButton } from '@lh-ui/vue3'
</script>

<template>
  <!-- 延迟 1s 显示 -->
  <LhTooltip content="延迟1秒显示" :show-after="1000">
    <LhButton>延迟提示</LhButton>
  </LhTooltip>
  <!-- open-delay / close-delay -->
  <LhTooltip content="进入 300ms 后显示，移出 500ms 后隐藏" :open-delay="300" :close-delay="500">
    <LhButton>open-delay / close-delay</LhButton>
  </LhTooltip>
</template>
```

```vue options
<script>
import { LhTooltip, LhButton } from '@lh-ui/vue3'

export default {
  components: { LhTooltip, LhButton },
}
</script>

<template>
  <!-- 延迟 1s 显示 -->
  <LhTooltip content="延迟1秒显示" :show-after="1000">
    <LhButton>延迟提示</LhButton>
  </LhTooltip>
  <!-- open-delay / close-delay -->
  <LhTooltip content="进入 300ms 后显示，移出 500ms 后隐藏" :open-delay="300" :close-delay="500">
    <LhButton>open-delay / close-delay</LhButton>
  </LhTooltip>
</template>
```

## 国际化

提示文字可以通过 `LhConfigProvider` 配合语言包实现国际化切换。

<DemoBlock title="国际化">
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhTooltip :content="locale === 'zh-CN' ? '中文提示' : 'English Tooltip'">
      <LhButton>Tooltip</LhButton>
    </LhTooltip>
    <LhButton @click="locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'">
      {{ locale === 'zh-CN' ? '切换英文' : 'Switch to Chinese' }}
    </LhButton>
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhConfigProvider, LhTooltip, LhButton } from '@lh-ui/vue3'
import { zhCN } from '@lh-ui/vue3'
import { enUS } from '@lh-ui/vue3'

const locale = ref('zh-CN')
</script>

<template>
  <!-- 通过 ConfigProvider 切换语言包 -->
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhTooltip :content="locale === 'zh-CN' ? '中文提示' : 'English Tooltip'">
      <LhButton>Tooltip</LhButton>
    </LhTooltip>
    <LhButton @click="locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'">
      {{ locale === 'zh-CN' ? '切换英文' : 'Switch to Chinese' }}
    </LhButton>
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { LhConfigProvider, LhTooltip, LhButton } from '@lh-ui/vue3'
import { zhCN } from '@lh-ui/vue3'
import { enUS } from '@lh-ui/vue3'

export default {
  components: { LhConfigProvider, LhTooltip, LhButton },
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
    <LhTooltip :content="locale === 'zh-CN' ? '中文提示' : 'English Tooltip'">
      <LhButton>Tooltip</LhButton>
    </LhTooltip>
    <LhButton @click="locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'">
      {{ locale === 'zh-CN' ? '切换英文' : 'Switch to Chinese' }}
    </LhButton>
  </LhConfigProvider>
</template>
```

## sx 快速布局

通过 `sx` 属性快速调整触发器根元素的间距与尺寸，无需编写额外 CSS。

<DemoBlock title="sx 间距布局">
  <LhTooltip content="sx 作用于触发器根元素" :sx="{ mt: 2, ml: 2 }">
    <LhButton type="primary">上方间距 2，左侧间距 2</LhButton>
  </LhTooltip>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhTooltip, LhButton } from '@lh-ui/vue3'
</script>

<template>
  <!-- sx 间距布局 -->
  <LhTooltip content="sx 作用于触发器根元素" :sx="{ mt: 2, ml: 2 }">
    <LhButton type="primary">上方间距 2，左侧间距 2</LhButton>
  </LhTooltip>
</template>
```

```vue options
<script>
import { LhTooltip, LhButton } from '@lh-ui/vue3'

export default {
  components: { LhTooltip, LhButton },
}
</script>

<template>
  <!-- sx 间距布局 -->
  <LhTooltip content="sx 作用于触发器根元素" :sx="{ mt: 2, ml: 2 }">
    <LhButton type="primary">上方间距 2，左侧间距 2</LhButton>
  </LhTooltip>
</template>
```

> sx 基于 `8px` 基准：`mt: 2` → `marginTop: 16px`，`ml: 2` → `marginLeft: 16px`。完整属性请参考 [sx 快速布局](/guide/theme-customization#sx-快速布局)。

## 触发方式与状态

通过 `trigger` 指定触发方式；`disabled` 禁用提示；`manual` 配合 `visible` 手动控制显示；`hideAfter` 控制延迟隐藏。

<DemoBlock title="触发方式与状态">
  <div class="demo-row">
    <LhTooltip content="点击触发" trigger="click">
      <LhButton>点击触发</LhButton>
    </LhTooltip>
    <LhTooltip content="聚焦触发" trigger="focus">
      <LhButton>聚焦触发</LhButton>
    </LhTooltip>
    <LhTooltip content="已禁用的提示" disabled>
      <LhButton type="info" disabled>禁用提示</LhButton>
    </LhTooltip>
    <LhTooltip content="手动控制" manual :visible="manualVisible">
      <LhButton @click="manualVisible = !manualVisible">手动切换</LhButton>
    </LhTooltip>
    <LhTooltip content="延迟 1 秒隐藏" :hide-after="1000">
      <LhButton>延迟隐藏</LhButton>
    </LhTooltip>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhTooltip, LhButton } from '@lh-ui/vue3'

const manualVisible = ref(false)
</script>

<template>
  <!-- 点击触发 -->
  <LhTooltip content="点击触发" trigger="click">
    <LhButton>点击触发</LhButton>
  </LhTooltip>
  <!-- 聚焦触发 -->
  <LhTooltip content="聚焦触发" trigger="focus">
    <LhButton>聚焦触发</LhButton>
  </LhTooltip>
  <!-- 禁用提示 -->
  <LhTooltip content="已禁用的提示" disabled>
    <LhButton type="info" disabled>禁用提示</LhButton>
  </LhTooltip>
  <!-- 手动控制 -->
  <LhTooltip content="手动控制" manual :visible="manualVisible">
    <LhButton @click="manualVisible = !manualVisible">手动切换</LhButton>
  </LhTooltip>
  <!-- 延迟隐藏 -->
  <LhTooltip content="延迟 1 秒隐藏" :hide-after="1000">
    <LhButton>延迟隐藏</LhButton>
  </LhTooltip>
</template>
```

```vue options
<script>
import { LhTooltip, LhButton } from '@lh-ui/vue3'

export default {
  components: { LhTooltip, LhButton },
  data() {
    return {
      manualVisible: false,
    }
  },
}
</script>

<template>
  <!-- 点击触发 -->
  <LhTooltip content="点击触发" trigger="click">
    <LhButton>点击触发</LhButton>
  </LhTooltip>
  <!-- 聚焦触发 -->
  <LhTooltip content="聚焦触发" trigger="focus">
    <LhButton>聚焦触发</LhButton>
  </LhTooltip>
  <!-- 禁用提示 -->
  <LhTooltip content="已禁用的提示" disabled>
    <LhButton type="info" disabled>禁用提示</LhButton>
  </LhTooltip>
  <!-- 手动控制 -->
  <LhTooltip content="手动控制" manual :visible="manualVisible">
    <LhButton @click="manualVisible = !manualVisible">手动切换</LhButton>
  </LhTooltip>
  <!-- 延迟隐藏 -->
  <LhTooltip content="延迟 1 秒隐藏" :hide-after="1000">
    <LhButton>延迟隐藏</LhButton>
  </LhTooltip>
</template>
```

> `openDelay` / `closeDelay` 分别是 `showAfter` / `hideAfter` 的别名，可按喜好选用。

## 主题与外观

通过 `effect` 切换明暗主题，`bgColor` 自定义背景色，`maxWidth` 限制最大宽度，`teleportTarget` 指定弹出层挂载位置。

<DemoBlock title="主题与外观">
  <div class="demo-row">
    <LhTooltip content="深色主题" effect="dark">
      <LhButton>深色主题</LhButton>
    </LhTooltip>
    <LhTooltip content="浅色主题" effect="light">
      <LhButton>浅色主题</LhButton>
    </LhTooltip>
    <LhTooltip content="自定义背景色" bg-color="#5a3fa8">
      <LhButton>自定义背景色</LhButton>
    </LhTooltip>
    <LhTooltip content="这段文字较长，会被 maxWidth 限制在 160px 内自动换行显示" :max-width="160">
      <LhButton>最大宽度 160px</LhButton>
    </LhTooltip>
    <LhTooltip content="挂载到 #app 的弹出层" teleport-target="#app">
      <LhButton>自定义挂载点</LhButton>
    </LhTooltip>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhTooltip, LhButton } from '@lh-ui/vue3'
</script>

<template>
  <!-- 深色主题 -->
  <LhTooltip content="深色主题" effect="dark">
    <LhButton>深色主题</LhButton>
  </LhTooltip>
  <!-- 浅色主题 -->
  <LhTooltip content="浅色主题" effect="light">
    <LhButton>浅色主题</LhButton>
  </LhTooltip>
  <!-- 自定义背景色 -->
  <LhTooltip content="自定义背景色" bg-color="#5a3fa8">
    <LhButton>自定义背景色</LhButton>
  </LhTooltip>
  <!-- 最大宽度 -->
  <LhTooltip content="这段文字较长，会被 maxWidth 限制在 160px 内自动换行显示" :max-width="160">
    <LhButton>最大宽度 160px</LhButton>
  </LhTooltip>
  <!-- 自定义挂载点 -->
  <LhTooltip content="挂载到 #app 的弹出层" teleport-target="#app">
    <LhButton>自定义挂载点</LhButton>
  </LhTooltip>
</template>
```

```vue options
<script>
import { LhTooltip, LhButton } from '@lh-ui/vue3'

export default {
  components: { LhTooltip, LhButton },
}
</script>

<template>
  <!-- 深色主题 -->
  <LhTooltip content="深色主题" effect="dark">
    <LhButton>深色主题</LhButton>
  </LhTooltip>
  <!-- 浅色主题 -->
  <LhTooltip content="浅色主题" effect="light">
    <LhButton>浅色主题</LhButton>
  </LhTooltip>
  <!-- 自定义背景色 -->
  <LhTooltip content="自定义背景色" bg-color="#5a3fa8">
    <LhButton>自定义背景色</LhButton>
  </LhTooltip>
  <!-- 最大宽度 -->
  <LhTooltip content="这段文字较长，会被 maxWidth 限制在 160px 内自动换行显示" :max-width="160">
    <LhButton>最大宽度 160px</LhButton>
  </LhTooltip>
  <!-- 自定义挂载点 -->
  <LhTooltip content="挂载到 #app 的弹出层" teleport-target="#app">
    <LhButton>自定义挂载点</LhButton>
  </LhTooltip>
</template>
```

## Tooltip API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| content | 提示内容 | `string` | `''` |
| placement | 提示位置 | `"top" \| "top-start" \| "top-end" \| "bottom" \| "bottom-start" \| "bottom-end" \| "left" \| "left-start" \| "left-end" \| "right" \| "right-start" \| "right-end"` | `'top'` |
| trigger | 触发方式 | `"hover" \| "click" \| "focus"` | `'hover'` |
| disabled | 是否禁用 | `boolean` | `false` |
| manual | 是否手动控制显示 | `boolean` | `false` |
| visible | 手动控制的显示状态 | `boolean` | — |
| showAfter | 延迟显示时间(ms) | `number` | `0` |
| hideAfter | 延迟隐藏时间(ms) | `number` | `0` |
| openDelay | 延迟显示时间(ms)，showAfter 的别名 | `number` | — |
| closeDelay | 关闭延迟 | `number` | — |
| effect | 主题 | `"dark" \| "light"` | `'dark'` |
| type | 内置主题色类型（会覆盖 effect 的背景色） | `"primary" \| "success" \| "warning" \| "danger" \| "info"` | — |
| bgColor | 自定义背景色（会覆盖 effect 和 type 的背景色） | `string` | — |
| maxWidth | 最大宽度 | `string \| number` | `'200px'` |
| teleportTarget | Teleport 目标（选择器或元素，默认 body） | `string \| HTMLElement` | `'body'` |
| themeVars | 组件级主题变量，覆盖 ConfigProvider 配置 | `{ [x: string]: string; }` | — |
| bgPattern | 组件级背景花纹，覆盖 ConfigProvider 配置 | `string` | — |
| sx | sx 快速布局属性（作用于触发器根元素） | `LhSxProps` | — |

> 注：`trigger` 的 `'click'` 取值当前尚未实现（行为等同 `'hover'`），点击切换将在后续版本提供。

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 触发提示的元素（提示正文通过 `content` 属性设置） |

### Methods

通过 `ref` 可以调用组件暴露的方法：

| 方法名 | 说明 |
|--------|------|
| show | 立即显示提示 |
| hide | 立即隐藏提示 |
| toggle | 切换提示显示状态 |

### 无障碍

- 弹出层自带 `role="tooltip"`；显示时触发器根元素自动设置 `aria-describedby` 指向弹出层，隐藏时自动移除，不留悬空引用
- **键盘可达**：`hover` / `focus` 触发方式下，键盘焦点进入触发器（`focusin`）同样会显示提示，焦点离开自动隐藏，对齐 WAI-ARIA APG 的 tooltip 模式；`click` 触发方式不响应焦点
- 触发器内应放置可聚焦元素（如按钮、链接），纯文本无法被键盘聚焦，提示将对键盘用户不可达

<style scoped>
.demo-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}
</style>

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/tooltip/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

<details id="type-LhTooltipPlacement">
<summary><code>LhTooltipPlacement</code></summary>

```ts
/**
 * Tooltip 类型
 */
export type LhTooltipPlacement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
```

</details>

<details id="type-LhTooltipTrigger">
<summary><code>LhTooltipTrigger</code></summary>

```ts
export type LhTooltipTrigger = 'hover' | 'click' | 'focus'
```

</details>

<details id="type-LhTooltipEffect">
<summary><code>LhTooltipEffect</code></summary>

```ts
export type LhTooltipEffect = 'dark' | 'light'
```

</details>

<details id="type-LhTooltipType">
<summary><code>LhTooltipType</code></summary>

```ts
export type LhTooltipType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
```

</details>

<details id="type-LhTooltipProps">
<summary><code>LhTooltipProps</code></summary>

```ts
/**
 * Tooltip 组件 Props
 */
export interface LhTooltipProps {
  /** 提示文字内容 */
  content?: string
  /** 展示位置 */
  placement?: LhTooltipPlacement
  /** 触发方式 */
  trigger?: LhTooltipTrigger
  /** 是否禁用 */
  disabled?: boolean
  /** 是否手动控制显示 */
  manual?: boolean
  /** 手动控制的显示状态 */
  visible?: boolean
  /** 延迟显示时间(ms) */
  showAfter?: number
  /** 延迟隐藏时间(ms) */
  hideAfter?: number
  /** 延迟显示时间(ms)，showAfter 的别名 */
  openDelay?: number
  /** 关闭延迟 */
  closeDelay?: number
  /** 主题 */
  effect?: LhTooltipEffect
  /** 内置主题色类型（会覆盖 effect 的背景色） */
  type?: LhTooltipType
  /** 自定义背景色（会覆盖 effect 和 type 的背景色） */
  bgColor?: string
  /** 最大宽度 */
  maxWidth?: string | number
  /** Teleport 目标（选择器或元素，默认 body） */
  teleportTarget?: string | HTMLElement
  /** 组件级主题变量，覆盖 ConfigProvider 配置 */
  themeVars?: Record<string, string>
  /** 组件级背景花纹，覆盖 ConfigProvider 配置 */
  bgPattern?: string
  /** sx 快速布局属性（作用于触发器根元素） */
  sx?: LhSxProps
}
```

</details>

<!-- lh-types:end -->
<script setup>
import { ref } from 'vue'
import zhCN from '@lh-ui/share/locales/lang/zh-CN'
import enUS from '@lh-ui/share/locales/lang/en-US'
// 页面级声明：实时 DemoBlock 的手动控制示例依赖此状态
const manualVisible = ref(false)
const locale = ref('zh-CN')
</script>
