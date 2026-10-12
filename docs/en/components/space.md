# Space

A layout container that applies uniform spacing between children, built on native CSS `gap`. Pure layout element (`role="presentation"`), invisible to the accessibility tree.

## Basic Usage

<DemoBlock title="Horizontal">
  <LhSpace>
    <LhButton>One</LhButton>
    <LhButton>Two</LhButton>
    <LhButton>Three</LhButton>
  </LhSpace>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhSpace>
    <LhButton>One</LhButton>
    <LhButton>Two</LhButton>
    <LhButton>Three</LhButton>
  </LhSpace>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhSpace>
    <LhButton>One</LhButton>
    <LhButton>Two</LhButton>
    <LhButton>Three</LhButton>
  </LhSpace>
</template>
```

## Vertical

<DemoBlock title="Vertical">
  <LhSpace direction="vertical">
    <LhButton>One</LhButton>
    <LhButton>Two</LhButton>
  </LhSpace>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhSpace direction="vertical">
    <LhButton>One</LhButton>
    <LhButton>Two</LhButton>
  </LhSpace>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhSpace direction="vertical">
    <LhButton>One</LhButton>
    <LhButton>Two</LhButton>
  </LhSpace>
</template>
```

## Size

Preset sizes map to `--lh-spacing-*` theme tokens; pixel numbers and `[horizontal, vertical]` arrays are also supported.

<DemoBlock title="Sizes">
  <div class="demo-space-sizes">
    <LhSpace size="small"><LhButton>small</LhButton><LhButton>small</LhButton></LhSpace>
    <LhSpace size="medium"><LhButton>medium</LhButton><LhButton>medium</LhButton></LhSpace>
    <LhSpace size="large"><LhButton>large</LhButton><LhButton>large</LhButton></LhSpace>
    <LhSpace :size="8"><LhButton>8px</LhButton><LhButton>8px</LhButton></LhSpace>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- small preset -->
  <LhSpace size="small">
    <LhButton>small</LhButton>
    <LhButton>small</LhButton>
  </LhSpace>
  <!-- medium preset -->
  <LhSpace size="medium">
    <LhButton>medium</LhButton>
    <LhButton>medium</LhButton>
  </LhSpace>
  <!-- large preset -->
  <LhSpace size="large">
    <LhButton>large</LhButton>
    <LhButton>large</LhButton>
  </LhSpace>
  <!-- custom pixel size -->
  <LhSpace :size="8">
    <LhButton>8px</LhButton>
    <LhButton>8px</LhButton>
  </LhSpace>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- small preset -->
  <LhSpace size="small">
    <LhButton>small</LhButton>
    <LhButton>small</LhButton>
  </LhSpace>
  <!-- medium preset -->
  <LhSpace size="medium">
    <LhButton>medium</LhButton>
    <LhButton>medium</LhButton>
  </LhSpace>
  <!-- large preset -->
  <LhSpace size="large">
    <LhButton>large</LhButton>
    <LhButton>large</LhButton>
  </LhSpace>
  <!-- custom pixel size -->
  <LhSpace :size="8">
    <LhButton>8px</LhButton>
    <LhButton>8px</LhButton>
  </LhSpace>
</template>
```

## Wrap

<DemoBlock title="Wrap">
  <LhSpace wrap>
    <LhTag v-for="n in 12" :key="n">Tag {{ n }}</LhTag>
  </LhSpace>
</DemoBlock>

`alignment` controls how children align on the cross axis; the default is centered.

<DemoBlock title="Alignment">
  <LhSpace alignment="start">
    <LhButton>start aligned</LhButton>
    <span style="height: 48px; line-height: 48px">Taller item</span>
  </LhSpace>
  <LhSpace alignment="end">
    <LhButton>end aligned</LhButton>
    <span style="height: 48px; line-height: 48px">Taller item</span>
  </LhSpace>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- allow wrapping -->
  <LhSpace wrap>
    <LhTag v-for="n in 12" :key="n">Tag {{ n }}</LhTag>
  </LhSpace>
  <!-- start alignment -->
  <LhSpace alignment="start">
    <LhButton>start aligned</LhButton>
    <span style="height: 48px; line-height: 48px">Taller item</span>
  </LhSpace>
  <!-- end alignment -->
  <LhSpace alignment="end">
    <LhButton>end aligned</LhButton>
    <span style="height: 48px; line-height: 48px">Taller item</span>
  </LhSpace>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- allow wrapping -->
  <LhSpace wrap>
    <LhTag v-for="n in 12" :key="n">Tag {{ n }}</LhTag>
  </LhSpace>
  <!-- start alignment -->
  <LhSpace alignment="start">
    <LhButton>start aligned</LhButton>
    <span style="height: 48px; line-height: 48px">Taller item</span>
  </LhSpace>
  <!-- end alignment -->
  <LhSpace alignment="end">
    <LhButton>end aligned</LhButton>
    <span style="height: 48px; line-height: 48px">Taller item</span>
  </LhSpace>
</template>
```

## API

### Props

| Prop | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| direction | Layout direction | `"horizontal" \| "vertical"` | `'horizontal'` |
| size | Spacing: preset / pixels / `[horizontal, vertical]` | `number \| "small" \| "medium" \| "large" \| [number, number]` | `'medium'` |
| wrap | Allow wrapping (horizontal only) | `boolean` | `true` |
| alignment | Alignment | `"start" \| "center" \| "end" \| "baseline"` | `'start'` |
| sx | Shorthand layout props (e.g. `{ mt: 2 }`), merged into the inline styles and taking precedence over `alignment` | `LhSxProps` | — |

### Accessibility

- The container is a `role="presentation"` layout element and never captures focus
- Spacing uses native CSS `gap` — children are not wrapped in extra DOM

<style scoped>
.demo-space-sizes {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## Type Definitions

The TypeScript type structures exported by this component (auto-extracted from `packages/components/space/src/types.ts` and `@lh-ui/share/core/*` sources; click each entry to expand; see the Props table above for attribute descriptions):

<details id="type-LhSpaceProps">
<summary><code>LhSpaceProps</code></summary>

```ts
export interface LhSpaceProps {
  direction?: 'horizontal' | 'vertical'
  size?: LhSpaceSizeInput
  wrap?: boolean
  alignment?: LhSpaceAlignment
  sx?: LhSxProps
}
```

</details>

<details id="type-LhSpaceSizeInput">
<summary><code>LhSpaceSizeInput</code> <sub>(from @lh-ui/share/core/space)</sub></summary>

```ts
export type LhSpaceSizeInput = 'small' | 'medium' | 'large' | number | [number, number]
```

</details>

<details id="type-LhSpaceAlignment">
<summary><code>LhSpaceAlignment</code> <sub>(from @lh-ui/share/core/space)</sub></summary>

```ts
export type LhSpaceAlignment = 'start' | 'center' | 'end' | 'baseline'
```

</details>

<!-- lh-types:end -->
