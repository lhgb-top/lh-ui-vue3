# Popover

A rich floating panel for titles, copy, and interactive content — heavier than a Tooltip. The trigger lives in the default slot; the panel body comes from the `content` slot. With the `click` trigger the panel is a focus-trapped `role="dialog"`; `hover` and `focus` triggers display content without disrupting keyboard flow.

## Basic usage

<DemoBlock title="Click trigger">
  <LhPopover title="Note" placement="top">
    <LhButton>Click me</LhButton>
    <template #content>
      <p>Rich content: any markup works here.</p>
    </template>
  </LhPopover>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhPopover title="Note" placement="top">
    <LhButton>Click me</LhButton>
    <template #content>
      <p>Rich content: any markup works here.</p>
    </template>
  </LhPopover>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhPopover title="Note" placement="top">
    <LhButton>Click me</LhButton>
    <template #content>
      <p>Rich content: any markup works here.</p>
    </template>
  </LhPopover>
</template>
```

## Triggers

<DemoBlock title="hover / focus / manual">
  <div class="demo-popover-row">
    <LhPopover trigger="hover" title="Hover" :show-after="0">
      <LhButton>Hover me</LhButton>
      <template #content><p>Moving into the panel does not close it.</p></template>
    </LhPopover>
    <LhPopover trigger="focus" title="Focus" :show-after="0">
      <LhInput placeholder="Focus the input" />
      <template #content><p>Shown when the input is focused.</p></template>
    </LhPopover>
    <LhPopover v-model:visible="manualVisible" trigger="manual" title="Manual">
      <LhButton @click="manualVisible = !manualVisible">Toggle</LhButton>
      <template #content><p>Visibility is fully controlled by v-model.</p></template>
    </LhPopover>
  </div>
</DemoBlock>

```vue composition
<template>
  <!-- Hover trigger -->
  <LhPopover trigger="hover" title="Hover" :show-after="0">
    <LhButton>Hover me</LhButton>
    <template #content><p>Moving into the panel does not close it.</p></template>
  </LhPopover>
  <!-- Focus trigger -->
  <LhPopover trigger="focus" title="Focus" :show-after="0">
    <LhInput placeholder="Focus the input" />
    <template #content><p>Shown when the input is focused.</p></template>
  </LhPopover>
  <!-- Manual trigger -->
  <LhPopover v-model:visible="manualVisible" trigger="manual" title="Manual">
    <LhButton @click="manualVisible = !manualVisible">Toggle</LhButton>
    <template #content><p>Visibility is fully controlled by v-model.</p></template>
  </LhPopover>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const manualVisible = ref(false)
</script>
```

```vue options
<template>
  <!-- Hover trigger -->
  <LhPopover trigger="hover" title="Hover" :show-after="0">
    <LhButton>Hover me</LhButton>
    <template #content><p>Moving into the panel does not close it.</p></template>
  </LhPopover>
  <!-- Focus trigger -->
  <LhPopover trigger="focus" title="Focus" :show-after="0">
    <LhInput placeholder="Focus the input" />
    <template #content><p>Shown when the input is focused.</p></template>
  </LhPopover>
  <!-- Manual trigger -->
  <LhPopover v-model:visible="manualVisible" trigger="manual" title="Manual">
    <LhButton @click="manualVisible = !manualVisible">Toggle</LhButton>
    <template #content><p>Visibility is fully controlled by v-model.</p></template>
  </LhPopover>
</template>

<script>
export default {
  data() {
    return { manualVisible: false }
  },
}
</script>
```

## Twelve placements

<DemoBlock title="placement">
  <div class="demo-popover-grid">
    <LhPopover
      v-for="p in placements"
      :key="p"
      :placement="p"
      :title="p"
      trigger="hover"
      :show-after="0"
    >
      <LhButton size="small">{{ p }}</LhButton>
      <template #content><p>Placement: {{ p }}</p></template>
    </LhPopover>
  </div>
</DemoBlock>

```vue composition
<template>
  <LhPopover
    v-for="p in placements"
    :key="p"
    :placement="p"
    :title="p"
    trigger="hover"
    :show-after="0"
  >
    <LhButton size="small">{{ p }}</LhButton>
    <template #content><p>Placement: {{ p }}</p></template>
  </LhPopover>
</template>

<script setup lang="ts">
const placements = [
  'top', 'top-start', 'top-end',
  'bottom', 'bottom-start', 'bottom-end',
  'left', 'left-start', 'left-end',
  'right', 'right-start', 'right-end',
] as const
</script>
```

```vue options
<template>
  <LhPopover
    v-for="p in placements"
    :key="p"
    :placement="p"
    :title="p"
    trigger="hover"
    :show-after="0"
  >
    <LhButton size="small">{{ p }}</LhButton>
    <template #content><p>Placement: {{ p }}</p></template>
  </LhPopover>
</template>

<script>
export default {
  data() {
    return {
      placements: [
        'top', 'top-start', 'top-end',
        'bottom', 'bottom-start', 'bottom-end',
        'left', 'left-start', 'left-end',
        'right', 'right-start', 'right-end',
      ],
    }
  },
}
</script>
```

> When the viewport runs out of room the panel flips its side (flip) and slides back onto the cross axis (shift); the arrow follows the effective placement.

## Interactive content

<DemoBlock title="Quick note">
  <LhPopover placement="right" title="Quick note">
    <LhButton>Add note</LhButton>
    <template #content>
      <div class="demo-popover-form">
        <LhInput v-model="note" placeholder="Note text" />
        <LhButton type="primary" @click="saveNote">Save</LhButton>
      </div>
    </template>
  </LhPopover>
  <p v-if="saved" class="demo-popover-saved">Saved: {{ saved }}</p>
</DemoBlock>

```vue composition
<template>
  <LhPopover placement="right" title="Quick note">
    <LhButton>Add note</LhButton>
    <template #content>
      <div class="demo-popover-form">
        <LhInput v-model="note" placeholder="Note text" />
        <LhButton type="primary" @click="saveNote">Save</LhButton>
      </div>
    </template>
  </LhPopover>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const note = ref('')
const saved = ref('')
function saveNote() {
  saved.value = note.value
  note.value = ''
}
</script>
```

```vue options
<template>
  <LhPopover placement="right" title="Quick note">
    <LhButton>Add note</LhButton>
    <template #content>
      <div class="demo-popover-form">
        <LhInput v-model="note" placeholder="Note text" />
        <LhButton type="primary" @click="saveNote">Save</LhButton>
      </div>
    </template>
  </LhPopover>
</template>

<script>
export default {
  data() {
    return { note: '', saved: '' }
  },
  methods: {
    saveNote() {
      this.saved = this.note
      this.note = ''
    },
  },
}
</script>
```

## More Props

<DemoBlock title="disabled / arrow / width / hideAfter / popperClass / teleportTarget">
  <div class="demo-popover-row">
    <LhPopover disabled title="Disabled">
      <LhButton disabled>Disabled trigger</LhButton>
      <template #content><p>With disabled, neither the trigger nor the panel responds.</p></template>
    </LhPopover>
    <LhPopover title="No arrow" :arrow="false" :show-after="0">
      <LhButton>No arrow</LhButton>
      <template #content><p>With arrow set to false the pointing arrow is not rendered.</p></template>
    </LhPopover>
    <LhPopover title="Fixed width" width="240" :show-after="0">
      <LhButton>Fixed width</LhButton>
      <template #content><p>width sets the panel width — 240px here.</p></template>
    </LhPopover>
    <LhPopover title="Delayed hide" :hide-after="800" :show-after="0">
      <LhButton>Delayed hide</LhButton>
      <template #content><p>The panel collapses 800ms after the pointer leaves the trigger.</p></template>
    </LhPopover>
    <LhPopover title="Custom class" popper-class="demo-popper-accent" :show-after="0">
      <LhButton>Custom class</LhButton>
      <template #content><p>popperClass lands on the panel root element for custom styling.</p></template>
    </LhPopover>
    <LhPopover title="Teleport target" teleport-target="#demo-popover-host" :show-after="0">
      <LhButton>Teleport host</LhButton>
      <template #content><p>The panel is teleported into the host below instead of body.</p></template>
    </LhPopover>
  </div>
  <div id="demo-popover-host" class="demo-popover-host">Teleport host (#demo-popover-host)</div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- Disabled -->
  <LhPopover disabled title="Disabled">
    <LhButton disabled>Disabled trigger</LhButton>
    <template #content><p>With disabled, neither the trigger nor the panel responds.</p></template>
  </LhPopover>
  <!-- No arrow -->
  <LhPopover title="No arrow" :arrow="false" :show-after="0">
    <LhButton>No arrow</LhButton>
    <template #content><p>With arrow set to false the pointing arrow is not rendered.</p></template>
  </LhPopover>
  <!-- Fixed width -->
  <LhPopover title="Fixed width" width="240" :show-after="0">
    <LhButton>Fixed width</LhButton>
    <template #content><p>width sets the panel width — 240px here.</p></template>
  </LhPopover>
  <!-- Delayed hide -->
  <LhPopover title="Delayed hide" :hide-after="800" :show-after="0">
    <LhButton>Delayed hide</LhButton>
    <template #content><p>The panel collapses 800ms after the pointer leaves the trigger.</p></template>
  </LhPopover>
  <!-- Custom class -->
  <LhPopover title="Custom class" popper-class="demo-popper-accent" :show-after="0">
    <LhButton>Custom class</LhButton>
    <template #content><p>popperClass lands on the panel root element for custom styling.</p></template>
  </LhPopover>
  <!-- Teleport target -->
  <LhPopover title="Teleport target" teleport-target="#demo-popover-host" :show-after="0">
    <LhButton>Teleport host</LhButton>
    <template #content><p>The panel is teleported into the host below instead of body.</p></template>
  </LhPopover>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- Disabled -->
  <LhPopover disabled title="Disabled">
    <LhButton disabled>Disabled trigger</LhButton>
    <template #content><p>With disabled, neither the trigger nor the panel responds.</p></template>
  </LhPopover>
  <!-- No arrow -->
  <LhPopover title="No arrow" :arrow="false" :show-after="0">
    <LhButton>No arrow</LhButton>
    <template #content><p>With arrow set to false the pointing arrow is not rendered.</p></template>
  </LhPopover>
  <!-- Fixed width -->
  <LhPopover title="Fixed width" width="240" :show-after="0">
    <LhButton>Fixed width</LhButton>
    <template #content><p>width sets the panel width — 240px here.</p></template>
  </LhPopover>
  <!-- Delayed hide -->
  <LhPopover title="Delayed hide" :hide-after="800" :show-after="0">
    <LhButton>Delayed hide</LhButton>
    <template #content><p>The panel collapses 800ms after the pointer leaves the trigger.</p></template>
  </LhPopover>
  <!-- Custom class -->
  <LhPopover title="Custom class" popper-class="demo-popper-accent" :show-after="0">
    <LhButton>Custom class</LhButton>
    <template #content><p>popperClass lands on the panel root element for custom styling.</p></template>
  </LhPopover>
  <!-- Teleport target -->
  <LhPopover title="Teleport target" teleport-target="#demo-popover-host" :show-after="0">
    <LhButton>Teleport host</LhButton>
    <template #content><p>The panel is teleported into the host below instead of body.</p></template>
  </LhPopover>
</template>
```

<style>
.demo-popper-accent {
  border: 1px solid var(--lh-primary-color);
}
</style>

## Controlled visibility

`v-model:visible` controls the popup visibility manually.

<DemoBlock title="Controlled visibility">
  <LhPopover v-model:visible="popVisible" title="Controlled popover" trigger="manual">
    <LhButton>{{ popVisible ? 'Collapse' : 'Expand' }}</LhButton>
    <template #content><p>Controlled via the button and v-model:visible.</p></template>
  </LhPopover>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
const popVisible = ref(false)
</script>

<template>
  <LhPopover v-model:visible="popVisible" title="Controlled popover" trigger="manual">
    <LhButton>{{ popVisible ? 'Collapse' : 'Expand' }}</LhButton>
  </LhPopover>
</template>
```

```vue options
<script>
export default {
  data() {
    return { popVisible: false }
  },
}
</script>

<template>
  <LhPopover v-model:visible="popVisible" title="Controlled popover" trigger="manual">
    <LhButton>{{ popVisible ? 'Collapse' : 'Expand' }}</LhButton>
  </LhPopover>
</template>
```

## Popover API

### Props

| Prop | Description | Type | Default |
| ---- | ---- | ---- | ------ |
| placement | Placement | `"top" \| "top-start" \| "top-end" \| "bottom" \| "bottom-start" \| "bottom-end" \| "left" \| "left-start" \| "left-end" \| "right" \| "right-start" \| "right-end"` | `'top'` |
| trigger | Trigger mode | `"click" \| "hover" \| "focus" \| "manual"` | `'click'` |
| title | Title (or the title slot) | `string` | — |
| visible | Visibility for manual control (v-model:visible) | `boolean` | — |
| disabled | Disable the trigger | `boolean` | — |
| arrow | Show the arrow | `boolean` | `true` |
| width | Panel width | `string \| number` | — |
| popperClass | Custom panel class | `string` | — |
| teleportTarget | Teleport target (selector or element) | `string \| HTMLElement` | `'body'` |
| showAfter | Show delay (ms) | `number` | — |
| hideAfter | Hide delay (ms) | `number` | — |
| themeVars | Component-level theme variables, overriding the ConfigProvider configuration | `{ [x: string]: string; }` | — |
| bgPattern | Component-level background pattern, overriding the ConfigProvider configuration | `string` | — |
| sx | sx layout props (applied to the trigger root) | `SxProps` | — |

### Events

| Event | Description | Args |
| ---- | ---- | ---- |
| update:visible | Visibility changed | `(value: boolean)` |
| show | After showing | — |
| hide | After hiding | — |

### Slots

| Slot | Description |
| ---- | ---- |
| default | Trigger content |
| title | Custom title |
| content | Panel content |

### Methods

| Method | Description |
| ---- | ---- |
| show | Show programmatically |
| hide | Hide programmatically |
| toggle | Toggle programmatically |

### Accessibility

- With the `click` trigger the panel is `role="dialog"` + `aria-modal="true"`; the trigger carries `aria-haspopup` / `aria-expanded`
- Focus moves to the first focusable element in the panel, Tab cycles inside it, and focus returns to the trigger on close
- `hover` / `focus` triggers never move focus, so keyboard usage is not interrupted
- Escape closes the panel, as does a click outside; the title is linked via `aria-labelledby`
- Positioning is a self-contained pure-function engine (flip / shift) with zero third-party runtime dependencies

> **The panel collapses once its trigger scrolls out of view.** The panel is `fixed` positioned, so
> after the trigger leaves the viewport it would otherwise keep floating over page content at a high
> z-index. Every trigger mode (including `manual`) therefore closes the panel when the trigger fully
> scrolls away, emitting `update:visible` so external state stays in sync.

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## Type Definitions

The TypeScript type structures exported by this component (auto-extracted from `packages/components/popover/src/types.ts` and `@lh-ui/share/core/*` sources; click each entry to expand; see the Props table above for attribute descriptions):

<details id="type-LhPopoverProps">
<summary><code>LhPopoverProps</code></summary>

```ts
export interface LhPopoverProps {
  placement?: LhPlacement
  trigger?: LhPopoverTrigger
  title?: string
  visible?: boolean
  disabled?: boolean
  arrow?: boolean
  width?: string | number
  popperClass?: string
  teleportTarget?: string | HTMLElement
  showAfter?: number
  hideAfter?: number
  themeVars?: Record<string, string>
  bgPattern?: string
  sx?: SxProps
}
```

</details>

<details id="type-LhPopoverPlacement">
<summary><code>LhPopoverPlacement</code> <sub>(from @lh-ui/share/core/shared/popper)</sub></summary>

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

<details id="type-LhPopoverTrigger">
<summary><code>LhPopoverTrigger</code> <sub>(from @lh-ui/share/core/popover (logic.ts))</sub></summary>

```ts
export type LhPopoverTrigger = 'click' | 'hover' | 'focus' | 'manual'
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
import { ref } from 'vue'

const manualVisible = ref(false)
const placements = [
  'top', 'top-start', 'top-end',
  'bottom', 'bottom-start', 'bottom-end',
  'left', 'left-start', 'left-end',
  'right', 'right-start', 'right-end',
] as const
const note = ref('')
const saved = ref('')
function saveNote() {
  if (!note.value) return
  saved.value = note.value
  note.value = ''
}
const popVisible = ref(false)
</script>

<style scoped>
.demo-popover-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}
.demo-popover-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  width: 100%;
}
.demo-popover-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 220px;
}
.demo-popover-saved {
  margin-top: 12px;
  color: var(--lh-text-secondary);
}
</style>
