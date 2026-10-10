# ConfigProvider 配置提供者

通过 provide/inject 为子组件提供全局配置，支持主题、尺寸、国际化统一管理。

## 基础用法

<DemoBlock title="基础用法">
  <p>默认尺寸：</p>
  <div class="demo-row">
    <LhButton>默认按钮</LhButton>
    <LhButton type="primary" disabled>主要按钮</LhButton>
  </div>
  <p style="margin-top: 16px;">小型尺寸：</p>
  <LhConfigProvider :size="'small'">
    <div class="demo-row">
      <LhButton>小按钮</LhButton>
      <LhButton type="primary">小主要</LhButton>
    </div>
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhConfigProvider, LhButton } from '@lh-ui/vue3'
</script>

<template>
  <!-- 默认尺寸 -->
  <LhButton>默认按钮</LhButton>
  <!-- 主要按钮（禁用） -->
  <LhButton type="primary" disabled>主要按钮</LhButton>
  <!-- 小型尺寸 -->
  <LhConfigProvider :size="'small'">
    <!-- 小按钮 -->
    <LhButton>小按钮</LhButton>
    <!-- 小主要 -->
    <LhButton type="primary">小主要</LhButton>
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { LhConfigProvider, LhButton } from '@lh-ui/vue3'

export default {
  components: { LhConfigProvider, LhButton },
}
</script>

<template>
  <!-- 默认尺寸 -->
  <LhButton>默认按钮</LhButton>
  <!-- 主要按钮（禁用） -->
  <LhButton type="primary" disabled>主要按钮</LhButton>
  <!-- 小型尺寸 -->
  <LhConfigProvider :size="'small'">
    <!-- 小按钮 -->
    <LhButton>小按钮</LhButton>
    <!-- 小主要 -->
    <LhButton type="primary">小主要</LhButton>
  </LhConfigProvider>
</template>
```

## 自定义主题色

<DemoBlock title="自定义主题色">
  <LhConfigProvider :theme-vars="{ 'primary-color': '#e6a23c' }">
    <div class="demo-row">
      <LhButton>默认</LhButton>
      <LhButton type="primary">金色主题</LhButton>
    </div>
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhConfigProvider, LhButton } from '@lh-ui/vue3'
</script>

<template>
  <LhConfigProvider :theme-vars="{ 'primary-color': '#e6a23c' }">
    <LhButton>默认</LhButton>
    <LhButton type="primary">金色主题</LhButton>
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { LhConfigProvider, LhButton } from '@lh-ui/vue3'

export default {
  components: { LhConfigProvider, LhButton },
}
</script>

<template>
  <LhConfigProvider :theme-vars="{ 'primary-color': '#e6a23c' }">
    <LhButton>默认</LhButton>
    <LhButton type="primary">金色主题</LhButton>
  </LhConfigProvider>
</template>
```

## 按组件配置主题（componentTheme）

通过 `componentTheme` 可为指定组件单独覆盖主题变量，优先级高于全局 `themeVars`。

<DemoBlock title="按组件配置">
  <LhConfigProvider :component-theme="{ button: { 'primary-color': '#e6a23c' } }">
    <div class="demo-row">
      <LhButton type="primary">Button 金黄主题</LhButton>
      <LhButton type="success">Success 不受影响</LhButton>
    </div>
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhConfigProvider, LhButton } from '@lh-ui/vue3'
</script>

<template>
  <LhConfigProvider
    :component-theme="{ button: { 'primary-color': '#e6a23c' } }"
  >
    <!-- Button 金黄主题 -->
    <LhButton type="primary">Button 金黄主题</LhButton>
    <!-- Success 不受影响 -->
    <LhButton type="success">Success 不受影响</LhButton>
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { LhConfigProvider, LhButton } from '@lh-ui/vue3'

export default {
  components: { LhConfigProvider, LhButton },
}
</script>

<template>
  <LhConfigProvider
    :component-theme="{ button: { 'primary-color': '#e6a23c' } }"
  >
    <!-- Button 金黄主题 -->
    <LhButton type="primary">Button 金黄主题</LhButton>
    <!-- Success 不受影响 -->
    <LhButton type="success">Success 不受影响</LhButton>
  </LhConfigProvider>
</template>
```

## 花纹背景白名单（patternComponents）

通过 `patternComponents` 指定哪些组件支持花纹背景效果。

<DemoBlock title="花纹白名单">
  <LhConfigProvider :pattern-components="['button']">
    <div class="demo-row">
      <LhButton bg-pattern="var(--lh-pattern-willow)">柳叶花纹</LhButton>
      <LhButton bg-pattern="var(--lh-pattern-cloud)">祥云花纹</LhButton>
    </div>
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhConfigProvider, LhButton } from '@lh-ui/vue3'
</script>

<template>
  <LhConfigProvider :pattern-components="['button']">
    <LhButton bg-pattern="var(--lh-pattern-willow)">柳叶花纹</LhButton>
    <LhButton bg-pattern="var(--lh-pattern-cloud)">祥云花纹</LhButton>
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { LhConfigProvider, LhButton } from '@lh-ui/vue3'

export default {
  components: { LhConfigProvider, LhButton },
}
</script>

<template>
  <LhConfigProvider :pattern-components="['button']">
    <LhButton bg-pattern="var(--lh-pattern-willow)">柳叶花纹</LhButton>
    <LhButton bg-pattern="var(--lh-pattern-cloud)">祥云花纹</LhButton>
  </LhConfigProvider>
</template>
```

`bg-pattern` 的值是 CSS 变量（如 `var(--lh-pattern-willow)`）或图片 URL，直接写花纹名（如 `willow`）无效。更多花纹名称请参考 [花纹定制](/guide/theme-patterns)。

## 国际化

通过 `locale` 配置全局语言包。

<DemoBlock title="语言切换">
  <LhConfigProvider :locale="currentLocale">
    <div class="demo-row">
      <LhButton @click="toggleLocale">
        {{ locale === 'zh-CN' ? 'Switch to English' : '切换中文' }}
      </LhButton>
    </div>
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref, computed } from 'vue'
import { LhConfigProvider, LhButton, zhCN, enUS } from '@lh-ui/vue3'

const locale = ref('zh-CN')
const currentLocale = computed(() => locale.value === 'zh-CN' ? zhCN : enUS)
function toggleLocale() {
  locale.value = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
}
</script>

<template>
  <LhConfigProvider :locale="currentLocale">
    <LhButton @click="toggleLocale">
      {{ locale === 'zh-CN' ? 'Switch to English' : '切换中文' }}
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
    currentLocale() {
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
  <LhConfigProvider :locale="currentLocale">
    <LhButton @click="toggleLocale">
      {{ locale === 'zh-CN' ? 'Switch to English' : '切换中文' }}
    </LhButton>
  </LhConfigProvider>
</template>
```

## ConfigProvider API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| size | 全局尺寸 | `LhSizes` | — |
| locale | 国际化配置 | `LocaleType` | — |
| themeVars | 全局主题变量 | `{ [x: string]: string; }` | — |
| patternComponents | 花纹背景白名单 | `[LhThemeableComponent](#type-LhThemeableComponent)`[] | — |
| componentTheme | 按组件名配置主题变量 | `{ button?: Record<string, string>; input?: Record<string, string>; dialog?: Record<string, string>; tooltip?: Record<string, string>; icon?: Record<string, string>; card?: Record<string, string>; alert?: Record<string, string>; popover?: Record<string, string>; popconfirm?: Record<string, string>; drawer?: Record<string, string>; dropdown?: Record<string, string>; message?: Record<string, string>; notification?: Record<string, string>; loading?: Record<string, string>; timeline?: Record<string, string>; collapse?: Record<string, string>; rate?: Record<string, string>; segmented?: Record<string, string>; calendar?: Record<string, string>; affix?: Record<string, string>; backtop?: Record<string, string>; image?: Record<string, string>; menu?: Record<string, string>; table?: Record<string, string>; layout?: Record<string, string>; tree?: Record<string, string>; transfer?: Record<string, string>; upload?: Record<string, string>; anchor?: Record<string, string>; }` | — |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 需要配置的组件内容 |

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/config-provider/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

<details id="type-LhThemeableComponent">
<summary><code>LhThemeableComponent</code></summary>

```ts
/**
 * 可配置主题的组件名称集合
 */
export type LhThemeableComponent =
  | 'button'
  | 'input'
  | 'dialog'
  | 'tooltip'
  | 'icon'
  | 'card'
  | 'alert'
  | 'popover'
  | 'popconfirm'
  | 'drawer'
  | 'dropdown'
  | 'message'
  | 'notification'
  | 'loading'
  | 'timeline'
  | 'collapse'
  | 'rate'
  | 'segmented'
  | 'calendar'
  | 'affix'
  | 'backtop'
  | 'image'
  | 'menu'
  | 'table'
  | 'layout'
  | 'tree'
  | 'transfer'
  | 'upload'
  | 'anchor'
```

</details>

<details id="type-LhConfigProviderProps">
<summary><code>LhConfigProviderProps</code></summary>

```ts
/**
 * ConfigProvider 配置项
 */
export interface LhConfigProviderProps {
  /** 全局尺寸 */
  size?: LhSizes
  /** 全局语言 */
  locale?: LocaleType
  /** 全局主题变量
   * 支持键（会自动添加 --lh- 前缀）：
   * - `primary-color`, `success-color`, `warning-color`, `danger-color`, `info-color`
   * - `gold-color`, `vermilion-color`, `jade-color`
   * - `bg-color`, `text-color`, `border-color`
   * - `bg-pattern` — 花纹背景 URL（如 `var(--lh-pattern-willow)`）
   * - `bg-pattern-opacity` — 花纹透明度
   * - `bg-pattern-color` — 花纹颜色
   * - `decoration-color` — 装饰色 */
  themeVars?: Record<string, string>
  /** 启用背景花纹的组件白名单
   * - 只有白名单中的组件会应用全局 `themeVars` 中的 bg-pattern
   * - 空数组或 undefined 表示所有组件均禁用背景花纹
   * - 组件自身通过 `bgPattern` 或 `themeVars` 传入的花纹不受此限制
   */
  patternComponents?: LhThemeableComponent[]
  /** 按组件单独配置主题变量（覆盖全局 themeVars）
   * 键为组件名，值为该组件的主题变量对象
   * 优先级: 组件自身 props > componentTheme[组件名] > 全局 themeVars
   */
  componentTheme?: Partial<Record<LhThemeableComponent, Record<string, string>>>
}
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import zhCN from '@lh-ui/share/locales/lang/zh-CN'
import enUS from '@lh-ui/share/locales/lang/en-US'

const locale = ref('zh-CN')
const currentLocale = computed(() => locale.value === 'zh-CN' ? zhCN : enUS)
function toggleLocale() {
  locale.value = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
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