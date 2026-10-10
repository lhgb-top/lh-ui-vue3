# Tree

Flat-to-tree conversion and check propagation live in pure core functions; the component only renders and handles the keyboard.

## Basic usage

<DemoBlock title="Basic">
  <LhTree :data="treeData" :default-expanded-keys="['a']" />
</DemoBlock>

```vue composition
<script setup>
import { ref } from 'vue'
const treeData = [
  { key: 'a', label: 'Frontend', children: [
    { key: 'a-1', label: 'Vue' },
    { key: 'a-2', label: 'React' },
  ] },
  { key: 'b', label: 'Backend', children: [{ key: 'b-1', label: 'Node' }] },
  { key: 'c', label: 'Ops', disabled: true },
]
</script>

<template>
  <!-- Basic usage -->
  <LhTree :data="treeData" :default-expanded-keys="['a']" />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      treeData: [
        { key: 'a', label: 'Frontend', children: [
          { key: 'a-1', label: 'Vue' },
          { key: 'a-2', label: 'React' },
        ] },
        { key: 'b', label: 'Backend', children: [{ key: 'b-1', label: 'Node' }] },
        { key: 'c', label: 'Ops', disabled: true },
      ],
    }
  },
}
</script>

<template>
  <!-- Basic usage -->
  <LhTree :data="treeData" :default-expanded-keys="['a']" />
</template>
```

## Checkable (cascading)

Checking a parent cascades to all descendants; a fully checked subtree marks the parent checked, a partially checked one shows `indeterminate`.

<DemoBlock title="Checkable">
  <LhTree :data="treeData" show-checkbox :default-expanded-keys="['a', 'b']" />
</DemoBlock>

```vue composition
<script setup lang="ts">
const treeData = [
  { key: 'a', label: 'Frontend', children: [
    { key: 'a-1', label: 'Vue' },
    { key: 'a-2', label: 'React' },
  ] },
  { key: 'b', label: 'Backend', children: [{ key: 'b-1', label: 'Node' }] },
  { key: 'c', label: 'Ops', disabled: true },
]
</script>

<template>
  <!-- Checkable -->
  <LhTree :data="treeData" show-checkbox :default-expanded-keys="['a', 'b']" />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      treeData: [
        { key: 'a', label: 'Frontend', children: [
          { key: 'a-1', label: 'Vue' },
          { key: 'a-2', label: 'React' },
        ] },
        { key: 'b', label: 'Backend', children: [{ key: 'b-1', label: 'Node' }] },
        { key: 'c', label: 'Ops', disabled: true },
      ],
    }
  },
}
</script>

<template>
  <!-- Checkable -->
  <LhTree :data="treeData" show-checkbox :default-expanded-keys="['a', 'b']" />
</template>
```

## Lazy loading

With `lazy` on, expanding an unloaded node calls the `load` callback (`resolve` commits the children and expands, `reject` cancels);
the arrow shows a spinning state while loading. **Loadable nodes must declare `isLeaf: false` explicitly**
(a node without children is otherwise inferred as a leaf and shows no expand arrow); loaded branches that can load further
also declare `isLeaf: false`, real leaves declare `isLeaf: true`.

<DemoBlock title="Lazy load">
  <LhTree :data="lazyData" lazy :load="loadNodes" />
</DemoBlock>

```vue composition
<script setup>
import { ref } from 'vue'

const lazyData = ref([
  { key: 'lazy', label: 'Click to load', isLeaf: false },
])

function loadNodes(node, resolve, reject) {
  // simulate an async request
  setTimeout(() => {
    if (node.key === 'lazy') {
      resolve([
        { key: 'lazy-1', label: 'Child one', isLeaf: true },
        { key: 'lazy-2', label: 'Child two', isLeaf: true },
      ])
    } else {
      reject(new Error('nothing to load'))
    }
  }, 600)
}
</script>

<template>
  <!-- Lazy load -->
  <LhTree :data="lazyData" lazy :load="loadNodes" />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      lazyData: [{ key: 'lazy', label: 'Click to load', isLeaf: false }],
    }
  },
  methods: {
    // simulate an async request
    loadNodes(node, resolve, reject) {
      setTimeout(() => {
        if (node.key === 'lazy') {
          resolve([
            { key: 'lazy-1', label: 'Child one', isLeaf: true },
            { key: 'lazy-2', label: 'Child two', isLeaf: true },
          ])
        } else {
          reject(new Error('nothing to load'))
        }
      }, 600)
    },
  },
}
</script>

<template>
  <!-- Lazy load -->
  <LhTree :data="lazyData" lazy :load="loadNodes" />
</template>
```

## Detached checks (checkStrictly)

With `checkStrictly` on, checking affects only the node itself: no cascade to descendants, no ancestor backtracking, no indeterminate state.

<DemoBlock title="checkStrictly">
  <LhTree :data="treeData" show-checkbox check-strictly :default-expanded-keys="['a', 'b']" />
</DemoBlock>

```vue composition
<script setup lang="ts">
const treeData = [
  { key: 'a', label: 'Frontend', children: [
    { key: 'a-1', label: 'Vue' },
    { key: 'a-2', label: 'React' },
  ] },
  { key: 'b', label: 'Backend', children: [{ key: 'b-1', label: 'Node' }] },
  { key: 'c', label: 'Ops', disabled: true },
]
</script>

<template>
  <!-- checkStrictly -->
  <LhTree :data="treeData" show-checkbox check-strictly :default-expanded-keys="['a', 'b']" />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      treeData: [
        { key: 'a', label: 'Frontend', children: [
          { key: 'a-1', label: 'Vue' },
          { key: 'a-2', label: 'React' },
        ] },
        { key: 'b', label: 'Backend', children: [{ key: 'b-1', label: 'Node' }] },
        { key: 'c', label: 'Ops', disabled: true },
      ],
    }
  },
}
</script>

<template>
  <!-- checkStrictly -->
  <LhTree :data="treeData" show-checkbox check-strictly :default-expanded-keys="['a', 'b']" />
</template>
```

## Selection and controlled keys

`multiple` enables multi-select; `expand-on-click-node` toggles nodes on click; `default-selected-keys` / `v-model:selected-keys` control selection; `default-checked-keys` / `v-model:checked-keys` control checking; `default-expanded-keys` / `v-model:expanded-keys` control expansion; `disabled` disables the whole tree.

<DemoBlock title="Controlled selection & checking">
  <LhTree
    v-model:selected-keys="selKeys"
    v-model:checked-keys="chkKeys"
    :data="ctrlData"
    multiple
    expand-on-click-node
    :default-expanded-keys="['x']"
    :default-selected-keys="['x']"
    :default-checked-keys="['x-1']"
  />
  <p class="demo-tree-log">Selected: {{ selKeys }} | Checked: {{ chkKeys }}</p>
</DemoBlock>

<DemoBlock title="Disable the whole tree">
  <LhTree :data="ctrlData" disabled />
</DemoBlock>

```vue composition
<script setup>
import { ref } from 'vue'
const selKeys = ref(['x'])
const chkKeys = ref(['x-1'])
const ctrlData = [
  { key: 'x', label: 'Design', children: [
    { key: 'x-1', label: 'Color' },
    { key: 'x-2', label: 'Type' },
  ] },
  { key: 'y', label: 'Engineering' },
]
</script>

<template>
  <!-- Controlled selection & checking -->
  <LhTree
    v-model:selected-keys="selKeys"
    v-model:checked-keys="chkKeys"
    :data="ctrlData"
    multiple
    expand-on-click-node
    :default-expanded-keys="['x']"
    :default-selected-keys="['x']"
    :default-checked-keys="['x-1']"
  />
  <p class="demo-tree-log">Selected: {{ selKeys }} | Checked: {{ chkKeys }}</p>
  <!-- Disable the whole tree -->
  <LhTree :data="ctrlData" disabled />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      selKeys: ['x'],
      chkKeys: ['x-1'],
      ctrlData: [
        { key: 'x', label: 'Design', children: [
          { key: 'x-1', label: 'Color' },
          { key: 'x-2', label: 'Type' },
        ] },
        { key: 'y', label: 'Engineering' },
      ],
    }
  },
}
</script>

<template>
  <!-- Controlled selection & checking -->
  <LhTree
    v-model:selected-keys="selKeys"
    v-model:checked-keys="chkKeys"
    :data="ctrlData"
    multiple
    expand-on-click-node
    :default-expanded-keys="['x']"
    :default-selected-keys="['x']"
    :default-checked-keys="['x-1']"
  />
  <p class="demo-tree-log">Selected: {{ selKeys }} | Checked: {{ chkKeys }}</p>
  <!-- Disable the whole tree -->
  <LhTree :data="ctrlData" disabled />
</template>
```

## API

### LhTree Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| data | Tree data | `[LhTreeNode](#type-LhTreeNode)`[] | — |
| showCheckbox | Show checkboxes | `boolean` | `false` |
| multiple | Multi-select (toggle instead of replace) | `boolean` | `false` |
| expandOnClickNode | Expand/collapse non-leaf nodes on click | `boolean` | `true` |
| defaultExpandedKeys | Default expanded keys (uncontrolled) | `string[]` | `() => []` |
| expandedKeys | Controlled expanded keys | `string[]` | — |
| defaultSelectedKeys | Default selected keys (uncontrolled) | `string[]` | `() => []` |
| selectedKeys | Controlled selected keys | `string[]` | — |
| defaultCheckedKeys | Default checked keys (uncontrolled) | `string[]` | `() => []` |
| checkedKeys | Controlled checked keys | `string[]` | — |
| checkStrictly | Detached checks (no cascade, no indeterminate) | `boolean` | `false` |
| lazy | Lazy mode (calls load when expanding unloaded nodes) | `boolean` | `false` |
| load | Lazy load callback (resolve commits children and expands, reject cancels) | `(node: LhTreeNode, resolve: (children: LhTreeNode[]) => void, reject: (reason?: unknown) => void) => void` | — |
| disabled | Disable the whole tree | `boolean` | `false` |
| sx | Quick layout props | `SxProps` | — |

### LhTree Events

| Event | Description | Callback |
|-------|-------------|----------|
| update:expandedKeys | Emitted when the expanded keys change (use with v-model:expanded-keys) | `(keys: string[]) => void` |
| update:selectedKeys | Emitted when the selected keys change (use with v-model:selected-keys) | `(keys: string[]) => void` |
| update:checkedKeys | Emitted when the checked keys change (use with v-model:checked-keys) | `(keys: string[]) => void` |
| select | Emitted after a node is clicked (selected / toggled) | `(key: string, node: LhTreeNode) => void` |
| check | Emitted after the checked state changes | `(keys: string[], node: LhTreeNode) => void` |
| expand | Emitted after a node expands / collapses | `(key: string, expanded: boolean) => void` |
| nodeLoad | Emitted after lazy-loaded children arrive | `(node: LhTreeNode, children: LhTreeNode[]) => void` |

Slots: `node` (scope `{ node, level, expanded, selected }`), `empty`.

### LhTreeNode

| Field | Description | Type |
| --- | --- | --- |
| key | Unique key | `string` |
| label | Display text | `string` |
| children | Child nodes | `LhTreeNode[]` |
| disabled | Disabled | `boolean` |
| isLeaf | Force leaf (inferred from children otherwise) | `boolean` |

## Accessibility

- `role="tree"` + `role="treeitem"` with `aria-level` / `aria-expanded` / `aria-selected` / `aria-disabled`
- Checkboxes are `role="checkbox"` with `aria-checked` (`mixed` for indeterminate)
- Keyboard (APG tree pattern): ↑/↓ move (skipping disabled, wrapping), → expand or enter first child, ← collapse or go to parent, Home/End, Enter/Space activate; roving tabindex

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## Type Definitions

The TypeScript type structures exported by this component (auto-extracted from `packages/components/tree/src/types.ts` and `@lh-ui/share/core/*` sources; click each entry to expand; see the Props table above for attribute descriptions):

<details id="type-LhTreeProps">
<summary><code>LhTreeProps</code></summary>

```ts
export interface LhTreeProps {
  data: LhTreeNode[]
  showCheckbox?: boolean
  multiple?: boolean
  expandOnClickNode?: boolean
  defaultExpandedKeys?: string[]
  expandedKeys?: string[]
  defaultSelectedKeys?: string[]
  selectedKeys?: string[]
  defaultCheckedKeys?: string[]
  checkedKeys?: string[]
  checkStrictly?: boolean
  lazy?: boolean
  load?: (
    node: LhTreeNode,
    resolve: (children: LhTreeNode[]) => void,
    reject: (reason?: unknown) => void,
  ) => void
  disabled?: boolean
  sx?: SxProps
}
```

</details>

<details id="type-LhFlatTreeNode">
<summary><code>LhFlatTreeNode</code> <sub>(from @lh-ui/share/core/tree)</sub></summary>

```ts
export interface LhFlatTreeNode {
  node: LhTreeNode
  key: string
  level: number
  parentKey: string | null
  ancestorKeys: string[]
  isLeaf: boolean
}
```

</details>

<details id="type-LhTreeNode">
<summary><code>LhTreeNode</code> <sub>(from @lh-ui/share/core/tree)</sub></summary>

```ts
export interface LhTreeNode {
  key: string
  label: string
  children?: LhTreeNode[]
  disabled?: boolean
  isLeaf?: boolean
}
```

</details>

<details id="type-LhTreeCheckState">
<summary><code>LhTreeCheckState</code> <sub>(from @lh-ui/share/core/tree)</sub></summary>

```ts
export type LhTreeCheckState = 'checked' | 'indeterminate' | 'unchecked'
```

</details>

<!-- lh-types:end -->
<script setup>
import { ref } from 'vue'
const lazyData = ref([{ key: 'lazy', label: 'Click to load', isLeaf: false }])
function loadNodes(node, resolve, reject) {
  setTimeout(() => {
    if (node.key === 'lazy') {
      resolve([
        { key: 'lazy-1', label: 'Child one', isLeaf: true },
        { key: 'lazy-2', label: 'Child two', isLeaf: true },
      ])
    } else {
      reject(new Error('nothing to load'))
    }
  }, 600)
}
const treeData = [
  { key: 'a', label: 'Frontend', children: [
    { key: 'a-1', label: 'Vue' },
    { key: 'a-2', label: 'React' },
  ] },
  { key: 'b', label: 'Backend', children: [{ key: 'b-1', label: 'Node' }] },
  { key: 'c', label: 'Ops', disabled: true },
]
const selKeys = ref(['x'])
const chkKeys = ref(['x-1'])
const ctrlData = [
  { key: 'x', label: 'Design', children: [
    { key: 'x-1', label: 'Color' },
    { key: 'x-2', label: 'Type' },
  ] },
  { key: 'y', label: 'Engineering' },
]
</script>
