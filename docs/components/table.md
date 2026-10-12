# Table 表格

列配置式表格。支持排序、固定列、斑马纹、单元格插槽，以及大数据量的**虚拟滚动**（core 纯函数计算可视窗口，自研不引库）。

## 基础用法

<DemoBlock title="基础用法">
  <LhTable :data="rows" :columns="cols" />
</DemoBlock>

```vue composition
<script setup>
const cols = [
  { prop: 'name', label: '名称', width: 140 },
  { prop: 'role', label: '职责' },
  { prop: 'city', label: '城市', width: 120 },
]
const rows = [
  { id: 1, name: '沈砚', role: '架构', city: '杭州' },
  { id: 2, name: '苏晚', role: '前端', city: '苏州' },
  { id: 3, name: '陆离', role: '设计', city: '北京' },
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
        { prop: 'name', label: '名称', width: 140 },
        { prop: 'role', label: '职责' },
        { prop: 'city', label: '城市', width: 120 },
      ],
      rows: [
        { id: 1, name: '沈砚', role: '架构', city: '杭州' },
        { id: 2, name: '苏晚', role: '前端', city: '苏州' },
        { id: 3, name: '陆离', role: '设计', city: '北京' },
      ],
    }
  },
}
</script>

<template>
  <LhTable :data="rows" :columns="cols" />
</template>
```

## 排序与固定列

<DemoBlock title="排序 + 固定列 + 斑马纹">
  <LhTable :data="rows" :columns="sortCols" stripe border size="small" />
</DemoBlock>

```vue composition
<script setup>
const sortCols = [
  { prop: 'name', label: '名称', width: 140, fixed: 'left' },
  { prop: 'age', label: '年龄', width: 100, sortable: true, align: 'center' },
  { prop: 'role', label: '职责' },
  { prop: 'city', label: '城市', width: 120 },
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
        { prop: 'name', label: '名称', width: 140, fixed: 'left' },
        { prop: 'age', label: '年龄', width: 100, sortable: true, align: 'center' },
        { prop: 'role', label: '职责' },
        { prop: 'city', label: '城市', width: 120 },
      ],
    }
  },
}
</script>

<template>
  <LhTable :data="rows" :columns="sortCols" stripe border size="small" />
</template>
```

## 虚拟滚动（大数据量）

设置 `height` 即启用：只渲染可视窗口内的行，`rowHeight` 需与实际行高一致。

<DemoBlock title="虚拟滚动 1000 行">
  <LhTable :data="bigRows" :columns="cols" :height="240" :row-height="48" />
</DemoBlock>

```vue composition
<script setup lang="ts">
const cols = [
  { prop: 'name', label: '名称', width: 140 },
  { prop: 'role', label: '职责' },
  { prop: 'city', label: '城市', width: 120 },
]

const bigRows = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `行 ${i + 1}`,
  role: i % 2 === 0 ? '架构' : '前端',
  city: '杭州',
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
        { prop: 'name', label: '名称', width: 140 },
        { prop: 'role', label: '职责' },
        { prop: 'city', label: '城市', width: 120 },
      ],
      bigRows: Array.from({ length: 1000 }, (_, i) => ({
        id: i + 1,
        name: `行 ${i + 1}`,
        role: i % 2 === 0 ? '架构' : '前端',
        city: '杭州',
      })),
    }
  },
}
</script>

<template>
  <LhTable :data="bigRows" :columns="cols" :height="240" :row-height="48" />
</template>
```

## 自定义单元格

<DemoBlock title="插槽自定义">
  <LhTable :data="rows" :columns="slotCols">
    <template #role="{ value }">
      <LhTag :type="value === '架构' ? 'primary' : 'info'">{{ value }}</LhTag>
    </template>
  </LhTable>
</DemoBlock>

```vue composition
<script setup lang="ts">
const rows = [
  { id: 1, name: '沈砚', age: 34, role: '架构', city: '杭州' },
  { id: 2, name: '苏晚', age: 28, role: '前端', city: '苏州' },
  { id: 3, name: '陆离', age: 31, role: '设计', city: '北京' },
]
const slotCols = [
  { prop: 'name', label: '名称', width: 140 },
  { prop: 'role', label: '职责', slot: 'role' },
]
</script>

<template>
  <!-- 职责列插槽自定义 -->
  <LhTable :data="rows" :columns="slotCols">
    <template #role="{ value }">
      <LhTag :type="value === '架构' ? 'primary' : 'info'">{{ value }}</LhTag>
    </template>
  </LhTable>
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      rows: [
        { id: 1, name: '沈砚', age: 34, role: '架构', city: '杭州' },
        { id: 2, name: '苏晚', age: 28, role: '前端', city: '苏州' },
        { id: 3, name: '陆离', age: 31, role: '设计', city: '北京' },
      ],
      slotCols: [
        { prop: 'name', label: '名称', width: 140 },
        { prop: 'role', label: '职责', slot: 'role' },
      ],
    }
  },
}
</script>

<template>
  <!-- 职责列插槽自定义 -->
  <LhTable :data="rows" :columns="slotCols">
    <template #role="{ value }">
      <LhTag :type="value === '架构' ? 'primary' : 'info'">{{ value }}</LhTag>
    </template>
  </LhTable>
</template>
```

## 多级表头

列配置嵌套 `children` 即得多级表头，可无限嵌套；表体按叶子列对齐。

<DemoBlock title="两级表头">
  <LhTable :data="rows" :columns="nestedCols" border />
</DemoBlock>

```vue composition
<script setup>
const nestedCols = [
  { prop: 'name', label: '名称', width: 140, fixed: 'left' },
  {
    label: '项目信息',
    children: [
      { prop: 'role', label: '职责' },
      { prop: 'city', label: '城市', width: 120 },
    ],
  },
  { prop: 'age', label: '年龄', sortable: true, align: 'center' },
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
        { prop: 'name', label: '名称', width: 140, fixed: 'left' },
        {
          label: '项目信息',
          children: [
            { prop: 'role', label: '职责' },
            { prop: 'city', label: '城市', width: 120 },
          ],
        },
        { prop: 'age', label: '年龄', sortable: true, align: 'center' },
      ],
    }
  },
}
</script>

<template>
  <LhTable :data="rows" :columns="nestedCols" border />
</template>
```

## 筛选

列配置 `filters` 后表头出现筛选触发器；勾选选项后点「确定」生效、「重置」清空。
`filterMultiple: false` 为单选，`filterMethod` 自定义判定，受控用法见下例。

<DemoBlock title="列筛选（受控）">
  <LhTable
    :data="rows"
    :columns="filterCols"
    v-model:filtered-values="filteredValues"
    @filter-change="onFilterChange"
  />
  <p class="demo-filter-log">当前筛选：{{ JSON.stringify(filteredValues) }}</p>
</DemoBlock>

```vue composition
<script setup>
import { ref } from 'vue'

const filteredValues = ref({})

const filterCols = [
  { prop: 'name', label: '名称', width: 140 },
  {
    prop: 'role', label: '职责', filters: [
      { text: '架构', value: '架构' },
      { text: '前端', value: '前端' },
      { text: '设计', value: '设计' },
    ],
  },
]

function onFilterChange({ prop, values }) {
  console.log('filterChange', prop, values)
}
</script>

<template>
  <!-- 受控筛选 -->
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
        { prop: 'name', label: '名称', width: 140 },
        {
          prop: 'role', label: '职责', filters: [
            { text: '架构', value: '架构' },
            { text: '前端', value: '前端' },
            { text: '设计', value: '设计' },
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
  <!-- 受控筛选 -->
  <LhTable
    :data="rows"
    :columns="filterCols"
    v-model:filtered-values="filteredValues"
    @filter-change="onFilterChange"
  />
</template>
```

## 列宽拖拽

开启 `resizable`（总开关）并在列上标记 `resizable: true`（叶子列且为数字 width）。
表头右缘出现拖拽手柄，聚焦后 ←/→ 每次 ±10px，拖动下限 40px。

<DemoBlock title="拖拽调整列宽">
  <LhTable :data="rows" :columns="resizeCols" resizable border @column-resize="onColumnResize" />
  <p class="demo-filter-log">最近调整：{{ resizeLog }}</p>
</DemoBlock>

```vue composition
<script setup>
import { ref } from 'vue'

const resizeLog = ref('（未调整）')

const resizeCols = [
  { prop: 'name', label: '名称', width: 140, resizable: true, fixed: 'left' },
  { prop: 'role', label: '职责' },
  { prop: 'city', label: '城市', width: 120, resizable: true },
]

function onColumnResize({ prop, width }) {
  resizeLog.value = `${prop} → ${width}px`
}
</script>

<template>
  <!-- 列宽拖拽 -->
  <LhTable :data="rows" :columns="resizeCols" resizable border @column-resize="onColumnResize" />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      resizeLog: '（未调整）',
      resizeCols: [
        { prop: 'name', label: '名称', width: 140, resizable: true, fixed: 'left' },
        { prop: 'role', label: '职责' },
        { prop: 'city', label: '城市', width: 120, resizable: true },
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
  <!-- 列宽拖拽 -->
  <LhTable :data="rows" :columns="resizeCols" resizable border @column-resize="onColumnResize" />
</template>
```

## 行键、最大高度与默认排序

`row-key` 指定行唯一键（推荐）；`max-height` 限高后表头吸顶、表体滚动；`sorter` 自定义排序函数；`default-sort-prop` / `default-sort-order` 设定初始排序；`default-filtered-values` 设定初始筛选。

<DemoBlock title="rowKey / maxHeight / 默认排序">
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
  { prop: 'name', label: '名称', width: 140 },
  { prop: 'age', label: '年龄', sortable: true, sorter: (a, b) => a.age - b.age },
  { prop: 'role', label: '职责' },
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
        { prop: 'name', label: '名称', width: 140 },
        { prop: 'age', label: '年龄', sortable: true, sorter: (a, b) => a.age - b.age },
        { prop: 'role', label: '职责' },
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

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| data | 行数据 | `[LhTableRow](#type-LhTableRow)`[] | — |
| columns | 列配置 | `[LhTableColumn](#type-LhTableColumn)`[] | — |
| height | 表体高度（设置后启用虚拟滚动；数字为 px） | `string \| number` | — |
| maxHeight | 非虚拟模式下的最大高度 | `string \| number` | — |
| rowHeight | 虚拟滚动行高（需与实际行高一致） | `number` | `[LH_TABLE_ROW_HEIGHT](#const-LH_TABLE_ROW_HEIGHT)` |
| stripe | 斑马纹 | `boolean` | `false` |
| border | 单元格边框 | `boolean` | `false` |
| size | 尺寸 | `"small" \| "default" \| "large"` | `'default'` |
| rowKey | 行键字段名 | `string` | `'id'` |
| defaultSortProp | 默认排序列 | `string` | — |
| defaultSortOrder | 默认排序方向 | `"asc" \| "desc"` | — |
| sorter | 自定义排序函数 | `(a: LhTableRow, b: LhTableRow) => number` | — |
| resizable | 开启列宽拖拽（仍需列级 resizable 配合） | `boolean` | `false` |
| defaultFilteredValues | 默认筛选状态（非受控，键为列 prop） | `{ [x: string]: (string \| number)[]; }` | `() => ({})` |
| filteredValues | 受控筛选状态（键为列 prop） | `{ [x: string]: (string \| number)[]; }` | — |
| sx | sx 快速布局属性 | `LhSxProps` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| sortChange | 排序变化时触发（换列从 asc 重新开始，同列循环 asc → desc → 取消） | `(payload: { prop: string, order: 'asc' \| 'desc' \| undefined })` |
| rowClick | 点击某一行时触发 | `(row: LhTableRow, index: number)` |
| filterChange | 筛选「确定」或「重置」提交后触发 | `(payload: { prop: string, values: (string \| number)[] })` |
| update:filteredValues | 筛选状态变化时触发（v-model:filtered-values） | `(values: Record<string, (string \| number)[]>)` |
| columnResize | 列宽调整完成后触发（拖拽结束或键盘 ←/→） | `(payload: { prop: string, width: number })` |

插槽：`empty`、`<column.slot>`（作用域参数 `{ row, column, index, value }`）。

### LhTableColumn

| 字段 | 说明 | 类型 |
|------|------|------|
| prop | 数据字段名 | `string` |
| label | 列标题 | `string` |
| width | 列宽（数字为 px，未设则均分） | `number \| string` |
| align | 对齐 | `'left' \| 'center' \| 'right'` |
| fixed | 固定列（需配合 width） | `'left' \| 'right'` |
| sortable | 可排序 | `boolean` |
| slot | 自定义单元格插槽名 | `string` |
| formatter | 值格式化 | `(row, value) => string` |
| children | 子列（配置即得多级表头） | `LhTableColumn[]` |
| filters | 列筛选选项（仅叶子列生效） | `LhTableFilterOption[]` |
| filterMethod | 自定义筛选判定（默认按 prop 全等比对） | `(value, row) => boolean` |
| filterMultiple | 筛选面板是否多选 | `boolean` |
| resizable | 该列可拖宽（需为数字 width 的叶子列） | `boolean` |

## 无障碍

- `role="grid"` + `aria-rowcount` / `aria-colcount`；行 `row`、列头 `columnheader`、单元格 `gridcell`
- 排序列头暴露 `aria-sort`（`none` / `ascending` / `descending`），排序触发为真实 `<button>`
- 固定列用 CSS `position: sticky`（不自制吸附计算）
- 筛选触发器 `aria-haspopup` + `aria-expanded`，面板为 `role="group"`
- 列宽手柄为 `role="separator"`，可聚焦并用 ←/→ 键 ±10px 调整

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/table/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

<details id="type-LhTableProps">
<summary><code>LhTableProps</code></summary>

```ts
export interface LhTableProps {
  /** 行数据 */
  data: LhTableRow[]
  /** 列配置 */
  columns: LhTableColumn[]
  /** 表体高度（设置后启用虚拟滚动；数字为 px） */
  height?: number | string
  /** 非虚拟模式下的最大高度 */
  maxHeight?: number | string
  /** 虚拟滚动行高（需与实际行高一致） */
  rowHeight?: number
  /** 斑马纹 */
  stripe?: boolean
  /** 单元格边框 */
  border?: boolean
  /** 尺寸 */
  size?: 'small' | 'default' | 'large'
  /** 行键字段名 */
  rowKey?: string
  /** 默认排序列 */
  defaultSortProp?: string
  /** 默认排序方向 */
  defaultSortOrder?: LhTableSortOrder
  /** 自定义排序函数 */
  sorter?: (a: LhTableRow, b: LhTableRow) => number
  /** 开启列宽拖拽（仍需列级 resizable 配合，且列须为数字 width） */
  resizable?: boolean
  /** 默认筛选状态（非受控，键为列 prop） */
  defaultFilteredValues?: Record<string, (string | number)[]>
  /** 受控筛选状态（键为列 prop） */
  filteredValues?: Record<string, (string | number)[]>
  /** sx 快速布局属性 */
  sx?: LhSxProps
}
```

</details>

<details id="type-LhTableSortOrder">
<summary><code>LhTableSortOrder</code> <sub>（来自 @lh-ui/share/core/table）</sub></summary>

```ts
/** 排序方向 */
export type LhTableSortOrder = 'asc' | 'desc'
```

</details>

<details id="type-LhTableRow">
<summary><code>LhTableRow</code> <sub>（来自 @lh-ui/share/core/table）</sub></summary>

```ts
/** 行数据类型 */
export type LhTableRow = Record<string, any>
```

</details>

<details id="type-LhTableColumn">
<summary><code>LhTableColumn</code> <sub>（来自 @lh-ui/share/core/table）</sub></summary>

```ts
/** 列配置 */
export interface LhTableColumn {
  /** 数据字段名 */
  prop: string
  /** 列标题 */
  label: string
  /** 列宽（数字为 px） */
  width?: number | string
  /** 对齐 */
  align?: LhTableAlign
  /** 固定列（需配合 width） */
  fixed?: 'left' | 'right'
  /** 可排序 */
  sortable?: boolean
  /** 自定义单元格插槽名 */
  slot?: string
  /** 值格式化 */
  formatter?: (row: LhTableRow, value: any) => string
  /** 子列（配置即得多级表头，可无限嵌套） */
  children?: LhTableColumn[]
  /** 列筛选选项（仅叶子列生效） */
  filters?: LhTableFilterOption[]
  /** 自定义筛选判定（默认按 prop 全等比对） */
  filterMethod?: (value: string | number, row: LhTableRow) => boolean
  /** 筛选面板是否多选（默认 true） */
  filterMultiple?: boolean
  /** 该列可拖宽（需为数字 width 的叶子列） */
  resizable?: boolean
}
```

</details>

<details id="type-LhTableFilterOption">
<summary><code>LhTableFilterOption</code> <sub>（来自 @lh-ui/share/core/table）</sub></summary>

```ts
/** 筛选选项 */
export interface LhTableFilterOption {
  /** 选项文案 */
  text: string
  /** 选项值（参与 filterMethod 比对） */
  value: string | number
}
```

</details>

<details id="type-LhTableAlign">
<summary><code>LhTableAlign</code> <sub>（来自 @lh-ui/share/core/table）</sub></summary>

```ts
/** 单元格对齐 */
export type LhTableAlign = 'left' | 'center' | 'right'
```

</details>

### 常量

本组件用到的公开常量如下（可在 Props 表的「类型 / 默认值」列点击同名条目跳转至此）：

<details id="const-LH_TABLE_ROW_HEIGHT">
<summary><code>LH_TABLE_ROW_HEIGHT</code> <sub>（来自 @lh-ui/share/core/table）</sub></summary>

```ts
/** 虚拟滚动默认行高 */
export const LH_TABLE_ROW_HEIGHT = 48
```

</details>

<details id="const-LH_TABLE_OVERSCAN">
<summary><code>LH_TABLE_OVERSCAN</code> <sub>（来自 @lh-ui/share/core/table）</sub></summary>

```ts
/** 窗口上下各多渲染几行（滚动白屏缓冲） */
export const LH_TABLE_OVERSCAN = 3
```

</details>

<details id="const-LH_TABLE_MIN_COL_WIDTH">
<summary><code>LH_TABLE_MIN_COL_WIDTH</code> <sub>（来自 @lh-ui/share/core/table）</sub></summary>

```ts
// ============================================================================
// 列宽拖拽
// ============================================================================

/** 拖宽下限（px），再窄单元格内容无法容纳 */
export const LH_TABLE_MIN_COL_WIDTH = 40
```

</details>

<!-- lh-types:end -->
<script setup>
import { ref } from 'vue'
const filteredValues = ref({})
const resizeLog = ref('（未调整）')
function onFilterChange() {}
function onColumnResize({ prop, width }) {
  resizeLog.value = `${prop} → ${width}px`
}
const nestedCols = [
  { prop: 'name', label: '名称', width: 140, fixed: 'left' },
  { label: '项目信息', children: [
    { prop: 'role', label: '职责' },
    { prop: 'city', label: '城市', width: 120 },
  ] },
  { prop: 'age', label: '年龄', sortable: true, align: 'center' },
]
const filterCols = [
  { prop: 'name', label: '名称', width: 140 },
  { prop: 'role', label: '职责', filters: [
    { text: '架构', value: '架构' },
    { text: '前端', value: '前端' },
    { text: '设计', value: '设计' },
  ] },
]
const resizeCols = [
  { prop: 'name', label: '名称', width: 140, resizable: true, fixed: 'left' },
  { prop: 'role', label: '职责' },
  { prop: 'city', label: '城市', width: 120, resizable: true },
]
const cols = [
  { prop: 'name', label: '名称', width: 140 },
  { prop: 'role', label: '职责' },
  { prop: 'city', label: '城市', width: 120 },
]
const sortCols = [
  { prop: 'name', label: '名称', width: 140, fixed: 'left' },
  { prop: 'age', label: '年龄', width: 100, sortable: true, align: 'center' },
  { prop: 'role', label: '职责' },
  { prop: 'city', label: '城市', width: 120 },
]
const slotCols = [
  { prop: 'name', label: '名称', width: 140 },
  { prop: 'role', label: '职责', slot: 'role' },
]
const rows = [
  { id: 1, name: '沈砚', age: 34, role: '架构', city: '杭州' },
  { id: 2, name: '苏晚', age: 28, role: '前端', city: '苏州' },
  { id: 3, name: '陆离', age: 31, role: '设计', city: '北京' },
]
const bigRows = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `行 ${i + 1}`,
  role: i % 2 === 0 ? '架构' : '前端',
  city: '杭州',
}))
const sorterCols = [
  { prop: 'name', label: '名称', width: 140 },
  { prop: 'age', label: '年龄', sortable: true, sorter: (a, b) => a.age - b.age },
  { prop: 'role', label: '职责' },
]
</script>
