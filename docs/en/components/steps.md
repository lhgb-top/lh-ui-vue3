# Steps

Process step indicator with wait/process/finish/error states, horizontal/vertical directions and optional clickable navigation.

## Basic Usage

<DemoBlock title="Basic Usage">
  <LhSteps :current="1">
    <LhStep title="Grind" />
    <LhStep title="Paint" />
    <LhStep title="Seal" />
  </LhSteps>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhSteps :current="1">
    <LhStep title="Grind" />
    <LhStep title="Paint" />
    <LhStep title="Seal" />
  </LhSteps>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhSteps :current="1">
    <LhStep title="Grind" />
    <LhStep title="Paint" />
    <LhStep title="Seal" />
  </LhSteps>
</template>
```

## With Descriptions

<DemoBlock title="With Descriptions">
  <LhSteps :current="1">
    <LhStep title="Register" description="Fill in the basics" />
    <LhStep title="Verify" description="Email and phone" />
    <LhStep title="Activate" description="Grant permissions" />
  </LhSteps>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhSteps :current="1">
    <LhStep title="Register" description="Fill in the basics" />
    <LhStep title="Verify" description="Email and phone" />
    <LhStep title="Activate" description="Grant permissions" />
  </LhSteps>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhSteps :current="1">
    <LhStep title="Register" description="Fill in the basics" />
    <LhStep title="Verify" description="Email and phone" />
    <LhStep title="Activate" description="Grant permissions" />
  </LhSteps>
</template>
```

The `icon` prop sets a custom icon per step (a built-in `LhIcon` name such as `user`/`check`/`star`); without it, finished/error steps show a check/cross and the rest show their index. Use the `#icon` slot to fully customize the icon rendering.

<DemoBlock title="Custom icons">
  <LhSteps :current="1">
    <LhStep icon="user" title="Register" />
    <LhStep icon="check" title="Verify" />
    <LhStep icon="star" title="Activate" />
  </LhSteps>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhSteps :current="1">
    <LhStep icon="user" title="Register" />
    <LhStep icon="check" title="Verify" />
    <LhStep icon="star" title="Activate" />
  </LhSteps>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhSteps :current="1">
    <LhStep icon="user" title="Register" />
    <LhStep icon="check" title="Verify" />
    <LhStep icon="star" title="Activate" />
  </LhSteps>
</template>
```

## Error Status

<DemoBlock title="Error Status">
  <LhSteps :current="1" status="error">
    <LhStep title="Upload" />
    <LhStep title="Validate" />
    <LhStep title="Finish" />
  </LhSteps>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhSteps :current="1" status="error">
    <LhStep title="Upload" />
    <LhStep title="Validate" />
    <LhStep title="Finish" />
  </LhSteps>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhSteps :current="1" status="error">
    <LhStep title="Upload" />
    <LhStep title="Validate" />
    <LhStep title="Finish" />
  </LhSteps>
</template>
```

> `status` overrides every step globally — handy for custom presentations.

## Clickable Navigation

<DemoBlock title="Clickable Navigation">
  <LhSteps v-model:current="current" clickable>
    <LhStep title="Pick" description="Choose a model" />
    <LhStep title="Trace" description="Trace or recall" />
    <LhStep title="Mount" description="Mount the work" />
  </LhSteps>
  <p class="demo-steps-current">Current step: {{ current }}</p>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
const current = ref(1)
</script>

<template>
  <LhSteps v-model:current="current" clickable>
    <LhStep title="Pick" description="Choose a model" />
    <LhStep title="Trace" description="Trace or recall" />
    <LhStep title="Mount" description="Mount the work" />
  </LhSteps>
</template>
```

```vue options
<script>
export default {
  data() {
    return { current: 1 }
  },
}
</script>

<template>
  <LhSteps v-model:current="current" clickable>
    <LhStep title="Pick" description="Choose a model" />
    <LhStep title="Trace" description="Trace or recall" />
    <LhStep title="Mount" description="Mount the work" />
  </LhSteps>
</template>
```

## Vertical Direction

<DemoBlock title="Vertical Direction">
  <LhSteps :current="1" direction="vertical">
    <LhStep title="Start" description="Hidden tip" />
    <LhStep title="Move" description="Centered stroke" />
    <LhStep title="Rest" description="Return the brush" />
  </LhSteps>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhSteps :current="1" direction="vertical">
    <LhStep title="Start" description="Hidden tip" />
    <LhStep title="Move" description="Centered stroke" />
    <LhStep title="Rest" description="Return the brush" />
  </LhSteps>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhSteps :current="1" direction="vertical">
    <LhStep title="Start" description="Hidden tip" />
    <LhStep title="Move" description="Centered stroke" />
    <LhStep title="Rest" description="Return the brush" />
  </LhSteps>
</template>
```

## Steps API

### LhSteps Props

| Prop | Description | Type | Default |
|------|-------------|------|---------|
| current | Current step index (`v-model:current`, 0-based) | `number` | `0` |
| direction | Direction | `"horizontal" \| "vertical"` | `'horizontal'` |
| clickable | Whether steps can be clicked for navigation | `boolean` | `false` |
| status | Overrides the status of all steps globally (for custom presentations) | `"wait" \| "process" \| "finish" \| "error"` | — |
| sx | Quick layout props | `SxProps` | — |

### LhSteps Events

| Event | Description | Callback |
|-------|-------------|----------|
| update:current | Current step changed (v-model) | `(index: number)` |
| change | Current step changed | `(index: number)` |

### LhStep Props

| Prop | Description | Type | Default |
|------|-------------|------|---------|
| title | Step title (or the `title` slot) | `string` | `''` |
| description | Step description (or the `description` slot) | `string` | `''` |
| icon | Custom icon name (a built-in LhIcon name; defaults to check/cross for finish/error, otherwise the index) | `LhIconName` | — |

### Slots

| Slot | Description | Component |
|------|-------------|-----------|
| default | Step items (LhStep list) | LhSteps |
| title | Custom title | LhStep |
| description | Custom description | LhStep |
| icon | Custom icon (overrides the `icon` prop's default rendering) | LhStep |
| description | Custom description | LhStep |

### Accessibility

- The container is `<ol role="list">`; semantic order matches the process order
- The current step automatically gets `aria-current="step"`
- With `clickable`, the head of finished/current steps is a real `<button>` whose aria-label comes from the locale (`steps.finish` / `steps.error` / `steps.step`); waiting steps are not clickable so users are not invited to skip ahead
- Connectors are drawn with pseudo-elements and never enter the accessibility tree

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## Type Definitions

The TypeScript type structures exported by this component (auto-extracted from `packages/components/steps/src/types.ts` and `@lh-ui/share/core/*` sources; click each entry to expand; see the Props table above for attribute descriptions):

<details id="type-LhStepsProps">
<summary><code>LhStepsProps</code></summary>

```ts
export interface LhStepsProps {
  current?: number
  direction?: LhStepsDirection
  clickable?: boolean
  status?: LhStepStatus
  sx?: SxProps
}
```

</details>

<details id="type-LhStepProps">
<summary><code>LhStepProps</code></summary>

```ts
export interface LhStepProps {
  title?: string
  description?: string
  icon?: LhIconName
}
```

</details>

<details id="type-LhIconName">
<summary><code>LhIconName</code> <sub>(from @lh-ui/share/core/icon (svgs.ts))</sub></summary>

```ts
export type LhIconName = keyof typeof LH_ICON_SVGS_CONST
```

</details>

<details id="type-LhStepsDirection">
<summary><code>LhStepsDirection</code> <sub>(from @lh-ui/share/core/steps)</sub></summary>

```ts
export type LhStepsDirection = 'horizontal' | 'vertical'
```

</details>

<details id="type-LhStepStatus">
<summary><code>LhStepStatus</code> <sub>(from @lh-ui/share/core/steps)</sub></summary>

```ts
export type LhStepStatus = 'wait' | 'process' | 'finish' | 'error'
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
import { ref } from 'vue'
const current = ref(1)
</script>
