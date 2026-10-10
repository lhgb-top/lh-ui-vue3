# Tooltip

`LhTooltip` displays a message when hovering over an element.

## Basic Usage

<DemoBlock title="Basic Usage">
  <LhTooltip content="Tooltip message">
    <LhButton>Hover me</LhButton>
  </LhTooltip>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhTooltip, LhButton } from '@lh-ui/vue3'
</script>

<template>
  <!-- Basic usage -->
  <LhTooltip content="Tooltip message">
    <LhButton>Hover me</LhButton>
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
  <!-- Basic usage -->
  <LhTooltip content="Tooltip message">
    <LhButton>Hover me</LhButton>
  </LhTooltip>
</template>
```

## Placements

<DemoBlock title="Placements">
  <div style="display: flex; gap: 12px; justify-content: center; padding: 40px;">
    <LhTooltip content="Top" placement="top">
      <LhButton>Top</LhButton>
    </LhTooltip>
    <LhTooltip content="Bottom" placement="bottom">
      <LhButton>Bottom</LhButton>
    </LhTooltip>
    <LhTooltip content="Left" placement="left">
      <LhButton>Left</LhButton>
    </LhTooltip>
    <LhTooltip content="Right" placement="right">
      <LhButton>Right</LhButton>
    </LhTooltip>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <div style="display: flex; gap: 12px; justify-content: center; padding: 40px;">
    <!-- Top -->
    <LhTooltip content="Top" placement="top">
      <LhButton>Top</LhButton>
    </LhTooltip>
    <!-- Bottom -->
    <LhTooltip content="Bottom" placement="bottom">
      <LhButton>Bottom</LhButton>
    </LhTooltip>
    <!-- Left -->
    <LhTooltip content="Left" placement="left">
      <LhButton>Left</LhButton>
    </LhTooltip>
    <!-- Right -->
    <LhTooltip content="Right" placement="right">
      <LhButton>Right</LhButton>
    </LhTooltip>
  </div>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <div style="display: flex; gap: 12px; justify-content: center; padding: 40px;">
    <!-- Top -->
    <LhTooltip content="Top" placement="top">
      <LhButton>Top</LhButton>
    </LhTooltip>
    <!-- Bottom -->
    <LhTooltip content="Bottom" placement="bottom">
      <LhButton>Bottom</LhButton>
    </LhTooltip>
    <!-- Left -->
    <LhTooltip content="Left" placement="left">
      <LhButton>Left</LhButton>
    </LhTooltip>
    <!-- Right -->
    <LhTooltip content="Right" placement="right">
      <LhButton>Right</LhButton>
    </LhTooltip>
  </div>
</template>
```

## Delay

<DemoBlock title="Delay">
  <LhTooltip content="Delayed tooltip" :show-after="1000">
    <LhButton>1s delay</LhButton>
  </LhTooltip>
  <LhTooltip content="Shows after 300ms, hides after 500ms" :open-delay="300" :close-delay="500">
    <LhButton>open-delay / close-delay</LhButton>
  </LhTooltip>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhTooltip, LhButton } from '@lh-ui/vue3'
</script>

<template>
  <!-- 1s show delay -->
  <LhTooltip content="Delayed tooltip" :show-after="1000">
    <LhButton>1s delay</LhButton>
  </LhTooltip>
  <!-- open-delay / close-delay -->
  <LhTooltip content="Shows after 300ms, hides after 500ms" :open-delay="300" :close-delay="500">
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
  <!-- 1s show delay -->
  <LhTooltip content="Delayed tooltip" :show-after="1000">
    <LhButton>1s delay</LhButton>
  </LhTooltip>
  <!-- open-delay / close-delay -->
  <LhTooltip content="Shows after 300ms, hides after 500ms" :open-delay="300" :close-delay="500">
    <LhButton>open-delay / close-delay</LhButton>
  </LhTooltip>
</template>
```

## sx Quick Layout

Use the `sx` prop to quickly adjust spacing and sizing on the trigger root element, without writing extra CSS.

<DemoBlock title="sx spacing">
  <LhTooltip content="sx applies to the trigger root element" :sx="{ mt: 2, ml: 2 }">
    <LhButton type="primary">Margin top 2, margin left 2</LhButton>
  </LhTooltip>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhTooltip, LhButton } from '@lh-ui/vue3'
</script>

<template>
  <!-- sx spacing -->
  <LhTooltip content="sx applies to the trigger root element" :sx="{ mt: 2, ml: 2 }">
    <LhButton type="primary">Margin top 2, margin left 2</LhButton>
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
  <!-- sx spacing -->
  <LhTooltip content="sx applies to the trigger root element" :sx="{ mt: 2, ml: 2 }">
    <LhButton type="primary">Margin top 2, margin left 2</LhButton>
  </LhTooltip>
</template>
```

> `sx` is scaled on an `8px` base: `mt: 2` → `marginTop: 16px`, `ml: 2` → `marginLeft: 16px`. See [sx Quick Layout](/en/guide/theme-customization#sx-quick-layout) for the full API.

## Trigger & State

Use `trigger` to choose the trigger mode; `disabled` disables the tooltip; `manual` together with `visible` gives manual control; `hideAfter` delays hiding.

<DemoBlock title="Trigger & State">
  <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
    <LhTooltip content="Click to trigger" trigger="click">
      <LhButton>Click trigger</LhButton>
    </LhTooltip>
    <LhTooltip content="Focus to trigger" trigger="focus">
      <LhButton>Focus trigger</LhButton>
    </LhTooltip>
    <LhTooltip content="Disabled tooltip" disabled>
      <LhButton type="info" disabled>Disabled</LhButton>
    </LhTooltip>
    <LhTooltip content="Manually controlled" manual :visible="manualVisible">
      <LhButton @click="manualVisible = !manualVisible">Toggle manually</LhButton>
    </LhTooltip>
    <LhTooltip content="Hides after 1s" :hide-after="1000">
      <LhButton>Hide delay</LhButton>
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
  <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
    <!-- Click trigger -->
    <LhTooltip content="Click to trigger" trigger="click">
      <LhButton>Click trigger</LhButton>
    </LhTooltip>
    <!-- Focus trigger -->
    <LhTooltip content="Focus to trigger" trigger="focus">
      <LhButton>Focus trigger</LhButton>
    </LhTooltip>
    <!-- Disabled -->
    <LhTooltip content="Disabled tooltip" disabled>
      <LhButton type="info" disabled>Disabled</LhButton>
    </LhTooltip>
    <!-- Manual -->
    <LhTooltip content="Manually controlled" manual :visible="manualVisible">
      <LhButton @click="manualVisible = !manualVisible">Toggle manually</LhButton>
    </LhTooltip>
    <!-- Hide delay -->
    <LhTooltip content="Hides after 1s" :hide-after="1000">
      <LhButton>Hide delay</LhButton>
    </LhTooltip>
  </div>
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
  <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
    <!-- Click trigger -->
    <LhTooltip content="Click to trigger" trigger="click">
      <LhButton>Click trigger</LhButton>
    </LhTooltip>
    <!-- Focus trigger -->
    <LhTooltip content="Focus to trigger" trigger="focus">
      <LhButton>Focus trigger</LhButton>
    </LhTooltip>
    <!-- Disabled -->
    <LhTooltip content="Disabled tooltip" disabled>
      <LhButton type="info" disabled>Disabled</LhButton>
    </LhTooltip>
    <!-- Manual -->
    <LhTooltip content="Manually controlled" manual :visible="manualVisible">
      <LhButton @click="manualVisible = !manualVisible">Toggle manually</LhButton>
    </LhTooltip>
    <!-- Hide delay -->
    <LhTooltip content="Hides after 1s" :hide-after="1000">
      <LhButton>Hide delay</LhButton>
    </LhTooltip>
  </div>
</template>
```

> `openDelay` / `closeDelay` are aliases of `showAfter` / `hideAfter` — pick whichever you prefer.

## Theme & Appearance

Use `effect` to switch between dark and light themes, `bgColor` for a custom background color, `maxWidth` to cap the width, and `teleportTarget` to choose where the popper mounts.

<DemoBlock title="Theme & Appearance">
  <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
    <LhTooltip content="Dark theme" effect="dark">
      <LhButton>Dark theme</LhButton>
    </LhTooltip>
    <LhTooltip content="Light theme" effect="light">
      <LhButton>Light theme</LhButton>
    </LhTooltip>
    <LhTooltip content="Custom background color" bg-color="#5a3fa8">
      <LhButton>Custom background</LhButton>
    </LhTooltip>
    <LhTooltip content="This is a long text that gets wrapped within the 160px maxWidth" :max-width="160">
      <LhButton>Max width 160px</LhButton>
    </LhTooltip>
    <LhTooltip content="Popper mounted to #app" teleport-target="#app">
      <LhButton>Custom mount target</LhButton>
    </LhTooltip>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhTooltip, LhButton } from '@lh-ui/vue3'
</script>

<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
    <!-- Dark theme -->
    <LhTooltip content="Dark theme" effect="dark">
      <LhButton>Dark theme</LhButton>
    </LhTooltip>
    <!-- Light theme -->
    <LhTooltip content="Light theme" effect="light">
      <LhButton>Light theme</LhButton>
    </LhTooltip>
    <!-- Custom background -->
    <LhTooltip content="Custom background color" bg-color="#5a3fa8">
      <LhButton>Custom background</LhButton>
    </LhTooltip>
    <!-- Max width -->
    <LhTooltip content="This is a long text that gets wrapped within the 160px maxWidth" :max-width="160">
      <LhButton>Max width 160px</LhButton>
    </LhTooltip>
    <!-- Teleport target -->
    <LhTooltip content="Popper mounted to #app" teleport-target="#app">
      <LhButton>Custom mount target</LhButton>
    </LhTooltip>
  </div>
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
  <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
    <!-- Dark theme -->
    <LhTooltip content="Dark theme" effect="dark">
      <LhButton>Dark theme</LhButton>
    </LhTooltip>
    <!-- Light theme -->
    <LhTooltip content="Light theme" effect="light">
      <LhButton>Light theme</LhButton>
    </LhTooltip>
    <!-- Custom background -->
    <LhTooltip content="Custom background color" bg-color="#5a3fa8">
      <LhButton>Custom background</LhButton>
    </LhTooltip>
    <!-- Max width -->
    <LhTooltip content="This is a long text that gets wrapped within the 160px maxWidth" :max-width="160">
      <LhButton>Max width 160px</LhButton>
    </LhTooltip>
    <!-- Teleport target -->
    <LhTooltip content="Popper mounted to #app" teleport-target="#app">
      <LhButton>Custom mount target</LhButton>
    </LhTooltip>
  </div>
</template>
```

## Props

| Prop | Description | Type | Default |
|------|-------------|------|---------|
| content | Tooltip content | `string` | `''` |
| placement | Placement | `"top" \| "top-start" \| "top-end" \| "bottom" \| "bottom-start" \| "bottom-end" \| "left" \| "left-start" \| "left-end" \| "right" \| "right-start" \| "right-end"` | `'top'` |
| trigger | Trigger mode | `"hover" \| "click" \| "focus"` | `'hover'` |
| disabled | Whether disabled | `boolean` | `false` |
| manual | Whether visibility is manually controlled | `boolean` | `false` |
| visible | Manually controlled visibility | `boolean` | — |
| showAfter | Delay before showing (ms) | `number` | `0` |
| hideAfter | Delay before hiding (ms) | `number` | `0` |
| openDelay | Delay before showing (ms), alias of showAfter | `number` | — |
| closeDelay | Delay before closing | `number` | — |
| effect | Theme | `"dark" \| "light"` | `'dark'` |
| type | Built-in theme color type (overrides the effect background color) | `"primary" \| "success" \| "warning" \| "danger" \| "info"` | — |
| bgColor | Custom background color (overrides the effect and type background colors) | `string` | — |
| maxWidth | Max width | `string \| number` | `'200px'` |
| teleportTarget | Teleport target (selector or element, defaults to body) | `string \| HTMLElement` | `'body'` |
| themeVars | Component-level theme variables, overriding the ConfigProvider configuration | `{ [x: string]: string; }` | — |
| bgPattern | Component-level background pattern, overriding the ConfigProvider configuration | `string` | — |
| sx | sx quick layout props (applied to the trigger root element) | `SxProps` | — |

> Note: the `'click'` value of `trigger` is not implemented yet (it currently behaves like `'hover'`); click-to-toggle will arrive in a later version.

## Slots

| Slot | Description |
|------|-------------|
| default | Trigger element (the tooltip body is set via the `content` prop) |

## Methods

Exposed via component `ref`:

| Method | Description |
|--------|-------------|
| show | Show the tooltip immediately |
| hide | Hide the tooltip immediately |
| toggle | Toggle tooltip visibility |

## Accessibility

- The popper carries `role="tooltip"`; while visible, the trigger root automatically sets `aria-describedby` pointing to it, and the attribute is removed when hidden — no dangling references
- **Keyboard reachable**: with the `hover` / `focus` trigger modes, keyboard focus entering the trigger (`focusin`) shows the tooltip as well, and it hides on blur — aligned with the WAI-ARIA APG tooltip pattern; the `click` mode does not respond to focus
- Place a focusable element (button, link, …) inside the trigger — plain text cannot receive keyboard focus, leaving the tooltip unreachable for keyboard users

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## Type Definitions

The TypeScript type structures exported by this component (auto-extracted from `packages/components/tooltip/src/types.ts` and `@lh-ui/share/core/*` sources; click each entry to expand; see the Props table above for attribute descriptions):

<details id="type-LhTooltipPlacement">
<summary><code>LhTooltipPlacement</code></summary>

```ts
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
export interface LhTooltipProps {
  content?: string
  placement?: LhTooltipPlacement
  trigger?: LhTooltipTrigger
  disabled?: boolean
  manual?: boolean
  visible?: boolean
  showAfter?: number
  hideAfter?: number
  openDelay?: number
  closeDelay?: number
  effect?: LhTooltipEffect
  type?: LhTooltipType
  bgColor?: string
  maxWidth?: string | number
  teleportTarget?: string | HTMLElement
  themeVars?: Record<string, string>
  bgPattern?: string
  sx?: SxProps
}
```

</details>

<!-- lh-types:end -->
<script setup>
import { ref } from 'vue'
// Page-level declaration: the live manual-control DemoBlock depends on this state
const manualVisible = ref(false)
</script>
