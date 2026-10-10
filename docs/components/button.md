# Button 按钮

按钮组件，支持多种类型、尺寸、状态及国风主题色。

## 基础用法

<DemoBlock title="基础用法">
  <div class="demo-row">
    <LhButton>默认按钮</LhButton>
    <LhButton type="primary">主要按钮</LhButton>
    <LhButton type="success">成功按钮</LhButton>
    <LhButton type="warning">警告按钮</LhButton>
    <LhButton type="danger">危险按钮</LhButton>
    <LhButton type="info">信息按钮</LhButton>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- 默认 -->
  <LhButton>默认按钮</LhButton>
  <!-- primary -->
  <LhButton type="primary">主要按钮</LhButton>
  <!-- success -->
  <LhButton type="success">成功按钮</LhButton>
  <!-- warning -->
  <LhButton type="warning">警告按钮</LhButton>
  <!-- danger -->
  <LhButton type="danger">危险按钮</LhButton>
  <!-- info -->
  <LhButton type="info">信息按钮</LhButton>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- 默认 -->
  <LhButton>默认按钮</LhButton>
  <!-- primary -->
  <LhButton type="primary">主要按钮</LhButton>
  <!-- success -->
  <LhButton type="success">成功按钮</LhButton>
  <!-- warning -->
  <LhButton type="warning">警告按钮</LhButton>
  <!-- danger -->
  <LhButton type="danger">危险按钮</LhButton>
  <!-- info -->
  <LhButton type="info">信息按钮</LhButton>
</template>
```

## 不同尺寸

<DemoBlock title="不同尺寸">
  <div class="demo-row">
    <LhButton size="large">大型按钮</LhButton>
    <LhButton>默认按钮</LhButton>
    <LhButton size="small">小型按钮</LhButton>
    <LhButton size="mini">迷你按钮</LhButton>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhButton size="large">大型按钮</LhButton>
  <LhButton>默认按钮</LhButton>
  <LhButton size="small">小型按钮</LhButton>
  <LhButton size="mini">迷你按钮</LhButton>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhButton size="large">大型按钮</LhButton>
  <LhButton>默认按钮</LhButton>
  <LhButton size="small">小型按钮</LhButton>
  <LhButton size="mini">迷你按钮</LhButton>
</template>
```

## 朴素按钮

<DemoBlock title="朴素按钮">
  <div class="demo-row">
    <LhButton plain>朴素按钮</LhButton>
    <LhButton type="primary" plain>主要按钮</LhButton>
    <LhButton type="success" plain>成功按钮</LhButton>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhButton plain>朴素按钮</LhButton>
  <LhButton type="primary" plain>主要按钮</LhButton>
  <LhButton type="success" plain>成功按钮</LhButton>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhButton plain>朴素按钮</LhButton>
  <LhButton type="primary" plain>主要按钮</LhButton>
  <LhButton type="success" plain>成功按钮</LhButton>
</template>
```

## 圆形按钮

<DemoBlock title="圆形按钮">
  <div class="demo-row">
    <LhButton circle>圆</LhButton>
    <LhButton type="primary" circle>主</LhButton>
    <LhButton type="success" circle>成</LhButton>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhButton circle>圆</LhButton>
  <LhButton type="primary" circle>主</LhButton>
  <LhButton type="success" circle>成</LhButton>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhButton circle>圆</LhButton>
  <LhButton type="primary" circle>主</LhButton>
  <LhButton type="success" circle>成</LhButton>
</template>
```

## 加载状态

<DemoBlock title="加载状态">
  <div class="demo-row">
    <LhButton :loading="loading1" @click="loading1 = true">点击加载</LhButton>
    <LhButton type="primary" loading>加载中</LhButton>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const loading1 = ref(false)
</script>

<template>
  <!-- 点击加载 -->
  <LhButton :loading="loading1" @click="loading1 = true">点击加载</LhButton>
  <!-- 加载中 -->
  <LhButton type="primary" loading>加载中</LhButton>
</template>
```

```vue options
<script>
export default {
  data() {
    return { loading1: false }
  },
}
</script>

<template>
  <!-- 点击加载 -->
  <LhButton :loading="loading1" @click="loading1 = true">点击加载</LhButton>
  <!-- 加载中 -->
  <LhButton type="primary" loading>加载中</LhButton>
</template>
```

## 禁用状态

<DemoBlock title="禁用状态">
  <div class="demo-row">
    <LhButton disabled>禁用按钮</LhButton>
    <LhButton type="primary" disabled>主要按钮</LhButton>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhButton disabled>禁用按钮</LhButton>
  <LhButton type="primary" disabled>主要按钮</LhButton>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhButton disabled>禁用按钮</LhButton>
  <LhButton type="primary" disabled>主要按钮</LhButton>
</template>
```

## Block 按钮

<DemoBlock title="Block 按钮">
  <div style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
    <LhButton block>块级按钮</LhButton>
    <LhButton type="primary" block>主要块级</LhButton>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- 块级按钮 -->
  <LhButton block>块级按钮</LhButton>
  <!-- 主要块级 -->
  <LhButton type="primary" block>主要块级</LhButton>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- 块级按钮 -->
  <LhButton block>块级按钮</LhButton>
  <!-- 主要块级 -->
  <LhButton type="primary" block>主要块级</LhButton>
</template>
```

## 圆角按钮

`round` 提供大圆角胶囊外形（与整圆的 `circle` 不同）。

<DemoBlock title="圆角按钮">
  <div class="demo-row">
    <LhButton round>圆角按钮</LhButton>
    <LhButton type="primary" round>圆角主要</LhButton>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhButton round>圆角按钮</LhButton>
  <LhButton type="primary" round>圆角主要</LhButton>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhButton round>圆角按钮</LhButton>
  <LhButton type="primary" round>圆角主要</LhButton>
</template>
```

## 图标按钮

`icon` 接受图标名，也可用 `#icon` 插槽自定义渲染。

<DemoBlock title="图标按钮">
  <div class="demo-row">
    <LhButton icon="search">搜索</LhButton>
    <LhButton type="primary" icon="star">收藏</LhButton>
    <LhButton circle>
      <template #icon>🔍</template>
    </LhButton>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- 搜索 -->
  <LhButton icon="search">搜索</LhButton>
  <!-- 收藏 -->
  <LhButton type="primary" icon="star">收藏</LhButton>
  <!-- 自定义图标插槽 -->
  <LhButton circle>
    <template #icon>🔍</template>
  </LhButton>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- 搜索 -->
  <LhButton icon="search">搜索</LhButton>
  <!-- 收藏 -->
  <LhButton type="primary" icon="star">收藏</LhButton>
  <!-- 自定义图标插槽 -->
  <LhButton circle>
    <template #icon>🔍</template>
  </LhButton>
</template>
```

## 链接按钮

设置 `href` 后渲染为 `<a>` 标签，`target` 控制打开方式；未设置 `href` 时 `native-type` 决定原生 button 类型。

<DemoBlock title="链接按钮">
  <div class="demo-row">
    <LhButton href="https://github.com/lhgb-top/lh-ui-plus" target="_blank">GitHub</LhButton>
    <LhButton native-type="submit" type="primary">提交（native-type）</LhButton>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhButton href="https://github.com/lhgb-top/lh-ui-plus" target="_blank">GitHub</LhButton>
  <LhButton native-type="submit" type="primary">提交</LhButton>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhButton href="https://github.com/lhgb-top/lh-ui-plus" target="_blank">GitHub</LhButton>
  <LhButton native-type="submit" type="primary">提交</LhButton>
</template>
```

## sx 快速布局

通过 `sx` 属性快速设置间距与尺寸，无需编写额外 CSS。

<DemoBlock title="sx 间距布局">
  <LhButton type="primary" :sx="{ mt: 2, mx: 1 }">上方间距 2，水平间距 1</LhButton>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhButton type="primary" :sx="{ mt: 2, mx: 1 }">上方间距 2，水平间距 1</LhButton>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhButton type="primary" :sx="{ mt: 2, mx: 1 }">上方间距 2，水平间距 1</LhButton>
</template>
```

> sx 基于 `8px` 基准：`mt: 2` → `marginTop: 16px`，`mx: 1` → `marginLeft: 8px; marginRight: 8px`。完整属性请参考 [sx 快速布局](/guide/theme-customization#sx-快速布局)。

## 自定义主题

为按钮应用自定义的主题色，通过 `LhConfigProvider` 的 `themeVars` 属性覆盖 CSS 变量。

<DemoBlock title="青花瓷主题">
  <LhConfigProvider :theme-vars="cerblueTheme">
    <div class="demo-row">
      <LhButton type="primary">青花瓷按钮</LhButton>
      <LhButton type="success">成功</LhButton>
    </div>
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhConfigProvider, LhButton } from '@lh-ui/vue3'

const cerblueTheme = {
  'primary-color': '#2B4C7C',
  'primary-color-hover': '#3D649E',
  'primary-color-bg': '#E8EDF3',
  'bg-color': '#F0F4F8',
}
</script>

<template>
  <LhConfigProvider :theme-vars="cerblueTheme">
    <!-- 青花瓷按钮 -->
    <LhButton type="primary">青花瓷按钮</LhButton>
    <!-- 成功 -->
    <LhButton type="success">成功</LhButton>
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { LhConfigProvider, LhButton } from '@lh-ui/vue3'

export default {
  components: { LhConfigProvider, LhButton },
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
  <LhConfigProvider :theme-vars="cerblueTheme">
    <!-- 青花瓷按钮 -->
    <LhButton type="primary">青花瓷按钮</LhButton>
    <!-- 成功 -->
    <LhButton type="success">成功</LhButton>
  </LhConfigProvider>
</template>
```

更多主题请参考 [主题定制](/guide/theme-customization)。

## 国际化

按钮文字可以通过 `LhConfigProvider` 配合语言包实现国际化切换。

<DemoBlock title="国际化">
  <LhConfigProvider :locale="messages">
    <LhButton @click="locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'">
      {{ locale === 'zh-CN' ? '切换至英文' : 'Switch to Chinese' }}
    </LhButton>
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref, computed } from 'vue'
import { LhConfigProvider, LhButton, zhCN, enUS } from '@lh-ui/vue3'

const locale = ref('zh-CN')
const messages = computed(() => locale.value === 'zh-CN' ? zhCN : enUS)
</script>

<template>
  <LhConfigProvider :locale="messages">
    <LhButton @click="locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'">
      {{ locale === 'zh-CN' ? '切换至英文' : 'Switch to Chinese' }}
    </LhButton>
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { LhConfigProvider, LhButton, zhCN, enUS } from '@lh-ui/vue3'

export default {
  components: { LhConfigProvider, LhButton },
  data() {
    return { locale: 'zh-CN' }
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
    <LhButton @click="locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'">
      {{ locale === 'zh-CN' ? '切换至英文' : 'Switch to Chinese' }}
    </LhButton>
  </LhConfigProvider>
</template>
```

## Button API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| type | 按钮类型 | `"success" \| "warning" \| "error" \| "info" \| "danger" \| "default" \| "primary"` | `LH_BUTTON_TYPE_CONST.default` |
| size | 按钮尺寸，未传时从 ConfigProvider 继承 | `"small" \| "medium" \| "large" \| "mini" \| "x-large"` | — |
| loading | 加载状态 | `boolean` | `false` |
| disabled | 禁用状态 | `boolean` | `false` |
| plain | 是否为朴素按钮 | `boolean` | `false` |
| block | 是否块级 | `boolean` | `false` |
| round | 是否为圆角按钮 | `boolean` | `false` |
| circle | 是否为圆形按钮 | `boolean` | `false` |
| icon | 图标名称（内置 LhIcon 图标，如 `search`；需自定义渲染时用 `icon` 插槽覆盖） | `LhIconName` | — |
| nativeType | 原生 button 类型（仅未传 `href` 时生效） | `"button" \| "submit" \| "reset"` | `'button'` |
| href | 链接地址（传入后渲染为 `<a>` 而非 `<button>`） | `string` | `''` |
| target | 链接打开方式 | `string` | `'_self'` |
| themeVars | 组件级主题变量，覆盖 ConfigProvider 配置 | `{ [x: string]: string; }` | — |
| bgPattern | 组件级背景花纹，覆盖 ConfigProvider 配置 | `string` | — |
| sx | sx 快速布局属性 | `SxProps` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击事件 | `(event: MouseEvent)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 按钮内容 |
| icon | 自定义图标渲染（覆盖 `icon` 属性的默认 `LhIcon`） |

### 无障碍

- **键盘焦点环**：根元素统一提供 `:focus-visible` 焦点环（键盘导航时显示，鼠标点击不显示），用 `--lh-primary-color` 主题变量着色，明暗模式自动跟随，无需额外配置
- **图标按钮命名**：按钮只有图标没有文字时（如圆形图标按钮），屏幕阅读器无法获知用途，必须传 `aria-label`，该属性会自动透传到根元素。`icon` prop 直接传内置图标名（如 `icon="search"`）；需要图标以外的自定义渲染时用 `icon` 插槽：
  ```vue
  <LhButton circle aria-label="搜索">
    <template #icon>
      <LhIcon name="search" />
    </template>
  </LhButton>
  ```
- **动效降级**：加载动画尊重系统 `prefers-reduced-motion` 设置（减弱动态效果时停用旋转）


<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/button/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

<details id="type-LhButtonProps">
<summary><code>LhButtonProps</code></summary>

```ts
export interface LhButtonProps {
  type?: LhButtonType
  /** 尺寸，可选。若不传则从 ConfigProvider 继承 */
  size?: LhButtonSize
  loading?: boolean
  disabled?: boolean
  plain?: boolean
  block?: boolean
  round?: boolean
  circle?: boolean
  /** 图标名称（内置 LhIcon 图标，如 `search`；需自定义渲染时用 `icon` 插槽覆盖） */
  icon?: LhIconName
  nativeType?: 'button' | 'submit' | 'reset'
  href?: string
  target?: string
  /** 组件级主题变量，覆盖 ConfigProvider 的全局 themeVars 和 componentTheme */
  themeVars?: Record<string, string>
  /** 组件级背景花纹，覆盖 ConfigProvider 配置（不受 patternComponents 白名单限制） */
  bgPattern?: string
  /** sx 快速布局属性 */
  sx?: SxProps
}
```

</details>

<details id="type-LhButtonType">
<summary><code>LhButtonType</code></summary>

```ts
export type LhButtonType = (typeof LH_BUTTON_TYPE_CONST)[keyof typeof LH_BUTTON_TYPE_CONST]
```

</details>

<details id="type-LhButtonSize">
<summary><code>LhButtonSize</code></summary>

```ts
export type LhButtonSize = (typeof LH_BUTTON_SIZE_CONST)[keyof typeof LH_BUTTON_SIZE_CONST]
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

const loading1 = ref(false)
const locale = ref('zh-CN')
const messages = computed(() => (locale.value === 'zh-CN' ? zhCN : enUS))
const cerblueTheme = {
  'primary-color': '#2B4C7C',
  'primary-color-hover': '#3D649E',
  'primary-color-bg': '#E8EDF3',
  'bg-color': '#F0F4F8',
}
</script>

<style scoped>
.demo-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}
</style>