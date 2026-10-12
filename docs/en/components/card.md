# Card

A container for headers, content, and footer actions. Supports whole-card clickability with built-in button keyboard semantics, a loading placeholder, and `sx` quick layout.

## Basic Usage

<DemoBlock title="Basic Usage">
  <LhCard title="Rain on Banana LhLeaves" style="max-width: 320px">
    Through the window I know the night rain; the banana leaves sound first.
  </LhCard>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhCard title="Rain on Banana LhLeaves">
    Through the window I know the night rain; the banana leaves sound first.
  </LhCard>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhCard title="Rain on Banana LhLeaves">
    Through the window I know the night rain; the banana leaves sound first.
  </LhCard>
</template>
```

## Shadow

`shadow` controls when the shadow shows: `always` (default) / `hover` / `never`.

<DemoBlock title="Shadow timing">
  <LhCard shadow="hover" title="Hover shadow" style="max-width: 320px">Shadow appears on hover.</LhCard>
  <LhCard shadow="never" title="No shadow" style="max-width: 320px">Never shows a shadow.</LhCard>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhCard shadow="hover" title="Hover shadow">Shadow appears on hover.</LhCard>
  <LhCard shadow="never" title="No shadow">Never shows a shadow.</LhCard>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhCard shadow="hover" title="Hover shadow">Shadow appears on hover.</LhCard>
  <LhCard shadow="never" title="No shadow">Never shows a shadow.</LhCard>
</template>
```

## Header Slot and Extra

<DemoBlock title="Custom Header">
  <LhCard style="max-width: 320px">
    <template #header>
      <span class="demo-strong">Custom header</span>
    </template>
    <template #extra>Action</template>
    The <code>header</code> slot takes over the whole title area.
  </LhCard>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhCard>
    <template #header><span>Custom header</span></template>
    <template #extra>Action</template>
    …
  </LhCard>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhCard>
    <template #header><span>Custom header</span></template>
    <template #extra>Action</template>
    …
  </LhCard>
</template>
```

## Cover and Footer

<DemoBlock title="Cover and Footer">
  <LhCard style="max-width: 320px">
    <template #cover>
      <div class="demo-cover">Cover area</div>
    </template>
    Body content…
    <template #footer>
      <LhButton size="small">Collect</LhButton>
    </template>
  </LhCard>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- Cover and Footer -->
  <LhCard>
    <template #cover>…</template>
    …
    <template #footer>
      <LhButton size="small">Collect</LhButton>
    </template>
  </LhCard>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- Cover and Footer -->
  <LhCard>
    <template #cover>…</template>
    …
    <template #footer>
      <LhButton size="small">Collect</LhButton>
    </template>
  </LhCard>
</template>
```

## Clickable Card

With `clickable`, the whole card takes button semantics: Tab-focusable (with a `:focus-visible` ring), activated by Enter / Space.

<DemoBlock title="Clickable">
  <LhCard clickable title="Click me" style="max-width: 320px" @click="onCardClick">
    Use Tab to focus, then press Enter.
  </LhCard>
</DemoBlock>

```vue composition
<script setup lang="ts">
function onCardClick() {
  console.log('card clicked')
}
</script>

<template>
  <!-- Clickable -->
  <LhCard clickable title="Click me" @click="onCardClick">…</LhCard>
</template>
```

```vue options
<script>
export default {
  methods: {
    onCardClick() {
      console.log('card clicked')
    },
  },
}
</script>

<template>
  <!-- Clickable -->
  <LhCard clickable title="Click me" @click="onCardClick">…</LhCard>
</template>
```

## Loading

<DemoBlock title="Loading">
  <LhCard title="Loading" loading style="max-width: 320px" />
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhCard title="Loading" loading />
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhCard title="Loading" loading />
</template>
```

## API

### Props

| Prop | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| title | Card title (or use the header slot) | `string` | — |
| shadow | When the shadow is shown | `"always" \| "hover" \| "never"` | `'always'` |
| clickable | Whole card clickable (carries button keyboard semantics) | `boolean` | `false` |
| loading | Loading state: the body shows a skeleton placeholder | `boolean` | `false` |
| themeVars | Component-level theme variables (keys get the --lh- prefix automatically) | `{ [x: string]: string; }` | — |
| bgPattern | Pattern background URL (e.g. var(--lh-pattern-willow)), not limited by the global whitelist | `string` | — |
| sx | sx quick-layout properties | `LhSxProps` | — |

### Events

| Event | Description | Callback |
| ----- | ----------- | -------- |
| click | Fired by mouse click or Enter/Space on clickable cards | `(e: Event) => void` |

### Theme Variables

The following CSS variables are defined on `.lh-card` and can be overridden via `themeVars`:

| Variable | Description | Default |
| -------- | ----------- | ------- |
| `--lh-card-border-radius` | Radius | `border-radius-base + 2px` |
| `--lh-card-bg` | Background | `--lh-bg-color` |
| `--lh-card-border-color` | Border color | `--lh-border-color-light` |
| `--lh-card-header-padding` / `--lh-card-body-padding` / `--lh-card-footer-padding` | Section paddings | `14px 20px` / `18px 20px` / `12px 20px` |
| `--lh-card-shadow` / `--lh-card-shadow-hover` | Rest/hover shadows | Warm ink-tone soft two-layer shadows |
| `--lh-card-loading-bg` / `--lh-card-loading-highlight` | Loading placeholder base / shimmer highlight | `--lh-border-color-light` / lightened toward paper tone |

### Slots

| Slot | Description |
| ---- | ----------- |
| header | Custom header |
| extra | Extra content on the header row |
| cover | Cover |
| default | Body |
| footer | Footer |

### Accessibility

- Clickable cards: `role="button"` + `tabindex="0"` + Enter/Space activation (APG button pattern)
- Loading: container has `aria-busy="true"`; placeholders are hidden from screen readers
- Focus ring uses `:focus-visible` — not shown on mouse click

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## Type Definitions

The TypeScript type structures exported by this component (auto-extracted from `packages/components/card/src/types.ts` and `@lh-ui/share/core/*` sources; click each entry to expand; see the Props table above for attribute descriptions):

<details id="type-LhCardProps">
<summary><code>LhCardProps</code></summary>

```ts
export interface LhCardProps {
  title?: string
  shadow?: LhCardShadow
  clickable?: boolean
  loading?: boolean
  themeVars?: Record<string, string>
  bgPattern?: string
  sx?: LhSxProps
}
```

</details>

<details id="type-LhCardShadow">
<summary><code>LhCardShadow</code> <sub>(from @lh-ui/share/core/card)</sub></summary>

```ts
export type LhCardShadow = 'always' | 'hover' | 'never'
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
function onCardClick() {}
</script>

<style scoped>
.demo-strong {
  font-weight: 600;
}

.demo-cover {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 140px;
  background: linear-gradient(135deg, rgba(44, 82, 130, 0.12), rgba(56, 161, 105, 0.12));
  color: var(--lh-text-secondary);
}
</style>
