# Notification

Notification cards anchored to a screen corner (any of the four), for feedback that deserves a longer dwell: title / content / semantic icon / closable / auto dismiss / stacking. Imperative service API (`LhNotification.success(...)`).

## Basic usage

<DemoBlock title="Basic">
  <LhButton @click="showBasic">Open notification</LhButton>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhNotification } from '@lh-ui/vue3'

const showBasic = () => {
  LhNotification.info({ title: 'Sync complete', content: '3 changes synced to the cloud' })
}
</script>

<template>
  <LhButton @click="showBasic">Open notification</LhButton>
</template>
```

```vue options
<script>
import { LhNotification } from '@lh-ui/vue3'

export default {
  methods: {
    showBasic() {
      LhNotification.info({ title: 'Sync complete', content: '3 changes synced to the cloud' })
    },
  },
}
</script>

<template>
  <LhButton @click="showBasic">Open notification</LhButton>
</template>
```

## Semantic types

<DemoBlock title="Types">
  <div class="demo-notification-row">
    <LhButton @click="showInfo">Info</LhButton>
    <LhButton @click="showSuccess">Success</LhButton>
    <LhButton @click="showWarning">Warning</LhButton>
    <LhButton @click="showDanger">Danger</LhButton>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhNotification } from '@lh-ui/vue3'

const showInfo = () => LhNotification.info({ title: 'Info', content: 'Content' })
const showSuccess = () => LhNotification.success({ title: 'Success', content: 'Backup finished' })
const showWarning = () => LhNotification.warning({ title: 'Warning', content: 'Low disk space' })
const showDanger = () => LhNotification.danger({ title: 'Failed', content: 'Network lost' })
</script>

<template>
  <div class="demo-notification-row">
    <LhButton @click="showInfo">Info</LhButton>
    <LhButton @click="showSuccess">Success</LhButton>
    <LhButton @click="showWarning">Warning</LhButton>
    <LhButton @click="showDanger">Danger</LhButton>
  </div>
</template>
```

```vue options
<script>
import { LhNotification } from '@lh-ui/vue3'

export default {
  methods: {
    showInfo() {
      LhNotification.info({ title: 'Info', content: 'Content' })
    },
    showSuccess() {
      LhNotification.success({ title: 'Success', content: 'Backup finished' })
    },
    showWarning() {
      LhNotification.warning({ title: 'Warning', content: 'Low disk space' })
    },
    showDanger() {
      LhNotification.danger({ title: 'Failed', content: 'Network lost' })
    },
  },
}
</script>

<template>
  <div class="demo-notification-row">
    <LhButton @click="showInfo">Info</LhButton>
    <LhButton @click="showSuccess">Success</LhButton>
    <LhButton @click="showWarning">Warning</LhButton>
    <LhButton @click="showDanger">Danger</LhButton>
  </div>
</template>
```

## Position

`position` supports the four corners.

<DemoBlock title="Position">
  <div class="demo-notification-row">
    <LhButton @click="showAt('top-right')">Top right</LhButton>
    <LhButton @click="showAt('top-left')">Top left</LhButton>
    <LhButton @click="showAt('bottom-right')">Bottom right</LhButton>
    <LhButton @click="showAt('bottom-left')">Bottom left</LhButton>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhNotification } from '@lh-ui/vue3'

const showAt = (position) => {
  LhNotification.info({ title: 'Position demo', content: position, duration: 3000, position })
}
</script>

<template>
  <div class="demo-notification-row">
    <LhButton @click="showAt('top-right')">Top right</LhButton>
    <LhButton @click="showAt('top-left')">Top left</LhButton>
    <LhButton @click="showAt('bottom-right')">Bottom right</LhButton>
    <LhButton @click="showAt('bottom-left')">Bottom left</LhButton>
  </div>
</template>
```

```vue options
<script>
import { LhNotification } from '@lh-ui/vue3'

export default {
  methods: {
    showAt(position) {
      LhNotification.info({ title: 'Position demo', content: position, duration: 3000, position })
    },
  },
}
</script>

<template>
  <div class="demo-notification-row">
    <LhButton @click="showAt('top-right')">Top right</LhButton>
    <LhButton @click="showAt('top-left')">Top left</LhButton>
    <LhButton @click="showAt('bottom-right')">Bottom right</LhButton>
    <LhButton @click="showAt('bottom-left')">Bottom left</LhButton>
  </div>
</template>
```

## Clickable notification

Passing `onClick` gives the card button semantics: focusable with Tab, activated with Enter / Space.

<DemoBlock title="Clickable">
  <LhButton @click="showClickable">With action</LhButton>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhNotification } from '@lh-ui/vue3'

const showClickable = () => {
  LhNotification.info({
    title: 'New version available',
    content: 'Click to view the changelog',
    duration: 0,
    onClick: () => window.open('#', '_blank'),
  })
}
</script>

<template>
  <LhButton @click="showClickable">With action</LhButton>
</template>
```

```vue options
<script>
import { LhNotification } from '@lh-ui/vue3'

export default {
  methods: {
    showClickable() {
      LhNotification.info({
        title: 'New version available',
        content: 'Click to view the changelog',
        duration: 0,
        onClick: () => window.open('#', '_blank'),
      })
    },
  },
}
</script>

<template>
  <LhButton @click="showClickable">With action</LhButton>
</template>
```

## Close button

`show-close` toggles the close button (shown by default) and `close-label` customizes its accessible label.

<DemoBlock title="Close button">
  <LhButton @click="notifyClosable">With close button</LhButton>
  <LhButton @click="notifyNoClose">Without close button</LhButton>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhNotification } from '@lh-ui/vue3'

const notifyClosable = () => LhNotification.info({ title: 'Notice', content: 'Manually closable', showClose: true, closeLabel: 'Got it, close' })
const notifyNoClose = () => LhNotification.info({ title: 'Notice', content: 'Waits for auto close only', showClose: false })
</script>

<template>
  <LhButton @click="notifyClosable">With close button</LhButton>
  <LhButton @click="notifyNoClose">Without close button</LhButton>
</template>
```

```vue options
<script>
import { LhNotification } from '@lh-ui/vue3'

export default {
  methods: {
    notifyClosable() {
      LhNotification.info({ title: 'Notice', content: 'Manually closable', showClose: true, closeLabel: 'Got it, close' })
    },
    notifyNoClose() {
      LhNotification.info({ title: 'Notice', content: 'Waits for auto close only', showClose: false })
    },
  },
}
</script>

<template>
  <LhButton @click="notifyClosable">With close button</LhButton>
  <LhButton @click="notifyNoClose">Without close button</LhButton>
</template>
```

## API

### LhNotification Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| type | Semantic type | `"success" \| "warning" \| "error" \| "info" \| "danger"` | `'info'` |
| title | Title | `string` | — |
| content | Body content | `string` | — |
| showClose | Show the close button | `boolean` | `true` |
| closeLabel | Accessible name for the close button (falls back to locale key `notification.close`) | `string` | — |
| onClick | Card click callback (gives the card button semantics) | `() => void` | — |
| sx | Quick layout props | `LhSxProps` | — |

Service methods: `LhNotification(options)` / `LhNotification.success/info/warning/danger(options)` return a `{ close }` handle; plus `LhNotification.close(id)`, `LhNotification.closeAll()` and `LhNotification.config({ duration, offset, appendTo })`.

### LhNotification Events

| Event | Description | Callback |
|-------|-------------|----------|
| close | Emitted when the close button on an item is clicked | — |

In the imperative service API, closing (auto or manual) is reported through the `onClose` callback in the service options.

### Options

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| title | Title | `string` | — |
| content | Body content | `string` | — |
| type | Semantic type | `'success' \| 'warning' \| 'error' \| 'info' \| 'danger'` | `'info'` |
| duration | Auto dismiss in ms, `0` disables it | `number` | `4500` |
| position | Popup position | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | `'top-right'` |
| showClose | Show the close button | `boolean` | `true` |
| sx | Quick layout props | `LhSxProps` | — |
| onClick | Card click callback | `() => void` | — |
| onClose | Called after close | `() => void` | — |

## Accessibility

- Each position container is `role="region"` + `aria-live="polite"`; new notifications are announced politely and never steal focus
- Cards with `onClick` render as `role="button"`, focusable via Tab and triggered with Enter / Space
- The close button carries `aria-label` (locale key `notification.close`, overridable via `closeLabel`)
- Stacking uses CSS transitions; animations respect `prefers-reduced-motion`

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## Type Definitions

The TypeScript type structures exported by this component (auto-extracted from `packages/components/notification/src/types.ts` and `@lh-ui/share/core/*` sources; click each entry to expand; see the Props table above for attribute descriptions):

<details id="type-LhNotificationOptions">
<summary><code>LhNotificationOptions</code></summary>

```ts
export interface LhNotificationOptions {
  title: string
  content?: string
  type?: LhNotificationType
  duration?: number
  position?: LhNotificationPosition
  showClose?: boolean
  sx?: LhSxProps
  onClick?: () => void
  onClose?: () => void
}
```

</details>

<details id="type-LhNotificationHandle">
<summary><code>LhNotificationHandle</code></summary>

```ts
export interface LhNotificationHandle {
  close: () => void
}
```

</details>

<details id="type-LhNotificationConfig">
<summary><code>LhNotificationConfig</code></summary>

```ts
export interface LhNotificationConfig {
  duration?: number
  offset?: number
  appendTo?: string | HTMLElement
}
```

</details>

<details id="type-LhNotificationProps">
<summary><code>LhNotificationProps</code></summary>

```ts
export interface LhNotificationProps {
  type?: LhNotificationType
  title: string
  content?: string
  showClose?: boolean
  closeLabel?: string
  onClick?: () => void
  sx?: LhSxProps
}
```

</details>

<details id="type-LhNotificationType">
<summary><code>LhNotificationType</code> <sub>(from @lh-ui/share/core/notification)</sub></summary>

```ts
export type LhNotificationType =
  (typeof LH_TYPES_CONST)[keyof typeof LH_TYPES_CONST]
```

</details>

<details id="type-LhNotificationRecord">
<summary><code>LhNotificationRecord</code> <sub>(from @lh-ui/share/core/notification)</sub></summary>

```ts
export interface LhNotificationRecord {
  id: number
  type: LhNotificationType
  title: string
  content: string
  duration: number
  position: LhNotificationPosition
  showClose: boolean
  sx?: LhSxProps
  onClick?: () => void
  onClose?: () => void
}
```

</details>

<details id="type-LhNotificationPosition">
<summary><code>LhNotificationPosition</code> <sub>(from @lh-ui/share/core/notification)</sub></summary>

```ts
export type LhNotificationPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
```

</details>

### Constants

Public constants used by this component (linked from the Type / Default columns in the Props table above):

<details id="const-LH_NOTIFICATION_POSITION_CONST">
<summary><code>LH_NOTIFICATION_POSITION_CONST</code> <sub>(from @lh-ui/share/core/notification)</sub></summary>

```ts
export const LH_NOTIFICATION_POSITION_CONST = {
  'top-right': 'top-right',
  'top-left': 'top-left',
  'bottom-right': 'bottom-right',
  'bottom-left': 'bottom-left',
} as const
```

</details>

<details id="const-LH_NOTIFICATION_DURATION_DEFAULT">
<summary><code>LH_NOTIFICATION_DURATION_DEFAULT</code> <sub>(from @lh-ui/share/core/notification)</sub></summary>

```ts
export const LH_NOTIFICATION_DURATION_DEFAULT = 4500
```

</details>

<details id="const-LH_NOTIFICATION_GAP_DEFAULT">
<summary><code>LH_NOTIFICATION_GAP_DEFAULT</code> <sub>(from @lh-ui/share/core/notification)</sub></summary>

```ts
export const LH_NOTIFICATION_GAP_DEFAULT = 16
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
import { LhNotification } from '@lh-ui/vue3'

const showBasic = () => LhNotification.info({ title: 'Sync complete', content: '3 changes synced to the cloud' })
const showInfo = () => LhNotification.info({ title: 'Info', content: 'Content' })
const showSuccess = () => LhNotification.success({ title: 'Success', content: 'Backup finished' })
const showWarning = () => LhNotification.warning({ title: 'Warning', content: 'Low disk space' })
const showDanger = () => LhNotification.danger({ title: 'Failed', content: 'Network lost' })
const showAt = (position) => {
  LhNotification.info({ title: 'Position demo', content: position, duration: 3000, position })
}
const showClickable = () => {
  LhNotification.info({ title: 'New version available', content: 'Click to view the changelog', duration: 0, onClick: () => {} })
}
const notifyClosable = () => LhNotification.info({ title: 'Notice', content: 'Manually closable', showClose: true, closeLabel: 'Got it, close' })
const notifyNoClose = () => LhNotification.info({ title: 'Notice', content: 'Waits for auto close only', showClose: false })
</script>

<style>
.demo-notification-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
