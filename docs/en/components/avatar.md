# Avatar

`LhAvatar` is used to display user avatars. Supports image, icon, and text modes with automatic fallback.

## Basic Usage

<DemoBlock title="Image Avatar">
  <LhAvatar src="https://api.dicebear.com/9.x/notionists/svg?seed=mo" />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhAvatar } from '@lh-ui/vue3'
</script>

<template>
  <LhAvatar src="https://api.dicebear.com/9.x/notionists/svg?seed=mo" />
</template>
```

```vue options
<script>
import { LhAvatar } from '@lh-ui/vue3'

export default {
  components: { LhAvatar },
}
</script>

<template>
  <LhAvatar src="https://api.dicebear.com/9.x/notionists/svg?seed=mo" />
</template>
```

`fit` sets the crop mode (native object-fit) and `alt` provides alternative text.

<DemoBlock title="Fit & alt">
  <LhAvatar
    src="https://api.dicebear.com/9.x/notionists/svg?seed=f"
    fit="cover"
    alt="User avatar"
  />
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- Fit & alt -->
  <LhAvatar
    src="https://api.dicebear.com/9.x/notionists/svg?seed=f"
    fit="cover"
    alt="User avatar"
  />
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- Fit & alt -->
  <LhAvatar
    src="https://api.dicebear.com/9.x/notionists/svg?seed=f"
    fit="cover"
    alt="User avatar"
  />
</template>
```

## Shape & Size

<DemoBlock title="Circle & Square, Four Sizes">
  <div style="display: flex; align-items: center; gap: 12px">
    <LhAvatar shape="square" size="small" text="S" />
    <LhAvatar shape="square" size="medium" text="M" />
    <LhAvatar shape="square" size="large" text="L" />
    <LhAvatar size="large" text="Circle" />
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <div style="display: flex; align-items: center; gap: 12px">
    <LhAvatar shape="square" size="small" text="S" />
    <LhAvatar shape="square" size="medium" text="M" />
    <LhAvatar shape="square" size="large" text="L" />
    <LhAvatar size="large" text="Circle" />
  </div>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <div style="display: flex; align-items: center; gap: 12px">
    <LhAvatar shape="square" size="small" text="S" />
    <LhAvatar shape="square" size="medium" text="M" />
    <LhAvatar shape="square" size="large" text="L" />
    <LhAvatar size="large" text="Circle" />
  </div>
</template>
```

## Text & Icon Fallback

<DemoBlock title="Fallback to icon or text when no image">
  <div style="display: flex; align-items: center; gap: 12px">
    <LhAvatar text="Hello" />
    <LhAvatar icon="user" />
    <LhAvatar text="Alice Chen" />
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <div style="display: flex; align-items: center; gap: 12px">
    <LhAvatar text="Hello" />
    <LhAvatar icon="user" />
    <LhAvatar text="Alice Chen" />
  </div>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <div style="display: flex; align-items: center; gap: 12px">
    <LhAvatar text="Hello" />
    <LhAvatar icon="user" />
    <LhAvatar text="Alice Chen" />
  </div>
</template>
```

Text avatars automatically show the first character (first Chinese character, or first letter capitalized for English).

## Image Load Error

<DemoBlock title="Fallback to text on error and trigger error event">
  <LhAvatar
    :src="brokenAvatarSrc"
    text="F"
    @error="onError"
  />
</DemoBlock>

```vue composition
<script setup lang="ts">
function onError(e: Event) {
  console.log('avatar load error', e)
}
</script>

<template>
  <LhAvatar
    src="/broken-avatar.png"
    text="F"
    @error="onError"
  />
</template>
```

```vue options
<script>
export default {
  methods: {
    onError(e) {
      console.log('avatar load error', e)
    },
  },
}
</script>

<template>
  <LhAvatar
    src="/broken-avatar.png"
    text="F"
    @error="onError"
  />
</template>
```

## Props

| Prop | Description | Type | Default |
|------|-------------|------|---------|
| src | Image URL, fallback to icon/text when empty | `string` | — |
| alt | Alt text | `string` | — |
| icon | Icon name (a built-in LhIcon name, shown when src is missing) | `LhIconName` | — |
| text | Text content (first char shown when src and icon missing) | `string` | — |
| shape | Shape | `"circle" \| "square"` | `'circle'` |
| size | Size | `"small" \| "medium" \| "large" \| "mini" \| "x-large"` | `'medium'` |
| fit | Image fill mode | `"fill" \| "contain" \| "cover" \| "none" \| "scale-down"` | `'cover'` |
| sx | Shorthand layout props (e.g. `{ mt: 2, w: '50%' }`), applied as inline styles on the root element | `SxProps` | — |

## Events

| Event | Description | Callback |
|-------|-------------|----------|
| error | Image load failed | `(e: Event) => void` |
### Accessibility

- Image mode relies on the `<img alt>` attribute; when `alt` is omitted it falls back to `text`, then to `avatar`
- Icon and text modes carry `role="img"` on the root element, using `alt` as the accessible name when provided; the icon itself is `aria-hidden`

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## Type Definitions

The TypeScript type structures exported by this component (auto-extracted from `packages/components/avatar/src/types.ts` and `@lh-ui/share/core/*` sources; click each entry to expand; see the Props table above for attribute descriptions):

<details id="type-LhAvatarProps">
<summary><code>LhAvatarProps</code></summary>

```ts
export interface LhAvatarProps {

  src?: string

  alt?: string

  icon?: LhIconName

  text?: string

  shape?: LhAvatarComponentShape

  size?: LhAvatarSize

  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'

  sx?: SxProps
}
```

</details>

<details id="type-LhAvatarSize">
<summary><code>LhAvatarSize</code></summary>

```ts
export type LhAvatarSize = LhComponentSize
```

</details>

<details id="type-LhAvatarShape">
<summary><code>LhAvatarShape</code></summary>

```ts
export type LhAvatarShape = LhAvatarComponentShape
```

</details>

<details id="type-LhAvatarComponentShape">
<summary><code>LhAvatarComponentShape</code> <sub>(from @lh-ui/share/core/avatar)</sub></summary>

```ts
export type LhAvatarShape = 'circle' | 'square'
```

</details>

<details id="type-LhIconName">
<summary><code>LhIconName</code> <sub>(from @lh-ui/share/core/icon (svgs.ts))</sub></summary>

```ts
export type LhIconName = keyof typeof LH_ICON_SVGS_CONST
```

</details>

<details id="type-LhComponentSize">
<summary><code>LhComponentSize</code> <sub>(from @lh-ui/share/core/shared)</sub></summary>

```ts
export type LhComponentSize = (typeof LH_SIZE_CONST)[keyof typeof LH_SIZE_CONST]
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
import { withBase } from 'vitepress'

// The error-demo URL goes through withBase so the failing request stays inside
// this site's base under a sub-path deployment (e.g. /lhui/plus/): it hits a
// clean 404 that triggers the error event, instead of some other site's
// fallback page at the host root. 失败演示地址走 withBase，保证子路径部署下
// 请求落在站内（干净 404 触发 error），而不是命中主机根的其他站点兜底页。
const brokenAvatarSrc = withBase('/broken-avatar.png')

function onError(e: Event) {
  console.log('avatar load error', e)
}
</script>
