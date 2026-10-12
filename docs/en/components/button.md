# Button

`LhButton` is used for various operations such as submitting forms and cancelling.

## Basic Usage

<DemoBlock title="Basic Usage">
  <LhButton>Default</LhButton>
  <LhButton type="primary">Primary</LhButton>
  <LhButton type="success">Success</LhButton>
  <LhButton type="warning">Warning</LhButton>
  <LhButton type="danger">Danger</LhButton>
  <LhButton type="info">Info</LhButton>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhButton } from '@lh-ui/vue3'
</script>

<template>
  <LhButton>Default</LhButton>
  <LhButton type="primary">Primary</LhButton>
  <LhButton type="success">Success</LhButton>
  <LhButton type="warning">Warning</LhButton>
  <LhButton type="danger">Danger</LhButton>
  <LhButton type="info">Info</LhButton>
</template>
```

```vue options
<script>
import { LhButton } from '@lh-ui/vue3'

export default {
  components: { LhButton },
}
</script>

<template>
  <LhButton>Default</LhButton>
  <LhButton type="primary">Primary</LhButton>
  <LhButton type="success">Success</LhButton>
  <LhButton type="warning">Warning</LhButton>
  <LhButton type="danger">Danger</LhButton>
  <LhButton type="info">Info</LhButton>
</template>
```

## Button Types

| Type | Description |
|------|-------------|
| default | Default button |
| primary | Primary action |
| success | Success action |
| warning | Warning action |
| danger | Danger action |
| info | Informational action |

## Size

<DemoBlock title="Size">
  <LhButton size="small">Small</LhButton>
  <LhButton size="medium">Medium</LhButton>
  <LhButton size="large">Large</LhButton>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhButton size="small">Small</LhButton>
  <LhButton size="medium">Medium</LhButton>
  <LhButton size="large">Large</LhButton>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhButton size="small">Small</LhButton>
  <LhButton size="medium">Medium</LhButton>
  <LhButton size="large">Large</LhButton>
</template>
```

## Loading State

<DemoBlock title="Loading">
  <LhButton type="primary" loading>Loading</LhButton>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhButton type="primary" loading>Loading</LhButton>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhButton type="primary" loading>Loading</LhButton>
</template>
```

## Disabled

<DemoBlock title="Disabled">
  <LhButton type="primary" disabled>Disabled</LhButton>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhButton type="primary" disabled>Disabled</LhButton>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhButton type="primary" disabled>Disabled</LhButton>
</template>
```

## Plain

<DemoBlock title="Plain">
  <div class="demo-row">
    <LhButton plain>Plain</LhButton>
    <LhButton type="primary" plain>Plain primary</LhButton>
    <LhButton type="success" plain>Plain success</LhButton>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- Plain -->
  <LhButton plain>Plain</LhButton>
  <!-- Plain primary -->
  <LhButton type="primary" plain>Plain primary</LhButton>
  <!-- Plain success -->
  <LhButton type="success" plain>Plain success</LhButton>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- Plain -->
  <LhButton plain>Plain</LhButton>
  <!-- Plain primary -->
  <LhButton type="primary" plain>Plain primary</LhButton>
  <!-- Plain success -->
  <LhButton type="success" plain>Plain success</LhButton>
</template>
```

## Block

<DemoBlock title="Block">
  <div style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
    <LhButton block>Block button</LhButton>
    <LhButton type="primary" block>Primary block</LhButton>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- Block button -->
  <LhButton block>Block button</LhButton>
  <!-- Primary block -->
  <LhButton type="primary" block>Primary block</LhButton>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- Block button -->
  <LhButton block>Block button</LhButton>
  <!-- Primary block -->
  <LhButton type="primary" block>Primary block</LhButton>
</template>
```

## Round & Circle

`round` gives a capsule shape with large corner radius; `circle` renders a perfect circle.

<DemoBlock title="Round & Circle">
  <div class="demo-row">
    <LhButton round>Round</LhButton>
    <LhButton type="primary" round>Round primary</LhButton>
    <LhButton circle>C</LhButton>
    <LhButton type="primary" circle>P</LhButton>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- Round -->
  <LhButton round>Round</LhButton>
  <!-- Round primary -->
  <LhButton type="primary" round>Round primary</LhButton>
  <!-- Circle -->
  <LhButton circle>C</LhButton>
  <!-- Circle primary -->
  <LhButton type="primary" circle>P</LhButton>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- Round -->
  <LhButton round>Round</LhButton>
  <!-- Round primary -->
  <LhButton type="primary" round>Round primary</LhButton>
  <!-- Circle -->
  <LhButton circle>C</LhButton>
  <!-- Circle primary -->
  <LhButton type="primary" circle>P</LhButton>
</template>
```

## Icon

The `icon` prop accepts an icon name; use the `#icon` slot for custom rendering.

<DemoBlock title="Icon">
  <div class="demo-row">
    <LhButton icon="search">Search</LhButton>
    <LhButton type="primary" icon="star">Star</LhButton>
    <LhButton circle>
      <template #icon>🔍</template>
    </LhButton>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- Search -->
  <LhButton icon="search">Search</LhButton>
  <!-- Star -->
  <LhButton type="primary" icon="star">Star</LhButton>
  <!-- Custom icon slot -->
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
  <!-- Search -->
  <LhButton icon="search">Search</LhButton>
  <!-- Star -->
  <LhButton type="primary" icon="star">Star</LhButton>
  <!-- Custom icon slot -->
  <LhButton circle>
    <template #icon>🔍</template>
  </LhButton>
</template>
```

## Link button

Setting `href` renders an `<a>` tag instead of `<button>`; `target` controls how the link opens. Without `href`, `native-type` sets the native button type.

<DemoBlock title="Link">
  <div class="demo-row">
    <LhButton href="https://github.com/lhgb-top/lh-ui-plus" target="_blank">GitHub</LhButton>
    <LhButton native-type="submit" type="primary">Submit (native-type)</LhButton>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhButton href="https://github.com/lhgb-top/lh-ui-plus" target="_blank">GitHub</LhButton>
  <LhButton native-type="submit" type="primary">Submit</LhButton>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhButton href="https://github.com/lhgb-top/lh-ui-plus" target="_blank">GitHub</LhButton>
  <LhButton native-type="submit" type="primary">Submit</LhButton>
</template>
```

## sx Quick Layout

Use the `sx` prop to quickly set spacing and sizing, without writing extra CSS.

<DemoBlock title="sx spacing">
  <LhButton type="primary" :sx="{ mt: 2, mx: 1 }">Margin top 2, horizontal margin 1</LhButton>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhButton } from '@lh-ui/vue3'
</script>

<template>
  <LhButton type="primary" :sx="{ mt: 2, mx: 1 }">Margin top 2, horizontal margin 1</LhButton>
</template>
```

```vue options
<script>
import { LhButton } from '@lh-ui/vue3'

export default {
  components: { LhButton },
}
</script>

<template>
  <LhButton type="primary" :sx="{ mt: 2, mx: 1 }">Margin top 2, horizontal margin 1</LhButton>
</template>
```

> `sx` is scaled on an `8px` base: `mt: 2` → `marginTop: 16px`, `mx: 1` → `marginLeft: 8px; marginRight: 8px`. See [sx Quick Layout](/en/guide/theme-customization#sx-quick-layout) for the full API.

## Props

| Prop | Description | Type | Default |
|------|-------------|------|---------|
| type | Button type | `"success" \| "warning" \| "error" \| "info" \| "danger" \| "default" \| "primary"` | `LH_BUTTON_TYPE_CONST.default` |
| size | Button size, inherited from ConfigProvider when unset | `"small" \| "medium" \| "large" \| "mini" \| "x-large"` | — |
| loading | Loading state | `boolean` | `false` |
| disabled | Disabled state | `boolean` | `false` |
| plain | Plain style | `boolean` | `false` |
| block | Block-level button | `boolean` | `false` |
| round | Rounded corners | `boolean` | `false` |
| circle | Circular button | `boolean` | `false` |
| icon | Icon name (a built-in LhIcon name such as `search`; override with the `icon` slot for custom rendering) | `LhIconName` | — |
| nativeType | Native button type (only when `href` is unset) | `"button" \| "submit" \| "reset"` | `'button'` |
| href | Link URL (renders an `<a>` instead of `<button>` when set) | `string` | `''` |
| target | Link open behavior | `string` | `'_self'` |
| themeVars | Component-level theme variables, overrides ConfigProvider | `{ [x: string]: string; }` | — |
| bgPattern | Component-level background pattern, overrides ConfigProvider | `string` | — |
| sx | sx quick-layout props | `LhSxProps` | — |

## Events

| Event | Description | Callback |
|-------|-------------|----------|
| click | Click event | `(e: MouseEvent) => void` |

## Slots

| Slot | Description |
|------|-------------|
| default | Button content |
| icon | Custom icon rendering (overrides the default `LhIcon` of the `icon` prop) |

## Accessibility

- **Keyboard focus ring**: the root element ships a unified `:focus-visible` ring (visible for keyboard navigation, not for mouse clicks), tinted with the `--lh-primary-color` theme variable; follows light/dark mode automatically, no configuration needed
- **Naming icon-only buttons**: when a button has an icon but no text (e.g. a circular icon button), screen readers cannot announce its purpose — always pass an `aria-label`, which falls through to the root element. Pass a built-in icon name to the `icon` prop (e.g. `icon="search"`); use the `icon` slot for rendering beyond the built-in icons:
  ```vue
  <LhButton circle aria-label="Search">
    <template #icon>
      <LhIcon name="search" />
    </template>
  </LhButton>
  ```
- **Motion**: the loading animation respects the system `prefers-reduced-motion` setting (spinners stop when reduced motion is requested)

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## Type Definitions

The TypeScript type structures exported by this component (auto-extracted from `packages/components/button/src/types.ts` and `@lh-ui/share/core/*` sources; click each entry to expand; see the Props table above for attribute descriptions):

<details id="type-LhButtonProps">
<summary><code>LhButtonProps</code></summary>

```ts
export interface LhButtonProps {
  type?: LhButtonType

  size?: LhButtonSize
  loading?: boolean
  disabled?: boolean
  plain?: boolean
  block?: boolean
  round?: boolean
  circle?: boolean

  icon?: LhIconName
  nativeType?: 'button' | 'submit' | 'reset'
  href?: string
  target?: string

  themeVars?: Record<string, string>

  bgPattern?: string

  sx?: LhSxProps
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
<summary><code>LhIconName</code> <sub>(from @lh-ui/share/core/icon (svgs.ts))</sub></summary>

```ts
export type LhIconName = keyof typeof LH_ICON_SVGS_CONST
```

</details>

<!-- lh-types:end -->
