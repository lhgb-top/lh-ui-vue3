# Grid 栅格

24 栅格制，**用 CSS Grid 实现**（`grid-template-columns: repeat(24, 1fr)`），span / offset 直接映射到 `grid-column`，无需 flex 百分比换算。

## 基础用法

<DemoBlock title="基础用法">
  <LhRow :gutter="12">
    <LhCol :span="12"><div class="grid-demo-cell">span 12</div></LhCol>
    <LhCol :span="12"><div class="grid-demo-cell">span 12</div></LhCol>
    <LhCol :span="8"><div class="grid-demo-cell">span 8</div></LhCol>
    <LhCol :span="8"><div class="grid-demo-cell">span 8</div></LhCol>
    <LhCol :span="8"><div class="grid-demo-cell">span 8</div></LhCol>
  </LhRow>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhRow :gutter="12">
    <LhCol :span="12">span 12</LhCol>
    <LhCol :span="12">span 12</LhCol>
    <LhCol :span="8">span 8</LhCol>
    <LhCol :span="8">span 8</LhCol>
    <LhCol :span="8">span 8</LhCol>
  </LhRow>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhRow :gutter="12">
    <LhCol :span="12">span 12</LhCol>
    <LhCol :span="12">span 12</LhCol>
    <LhCol :span="8">span 8</LhCol>
    <LhCol :span="8">span 8</LhCol>
    <LhCol :span="8">span 8</LhCol>
  </LhRow>
</template>
```

## 偏移与对齐

<DemoBlock title="偏移 / 对齐">
  <LhRow justify="center" align="middle" :gutter="12">
    <LhCol :span="6" :offset="3"><div class="grid-demo-cell">offset 3</div></LhCol>
    <LhCol :span="6"><div class="grid-demo-cell">居中</div></LhCol>
  </LhRow>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhRow justify="center" align="middle" :gutter="12">
    <LhCol :span="6" :offset="3">offset 3</LhCol>
    <LhCol :span="6">居中</LhCol>
  </LhRow>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhRow justify="center" align="middle" :gutter="12">
    <LhCol :span="6" :offset="3">offset 3</LhCol>
    <LhCol :span="6">居中</LhCol>
  </LhRow>
</template>
```

## 换行

`wrap` 关闭后子项强制单行排列（配合 overflow 可实现横向滚动栅格）。

<DemoBlock title="不换行">
  <LhRow :wrap="false" :gutter="12" style="overflow-x: auto">
    <LhCol :span="8"><div class="grid-demo-cell">span 8</div></LhCol>
    <LhCol :span="8"><div class="grid-demo-cell">span 8</div></LhCol>
    <LhCol :span="8"><div class="grid-demo-cell">span 8</div></LhCol>
    <LhCol :span="8"><div class="grid-demo-cell">span 8</div></LhCol>
  </LhRow>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- 不换行 -->
  <LhRow :wrap="false" :gutter="12">
    <LhCol :span="8">span 8</LhCol>
    <LhCol :span="8">span 8</LhCol>
    <LhCol :span="8">span 8</LhCol>
    <LhCol :span="8">span 8</LhCol>
  </LhRow>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- 不换行 -->
  <LhRow :wrap="false" :gutter="12">
    <LhCol :span="8">span 8</LhCol>
    <LhCol :span="8">span 8</LhCol>
    <LhCol :span="8">span 8</LhCol>
    <LhCol :span="8">span 8</LhCol>
  </LhRow>
</template>
```

## 响应式断点

`xs / sm / md / lg / xl` 分档声明尺寸（Tailwind 阈值：640 / 768 / 1024 / 1280）；
未声明的档位向下回退（xs 恒兜底），未声明任何断点时走 `span`。缩放浏览器窗口观察变化。

<DemoBlock title="响应式">
  <LhRow :gutter="12">
    <LhCol :span="24" :md="12" :xl="8"><div class="grid-demo-cell">span 24 / md 12 / xl 8</div></LhCol>
    <LhCol :span="24" :md="12" :xl="8"><div class="grid-demo-cell">span 24 / md 12 / xl 8</div></LhCol>
    <LhCol :span="24" :xl="8"><div class="grid-demo-cell">span 24 / xl 8</div></LhCol>
  </LhRow>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhRow :gutter="12">
    <LhCol :span="24" :md="12" :xl="8">span 24 / md 12 / xl 8</LhCol>
    <LhCol :span="24" :md="12" :xl="8">span 24 / md 12 / xl 8</LhCol>
    <LhCol :span="24" :xl="8">span 24 / xl 8</LhCol>
  </LhRow>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhRow :gutter="12">
    <LhCol :span="24" :md="12" :xl="8">span 24 / md 12 / xl 8</LhCol>
    <LhCol :span="24" :md="12" :xl="8">span 24 / md 12 / xl 8</LhCol>
    <LhCol :span="24" :xl="8">span 24 / xl 8</LhCol>
  </LhRow>
</template>
```

## 平移（push / pull）

`push` / `pull` 在 offset 基础上平移起点（右移 / 左移），用于列的对位微调。

<DemoBlock title="push / pull">
  <LhRow :gutter="12">
    <LhCol :span="8" :push="8"><div class="grid-demo-cell">span 8 push 8</div></LhCol>
    <LhCol :span="8"><div class="grid-demo-cell">span 8</div></LhCol>
  </LhRow>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhRow :gutter="12">
    <LhCol :span="8" :push="8">span 8 push 8</LhCol>
    <LhCol :span="8">span 8</LhCol>
  </LhRow>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhRow :gutter="12">
    <LhCol :span="8" :push="8">span 8 push 8</LhCol>
    <LhCol :span="8">span 8</LhCol>
  </LhRow>
</template>
```

## 后退与响应式

`pull` 让列向左退相应栏数（与 offset 相反）；`xs` / `sm` / `md` / `lg` / `xl` 按断点声明 span，`sizes` 可一次批量声明。

<DemoBlock title="pull / 响应式断点">
  <LhRow :gutter="12">
    <LhCol :span="8" :pull="2"><div class="grid-demo-cell">pull 2</div></LhCol>
    <LhCol :span="12" :xs="24" :sm="12" :lg="8"><div class="grid-demo-cell">响应式</div></LhCol>
    <LhCol :span="10" :sizes="{ xs: 24, md: 12, xl: 6 }"><div class="grid-demo-cell">sizes</div></LhCol>
  </LhRow>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhRow :gutter="12">
    <LhCol :span="8" :pull="2">pull 2</LhCol>
    <LhCol :span="12" :xs="24" :sm="12" :lg="8">响应式</LhCol>
    <LhCol :span="10" :sizes="{ xs: 24, md: 12, xl: 6 }">sizes</LhCol>
  </LhRow>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhRow :gutter="12">
    <LhCol :span="8" :pull="2">pull 2</LhCol>
    <LhCol :span="12" :xs="24" :sm="12" :lg="8">响应式</LhCol>
    <LhCol :span="10" :sizes="{ xs: 24, md: 12, xl: 6 }">sizes</LhCol>
  </LhRow>
</template>
```

## API

### LhRow Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| justify | 主轴上排列 | `'start' \| 'center' \| 'end' \| 'space-between' \| 'space-around'` | `'start'` |
| align | 交叉轴上对齐 | `'top' \| 'middle' \| 'bottom'` | `'top'` |
| gutter | 列间距（px 或 [横向, 纵向]） | `number \| [number, number]` | `0` |
| wrap | 是否换行 | `boolean` | `true` |
| sx | sx 快速布局属性 | `LhSxProps` | — |

### LhCol Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| span | 占据列数（24 栅格制） | `number` | — |
| offset | 左侧偏移列数 | `number` | — |
| push | 向右平移列数 | `number` | — |
| pull | 向左平移列数 | `number` | — |
| xs | <640px 生效（未声明时向下回退） | `LhColSize` | — |
| sm | ≥640px 生效 | `LhColSize` | — |
| md | ≥768px 生效 | `LhColSize` | — |
| lg | ≥1024px 生效 | `LhColSize` | — |
| xl | ≥1280px 生效 | `LhColSize` | — |
| sizes | 按断点批量声明（与 xs~xl 等价，任选其一） | `Partial<Record<LhGridBreakpoint, LhColSize>>` | — |
| sx | sx 快速布局属性 | `LhSxProps` | — |

## 无障碍

- 纯布局组件，无交互语义；请勿用栅格承载需要语义结构的列表（应使用 List / Table 等）

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/grid/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

<details id="type-LhRowJustify">
<summary><code>LhRowJustify</code></summary>

```ts
/** 子元素主轴上排列 */
export type LhRowJustify = 'start' | 'center' | 'end' | 'space-between' | 'space-around'
```

</details>

<details id="type-LhRowAlign">
<summary><code>LhRowAlign</code></summary>

```ts
/** 子元素交叉轴上对齐 */
export type LhRowAlign = 'top' | 'middle' | 'bottom'
```

</details>

<details id="type-LhRowProps">
<summary><code>LhRowProps</code></summary>

```ts
export interface LhRowProps {
  /** 主轴上排列 */
  justify?: LhRowJustify
  /** 交叉轴上对齐 */
  align?: LhRowAlign
  /** 列间距（px 或 [横向, 纵向]） */
  gutter?: number | [number, number]
  /** 是否换行 */
  wrap?: boolean
  /** sx 快速布局属性 */
  sx?: LhSxProps
}
```

</details>

<details id="type-LhColProps">
<summary><code>LhColProps</code></summary>

```ts
export interface LhColProps {
  /** 占据列数（24 栅格制） */
  span?: number
  /** 左侧偏移列数 */
  offset?: number
  /** 向右平移列数 */
  push?: number
  /** 向左平移列数 */
  pull?: number
  /** <640px 生效（未声明时向下回退到更小档） */
  xs?: LhColSize
  /** ≥640px 生效 */
  sm?: LhColSize
  /** ≥768px 生效 */
  md?: LhColSize
  /** ≥1024px 生效 */
  lg?: LhColSize
  /** ≥1280px 生效 */
  xl?: LhColSize
  /** 按断点批量声明的响应式尺寸（与 xs~xl 等价，任选其一） */
  sizes?: LhBreakpointSizes
  /** sx 快速布局属性 */
  sx?: LhSxProps
}
```

</details>

<details id="type-LhColSize">
<summary><code>LhColSize</code> <sub>（来自 @lh-ui/share/core/grid）</sub></summary>

```ts
/** Col 的尺寸配置：数字或对象（也支持按断点的对象） */
export type LhColSize = number | LhGridSpan
```

</details>

<details id="type-LhGridSpan">
<summary><code>LhGridSpan</code> <sub>（来自 @lh-ui/share/core/grid）</sub></summary>

```ts
/** 栅格尺寸（1-24 的 span，或带 offset 的对象） */
export interface LhGridSpan {
  span?: number
  offset?: number
  push?: number
  pull?: number
}
```

</details>

<details id="type-LhBreakpointSizes">
<summary><code>LhBreakpointSizes</code> <sub>（来自 @lh-ui/share/core/grid）</sub></summary>

```ts
/** 按断点声明的响应式尺寸（未声明的档位向下回退，xs 恒兜底） */
export type LhBreakpointSizes = Partial<Record<LhGridBreakpoint, LhColSize>>
```

</details>

<details id="type-LhGridBreakpoint">
<summary><code>LhGridBreakpoint</code> <sub>（来自 @lh-ui/share/core/grid）</sub></summary>

```ts
/** 栅格断点 */
export type LhGridBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
```

</details>

### 常量

本组件用到的公开常量如下（可在 Props 表的「类型 / 默认值」列点击同名条目跳转至此）：

<details id="const-LH_GRID_COLUMNS">
<summary><code>LH_GRID_COLUMNS</code> <sub>（来自 @lh-ui/share/core/grid）</sub></summary>

```ts
/** 栅格总列数 */
export const LH_GRID_COLUMNS = 24
```

</details>

<details id="const-LH_GRID_BREAKPOINTS">
<summary><code>LH_GRID_BREAKPOINTS</code> <sub>（来自 @lh-ui/share/core/grid）</sub></summary>

```ts
/**
 * 响应式断点（Tailwind 风格，宽度下限 px）：
 * xs 为默认档（<640），其余按「≥ 阈值」命中。
 */
export const LH_GRID_BREAKPOINTS: Record<LhGridBreakpoint, number> = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
}
```

</details>

<details id="const-LH_GRID_BREAKPOINT_ORDER">
<summary><code>LH_GRID_BREAKPOINT_ORDER</code> <sub>（来自 @lh-ui/share/core/grid）</sub></summary>

```ts
/** 断点从大到小的稳定顺序 */
export const LH_GRID_BREAKPOINT_ORDER: LhGridBreakpoint[] = ['xl', 'lg', 'md', 'sm', 'xs']
```

</details>

<!-- lh-types:end -->
