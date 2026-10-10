# Loading

Loading feedback in three shapes: the service-driven mask (`LhLoading.show(...)`, fullscreen or scoped to a container), the `v-loading` directive, and the basic `LhSpinner` rotating figure.

## Fullscreen mask

<DemoBlock title="Fullscreen">
  <LhButton @click="showFullscreen">Fullscreen for 2s</LhButton>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhLoading } from '@lh-ui/vue3'

const showFullscreen = () => {
  const handle = LhLoading.show({ fullscreen: true, lock: true })
  setTimeout(() => handle.close(), 2000)
}
</script>

<template>
  <LhButton @click="showFullscreen">Fullscreen for 2s</LhButton>
</template>
```

```vue options
<script>
import { LhLoading } from '@lh-ui/vue3'

export default {
  methods: {
    showFullscreen() {
      const handle = LhLoading.show({ fullscreen: true, lock: true })
      setTimeout(() => handle.close(), 2000)
    },
  },
}
</script>

<template>
  <LhButton @click="showFullscreen">Fullscreen for 2s</LhButton>
</template>
```

## Scoped mask

Without `target` the mask is fullscreen; pass a selector or element to scope it (it stretches over the nearest positioned ancestor; static containers get a temporary `relative` that is restored on close).

<DemoBlock title="Scoped">
  <div
    ref="boxRef"
    class="demo-loading-box"
  >
    <LhButton @click="showBox">Load inside container</LhButton>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhLoading } from '@lh-ui/vue3'

const boxRef = ref<HTMLElement>()

const showBox = () => {
  const handle = LhLoading.show({ target: boxRef.value, text: 'Loading hard', lock: true })
  setTimeout(() => handle.close(), 2000)
}
</script>

<template>
  <div
    ref="boxRef"
    class="demo-loading-box"
  >
    <LhButton @click="showBox">Load inside container</LhButton>
  </div>
</template>
```

```vue options
<script>
import { LhLoading } from '@lh-ui/vue3'

export default {
  methods: {
    showBox() {
      const handle = LhLoading.show({ target: this.$refs.boxRef, text: 'Loading hard', lock: true })
      setTimeout(() => handle.close(), 2000)
    },
  },
}
</script>

<template>
  <div
    ref="boxRef"
    class="demo-loading-box"
  >
    <LhButton @click="showBox">Load inside container</LhButton>
  </div>
</template>
```

## v-loading directive

After `app.use(LhLoading)` (or a full import), the `v-loading` directive toggles the mask with a boolean.

```vue composition
<template>
  <div v-loading="busy" class="table-zone">…</div>
  <div v-loading:text="'Custom text'" :style="busy2 ? 'height:200px' : ''">…</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const busy = ref(false)
const busy2 = ref(false)
</script>
```

```vue options
<template>
  <div v-loading="busy" class="table-zone">…</div>
  <div v-loading:text="'Custom text'" :style="busy2 ? 'height:200px' : ''">…</div>
</template>

<script>
export default {
  data() {
    return { busy: false, busy2: false }
  },
}
</script>
```

## LhSpinner

The basic rotating figure, usable standalone (the loading mask renders it internally).

<DemoBlock title="LhSpinner">
  <div class="demo-loading-row">
    <LhSpinner size="small" />
    <LhSpinner size="medium" />
    <LhSpinner size="large" color="#8f9779" />
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <div class="demo-loading-row">
    <LhSpinner size="small" />
    <LhSpinner size="medium" />
    <LhSpinner size="large" color="#8f9779" />
  </div>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <div class="demo-loading-row">
    <LhSpinner size="small" />
    <LhSpinner size="medium" />
    <LhSpinner size="large" color="#8f9779" />
  </div>
</template>
```

## Custom appearance

`text` sets the hint text, `background` the mask background, `z-index` the stacking order, and `spinner: false` hides the spinner.

<DemoBlock title="Custom appearance">
  <LhButton @click="showStyled">Styled loading for 2s</LhButton>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhLoading } from '@lh-ui/vue3'

const showStyled = () => {
  const handle = LhLoading.show({
    text: 'Syncing data…',
    background: 'rgba(42, 37, 32, 0.6)',
    zIndex: 4000,
    spinner: false,
  })
  setTimeout(() => handle.close(), 2000)
}
</script>

<template>
  <LhButton @click="showStyled">Styled loading for 2s</LhButton>
</template>
```

```vue options
<script>
import { LhLoading } from '@lh-ui/vue3'

export default {
  methods: {
    showStyled() {
      const handle = LhLoading.show({
        text: 'Syncing data…',
        background: 'rgba(42, 37, 32, 0.6)',
        zIndex: 4000,
        spinner: false,
      })
      setTimeout(() => handle.close(), 2000)
    },
  },
}
</script>

<template>
  <LhButton @click="showStyled">Styled loading for 2s</LhButton>
</template>
```

## API

### LhLoadingMask Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| fullscreen | Fullscreen mask (true when the target is body) | `boolean` | — |
| text | Loading text (falls back to locale key `loading.text`) | `string` | — |
| background | Mask background (CSS background value) | `string` | — |
| zIndex | Stacking level | `number` | — |
| spinner | Show the rotating figure | `boolean` | `true` |
| sx | Quick layout props | `SxProps` | — |

Service: `LhLoading.show({ target?, text?, background?, lock?, spinner?, sx? })` returns a `{ close }` handle; `app.use(LhLoading)` registers the `v-loading` directive.

## Accessibility

- The mask is `role="status"` + `aria-busy="true"`; the loading text doubles as the `aria-label`
- For scoped targets, `inert` is applied when supported (progressive enhancement) so the underlying content is unreachable by keyboard and assistive tech
- `lock` freezes scrolling and restores it on close; the container's original positioning and scroll state are restored as well
- Animations respect `prefers-reduced-motion`

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## Type Definitions

The TypeScript type structures exported by this component (auto-extracted from `packages/components/loading/src/types.ts` and `@lh-ui/share/core/*` sources; click each entry to expand; see the Props table above for attribute descriptions):

<details id="type-LhLoadingMaskProps">
<summary><code>LhLoadingMaskProps</code></summary>

```ts
export interface LhLoadingMaskProps {
  fullscreen?: boolean
  text?: string
  background?: string
  zIndex?: number
  spinner?: boolean
  sx?: SxProps
}
```

</details>

<details id="type-LhLoadingOptions">
<summary><code>LhLoadingOptions</code> <sub>(from @lh-ui/share/core/loading)</sub></summary>

```ts
export interface LhLoadingOptions {
  target?: string | HTMLElement
  text?: string
  background?: string
  lock?: boolean
  spinner?: boolean
  sx?: SxProps
}
```

</details>

<details id="type-LhLoadingHandle">
<summary><code>LhLoadingHandle</code> <sub>(from @lh-ui/share/core/loading)</sub></summary>

```ts
export interface LhLoadingHandle {
  close: () => void
}
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
import { ref } from 'vue'
import { LhLoading } from '@lh-ui/vue3'

const boxRef = ref<HTMLElement>()

const showFullscreen = () => {
  const handle = LhLoading.show({ lock: true })
  setTimeout(() => handle.close(), 2000)
}

const showBox = () => {
  const handle = LhLoading.show({ target: boxRef.value, text: 'Loading hard', lock: true })
  setTimeout(() => handle.close(), 2000)
}
const showStyled = () => {
  const handle = LhLoading.show({
    text: 'Syncing data…',
    background: 'rgba(42, 37, 32, 0.6)',
    zIndex: 4000,
    spinner: false,
  })
  setTimeout(() => handle.close(), 2000)
}
</script>

<style>
.demo-loading-box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 140px;
  padding: 16px;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 8px;
}

.demo-loading-row {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
