# Badge

`LhBadge` displays a number or status dot in the top-right corner of an element.

## Basic Usage

<DemoBlock title="Basic Usage">
  <LhBadge :value="5">
    <div style="width: 100px; height: 100px; border: 1px solid #eee; border-radius: 4px;"></div>
  </LhBadge>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhBadge } from '@lh-ui/vue3'
</script>

<template>
  <LhBadge :value="5">
    <div>Target</div>
  </LhBadge>
</template>
```

```vue options
<script>
import { LhBadge } from '@lh-ui/vue3'

export default {
  components: { LhBadge },
}
</script>

<template>
  <LhBadge :value="5">
    <div>Target</div>
  </LhBadge>
</template>
```

## Max Value

<DemoBlock title="Custom Max Value">
  <LhBadge :value="100" :max="99">
    <div style="width: 100px; height: 100px; border: 1px solid #eee; border-radius: 4px;"></div>
  </LhBadge>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhBadge :value="100" :max="99">
    <div>Target</div>
  </LhBadge>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhBadge :value="100" :max="99">
    <div>Target</div>
  </LhBadge>
</template>
```

## Dot Mode

`is-dot` shows a small dot instead of the value — useful for "has updates" hints. Use `type` to change its color.

<DemoBlock title="Dot Mode">
  <LhBadge is-dot>
    <div style="width: 60px; height: 60px; border: 1px solid #eee; border-radius: 4px">Messages</div>
  </LhBadge>
  <LhBadge is-dot type="warning">
    <div style="width: 60px; height: 60px; border: 1px solid #eee; border-radius: 4px">Todos</div>
  </LhBadge>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- Dot -->
  <LhBadge is-dot>
    <div>Target</div>
  </LhBadge>
  <!-- Dot (warning color) -->
  <LhBadge is-dot type="warning">
    <div>Target</div>
  </LhBadge>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- Dot -->
  <LhBadge is-dot>
    <div>Target</div>
  </LhBadge>
  <!-- Dot (warning color) -->
  <LhBadge is-dot type="warning">
    <div>Target</div>
  </LhBadge>
</template>
```

## Types

`type` switches the badge color scheme.

<DemoBlock title="Types">
  <LhBadge :value="1" type="primary"><div style="width: 60px; height: 60px; border: 1px solid #eee; border-radius: 4px">primary</div></LhBadge>
  <LhBadge :value="1" type="success"><div style="width: 60px; height: 60px; border: 1px solid #eee; border-radius: 4px">success</div></LhBadge>
  <LhBadge :value="1" type="warning"><div style="width: 60px; height: 60px; border: 1px solid #eee; border-radius: 4px">warning</div></LhBadge>
  <LhBadge :value="1" type="info"><div style="width: 60px; height: 60px; border: 1px solid #eee; border-radius: 4px">info</div></LhBadge>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- Primary -->
  <LhBadge :value="1" type="primary">
    <div>Target</div>
  </LhBadge>
  <!-- Success -->
  <LhBadge :value="1" type="success">
    <div>Target</div>
  </LhBadge>
  <!-- Warning -->
  <LhBadge :value="1" type="warning">
    <div>Target</div>
  </LhBadge>
  <!-- Info -->
  <LhBadge :value="1" type="info">
    <div>Target</div>
  </LhBadge>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- Primary -->
  <LhBadge :value="1" type="primary">
    <div>Target</div>
  </LhBadge>
  <!-- Success -->
  <LhBadge :value="1" type="success">
    <div>Target</div>
  </LhBadge>
  <!-- Warning -->
  <LhBadge :value="1" type="warning">
    <div>Target</div>
  </LhBadge>
  <!-- Info -->
  <LhBadge :value="1" type="info">
    <div>Target</div>
  </LhBadge>
</template>
```


## Offset, Zero and Custom Content

`offset` fine-tunes the badge position (`[x, y]` pixels); `show-zero` renders the badge even at zero; `content` replaces the number with custom text.

<DemoBlock title="Offset / Zero / Content">
  <LhBadge :value="5" :offset="[6, 6]">
    <div style="width: 80px; height: 80px; border: 1px solid #eee; border-radius: 4px">offset</div>
  </LhBadge>
  <LhBadge :value="0" show-zero>
    <div style="width: 80px; height: 80px; border: 1px solid #eee; border-radius: 4px">show-zero</div>
  </LhBadge>
  <LhBadge value="New" content="New">
    <div style="width: 80px; height: 80px; border: 1px solid #eee; border-radius: 4px">content</div>
  </LhBadge>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- Offset -->
  <LhBadge :value="5" :offset="[6, 6]">
    <div>Target</div>
  </LhBadge>
  <!-- Show zero -->
  <LhBadge :value="0" show-zero>
    <div>Target</div>
  </LhBadge>
  <!-- Custom content -->
  <LhBadge value="New" content="New">
    <div>Target</div>
  </LhBadge>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- Offset -->
  <LhBadge :value="5" :offset="[6, 6]">
    <div>Target</div>
  </LhBadge>
  <!-- Show zero -->
  <LhBadge :value="0" show-zero>
    <div>Target</div>
  </LhBadge>
  <!-- Custom content -->
  <LhBadge value="New" content="New">
    <div>Target</div>
  </LhBadge>
</template>
```


<DemoBlock title="Dot Mode">
  <LhBadge is-dot>
    <div style="width: 100px; height: 100px; border: 1px solid #eee; border-radius: 4px;"></div>
  </LhBadge>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhBadge is-dot>
    <div>Target</div>
  </LhBadge>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhBadge is-dot>
    <div>Target</div>
  </LhBadge>
</template>
```

## Size

<DemoBlock title="Size">
  <LhBadge size="small" :value="5">
    <div style="width: 50px; height: 50px; border: 1px solid #eee; border-radius: 4px;"></div>
  </LhBadge>
  <LhBadge size="medium" :value="5">
    <div style="width: 50px; height: 50px; border: 1px solid #eee; border-radius: 4px;"></div>
  </LhBadge>
  <LhBadge size="large" :value="5">
    <div style="width: 50px; height: 50px; border: 1px solid #eee; border-radius: 4px;"></div>
  </LhBadge>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhBadge size="small" :value="5">
    <div>Small</div>
  </LhBadge>
  <LhBadge size="medium" :value="5">
    <div>Medium</div>
  </LhBadge>
  <LhBadge size="large" :value="5">
    <div>Large</div>
  </LhBadge>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhBadge size="small" :value="5">
    <div>Small</div>
  </LhBadge>
  <LhBadge size="medium" :value="5">
    <div>Medium</div>
  </LhBadge>
  <LhBadge size="large" :value="5">
    <div>Large</div>
  </LhBadge>
</template>
```

## Toggle Visibility

<DemoBlock title="Toggle Visibility">
  <LhBadge :value="badgeValue" :hidden="isHidden">
    <div style="width: 100px; height: 100px; border: 1px solid #eee; border-radius: 4px;"></div>
  </LhBadge>
  <LhButton @click="isHidden = !isHidden">
    {{ isHidden ? 'Show' : 'Hide' }}
  </LhButton>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhBadge, LhButton } from '@lh-ui/vue3'

const badgeValue = ref(10)
const isHidden = ref(false)
</script>

<template>
  <LhBadge :value="badgeValue" :hidden="isHidden">
    <div>Target</div>
  </LhBadge>
  <LhButton @click="isHidden = !isHidden">
    {{ isHidden ? 'Show' : 'Hide' }}
  </LhButton>
</template>
```

```vue options
<script>
import { LhBadge, LhButton } from '@lh-ui/vue3'

export default {
  components: { LhBadge, LhButton },
  data() {
    return {
      badgeValue: 10,
      isHidden: false,
    }
  },
}
</script>

<template>
  <LhBadge :value="badgeValue" :hidden="isHidden">
    <div>Target</div>
  </LhBadge>
  <LhButton @click="isHidden = !isHidden">
    {{ isHidden ? 'Show' : 'Hide' }}
  </LhButton>
</template>
```

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## Type Definitions

The TypeScript type structures exported by this component (auto-extracted from `packages/components/badge/src/types.ts` and `@lh-ui/share/core/*` sources; click each entry to expand; see the Props table above for attribute descriptions):

<details id="type-LhBadgeProps">
<summary><code>LhBadgeProps</code></summary>

```ts
export interface LhBadgeProps {
  type?: LhBadgeType
  value?: string | number
  size?: LhBadgeSize
  max?: number
  isDot?: boolean
  hidden?: boolean
  offset?: [number, number]
  showZero?: boolean
  content?: string
  sx?: LhSxProps
}
```

</details>

<details id="type-LhBadgeSize">
<summary><code>LhBadgeSize</code></summary>

```ts
export type LhBadgeSize = LhComponentSize
```

</details>

<details id="type-LhBadgeOffset">
<summary><code>LhBadgeOffset</code></summary>

```ts
export type LhBadgeOffset = [number, number]
```

</details>

<details id="type-LhBadgeType">
<summary><code>LhBadgeType</code> <sub>(from @lh-ui/share/core/badge)</sub></summary>

```ts
export type LhBadgeType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'
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
import { ref } from 'vue'

const badgeValue = ref(10)
const isHidden = ref(false)
</script>

## Props

| Prop | Description | Type | Default |
|------|-------------|------|---------|
| type | Badge type | `"primary" \| "success" \| "warning" \| "danger" \| "info" \| "default"` | `'danger'` |
| value | Display value | `string \| number` | — |
| size | Size | `"small" \| "medium" \| "large" \| "mini" \| "x-large"` | `'medium'` |
| max | Max value | `number` | `99` |
| isDot | Dot mode | `boolean` | `false` |
| hidden | Hidden | `boolean` | `false` |
| offset | Offset | `[number, number]` | — |
| showZero | Show zero | `boolean` | `false` |
| content | Custom content | `string` | — |
| sx | Shorthand layout props (e.g. `{ mt: 2, w: '50%' }`), applied as inline styles on the root element | `LhSxProps` | — |

## Slots

| Slot | Description |
|------|-------------|
| default | Target element |
## Accessibility

- In dot mode (`is-dot`) the badge is purely decorative: it is marked `aria-hidden` and leaves the accessibility tree
- In value mode the text stays in the tree, so screen readers can announce counts such as "99+"
