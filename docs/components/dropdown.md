# Dropdown 下拉菜单

向下弹出的命令菜单。触发器可以是任意元素，菜单项通过 `command` 标识，点击后以 `command` 事件抛出。按 WAI-ARIA menu 模式实现：方向键循环、Home/End 首尾、Enter/Space 触发、Esc 关闭并归还焦点。

## 基础用法

<DemoBlock title="click 触发 + command 事件">
  <LhDropdown @command="onCommand">
    <LhButton>{{ selectedLabel || '更多操作' }} ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem command="new">新建</LhDropdownItem>
      <LhDropdownItem command="edit">编辑</LhDropdownItem>
      <LhDropdownItem command="delete">删除</LhDropdownItem>
    </template>
  </LhDropdown>
  <p class="demo-dropdown-log">最近指令：{{ lastCommand || '—' }}</p>
</DemoBlock>

```vue composition
<template>
  <LhDropdown @command="onCommand">
    <LhButton>{{ selectedLabel || '更多操作' }} ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem command="new">新建</LhDropdownItem>
      <LhDropdownItem command="edit">编辑</LhDropdownItem>
      <LhDropdownItem command="delete">删除</LhDropdownItem>
    </template>
  </LhDropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const lastCommand = ref('')
// 触发器文本由使用者维护：command 事件只抛出命令值，标签怎么显示交给外部决定
const labelMap: Record<string, string> = { new: '新建', edit: '编辑', delete: '删除' }
const selectedLabel = ref('')
function onCommand(command: string | number | undefined) {
  lastCommand.value = String(command)
  selectedLabel.value = labelMap[String(command)] ?? String(command)
}
</script>
```

```vue options
<script>
export default {
  data() {
    return {
      lastCommand: '',
      // 触发器文本由使用者维护：command 事件只抛出命令值，标签怎么显示交给外部决定
      labelMap: { new: '新建', edit: '编辑', delete: '删除' },
      selectedLabel: '',
    }
  },
  methods: {
    onCommand(command) {
      this.lastCommand = String(command)
      this.selectedLabel = this.labelMap[String(command)] ?? String(command)
    },
  },
}
</script>

<template>
  <LhDropdown @command="onCommand">
    <LhButton>{{ selectedLabel || '更多操作' }} ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem command="new">新建</LhDropdownItem>
      <LhDropdownItem command="edit">编辑</LhDropdownItem>
      <LhDropdownItem command="delete">删除</LhDropdownItem>
    </template>
  </LhDropdown>
</template>
```

## 触发方式

默认为 `click`，也可改为悬停或右键展开。

<DemoBlock title="hover / contextmenu">
  <div class="demo-dropdown-row">
    <LhDropdown trigger="hover" @command="onHoverCommand">
      <LhButton>{{ hoverLabel || '悬停触发' }} ▾</LhButton>
      <template #dropdown>
        <LhDropdownItem command="hover-1">选项一</LhDropdownItem>
        <LhDropdownItem command="hover-2">选项二</LhDropdownItem>
      </template>
    </LhDropdown>
    <LhDropdown trigger="contextmenu" @command="onContextCommand">
      <LhButton>{{ contextLabel || '右键触发' }} ▾</LhButton>
      <template #dropdown>
        <LhDropdownItem command="ctx-1">刷新</LhDropdownItem>
        <LhDropdownItem command="ctx-2">复制</LhDropdownItem>
      </template>
    </LhDropdown>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
const hoverLabel = ref('')
function onHoverCommand(command: string | number | undefined) {
  hoverLabel.value = String(command)
}
const contextLabel = ref('')
function onContextCommand(command: string | number | undefined) {
  contextLabel.value = String(command)
}
</script>

<template>
  <!-- 悬停触发 -->
  <LhDropdown trigger="hover" @command="onHoverCommand">
    <LhButton>{{ hoverLabel || '悬停触发' }} ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem command="hover-1">选项一</LhDropdownItem>
      <LhDropdownItem command="hover-2">选项二</LhDropdownItem>
    </template>
  </LhDropdown>
  <!-- 右键触发 -->
  <LhDropdown trigger="contextmenu" @command="onContextCommand">
    <LhButton>{{ contextLabel || '右键触发' }} ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem command="ctx-1">刷新</LhDropdownItem>
      <LhDropdownItem command="ctx-2">复制</LhDropdownItem>
    </template>
  </LhDropdown>
</template>
```

```vue options
<script>
export default {
  data() {
    return { hoverLabel: '', contextLabel: '' }
  },
  methods: {
    onHoverCommand(command) {
      this.hoverLabel = String(command)
    },
    onContextCommand(command) {
      this.contextLabel = String(command)
    },
  },
}
</script>

<template>
  <!-- 悬停触发 -->
  <LhDropdown trigger="hover" @command="onHoverCommand">
    <LhButton>{{ hoverLabel || '悬停触发' }} ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem command="hover-1">选项一</LhDropdownItem>
      <LhDropdownItem command="hover-2">选项二</LhDropdownItem>
    </template>
  </LhDropdown>
  <!-- 右键触发 -->
  <LhDropdown trigger="contextmenu" @command="onContextCommand">
    <LhButton>{{ contextLabel || '右键触发' }} ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem command="ctx-1">刷新</LhDropdownItem>
      <LhDropdownItem command="ctx-2">复制</LhDropdownItem>
    </template>
  </LhDropdown>
</template>
```

> `contextmenu` 触发会阻止浏览器默认右键菜单。

## 禁用与分割线

<DemoBlock title="disabled / divided">
  <LhDropdown @command="onActionCommand">
    <LhButton>{{ actionLabel || '操作' }} ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem command="export">导出</LhDropdownItem>
      <LhDropdownItem command="import">导入</LhDropdownItem>
      <LhDropdownItem divided command="audit">审计日志</LhDropdownItem>
      <LhDropdownItem disabled command="purge">清空数据</LhDropdownItem>
    </template>
  </LhDropdown>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
const actionLabel = ref('')
function onActionCommand(command: string | number | undefined) {
  actionLabel.value = String(command)
}
</script>

<template>
  <!-- 带禁用项与分割线的操作菜单 -->
  <LhDropdown @command="onActionCommand">
    <LhButton>{{ actionLabel || '操作' }} ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem command="export">导出</LhDropdownItem>
      <LhDropdownItem command="import">导入</LhDropdownItem>
      <LhDropdownItem divided command="audit">审计日志</LhDropdownItem>
      <LhDropdownItem disabled command="purge">清空数据</LhDropdownItem>
    </template>
  </LhDropdown>
</template>
```

```vue options
<script>
export default {
  data() {
    return { actionLabel: '' }
  },
  methods: {
    onActionCommand(command) {
      this.actionLabel = String(command)
    },
  },
}
</script>

<template>
  <!-- 带禁用项与分割线的操作菜单 -->
  <LhDropdown @command="onActionCommand">
    <LhButton>{{ actionLabel || '操作' }} ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem command="export">导出</LhDropdownItem>
      <LhDropdownItem command="import">导入</LhDropdownItem>
      <LhDropdownItem divided command="audit">审计日志</LhDropdownItem>
      <LhDropdownItem disabled command="purge">清空数据</LhDropdownItem>
    </template>
  </LhDropdown>
</template>
```

> 禁用项仍可被聚焦（`aria-disabled="true"`），屏幕阅读器能读出该项；但方向键会跳过它，点击与 Enter/Space 均不触发 `command`。

## 位置与最大高度

<DemoBlock title="placement 与 maxHeight">
  <LhDropdown placement="bottom-end" :max-height="160" @command="onItemCommand">
    <LhButton>{{ itemLabel || '底部右对齐' }} ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem v-for="i in 12" :key="i" :command="i">第 {{ i }} 项</LhDropdownItem>
    </template>
  </LhDropdown>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
const itemLabel = ref('')
function onItemCommand(command: string | number | undefined) {
  itemLabel.value = `第 ${command} 项`
}
</script>

<template>
  <!-- 底部右对齐并限制最大高度 -->
  <LhDropdown placement="bottom-end" :max-height="160" @command="onItemCommand">
    <LhButton>{{ itemLabel || '底部右对齐' }} ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem v-for="i in 12" :key="i" :command="i">第 {{ i }} 项</LhDropdownItem>
    </template>
  </LhDropdown>
</template>
```

```vue options
<script>
export default {
  data() {
    return { itemLabel: '' }
  },
  methods: {
    onItemCommand(command) {
      this.itemLabel = `第 ${command} 项`
    },
  },
}
</script>

<template>
  <!-- 底部右对齐并限制最大高度 -->
  <LhDropdown placement="bottom-end" :max-height="160" @command="onItemCommand">
    <LhButton>{{ itemLabel || '底部右对齐' }} ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem v-for="i in 12" :key="i" :command="i">第 {{ i }} 项</LhDropdownItem>
    </template>
  </LhDropdown>
</template>
```

## 受控显隐与点击行为

`v-model:visible` 手动控制显隐；`hide-on-click` 控制选中后是否自动收起；`popper-class` 给弹出层加自定义类；`teleport-target` 指定挂载容器。

<DemoBlock title="受控显隐">
  <LhDropdown v-model:visible="menuVisible" :hide-on-click="false" popper-class="demo-dropdown-popper">
    <LhButton>{{ menuVisible ? '收起' : '展开' }} ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem command="copy">复制（选中后不收起）</LhDropdownItem>
      <LhDropdownItem command="paste">粘贴</LhDropdownItem>
    </template>
  </LhDropdown>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
const menuVisible = ref(false)
</script>

<template>
  <!-- 受控显隐：选中后不收起 -->
  <LhDropdown
    v-model:visible="menuVisible"
    :hide-on-click="false"
    popper-class="demo-dropdown-popper"
  >
    <LhButton>{{ menuVisible ? '收起' : '展开' }} ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem command="copy">复制（选中后不收起）</LhDropdownItem>
      <LhDropdownItem command="paste">粘贴</LhDropdownItem>
    </template>
  </LhDropdown>
</template>
```

```vue options
<script>
export default {
  data() {
    return { menuVisible: false }
  },
}
</script>

<template>
  <!-- 受控显隐：选中后不收起 -->
  <LhDropdown
    v-model:visible="menuVisible"
    :hide-on-click="false"
    popper-class="demo-dropdown-popper"
  >
    <LhButton>{{ menuVisible ? '收起' : '展开' }} ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem command="copy">复制（选中后不收起）</LhDropdownItem>
      <LhDropdownItem command="paste">粘贴</LhDropdownItem>
    </template>
  </LhDropdown>
</template>
```

<DemoBlock title="挂载到指定容器">
  <LhDropdown teleport-target="#dropdown-zone">
    <LhButton>更多 ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem command="a">选项</LhDropdownItem>
    </template>
  </LhDropdown>
  <div id="dropdown-zone" class="demo-dropdown-zone">Teleport 容器（#dropdown-zone）</div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- 挂载到指定容器 -->
  <LhDropdown teleport-target="#dropdown-zone">
    <LhButton>更多 ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem command="a">选项</LhDropdownItem>
    </template>
  </LhDropdown>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- 挂载到指定容器 -->
  <LhDropdown teleport-target="#dropdown-zone">
    <LhButton>更多 ▾</LhButton>
    <template #dropdown>
      <LhDropdownItem command="a">选项</LhDropdownItem>
    </template>
  </LhDropdown>
</template>
```

## Dropdown API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
| trigger | 触发方式 | `"hover" \| "click" \| "contextmenu"` | `'click'` |
| placement | 展示位置（12 种，同 Tooltip） | `"top" \| "top-start" \| "top-end" \| "bottom" \| "bottom-start" \| "bottom-end" \| "left" \| "left-start" \| "left-end" \| "right" \| "right-start" \| "right-end"` | `'bottom-start'` |
| visible | 显隐状态（v-model:visible） | `boolean` | — |
| disabled | 是否禁用触发器 | `boolean` | — |
| hideOnClick | 点击菜单项后是否自动关闭 | `boolean` | `true` |
| teleportTarget | Teleport 目标（选择器或元素） | `string \| HTMLElement` | `'body'` |
| popperClass | 弹出层自定义类名 | `string` | — |
| maxHeight | 菜单最大高度（数字为 px） | `string \| number` | — |
| themeVars | 组件级主题变量 | `{ [x: string]: string; }` | — |
| bgPattern | 组件级背景花纹，覆盖 ConfigProvider 配置 | `string` | — |
| sx | sx 快速布局属性（作用于触发器根元素） | `LhSxProps` | — |

### Events

| 事件 | 说明 | 参数 |
| ---- | ---- | ---- |
| command | 点击菜单项时触发 | `(command: string \| number \| undefined)` |
| click | 菜单项（`LhDropdownItem`）被点击时触发 | `(command: string \| number \| undefined)` |
| visible-change | 显隐变化 | `(value: boolean)` |
| update:visible | 显隐变化（v-model） | `(value: boolean)` |

### Slots

| 插槽 | 说明 |
| ---- | ---- |
| default | 触发器内容 |
| dropdown | 菜单内容（`LhDropdownItem` 列表） |

### Methods

| 方法 | 说明 |
| ---- | ---- |
| show | 编程式展开 |
| hide | 编程式收起 |
| toggle | 编程式切换 |

## DropdownItem API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
| command | 命令标识，点击时随 `command` 事件抛出 | `string \| number` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| divided | 是否在上方显示分割线 | `boolean` | `false` |

### 无障碍

- 触发器带 `aria-haspopup="menu"` 与 `aria-expanded`；菜单为 `role="menu"`，项为 `role="menuitem"`
- 键盘遵循 APG menu 模式：↑/↓ 循环（跳过禁用项）、Home/End 跳首尾、Enter/Space 触发 `command` 并关闭、Esc 关闭并归还焦点
- 禁用项用 `aria-disabled` 而非移出焦点树，方向键与回车均会跳过它
- 菜单展开时主轴溢出会自动翻转方向，交叉轴溢出会夹回视口

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/dropdown/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

<details id="type-LhDropdownProps">
<summary><code>LhDropdownProps</code></summary>

```ts
/**
 * Dropdown 组件 Props
 */
export interface LhDropdownProps {
  /** 触发方式 */
  trigger?: LhDropdownTrigger
  /** 展示位置 */
  placement?: LhDropdownPlacement
  /** 手动控制的显示状态（v-model:visible） */
  visible?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 点击菜单项后是否自动关闭 */
  hideOnClick?: boolean
  /** Teleport 目标（选择器或元素，默认 body） */
  teleportTarget?: string | HTMLElement
  /** 弹出层自定义类名 */
  popperClass?: string
  /** 菜单最大高度 */
  maxHeight?: string | number
  /** 组件级主题变量，覆盖 ConfigProvider 配置 */
  themeVars?: Record<string, string>
  /** 组件级背景花纹，覆盖 ConfigProvider 配置 */
  bgPattern?: string
  /** sx 快速布局属性（作用于触发器根元素） */
  sx?: LhSxProps
}
```

</details>

<details id="type-LhDropdownItemProps">
<summary><code>LhDropdownItemProps</code></summary>

```ts
/**
 * DropdownItem 组件 Props
 */
export interface LhDropdownItemProps {
  /** 命令标识，点击时随 command 事件抛出 */
  command?: string | number
  /** 是否禁用（保留可聚焦性以进入无障碍树） */
  disabled?: boolean
  /** 是否显示分割线 */
  divided?: boolean
}
```

</details>

<details id="type-LhDropdownTrigger">
<summary><code>LhDropdownTrigger</code> <sub>（来自 @lh-ui/share/core/dropdown (logic.ts)）</sub></summary>

```ts
/** 触发方式 */
export type LhDropdownTrigger = 'hover' | 'click' | 'contextmenu'
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
import { ref } from 'vue'

// 每个示例持有独立的状态：示例之间不能共用同一个 ref，否则一个示例里的操作
// 会改写另一个示例的按钮文案或日志
const lastCommand = ref('')
// 触发器文本由使用者维护：command 事件只抛出命令值，标签怎么显示交给外部决定
const labelMap: Record<string, string> = { new: '新建', edit: '编辑', delete: '删除' }
const selectedLabel = ref('')

function onCommand(command: string | number | undefined) {
  lastCommand.value = String(command)
  selectedLabel.value = labelMap[String(command)] ?? String(command)
}

const hoverLabelMap: Record<string, string> = { 'hover-1': '选项一', 'hover-2': '选项二' }
const hoverLabel = ref('')

function onHoverCommand(command: string | number | undefined) {
  hoverLabel.value = hoverLabelMap[String(command)] ?? String(command)
}

const contextLabelMap: Record<string, string> = { 'ctx-1': '刷新', 'ctx-2': '复制' }
const contextLabel = ref('')

function onContextCommand(command: string | number | undefined) {
  contextLabel.value = contextLabelMap[String(command)] ?? String(command)
}

const actionLabelMap: Record<string, string> = {
  export: '导出',
  import: '导入',
  audit: '审计日志',
  purge: '清空数据',
}
const actionLabel = ref('')

function onActionCommand(command: string | number | undefined) {
  actionLabel.value = actionLabelMap[String(command)] ?? String(command)
}

const itemLabel = ref('')

function onItemCommand(command: string | number | undefined) {
  itemLabel.value = `第 ${command} 项`
}
const menuVisible = ref(false)
</script>

<style scoped>
.demo-dropdown-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.demo-dropdown-log {
  margin-top: 12px;
  color: var(--lh-text-color-secondary);
}
.demo-dropdown-zone {
  margin-top: 16px;
  width: 100%;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed var(--lh-border-color, #d4cfc6);
  border-radius: 6px;
  color: var(--lh-text-color-secondary);
}
</style>
