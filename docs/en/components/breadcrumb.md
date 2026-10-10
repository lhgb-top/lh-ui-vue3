# Breadcrumb

Hierarchical path navigation built on native `nav + ol` semantics. The current page is marked with `aria-current="page"` and rendered as plain text; separators and collapsing are customizable.

## Basic Usage

<DemoBlock title="Basic Usage">
  <LhBreadcrumb>
    <LhBreadcrumbItem>Home</LhBreadcrumbItem>
    <LhBreadcrumbItem>Components</LhBreadcrumbItem>
    <LhBreadcrumbItem>Breadcrumb</LhBreadcrumbItem>
  </LhBreadcrumb>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhBreadcrumb>
    <LhBreadcrumbItem>Home</LhBreadcrumbItem>
    <LhBreadcrumbItem>Components</LhBreadcrumbItem>
    <LhBreadcrumbItem>Breadcrumb</LhBreadcrumbItem>
  </LhBreadcrumb>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhBreadcrumb>
    <LhBreadcrumbItem>Home</LhBreadcrumbItem>
    <LhBreadcrumbItem>Components</LhBreadcrumbItem>
    <LhBreadcrumbItem>Breadcrumb</LhBreadcrumbItem>
  </LhBreadcrumb>
</template>
```

## Link Navigation

<DemoBlock title="Link Navigation">
  <LhBreadcrumb>
    <LhBreadcrumbItem to="/">Home</LhBreadcrumbItem>
    <LhBreadcrumbItem to="/en/guide">Guide</LhBreadcrumbItem>
    <LhBreadcrumbItem>Current Page</LhBreadcrumbItem>
  </LhBreadcrumb>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhBreadcrumb>
    <LhBreadcrumbItem to="/">Home</LhBreadcrumbItem>
    <LhBreadcrumbItem to="/en/guide">Guide</LhBreadcrumbItem>
    <LhBreadcrumbItem>Current Page</LhBreadcrumbItem>
  </LhBreadcrumb>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhBreadcrumb>
    <LhBreadcrumbItem to="/">Home</LhBreadcrumbItem>
    <LhBreadcrumbItem to="/en/guide">Guide</LhBreadcrumbItem>
    <LhBreadcrumbItem>Current Page</LhBreadcrumbItem>
  </LhBreadcrumb>
</template>
```

<DemoBlock title="Replace mode">
  <LhBreadcrumb>
    <LhBreadcrumbItem to="/" replace>Replace history</LhBreadcrumbItem>
    <LhBreadcrumbItem>Current page</LhBreadcrumbItem>
  </LhBreadcrumb>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhBreadcrumb>
    <LhBreadcrumbItem to="/" replace>Replace history</LhBreadcrumbItem>
    <LhBreadcrumbItem>Current page</LhBreadcrumbItem>
  </LhBreadcrumb>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhBreadcrumb>
    <LhBreadcrumbItem to="/" replace>Replace history</LhBreadcrumbItem>
    <LhBreadcrumbItem>Current page</LhBreadcrumbItem>
  </LhBreadcrumb>
</template>
```

> Items with `to` render as `<a>`; when vue-router is detected the navigation goes through the router (`replace` controls history replacement), otherwise it stays native. The last item always renders as the current-page text.

## Custom Separator

<DemoBlock title="Custom Separator">
  <LhBreadcrumb separator="·">
    <LhBreadcrumbItem to="/">Home</LhBreadcrumbItem>
    <LhBreadcrumbItem to="/en/components">Components</LhBreadcrumbItem>
    <LhBreadcrumbItem>
      <template #separator>➜</template>
      Own Separator
    </LhBreadcrumbItem>
  </LhBreadcrumb>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhBreadcrumb separator="·">
    <LhBreadcrumbItem to="/">Home</LhBreadcrumbItem>
    <LhBreadcrumbItem to="/en/components">Components</LhBreadcrumbItem>
    <LhBreadcrumbItem>
      <template #separator>➜</template>
      Own Separator
    </LhBreadcrumbItem>
  </LhBreadcrumb>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhBreadcrumb separator="·">
    <LhBreadcrumbItem to="/">Home</LhBreadcrumbItem>
    <LhBreadcrumbItem to="/en/components">Components</LhBreadcrumbItem>
    <LhBreadcrumbItem>
      <template #separator>➜</template>
      Own Separator
    </LhBreadcrumbItem>
  </LhBreadcrumb>
</template>
```

## Collapsing

<DemoBlock title="Collapsing">
  <LhBreadcrumb :max-items="3">
    <LhBreadcrumbItem to="/">Home</LhBreadcrumbItem>
    <LhBreadcrumbItem to="/a">Level A</LhBreadcrumbItem>
    <LhBreadcrumbItem to="/a/b">Level B</LhBreadcrumbItem>
    <LhBreadcrumbItem to="/a/b/c">Level C</LhBreadcrumbItem>
    <LhBreadcrumbItem>Current Page</LhBreadcrumbItem>
  </LhBreadcrumb>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhBreadcrumb :max-items="3">
    <LhBreadcrumbItem to="/">Home</LhBreadcrumbItem>
    <LhBreadcrumbItem to="/a">Level A</LhBreadcrumbItem>
    <LhBreadcrumbItem to="/a/b">Level B</LhBreadcrumbItem>
    <LhBreadcrumbItem to="/a/b/c">Level C</LhBreadcrumbItem>
    <LhBreadcrumbItem>Current Page</LhBreadcrumbItem>
  </LhBreadcrumb>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhBreadcrumb :max-items="3">
    <LhBreadcrumbItem to="/">Home</LhBreadcrumbItem>
    <LhBreadcrumbItem to="/a">Level A</LhBreadcrumbItem>
    <LhBreadcrumbItem to="/a/b">Level B</LhBreadcrumbItem>
    <LhBreadcrumbItem to="/a/b/c">Level C</LhBreadcrumbItem>
    <LhBreadcrumbItem>Current Page</LhBreadcrumbItem>
  </LhBreadcrumb>
</template>
```

> Beyond `maxItems`, the first item plus an ellipsis plus the trailing items stay visible; clicking the ellipsis expands everything.

## Breadcrumb API

### Props

| Prop | Description | Type | Default |
|------|-------------|------|---------|
| separator | Separator character | `string` | `'/'` |
| maxItems | Max visible items (first + ellipsis + trailing items); collapses beyond it | `number` | `0` |
| sx | sx quick-layout props | `SxProps` | — |

### LhBreadcrumbItem Props

| Prop | Description | Type | Default |
|------|-------------|------|---------|
| to | Link target; renders as a link when set on non-last items | `string` | — |
| replace | Use router `replace` when navigating via vue-router | `boolean` | `false` |

### Slots

| Slot | Description | Component |
|------|-------------|-----------|
| default | Breadcrumb items | LhBreadcrumb |
| default | Item content | LhBreadcrumbItem |
| separator | Custom separator (overrides the global `separator`) | LhBreadcrumbItem |

### Accessibility

- The root is `<nav aria-label>` (from the `breadcrumb.label` locale message) wrapping an `<ol>`; semantic order matches document order
- The last item renders as text with `aria-current="page"` and stays unclickable even when `to` is set
- Separators are `aria-hidden="true"` and excluded from the accessibility tree
- The collapsed ellipsis is a real `<button>` whose aria-label comes from the `breadcrumb.more` locale message; clicking expands all items

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## Type Definitions

The TypeScript type structures exported by this component (auto-extracted from `packages/components/breadcrumb/src/types.ts` and `@lh-ui/share/core/*` sources; click each entry to expand; see the Props table above for attribute descriptions):

<details id="type-LhBreadcrumbProps">
<summary><code>LhBreadcrumbProps</code></summary>

```ts
export interface LhBreadcrumbProps {
  separator?: string
  maxItems?: number
  sx?: SxProps
}
```

</details>

<details id="type-LhBreadcrumbItemProps">
<summary><code>LhBreadcrumbItemProps</code></summary>

```ts
export interface LhBreadcrumbItemProps {
  to?: string
  replace?: boolean
}
```

</details>

<!-- lh-types:end -->
