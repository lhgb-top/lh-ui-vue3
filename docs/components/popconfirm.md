# Popconfirm 气泡确认

轻量二次确认：在触发器附近弹出确认气泡，不需要打开对话框。语义为阻断式确认（`role="alertdialog"`）：打开时焦点落在「确定」按钮，Tab 在两个按钮间循环，Escape 视为取消。

## 基础用法

<DemoBlock title="删除确认">
  <LhPopconfirm title="确定删除这条记录吗？" @confirm="onConfirm" @cancel="onCancel">
    <LhButton type="danger">删除</LhButton>
  </LhPopconfirm>
  <p v-if="action" class="demo-popconfirm-log">最近操作：{{ action }}</p>
</DemoBlock>

```vue composition
<template>
  <LhPopconfirm title="确定删除这条记录吗？" @confirm="onConfirm" @cancel="onCancel">
    <LhButton type="danger">删除</LhButton>
  </LhPopconfirm>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const action = ref('')
function onConfirm() {
  action.value = '已确认'
}
function onCancel() {
  action.value = '已取消'
}
const pcVisible = ref(false)
</script>
```

```vue options
<script>
export default {
  data() {
    return { action: '', pcVisible: false }
  },
  methods: {
    onConfirm() {
      this.action = '已确认'
    },
    onCancel() {
      this.action = '已取消'
    },
  },
}
</script>

<template>
  <LhPopconfirm title="确定删除这条记录吗？" @confirm="onConfirm" @cancel="onCancel">
    <LhButton type="danger">删除</LhButton>
  </LhPopconfirm>
</template>
```

## 三种语气

<DemoBlock title="info / warning / danger">
  <div class="demo-popconfirm-row">
    <LhPopconfirm type="info" title="查看该记录的访问日志？">
      <LhButton>信息</LhButton>
    </LhPopconfirm>
    <LhPopconfirm type="warning" title="该操作会通知所有成员。">
      <LhButton type="warning">警告</LhButton>
    </LhPopconfirm>
    <LhPopconfirm type="danger" title="删除后不可恢复。">
      <LhButton type="danger">危险</LhButton>
    </LhPopconfirm>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- 信息语气 -->
  <LhPopconfirm type="info" title="查看该记录的访问日志？">
    <LhButton>信息</LhButton>
  </LhPopconfirm>
  <!-- 警告语气 -->
  <LhPopconfirm type="warning" title="该操作会通知所有成员。">
    <LhButton type="warning">警告</LhButton>
  </LhPopconfirm>
  <!-- 危险语气 -->
  <LhPopconfirm type="danger" title="删除后不可恢复。">
    <LhButton type="danger">危险</LhButton>
  </LhPopconfirm>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- 信息语气 -->
  <LhPopconfirm type="info" title="查看该记录的访问日志？">
    <LhButton>信息</LhButton>
  </LhPopconfirm>
  <!-- 警告语气 -->
  <LhPopconfirm type="warning" title="该操作会通知所有成员。">
    <LhButton type="warning">警告</LhButton>
  </LhPopconfirm>
  <!-- 危险语气 -->
  <LhPopconfirm type="danger" title="删除后不可恢复。">
    <LhButton type="danger">危险</LhButton>
  </LhPopconfirm>
</template>
```

## 自定义文案与方位

<DemoBlock title="文案 / 方位 / 触发方式">
  <div class="demo-popconfirm-row">
    <LhPopconfirm
      title="归档后可在回收站恢复。"
      confirm-text="归档"
      cancel-text="再想想"
      placement="right"
    >
      <LhButton>自定义文案</LhButton>
    </LhPopconfirm>
    <LhPopconfirm title="悬停即可确认。" trigger="hover" :show-after="0" placement="bottom">
      <LhButton>悬停触发</LhButton>
    </LhPopconfirm>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- 自定义文案与方位 -->
  <LhPopconfirm
    title="归档后可在回收站恢复。"
    confirm-text="归档"
    cancel-text="再想想"
    placement="right"
  >
    <LhButton>自定义文案</LhButton>
  </LhPopconfirm>
  <!-- 悬停触发 -->
  <LhPopconfirm title="悬停即可确认。" trigger="hover" :show-after="0" placement="bottom">
    <LhButton>悬停触发</LhButton>
  </LhPopconfirm>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- 自定义文案与方位 -->
  <LhPopconfirm
    title="归档后可在回收站恢复。"
    confirm-text="归档"
    cancel-text="再想想"
    placement="right"
  >
    <LhButton>自定义文案</LhButton>
  </LhPopconfirm>
  <!-- 悬停触发 -->
  <LhPopconfirm title="悬停即可确认。" trigger="hover" :show-after="0" placement="bottom">
    <LhButton>悬停触发</LhButton>
  </LhPopconfirm>
</template>
```

> 按钮文案默认取语言包 `popconfirm.confirm` / `popconfirm.cancel`，可用 `confirm-text` / `cancel-text` 覆盖。

## 图标、确认按钮类型与行为开关

`show-icon` 显示警示图标、`confirm-button-type` 换确认按钮主类型；`disabled` 禁用触发；`v-model:visible` 受控显隐；`hide-after` 延迟自动收起；`popper-class` / `teleport-target` 定制弹出层。

<DemoBlock title="图标与按钮类型">
  <LhPopconfirm title="确定删除这条记录吗？" show-icon confirm-button-type="primary">
    <LhButton type="danger">带图标</LhButton>
  </LhPopconfirm>
  <LhPopconfirm title="该操作不可用。" disabled>
    <LhButton disabled>禁用</LhButton>
  </LhPopconfirm>
  <LhPopconfirm v-model:visible="pcVisible" title="受控气泡" :hide-after="1000">
    <LhButton>{{ pcVisible ? '收起' : '展开' }}</LhButton>
  </LhPopconfirm>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
const pcVisible = ref(false)
</script>

<template>
  <!-- 图标与确认按钮类型 -->
  <LhPopconfirm title="确定删除这条记录吗？" show-icon confirm-button-type="primary">
    <LhButton type="danger">带图标</LhButton>
  </LhPopconfirm>
  <!-- 禁用触发 -->
  <LhPopconfirm title="该操作不可用。" disabled>
    <LhButton disabled>禁用</LhButton>
  </LhPopconfirm>
  <!-- 受控显隐与延迟收起 -->
  <LhPopconfirm v-model:visible="pcVisible" title="受控气泡" :hide-after="1000">
    <LhButton>{{ pcVisible ? '收起' : '展开' }}</LhButton>
  </LhPopconfirm>
</template>
```

```vue options
<script>
export default {
  data() {
    return { pcVisible: false }
  },
}
</script>

<template>
  <!-- 图标与确认按钮类型 -->
  <LhPopconfirm title="确定删除这条记录吗？" show-icon confirm-button-type="primary">
    <LhButton type="danger">带图标</LhButton>
  </LhPopconfirm>
  <!-- 禁用触发 -->
  <LhPopconfirm title="该操作不可用。" disabled>
    <LhButton disabled>禁用</LhButton>
  </LhPopconfirm>
  <!-- 受控显隐与延迟收起 -->
  <LhPopconfirm v-model:visible="pcVisible" title="受控气泡" :hide-after="1000">
    <LhButton>{{ pcVisible ? '收起' : '展开' }}</LhButton>
  </LhPopconfirm>
</template>
```

## Popconfirm API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
| type | 确认语气 | `"info" \| "warning" \| "danger"` | `'warning'` |
| placement | 展示位置 | `"top" \| "top-start" \| "top-end" \| "bottom" \| "bottom-start" \| "bottom-end" \| "left" \| "left-start" \| "left-end" \| "right" \| "right-start" \| "right-end"` | `'top'` |
| trigger | 触发方式 | `"click" \| "hover" \| "focus" \| "manual"` | `'click'` |
| title | 确认内容（也可用 content 插槽） | `string` | — |
| confirmText | 确认按钮文案（未传时取语言包 popconfirm.confirm） | `string` | — |
| cancelText | 取消按钮文案（未传时取语言包 popconfirm.cancel） | `string` | — |
| confirmButtonType | 确认按钮类型 | `"default" \| "primary"` | `'primary'` |
| visible | 手动控制的显示状态（v-model:visible） | `boolean` | — |
| disabled | 是否禁用 | `boolean` | — |
| showIcon | 是否显示语气图标 | `boolean` | `true` |
| popperClass | 弹出层自定义类名 | `string` | — |
| teleportTarget | Teleport 目标（选择器或元素，默认 body） | `string \| HTMLElement` | `'body'` |
| showAfter | 延迟显示时间(ms) | `number` | — |
| hideAfter | 延迟隐藏时间(ms) | `number` | — |
| themeVars | 组件级主题变量，覆盖 ConfigProvider 配置 | `{ [x: string]: string; }` | — |
| bgPattern | 组件级背景花纹，覆盖 ConfigProvider 配置 | `string` | — |
| sx | sx 快速布局属性（作用于触发器根元素） | `SxProps` | — |

### Events

| 事件 | 说明 | 参数 |
| ---- | ---- | ---- |
| confirm | 点击确认按钮后触发 | — |
| cancel | 点击取消按钮或按 Escape 后触发 | — |
| update:visible | 显隐变化 | `(value: boolean)` |
| show | 显示后触发 | — |
| hide | 隐藏后触发 | — |

### Slots

| 插槽 | 说明 |
| ---- | ---- |
| default | 触发器内容 |
| content | 自定义确认内容 |

### Methods

| 方法 | 说明 |
| ---- | ---- |
| show | 编程式显示 |
| hide | 编程式隐藏 |
| toggle | 编程式切换 |

### 无障碍

- 弹出层为 `role="alertdialog"` + `aria-modal="true"`，触发器带 `aria-haspopup` / `aria-expanded`
- 打开时焦点落在「确定」按钮，Tab 在两个操作按钮间循环，关闭后归还触发器焦点
- Escape 视为取消（对齐 WAI-ARIA alertdialog：Escape 关闭并视为否定）
- 确认内容通过 `aria-labelledby` 关联；语气图标为装饰性（`aria-hidden`）

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/popconfirm/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

<details id="type-LhPopconfirmProps">
<summary><code>LhPopconfirmProps</code></summary>

```ts
/**
 * Popconfirm 组件 Props
 */
export interface LhPopconfirmProps {
  /** 确认语气 */
  type?: LhPopconfirmType
  /** 展示位置 */
  placement?: LhPlacement
  /** 触发方式 */
  trigger?: LhPopconfirmTrigger
  /** 确认内容（也可用 content 插槽） */
  title?: string
  /** 确认按钮文案（未传时取语言包 popconfirm.confirm） */
  confirmText?: string
  /** 取消按钮文案（未传时取语言包 popconfirm.cancel） */
  cancelText?: string
  /** 确认按钮类型 */
  confirmButtonType?: 'default' | 'primary'
  /** 手动控制的显示状态（v-model:visible） */
  visible?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 是否显示语气图标 */
  showIcon?: boolean
  /** 弹出层自定义类名 */
  popperClass?: string
  /** Teleport 目标（选择器或元素，默认 body） */
  teleportTarget?: string | HTMLElement
  /** 延迟显示时间(ms) */
  showAfter?: number
  /** 延迟隐藏时间(ms) */
  hideAfter?: number
  /** 组件级主题变量，覆盖 ConfigProvider 配置 */
  themeVars?: Record<string, string>
  /** 组件级背景花纹，覆盖 ConfigProvider 配置 */
  bgPattern?: string
  /** sx 快速布局属性（作用于触发器根元素） */
  sx?: SxProps
}
```

</details>

<details id="type-LhPopconfirmPlacement">
<summary><code>LhPopconfirmPlacement</code> <sub>（来自 @lh-ui/share/core/shared/popper）</sub></summary>

```ts
/**
 * Popper 定位引擎（纯函数，无框架依赖）
 *
 * 弹出层（Tooltip / Popover / Popconfirm / Dropdown 等）共用的几何计算：
 * 12 种 placement 摆放、主轴溢出翻转（flip）、交叉轴夹回（shift）。
 * 入参全部是 rect 字面量，不触碰 DOM，可直接单测。
 */

/** 弹出层方位（方向 + 对齐） */
export type LhPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'
```

</details>

<details id="type-LhPopconfirmTrigger">
<summary><code>LhPopconfirmTrigger</code> <sub>（来自 @lh-ui/share/core/popconfirm (logic.ts)）</sub></summary>

```ts
/** 触发方式 */
export type LhPopconfirmTrigger = 'click' | 'hover' | 'focus' | 'manual'
```

</details>

<details id="type-LhPopconfirmType">
<summary><code>LhPopconfirmType</code> <sub>（来自 @lh-ui/share/core/popconfirm (logic.ts)）</sub></summary>

```ts
/** 确认语气 */
export type LhPopconfirmType = 'info' | 'warning' | 'danger'
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
import { ref } from 'vue'
const action = ref('')
function onConfirm() {
  action.value = '已确认'
}
function onCancel() {
  action.value = '已取消'
}
const pcVisible = ref(false)
</script>

<style scoped>
.demo-popconfirm-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}
.demo-popconfirm-log {
  margin-top: 12px;
  color: var(--lh-text-secondary);
}
</style>
