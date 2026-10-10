---
pageClass: custom-container
---

# Cascader 级联选择器

级联选择器用于多层级数据的场景，例如：省市地区选择。

## 基础用法

<DemoBlock title="独立使用">
    <lh-cascader v-model="value1" :options="options1" />
</DemoBlock>

```vue composition
<script setup>
import { ref } from 'vue'

const value1 = ref([])
const options1 = [
  {
    value: 'zhinan',
    label: '指南',
    children: [
      {
        value: 'sheji',
        label: '设计指南',
        children: [
          { value: 'yuansze', label: '颜色' },
          { value: 'fuziyuanze', label: '字体' },
        ],
      },
      {
        value: 'shejiguize',
        label: '设计规则',
      },
    ],
  },
  {
    value: 'zujian',
    label: '组件',
    children: [
      { value: 'jiben', label: '基础' },
      { value: 'fankui', label: '反馈' },
    ],
  },
]
</script>

<template>
  <!-- 基础用法 -->
  <lh-cascader v-model="value1" :options="options1" />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      value1: [],
      options1: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'sheji',
              label: '设计指南',
              children: [
                { value: 'yuansze', label: '颜色' },
                { value: 'fuziyuanze', label: '字体' },
              ],
            },
            {
              value: 'shejiguize',
              label: '设计规则',
            },
          ],
        },
        {
          value: 'zujian',
          label: '组件',
          children: [
            { value: 'jiben', label: '基础' },
            { value: 'fankui', label: '反馈' },
          ],
        },
      ],
    }
  },
}
</script>

<template>
  <!-- 基础用法 -->
  <lh-cascader v-model="value1" :options="options1" />
</template>
```


## 多选模式

设置为多选模式，可以选择多个结果。

<DemoBlock title="多选模式">
    <lh-cascader v-model="value2" :options="options2" multiple />
</DemoBlock>

```vue composition
<script setup>
import { ref } from 'vue'

const value2 = ref([])
const options2 = [
  {
    value: 'zhinan',
    label: '指南',
    children: [
      { value: 'sheji', label: '设计指南' },
      { value: 'shejiguize', label: '设计规则' },
    ],
  },
  {
    value: 'zujian',
    label: '组件',
    children: [
      { value: 'jiben', label: '基础组件' },
      { value: 'fankui', label: '反馈组件' },
    ],
  },
]
</script>

<template>
  <!-- 多选模式 -->
  <lh-cascader v-model="value2" :options="options2" multiple />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      value2: [],
      options2: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            { value: 'sheji', label: '设计指南' },
            { value: 'shejiguize', label: '设计规则' },
          ],
        },
        {
          value: 'zujian',
          label: '组件',
          children: [
            { value: 'jiben', label: '基础组件' },
            { value: 'fankui', label: '反馈组件' },
          ],
        },
      ],
    }
  },
}
</script>

<template>
  <!-- 多选模式 -->
  <lh-cascader v-model="value2" :options="options2" multiple />
</template>
```


## 选项禁用

通过 `disabled` 属性禁用节点。

<DemoBlock title="选项禁用">
  <lh-cascader v-model="value3" :options="options3" />
</DemoBlock>

```vue composition
<script setup>
import { ref } from 'vue'

const value3 = ref([])
const options3 = [
  {
    value: 'zhinan',
    label: '指南',
    disabled: true,
    children: [
      { value: 'sheji', label: '设计指南' },
    ],
  },
  {
    value: 'zujian',
    label: '组件',
    children: [
      { value: 'jiben', label: '基础组件' },
      { value: 'fankui', label: '反馈组件', disabled: true },
    ],
  },
]
</script>

<template>
  <!-- 选项禁用 -->
  <lh-cascader v-model="value3" :options="options3" />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      value3: [],
      options3: [
        {
          value: 'zhinan',
          label: '指南',
          disabled: true,
          children: [
            { value: 'sheji', label: '设计指南' },
          ],
        },
        {
          value: 'zujian',
          label: '组件',
          children: [
            { value: 'jiben', label: '基础组件' },
            { value: 'fankui', label: '反馈组件', disabled: true },
          ],
        },
      ],
    }
  },
}
</script>

<template>
  <!-- 选项禁用 -->
  <lh-cascader v-model="value3" :options="options3" />
</template>
```

## 尺寸、禁用与只读

通过 `size` 调整尺寸，`disabled` 禁用整个选择器，`readonly` 只读展示，`placeholder` 自定义占位符，`clearable` 关闭清除按钮。

<DemoBlock title="尺寸、禁用与只读">
  <div class="demo-row">
    <lh-cascader v-model="demoCascSize" :options="options1" size="small" placeholder="small" />
    <lh-cascader v-model="demoCascSize2" :options="options1" size="large" placeholder="large" />
  </div>
  <div class="demo-row">
    <lh-cascader v-model="demoCascDisabled" :options="options1" disabled placeholder="禁用状态" />
    <lh-cascader v-model="demoCascReadonly" :options="options1" readonly placeholder="只读状态" />
    <lh-cascader v-model="demoCascPlaceholder" :options="options1" placeholder="自定义占位符" />
  </div>
  <div class="demo-row">
    <lh-cascader v-model="demoCascNoClear" :options="options1" :clearable="false" placeholder="不可清除" />
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const demoCascSize = ref([])
const demoCascSize2 = ref([])
const demoCascDisabled = ref([])
const demoCascReadonly = ref([])
const demoCascPlaceholder = ref([])
const demoCascNoClear = ref([])
const options = [
  {
    value: 'zhinan',
    label: '指南',
    children: [
      { value: 'sheji', label: '设计指南' },
      { value: 'shejiguize', label: '设计规则' },
    ],
  },
  {
    value: 'zujian',
    label: '组件',
    children: [
      { value: 'jiben', label: '基础组件' },
      { value: 'fankui', label: '反馈组件' },
    ],
  },
]
</script>

<template>
  <!-- small -->
  <lh-cascader v-model="demoCascSize" :options="options" size="small" placeholder="small" />
  <!-- large -->
  <lh-cascader v-model="demoCascSize2" :options="options" size="large" placeholder="large" />
  <!-- 禁用状态 -->
  <lh-cascader v-model="demoCascDisabled" :options="options" disabled placeholder="禁用状态" />
  <!-- 只读状态 -->
  <lh-cascader v-model="demoCascReadonly" :options="options" readonly placeholder="只读状态" />
  <!-- 自定义占位符 -->
  <lh-cascader v-model="demoCascPlaceholder" :options="options" placeholder="自定义占位符" />
  <!-- 不可清除 -->
  <lh-cascader v-model="demoCascNoClear" :options="options" :clearable="false" placeholder="不可清除" />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      demoCascSize: [],
      demoCascSize2: [],
      demoCascDisabled: [],
      demoCascReadonly: [],
      demoCascPlaceholder: [],
      demoCascNoClear: [],
      options: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            { value: 'sheji', label: '设计指南' },
            { value: 'shejiguize', label: '设计规则' },
          ],
        },
        {
          value: 'zujian',
          label: '组件',
          children: [
            { value: 'jiben', label: '基础组件' },
            { value: 'fankui', label: '反馈组件' },
          ],
        },
      ],
    }
  },
}
</script>

<template>
  <!-- small -->
  <lh-cascader v-model="demoCascSize" :options="options" size="small" placeholder="small" />
  <!-- large -->
  <lh-cascader v-model="demoCascSize2" :options="options" size="large" placeholder="large" />
  <!-- 禁用状态 -->
  <lh-cascader v-model="demoCascDisabled" :options="options" disabled placeholder="禁用状态" />
  <!-- 只读状态 -->
  <lh-cascader v-model="demoCascReadonly" :options="options" readonly placeholder="只读状态" />
  <!-- 自定义占位符 -->
  <lh-cascader v-model="demoCascPlaceholder" :options="options" placeholder="自定义占位符" />
  <!-- 不可清除 -->
  <lh-cascader v-model="demoCascNoClear" :options="options" :clearable="false" placeholder="不可清除" />
</template>
```

## 路径显示与搜索

- `show-all-levels` 控制输入框是否显示完整路径（默认 `true`，关闭后只显示末级名称）；
- `separator` 自定义路径分隔符，搜索结果面板同样生效；
- `emit-path` 设为 `false` 时 `v-model` 只绑定末级节点的值，输入框仍回显完整路径；
- `check-strictly` 允许选中任意层级节点（点击任意层级直接选中，浏览子级依赖 hover 展开）；
- `filterable` 开启搜索，输入关键字后按完整路径展示匹配项；
- `collapse-tags` 在多选模式下折叠标签；
- `cascading` 关闭父子节点联动勾选；
- `item-config` 自定义节点字段别名（如以 `id` / `name` 建树），路径回显同样生效。

以下示例均预置了选中值，无需逐级点选即可对比展示差异：完整路径显示 `浙江省/杭州市/西湖区`，关闭 `show-all-levels` 后只显示 `西湖区`，`separator=" > "` 时显示 `浙江省 > 杭州市 > 西湖区`。

<DemoBlock title="路径显示与搜索">
  <div class="demo-row">
    <lh-cascader v-model="demoCascFullPath" :options="pathOptions" placeholder="完整路径（默认）" />
    <lh-cascader v-model="demoCascAllLevels" :options="pathOptions" :show-all-levels="false" placeholder="只显示末级" />
    <lh-cascader v-model="demoCascSep" :options="pathOptions" separator=" > " placeholder="分隔符 >" />
  </div>
  <div class="demo-row">
    <lh-cascader v-model="demoCascEmit" :options="pathOptions" :emit-path="false" placeholder="仅返回末级值" />
    <lh-cascader v-model="demoCascStrict" :options="pathOptions" check-strictly placeholder="任意层级可选" />
  </div>
  <div class="demo-row">
    <lh-cascader v-model="demoCascFilter" :options="pathOptions" filterable placeholder="可搜索" />
    <lh-cascader v-model="demoCascCollapse" :options="pathOptions" multiple collapse-tags placeholder="多选折叠标签" />
  </div>
  <div class="demo-row">
    <lh-cascader v-model="demoCascLoose" :options="pathOptions" multiple :cascading="false" placeholder="父子不联动" />
    <lh-cascader v-model="demoCascItem" :options="aliasedOptions" :item-config="{ value: 'id', label: 'name', children: 'sub' }" placeholder="字段别名" />
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const demoCascFullPath = ref(['zhejiang', 'hangzhou', 'xihu'])
const demoCascAllLevels = ref(['zhejiang', 'hangzhou', 'xihu'])
const demoCascSep = ref(['zhejiang', 'hangzhou', 'xihu'])
const demoCascEmit = ref(['xihu'])
const demoCascStrict = ref(['zhejiang', 'hangzhou'])
const demoCascFilter = ref([])
const demoCascCollapse = ref(['xihu', 'haishu'])
const demoCascLoose = ref(['xihu', 'binjiang'])
const demoCascItem = ref(['zhejiang', 'hangzhou', 'xihu'])

const pathOptions = [
  {
    value: 'zhejiang',
    label: '浙江省',
    children: [
      {
        value: 'hangzhou',
        label: '杭州市',
        children: [
          { value: 'xihu', label: '西湖区' },
          { value: 'binjiang', label: '滨江区' },
        ],
      },
      {
        value: 'ningbo',
        label: '宁波市',
        children: [{ value: 'haishu', label: '海曙区' }],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏省',
    children: [
      {
        value: 'nanjing',
        label: '南京市',
        children: [{ value: 'xuanwu', label: '玄武区' }],
      },
    ],
  },
]

const aliasedOptions = [
  {
    id: 'zhejiang',
    name: '浙江省',
    sub: [
      {
        id: 'hangzhou',
        name: '杭州市',
        sub: [
          { id: 'xihu', name: '西湖区' },
          { id: 'binjiang', name: '滨江区' },
        ],
      },
      {
        id: 'ningbo',
        name: '宁波市',
        sub: [{ id: 'haishu', name: '海曙区' }],
      },
    ],
  },
]
</script>

<template>
  <!-- 完整路径（默认） -->
  <lh-cascader v-model="demoCascFullPath" :options="pathOptions" placeholder="完整路径（默认）" />
  <!-- 只显示末级 -->
  <lh-cascader v-model="demoCascAllLevels" :options="pathOptions" :show-all-levels="false" placeholder="只显示末级" />
  <!-- 分隔符 > -->
  <lh-cascader v-model="demoCascSep" :options="pathOptions" separator=" > " placeholder="分隔符 >" />
  <!-- 仅返回末级值 -->
  <lh-cascader v-model="demoCascEmit" :options="pathOptions" :emit-path="false" placeholder="仅返回末级值" />
  <!-- 任意层级可选 -->
  <lh-cascader v-model="demoCascStrict" :options="pathOptions" check-strictly placeholder="任意层级可选" />
  <!-- 可搜索 -->
  <lh-cascader v-model="demoCascFilter" :options="pathOptions" filterable placeholder="可搜索" />
  <!-- 多选折叠标签 -->
  <lh-cascader v-model="demoCascCollapse" :options="pathOptions" multiple collapse-tags placeholder="多选折叠标签" />
  <!-- 父子不联动 -->
  <lh-cascader v-model="demoCascLoose" :options="pathOptions" multiple :cascading="false" placeholder="父子不联动" />
  <!-- 字段别名 -->
  <lh-cascader v-model="demoCascItem" :options="aliasedOptions" :item-config="{ value: 'id', label: 'name', children: 'sub' }" placeholder="字段别名" />
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      demoCascFullPath: ['zhejiang', 'hangzhou', 'xihu'],
      demoCascAllLevels: ['zhejiang', 'hangzhou', 'xihu'],
      demoCascSep: ['zhejiang', 'hangzhou', 'xihu'],
      demoCascEmit: ['xihu'],
      demoCascStrict: ['zhejiang', 'hangzhou'],
      demoCascFilter: [],
      demoCascCollapse: ['xihu', 'haishu'],
      demoCascLoose: ['xihu', 'binjiang'],
      demoCascItem: ['zhejiang', 'hangzhou', 'xihu'],
      pathOptions: [
        {
          value: 'zhejiang',
          label: '浙江省',
          children: [
            {
              value: 'hangzhou',
              label: '杭州市',
              children: [
                { value: 'xihu', label: '西湖区' },
                { value: 'binjiang', label: '滨江区' },
              ],
            },
            {
              value: 'ningbo',
              label: '宁波市',
              children: [{ value: 'haishu', label: '海曙区' }],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: '江苏省',
          children: [
            {
              value: 'nanjing',
              label: '南京市',
              children: [{ value: 'xuanwu', label: '玄武区' }],
            },
          ],
        },
      ],
      aliasedOptions: [
        {
          id: 'zhejiang',
          name: '浙江省',
          sub: [
            {
              id: 'hangzhou',
              name: '杭州市',
              sub: [
                { id: 'xihu', name: '西湖区' },
                { id: 'binjiang', name: '滨江区' },
              ],
            },
            {
              id: 'ningbo',
              name: '宁波市',
              sub: [{ id: 'haishu', name: '海曙区' }],
            },
          ],
        },
      ],
    }
  },
}
</script>

<template>
  <!-- 完整路径（默认） -->
  <lh-cascader v-model="demoCascFullPath" :options="pathOptions" placeholder="完整路径（默认）" />
  <!-- 只显示末级 -->
  <lh-cascader v-model="demoCascAllLevels" :options="pathOptions" :show-all-levels="false" placeholder="只显示末级" />
  <!-- 分隔符 > -->
  <lh-cascader v-model="demoCascSep" :options="pathOptions" separator=" > " placeholder="分隔符 >" />
  <!-- 仅返回末级值 -->
  <lh-cascader v-model="demoCascEmit" :options="pathOptions" :emit-path="false" placeholder="仅返回末级值" />
  <!-- 任意层级可选 -->
  <lh-cascader v-model="demoCascStrict" :options="pathOptions" check-strictly placeholder="任意层级可选" />
  <!-- 可搜索 -->
  <lh-cascader v-model="demoCascFilter" :options="pathOptions" filterable placeholder="可搜索" />
  <!-- 多选折叠标签 -->
  <lh-cascader v-model="demoCascCollapse" :options="pathOptions" multiple collapse-tags placeholder="多选折叠标签" />
  <!-- 父子不联动 -->
  <lh-cascader v-model="demoCascLoose" :options="pathOptions" multiple :cascading="false" placeholder="父子不联动" />
  <!-- 字段别名 -->
  <lh-cascader v-model="demoCascItem" :options="aliasedOptions" :item-config="{ value: 'id', label: 'name', children: 'sub' }" placeholder="字段别名" />
</template>
```

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 绑定值 | `(string \| number)[]` | `() => []` |
| options | 选项列表 | `[LhCascaderNode](#type-LhCascaderNode)`[] | `() => []` |
| size | 尺寸 | `"small" \| "medium" \| "large" \| "mini" \| "x-large"` | `'medium'` |
| disabled | 是否禁用 | `boolean` | `false` |
| clearable | 是否可清除 | `boolean` | `true` |
| placeholder | 占位符（未传时取语言包 `cascader.placeholder`，中文「请选择」） | `string` | `''` |
| readonly | 是否只读 | `boolean` | `false` |
| showAllLevels | 是否在输入框显示完整路径 | `boolean` | `true` |
| checkStrictly | 任意层级节点可选 | `boolean` | `false` |
| emitPath | 返回值是否包含完整路径 | `boolean` | `true` |
| multiple | 是否多选 | `boolean` | `false` |
| cascading | 是否级联关联 | `boolean` | `true` |
| separator | 分隔符 | `string` | `'/'` |
| collapseTags | 多选模式下是否折叠标签 | `boolean` | `false` |
| filterable | 是否可搜索 | `boolean` | `false` |
| itemConfig | 节点字段别名 | `[LhCascaderItemConfig](#type-LhCascaderItemConfig)` | `() => ({})` |
| sx | 快速布局属性（如 `{ mt: 2, w: '50%' }`），转内联样式作用于触发器根元素（浮层面板不受影响） | `SxProps` | — |

## Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 选中值变化时触发 | `(value: (string \| number)[], path: LhCascaderNode[] \| null)` |
| update:model-value | 绑定值变化时触发 | `value: (string \| number)[]` |

## 数据结构

`LhCascaderNode` 类型定义：

```ts
interface LhCascaderNode {
  value: string | number
  label: string
  disabled?: boolean
  leaf?: boolean
  children?: LhCascaderNode[]
}
```


<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/cascader/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

<details id="type-LhCascaderProps">
<summary><code>LhCascaderProps</code></summary>

```ts
export interface LhCascaderProps {
  modelValue?: (string | number)[]
  options?: LhCascaderNode[]
  size?: LhComponentSize
  disabled?: boolean
  clearable?: boolean
  placeholder?: string
  readonly?: boolean
  showAllLevels?: boolean
  checkStrictly?: boolean
  emitPath?: boolean
  multiple?: boolean
  cascading?: boolean
  separator?: string
  collapseTags?: boolean
  filterable?: boolean
  itemConfig?: LhCascaderItemConfig
  /** sx 快速布局属性 */
  sx?: SxProps
}
```

</details>

<details id="type-LhCascaderItemConfig">
<summary><code>LhCascaderItemConfig</code> <sub>（来自 @lh-ui/share/core/cascader）</sub></summary>

```ts
/**
 * Cascader props 中的 item 属性映射
 */
export interface LhCascaderItemConfig {
  value?: string
  label?: string
  children?: string
  disabled?: string
  leaf?: string
}
```

</details>

<details id="type-LhCascaderNode">
<summary><code>LhCascaderNode</code> <sub>（来自 @lh-ui/share/core/cascader）</sub></summary>

```ts
/**
 * Cascader 节点
 */
export interface LhCascaderNode {
  value: string | number
  label: string
  disabled?: boolean
  leaf?: boolean
  children?: LhCascaderNode[]
}
```

</details>

<details id="type-LhComponentSize">
<summary><code>LhComponentSize</code> <sub>（来自 @lh-ui/share/core/shared）</sub></summary>

```ts
export type LhComponentSize = (typeof LH_SIZE_CONST)[keyof typeof LH_SIZE_CONST]
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
import { ref } from 'vue'
const value1 = ref([])
const options1 = [
  {
    value: 'zhinan',
    label: '指南',
    children: [
      {
        value: 'sheji',
        label: '设计指南',
        children: [
          { value: 'yuansze', label: '颜色' },
          { value: 'fuziyuanze', label: '字体' },
        ],
      },
      {
        value: 'shejiguize',
        label: '设计规则',
      },
    ],
  },
  {
    value: 'zujian',
    label: '组件',
    children: [
      { value: 'jiben', label: '基础' },
      { value: 'fankui', label: '反馈' },
    ],
  },
]

const value2 = ref([])
const options2 = [
  {
    value: 'zhinan',
    label: '指南',
    children: [
      { value: 'sheji', label: '设计指南' },
      { value: 'shejiguize', label: '设计规则' },
    ],
  },
  {
    value: 'zujian',
    label: '组件',
    children: [
      { value: 'jiben', label: '基础组件' },
      { value: 'fankui', label: '反馈组件' },
    ],
  },
]

const value3 = ref([])
const options3 = [
  {
    value: 'zhinan',
    label: '指南',
    disabled: true,
    children: [
      { value: 'sheji', label: '设计指南' },
    ],
  },
  {
    value: 'zujian',
    label: '组件',
    children: [
      { value: 'jiben', label: '基础组件' },
      { value: 'fankui', label: '反馈组件', disabled: true },
    ],
  },
]

const demoCascSize = ref([])
const demoCascSize2 = ref([])
const demoCascDisabled = ref([])
const demoCascReadonly = ref([])
const demoCascPlaceholder = ref([])
const demoCascNoClear = ref([])
const demoCascFullPath = ref(['zhejiang', 'hangzhou', 'xihu'])
const demoCascAllLevels = ref(['zhejiang', 'hangzhou', 'xihu'])
const demoCascSep = ref(['zhejiang', 'hangzhou', 'xihu'])
const demoCascEmit = ref(['xihu'])
const demoCascStrict = ref(['zhejiang', 'hangzhou'])
const demoCascFilter = ref([])
const demoCascCollapse = ref(['xihu', 'haishu'])
const demoCascLoose = ref(['xihu', 'binjiang'])
const demoCascItem = ref(['zhejiang', 'hangzhou', 'xihu'])

// 「路径显示与搜索」一节专用：三级省市区数据
const pathOptions = [
  {
    value: 'zhejiang',
    label: '浙江省',
    children: [
      {
        value: 'hangzhou',
        label: '杭州市',
        children: [
          { value: 'xihu', label: '西湖区' },
          { value: 'binjiang', label: '滨江区' },
        ],
      },
      {
        value: 'ningbo',
        label: '宁波市',
        children: [{ value: 'haishu', label: '海曙区' }],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏省',
    children: [
      {
        value: 'nanjing',
        label: '南京市',
        children: [{ value: 'xuanwu', label: '玄武区' }],
      },
    ],
  },
]

const aliasedOptions = [
  {
    id: 'zhejiang',
    name: '浙江省',
    sub: [
      {
        id: 'hangzhou',
        name: '杭州市',
        sub: [
          { id: 'xihu', name: '西湖区' },
          { id: 'binjiang', name: '滨江区' },
        ],
      },
      {
        id: 'ningbo',
        name: '宁波市',
        sub: [{ id: 'haishu', name: '海曙区' }],
      },
    ],
  },
]
</script>

## Slots

| 插槽     | 说明                                     | 默认内容                                            |
| -------- | ---------------------------------------- | --------------------------------------------------- |
| no-match | 过滤无匹配结果时搜索面板的自定义内容     | 语言包 `cascader.noMatch`（中文「无匹配数据」）     |

<style scoped>
.demo-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 8px;
}
</style>
