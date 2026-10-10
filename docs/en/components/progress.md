# Progress

`LhProgress` is used to show the current progress of an operation. Supports linear and circular forms with customizable colors and text.

## Basic Usage

<DemoBlock title="Linear Progress Bar">
  <LhProgress :percentage="60" />
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhProgress :percentage="60" />
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhProgress :percentage="60" />
</template>
```

## Status

<DemoBlock title="normal / success / warning / exception">
  <div style="display: flex; flex-direction: column; gap: 12px">
    <LhProgress :percentage="100" />
    <LhProgress :percentage="80" status="warning" />
    <LhProgress :percentage="40" status="exception" />
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <LhProgress :percentage="100" />
    <LhProgress :percentage="80" status="warning" />
    <LhProgress :percentage="40" status="exception" />
  </div>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <LhProgress :percentage="100" />
    <LhProgress :percentage="80" status="warning" />
    <LhProgress :percentage="40" status="exception" />
  </div>
</template>
```

## Custom Color & Text

<DemoBlock title="Custom Color & Text">
  <div style="display: flex; flex-direction: column; gap: 12px">
    <LhProgress :percentage="55" color="#B8860B" />
    <LhProgress
      :percentage="70"
      :color="(p: number) => `hsl(${p * 1.2}, 60%, 45%)`"
      :format="(p: number) => `${p} pts`"
    />
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <LhProgress :percentage="55" color="#B8860B" />
    <LhProgress
      :percentage="70"
      :color="(p: number) => `hsl(${p * 1.2}, 60%, 45%)`"
      :format="(p: number) => `${p} pts`"
    />
  </div>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <LhProgress :percentage="55" color="#B8860B" />
    <LhProgress
      :percentage="70"
      :color="(p: number) => `hsl(${p * 1.2}, 60%, 45%)`"
      :format="(p: number) => `${p} pts`"
    />
  </div>
</template>
```

## Circular Progress

<DemoBlock title="Circular Progress">
  <div style="display: flex; align-items: center; gap: 24px">
    <LhProgress type="circle" :percentage="75" />
    <LhProgress
      type="circle"
      :percentage="100"
      :width="100"
      :stroke-width="8"
    />
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <div style="display: flex; align-items: center; gap: 24px">
    <LhProgress type="circle" :percentage="75" />
    <LhProgress type="circle" :percentage="100" :width="100" :stroke-width="8" />
  </div>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <div style="display: flex; align-items: center; gap: 24px">
    <LhProgress type="circle" :percentage="75" />
    <LhProgress type="circle" :percentage="100" :width="100" :stroke-width="8" />
  </div>
</template>
```

## Hide Text

<DemoBlock title="Hide Text">
  <LhProgress :percentage="45" :show-text="false" />
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhProgress :percentage="45" :show-text="false" />
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhProgress :percentage="45" :show-text="false" />
</template>
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| percentage | Progress percentage (auto-clamped to 0-100) | `number` | `0` |
| type | Form | `"line" \| "circle"` | `'line'` |
| status | Status. When `normal`, auto becomes `success` at 100 | `"normal" \| "success" \| "warning" \| "exception"` | `'normal'` |
| color | Progress bar color: a string or a function returning a color by percentage | `string \| ((percentage: number) => string)` | — |
| strokeWidth | Line thickness in px (height for line, stroke width for circle) | `number` | `6` |
| width | Canvas width in px for circle mode | `number` | `126` |
| showText | Show text | `boolean` | `true` |
| format | Custom text formatter | `(percentage: number) => string` | — |
| sx | Quick layout props | `SxProps` | — |

### Slots

| Slot | Description | Scope |
| --- | --- | --- |
| text | Custom text content | `{ percentage }` |
### Accessibility

- The root carries `role="progressbar"` along with `aria-valuemin` / `aria-valuemax` / `aria-valuenow`, following the WAI-ARIA progressbar pattern
- `aria-valuetext` mirrors the visible text: the percentage by default, or the result of `format` (for example "42 pts")
- The clamped value is what reaches `aria-valuenow`, so announcements never leave the valid range

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## Type Definitions

The TypeScript type structures exported by this component (auto-extracted from `packages/components/progress/src/types.ts` and `@lh-ui/share/core/*` sources; click each entry to expand; see the Props table above for attribute descriptions):

<details id="type-LhProgressProps">
<summary><code>LhProgressProps</code></summary>

```ts
export interface LhProgressProps {
  percentage: number
  type?: LhProgressType
  status?: LhProgressStatus
  color?: string | ((percentage: number) => string)
  strokeWidth?: number
  width?: number
  showText?: boolean
  format?: (percentage: number) => string
  sx?: SxProps
}
```

</details>

<details id="type-LhProgressType">
<summary><code>LhProgressType</code> <sub>(from @lh-ui/share/core/progress)</sub></summary>

```ts
export type LhProgressType = 'line' | 'circle'
```

</details>

<details id="type-LhProgressStatus">
<summary><code>LhProgressStatus</code> <sub>(from @lh-ui/share/core/progress)</sub></summary>

```ts
export type LhProgressStatus = 'normal' | 'success' | 'warning' | 'exception'
```

</details>

<!-- lh-types:end -->
