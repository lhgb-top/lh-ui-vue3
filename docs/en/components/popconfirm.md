# Popconfirm

A lightweight inline confirmation bubble anchored to its trigger — no dialog required. The semantics are blocking (`role="alertdialog"`): focus lands on the confirm button on open, Tab cycles between the two actions, and Escape counts as cancel.

## Basic usage

<DemoBlock title="Delete confirmation">
  <LhPopconfirm title="Delete this record?" @confirm="onConfirm" @cancel="onCancel">
    <LhButton type="danger">Delete</LhButton>
  </LhPopconfirm>
  <p v-if="action" class="demo-popconfirm-log">Last action: {{ action }}</p>
</DemoBlock>

```vue composition
<template>
  <LhPopconfirm title="Delete this record?" @confirm="onConfirm" @cancel="onCancel">
    <LhButton type="danger">Delete</LhButton>
  </LhPopconfirm>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const action = ref('')
function onConfirm() {
  action.value = 'confirmed'
}
function onCancel() {
  action.value = 'cancelled'
}
const pcVisible = ref(false)
</script>
```

```vue options
<script>
export default {
  data() {
    return { action: '', pcVisible: false }
  },
  methods: {
    onConfirm() {
      this.action = 'confirmed'
    },
    onCancel() {
      this.action = 'cancelled'
    },
  },
}
</script>

<template>
  <LhPopconfirm title="Delete this record?" @confirm="onConfirm" @cancel="onCancel">
    <LhButton type="danger">Delete</LhButton>
  </LhPopconfirm>
</template>
```

## Tones

<DemoBlock title="info / warning / danger">
  <div class="demo-popconfirm-row">
    <LhPopconfirm type="info" title="View the access log for this record?">
      <LhButton>Info</LhButton>
    </LhPopconfirm>
    <LhPopconfirm type="warning" title="This will notify every member.">
      <LhButton type="warning">Warning</LhButton>
    </LhPopconfirm>
    <LhPopconfirm type="danger" title="Deletion cannot be undone.">
      <LhButton type="danger">Danger</LhButton>
    </LhPopconfirm>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- Info tone -->
  <LhPopconfirm type="info" title="View the access log for this record?">
    <LhButton>Info</LhButton>
  </LhPopconfirm>
  <!-- Warning tone -->
  <LhPopconfirm type="warning" title="This will notify every member.">
    <LhButton type="warning">Warning</LhButton>
  </LhPopconfirm>
  <!-- Danger tone -->
  <LhPopconfirm type="danger" title="Deletion cannot be undone.">
    <LhButton type="danger">Danger</LhButton>
  </LhPopconfirm>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- Info tone -->
  <LhPopconfirm type="info" title="View the access log for this record?">
    <LhButton>Info</LhButton>
  </LhPopconfirm>
  <!-- Warning tone -->
  <LhPopconfirm type="warning" title="This will notify every member.">
    <LhButton type="warning">Warning</LhButton>
  </LhPopconfirm>
  <!-- Danger tone -->
  <LhPopconfirm type="danger" title="Deletion cannot be undone.">
    <LhButton type="danger">Danger</LhButton>
  </LhPopconfirm>
</template>
```

## Labels and placement

<DemoBlock title="Labels / placement / trigger">
  <div class="demo-popconfirm-row">
    <LhPopconfirm
      title="Archived items can be restored from trash."
      confirm-text="Archive"
      cancel-text="Not yet"
      placement="right"
    >
      <LhButton>Custom labels</LhButton>
    </LhPopconfirm>
    <LhPopconfirm title="Hover to confirm." trigger="hover" :show-after="0" placement="bottom">
      <LhButton>Hover trigger</LhButton>
    </LhPopconfirm>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- Custom labels and placement -->
  <LhPopconfirm
    title="Archived items can be restored from trash."
    confirm-text="Archive"
    cancel-text="Not yet"
    placement="right"
  >
    <LhButton>Custom labels</LhButton>
  </LhPopconfirm>
  <!-- Hover trigger -->
  <LhPopconfirm title="Hover to confirm." trigger="hover" :show-after="0" placement="bottom">
    <LhButton>Hover trigger</LhButton>
  </LhPopconfirm>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- Custom labels and placement -->
  <LhPopconfirm
    title="Archived items can be restored from trash."
    confirm-text="Archive"
    cancel-text="Not yet"
    placement="right"
  >
    <LhButton>Custom labels</LhButton>
  </LhPopconfirm>
  <!-- Hover trigger -->
  <LhPopconfirm title="Hover to confirm." trigger="hover" :show-after="0" placement="bottom">
    <LhButton>Hover trigger</LhButton>
  </LhPopconfirm>
</template>
```

> Button labels default to the `popconfirm.confirm` / `popconfirm.cancel` locale keys and can be overridden with `confirm-text` / `cancel-text`.

## Icon, confirm button type and switches

`show-icon` shows a warning icon and `confirm-button-type` switches the confirm button type; `disabled` blocks the trigger; `v-model:visible` controls visibility; `hide-after` auto-closes after a delay; `popper-class` / `teleport-target` customize the popup.

<DemoBlock title="Icon & button type">
  <LhPopconfirm title="Delete this record?" show-icon confirm-button-type="primary">
    <LhButton type="danger">With icon</LhButton>
  </LhPopconfirm>
  <LhPopconfirm title="This action is unavailable." disabled>
    <LhButton disabled>Disabled</LhButton>
  </LhPopconfirm>
  <LhPopconfirm v-model:visible="pcVisible" title="Controlled popconfirm" :hide-after="1000">
    <LhButton>{{ pcVisible ? 'Collapse' : 'Expand' }}</LhButton>
  </LhPopconfirm>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
const pcVisible = ref(false)
</script>

<template>
  <!-- Icon and confirm button type -->
  <LhPopconfirm title="Delete this record?" show-icon confirm-button-type="primary">
    <LhButton type="danger">With icon</LhButton>
  </LhPopconfirm>
  <!-- Disabled trigger -->
  <LhPopconfirm title="This action is unavailable." disabled>
    <LhButton disabled>Disabled</LhButton>
  </LhPopconfirm>
  <!-- Controlled visibility with auto hide -->
  <LhPopconfirm v-model:visible="pcVisible" title="Controlled popconfirm" :hide-after="1000">
    <LhButton>{{ pcVisible ? 'Collapse' : 'Expand' }}</LhButton>
  </LhPopconfirm>
</template>
```

```vue options
<script>
export default {
  data() {
    return { pcVisible: false }
  },
}
</script>

<template>
  <!-- Icon and confirm button type -->
  <LhPopconfirm title="Delete this record?" show-icon confirm-button-type="primary">
    <LhButton type="danger">With icon</LhButton>
  </LhPopconfirm>
  <!-- Disabled trigger -->
  <LhPopconfirm title="This action is unavailable." disabled>
    <LhButton disabled>Disabled</LhButton>
  </LhPopconfirm>
  <!-- Controlled visibility with auto hide -->
  <LhPopconfirm v-model:visible="pcVisible" title="Controlled popconfirm" :hide-after="1000">
    <LhButton>{{ pcVisible ? 'Collapse' : 'Expand' }}</LhButton>
  </LhPopconfirm>
</template>
```

## Popconfirm API

### Props

| Prop | Description | Type | Default |
| ---- | ---- | ---- | ------ |
| type | Confirmation tone | `"info" \| "warning" \| "danger"` | `'warning'` |
| placement | Placement | `"top" \| "top-start" \| "top-end" \| "bottom" \| "bottom-start" \| "bottom-end" \| "left" \| "left-start" \| "left-end" \| "right" \| "right-start" \| "right-end"` | `'top'` |
| trigger | Trigger mode | `"click" \| "hover" \| "focus" \| "manual"` | `'click'` |
| title | Confirmation message (or the content slot) | `string` | — |
| confirmText | Confirm button text (falls back to the popconfirm.confirm locale key) | `string` | — |
| cancelText | Cancel button text (falls back to the popconfirm.cancel locale key) | `string` | — |
| confirmButtonType | Confirm button type | `"default" \| "primary"` | `'primary'` |
| visible | Visibility for manual control (v-model:visible) | `boolean` | — |
| disabled | Whether disabled | `boolean` | — |
| showIcon | Whether to show the tone icon | `boolean` | `true` |
| popperClass | Custom class for the popup | `string` | — |
| teleportTarget | Teleport target (selector or element, defaults to body) | `string \| HTMLElement` | `'body'` |
| showAfter | Delay before showing (ms) | `number` | — |
| hideAfter | Delay before hiding (ms) | `number` | — |
| themeVars | Component-level theme variables, overriding the ConfigProvider configuration | `{ [x: string]: string; }` | — |
| bgPattern | Component-level background pattern, overriding the ConfigProvider configuration | `string` | — |
| sx | sx quick layout props (applied to the trigger root element) | `LhSxProps` | — |

### Events

| Event | Description | Args |
| ---- | ---- | ---- |
| confirm | After the confirm button is clicked | — |
| cancel | After the cancel button or Escape | — |
| update:visible | Visibility changed | `(value: boolean)` |
| show | After showing | — |
| hide | After hiding | — |

### Slots

| Slot | Description |
| ---- | ---- |
| default | Trigger content |
| content | Custom confirmation message |

### Methods

| Method | Description |
| ---- | ---- |
| show | Show programmatically |
| hide | Hide programmatically |
| toggle | Toggle programmatically |

### Accessibility

- The panel is `role="alertdialog"` + `aria-modal="true"`; the trigger carries `aria-haspopup` / `aria-expanded`
- Focus lands on the confirm button on open, Tab cycles between the two actions, and focus returns to the trigger on close
- Escape counts as cancel (per the WAI-ARIA alertdialog pattern: Escape dismisses and is treated as a negative response)
- The message is linked via `aria-labelledby`; the tone icon is decorative (`aria-hidden`)

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## Type Definitions

The TypeScript type structures exported by this component (auto-extracted from `packages/components/popconfirm/src/types.ts` and `@lh-ui/share/core/*` sources; click each entry to expand; see the Props table above for attribute descriptions):

<details id="type-LhPopconfirmProps">
<summary><code>LhPopconfirmProps</code></summary>

```ts
export interface LhPopconfirmProps {
  type?: LhPopconfirmType
  placement?: LhPlacement
  trigger?: LhPopconfirmTrigger
  title?: string
  confirmText?: string
  cancelText?: string
  confirmButtonType?: 'default' | 'primary'
  visible?: boolean
  disabled?: boolean
  showIcon?: boolean
  popperClass?: string
  teleportTarget?: string | HTMLElement
  showAfter?: number
  hideAfter?: number
  themeVars?: Record<string, string>
  bgPattern?: string
  sx?: LhSxProps
}
```

</details>

<details id="type-LhPopconfirmPlacement">
<summary><code>LhPopconfirmPlacement</code> <sub>(from @lh-ui/share/core/shared/popper)</sub></summary>

```ts

export type LhPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'
```

</details>

<details id="type-LhPopconfirmTrigger">
<summary><code>LhPopconfirmTrigger</code> <sub>(from @lh-ui/share/core/popconfirm (logic.ts))</sub></summary>

```ts
export type LhPopconfirmTrigger = 'click' | 'hover' | 'focus' | 'manual'
```

</details>

<details id="type-LhPopconfirmType">
<summary><code>LhPopconfirmType</code> <sub>(from @lh-ui/share/core/popconfirm (logic.ts))</sub></summary>

```ts
export type LhPopconfirmType = 'info' | 'warning' | 'danger'
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
import { ref } from 'vue'
const action = ref('')
function onConfirm() {
  action.value = 'confirmed'
}
function onCancel() {
  action.value = 'cancelled'
}
const pcVisible = ref(false)
</script>

<style scoped>
.demo-popconfirm-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}
.demo-popconfirm-log {
  margin-top: 12px;
  color: var(--lh-text-secondary);
}
</style>
