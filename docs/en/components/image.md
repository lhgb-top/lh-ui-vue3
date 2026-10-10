# Image

Image with an error placeholder and optional fullscreen preview (zoom / rotate / multi-image). Native `loading="lazy"` + `decoding="async"`.

## Basic usage

<DemoBlock title="Basic">
  <LhImage src="https://picsum.photos/240/140" alt="Sample" style="width: 240px" />
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- Basic usage -->
  <LhImage src="https://picsum.photos/240/140" alt="Sample" style="width: 240px" />
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- Basic usage -->
  <LhImage src="https://picsum.photos/240/140" alt="Sample" style="width: 240px" />
</template>
```

## Preview

<DemoBlock title="Preview">
  <LhImage
    src="https://picsum.photos/240/140?random=2"
    alt="Previewable"
    preview
    :preview-src-list="['https://picsum.photos/600/400?random=2', 'https://picsum.photos/600/400?random=3']"
    style="width: 240px"
  />
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- Preview -->
  <LhImage
    src="https://picsum.photos/240/140?random=2"
    alt="Previewable"
    preview
    :preview-src-list="['https://picsum.photos/600/400?random=2', 'https://picsum.photos/600/400?random=3']"
    style="width: 240px"
  />
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- Preview -->
  <LhImage
    src="https://picsum.photos/240/140?random=2"
    alt="Previewable"
    preview
    :preview-src-list="['https://picsum.photos/600/400?random=2', 'https://picsum.photos/600/400?random=3']"
    style="width: 240px"
  />
</template>
```

## Fit and lazy loading

`fit` maps to native object-fit; `lazy` enables native lazy loading (images load as they enter the viewport). The `LhImageViewer` can be used standalone with `images` and `initial-index`.

<DemoBlock title="Fit modes">
  <LhImage
    v-for="f in ['fill', 'contain', 'cover', 'none', 'scale-down']"
    :key="f"
    src="https://picsum.photos/240/140"
    :alt="`fit=${f}`"
    :fit="f"
    style="width: 110px; height: 80px"
  />
</DemoBlock>

<DemoBlock title="Lazy loading">
  <div style="max-height: 120px; overflow-y: auto; width: 100%">
    <LhImage
      v-for="i in 4"
      :key="i"
      :src="`https://picsum.photos/240/120?random=${i}`"
      :alt="`Lazy image ${i}`"
      lazy
      style="width: 240px; display: block; margin-bottom: 8px"
    />
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- Fit modes -->
  <LhImage
    v-for="f in ['fill', 'contain', 'cover', 'none', 'scale-down']"
    :key="f"
    src="https://picsum.photos/240/140"
    :alt="`fit=${f}`"
    :fit="f"
    style="width: 110px; height: 80px"
  />
  <!-- Lazy loading -->
  <div style="max-height: 120px; overflow-y: auto; width: 100%">
    <LhImage
      v-for="i in 4"
      :key="i"
      :src="`https://picsum.photos/240/120?random=${i}`"
      :alt="`Lazy image ${i}`"
      lazy
      style="width: 240px; display: block; margin-bottom: 8px"
    />
  </div>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- Fit modes -->
  <LhImage
    v-for="f in ['fill', 'contain', 'cover', 'none', 'scale-down']"
    :key="f"
    src="https://picsum.photos/240/140"
    :alt="`fit=${f}`"
    :fit="f"
    style="width: 110px; height: 80px"
  />
  <!-- Lazy loading -->
  <div style="max-height: 120px; overflow-y: auto; width: 100%">
    <LhImage
      v-for="i in 4"
      :key="i"
      :src="`https://picsum.photos/240/120?random=${i}`"
      :alt="`Lazy image ${i}`"
      lazy
      style="width: 240px; display: block; margin-bottom: 8px"
    />
  </div>
</template>
```

## Standalone viewer

`LhImageViewer` can be used without `LhImage`; pass `images` and `initial-index` to control the gallery.

<DemoBlock title="Standalone viewer">
  <LhImageViewer
    :images="['https://picsum.photos/600/400?random=11', 'https://picsum.photos/600/400?random=12']"
    :initial-index="1"
  >
    <LhButton>Open gallery (starts at 2nd)</LhButton>
  </LhImageViewer>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- Standalone viewer -->
  <LhImageViewer
    :images="['https://picsum.photos/600/400?random=11', 'https://picsum.photos/600/400?random=12']"
    :initial-index="1"
  >
    <LhButton>Open gallery (starts at 2nd)</LhButton>
  </LhImageViewer>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- Standalone viewer -->
  <LhImageViewer
    :images="['https://picsum.photos/600/400?random=11', 'https://picsum.photos/600/400?random=12']"
    :initial-index="1"
  >
    <LhButton>Open gallery (starts at 2nd)</LhButton>
  </LhImageViewer>
</template>
```

## API

### LhImage Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| src | Image source | `string` | — |
| alt | Alternative text (required at the type level) | `string` | — |
| fit | Object-fit mode | `"contain" \| "cover" \| "fill" \| "none" \| "scale-down"` | `'cover'` |
| preview | Enable click preview | `boolean` | `false` |
| previewSrcList | Preview list (defaults to [src]) | `string[]` | — |
| lazy | Native lazy loading | `boolean` | `false` |
| sx | Quick layout props | `SxProps` | — |

### LhImage Events

| Event | Description | Callback |
|-------|-------------|----------|
| load | Image loaded successfully | `(e: Event) => void` |
| error | Image failed to load (the `error` slot is rendered) | `(e: Event) => void` |

Slots: `error`, `placeholder`.

### LhImageViewer

The standalone previewer `LhImageViewer` is exported for programmatic previewing, usable without `LhImage`.

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| images | Preview image list | `string[]` | — |
| initialIndex | Index of the image shown first | `number` | `0` |
| sx | Quick layout props (applied to the preview image) | `SxProps` | — |

| Event | Description | Callback |
|-------|-------------|----------|
| close | Viewer closed (close button or Esc) | `() => void` |
| switch | Switched to another image (arrow keys or prev/next buttons) | `(index: number) => void` |

## Accessibility

- `alt` is required at the type level
- The viewer is `role="dialog"` + `aria-modal` with a focus trap, Esc to close, arrows to switch; every tool button is named

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## Type Definitions

The TypeScript type structures exported by this component (auto-extracted from `packages/components/image/src/types.ts` and `@lh-ui/share/core/*` sources; click each entry to expand; see the Props table above for attribute descriptions):

<details id="type-LhImageProps">
<summary><code>LhImageProps</code></summary>

```ts
export interface LhImageProps {
  src: string
  alt: string
  fit?: LhImageFit
  preview?: boolean
  previewSrcList?: string[]
  lazy?: boolean
  sx?: SxProps
}
```

</details>

<details id="type-LhImageViewerProps">
<summary><code>LhImageViewerProps</code></summary>

```ts
export interface LhImageViewerProps {
  images: string[]
  initialIndex?: number
  sx?: SxProps
}
```

</details>

<details id="type-LhImageFit">
<summary><code>LhImageFit</code> <sub>(from @lh-ui/share/core/image)</sub></summary>

```ts
export type LhImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
```

</details>

### Constants

Public constants used by this component (linked from the Type / Default columns in the Props table above):

<details id="const-LH_IMAGE_ZOOM_MIN">
<summary><code>LH_IMAGE_ZOOM_MIN</code> <sub>(from @lh-ui/share/core/image)</sub></summary>

```ts
export const LH_IMAGE_ZOOM_MIN = 0.25
```

</details>

<details id="const-LH_IMAGE_ZOOM_MAX">
<summary><code>LH_IMAGE_ZOOM_MAX</code> <sub>(from @lh-ui/share/core/image)</sub></summary>

```ts
export const LH_IMAGE_ZOOM_MAX = 4
```

</details>

<details id="const-LH_IMAGE_ZOOM_STEP">
<summary><code>LH_IMAGE_ZOOM_STEP</code> <sub>(from @lh-ui/share/core/image)</sub></summary>

```ts
export const LH_IMAGE_ZOOM_STEP = 0.25
```

</details>

<!-- lh-types:end -->
