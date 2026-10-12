# Menu

Page navigation. Horizontal / vertical layouts, nested submenus, collapse mode, accordion, keyboard aligned with the APG menu pattern.

## Vertical (inline submenus)

> Vertical inline mode supports keyboard traversal: once a submenu is expanded, ↑/↓ move across boundaries between leaf items, submenu titles and panel items (Home/End jump to the ends), skipping disabled items and items inside collapsed panels.

<DemoBlock title="Vertical">
  <LhMenu v-model="activeVertical">
    <LhMenuItem index="home">Home</LhMenuItem>
    <LhSubMenu index="settings" title="Settings">
      <LhMenuItem index="settings-basic">Basic</LhMenuItem>
      <LhMenuItem index="settings-security">Security</LhMenuItem>
    </LhSubMenu>
    <LhMenuItem index="docs" disabled>Disabled</LhMenuItem>
  </LhMenu>
</DemoBlock>

```vue composition
<script setup>
import { ref } from 'vue'
const active = ref('home')
</script>

<template>
  <!-- Vertical -->
  <LhMenu v-model="active">
    <LhMenuItem index="home">Home</LhMenuItem>
    <LhSubMenu index="settings" title="Settings">
      <LhMenuItem index="settings-basic">Basic</LhMenuItem>
      <LhMenuItem index="settings-security">Security</LhMenuItem>
    </LhSubMenu>
    <LhMenuItem index="docs" disabled>Disabled</LhMenuItem>
  </LhMenu>
</template>
```

```vue options
<script>
export default {
  data() {
    return { active: 'home' }
  },
}
</script>

<template>
  <!-- Vertical -->
  <LhMenu v-model="active">
    <LhMenuItem index="home">Home</LhMenuItem>
    <LhSubMenu index="settings" title="Settings">
      <LhMenuItem index="settings-basic">Basic</LhMenuItem>
      <LhMenuItem index="settings-security">Security</LhMenuItem>
    </LhSubMenu>
    <LhMenuItem index="docs" disabled>Disabled</LhMenuItem>
  </LhMenu>
</template>
```

## Expansion control

`default-openeds` lists submenus expanded initially; `openeds` (with `v-model:openeds`) controls the open set; `unique-opened` allows only one submenu open at a time. `LhSubMenu` also accepts `disabled`.

<DemoBlock title="Expansion control">
  <LhMenu
    v-model="activeOpen"
    :default-openeds="['settings2']"
    unique-opened
    style="max-width: 240px"
  >
    <LhSubMenu index="settings2" title="Settings (open by default)">
      <LhMenuItem index="settings2-basic">Basic</LhMenuItem>
    </LhSubMenu>
    <LhSubMenu index="manage" title="Manage (disabled)" disabled>
      <LhMenuItem index="manage-users">Users</LhMenuItem>
    </LhSubMenu>
    <LhMenuItem index="about2">About</LhMenuItem>
  </LhMenu>
</DemoBlock>

```vue composition
<script setup>
import { ref } from 'vue'
const active2 = ref('settings2-basic')
</script>

<template>
  <!-- Expansion control -->
  <LhMenu
    v-model="active2"
    :default-openeds="['settings2']"
    unique-opened
    style="max-width: 240px"
  >
    <LhSubMenu index="settings2" title="Settings (open by default)">
      <LhMenuItem index="settings2-basic">Basic</LhMenuItem>
    </LhSubMenu>
    <LhSubMenu index="manage" title="Manage (disabled)" disabled>
      <LhMenuItem index="manage-users">Users</LhMenuItem>
    </LhSubMenu>
    <LhMenuItem index="about2">About</LhMenuItem>
  </LhMenu>
</template>
```

```vue options
<script>
export default {
  data() {
    return { active2: 'settings2-basic' }
  },
}
</script>

<template>
  <!-- Expansion control -->
  <LhMenu
    v-model="active2"
    :default-openeds="['settings2']"
    unique-opened
    style="max-width: 240px"
  >
    <LhSubMenu index="settings2" title="Settings (open by default)">
      <LhMenuItem index="settings2-basic">Basic</LhMenuItem>
    </LhSubMenu>
    <LhSubMenu index="manage" title="Manage (disabled)" disabled>
      <LhMenuItem index="manage-users">Users</LhMenuItem>
    </LhSubMenu>
    <LhMenuItem index="about2">About</LhMenuItem>
  </LhMenu>
</template>
```

<DemoBlock title="Controlled open set">
  <LhMenu v-model="activeOpen" :openeds="['settings2']">
    <LhSubMenu index="settings2" title="Settings">
      <LhMenuItem index="settings2-basic">Basic</LhMenuItem>
    </LhSubMenu>
  </LhMenu>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const active2 = ref('settings2-basic')
</script>

<template>
  <!-- Controlled open set -->
  <LhMenu v-model="active2" :openeds="['settings2']">
    <LhSubMenu index="settings2" title="Settings">
      <LhMenuItem index="settings2-basic">Basic</LhMenuItem>
    </LhSubMenu>
  </LhMenu>
</template>
```

```vue options
<script>
export default {
  data() {
    return { active2: 'settings2-basic' }
  },
}
</script>

<template>
  <!-- Controlled open set -->
  <LhMenu v-model="active2" :openeds="['settings2']">
    <LhSubMenu index="settings2" title="Settings">
      <LhMenuItem index="settings2-basic">Basic</LhMenuItem>
    </LhSubMenu>
  </LhMenu>
</template>
```

## Horizontal (flyout submenus)

<DemoBlock title="Horizontal">
  <LhMenu v-model="activeHorizontal" mode="horizontal">
    <LhMenuItem index="home">Home</LhMenuItem>
    <LhSubMenu index="settings" title="Settings">
      <LhMenuItem index="settings-basic">Basic</LhMenuItem>
    </LhSubMenu>
  </LhMenu>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const active = ref('home')
</script>

<template>
  <!-- Horizontal -->
  <LhMenu v-model="active" mode="horizontal">
    <LhMenuItem index="home">Home</LhMenuItem>
    <LhSubMenu index="settings" title="Settings">
      <LhMenuItem index="settings-basic">Basic</LhMenuItem>
    </LhSubMenu>
  </LhMenu>
</template>
```

```vue options
<script>
export default {
  data() {
    return { active: 'home' }
  },
}
</script>

<template>
  <!-- Horizontal -->
  <LhMenu v-model="active" mode="horizontal">
    <LhMenuItem index="home">Home</LhMenuItem>
    <LhSubMenu index="settings" title="Settings">
      <LhMenuItem index="settings-basic">Basic</LhMenuItem>
    </LhSubMenu>
  </LhMenu>
</template>
```

## Collapse and groups

<DemoBlock title="Collapse + group">
  <LhMenu v-model="activeCollapse" collapse>
    <LhMenuItemGroup title="Content">
      <LhMenuItem index="home">Home</LhMenuItem>
    </LhMenuItemGroup>
  </LhMenu>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const active = ref('home')
</script>

<template>
  <!-- Collapse + group -->
  <LhMenu v-model="active" collapse>
    <LhMenuItemGroup title="Content">
      <LhMenuItem index="home">Home</LhMenuItem>
    </LhMenuItemGroup>
  </LhMenu>
</template>
```

```vue options
<script>
export default {
  data() {
    return { active: 'home' }
  },
}
</script>

<template>
  <!-- Collapse + group -->
  <LhMenu v-model="active" collapse>
    <LhMenuItemGroup title="Content">
      <LhMenuItem index="home">Home</LhMenuItem>
    </LhMenuItemGroup>
  </LhMenu>
</template>
```

## API

### LhMenu Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue | Active item (controlled v-model; internal state when omitted) | `string` | — |
| mode | Layout mode | `"horizontal" \| "vertical"` | `'vertical'` |
| collapse | Collapse vertical menu to an icon bar (submenus become flyouts) | `boolean` | `false` |
| defaultOpeneds | Opened submenu keys (uncontrolled) | `string[]` | `() => []` |
| openeds | Opened submenu keys (controlled) | `string[]` | — |
| uniqueOpened | Accordion: only one submenu open at a time | `boolean` | `false` |
| sx | Quick layout props | `LhSxProps` | — |

### LhMenu Events

| Event | Description | Callback |
|-------|-------------|----------|
| update:modelValue | Active item changed (v-model) | `(value: string) => void` |
| select | A menu item is activated | `(index: string, indexPath: string[]) => void` |
| open | A submenu expands | `(index: string, indexPath: string[]) => void` |
| close | A submenu collapses | `(index: string, indexPath: string[]) => void` |
| update:openeds | Opened submenu keys changed (v-model:openeds) | `(value: string[]) => void` |

### LhMenuItem Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| index | Unique key (required) | `string` | — |
| disabled | Disabled | `boolean` | `false` |
| sx | Quick layout props | `LhSxProps` | — |

### LhMenuItem Events

| Event | Description | Callback |
|-------|-------------|----------|
| click | Item is clicked; the menu emits `select` afterwards | `(index: string) => void` |

Slot: `default`.

### LhSubMenu Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| index | Unique key (required) | `string` | — |
| title | Title (or title slot) | `string` | — |
| disabled | Disabled | `boolean` | `false` |
| sx | Quick layout props | `LhSxProps` | — |

### LhSubMenu Events

| Event | Description | Callback |
|-------|-------------|----------|
| select | An item inside the submenu is activated (bubbles from nested items) | `(index: string, indexPath: string[]) => void` |

Slots: `title`, `default` (nest LhSubMenu recursively).

### LhMenuItemGroup Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| title | Group title (or title slot) | `string` | — |
| sx | Quick layout props | `LhSxProps` | — |

Slots: `title`, `default`.

## Accessibility

- Horizontal renders `role="menubar"`, vertical `role="menu"`; items are `role="menuitem"`, groups `role="group"` (wrapper `role="presentation"`)
- Submenu titles expose `aria-haspopup` + `aria-expanded` + `aria-controls`
- Keyboard: Enter/Space/→ opens and focuses the first item, ← collapses, Esc closes; in vertical inline mode ↑/↓/Home/End traverse across boundaries between visible items (leaf items, submenu titles and expanded panel items) with wrapping, skipping disabled items and items inside collapsed panels
- Inline expansion uses CSS `grid-template-rows: 0fr/1fr` (no JS height measurement); flyout panels are positioned by the popper engine (flip/shift, collapses when the trigger scrolls out of view)

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## Type Definitions

The TypeScript type structures exported by this component (auto-extracted from `packages/components/menu/src/types.ts` and `@lh-ui/share/core/*` sources; click each entry to expand; see the Props table above for attribute descriptions):

<details id="type-LhMenuProps">
<summary><code>LhMenuProps</code></summary>

```ts
export interface LhMenuProps {
  modelValue?: string
  mode?: LhMenuMode
  collapse?: boolean
  defaultOpeneds?: string[]
  openeds?: string[]
  uniqueOpened?: boolean
  sx?: LhSxProps
}
```

</details>

<details id="type-LhMenuItemProps">
<summary><code>LhMenuItemProps</code></summary>

```ts
export interface LhMenuItemProps {
  index: string
  disabled?: boolean
  sx?: LhSxProps
}
```

</details>

<details id="type-LhSubMenuProps">
<summary><code>LhSubMenuProps</code></summary>

```ts
export interface LhSubMenuProps {
  index: string
  title?: string
  disabled?: boolean
  sx?: LhSxProps
}
```

</details>

<details id="type-LhMenuItemGroupProps">
<summary><code>LhMenuItemGroupProps</code></summary>

```ts
export interface LhMenuItemGroupProps {
  title?: string
  sx?: LhSxProps
}
```

</details>

<details id="type-LhMenuMode">
<summary><code>LhMenuMode</code> <sub>(from @lh-ui/share/core/menu)</sub></summary>

```ts
export type LhMenuMode = 'horizontal' | 'vertical'
```

</details>

<!-- lh-types:end -->
<script setup>
import { ref } from 'vue'
// Page-level shared refs split per demo: every DemoBlock on the page shares this
// one setup scope, so a selection in one demo would also highlight the others
const activeVertical = ref('home')
const activeHorizontal = ref('home')
const activeCollapse = ref('home')
const activeOpen = ref('settings2-basic')
</script>
