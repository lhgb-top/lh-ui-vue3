# Icon 图标

图标组件，提供丰富的图标资源。

## 基础用法

<DemoBlock title="基础用法">
  <div class="demo-row">
    <LhIcon name="star" />
    <LhIcon name="search" />
    <LhIcon name="check" />
    <LhIcon name="close" />
    <LhIcon name="edit" />
    <LhIcon name="delete" />
    <LhIcon name="loading" />
    <LhIcon name="arrow-up" />
    <LhIcon name="arrow-down" />
    <LhIcon name="arrow-left" />
    <LhIcon name="arrow-right" />
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhIcon } from '@lh-ui/vue3'
</script>

<template>
  <!-- 星形 -->
  <LhIcon name="star" />
  <!-- 搜索 -->
  <LhIcon name="search" />
  <!-- 对勾 -->
  <LhIcon name="check" />
  <!-- 关闭 -->
  <LhIcon name="close" />
  <!-- 编辑 -->
  <LhIcon name="edit" />
  <!-- 删除 -->
  <LhIcon name="delete" />
  <!-- 加载中 -->
  <LhIcon name="loading" />
  <!-- 向上箭头 -->
  <LhIcon name="arrow-up" />
  <!-- 向下箭头 -->
  <LhIcon name="arrow-down" />
  <!-- 向左箭头 -->
  <LhIcon name="arrow-left" />
  <!-- 向右箭头 -->
  <LhIcon name="arrow-right" />
</template>
```

```vue options
<script>
import { LhIcon } from '@lh-ui/vue3'

export default {
  components: { LhIcon },
}
</script>

<template>
  <!-- 星形 -->
  <LhIcon name="star" />
  <!-- 搜索 -->
  <LhIcon name="search" />
  <!-- 对勾 -->
  <LhIcon name="check" />
  <!-- 关闭 -->
  <LhIcon name="close" />
  <!-- 编辑 -->
  <LhIcon name="edit" />
  <!-- 删除 -->
  <LhIcon name="delete" />
  <!-- 加载中 -->
  <LhIcon name="loading" />
  <!-- 向上箭头 -->
  <LhIcon name="arrow-up" />
  <!-- 向下箭头 -->
  <LhIcon name="arrow-down" />
  <!-- 向左箭头 -->
  <LhIcon name="arrow-left" />
  <!-- 向右箭头 -->
  <LhIcon name="arrow-right" />
</template>
```

## 不同尺寸

<DemoBlock title="不同尺寸">
  <div class="demo-row">
    <LhIcon name="star" size="small" />
    <LhIcon name="star" size="default" />
    <LhIcon name="star" size="large" />
    <LhIcon name="star" size="x-large" />
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhIcon name="star" size="small" />
  <LhIcon name="star" size="default" />
  <LhIcon name="star" size="large" />
  <LhIcon name="star" size="x-large" />
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhIcon name="star" size="small" />
  <LhIcon name="star" size="default" />
  <LhIcon name="star" size="large" />
  <LhIcon name="star" size="x-large" />
</template>
```

## 自定义颜色

<DemoBlock title="自定义颜色">
  <div class="demo-row">
    <LhIcon name="star" color="#e6a23c" />
    <LhIcon name="search" color="#409eff" />
    <LhIcon name="check" color="#67c23a" />
    <LhIcon name="close" color="#f56c6c" />
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhIcon name="star" color="#e6a23c" />
  <LhIcon name="search" color="#409eff" />
  <LhIcon name="check" color="#67c23a" />
  <LhIcon name="close" color="#f56c6c" />
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhIcon name="star" color="#e6a23c" />
  <LhIcon name="search" color="#409eff" />
  <LhIcon name="check" color="#67c23a" />
  <LhIcon name="close" color="#f56c6c" />
</template>
```

## 国际化

图标组件本身不涉及文案，但可通过 `LhConfigProvider` 配合语言包实现周边文本的国际化。

<DemoBlock title="国际化">
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhIcon name="star" />
    <LhButton @click="locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'">
      {{ locale === 'zh-CN' ? '切换英文' : 'Switch to Chinese' }}
    </LhButton>
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhConfigProvider, LhIcon, LhButton } from '@lh-ui/vue3'
import { zhCN } from '@lh-ui/vue3'
import { enUS } from '@lh-ui/vue3'

const locale = ref('zh-CN')
</script>

<template>
  <!-- 语言环境切换 -->
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhIcon name="star" />
    <LhButton @click="locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'">
      {{ locale === 'zh-CN' ? '切换英文' : 'Switch to Chinese' }}
    </LhButton>
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { LhConfigProvider, LhIcon, LhButton } from '@lh-ui/vue3'
import { zhCN } from '@lh-ui/vue3'
import { enUS } from '@lh-ui/vue3'

export default {
  components: { LhConfigProvider, LhIcon, LhButton },
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
  <!-- 语言环境切换 -->
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhIcon name="star" />
    <LhButton @click="locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'">
      {{ locale === 'zh-CN' ? '切换英文' : 'Switch to Chinese' }}
    </LhButton>
  </LhConfigProvider>
</template>
```

## Icon API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| name | 图标名称 | `"star" \| "search" \| "check" \| "close" \| "arrow-up" \| "arrow-down" \| "arrow-left" \| "arrow-right" \| "warning" \| "error" \| "info" \| "loading" \| "plus" \| "minus" \| "edit" \| "delete" \| "setting" \| "user" \| "home" \| "menu" \| "more" \| "download" \| "upload" \| "refresh" \| "folder" \| "file" \| "date" \| "clock" \| "email" \| "phone" \| "location" \| "image" \| "share" \| "bell" \| "filter" \| "eye" \| "link"` | — |
| size | 图标尺寸 | `string \| number` | — |
| color | 图标颜色 | `string` | — |
| themeVars | 组件级主题变量，覆盖 ConfigProvider 配置 | `{ [x: string]: string; }` | — |
| bgPattern | 组件级背景花纹，覆盖 ConfigProvider 配置 | `string` | — |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 自定义图标内容 |

<style scoped>
.demo-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  font-size: 20px;
}
</style>

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/icon/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

<details id="type-LhIconProps">
<summary><code>LhIconProps</code></summary>

```ts
/**
 * Icon 组件 Props
 */
export interface LhIconProps {
  /** 图标名称 */
  name?: LhIconName
  /** 图标尺寸 */
  size?: string | number
  /** 图标颜色 */
  color?: string
  /** 组件级主题变量，覆盖 ConfigProvider 配置 */
  themeVars?: Record<string, string>
  /** 组件级背景花纹，覆盖 ConfigProvider 配置 */
  bgPattern?: string
}
```

</details>

<details id="type-LhIconSize">
<summary><code>LhIconSize</code></summary>

```ts
export type LhIconSize = string | number
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
import { ref } from 'vue'
import zhCN from '@lh-ui/share/locales/lang/zh-CN'
import enUS from '@lh-ui/share/locales/lang/en-US'

const locale = ref('zh-CN')
</script>
