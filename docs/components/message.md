# Message 全局轻提示

全局轻量反馈，通常用于操作结果的一次性告知。命令式服务 API 为主（`LhMessage.success(...)`），队列渲染在独立容器、不依赖组件树，超限自动移除最早的消息。

## 基础用法

<DemoBlock title="基础用法">
  <LhButton @click="showBasic">显示提示</LhButton>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhMessage } from '@lh-ui/vue3'

const showBasic = () => {
  LhMessage('这是一条消息提示')
}
</script>

<template>
  <LhButton @click="showBasic">显示提示</LhButton>
</template>
```

```vue options
<script>
import { LhMessage } from '@lh-ui/vue3'

export default {
  methods: {
    showBasic() {
      LhMessage('这是一条消息提示')
    },
  },
}
</script>

<template>
  <LhButton @click="showBasic">显示提示</LhButton>
</template>
```

## 语义类型

四种语义 + loading；warning / danger / error 以 `role="alert"` 立即播报，其余温和播报。

<DemoBlock title="四种语义与 loading">
  <div class="demo-message-row">
    <LhButton @click="showInfo">信息</LhButton>
    <LhButton @click="showSuccess">成功</LhButton>
    <LhButton @click="showWarning">警告</LhButton>
    <LhButton @click="showDanger">危险</LhButton>
    <LhButton @click="showLoading">加载中（手动关闭）</LhButton>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhMessage } from '@lh-ui/vue3'

const showInfo = () => LhMessage.info('提示信息')
const showSuccess = () => LhMessage.success('保存成功')
const showWarning = () => LhMessage.warning('请注意风险')
const showDanger = () => LhMessage.danger('操作失败')
// loading 默认不自动关闭，用返回的句柄手动收起
const showLoading = () => {
  const handle = LhMessage.loading('正在同步…')
  setTimeout(() => handle.close(), 2000)
}
</script>

<template>
  <div class="demo-message-row">
    <LhButton @click="showInfo">信息</LhButton>
    <LhButton @click="showSuccess">成功</LhButton>
    <LhButton @click="showWarning">警告</LhButton>
    <LhButton @click="showDanger">危险</LhButton>
    <LhButton @click="showLoading">加载中（手动关闭）</LhButton>
  </div>
</template>
```

```vue options
<script>
import { LhMessage } from '@lh-ui/vue3'

export default {
  methods: {
    showInfo() {
      LhMessage.info('提示信息')
    },
    showSuccess() {
      LhMessage.success('保存成功')
    },
    showWarning() {
      LhMessage.warning('请注意风险')
    },
    showDanger() {
      LhMessage.danger('操作失败')
    },
    // loading 默认不自动关闭，用返回的句柄手动收起
    showLoading() {
      const handle = LhMessage.loading('正在同步…')
      setTimeout(() => handle.close(), 2000)
    },
  },
}
</script>

<template>
  <div class="demo-message-row">
    <LhButton @click="showInfo">信息</LhButton>
    <LhButton @click="showSuccess">成功</LhButton>
    <LhButton @click="showWarning">警告</LhButton>
    <LhButton @click="showDanger">危险</LhButton>
    <LhButton @click="showLoading">加载中（手动关闭）</LhButton>
  </div>
</template>
```

## 可关闭与队列上限

`showClose` 显示关闭按钮；队列默认最多 5 条（`LhMessage.config({ max })` 调整），超出时移除最早的。

<DemoBlock title="可关闭">
  <LhButton @click="showClosable">可手动关闭</LhButton>
  <LhButton @click="showCloseLabel">自定义关闭文案</LhButton>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhMessage } from '@lh-ui/vue3'

const showClosable = () => LhMessage.success('保存成功', { showClose: true })
// closeLabel 自定义关闭按钮的无障碍名称
const showCloseLabel = () => LhMessage.info('请查收', { showClose: true, closeLabel: '知道了，关闭' })
</script>

<template>
  <LhButton @click="showClosable">可手动关闭</LhButton>
  <LhButton @click="showCloseLabel">自定义关闭文案</LhButton>
</template>
```

```vue options
<script>
import { LhMessage } from '@lh-ui/vue3'

export default {
  methods: {
    showClosable() {
      LhMessage.success('保存成功', { showClose: true })
    },
    // closeLabel 自定义关闭按钮的无障碍名称
    showCloseLabel() {
      LhMessage.info('请查收', { showClose: true, closeLabel: '知道了，关闭' })
    },
  },
}
</script>

<template>
  <LhButton @click="showClosable">可手动关闭</LhButton>
  <LhButton @click="showCloseLabel">自定义关闭文案</LhButton>
</template>
```

## 全局配置

```ts
import { LhMessage } from '@lh-ui/vue3'

LhMessage.config({
  duration: 3000, // 自动关闭毫秒数（0 表示不自动关闭）
  max: 5,         // 队列最大同时显示条数
  offset: 20,     // 距视口顶部偏移 px
  appendTo: 'body', // 挂载容器（选择器或元素）
})
```

## API

### LhMessage Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| content | 消息内容 | `string` | — |
| type | 语义类型 | `"success" \| "warning" \| "error" \| "info" \| "danger" \| "loading"` | `'info'` |
| showClose | 是否显示关闭按钮 | `boolean` | `false` |
| closeLabel | 关闭按钮的无障碍名称（未传时取语言包 `message.close`） | `string` | — |
| sx | sx 快速布局属性 | `SxProps` | — |

服务方法：`LhMessage(options)` / `LhMessage.success/info/warning/danger/loading(content, options?)`，返回 `{ close }` 句柄；另有 `LhMessage.close(id)`、`LhMessage.closeAll()` 与 `LhMessage.config(options)`。

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| close | 点击条目上的关闭按钮时触发 | — |

命令式用法中，关闭（含自动关闭与手动关闭）通过 Options 的 `onClose` 回调感知。

### Options

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| content | 消息内容 | `string` | — |
| type | 语义类型 | `'info' \| 'success' \| 'warning' \| 'danger' \| 'error' \| 'loading'` | `'info'` |
| duration | 自动关闭毫秒数，`0` 表示不自动关闭（loading 默认 `0`） | `number` | `3000` |
| showClose | 是否显示关闭按钮 | `boolean` | `false` |
| offset | 距视口顶部偏移 px | `number` | `20` |
| sx | sx 快速布局属性 | `SxProps` | — |
| onClose | 关闭后的回调 | `() => void` | — |

## 无障碍

- 容器与条目为 live region：info / success / loading 用 `role="status"` 温和播报，warning / danger / error 用 `role="alert"` 立即播报
- 非阻断式设计：不转移焦点、不遮挡键盘流
- 关闭按钮带 `aria-label`（语言包 `message.close`，可用 `closeLabel` 覆盖）
- 动效尊重 `prefers-reduced-motion`

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/message/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

<details id="type-LhMessageOptions">
<summary><code>LhMessageOptions</code></summary>

```ts
/** 服务选项：字符串内容 + 展示与回调 */
export interface LhMessageOptions {
  /** 消息内容 */
  content: string
  /** 语义类型，默认 info */
  type?: LhMessageType
  /** 自动关闭毫秒数，0 表示不自动关闭（loading 默认 0，其余默认 3000） */
  duration?: number
  /** 是否显示关闭按钮 */
  showClose?: boolean
  /** 距视口顶部偏移 px（默认 20） */
  offset?: number
  /** sx 快速布局属性 */
  sx?: SxProps
  /** 关闭（含自动关闭与手动关闭）后的回调 */
  onClose?: () => void
}
```

</details>

<details id="type-LhMessageHandle">
<summary><code>LhMessageHandle</code></summary>

```ts
/** 服务句柄 */
export interface LhMessageHandle {
  close: () => void
}
```

</details>

<details id="type-LhMessageProps">
<summary><code>LhMessageProps</code></summary>

```ts
/** 条目组件 props（服务内部渲染；也可声明式单用） */
export interface LhMessageProps {
  content: string
  type?: LhMessageType
  showClose?: boolean
  /** 关闭按钮的无障碍名称（未传时取语言包 message.close） */
  closeLabel?: string
  sx?: SxProps
}
```

</details>

<details id="type-LhMessageConfig">
<summary><code>LhMessageConfig</code></summary>

```ts
/** 全局默认配置项（LhMessage.config） */
export interface LhMessageConfig {
  duration?: number
  max?: number
  offset?: number
  /** 挂载容器（默认 body） */
  appendTo?: string | HTMLElement
}
```

</details>

<details id="type-LhMessageType">
<summary><code>LhMessageType</code> <sub>（来自 @lh-ui/share/core/message）</sub></summary>

```ts
/** 消息语义类型（四语义 + loading） */
export type LhMessageType =
  | (typeof LH_MESSAGE_TYPE_CONST)[keyof typeof LH_MESSAGE_TYPE_CONST]
```

</details>

<details id="type-LhMessageRecord">
<summary><code>LhMessageRecord</code> <sub>（来自 @lh-ui/share/core/message）</sub></summary>

```ts
/** 单条消息在服务队列中的记录形态 */
export interface LhMessageRecord {
  id: number
  type: LhMessageType
  content: string
  /** 自动关闭毫秒数，0 表示不自动关闭 */
  duration: number
  showClose: boolean
  /** 距视口顶部的偏移 px */
  offset: number
  sx?: SxProps
  onClose?: () => void
}
```

</details>

### 常量

本组件用到的公开常量如下（可在 Props 表的「类型 / 默认值」列点击同名条目跳转至此）：

<details id="const-LH_MESSAGE_TYPE_CONST">
<summary><code>LH_MESSAGE_TYPE_CONST</code> <sub>（来自 @lh-ui/share/core/message）</sub></summary>

```ts
/** 类型常量（在通用语义常量上补 loading） */
export const LH_MESSAGE_TYPE_CONST = {
  ...LH_TYPES_CONST,
  /** @alias 加载 */
  loading: 'loading',
} as const
```

</details>

<details id="const-LH_MESSAGE_DURATION_DEFAULT">
<summary><code>LH_MESSAGE_DURATION_DEFAULT</code> <sub>（来自 @lh-ui/share/core/message）</sub></summary>

```ts
/** 默认自动关闭时长（loading 语义不自动关闭） */
export const LH_MESSAGE_DURATION_DEFAULT = 3000
```

</details>

<details id="const-LH_MESSAGE_MAX_DEFAULT">
<summary><code>LH_MESSAGE_MAX_DEFAULT</code> <sub>（来自 @lh-ui/share/core/message）</sub></summary>

```ts
/** 队列最大同时显示条数，超出时移除最早的 */
export const LH_MESSAGE_MAX_DEFAULT = 5
```

</details>

<details id="const-LH_MESSAGE_OFFSET_DEFAULT">
<summary><code>LH_MESSAGE_OFFSET_DEFAULT</code> <sub>（来自 @lh-ui/share/core/message）</sub></summary>

```ts
/** 距视口顶部默认偏移 px */
export const LH_MESSAGE_OFFSET_DEFAULT = 20
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
import { LhMessage } from '@lh-ui/vue3'

const showBasic = () => LhMessage('这是一条消息提示')
const showInfo = () => LhMessage.info('提示信息')
const showSuccess = () => LhMessage.success('保存成功')
const showWarning = () => LhMessage.warning('请注意风险')
const showDanger = () => LhMessage.danger('操作失败')
const showLoading = () => {
  const handle = LhMessage.loading('正在同步…')
  setTimeout(() => handle.close(), 2000)
}
const showClosable = () => LhMessage.success('保存成功', { showClose: true })
// closeLabel 自定义关闭按钮的无障碍名称
const showCloseLabel = () => LhMessage.info('请查收', { showClose: true, closeLabel: '知道了，关闭' })
</script>

<style>
.demo-message-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
