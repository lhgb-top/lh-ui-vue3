# Message

Lightweight global feedback for one-shot operation results. Primarily an imperative service API (`LhMessage.success(...)`); messages render in an isolated container outside the component tree, and the queue evicts the oldest message when full.

## Basic usage

<DemoBlock title="Basic">
  <LhButton @click="showBasic">Show message</LhButton>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhMessage } from '@lh-ui/vue3'

const showBasic = () => {
  LhMessage('This is a message')
}
</script>

<template>
  <LhButton @click="showBasic">Show message</LhButton>
</template>
```

```vue options
<script>
import { LhMessage } from '@lh-ui/vue3'

export default {
  methods: {
    showBasic() {
      LhMessage('This is a message')
    },
  },
}
</script>

<template>
  <LhButton @click="showBasic">Show message</LhButton>
</template>
```

## Semantic types

Four semantics plus loading; warning / danger / error announce assertively via `role="alert"`, the rest politely.

<DemoBlock title="Types">
  <div class="demo-message-row">
    <LhButton @click="showInfo">Info</LhButton>
    <LhButton @click="showSuccess">Success</LhButton>
    <LhButton @click="showWarning">Warning</LhButton>
    <LhButton @click="showDanger">Danger</LhButton>
    <LhButton @click="showLoading">Loading (manual close)</LhButton>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhMessage } from '@lh-ui/vue3'

const showInfo = () => LhMessage.info('Info message')
const showSuccess = () => LhMessage.success('Saved')
const showWarning = () => LhMessage.warning('Proceed with caution')
const showDanger = () => LhMessage.danger('Operation failed')
const showLoading = () => {
  const handle = LhMessage.loading('Syncing…')
  setTimeout(() => handle.close(), 2000)
}
</script>

<template>
  <div class="demo-message-row">
    <LhButton @click="showInfo">Info</LhButton>
    <LhButton @click="showSuccess">Success</LhButton>
    <LhButton @click="showWarning">Warning</LhButton>
    <LhButton @click="showDanger">Danger</LhButton>
    <LhButton @click="showLoading">Loading (manual close)</LhButton>
  </div>
</template>
```

```vue options
<script>
import { LhMessage } from '@lh-ui/vue3'

export default {
  methods: {
    showInfo() {
      LhMessage.info('Info message')
    },
    showSuccess() {
      LhMessage.success('Saved')
    },
    showWarning() {
      LhMessage.warning('Proceed with caution')
    },
    showDanger() {
      LhMessage.danger('Operation failed')
    },
    showLoading() {
      const handle = LhMessage.loading('Syncing…')
      setTimeout(() => handle.close(), 2000)
    },
  },
}
</script>

<template>
  <div class="demo-message-row">
    <LhButton @click="showInfo">Info</LhButton>
    <LhButton @click="showSuccess">Success</LhButton>
    <LhButton @click="showWarning">Warning</LhButton>
    <LhButton @click="showDanger">Danger</LhButton>
    <LhButton @click="showLoading">Loading (manual close)</LhButton>
  </div>
</template>
```

## Closable

`showClose` shows the close button; `closeLabel` customizes its accessible label.

<DemoBlock title="Closable">
  <LhButton @click="showClosable">Manually closable</LhButton>
  <LhButton @click="showCloseLabel">Custom close label</LhButton>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhMessage } from '@lh-ui/vue3'

const showClosable = () => LhMessage.success('Saved', { showClose: true })
const showCloseLabel = () => LhMessage.info('Please check', { showClose: true, closeLabel: 'Got it, close' })
</script>

<template>
  <LhButton @click="showClosable">Manually closable</LhButton>
  <LhButton @click="showCloseLabel">Custom close label</LhButton>
</template>
```

```vue options
<script>
import { LhMessage } from '@lh-ui/vue3'

export default {
  methods: {
    showClosable() {
      LhMessage.success('Saved', { showClose: true })
    },
    showCloseLabel() {
      LhMessage.info('Please check', { showClose: true, closeLabel: 'Got it, close' })
    },
  },
}
</script>

<template>
  <LhButton @click="showClosable">Manually closable</LhButton>
  <LhButton @click="showCloseLabel">Custom close label</LhButton>
</template>
```

## API

### LhMessage Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| content | Message content | `string` | — |
| type | Semantic type | `"success" \| "warning" \| "error" \| "info" \| "danger" \| "loading"` | `'info'` |
| showClose | Show the close button | `boolean` | `false` |
| closeLabel | Accessible name for the close button (falls back to locale key `message.close`) | `string` | — |
| sx | Quick layout props | `LhSxProps` | — |

Service methods: `LhMessage(options)` / `LhMessage.success/info/warning/danger/loading(content, options?)` return a `{ close }` handle; plus `LhMessage.close(id)`, `LhMessage.closeAll()` and `LhMessage.config({ duration, max, offset, appendTo })`.

### Options

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| content | Message content | `string` | — |
| type | Semantic type | `'success' \| 'warning' \| 'error' \| 'info' \| 'danger' \| 'loading'` | `'info'` |
| duration | Auto dismiss in ms, `0` disables it (`loading` defaults to `0`, others to `3000`) | `number` | `3000` |
| showClose | Show the close button | `boolean` | `false` |
| offset | Offset from the viewport top in px | `number` | `20` |
| sx | Quick layout props | `LhSxProps` | — |
| onClose | Called after the item closes (auto or manual) | `() => void` | — |

### LhMessage Events

| Event | Description | Callback |
|-------|-------------|----------|
| close | Emitted when the close button on an item is clicked | — |

In the imperative service API, closing (auto or manual) is reported through the `onClose` callback in the service options.

## Accessibility

- Items are live regions: info / success / loading use `role="status"` (polite), warning / danger / error use `role="alert"` (assertive)
- Non-blocking: focus is never moved and the keyboard flow is uninterrupted
- The close button carries `aria-label` (locale key `message.close`, overridable via `closeLabel`)
- Animations respect `prefers-reduced-motion`

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## Type Definitions

The TypeScript type structures exported by this component (auto-extracted from `packages/components/message/src/types.ts` and `@lh-ui/share/core/*` sources; click each entry to expand; see the Props table above for attribute descriptions):

<details id="type-LhMessageOptions">
<summary><code>LhMessageOptions</code></summary>

```ts
export interface LhMessageOptions {
  content: string
  type?: LhMessageType
  duration?: number
  showClose?: boolean
  offset?: number
  sx?: LhSxProps
  onClose?: () => void
}
```

</details>

<details id="type-LhMessageHandle">
<summary><code>LhMessageHandle</code></summary>

```ts
export interface LhMessageHandle {
  close: () => void
}
```

</details>

<details id="type-LhMessageProps">
<summary><code>LhMessageProps</code></summary>

```ts
export interface LhMessageProps {
  content: string
  type?: LhMessageType
  showClose?: boolean
  closeLabel?: string
  sx?: LhSxProps
}
```

</details>

<details id="type-LhMessageConfig">
<summary><code>LhMessageConfig</code></summary>

```ts
export interface LhMessageConfig {
  duration?: number
  max?: number
  offset?: number
  appendTo?: string | HTMLElement
}
```

</details>

<details id="type-LhMessageType">
<summary><code>LhMessageType</code> <sub>(from @lh-ui/share/core/message)</sub></summary>

```ts
export type LhMessageType =
  | (typeof LH_MESSAGE_TYPE_CONST)[keyof typeof LH_MESSAGE_TYPE_CONST]
```

</details>

<details id="type-LhMessageRecord">
<summary><code>LhMessageRecord</code> <sub>(from @lh-ui/share/core/message)</sub></summary>

```ts
export interface LhMessageRecord {
  id: number
  type: LhMessageType
  content: string
  duration: number
  showClose: boolean
  offset: number
  sx?: LhSxProps
  onClose?: () => void
}
```

</details>

### Constants

Public constants used by this component (linked from the Type / Default columns in the Props table above):

<details id="const-LH_MESSAGE_TYPE_CONST">
<summary><code>LH_MESSAGE_TYPE_CONST</code> <sub>(from @lh-ui/share/core/message)</sub></summary>

```ts
export const LH_MESSAGE_TYPE_CONST = {
  ...LH_TYPES_CONST,
  loading: 'loading',
} as const
```

</details>

<details id="const-LH_MESSAGE_DURATION_DEFAULT">
<summary><code>LH_MESSAGE_DURATION_DEFAULT</code> <sub>(from @lh-ui/share/core/message)</sub></summary>

```ts
export const LH_MESSAGE_DURATION_DEFAULT = 3000
```

</details>

<details id="const-LH_MESSAGE_MAX_DEFAULT">
<summary><code>LH_MESSAGE_MAX_DEFAULT</code> <sub>(from @lh-ui/share/core/message)</sub></summary>

```ts
export const LH_MESSAGE_MAX_DEFAULT = 5
```

</details>

<details id="const-LH_MESSAGE_OFFSET_DEFAULT">
<summary><code>LH_MESSAGE_OFFSET_DEFAULT</code> <sub>(from @lh-ui/share/core/message)</sub></summary>

```ts
export const LH_MESSAGE_OFFSET_DEFAULT = 20
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
import { LhMessage } from '@lh-ui/vue3'

const showBasic = () => LhMessage('This is a message')
const showInfo = () => LhMessage.info('Info message')
const showSuccess = () => LhMessage.success('Saved')
const showWarning = () => LhMessage.warning('Proceed with caution')
const showDanger = () => LhMessage.danger('Operation failed')
const showLoading = () => {
  const handle = LhMessage.loading('Syncing…')
  setTimeout(() => handle.close(), 2000)
}
const showClosable = () => LhMessage.success('Saved', { showClose: true })
const showCloseLabel = () => LhMessage.info('Please check', { showClose: true, closeLabel: 'Got it, close' })
</script>

<style>
.demo-message-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
