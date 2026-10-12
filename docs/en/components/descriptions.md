# Descriptions

`LhDescriptions` is used to display a list of object attributes, with configurable column count, column spanning, and border mode.

## Basic Usage

<DemoBlock title="Title + item list">
  <LhDescriptions
    title="User Info"
    :column="2"
    :items="[
      { label: 'Name', value: 'Alice' },
      { label: 'Age', value: '25' },
      { label: 'Email', value: 'alice@example.com' },
      { label: 'Address', value: 'Beijing, China' },
    ]"
  />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhDescriptions } from '@lh-ui/vue3'
</script>

<template>
  <LhDescriptions
    title="User Info"
    :column="2"
    :items="[
      { label: 'Name', value: 'Alice' },
      { label: 'Age', value: '25' },
      { label: 'Email', value: 'alice@example.com' },
      { label: 'Address', value: 'Beijing, China' },
    ]"
  />
</template>
```

```vue options
<script>
import { LhDescriptions } from '@lh-ui/vue3'

export default {
  components: { LhDescriptions },
}
</script>

<template>
  <LhDescriptions
    title="User Info"
    :column="2"
    :items="[
      { label: 'Name', value: 'Alice' },
      { label: 'Age', value: '25' },
      { label: 'Email', value: 'alice@example.com' },
      { label: 'Address', value: 'Beijing, China' },
    ]"
  />
</template>
```

## Columns and Spanning

<DemoBlock title="column controls items per row, item span controls spanning">
  <LhDescriptions
    :column="3"
    :items="[
      { label: 'Title', value: 'A Thousand Li of Rivers and Mountains', span: 2 },
      { label: 'Period', value: 'Northern Song' },
      { label: 'Artist', value: 'Wang Ximeng' },
      { label: 'Medium', value: 'Ink and color on silk' },
      { label: 'Location', value: 'Palace Museum, Beijing' },
    ]"
  />
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhDescriptions
    :column="3"
    :items="[
      { label: 'Title', value: 'A Thousand Li of Rivers and Mountains', span: 2 },
      { label: 'Period', value: 'Northern Song' },
      { label: 'Artist', value: 'Wang Ximeng' },
      { label: 'Medium', value: 'Ink and color on silk' },
      { label: 'Location', value: 'Palace Museum, Beijing' },
    ]"
  />
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhDescriptions
    :column="3"
    :items="[
      { label: 'Title', value: 'A Thousand Li of Rivers and Mountains', span: 2 },
      { label: 'Period', value: 'Northern Song' },
      { label: 'Artist', value: 'Wang Ximeng' },
      { label: 'Medium', value: 'Ink and color on silk' },
      { label: 'Location', value: 'Palace Museum, Beijing' },
    ]"
  />
</template>
```

A span that exceeds the remaining columns in the row is clamped; the last row is padded automatically when short.

## Border Mode

<DemoBlock title="border displays table borders">
  <LhDescriptions
    :column="2"
    border
    :items="[
      { label: 'Title', value: 'Preface to the Orchid Pavilion' },
      { label: 'Artist', value: 'Wang Xizhi' },
      { label: 'Period', value: 'Eastern Jin' },
      { label: 'Script', value: 'Running script' },
    ]"
  />
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhDescriptions
    :column="2"
    border
    :items="[
      { label: 'Title', value: 'Preface to the Orchid Pavilion' },
      { label: 'Artist', value: 'Wang Xizhi' },
      { label: 'Period', value: 'Eastern Jin' },
      { label: 'Script', value: 'Running script' },
    ]"
  />
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhDescriptions
    :column="2"
    border
    :items="[
      { label: 'Title', value: 'Preface to the Orchid Pavilion' },
      { label: 'Artist', value: 'Wang Xizhi' },
      { label: 'Period', value: 'Eastern Jin' },
      { label: 'Script', value: 'Running script' },
    ]"
  />
</template>
```

## Custom Content

Item content can be overridden via the `item-<index>` scoped slot.

<DemoBlock title="Scoped slot">
  <LhDescriptions
    :column="1"
    :items="[
      { label: 'Status', value: 'In progress' },
      { label: 'Progress', value: '' },
    ]"
  >
    <template #item-1="{ item }">
      <LhProgress :percentage="66" />
    </template>
  </LhDescriptions>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- Override the second item with the #item-1 scoped slot -->
  <LhDescriptions
    :column="1"
    :items="[
      { label: 'Status', value: 'In progress' },
      { label: 'Progress', value: '' },
    ]"
  >
    <template #item-1="{ item }">
      <LhProgress :percentage="66" />
    </template>
  </LhDescriptions>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- Override the second item with the #item-1 scoped slot -->
  <LhDescriptions
    :column="1"
    :items="[
      { label: 'Status', value: 'In progress' },
      { label: 'Progress', value: '' },
    ]"
  >
    <template #item-1="{ item }">
      <LhProgress :percentage="66" />
    </template>
  </LhDescriptions>
</template>
```

## Internationalization

Item labels and content can be localized with `LhConfigProvider` together with locale packs.

<DemoBlock title="Internationalization">
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhDescriptions
      :title="locale === 'zh-CN' ? '藏品档案' : 'Collection Archive'"
      :column="2"
      :items="[
        { label: locale === 'zh-CN' ? '名称' : 'Name', value: '青花缠枝莲纹瓶' },
        { label: locale === 'zh-CN' ? '年代' : 'Period', value: '明永乐' },
      ]"
    />
    <LhButton @click="locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'">
      {{ locale === 'zh-CN' ? 'Switch to English' : '切换中文' }}
    </LhButton>
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhConfigProvider, LhDescriptions, LhButton } from '@lh-ui/vue3'
import { zhCN } from '@lh-ui/vue3'
import { enUS } from '@lh-ui/vue3'

const locale = ref('zh-CN')
</script>

<template>
  <!-- Switch locale packs via ConfigProvider -->
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhDescriptions
      :title="locale === 'zh-CN' ? '藏品档案' : 'Collection Archive'"
      :column="2"
      :items="[
        { label: locale === 'zh-CN' ? '名称' : 'Name', value: '青花缠枝莲纹瓶' },
        { label: locale === 'zh-CN' ? '年代' : 'Period', value: '明永乐' },
      ]"
    />
    <LhButton @click="locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'">
      {{ locale === 'zh-CN' ? 'Switch to English' : '切换中文' }}
    </LhButton>
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { LhConfigProvider, LhDescriptions, LhButton } from '@lh-ui/vue3'
import { zhCN } from '@lh-ui/vue3'
import { enUS } from '@lh-ui/vue3'

export default {
  components: { LhConfigProvider, LhDescriptions, LhButton },
  data() {
    return {
      locale: 'zh-CN',
      zhCN: zhCN,
      enUS: enUS,
    }
  },
}
</script>

<template>
  <!-- Switch locale packs via ConfigProvider -->
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhDescriptions
      :title="locale === 'zh-CN' ? '藏品档案' : 'Collection Archive'"
      :column="2"
      :items="[
        { label: locale === 'zh-CN' ? '名称' : 'Name', value: '青花缠枝莲纹瓶' },
        { label: locale === 'zh-CN' ? '年代' : 'Period', value: '明永乐' },
      ]"
    />
    <LhButton @click="locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'">
      {{ locale === 'zh-CN' ? 'Switch to English' : '切换中文' }}
    </LhButton>
  </LhConfigProvider>
</template>
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| title | List title | `string` | — |
| column | Number of item columns per row | `number` | `3` |
| border | Whether to display borders | `boolean` | `false` |
| items | Item list | `[LhDescriptionsItem](#type-LhDescriptionsItem)`[] | `() => []` |
| sx | Shorthand layout props (e.g. `{ mt: 2, w: '50%' }`), applied as inline styles on the root element | `LhSxProps` | — |

### LhDescriptionsItem

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| label | Item label | `string` | — |
| value | Item content | `string \| number` | — |
| span | Number of columns to span, clamped when exceeding the row | `number` | `1` |

### Slots

| Slot | Description | Scope |
| --- | --- | --- |
| title | Custom title | — |
| item-\<index\> | Override the content of the item at index | `{ item }` |

### Accessibility

- Items use the `<dl>` / `<dt>` / `<dd>` structure, so the label/value relationship is expressed by the markup itself
- The trailing filler cell is decorative and marked `aria-hidden`

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## Type Definitions

The TypeScript type structures exported by this component (auto-extracted from `packages/components/descriptions/src/types.ts` and `@lh-ui/share/core/*` sources; click each entry to expand; see the Props table above for attribute descriptions):

<details id="type-LhDescriptionsProps">
<summary><code>LhDescriptionsProps</code></summary>

```ts
export interface LhDescriptionsProps {
  title?: string
  column?: number
  border?: boolean
  items: LhDescriptionsItem[]
  sx?: LhSxProps
}
```

</details>

<details id="type-LhDescriptionsItem">
<summary><code>LhDescriptionsItem</code> <sub>(from @lh-ui/share/core/descriptions)</sub></summary>

```ts
export interface LhDescriptionsItem {
  label: string
  value?: string | number
  span?: number
}
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
import { ref } from 'vue'
import zhCN from '@lh-ui/share/locales/lang/zh-CN'
import enUS from '@lh-ui/share/locales/lang/en-US'

const locale = ref('zh-CN')
</script>
