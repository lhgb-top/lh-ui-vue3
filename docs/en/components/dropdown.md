# Dropdown

A menu of commands that drops down from a trigger. The trigger can be any element; items are identified by `command`, which is emitted as a `command` event on click. Implemented after the WAI-ARIA menu pattern: arrow keys cycle, Home/End jump to the ends, Enter/Space activate, Escape closes and returns focus.

## Basic usage

<DemoBlock title="click trigger + command event">
  <LhDropdown @command="onCommand">
    <LhButton>{{ selectedLabel || 'Actions' }} ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem command="new">New</LhDropdownItem>
      <LhDropdownItem command="edit">Edit</LhDropdownItem>
      <LhDropdownItem command="delete">Delete</LhDropdownItem>
    </template>
  </LhDropdown>
  <p class="demo-dropdown-log">Last command: {{ lastCommand || '—' }}</p>
</DemoBlock>

```vue composition
<template>
  <LhDropdown @command="onCommand">
    <LhButton>{{ selectedLabel || 'Actions' }} ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem command="new">New</LhDropdownItem>
      <LhDropdownItem command="edit">Edit</LhDropdownItem>
      <LhDropdownItem command="delete">Delete</LhDropdownItem>
    </template>
  </LhDropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// The trigger label is owned by the consumer: command only carries the value,
// how it is displayed is up to the parent
const lastCommand = ref('')
const labelMap: Record<string, string> = { new: 'New', edit: 'Edit', delete: 'Delete' }
const selectedLabel = ref('')
function onCommand(command: string | number | undefined) {
  lastCommand.value = String(command)
  selectedLabel.value = labelMap[String(command)] ?? String(command)
}
</script>
```

```vue options
<script>
export default {
  data() {
    return {
      lastCommand: '',
      // The trigger label is owned by the consumer: command only carries the value,
      // how it is displayed is up to the parent
      labelMap: { new: 'New', edit: 'Edit', delete: 'Delete' },
      selectedLabel: '',
    }
  },
  methods: {
    onCommand(command) {
      this.lastCommand = String(command)
      this.selectedLabel = this.labelMap[String(command)] ?? String(command)
    },
  },
}
</script>

<template>
  <LhDropdown @command="onCommand">
    <LhButton>{{ selectedLabel || 'Actions' }} ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem command="new">New</LhDropdownItem>
      <LhDropdownItem command="edit">Edit</LhDropdownItem>
      <LhDropdownItem command="delete">Delete</LhDropdownItem>
    </template>
  </LhDropdown>
</template>
```

## Trigger modes

The default is `click`; `hover` and `contextmenu` are opt-in.

<DemoBlock title="hover / contextmenu">
  <div class="demo-dropdown-row">
    <LhDropdown trigger="hover" @command="onHoverCommand">
      <LhButton>{{ hoverLabel || 'Hover trigger' }} ▾</LhButton>
      <template #dropdown>
        <LhDropdownItem command="hover-1">Option one</LhDropdownItem>
        <LhDropdownItem command="hover-2">Option two</LhDropdownItem>
      </template>
    </LhDropdown>
    <LhDropdown trigger="contextmenu" @command="onContextCommand">
      <LhButton>{{ contextLabel || 'Right-click trigger' }} ▾</LhButton>
      <template #dropdown>
        <LhDropdownItem command="ctx-1">Refresh</LhDropdownItem>
        <LhDropdownItem command="ctx-2">Copy</LhDropdownItem>
      </template>
    </LhDropdown>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
const hoverLabel = ref('')
function onHoverCommand(command: string | number | undefined) {
  hoverLabel.value = String(command)
}
const contextLabel = ref('')
function onContextCommand(command: string | number | undefined) {
  contextLabel.value = String(command)
}
</script>

<template>
  <!-- Hover trigger -->
  <LhDropdown trigger="hover" @command="onHoverCommand">
    <LhButton>{{ hoverLabel || 'Hover trigger' }} ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem command="hover-1">Option one</LhDropdownItem>
      <LhDropdownItem command="hover-2">Option two</LhDropdownItem>
    </template>
  </LhDropdown>
  <!-- Right-click trigger -->
  <LhDropdown trigger="contextmenu" @command="onContextCommand">
    <LhButton>{{ contextLabel || 'Right-click trigger' }} ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem command="ctx-1">Refresh</LhDropdownItem>
      <LhDropdownItem command="ctx-2">Copy</LhDropdownItem>
    </template>
  </LhDropdown>
</template>
```

```vue options
<script>
export default {
  data() {
    return { hoverLabel: '', contextLabel: '' }
  },
  methods: {
    onHoverCommand(command) {
      this.hoverLabel = String(command)
    },
    onContextCommand(command) {
      this.contextLabel = String(command)
    },
  },
}
</script>

<template>
  <!-- Hover trigger -->
  <LhDropdown trigger="hover" @command="onHoverCommand">
    <LhButton>{{ hoverLabel || 'Hover trigger' }} ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem command="hover-1">Option one</LhDropdownItem>
      <LhDropdownItem command="hover-2">Option two</LhDropdownItem>
    </template>
  </LhDropdown>
  <!-- Right-click trigger -->
  <LhDropdown trigger="contextmenu" @command="onContextCommand">
    <LhButton>{{ contextLabel || 'Right-click trigger' }} ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem command="ctx-1">Refresh</LhDropdownItem>
      <LhDropdownItem command="ctx-2">Copy</LhDropdownItem>
    </template>
  </LhDropdown>
</template>
```

> The `contextmenu` trigger suppresses the browser's native context menu.

## Disabled items and dividers

<DemoBlock title="disabled / divided">
  <LhDropdown @command="onActionCommand">
    <LhButton>{{ actionLabel || 'Actions' }} ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem command="export">Export</LhDropdownItem>
      <LhDropdownItem command="import">Import</LhDropdownItem>
      <LhDropdownItem divided command="audit">Audit log</LhDropdownItem>
      <LhDropdownItem disabled command="purge">Purge data</LhDropdownItem>
    </template>
  </LhDropdown>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
const actionLabel = ref('')
function onActionCommand(command: string | number | undefined) {
  actionLabel.value = String(command)
}
</script>

<template>
  <!-- Actions menu with divided and disabled items -->
  <LhDropdown @command="onActionCommand">
    <LhButton>{{ actionLabel || 'Actions' }} ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem command="export">Export</LhDropdownItem>
      <LhDropdownItem command="import">Import</LhDropdownItem>
      <LhDropdownItem divided command="audit">Audit log</LhDropdownItem>
      <LhDropdownItem disabled command="purge">Purge data</LhDropdownItem>
    </template>
  </LhDropdown>
</template>
```

```vue options
<script>
export default {
  data() {
    return { actionLabel: '' }
  },
  methods: {
    onActionCommand(command) {
      this.actionLabel = String(command)
    },
  },
}
</script>

<template>
  <!-- Actions menu with divided and disabled items -->
  <LhDropdown @command="onActionCommand">
    <LhButton>{{ actionLabel || 'Actions' }} ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem command="export">Export</LhDropdownItem>
      <LhDropdownItem command="import">Import</LhDropdownItem>
      <LhDropdownItem divided command="audit">Audit log</LhDropdownItem>
      <LhDropdownItem disabled command="purge">Purge data</LhDropdownItem>
    </template>
  </LhDropdown>
</template>
```

> A disabled item stays focusable (`aria-disabled="true"`) so screen readers can announce it, but arrow keys skip it and neither clicks nor Enter/Space emit `command`.

## Placement and max height

<DemoBlock title="placement with maxHeight">
  <LhDropdown placement="bottom-end" :max-height="160" @command="onItemCommand">
    <LhButton>{{ itemLabel || 'Bottom-end' }} ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem v-for="i in 12" :key="i" :command="i">Item {{ i }}</LhDropdownItem>
    </template>
  </LhDropdown>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
const itemLabel = ref('')
function onItemCommand(command: string | number | undefined) {
  itemLabel.value = `Item ${command}`
}
</script>

<template>
  <!-- Bottom-end placement with a max height -->
  <LhDropdown placement="bottom-end" :max-height="160" @command="onItemCommand">
    <LhButton>{{ itemLabel || 'Bottom-end' }} ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem v-for="i in 12" :key="i" :command="i">Item {{ i }}</LhDropdownItem>
    </template>
  </LhDropdown>
</template>
```

```vue options
<script>
export default {
  data() {
    return { itemLabel: '' }
  },
  methods: {
    onItemCommand(command) {
      this.itemLabel = `Item ${command}`
    },
  },
}
</script>

<template>
  <!-- Bottom-end placement with a max height -->
  <LhDropdown placement="bottom-end" :max-height="160" @command="onItemCommand">
    <LhButton>{{ itemLabel || 'Bottom-end' }} ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem v-for="i in 12" :key="i" :command="i">Item {{ i }}</LhDropdownItem>
    </template>
  </LhDropdown>
</template>
```

## Controlled visibility and click behavior

`v-model:visible` controls visibility manually; `hide-on-click` decides whether the menu closes after a selection; `popper-class` adds a custom class to the popup; `teleport-target` selects the mount container.

<DemoBlock title="Controlled visibility">
  <LhDropdown v-model:visible="menuVisible" :hide-on-click="false" popper-class="demo-dropdown-popper">
    <LhButton>{{ menuVisible ? 'Collapse' : 'Expand' }} ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem command="copy">Copy (menu stays open)</LhDropdownItem>
      <LhDropdownItem command="paste">Paste</LhDropdownItem>
    </template>
  </LhDropdown>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
const menuVisible = ref(false)
</script>

<template>
  <!-- Controlled visibility: the menu stays open after a click -->
  <LhDropdown
    v-model:visible="menuVisible"
    :hide-on-click="false"
    popper-class="demo-dropdown-popper"
  >
    <LhButton>{{ menuVisible ? 'Collapse' : 'Expand' }} ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem command="copy">Copy (menu stays open)</LhDropdownItem>
      <LhDropdownItem command="paste">Paste</LhDropdownItem>
    </template>
  </LhDropdown>
</template>
```

```vue options
<script>
export default {
  data() {
    return { menuVisible: false }
  },
}
</script>

<template>
  <!-- Controlled visibility: the menu stays open after a click -->
  <LhDropdown
    v-model:visible="menuVisible"
    :hide-on-click="false"
    popper-class="demo-dropdown-popper"
  >
    <LhButton>{{ menuVisible ? 'Collapse' : 'Expand' }} ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem command="copy">Copy (menu stays open)</LhDropdownItem>
      <LhDropdownItem command="paste">Paste</LhDropdownItem>
    </template>
  </LhDropdown>
</template>
```

<DemoBlock title="Mount target">
  <LhDropdown teleport-target="#dropdown-zone">
    <LhButton>More ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem command="a">Option</LhDropdownItem>
    </template>
  </LhDropdown>
  <div id="dropdown-zone" class="demo-dropdown-zone">Teleport host (#dropdown-zone)</div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- Mount into a specific container -->
  <LhDropdown teleport-target="#dropdown-zone">
    <LhButton>More ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem command="a">Option</LhDropdownItem>
    </template>
  </LhDropdown>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- Mount into a specific container -->
  <LhDropdown teleport-target="#dropdown-zone">
    <LhButton>More ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem command="a">Option</LhDropdownItem>
    </template>
  </LhDropdown>
</template>
```

## Dropdown API

### Props

| Name | Description | Type | Default |
| ---- | ---- | ---- | ------ |
| trigger | Trigger mode | `"hover" \| "click" \| "contextmenu"` | `'click'` |
| placement | Placement (12 values, same as Tooltip) | `"top" \| "top-start" \| "top-end" \| "bottom" \| "bottom-start" \| "bottom-end" \| "left" \| "left-start" \| "left-end" \| "right" \| "right-start" \| "right-end"` | `'bottom-start'` |
| visible | Visibility (`v-model:visible`) | `boolean` | — |
| disabled | Disable the trigger | `boolean` | — |
| hideOnClick | Close the menu after an item is clicked | `boolean` | `true` |
| teleportTarget | Teleport target (selector or element) | `string \| HTMLElement` | `'body'` |
| popperClass | Custom class for the popper | `string` | — |
| maxHeight | Menu max height (numbers are px) | `string \| number` | — |
| themeVars | Component-level theme variables | `{ [x: string]: string; }` | — |
| bgPattern | Component-level background pattern, overriding the ConfigProvider configuration | `string` | — |
| sx | sx shorthand styles (applied to the trigger root) | `SxProps` | — |

### Events

| Name | Description | Parameters |
| ---- | ---- | ---- |
| command | Emitted when an item is clicked | `(command: string \| number \| undefined)` |
| click | A menu item (`LhDropdownItem`) is clicked | `(command: string \| number \| undefined)` |
| visible-change | Visibility changed | `(value: boolean)` |
| update:visible | Visibility changed (v-model) | `(value: boolean)` |

### Slots

| Name | Description |
| ---- | ---- |
| default | Trigger content |
| dropdown | Menu content (a list of `LhDropdownItem`) |

### Methods

| Method | Description |
| ---- | ---- |
| show | Open programmatically |
| hide | Close programmatically |
| toggle | Toggle programmatically |

## DropdownItem API

### Props

| Name | Description | Type | Default |
| ---- | ---- | ---- | ------ |
| command | Identifier emitted with the `command` event | `string \| number` | — |
| disabled | Disable the item | `boolean` | `false` |
| divided | Show a divider above the item | `boolean` | `false` |

### Accessibility

- The trigger carries `aria-haspopup="menu"` and `aria-expanded`; the menu is a `role="menu"` and items are `role="menuitem"`
- Keyboard follows the APG menu pattern: ↑/↓ cycle (skipping disabled items), Home/End jump to the ends, Enter/Space emit `command` and close, Escape closes and returns focus
- Disabled items use `aria-disabled` rather than being removed from the focus tree; arrow keys and Enter both skip them
- The menu flips on the main axis when it would overflow the viewport and is clamped back on the cross axis

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## Type Definitions

The TypeScript type structures exported by this component (auto-extracted from `packages/components/dropdown/src/types.ts` and `@lh-ui/share/core/*` sources; click each entry to expand; see the Props table above for attribute descriptions):

<details id="type-LhDropdownProps">
<summary><code>LhDropdownProps</code></summary>

```ts
export interface LhDropdownProps {
  trigger?: LhDropdownTrigger
  placement?: LhDropdownPlacement
  visible?: boolean
  disabled?: boolean
  hideOnClick?: boolean
  teleportTarget?: string | HTMLElement
  popperClass?: string
  maxHeight?: string | number
  themeVars?: Record<string, string>
  bgPattern?: string
  sx?: SxProps
}
```

</details>

<details id="type-LhDropdownItemProps">
<summary><code>LhDropdownItemProps</code></summary>

```ts
export interface LhDropdownItemProps {
  command?: string | number
  disabled?: boolean
  divided?: boolean
}
```

</details>

<details id="type-LhDropdownTrigger">
<summary><code>LhDropdownTrigger</code> <sub>(from @lh-ui/share/core/dropdown (logic.ts))</sub></summary>

```ts
export type LhDropdownTrigger = 'hover' | 'click' | 'contextmenu'
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
import { ref } from 'vue'

// Each demo keeps its own state: demos must not share a single ref, otherwise an
// action in one demo rewrites the other demo's button label or log
const lastCommand = ref('')
// The trigger label is owned by the consumer: command only carries the value,
// how it is displayed is up to the parent
const labelMap: Record<string, string> = { new: 'New', edit: 'Edit', delete: 'Delete' }
const selectedLabel = ref('')

function onCommand(command: string | number | undefined) {
  lastCommand.value = String(command)
  selectedLabel.value = labelMap[String(command)] ?? String(command)
}

const hoverLabelMap: Record<string, string> = { 'hover-1': 'Option one', 'hover-2': 'Option two' }
const hoverLabel = ref('')

function onHoverCommand(command: string | number | undefined) {
  hoverLabel.value = hoverLabelMap[String(command)] ?? String(command)
}

const contextLabelMap: Record<string, string> = { 'ctx-1': 'Refresh', 'ctx-2': 'Copy' }
const contextLabel = ref('')

function onContextCommand(command: string | number | undefined) {
  contextLabel.value = contextLabelMap[String(command)] ?? String(command)
}

const actionLabelMap: Record<string, string> = {
  export: 'Export',
  import: 'Import',
  audit: 'Audit log',
  purge: 'Purge data',
}
const actionLabel = ref('')

function onActionCommand(command: string | number | undefined) {
  actionLabel.value = actionLabelMap[String(command)] ?? String(command)
}

const itemLabel = ref('')

function onItemCommand(command: string | number | undefined) {
  itemLabel.value = `Item ${command}`
}
const menuVisible = ref(false)
</script>

<style scoped>
.demo-dropdown-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.demo-dropdown-log {
  margin-top: 12px;
  color: var(--lh-text-color-secondary);
}
.demo-dropdown-zone {
  margin-top: 16px;
  width: 100%;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed var(--lh-border-color, #d4cfc6);
  border-radius: 6px;
  color: var(--lh-text-color-secondary);
}
</style>
