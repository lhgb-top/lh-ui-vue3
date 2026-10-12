# Card 卡片

承载标题、内容、底部操作的信息容器。可整体点击（自带 button 键盘语义），支持加载占位与 `sx` 快速布局。

## 基础用法

<DemoBlock title="基础用法">
  <LhCard title="雨打芭蕉" style="width: 100%; max-width: 300px">
    隔窗知夜雨，芭蕉先有声。
  </LhCard>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhCard title="雨打芭蕉">
    隔窗知夜雨，芭蕉先有声。
  </LhCard>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhCard title="雨打芭蕉">
    隔窗知夜雨，芭蕉先有声。
  </LhCard>
</template>
```


`shadow` 控制阴影显示时机：`always`（默认）/ `hover`（悬停时）/ `never`。

<DemoBlock title="阴影时机">
  <LhCard shadow="hover" title="hover 阴影" style="width: 200px">悬停时出现阴影。</LhCard>
  <LhCard shadow="never" title="无阴影" style="width: 200px">始终无阴影。</LhCard>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhCard shadow="hover" title="hover 阴影">悬停时出现阴影。</LhCard>
  <LhCard shadow="never" title="无阴影">始终无阴影。</LhCard>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhCard shadow="hover" title="hover 阴影">悬停时出现阴影。</LhCard>
  <LhCard shadow="never" title="无阴影">始终无阴影。</LhCard>
</template>
```

## 头部插槽与 extra

<DemoBlock title="自定义头部">
  <LhCard style="width: 100%; max-width: 300px">
    <template #header>
      <span class="demo-strong">自定义头部</span>
    </template>
    <template #extra>操作</template>
    通过 <code>header</code> 插槽可完全接管标题区。
  </LhCard>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhCard>
    <template #header><span>自定义头部</span></template>
    <template #extra>操作</template>
    …
  </LhCard>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhCard>
    <template #header><span>自定义头部</span></template>
    <template #extra>操作</template>
    …
  </LhCard>
</template>
```

## 封面与底部

<DemoBlock title="封面与底部">
  <LhCard style="width: 100%; max-width: 300px">
    <template #cover>
      <div class="demo-cover">封面区域</div>
    </template>
    正文内容……
    <template #footer>
      <LhButton size="small">收藏</LhButton>
    </template>
  </LhCard>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- 封面与底部 -->
  <LhCard>
    <template #cover>…</template>
    …
    <template #footer>
      <LhButton size="small">收藏</LhButton>
    </template>
  </LhCard>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- 封面与底部 -->
  <LhCard>
    <template #cover>…</template>
    …
    <template #footer>
      <LhButton size="small">收藏</LhButton>
    </template>
  </LhCard>
</template>
```

## 整卡可点击

`clickable` 时整卡承担 button 语义：可 Tab 聚焦（`:focus-visible` 焦点环），Enter / Space 触发 `click`。

<DemoBlock title="可点击卡片">
  <LhCard clickable title="点击我" style="width: 100%; max-width: 300px" @click="onCardClick">
    整卡可点击。用键盘 Tab 聚焦后按 Enter 试试。
  </LhCard>
</DemoBlock>

```vue composition
<script setup lang="ts">
function onCardClick() {
  console.log('card clicked')
}
</script>

<template>
  <!-- 可点击卡片 -->
  <LhCard clickable title="点击我" @click="onCardClick">…</LhCard>
</template>
```

```vue options
<script>
export default {
  methods: {
    onCardClick() {
      console.log('card clicked')
    },
  },
}
</script>

<template>
  <!-- 可点击卡片 -->
  <LhCard clickable title="点击我" @click="onCardClick">…</LhCard>
</template>
```

## 加载态

<DemoBlock title="加载态">
  <LhCard title="加载中" loading style="width: 100%; max-width: 300px" />
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhCard title="加载中" loading />
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhCard title="加载中" loading />
</template>
```

## Card API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
| title | 卡片标题（也可用 header 插槽） | `string` | — |
| shadow | 阴影显示时机 | `"always" \| "hover" \| "never"` | `'always'` |
| clickable | 整卡可点击（承担 button 键盘语义） | `boolean` | `false` |
| loading | 加载态：内容区以骨架占位 | `boolean` | `false` |
| themeVars | 组件级主题变量（键自动加 --lh- 前缀） | `{ [x: string]: string; }` | — |
| bgPattern | 花纹背景 URL（如 var(--lh-pattern-willow)），不受全局白名单限制 | `string` | — |
| sx | sx 快速布局属性 | `LhSxProps` | — |

### Events

| 事件 | 说明 | 参数 |
| ---- | ---- | ---- |
| click | 可点击卡片被点击（鼠标或键盘 Enter/Space 触发） | `(e: Event) => void` |

### 主题变量

以下 CSS 变量在 `.lh-card` 上定义默认值，可通过 `themeVars` 全局或组件级覆盖：

| 变量 | 说明 | 默认值 |
| ---- | ---- | ------ |
| `--lh-card-border-radius` | 圆角 | `border-radius-base + 2px` |
| `--lh-card-bg` | 背景色 | `--lh-bg-color` |
| `--lh-card-border-color` | 边框色 | `--lh-border-color-light` |
| `--lh-card-header-padding` / `--lh-card-body-padding` / `--lh-card-footer-padding` | 三区内边距 | `14px 20px` / `18px 20px` / `12px 20px` |
| `--lh-card-shadow` / `--lh-card-shadow-hover` | 常态/悬停阴影 | 暖墨色柔和双层阴影 |
| `--lh-card-loading-bg` / `--lh-card-loading-highlight` | 加载占位底色/流光高光 | `--lh-border-color-light` / 向纸色提亮的混合色 |

### Slots

| 插槽 | 说明 |
| ---- | ---- |
| header | 自定义标题区 |
| extra | 标题区右侧附加内容 |
| cover | 封面 |
| default | 主体内容 |
| footer | 底部 |

### 无障碍

- 可点击卡：`role="button"` + `tabindex="0"` + Enter/Space 激活（APG button pattern）
- 加载态：容器 `aria-busy="true"`，占位图形对屏读隐藏
- 键盘焦点环走 `:focus-visible`，鼠标点击不显示

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/card/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

<details id="type-LhCardProps">
<summary><code>LhCardProps</code></summary>

```ts
export interface LhCardProps {
  /** 卡片标题（也可用 header 插槽） */
  title?: string
  /** 阴影显示时机 */
  shadow?: LhCardShadow
  /** 整卡可点击（承担 button 键盘语义） */
  clickable?: boolean
  /** 加载态：内容区以骨架占位 */
  loading?: boolean
  /** 组件级主题变量（键自动加 --lh- 前缀） */
  themeVars?: Record<string, string>
  /** 花纹背景 URL（如 var(--lh-pattern-willow)），不受全局白名单限制 */
  bgPattern?: string
  /** sx 快速布局属性 */
  sx?: LhSxProps
}
```

</details>

<details id="type-LhCardShadow">
<summary><code>LhCardShadow</code> <sub>（来自 @lh-ui/share/core/card）</sub></summary>

```ts
/** 卡片阴影显示时机 */
export type LhCardShadow = 'always' | 'hover' | 'never'
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
function onCardClick() {}
</script>

<style scoped>
.demo-strong {
  font-weight: 600;
}

.demo-cover {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 140px;
  background: linear-gradient(135deg, rgba(44, 82, 130, 0.12), rgba(56, 161, 105, 0.12));
  color: var(--lh-text-secondary);
}
</style>
