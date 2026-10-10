# Table

Column-config table with sorting, fixed columns, stripes, cell slots, and **virtual scrolling** for large datasets (window computed by pure core functions, no external library).

## Basic usage

<DemoBlock title="Basic">
  <LhTable :data="rows" :columns="cols" />
</DemoBlock>

```vue composition
<script setup>
const cols = [
  { prop: 'name', label: 'Name', width: 140 },
  { prop: 'role', label: 'Role' },
  { prop: 'city', label: 'City', width: 120 },
]
const rows = [
  { id: 1, name: 'Shen Yan', role: 'Architect', city: 'Hangzhou' },
  { id: 2, name: 'Su Wan', role: 'Frontend', city: 'Suzhou' },
]
</script>

<template>
  <LhTable :data="rows" :columns="cols" />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      cols: [
        { prop: 'name', label: 'Name', width: 140 },
        { prop: 'role', label: 'Role' },
        { prop: 'city', label: 'City', width: 120 },
      ],
      rows: [
        { id: 1, name: 'Shen Yan', role: 'Architect', city: 'Hangzhou' },
        { id: 2, name: 'Su Wan', role: 'Frontend', city: 'Suzhou' },
      ],
    }
  },
}
</script>

<template>
  <LhTable :data="rows" :columns="cols" />
</template>
```

## Sorting and fixed columns

<DemoBlock title="Sort + fixed + stripe">
  <LhTable :data="rows" :columns="sortCols" stripe border size="small" />
</DemoBlock>

```vue composition
<script setup lang="ts">
const sortCols = [
  { prop: 'name', label: 'Name', width: 140, fixed: 'left' },
  { prop: 'age', label: 'Age', width: 100, sortable: true, align: 'center' },
  { prop: 'role', label: 'Role' },
  { prop: 'city', label: 'City', width: 120 },
]
const rows = [
  { id: 1, name: 'Shen Yan', age: 34, role: 'Architect', city: 'Hangzhou' },
  { id: 2, name: 'Su Wan', age: 28, role: 'Frontend', city: 'Suzhou' },
]
</script>

<template>
  <LhTable :data="rows" :columns="sortCols" stripe border size="small" />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      sortCols: [
        { prop: 'name', label: 'Name', width: 140, fixed: 'left' },
        { prop: 'age', label: 'Age', width: 100, sortable: true, align: 'center' },
        { prop: 'role', label: 'Role' },
        { prop: 'city', label: 'City', width: 120 },
      ],
      rows: [
        { id: 1, name: 'Shen Yan', age: 34, role: 'Architect', city: 'Hangzhou' },
        { id: 2, name: 'Su Wan', age: 28, role: 'Frontend', city: 'Suzhou' },
      ],
    }
  },
}
</script>

<template>
  <LhTable :data="rows" :columns="sortCols" stripe border size="small" />
</template>
```

## Virtual scrolling

Setting `height` enables it: only rows inside the visible window are rendered. `rowHeight` must match the real row height.

<DemoBlock title="Virtual 1000 rows">
  <LhTable :data="bigRows" :columns="cols" :height="240" :row-height="48" />
</DemoBlock>

```vue composition
<script setup lang="ts">
const cols = [
  { prop: 'name', label: 'Name', width: 140 },
  { prop: 'role', label: 'Role' },
  { prop: 'city', label: 'City', width: 120 },
]

const bigRows = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `Row ${i + 1}`,
  role: i % 2 === 0 ? 'Architect' : 'Frontend',
  city: 'Hangzhou',
}))
</script>

<template>
  <LhTable :data="bigRows" :columns="cols" :height="240" :row-height="48" />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      cols: [
        { prop: 'name', label: 'Name', width: 140 },
        { prop: 'role', label: 'Role' },
        { prop: 'city', label: 'City', width: 120 },
      ],
      bigRows: Array.from({ length: 1000 }, (_, i) => ({
        id: i + 1,
        name: `Row ${i + 1}`,
        role: i % 2 === 0 ? 'Architect' : 'Frontend',
        city: 'Hangzhou',
      })),
    }
  },
}
</script>

<template>
  <LhTable :data="bigRows" :columns="cols" :height="240" :row-height="48" />
</template>
```

## Multi-level headers

Nest `children` in the column config to build grouped headers (arbitrary depth); the body aligns to leaf columns.

<DemoBlock title="Two-level header">
  <LhTable :data="rows" :columns="nestedCols" border />
</DemoBlock>

```vue composition
<script setup>
const nestedCols = [
  { prop: 'name', label: 'Name', width: 140, fixed: 'left' },
  {
    label: 'Profile',
    children: [
      { prop: 'role', label: 'Role' },
      { prop: 'city', label: 'City', width: 120 },
    ],
  },
  { prop: 'age', label: 'Age', sortable: true, align: 'center' },
]
</script>

<template>
  <LhTable :data="rows" :columns="nestedCols" border />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      nestedCols: [
        { prop: 'name', label: 'Name', width: 140, fixed: 'left' },
        {
          label: 'Profile',
          children: [
            { prop: 'role', label: 'Role' },
            { prop: 'city', label: 'City', width: 120 },
          ],
        },
        { prop: 'age', label: 'Age', sortable: true, align: 'center' },
      ],
    }
  },
}
</script>

<template>
  <LhTable :data="rows" :columns="nestedCols" border />
</template>
```

## Filtering

Configure `filters` on a column to add a filter trigger in its header; check options then press Confirm / Reset.
`filterMultiple: false` switches to single choice, `filterMethod` customizes the predicate, controlled usage below.

<DemoBlock title="Column filter (controlled)">
  <LhTable
    :data="rows"
    :columns="filterCols"
    v-model:filtered-values="filteredValues"
    @filter-change="onFilterChange"
  />
  <p class="demo-filter-log">Active filters: {{ JSON.stringify(filteredValues) }}</p>
</DemoBlock>

```vue composition
<script setup>
import { ref } from 'vue'

const filteredValues = ref({})

const filterCols = [
  { prop: 'name', label: 'Name', width: 140 },
  {
    prop: 'role', label: 'Role', filters: [
      { text: 'Architect', value: 'Architect' },
      { text: 'Frontend', value: 'Frontend' },
      { text: 'Designer', value: 'Designer' },
    ],
  },
]

function onFilterChange({ prop, values }) {
  console.log('filterChange', prop, values)
}
</script>

<template>
  <!-- Controlled filtering -->
  <LhTable
    :data="rows"
    :columns="filterCols"
    v-model:filtered-values="filteredValues"
    @filter-change="onFilterChange"
  />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      filteredValues: {},
      filterCols: [
        { prop: 'name', label: 'Name', width: 140 },
        {
          prop: 'role', label: 'Role', filters: [
            { text: 'Architect', value: 'Architect' },
            { text: 'Frontend', value: 'Frontend' },
            { text: 'Designer', value: 'Designer' },
          ],
        },
      ],
    }
  },
  methods: {
    onFilterChange({ prop, values }) {
      console.log('filterChange', prop, values)
    },
  },
}
</script>

<template>
  <!-- Controlled filtering -->
  <LhTable
    :data="rows"
    :columns="filterCols"
    v-model:filtered-values="filteredValues"
    @filter-change="onFilterChange"
  />
</template>
```

## Column resizing

Enable `resizable` (global switch) and mark `resizable: true` on a leaf column with a numeric `width`.
A drag handle appears at the column edge; when focused, ←/→ adjust by 10px, drag floor is 40px.

<DemoBlock title="Resize columns">
  <LhTable :data="rows" :columns="resizeCols" resizable border @column-resize="onColumnResize" />
  <p class="demo-filter-log">Last resize: {{ resizeLog }}</p>
</DemoBlock>

```vue composition
<script setup>
import { ref } from 'vue'

const resizeLog = ref('(none)')

const resizeCols = [
  { prop: 'name', label: 'Name', width: 140, resizable: true, fixed: 'left' },
  { prop: 'role', label: 'Role' },
  { prop: 'city', label: 'City', width: 120, resizable: true },
]

function onColumnResize({ prop, width }) {
  resizeLog.value = `${prop} → ${width}px`
}
</script>

<template>
  <!-- Column resizing -->
  <LhTable :data="rows" :columns="resizeCols" resizable border @column-resize="onColumnResize" />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      resizeLog: '(none)',
      resizeCols: [
        { prop: 'name', label: 'Name', width: 140, resizable: true, fixed: 'left' },
        { prop: 'role', label: 'Role' },
        { prop: 'city', label: 'City', width: 120, resizable: true },
      ],
    }
  },
  methods: {
    onColumnResize({ prop, width }) {
      this.resizeLog = `${prop} → ${width}px`
    },
  },
}
</script>

<template>
  <!-- Column resizing -->
  <LhTable :data="rows" :columns="resizeCols" resizable border @column-resize="onColumnResize" />
</template>
```

## Row key, max height and default sort

`row-key` specifies the unique row key (recommended); `max-height` makes the header sticky with a scrollable body; `sorter` customizes sorting; `default-sort-prop` / `default-sort-order` set the initial sort; `default-filtered-values` sets initial filters.

<DemoBlock title="rowKey / maxHeight / default sort">
  <LhTable
    :data="rows"
    :columns="sorterCols"
    row-key="name"
    max-height="200"
    default-sort-prop="age"
    default-sort-order="desc"
  />
</DemoBlock>

```vue composition
<script setup>
const sorterCols = [
  { prop: 'name', label: 'Name', width: 140 },
  { prop: 'age', label: 'Age', sortable: true, sorter: (a, b) => a.age - b.age },
  { prop: 'role', label: 'Role' },
]
</script>

<template>
  <LhTable
    :data="rows"
    :columns="sorterCols"
    row-key="name"
    max-height="200"
    default-sort-prop="age"
    default-sort-order="desc"
  />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      sorterCols: [
        { prop: 'name', label: 'Name', width: 140 },
        { prop: 'age', label: 'Age', sortable: true, sorter: (a, b) => a.age - b.age },
        { prop: 'role', label: 'Role' },
      ],
    }
  },
}
</script>

<template>
  <LhTable
    :data="rows"
    :columns="sorterCols"
    row-key="name"
    max-height="200"
    default-sort-prop="age"
    default-sort-order="desc"
  />
</template>
```

## API

### LhTable Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| data | Row data | `[LhTableRow](#type-LhTableRow)`[] | — |
| columns | Column config | `[LhTableColumn](#type-LhTableColumn)`[] | — |
| height | Body height (enables virtual scrolling; number is px) | `string \| number` | — |
| maxHeight | Max height in non-virtual mode | `string \| number` | — |
| rowHeight | Virtual row height (must match the real row height) | `number` | `[LH_TABLE_ROW_HEIGHT](#const-LH_TABLE_ROW_HEIGHT)` |
| stripe | Zebra stripes | `boolean` | `false` |
| border | Cell borders | `boolean` | `false` |
| size | Size | `"small" \| "default" \| "large"` | `'default'` |
| rowKey | Row key field name | `string` | `'id'` |
| defaultSortProp | Default sort column | `string` | — |
| defaultSortOrder | Default sort order | `"asc" \| "desc"` | — |
| sorter | Custom sorter | `(a: LhTableRow, b: LhTableRow) => number` | — |
| resizable | Enable column resizing (also needs column-level `resizable`) | `boolean` | `false` |
| defaultFilteredValues | Default filter state (uncontrolled, keyed by column prop) | `{ [x: string]: (string \| number)[]; }` | `() => ({})` |
| filteredValues | Controlled filter state (keyed by column prop) | `{ [x: string]: (string \| number)[]; }` | — |
| sx | Quick layout props | `SxProps` | — |

### LhTable Events

| Event | Description | Callback |
|-------|-------------|----------|
| sortChange | Sorting changed by clicking a sortable header | `(payload: { prop: string; order: 'asc' \| 'desc' \| undefined }) => void` |
| rowClick | A body row is clicked | `(row: LhTableRow, index: number) => void` |
| filterChange | Filter options confirmed on a column | `(payload: { prop: string; values: (string \| number)[] }) => void` |
| update:filteredValues | Filter state changed (v-model:filteredValues) | `(values: Record<string, (string \| number)[]>) => void` |
| columnResize | Column width changed by dragging the resize handle | `(payload: { prop: string; width: number }) => void` |

Slots: `empty`, `<column.slot>` (scope `{ row, column, index, value }`).

### LhTableColumn

| Field | Description | Type |
| --- | --- | --- |
| prop | Data field name | `string` |
| label | Column title | `string` |
| width | Column width (number is px; evenly split when omitted) | `number \| string` |
| align | Alignment | `'left' \| 'center' \| 'right'` |
| fixed | Fixed column (requires width) | `'left' \| 'right'` |
| sortable | Sortable | `boolean` |
| slot | Cell slot name | `string` |
| formatter | Value formatter | `(row, value) => string` |
| children | Child columns (nesting builds grouped headers) | `LhTableColumn[]` |
| filters | Filter options (leaf columns only) | `LhTableFilterOption[]` |
| filterMethod | Custom filter predicate (defaults to strict prop equality) | `(value, row) => boolean` |
| filterMultiple | Whether the filter panel allows multiple choices | `boolean` |
| resizable | Column is resizable (numeric-width leaf column only) | `boolean` |

## Accessibility

- `role="grid"` with `aria-rowcount` / `aria-colcount`; rows, `columnheader`s and `gridcell`s
- Sortable headers expose `aria-sort` (`none` / `ascending` / `descending`), triggered by a real `<button>`
- Fixed columns use CSS `position: sticky` (no hand-rolled scroll math)
- Filter triggers expose `aria-haspopup` + `aria-expanded`; the panel is `role="group"`
- Resize handles are `role="separator"`, focusable and adjustable with ←/→ in 10px steps

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## Type Definitions

The TypeScript type structures exported by this component (auto-extracted from `packages/components/table/src/types.ts` and `@lh-ui/share/core/*` sources; click each entry to expand; see the Props table above for attribute descriptions):

<details id="type-LhTableProps">
<summary><code>LhTableProps</code></summary>

```ts
export interface LhTableProps {
  data: LhTableRow[]
  columns: LhTableColumn[]
  height?: number | string
  maxHeight?: number | string
  rowHeight?: number
  stripe?: boolean
  border?: boolean
  size?: 'small' | 'default' | 'large'
  rowKey?: string
  defaultSortProp?: string
  defaultSortOrder?: LhTableSortOrder
  sorter?: (a: LhTableRow, b: LhTableRow) => number
  resizable?: boolean
  defaultFilteredValues?: Record<string, (string | number)[]>
  filteredValues?: Record<string, (string | number)[]>
  sx?: SxProps
}
```

</details>

<details id="type-LhTableSortOrder">
<summary><code>LhTableSortOrder</code> <sub>(from @lh-ui/share/core/table)</sub></summary>

```ts
export type LhTableSortOrder = 'asc' | 'desc'
```

</details>

<details id="type-LhTableRow">
<summary><code>LhTableRow</code> <sub>(from @lh-ui/share/core/table)</sub></summary>

```ts
export type LhTableRow = Record<string, any>
```

</details>

<details id="type-LhTableColumn">
<summary><code>LhTableColumn</code> <sub>(from @lh-ui/share/core/table)</sub></summary>

```ts
export interface LhTableColumn {
  prop: string
  label: string
  width?: number | string
  align?: LhTableAlign
  fixed?: 'left' | 'right'
  sortable?: boolean
  slot?: string
  formatter?: (row: LhTableRow, value: any) => string
  children?: LhTableColumn[]
  filters?: LhTableFilterOption[]
  filterMethod?: (value: string | number, row: LhTableRow) => boolean
  filterMultiple?: boolean
  resizable?: boolean
}
```

</details>

<details id="type-LhTableFilterOption">
<summary><code>LhTableFilterOption</code> <sub>(from @lh-ui/share/core/table)</sub></summary>

```ts
export interface LhTableFilterOption {
  text: string
  value: string | number
}
```

</details>

<details id="type-LhTableAlign">
<summary><code>LhTableAlign</code> <sub>(from @lh-ui/share/core/table)</sub></summary>

```ts
export type LhTableAlign = 'left' | 'center' | 'right'
```

</details>

### Constants

Public constants used by this component (linked from the Type / Default columns in the Props table above):

<details id="const-LH_TABLE_ROW_HEIGHT">
<summary><code>LH_TABLE_ROW_HEIGHT</code> <sub>(from @lh-ui/share/core/table)</sub></summary>

```ts
export const LH_TABLE_ROW_HEIGHT = 48
```

</details>

<details id="const-LH_TABLE_OVERSCAN">
<summary><code>LH_TABLE_OVERSCAN</code> <sub>(from @lh-ui/share/core/table)</sub></summary>

```ts
export const LH_TABLE_OVERSCAN = 3
```

</details>

<details id="const-LH_TABLE_MIN_COL_WIDTH">
<summary><code>LH_TABLE_MIN_COL_WIDTH</code> <sub>(from @lh-ui/share/core/table)</sub></summary>

```ts

export const LH_TABLE_MIN_COL_WIDTH = 40
```

</details>

<!-- lh-types:end -->
<script setup>
import { ref } from 'vue'
const cols = [
  { prop: 'name', label: 'Name', width: 140 },
  { prop: 'role', label: 'Role' },
  { prop: 'city', label: 'City', width: 120 },
]
const sortCols = [
  { prop: 'name', label: 'Name', width: 140, fixed: 'left' },
  { prop: 'age', label: 'Age', width: 100, sortable: true, align: 'center' },
  { prop: 'role', label: 'Role' },
  { prop: 'city', label: 'City', width: 120 },
]
const rows = [
  { id: 1, name: 'Shen Yan', age: 34, role: 'Architect', city: 'Hangzhou' },
  { id: 2, name: 'Su Wan', age: 28, role: 'Frontend', city: 'Suzhou' },
  { id: 3, name: 'Lu Li', age: 31, role: 'Designer', city: 'Beijing' },
]
const bigRows = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `Row ${i + 1}`,
  role: i % 2 === 0 ? 'Architect' : 'Frontend',
  city: 'Hangzhou',
}))
const filteredValues = ref({})
const resizeLog = ref('(none)')
const nestedCols = [
  { prop: 'name', label: 'Name', width: 140, fixed: 'left' },
  {
    label: 'Profile',
    children: [
      { prop: 'role', label: 'Role' },
      { prop: 'city', label: 'City', width: 120 },
    ],
  },
  { prop: 'age', label: 'Age', sortable: true, align: 'center' },
]
const filterCols = [
  { prop: 'name', label: 'Name', width: 140 },
  {
    prop: 'role', label: 'Role', filters: [
      { text: 'Architect', value: 'Architect' },
      { text: 'Frontend', value: 'Frontend' },
      { text: 'Designer', value: 'Designer' },
    ],
  },
]
const resizeCols = [
  { prop: 'name', label: 'Name', width: 140, resizable: true, fixed: 'left' },
  { prop: 'role', label: 'Role' },
  { prop: 'city', label: 'City', width: 120, resizable: true },
]
const sorterCols = [
  { prop: 'name', label: 'Name', width: 140 },
  { prop: 'age', label: 'Age', sortable: true, sorter: (a, b) => a.age - b.age },
  { prop: 'role', label: 'Role' },
]
function onFilterChange({ prop, values }) {
  console.log('filterChange', prop, values)
}

function onColumnResize({ prop, width }) {
  resizeLog.value = `${prop} → ${width}px`
}
</script>
