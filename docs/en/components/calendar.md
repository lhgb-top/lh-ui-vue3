# Calendar

Month-view calendar built on the DatePicker core, with selection modes, optional range constraint and grid keyboard navigation.

## Basic usage

<DemoBlock title="Basic">
  <LhCalendar v-model="date" />
</DemoBlock>

```vue composition
<script setup>
import { ref } from 'vue'
const date = ref(new Date())
</script>

<template>
  <LhCalendar v-model="date" />
</template>
```

```vue options
<script>
export default {
  data() {
    return { date: new Date() }
  },
}
</script>

<template>
  <LhCalendar v-model="date" />
</template>
```

## Selection modes

`selection` changes the picking semantics: `'single'` (default), `'range'` (two clicks for a start/end span), or `'multiple'` (toggle individual dates). The shape of `v-model` follows the mode.

<DemoBlock title="Range span">
  <LhCalendar
    v-model="span"
    selection="range"
    :panels="2"
  />
</DemoBlock>

```vue composition
<script setup>
import { ref } from 'vue'
// range mode holds [start, end]
const span = ref([new Date(2026, 8, 5), new Date(2026, 8, 20)])
</script>

<template>
  <LhCalendar
    v-model="span"
    selection="range"
    :panels="2"
  />
</template>
```

```vue options
<script>
export default {
  data() {
    // range mode holds [start, end]
    return { span: [new Date(2026, 8, 5), new Date(2026, 8, 20)] }
  },
}
</script>

<template>
  <LhCalendar
    v-model="span"
    selection="range"
    :panels="2"
  />
</template>
```

<DemoBlock title="Multiple dates">
  <LhCalendar
    v-model="dates"
    selection="multiple"
  />
</DemoBlock>

```vue composition
<script setup>
import { ref } from 'vue'
// multiple mode holds Date[]
const dates = ref([new Date(2026, 8, 10)])
</script>

<template>
  <LhCalendar
    v-model="dates"
    selection="multiple"
  />
</template>
```

```vue options
<script>
export default {
  data() {
    // multiple mode holds Date[]
    return { dates: [new Date(2026, 8, 10)] }
  },
}
</script>

<template>
  <LhCalendar
    v-model="dates"
    selection="multiple"
  />
</template>
```

## Range constraint

`range` restricts the selectable dates to a given interval — useful together with `selection="range"`.

<DemoBlock title="Range constraint">
  <LhCalendar
    v-model="rangeDate"
    selection="range"
    :range="range"
  />
</DemoBlock>

```vue composition
<script setup>
import { ref } from 'vue'

// JS months are 0-based: new Date(2026, 8, 1) is September 1st
const range = [new Date(2026, 8, 1), new Date(2026, 8, 28)]
const rangeDate = ref([])
</script>

<template>
  <LhCalendar
    v-model="rangeDate"
    selection="range"
    :range="range"
  />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      // JS months are 0-based: new Date(2026, 8, 1) is September 1st
      range: [new Date(2026, 8, 1), new Date(2026, 8, 28)],
      rangeDate: [],
    }
  },
}
</script>

<template>
  <LhCalendar
    v-model="rangeDate"
    selection="range"
    :range="range"
  />
</template>
```

## Collapsible input mode

`mode="input"` collapses the always-visible panel into an input that expands on click. `panels` controls how many month panels are shown at once (laid out with flex wrap), `placeholder` sets the hint text, and `close-on-select` decides whether the panel collapses after a selection.

<DemoBlock title="Input mode with two panels">
  <LhCalendar
    v-model="inputDate"
    mode="input"
    :panels="2"
    placeholder="Pick a date"
  />
</DemoBlock>

```vue composition
<script setup>
import { ref } from 'vue'
const inputDate = ref(new Date())
</script>

<template>
  <LhCalendar
    v-model="inputDate"
    mode="input"
    :panels="2"
    placeholder="Pick a date"
  />
</template>
```

```vue options
<script>
export default {
  data() {
    return { inputDate: new Date() }
  },
}
</script>

<template>
  <LhCalendar
    v-model="inputDate"
    mode="input"
    :panels="2"
    placeholder="Pick a date"
  />
</template>
```

<DemoBlock title="Keep open after selecting">
  <LhCalendar
    v-model="inputDate2"
    mode="input"
    :close-on-select="false"
    placeholder="Panel stays open after selecting"
  />
</DemoBlock>

```vue composition
<script setup>
import { ref } from 'vue'
const inputDate2 = ref(new Date())
</script>

<template>
  <LhCalendar
    v-model="inputDate2"
    mode="input"
    :close-on-select="false"
    placeholder="Panel stays open after selecting"
  />
</template>
```

```vue options
<script>
export default {
  data() {
    return { inputDate2: new Date() }
  },
}
</script>

<template>
  <LhCalendar
    v-model="inputDate2"
    mode="input"
    :close-on-select="false"
    placeholder="Panel stays open after selecting"
  />
</template>
```

## API

### LhCalendar Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue | Selected date (controlled v-model) | `Date \| Date[]` | — |
| selection | Selection mode: single / range span / multiple | `"single" \| "range" \| "multiple"` | `'single'` |
| range | Selectable date range constraint | `[Date, Date]` | — |
| mode | Display form: always-visible panel / collapsible input | `"panel" \| "input"` | `'panel'` |
| panels | Number of month panels shown at once (flex wrap) | `number` | `1` |
| placeholder | Placeholder text for input mode | `string` | — |
| closeOnSelect | Whether input mode collapses the panel after selecting | `boolean` | `true` |
| sx | Quick layout props | `LhSxProps` | — |

### LhCalendar Events

| Event | Description | Callback |
|-------|-------------|----------|
| update:modelValue | Selected value changed (v-model) | `(value: Date \| Date[]) => void` |
| change | Selected value changed | `(value: Date \| Date[]) => void` |
| select | A date cell is clicked, before the selected value updates | `(date: Date) => void` |

Slots: `cell` (custom cell), `header` (header).

## Accessibility

- Grid semantics: `role="grid"` (rows and `gridcell`s), today gets `aria-current="date"`
- Arrow keys move the focused date (±1 day / ±7 days), Home/End, PageUp/Down per month (APG grid pattern)
- Dates outside the range are natively `disabled` and removed from interaction

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## Type Definitions

The TypeScript type structures exported by this component (auto-extracted from `packages/components/calendar/src/types.ts` and `@lh-ui/share/core/*` sources; click each entry to expand; see the Props table above for attribute descriptions):

<details id="type-LhCalendarMode">
<summary><code>LhCalendarMode</code></summary>

```ts
export type LhCalendarMode = 'panel' | 'input'
```

</details>

<details id="type-LhCalendarValue">
<summary><code>LhCalendarValue</code></summary>

```ts
export type LhCalendarValue = Date | Date[]
```

</details>

<details id="type-LhCalendarProps">
<summary><code>LhCalendarProps</code></summary>

```ts
export interface LhCalendarProps {
  modelValue?: LhCalendarValue
  selection?: LhCalendarSelection
  range?: LhCalendarRange
  mode?: LhCalendarMode
  panels?: number
  placeholder?: string
  closeOnSelect?: boolean
  sx?: LhSxProps
}
```

</details>

<details id="type-LhCalendarSelection">
<summary><code>LhCalendarSelection</code> <sub>(from @lh-ui/share/core/calendar)</sub></summary>

```ts
export type LhCalendarSelection = 'single' | 'range' | 'multiple'
```

</details>

<details id="type-LhCalendarRange">
<summary><code>LhCalendarRange</code> <sub>(from @lh-ui/share/core/calendar)</sub></summary>

```ts
export type LhCalendarRange = [Date, Date]
```

</details>

<!-- lh-types:end -->
<script setup>
import { ref } from 'vue'
const date = ref(new Date())
// JS months are 0-based: 8 is September
const range = [new Date(2026, 8, 1), new Date(2026, 8, 28)]
const rangeDate = ref([])
const span = ref([new Date(2026, 8, 5), new Date(2026, 8, 20)])
const dates = ref([new Date(2026, 8, 10)])
const inputDate = ref(new Date())
const inputDate2 = ref(new Date())
</script>
