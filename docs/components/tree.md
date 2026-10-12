# Tree 树形控件

扁平数据 → 树的转换与勾选传播都在 core 纯函数里完成，组件只负责渲染与键盘。

## 基础用法

<DemoBlock title="基础用法">
  <LhTree :data="treeData" :default-expanded-keys="['a']" />
</DemoBlock>

```vue composition
<script setup>
import { ref } from 'vue'
const treeData = [
  { key: 'a', label: '前端', children: [
    { key: 'a-1', label: 'Vue' },
    { key: 'a-2', label: 'React' },
  ] },
  { key: 'b', label: '后端', children: [{ key: 'b-1', label: 'Node' }] },
  { key: 'c', label: '运维', disabled: true },
]
</script>

<template>
  <!-- 基础用法 -->
  <LhTree :data="treeData" :default-expanded-keys="['a']" />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      treeData: [
        { key: 'a', label: '前端', children: [
          { key: 'a-1', label: 'Vue' },
          { key: 'a-2', label: 'React' },
        ] },
        { key: 'b', label: '后端', children: [{ key: 'b-1', label: 'Node' }] },
        { key: 'c', label: '运维', disabled: true },
      ],
    }
  },
}
</script>

<template>
  <!-- 基础用法 -->
  <LhTree :data="treeData" :default-expanded-keys="['a']" />
</template>
```

## 可勾选（级联）

勾选父级会级联全部后代；子级全选时父级自动选中，部分选中显示半选态（indeterminate）。

<DemoBlock title="勾选级联">
  <LhTree :data="treeData" show-checkbox :default-expanded-keys="['a', 'b']" />
</DemoBlock>

```vue composition
<script setup lang="ts">
const treeData = [
  { key: 'a', label: '前端', children: [
    { key: 'a-1', label: 'Vue' },
    { key: 'a-2', label: 'React' },
  ] },
  { key: 'b', label: '后端', children: [{ key: 'b-1', label: 'Node' }] },
  { key: 'c', label: '运维', disabled: true },
]
</script>

<template>
  <!-- 勾选级联 -->
  <LhTree :data="treeData" show-checkbox :default-expanded-keys="['a', 'b']" />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      treeData: [
        { key: 'a', label: '前端', children: [
          { key: 'a-1', label: 'Vue' },
          { key: 'a-2', label: 'React' },
        ] },
        { key: 'b', label: '后端', children: [{ key: 'b-1', label: 'Node' }] },
        { key: 'c', label: '运维', disabled: true },
      ],
    }
  },
}
</script>

<template>
  <!-- 勾选级联 -->
  <LhTree :data="treeData" show-checkbox :default-expanded-keys="['a', 'b']" />
</template>
```

## 懒加载

开启 `lazy` 后，展开未加载的节点会调用 `load` 回调（`resolve` 提交子节点并展开，`reject` 取消）；加载中箭头显示旋转态。
**可加载节点须显式声明 `isLeaf: false`**（否则无 children 的节点会被推断为叶子、不显示展开箭头）；
加载下来的子节点如仍是待加载分支，同样声明 `isLeaf: false`，真叶子声明 `isLeaf: true`。

<DemoBlock title="懒加载">
  <LhTree :data="lazyData" lazy :load="loadNodes" />
</DemoBlock>

```vue composition
<script setup>
import { ref } from 'vue'

const lazyData = ref([
  { key: 'lazy', label: '点我加载', isLeaf: false },
])

function loadNodes(node, resolve, reject) {
  // 模拟异步请求
  setTimeout(() => {
    if (node.key === 'lazy') {
      resolve([
        { key: 'lazy-1', label: '子节点一', isLeaf: true },
        { key: 'lazy-2', label: '子节点二', isLeaf: true },
      ])
    } else {
      reject(new Error('nothing to load'))
    }
  }, 600)
}
</script>

<template>
  <!-- 懒加载 -->
  <LhTree :data="lazyData" lazy :load="loadNodes" />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      lazyData: [{ key: 'lazy', label: '点我加载', isLeaf: false }],
    }
  },
  methods: {
    // 模拟异步请求
    loadNodes(node, resolve, reject) {
      setTimeout(() => {
        if (node.key === 'lazy') {
          resolve([
            { key: 'lazy-1', label: '子节点一', isLeaf: true },
            { key: 'lazy-2', label: '子节点二', isLeaf: true },
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
  <!-- 懒加载 -->
  <LhTree :data="lazyData" lazy :load="loadNodes" />
</template>
```

## 父子不联动（checkStrictly）

开启 `checkStrictly` 后勾选只作用于节点自身：不级联后代、不回溯祖先、无半选态。

<DemoBlock title="checkStrictly">
  <LhTree :data="treeData" show-checkbox check-strictly :default-expanded-keys="['a', 'b']" />
</DemoBlock>

```vue composition
<script setup lang="ts">
const treeData = [
  { key: 'a', label: '前端', children: [
    { key: 'a-1', label: 'Vue' },
    { key: 'a-2', label: 'React' },
  ] },
  { key: 'b', label: '后端', children: [{ key: 'b-1', label: 'Node' }] },
  { key: 'c', label: '运维', disabled: true },
]
</script>

<template>
  <!-- 父子不联动 -->
  <LhTree :data="treeData" show-checkbox check-strictly :default-expanded-keys="['a', 'b']" />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      treeData: [
        { key: 'a', label: '前端', children: [
          { key: 'a-1', label: 'Vue' },
          { key: 'a-2', label: 'React' },
        ] },
        { key: 'b', label: '后端', children: [{ key: 'b-1', label: 'Node' }] },
        { key: 'c', label: '运维', disabled: true },
      ],
    }
  },
}
</script>

<template>
  <!-- 父子不联动 -->
  <LhTree :data="treeData" show-checkbox check-strictly :default-expanded-keys="['a', 'b']" />
</template>
```

## 选中与受控键值

`multiple` 允许多选；`expand-on-click-node` 点击节点即展开/收起；`default-selected-keys` / `v-model:selected-keys` 受控选中；`default-checked-keys` / `v-model:checked-keys` 受控勾选；`default-expanded-keys` / `v-model:expanded-keys` 受控展开；`disabled` 禁用整棵树。

<DemoBlock title="受控选中与勾选">
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
  <p class="demo-tree-log">选中：{{ selKeys }} ｜ 勾选：{{ chkKeys }}</p>
</DemoBlock>

<DemoBlock title="禁用整棵树">
  <LhTree :data="ctrlData" disabled />
</DemoBlock>

```vue composition
<script setup>
import { ref } from 'vue'
const selKeys = ref(['x'])
const chkKeys = ref(['x-1'])
const ctrlData = [
  { key: 'x', label: '设计', children: [
    { key: 'x-1', label: '色彩' },
    { key: 'x-2', label: '字体' },
  ] },
  { key: 'y', label: '工程' },
]
</script>

<template>
  <!-- 受控选中与勾选 -->
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
  <p class="demo-tree-log">选中：{{ selKeys }} ｜ 勾选：{{ chkKeys }}</p>
  <!-- 禁用整棵树 -->
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
        { key: 'x', label: '设计', children: [
          { key: 'x-1', label: '色彩' },
          { key: 'x-2', label: '字体' },
        ] },
        { key: 'y', label: '工程' },
      ],
    }
  },
}
</script>

<template>
  <!-- 受控选中与勾选 -->
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
  <p class="demo-tree-log">选中：{{ selKeys }} ｜ 勾选：{{ chkKeys }}</p>
  <!-- 禁用整棵树 -->
  <LhTree :data="ctrlData" disabled />
</template>
```

## API

### LhTree Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| data | 树数据 | `[LhTreeNode](#type-LhTreeNode)`[] | — |
| showCheckbox | 显示勾选框 | `boolean` | `false` |
| multiple | 多选（点击节点切换选中而非替换） | `boolean` | `false` |
| expandOnClickNode | 点击非叶子节点时展开/收起 | `boolean` | `true` |
| defaultExpandedKeys | 默认展开的键（非受控） | `string[]` | `() => []` |
| expandedKeys | 受控展开的键 | `string[]` | — |
| defaultSelectedKeys | 默认选中的键（非受控） | `string[]` | `() => []` |
| selectedKeys | 受控选中的键 | `string[]` | — |
| defaultCheckedKeys | 默认勾选的键（非受控） | `string[]` | `() => []` |
| checkedKeys | 受控勾选的键 | `string[]` | — |
| checkStrictly | 父子勾选不联动（勾选只作用于自身，无级联与半选） | `boolean` | `false` |
| lazy | 懒加载模式（展开未加载节点时调用 load） | `boolean` | `false` |
| load | 懒加载回调（resolve 提交子节点并展开，reject 取消） | `(node: LhTreeNode, resolve: (children: LhTreeNode[]) => void, reject: (reason?: unknown) => void) => void` | — |
| disabled | 整体禁用 | `boolean` | `false` |
| sx | sx 快速布局属性 | `LhSxProps` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:expandedKeys | 展开键列表变化时触发，配合 v-model:expanded-keys 使用 | `(keys: string[])` |
| update:selectedKeys | 选中键列表变化时触发，配合 v-model:selected-keys 使用 | `(keys: string[])` |
| update:checkedKeys | 勾选键列表变化时触发，配合 v-model:checked-keys 使用 | `(keys: string[])` |
| select | 节点被点击选中 / 切换选中后触发 | `(key: string, node: LhTreeNode)` |
| check | 勾选变化后触发 | `(keys: string[], node: LhTreeNode)` |
| expand | 节点展开 / 收起后触发 | `(key: string, expanded: boolean)` |
| nodeLoad | 懒加载子节点返回后触发 | `(node: LhTreeNode, children: LhTreeNode[])` |

插槽：`node`（作用域 `{ node, level, expanded, selected }`）、`empty`。

### LhTreeNode

| 字段 | 说明 | 类型 |
|------|------|------|
| key | 唯一键 | `string` |
| label | 显示文本 | `string` |
| children | 子节点 | `LhTreeNode[]` |
| disabled | 禁用 | `boolean` |
| isLeaf | 是否叶子（不传按 children 推断） | `boolean` |

## 无障碍

- `role="tree"` + `role="treeitem"`，`aria-level` / `aria-expanded` / `aria-selected` / `aria-disabled` 全量暴露
- 勾选框 `role="checkbox"` + `aria-checked`（半选为 `mixed`）
- 键盘（APG tree pattern）：↑/↓ 项间移动（跳过禁用、循环）、→ 展开或进首子、← 收起或回父级、Home/End 首末、Enter/Space 激活；roving tabindex

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/tree/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

<details id="type-LhTreeProps">
<summary><code>LhTreeProps</code></summary>

```ts
export interface LhTreeProps {
  /** 树数据 */
  data: LhTreeNode[]
  /** 显示勾选框 */
  showCheckbox?: boolean
  /** 多选（点击节点切换选中而非替换） */
  multiple?: boolean
  /** 点击非叶子节点时展开/收起 */
  expandOnClickNode?: boolean
  /** 默认展开的键（非受控） */
  defaultExpandedKeys?: string[]
  /** 受控展开的键 */
  expandedKeys?: string[]
  /** 默认选中的键（非受控） */
  defaultSelectedKeys?: string[]
  /** 受控选中的键 */
  selectedKeys?: string[]
  /** 默认勾选的键（非受控） */
  defaultCheckedKeys?: string[]
  /** 受控勾选的键 */
  checkedKeys?: string[]
  /** 父子勾选不联动（勾选只作用于节点自身，无级联与半选） */
  checkStrictly?: boolean
  /** 懒加载模式：展开未加载的非叶子节点时调用 load */
  lazy?: boolean
  /** 懒加载回调：resolve 提交子节点并展开，reject（或抛错）取消 */
  load?: (
    node: LhTreeNode,
    resolve: (children: LhTreeNode[]) => void,
    reject: (reason?: unknown) => void,
  ) => void
  /** 整体禁用 */
  disabled?: boolean
  /** sx 快速布局属性 */
  sx?: LhSxProps
}
```

</details>

<details id="type-LhFlatTreeNode">
<summary><code>LhFlatTreeNode</code> <sub>（来自 @lh-ui/share/core/tree）</sub></summary>

```ts
/** 扁平化后的节点（渲染用） */
export interface LhFlatTreeNode {
  node: LhTreeNode
  key: string
  level: number
  parentKey: string | null
  /** 祖先链（不含自身） */
  ancestorKeys: string[]
  /** 是否叶子 */
  isLeaf: boolean
}
```

</details>

<details id="type-LhTreeNode">
<summary><code>LhTreeNode</code> <sub>（来自 @lh-ui/share/core/tree）</sub></summary>

```ts
/** 树节点数据 */
export interface LhTreeNode {
  /** 唯一键 */
  key: string
  /** 显示文本 */
  label: string
  /** 子节点 */
  children?: LhTreeNode[]
  /** 禁用 */
  disabled?: boolean
  /** 是否叶子（不传按 children 推断） */
  isLeaf?: boolean
}
```

</details>

<details id="type-LhTreeCheckState">
<summary><code>LhTreeCheckState</code> <sub>（来自 @lh-ui/share/core/tree）</sub></summary>

```ts
/** 勾选状态 */
export type LhTreeCheckState = 'checked' | 'indeterminate' | 'unchecked'
```

</details>

<!-- lh-types:end -->
<script setup>
import { ref } from 'vue'
const lazyData = ref([{ key: 'lazy', label: '点我加载', isLeaf: false }])
function loadNodes(node, resolve, reject) {
  setTimeout(() => {
    if (node.key === 'lazy') {
      resolve([
        { key: 'lazy-1', label: '子节点一', isLeaf: true },
        { key: 'lazy-2', label: '子节点二', isLeaf: true },
      ])
    } else {
      reject(new Error('nothing to load'))
    }
  }, 600)
}
const treeData = [
  { key: 'a', label: '前端', children: [
    { key: 'a-1', label: 'Vue' },
    { key: 'a-2', label: 'React' },
  ] },
  { key: 'b', label: '后端', children: [{ key: 'b-1', label: 'Node' }] },
  { key: 'c', label: '运维', disabled: true },
]
const selKeys = ref(['x'])
const chkKeys = ref(['x-1'])
const ctrlData = [
  { key: 'x', label: '设计', children: [
    { key: 'x-1', label: '色彩' },
    { key: 'x-2', label: '字体' },
  ] },
  { key: 'y', label: '工程' },
]
</script>
