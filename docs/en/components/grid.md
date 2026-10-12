# Grid

A 24-column grid implemented with **CSS Grid** (`grid-template-columns: repeat(24, 1fr)`); span / offset map straight onto `grid-column`.

## Basic usage

<DemoBlock title="Basic">
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
    <!-- span 12 -->
    <LhCol :span="12">span 12</LhCol>
    <!-- span 12 -->
    <LhCol :span="12">span 12</LhCol>
    <!-- span 8 -->
    <LhCol :span="8">span 8</LhCol>
    <!-- span 8 -->
    <LhCol :span="8">span 8</LhCol>
    <!-- span 8 -->
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
    <!-- span 12 -->
    <LhCol :span="12">span 12</LhCol>
    <!-- span 12 -->
    <LhCol :span="12">span 12</LhCol>
    <!-- span 8 -->
    <LhCol :span="8">span 8</LhCol>
    <!-- span 8 -->
    <LhCol :span="8">span 8</LhCol>
    <!-- span 8 -->
    <LhCol :span="8">span 8</LhCol>
  </LhRow>
</template>
```

## Offset and alignment

<DemoBlock title="Offset / align">
  <LhRow justify="center" align="middle" :gutter="12">
    <LhCol :span="6" :offset="3"><div class="grid-demo-cell">offset 3</div></LhCol>
    <LhCol :span="6"><div class="grid-demo-cell">centered</div></LhCol>
  </LhRow>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhRow justify="center" align="middle" :gutter="12">
    <LhCol :span="6" :offset="3">offset 3</LhCol>
    <LhCol :span="6">centered</LhCol>
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
    <LhCol :span="6">centered</LhCol>
  </LhRow>
</template>
```

## Wrap

Set `wrap` to `false` to force all columns onto a single line (combine with overflow for a horizontally scrolling grid).

<DemoBlock title="No wrap">
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
  <!-- No wrap -->
  <LhRow :wrap="false" :gutter="12">
    <!-- span 8 -->
    <LhCol :span="8">span 8</LhCol>
    <!-- span 8 -->
    <LhCol :span="8">span 8</LhCol>
    <!-- span 8 -->
    <LhCol :span="8">span 8</LhCol>
    <!-- span 8 -->
    <LhCol :span="8">span 8</LhCol>
  </LhRow>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- No wrap -->
  <LhRow :wrap="false" :gutter="12">
    <!-- span 8 -->
    <LhCol :span="8">span 8</LhCol>
    <!-- span 8 -->
    <LhCol :span="8">span 8</LhCol>
    <!-- span 8 -->
    <LhCol :span="8">span 8</LhCol>
    <!-- span 8 -->
    <LhCol :span="8">span 8</LhCol>
  </LhRow>
</template>
```

## Responsive breakpoints

Declare sizes per breakpoint with `xs / sm / md / lg / xl` (Tailwind thresholds: 640 / 768 / 1024 / 1280);
undeclared tiers fall back downward (xs is the catch-all), and `span` is used when no breakpoint is set. Resize the browser window to observe.

<DemoBlock title="Responsive">
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

## Push / pull

`push` / `pull` shift the start line right / left on top of `offset`, for fine-grained column alignment.

<DemoBlock title="Push / pull">
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

## Pull and responsive breakpoints

`pull` moves a column left by the given number of columns (opposite of `offset`); `xs` / `sm` / `md` / `lg` / `xl` declare span per breakpoint, and `sizes` declares them all at once.

<DemoBlock title="pull / breakpoints">
  <LhRow :gutter="12">
    <LhCol :span="8" :pull="2"><div class="grid-demo-cell">pull 2</div></LhCol>
    <LhCol :span="12" :xs="24" :sm="12" :lg="8"><div class="grid-demo-cell">Responsive</div></LhCol>
    <LhCol :span="10" :sizes="{ xs: 24, md: 12, xl: 6 }"><div class="grid-demo-cell">sizes</div></LhCol>
  </LhRow>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhRow :gutter="12">
    <LhCol :span="8" :pull="2">pull 2</LhCol>
    <LhCol :span="12" :xs="24" :sm="12" :lg="8">Responsive</LhCol>
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
    <LhCol :span="12" :xs="24" :sm="12" :lg="8">Responsive</LhCol>
    <LhCol :span="10" :sizes="{ xs: 24, md: 12, xl: 6 }">sizes</LhCol>
  </LhRow>
</template>
```

## API

### LhRow Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| justify | Main-axis distribution | `'start' \| 'center' \| 'end' \| 'space-between' \| 'space-around'` | `'start'` |
| align | Cross-axis alignment | `'top' \| 'middle' \| 'bottom'` | `'top'` |
| gutter | Column gap (px or [horizontal, vertical]) | `number \| [number, number]` | `0` |
| wrap | Wrap columns | `boolean` | `true` |
| sx | Quick layout props | `LhSxProps` | — |

### LhCol Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| span | Columns to occupy (24-column grid) | `number` | — |
| offset | Columns to offset from the left | `number` | — |
| push | Columns to push right | `number` | — |
| pull | Columns to pull left | `number` | — |
| xs | Below 640px (falls back downward) | `LhColSize` | — |
| sm | 640px and up | `LhColSize` | — |
| md | 768px and up | `LhColSize` | — |
| lg | 1024px and up | `LhColSize` | — |
| xl | 1280px and up | `LhColSize` | — |
| sizes | Per-breakpoint declaration (equivalent to xs~xl) | `Partial<Record<LhGridBreakpoint, LhColSize>>` | — |
| sx | Quick layout props | `LhSxProps` | — |

## Accessibility

- Layout-only component with no interactive semantics; use List / Table for semantic structures.

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## Type Definitions

The TypeScript type structures exported by this component (auto-extracted from `packages/components/grid/src/types.ts` and `@lh-ui/share/core/*` sources; click each entry to expand; see the Props table above for attribute descriptions):

<details id="type-LhRowJustify">
<summary><code>LhRowJustify</code></summary>

```ts
export type LhRowJustify = 'start' | 'center' | 'end' | 'space-between' | 'space-around'
```

</details>

<details id="type-LhRowAlign">
<summary><code>LhRowAlign</code></summary>

```ts
export type LhRowAlign = 'top' | 'middle' | 'bottom'
```

</details>

<details id="type-LhRowProps">
<summary><code>LhRowProps</code></summary>

```ts
export interface LhRowProps {
  justify?: LhRowJustify
  align?: LhRowAlign
  gutter?: number | [number, number]
  wrap?: boolean
  sx?: LhSxProps
}
```

</details>

<details id="type-LhColProps">
<summary><code>LhColProps</code></summary>

```ts
export interface LhColProps {
  span?: number
  offset?: number
  push?: number
  pull?: number
  xs?: LhColSize
  sm?: LhColSize
  md?: LhColSize
  lg?: LhColSize
  xl?: LhColSize
  sizes?: LhBreakpointSizes
  sx?: LhSxProps
}
```

</details>

<details id="type-LhColSize">
<summary><code>LhColSize</code> <sub>(from @lh-ui/share/core/grid)</sub></summary>

```ts
export type LhColSize = number | LhGridSpan
```

</details>

<details id="type-LhGridSpan">
<summary><code>LhGridSpan</code> <sub>(from @lh-ui/share/core/grid)</sub></summary>

```ts
export interface LhGridSpan {
  span?: number
  offset?: number
  push?: number
  pull?: number
}
```

</details>

<details id="type-LhBreakpointSizes">
<summary><code>LhBreakpointSizes</code> <sub>(from @lh-ui/share/core/grid)</sub></summary>

```ts
export type LhBreakpointSizes = Partial<Record<LhGridBreakpoint, LhColSize>>
```

</details>

<details id="type-LhGridBreakpoint">
<summary><code>LhGridBreakpoint</code> <sub>(from @lh-ui/share/core/grid)</sub></summary>

```ts
export type LhGridBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
```

</details>

### Constants

Public constants used by this component (linked from the Type / Default columns in the Props table above):

<details id="const-LH_GRID_COLUMNS">
<summary><code>LH_GRID_COLUMNS</code> <sub>(from @lh-ui/share/core/grid)</sub></summary>

```ts
export const LH_GRID_COLUMNS = 24
```

</details>

<details id="const-LH_GRID_BREAKPOINTS">
<summary><code>LH_GRID_BREAKPOINTS</code> <sub>(from @lh-ui/share/core/grid)</sub></summary>

```ts
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
<summary><code>LH_GRID_BREAKPOINT_ORDER</code> <sub>(from @lh-ui/share/core/grid)</sub></summary>

```ts
export const LH_GRID_BREAKPOINT_ORDER: LhGridBreakpoint[] = ['xl', 'lg', 'md', 'sm', 'xs']
```

</details>

<!-- lh-types:end -->
