# Drawer

A panel that slides in from a screen edge — better suited than a dialog to edge-anchored, momentary tasks such as details, filters, or wizard steps. It mirrors the Dialog contract: `role="dialog"` + `aria-modal="true"`, focus trapped inside, and both Escape and mask clicks close it.

## Basic usage

<DemoBlock title="Right drawer">
  <LhButton @click="basic = true">Open drawer</LhButton>
  <LhDrawer v-model="basic" title="Order details">
    <p>Body content goes here.</p>
    <p>The panel width comes from size — 30% of the viewport by default.</p>
  </LhDrawer>
</DemoBlock>

```vue composition
<template>
  <LhButton @click="basic = true">Open drawer</LhButton>
  <LhDrawer v-model="basic" title="Order details">
    <p>Body content goes here.</p>
  </LhDrawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const basic = ref(false)
</script>
```

```vue options
<script>
export default {
  data() {
    return { basic: false }
  },
}
</script>

<template>
  <LhButton @click="basic = true">Open drawer</LhButton>
  <LhDrawer v-model="basic" title="Order details">
    <p>Body content goes here.</p>
  </LhDrawer>
</template>
```

## Directions

<DemoBlock title="right / left / top / bottom">
  <div class="demo-drawer-row">
    <LhButton @click="openDir('right')">right</LhButton>
    <LhButton @click="openDir('left')">left</LhButton>
    <LhButton @click="openDir('top')">top</LhButton>
    <LhButton @click="openDir('bottom')">bottom</LhButton>
  </div>
  <LhDrawer v-model="dirVisible" :title="`${direction} drawer`" :direction="direction" size="40%">
    <p>Direction: {{ direction }}</p>
  </LhDrawer>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
const dirVisible = ref(false)
const direction = ref<'right' | 'left' | 'top' | 'bottom'>('right')
function openDir(d: 'right' | 'left' | 'top' | 'bottom') {
  direction.value = d
  dirVisible.value = true
}
</script>

<template>
  <!-- Open the right drawer -->
  <LhButton @click="openDir('right')">right</LhButton>
  <!-- Open the left drawer -->
  <LhButton @click="openDir('left')">left</LhButton>
  <!-- Open the top drawer -->
  <LhButton @click="openDir('top')">top</LhButton>
  <!-- Open the bottom drawer -->
  <LhButton @click="openDir('bottom')">bottom</LhButton>
  <!-- Slides out in the given direction -->
  <LhDrawer v-model="dirVisible" :title="`${direction} drawer`" :direction="direction" size="40%">
    <p>Direction: {{ direction }}</p>
  </LhDrawer>
</template>
```

```vue options
<script>
export default {
  data() {
    return { dirVisible: false, direction: 'right' }
  },
  methods: {
    openDir(d) {
      this.direction = d
      this.dirVisible = true
    },
  },
}
</script>

<template>
  <!-- Open the right drawer -->
  <LhButton @click="openDir('right')">right</LhButton>
  <!-- Open the left drawer -->
  <LhButton @click="openDir('left')">left</LhButton>
  <!-- Open the top drawer -->
  <LhButton @click="openDir('top')">top</LhButton>
  <!-- Open the bottom drawer -->
  <LhButton @click="openDir('bottom')">bottom</LhButton>
  <!-- Slides out in the given direction -->
  <LhDrawer v-model="dirVisible" :title="`${direction} drawer`" :direction="direction" size="40%">
    <p>Direction: {{ direction }}</p>
  </LhDrawer>
</template>
```

## Size and footer

<DemoBlock title="size and the footer slot">
  <LhButton @click="sized = true">480px drawer</LhButton>
  <LhDrawer v-model="sized" title="Filters" :size="480">
    <div class="demo-drawer-form">
      <LhInput placeholder="Filter by name" />
      <LhInput placeholder="Filter by tag" />
    </div>
    <template #footer>
      <LhButton @click="sized = false">Cancel</LhButton>
      <LhButton type="primary" @click="sized = false">Apply</LhButton>
    </template>
  </LhDrawer>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const sized = ref(false)
</script>

<template>
  <!-- Open a 480px drawer -->
  <LhButton @click="sized = true">480px drawer</LhButton>
  <!-- Fixed-size drawer with a footer slot -->
  <LhDrawer v-model="sized" title="Filters" :size="480">
    <LhInput placeholder="Filter by name" />
    <LhInput placeholder="Filter by tag" />
    <template #footer>
      <LhButton @click="sized = false">Cancel</LhButton>
      <LhButton type="primary" @click="sized = false">Apply</LhButton>
    </template>
  </LhDrawer>
</template>
```

```vue options
<script>
export default {
  data() {
    return { sized: false }
  },
}
</script>

<template>
  <!-- Open a 480px drawer -->
  <LhButton @click="sized = true">480px drawer</LhButton>
  <!-- Fixed-size drawer with a footer slot -->
  <LhDrawer v-model="sized" title="Filters" :size="480">
    <LhInput placeholder="Filter by name" />
    <LhInput placeholder="Filter by tag" />
    <template #footer>
      <LhButton @click="sized = false">Cancel</LhButton>
      <LhButton type="primary" @click="sized = false">Apply</LhButton>
    </template>
  </LhDrawer>
</template>
```

> A numeric `size` is pixels; a string may be a percentage such as `'40%'`. Left/right apply to width, top/bottom to height.

## Behavior switches

`mask-closable` disables closing via the mask, `show-close` hides the close button, `close-on-esc` disables the Esc key, `lock-scroll` keeps the page scrollable while open, and `teleport-target` selects the mount container.

<DemoBlock title="Behavior switches">
  <LhButton @click="adv1 = true">Buttons only</LhButton>
  <LhButton @click="adv2 = true">No scroll lock</LhButton>
  <LhDrawer
    v-model="adv1"
    title="Buttons only"
    :mask-closable="false"
    :show-close="false"
    :close-on-esc="false"
  >
    <p>Neither mask clicks nor Esc close this drawer.</p>
    <template #footer>
      <LhButton type="primary" @click="adv1 = false">Close</LhButton>
    </template>
  </LhDrawer>
  <LhDrawer v-model="adv2" title="No scroll lock" :lock-scroll="false">
    <p>The page stays scrollable while the drawer is open.</p>
  </LhDrawer>
  <LhDrawer v-model="adv3" title="Mount target" teleport-target="#drawer-host">
    <p>The panel is teleported into the #drawer-host container.</p>
  </LhDrawer>
  <div id="drawer-host" />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const adv1 = ref(false)
const adv2 = ref(false)
const adv3 = ref(false)
</script>

<template>
  <!-- Open the "Buttons only" drawer -->
  <LhButton @click="adv1 = true">Buttons only</LhButton>
  <!-- Open the "No scroll lock" drawer -->
  <LhButton @click="adv2 = true">No scroll lock</LhButton>
  <!-- Neither mask clicks nor Esc close it -->
  <LhDrawer
    v-model="adv1"
    title="Buttons only"
    :mask-closable="false"
    :show-close="false"
    :close-on-esc="false"
  >
    <p>Neither mask clicks nor Esc close this drawer.</p>
    <template #footer>
      <LhButton type="primary" @click="adv1 = false">Close</LhButton>
    </template>
  </LhDrawer>
  <!-- The page stays scrollable while open -->
  <LhDrawer v-model="adv2" title="No scroll lock" :lock-scroll="false">
    <p>The page stays scrollable while the drawer is open.</p>
  </LhDrawer>
  <!-- Teleported into a specific container -->
  <LhDrawer v-model="adv3" title="Mount target" teleport-target="#drawer-host">
    <p>The panel is teleported into the #drawer-host container.</p>
  </LhDrawer>
</template>
```

```vue options
<script>
export default {
  data() {
    return { adv1: false, adv2: false, adv3: false }
  },
}
</script>

<template>
  <!-- Open the "Buttons only" drawer -->
  <LhButton @click="adv1 = true">Buttons only</LhButton>
  <!-- Open the "No scroll lock" drawer -->
  <LhButton @click="adv2 = true">No scroll lock</LhButton>
  <!-- Neither mask clicks nor Esc close it -->
  <LhDrawer
    v-model="adv1"
    title="Buttons only"
    :mask-closable="false"
    :show-close="false"
    :close-on-esc="false"
  >
    <p>Neither mask clicks nor Esc close this drawer.</p>
    <template #footer>
      <LhButton type="primary" @click="adv1 = false">Close</LhButton>
    </template>
  </LhDrawer>
  <!-- The page stays scrollable while open -->
  <LhDrawer v-model="adv2" title="No scroll lock" :lock-scroll="false">
    <p>The page stays scrollable while the drawer is open.</p>
  </LhDrawer>
  <!-- Teleported into a specific container -->
  <LhDrawer v-model="adv3" title="Mount target" teleport-target="#drawer-host">
    <p>The panel is teleported into the #drawer-host container.</p>
  </LhDrawer>
</template>
```

## Drawer API

### Props

| Prop | Description | Type | Default |
| ---- | ---- | ---- | ------ |
| modelValue | Visibility (v-model) | `boolean` | — |
| title | Title (or the header slot) | `string` | — |
| direction | Direction | `"right" \| "left" \| "top" \| "bottom"` | `'right'` |
| size | Size: a number is px, a string supports percentages | `string \| number` | `'30%'` |
| maskClosable | Whether clicking the mask closes it | `boolean` | `true` |
| showClose | Whether to show the close button | `boolean` | `true` |
| teleportTarget | Teleport target (selector or element, defaults to body) | `string \| HTMLElement` | `'body'` |
| lockScroll | Whether to lock page scrolling | `boolean` | `true` |
| closeOnEsc | Whether to close on Esc | `boolean` | `true` |
| themeVars | Component-level theme variables, overriding ConfigProvider configuration | `{ [x: string]: string; }` | — |
| bgPattern | Component-level background pattern, overriding ConfigProvider configuration | `string` | — |
| sx | sx quick-layout props (applied to the panel) | `SxProps` | — |

### Events

| Event | Description | Args |
| ---- | ---- | ---- |
| update:model-value | Visibility changed | `(value: boolean)` |
| open | After opening | — |
| close | After closing | — |

### Slots

| Slot | Description |
| ---- | ---- |
| default | Body content |
| header | Custom header (title area) |
| footer | Custom footer actions |

### Methods

| Method | Description |
| ---- | ---- |
| open | Open programmatically |
| close | Close programmatically |

### Accessibility

- `role="dialog"` + `aria-modal="true"`; the title is linked via `aria-labelledby`, falling back to the `drawer.title` locale key as an aria-label
- Focus moves into the panel on open, Tab cycles inside, and focus returns to the trigger on close
- Escape closes the drawer (disable with `close-on-esc`); the mask is decorative (`aria-hidden`)
- The close button is a real `<button>` with an aria-label from the `drawer.close` locale key
- The slide transition degrades to a plain fade under `prefers-reduced-motion`

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## Type Definitions

The TypeScript type structures exported by this component (auto-extracted from `packages/components/drawer/src/types.ts` and `@lh-ui/share/core/*` sources; click each entry to expand; see the Props table above for attribute descriptions):

<details id="type-LhDrawerProps">
<summary><code>LhDrawerProps</code></summary>

```ts
export interface LhDrawerProps {
  modelValue?: boolean
  title?: string
  direction?: LhDrawerDirection
  size?: string | number
  maskClosable?: boolean
  showClose?: boolean
  teleportTarget?: string | HTMLElement
  lockScroll?: boolean
  closeOnEsc?: boolean
  themeVars?: Record<string, string>
  bgPattern?: string
  sx?: SxProps
}
```

</details>

<details id="type-LhDrawerDirection">
<summary><code>LhDrawerDirection</code> <sub>(from @lh-ui/share/core/drawer (logic.ts))</sub></summary>

```ts

export type LhDrawerDirection = 'right' | 'left' | 'top' | 'bottom'
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
import { ref } from 'vue'

const basic = ref(false)
const adv1 = ref(false)
const adv2 = ref(false)
const adv3 = ref(false)
const dirVisible = ref(false)
const direction = ref<'right' | 'left' | 'top' | 'bottom'>('right')
const sized = ref(false)

function openDir(d: 'right' | 'left' | 'top' | 'bottom') {
  direction.value = d
  dirVisible.value = true
}
</script>

<style scoped>
.demo-drawer-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.demo-drawer-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
