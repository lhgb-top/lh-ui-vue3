# Tabs 标签页

同层内容切换。严格对齐 WAI-ARIA APG tabs pattern：`tablist/tab/tabpanel` 三角色关联 + roving tabindex + 方向键导航。

## 基础用法

<DemoBlock title="基础用法">
  <LhTabs>
    <LhTabPane name="prose" label="散文">水墨散文内容。</LhTabPane>
    <LhTabPane name="poem" label="诗词">诗词格律内容。</LhTabPane>
    <LhTabPane name="calligraphy" label="书法">书法碑帖内容。</LhTabPane>
  </LhTabs>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhTabs>
    <LhTabPane name="prose" label="散文">水墨散文内容。</LhTabPane>
    <LhTabPane name="poem" label="诗词">诗词格律内容。</LhTabPane>
    <LhTabPane name="calligraphy" label="书法">书法碑帖内容。</LhTabPane>
  </LhTabs>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhTabs>
    <LhTabPane name="prose" label="散文">水墨散文内容。</LhTabPane>
    <LhTabPane name="poem" label="诗词">诗词格律内容。</LhTabPane>
    <LhTabPane name="calligraphy" label="书法">书法碑帖内容。</LhTabPane>
  </LhTabs>
</template>
```

## 卡片外观与禁用

<DemoBlock title="卡片外观与禁用">
  <LhTabs type="card">
    <LhTabPane name="ink" label="墨">墨分五色。</LhTabPane>
    <LhTabPane name="cinnabar" label="朱" disabled>丹砂不可用。</LhTabPane>
    <LhTabPane name="gold" label="金">藤黄点染。</LhTabPane>
  </LhTabs>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhTabs type="card">
    <LhTabPane name="ink" label="墨">墨分五色。</LhTabPane>
    <LhTabPane name="cinnabar" label="朱" disabled>丹砂不可用。</LhTabPane>
    <LhTabPane name="gold" label="金">藤黄点染。</LhTabPane>
  </LhTabs>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhTabs type="card">
    <LhTabPane name="ink" label="墨">墨分五色。</LhTabPane>
    <LhTabPane name="cinnabar" label="朱" disabled>丹砂不可用。</LhTabPane>
    <LhTabPane name="gold" label="金">藤黄点染。</LhTabPane>
  </LhTabs>
</template>
```

## 底部位置

<DemoBlock title="底部位置">
  <LhTabs tab-position="bottom">
    <LhTabPane name="mountain" label="山">山势浑厚。</LhTabPane>
    <LhTabPane name="water" label="水">水意空灵。</LhTabPane>
  </LhTabs>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhTabs tab-position="bottom">
    <LhTabPane name="mountain" label="山">山势浑厚。</LhTabPane>
    <LhTabPane name="water" label="水">水意空灵。</LhTabPane>
  </LhTabs>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhTabs tab-position="bottom">
    <LhTabPane name="mountain" label="山">山势浑厚。</LhTabPane>
    <LhTabPane name="water" label="水">水意空灵。</LhTabPane>
  </LhTabs>
</template>
```

## 可关闭与可新增

<DemoBlock title="可关闭与可新增">
  <LhTabs closable addable tab-position="bottom" @tab-remove="removePane" @tab-add="addPane">
    <LhTabPane
      v-for="pane in panes"
      :key="pane.name"
      :name="pane.name"
      :label="pane.label"
      :disabled="pane.disabled"
    >{{ pane.content }}</LhTabPane>
  </LhTabs>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
const panes = ref([
  { name: 's1', label: '画卷一', content: '第一卷内容。', disabled: false },
  { name: 's2', label: '画卷二', content: '第二卷内容。', disabled: false },
])
let index = 2

const removePane = (name) => {
  const target = panes.value.find((pane) => pane.name === name)
  if (target) panes.value.splice(panes.value.indexOf(target), 1)
}
const addPane = () => {
  index += 1
  panes.value.push({ name: `s${index}`, label: `画卷${index}`, content: '新卷内容。', disabled: false })
}
</script>

<template>
  <!-- 可关闭与可新增 -->
  <LhTabs closable addable tab-position="bottom" @tab-remove="removePane" @tab-add="addPane">
    <LhTabPane
      v-for="pane in panes"
      :key="pane.name"
      :name="pane.name"
      :label="pane.label"
      :disabled="pane.disabled"
    >{{ pane.content }}</LhTabPane>
  </LhTabs>
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      panes: [
        { name: 's1', label: '画卷一', content: '第一卷内容。', disabled: false },
        { name: 's2', label: '画卷二', content: '第二卷内容。', disabled: false },
      ],
      index: 2,
    }
  },
  methods: {
    removePane(name) {
      const target = this.panes.find((pane) => pane.name === name)
      if (target) this.panes.splice(this.panes.indexOf(target), 1)
    },
    addPane() {
      this.index += 1
      this.panes.push({ name: `s${this.index}`, label: `画卷${this.index}`, content: '新卷内容。', disabled: false })
    },
  },
}
</script>

<template>
  <!-- 可关闭与可新增 -->
  <LhTabs closable addable tab-position="bottom" @tab-remove="removePane" @tab-add="addPane">
    <LhTabPane
      v-for="pane in panes"
      :key="pane.name"
      :name="pane.name"
      :label="pane.label"
      :disabled="pane.disabled"
    >{{ pane.content }}</LhTabPane>
  </LhTabs>
</template>
```

> 关闭激活页签时组件会联动切换到相邻可用页签，并发出 `tab-remove`；由使用方负责从数据源移除对应 pane。

## 受控用法

<DemoBlock title="受控用法">
  <LhTabs v-model="active" type="card">
    <LhTabPane name="zh" label="国风">国风内容。</LhTabPane>
    <LhTabPane name="mo" label="水墨">水墨内容。</LhTabPane>
  </LhTabs>
  <p class="demo-tabs-current">当前页签：{{ active }}</p>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
const active = ref('mo')
</script>

<template>
  <LhTabs v-model="active" type="card">
    <LhTabPane name="zh" label="国风">国风内容。</LhTabPane>
    <LhTabPane name="mo" label="水墨">水墨内容。</LhTabPane>
  </LhTabs>
</template>
```

```vue options
<script>
export default {
  data() {
    return { active: 'mo' }
  },
}
</script>

<template>
  <LhTabs v-model="active" type="card">
    <LhTabPane name="zh" label="国风">国风内容。</LhTabPane>
    <LhTabPane name="mo" label="水墨">水墨内容。</LhTabPane>
  </LhTabs>
</template>
```

## Tabs API

### LhTabs Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue | 当前激活页签的 name（v-model） | `string` | — |
| type | 外观 | `"line" \| "card"` | `'line'` |
| closable | 页签是否可关闭 | `boolean` | `false` |
| addable | 是否显示新增按钮 | `boolean` | `false` |
| tabPosition | 页签位置 | `"top" \| "bottom"` | `'top'` |
| sx | sx 快速布局属性 | `SxProps` | — |

### LhTabs Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 激活页签变化（v-model） | `(name: string)` |
| tab-change | 激活页签变化 | `(name: string)` |
| tab-remove | 页签关闭 | `(name: string)` |
| tab-add | 点击新增按钮 | — |

### LhTabPane Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| name | 页签唯一标识（稳定键，不建议动态修改） | `string` | — |
| label | 页签标题 | `string` | `''` |
| disabled | 是否禁用 | `boolean` | `false` |

### Slots

| 插槽名 | 说明 | 作用组件 |
|--------|------|----------|
| default | 页签面板（LhTabPane 列表） | LhTabs |
| default | 面板内容 | LhTabPane |

### 无障碍

严格对齐 WAI-ARIA APG tabs pattern：

- 页签头为 `role="tablist"`，每个页签为 `role="tab"`（`aria-selected` + `aria-controls`），面板为 `role="tabpanel"`（`aria-labelledby` + `tabindex="0"`）
- **roving tabindex**：仅激活页签可 Tab 聚焦，其余为 `tabindex="-1"`
- 方向键在可用页签间移动并自动激活（跳过禁用项），Home/End 跳到首尾
- `closable` 时按 Delete 键关闭当前页签；关闭图标为 `aria-hidden` 装饰，键盘走 Delete，避免按钮嵌套按钮
- 禁用页签不可聚焦激活，`tab-remove` 等操作对禁用项无效

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/tabs/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

<details id="type-LhTabsProps">
<summary><code>LhTabsProps</code></summary>

```ts
export interface LhTabsProps {
  /** 当前激活页签的 name（v-model） */
  modelValue?: string
  /** 外观 */
  type?: LhTabsType
  /** 页签是否可关闭 */
  closable?: boolean
  /** 是否显示新增按钮 */
  addable?: boolean
  /** 页签位置 */
  tabPosition?: LhTabsPosition
  /** sx 快速布局属性 */
  sx?: SxProps
}
```

</details>

<details id="type-LhTabPaneProps">
<summary><code>LhTabPaneProps</code></summary>

```ts
export interface LhTabPaneProps {
  /** 页签唯一标识（作为稳定键，不建议动态修改） */
  name: string
  /** 页签标题 */
  label?: string
  /** 是否禁用 */
  disabled?: boolean
}
```

</details>

<details id="type-LhTabsType">
<summary><code>LhTabsType</code> <sub>（来自 @lh-ui/share/core/tabs）</sub></summary>

```ts
/**
 * 标签页外观
 */
export type LhTabsType = 'line' | 'card'
```

</details>

<details id="type-LhTabsPosition">
<summary><code>LhTabsPosition</code> <sub>（来自 @lh-ui/share/core/tabs）</sub></summary>

```ts
/**
 * 标签页位置
 */
export type LhTabsPosition = 'top' | 'bottom'
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
import { ref } from 'vue'

const panes = ref([
  { name: 's1', label: '画卷一', content: '第一卷内容。' },
  { name: 's2', label: '画卷二', content: '第二卷内容。' },
])
let index = 2

const removePane = (name: string) => {
  const target = panes.value.find((pane) => pane.name === name)
  if (target) panes.value.splice(panes.value.indexOf(target), 1)
}
const addPane = () => {
  index += 1
  panes.value.push({ name: `s${index}`, label: `画卷${index}`, content: '新卷内容。' })
}
const active = ref('mo')
</script>
