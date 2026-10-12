# Tabs

Switch between peer content panels. Strictly aligned with the WAI-ARIA APG tabs pattern: `tablist/tab/tabpanel` role wiring, roving tabindex and arrow-key navigation.

## Basic Usage

<DemoBlock title="Basic Usage">
  <LhTabs>
    <LhTabPane name="prose" label="Prose">Prose content.</LhTabPane>
    <LhTabPane name="poem" label="Poetry">Poetry content.</LhTabPane>
    <LhTabPane name="calligraphy" label="Calligraphy">Calligraphy content.</LhTabPane>
  </LhTabs>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhTabs>
    <LhTabPane name="prose" label="Prose">Prose content.</LhTabPane>
    <LhTabPane name="poem" label="Poetry">Poetry content.</LhTabPane>
    <LhTabPane name="calligraphy" label="Calligraphy">Calligraphy content.</LhTabPane>
  </LhTabs>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhTabs>
    <LhTabPane name="prose" label="Prose">Prose content.</LhTabPane>
    <LhTabPane name="poem" label="Poetry">Poetry content.</LhTabPane>
    <LhTabPane name="calligraphy" label="Calligraphy">Calligraphy content.</LhTabPane>
  </LhTabs>
</template>
```

## Card Type and Disabled Panes

<DemoBlock title="Card Type and Disabled Panes">
  <LhTabs type="card">
    <LhTabPane name="ink" label="Ink">Ink content.</LhTabPane>
    <LhTabPane name="cinnabar" label="Cinnabar" disabled>Disabled content.</LhTabPane>
    <LhTabPane name="gold" label="Gold">Gold content.</LhTabPane>
  </LhTabs>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhTabs type="card">
    <LhTabPane name="ink" label="Ink">Ink content.</LhTabPane>
    <LhTabPane name="cinnabar" label="Cinnabar" disabled>Disabled content.</LhTabPane>
    <LhTabPane name="gold" label="Gold">Gold content.</LhTabPane>
  </LhTabs>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhTabs type="card">
    <LhTabPane name="ink" label="Ink">Ink content.</LhTabPane>
    <LhTabPane name="cinnabar" label="Cinnabar" disabled>Disabled content.</LhTabPane>
    <LhTabPane name="gold" label="Gold">Gold content.</LhTabPane>
  </LhTabs>
</template>
```

## Bottom Position

<DemoBlock title="Bottom Position">
  <LhTabs tab-position="bottom">
    <LhTabPane name="mountain" label="Mountain">Mountain content.</LhTabPane>
    <LhTabPane name="water" label="Water">Water content.</LhTabPane>
  </LhTabs>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhTabs tab-position="bottom">
    <LhTabPane name="mountain" label="Mountain">Mountain content.</LhTabPane>
    <LhTabPane name="water" label="Water">Water content.</LhTabPane>
  </LhTabs>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhTabs tab-position="bottom">
    <LhTabPane name="mountain" label="Mountain">Mountain content.</LhTabPane>
    <LhTabPane name="water" label="Water">Water content.</LhTabPane>
  </LhTabs>
</template>
```

## Closable and Addable

<DemoBlock title="Closable and Addable">
  <LhTabs closable addable @tab-remove="removePane" @tab-add="addPane">
    <LhTabPane
      v-for="pane in panes"
      :key="pane.name"
      :name="pane.name"
      :label="pane.label"
    >{{ pane.content }}</LhTabPane>
  </LhTabs>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
const panes = ref([
  { name: 's1', label: 'Scroll 1', content: 'First scroll.' },
  { name: 's2', label: 'Scroll 2', content: 'Second scroll.' },
])
let index = 2

const removePane = (name) => {
  const target = panes.value.find((pane) => pane.name === name)
  if (target) panes.value.splice(panes.value.indexOf(target), 1)
}
const addPane = () => {
  index += 1
  panes.value.push({ name: `s${index}`, label: `Scroll ${index}`, content: 'New scroll.' })
}
</script>

<template>
  <LhTabs closable addable @tab-remove="removePane" @tab-add="addPane">
    <LhTabPane v-for="pane in panes" :key="pane.name" :name="pane.name" :label="pane.label">
      {{ pane.content }}
    </LhTabPane>
  </LhTabs>
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      panes: [
        { name: 's1', label: 'Scroll 1', content: 'First scroll.', disabled: false },
        { name: 's2', label: 'Scroll 2', content: 'Second scroll.', disabled: false },
      ],
      index: 2,
    }
  },
  methods: {
    removePane(name) {
      const target = this.panes.find((pane) => pane.name === name)
      if (target) this.panes.splice(this.panes.indexOf(target), 1)
    },
    addPane() {
      this.index += 1
      this.panes.push({ name: `s${this.index}`, label: `Scroll ${this.index}`, content: 'New scroll.', disabled: false })
    },
  },
}
</script>

<template>
  <LhTabs closable addable @tab-remove="removePane" @tab-add="addPane">
    <LhTabPane v-for="pane in panes" :key="pane.name" :name="pane.name" :label="pane.label">
      {{ pane.content }}
    </LhTabPane>
  </LhTabs>
</template>
```

> When the active pane is closed the component switches to a neighbouring enabled pane and emits `tab-remove`; the data owner removes the pane from its source.

## Controlled Usage

<DemoBlock title="Controlled Usage">
  <LhTabs v-model="active" type="card">
    <LhTabPane name="zh" label="Guofeng">Guofeng content.</LhTabPane>
    <LhTabPane name="mo" label="Ink Wash">Ink wash content.</LhTabPane>
  </LhTabs>
  <p class="demo-tabs-current">Active tab: {{ active }}</p>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
const active = ref('mo')
</script>

<template>
  <LhTabs v-model="active" type="card">
    <LhTabPane name="zh" label="Guofeng">Guofeng content.</LhTabPane>
    <LhTabPane name="mo" label="Ink Wash">Ink wash content.</LhTabPane>
  </LhTabs>
</template>
```

```vue options
<script>
export default {
  data() {
    return { active: 'mo' }
  },
}
</script>

<template>
  <LhTabs v-model="active" type="card">
    <LhTabPane name="zh" label="Guofeng">Guofeng content.</LhTabPane>
    <LhTabPane name="mo" label="Ink Wash">Ink wash content.</LhTabPane>
  </LhTabs>
</template>
```

## Tabs API

### LhTabs Props

| Prop | Description | Type | Default |
|------|-------------|------|---------|
| modelValue | Active pane name (v-model) | `string` | — |
| type | Appearance | `"line" \| "card"` | `'line'` |
| closable | Whether tabs can be closed | `boolean` | `false` |
| addable | Whether to show the add button | `boolean` | `false` |
| tabPosition | Tab position | `"top" \| "bottom"` | `'top'` |
| sx | Quick layout props | `LhSxProps` | — |

### LhTabs Events

| Event | Description | Callback |
|-------|-------------|----------|
| update:modelValue | Active pane changed (v-model) | `(name: string)` |
| tab-change | Active pane changed | `(name: string)` |
| tab-remove | Pane closed | `(name: string)` |
| tab-add | Add button clicked | — |

### LhTabPane Props

| Prop | Description | Type | Default |
|------|-------------|------|---------|
| name | Unique pane key (stable, not meant to change dynamically) | `string` | — |
| label | Tab title | `string` | `''` |
| disabled | Whether the pane is disabled | `boolean` | `false` |

### Slots

| Slot | Description | Component |
|------|-------------|-----------|
| default | Tab panes (LhTabPane list) | LhTabs |
| default | Panel content | LhTabPane |

### Accessibility

Strictly aligned with the WAI-ARIA APG tabs pattern:

- The header is `role="tablist"`; every tab is `role="tab"` (`aria-selected` + `aria-controls`); panels are `role="tabpanel"` (`aria-labelledby` + `tabindex="0"`)
- **Roving tabindex**: only the active tab is Tab-focusable, the rest are `tabindex="-1"`
- Arrow keys move and auto-activate among enabled tabs (skipping disabled ones); Home/End jump to the ends
- With `closable`, pressing Delete closes the focused tab; the close glyph is an `aria-hidden` decoration so no button is nested inside a button
- Disabled tabs cannot be focused or activated; `tab-remove` is a no-op for them

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## Type Definitions

The TypeScript type structures exported by this component (auto-extracted from `packages/components/tabs/src/types.ts` and `@lh-ui/share/core/*` sources; click each entry to expand; see the Props table above for attribute descriptions):

<details id="type-LhTabsProps">
<summary><code>LhTabsProps</code></summary>

```ts
export interface LhTabsProps {
  modelValue?: string
  type?: LhTabsType
  closable?: boolean
  addable?: boolean
  tabPosition?: LhTabsPosition
  sx?: LhSxProps
}
```

</details>

<details id="type-LhTabPaneProps">
<summary><code>LhTabPaneProps</code></summary>

```ts
export interface LhTabPaneProps {
  name: string
  label?: string
  disabled?: boolean
}
```

</details>

<details id="type-LhTabsType">
<summary><code>LhTabsType</code> <sub>(from @lh-ui/share/core/tabs)</sub></summary>

```ts
export type LhTabsType = 'line' | 'card'
```

</details>

<details id="type-LhTabsPosition">
<summary><code>LhTabsPosition</code> <sub>(from @lh-ui/share/core/tabs)</sub></summary>

```ts
export type LhTabsPosition = 'top' | 'bottom'
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
import { ref } from 'vue'

const panes = ref([
  { name: 's1', label: 'Scroll 1', content: 'First scroll.' },
  { name: 's2', label: 'Scroll 2', content: 'Second scroll.' },
])
let index = 2

const removePane = (name: string) => {
  const target = panes.value.find((pane) => pane.name === name)
  if (target) panes.value.splice(panes.value.indexOf(target), 1)
}
const addPane = () => {
  index += 1
  panes.value.push({ name: `s${index}`, label: `Scroll ${index}`, content: 'New scroll.' })
}
const active = ref('mo')
</script>
