# Notification 通知

右上角（可四角）的通知卡片，承载需要稍作停留的反馈信息：标题 / 正文 / 语义图标 / 可关闭 / 自动消失 / 堆叠。命令式服务 API（`LhNotification.success(...)`）。

## 基础用法

<DemoBlock title="基础用法">
  <LhButton @click="showBasic">打开通知</LhButton>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhNotification } from '@lh-ui/vue3'

const showBasic = () => {
  LhNotification.info({ title: '同步完成', content: '3 项变更已同步到云端' })
}
</script>

<template>
  <LhButton @click="showBasic">打开通知</LhButton>
</template>
```

```vue options
<script>
import { LhNotification } from '@lh-ui/vue3'

export default {
  methods: {
    showBasic() {
      LhNotification.info({ title: '同步完成', content: '3 项变更已同步到云端' })
    },
  },
}
</script>

<template>
  <LhButton @click="showBasic">打开通知</LhButton>
</template>
```

## 语义类型

<DemoBlock title="四种语义">
  <div class="demo-notification-row">
    <LhButton @click="showInfo">信息</LhButton>
    <LhButton @click="showSuccess">成功</LhButton>
    <LhButton @click="showWarning">警告</LhButton>
    <LhButton @click="showDanger">危险</LhButton>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhNotification } from '@lh-ui/vue3'

const showInfo = () => LhNotification.info({ title: '提示', content: '内容' })
const showSuccess = () => LhNotification.success({ title: '成功', content: '备份已完成' })
const showWarning = () => LhNotification.warning({ title: '警告', content: '存储空间不足' })
const showDanger = () => LhNotification.danger({ title: '失败', content: '网络连接中断' })
</script>

<template>
  <div class="demo-notification-row">
    <LhButton @click="showInfo">信息</LhButton>
    <LhButton @click="showSuccess">成功</LhButton>
    <LhButton @click="showWarning">警告</LhButton>
    <LhButton @click="showDanger">危险</LhButton>
  </div>
</template>
```

```vue options
<script>
import { LhNotification } from '@lh-ui/vue3'

export default {
  methods: {
    showInfo() {
      LhNotification.info({ title: '提示', content: '内容' })
    },
    showSuccess() {
      LhNotification.success({ title: '成功', content: '备份已完成' })
    },
    showWarning() {
      LhNotification.warning({ title: '警告', content: '存储空间不足' })
    },
    showDanger() {
      LhNotification.danger({ title: '失败', content: '网络连接中断' })
    },
  },
}
</script>

<template>
  <div class="demo-notification-row">
    <LhButton @click="showInfo">信息</LhButton>
    <LhButton @click="showSuccess">成功</LhButton>
    <LhButton @click="showWarning">警告</LhButton>
    <LhButton @click="showDanger">危险</LhButton>
  </div>
</template>
```

## 弹出位置

`position` 支持四角。

<DemoBlock title="位置">
  <div class="demo-notification-row">
    <LhButton @click="showAt('top-right')">右上</LhButton>
    <LhButton @click="showAt('top-left')">左上</LhButton>
    <LhButton @click="showAt('bottom-right')">右下</LhButton>
    <LhButton @click="showAt('bottom-left')">左下</LhButton>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhNotification } from '@lh-ui/vue3'

const showAt = (position) => {
  LhNotification.info({ title: '位置示例', content: position, duration: 3000, position })
}
</script>

<template>
  <div class="demo-notification-row">
    <LhButton @click="showAt('top-right')">右上</LhButton>
    <LhButton @click="showAt('top-left')">左上</LhButton>
    <LhButton @click="showAt('bottom-right')">右下</LhButton>
    <LhButton @click="showAt('bottom-left')">左下</LhButton>
  </div>
</template>
```

```vue options
<script>
import { LhNotification } from '@lh-ui/vue3'

export default {
  methods: {
    showAt(position) {
      LhNotification.info({ title: '位置示例', content: position, duration: 3000, position })
    },
  },
}
</script>

<template>
  <div class="demo-notification-row">
    <LhButton @click="showAt('top-right')">右上</LhButton>
    <LhButton @click="showAt('top-left')">左上</LhButton>
    <LhButton @click="showAt('bottom-right')">右下</LhButton>
    <LhButton @click="showAt('bottom-left')">左下</LhButton>
  </div>
</template>
```

## 可点击通知

传入 `onClick` 后卡片具备按钮语义，可用 Tab 聚焦、Enter / Space 触发。

<DemoBlock title="可点击">
  <LhButton @click="showClickable">带动作的通知</LhButton>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhNotification } from '@lh-ui/vue3'

const showClickable = () => {
  LhNotification.info({
    title: '发现新版本',
    content: '点击查看更新日志',
    duration: 0,
    onClick: () => window.open('#', '_blank'),
  })
}
</script>

<template>
  <LhButton @click="showClickable">带动作的通知</LhButton>
</template>
```

```vue options
<script>
import { LhNotification } from '@lh-ui/vue3'

export default {
  methods: {
    showClickable() {
      LhNotification.info({
        title: '发现新版本',
        content: '点击查看更新日志',
        duration: 0,
        onClick: () => window.open('#', '_blank'),
      })
    },
  },
}
</script>

<template>
  <LhButton @click="showClickable">带动作的通知</LhButton>
</template>
```

## 关闭按钮

`show-close` 控制关闭按钮显隐（默认显示），`close-label` 自定义其无障碍名称。

<DemoBlock title="关闭按钮">
  <LhButton @click="notifyClosable">显示关闭按钮</LhButton>
  <LhButton @click="notifyNoClose">无关闭按钮</LhButton>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhNotification } from '@lh-ui/vue3'

const notifyClosable = () => LhNotification.info({ title: '提示', content: '可手动关闭', showClose: true, closeLabel: '知道了，关闭' })
const notifyNoClose = () => LhNotification.info({ title: '提示', content: '只能等待自动关闭', showClose: false })
</script>

<template>
  <LhButton @click="notifyClosable">显示关闭按钮</LhButton>
  <LhButton @click="notifyNoClose">无关闭按钮</LhButton>
</template>
```

```vue options
<script>
import { LhNotification } from '@lh-ui/vue3'

export default {
  methods: {
    notifyClosable() {
      LhNotification.info({ title: '提示', content: '可手动关闭', showClose: true, closeLabel: '知道了，关闭' })
    },
    notifyNoClose() {
      LhNotification.info({ title: '提示', content: '只能等待自动关闭', showClose: false })
    },
  },
}
</script>

<template>
  <LhButton @click="notifyClosable">显示关闭按钮</LhButton>
  <LhButton @click="notifyNoClose">无关闭按钮</LhButton>
</template>
```

## API

### LhNotification Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| type | 语义类型 | `"success" \| "warning" \| "error" \| "info" \| "danger"` | `'info'` |
| title | 标题 | `string` | — |
| content | 正文内容 | `string` | — |
| showClose | 是否显示关闭按钮 | `boolean` | `true` |
| closeLabel | 关闭按钮的无障碍名称（未传时取语言包 `notification.close`） | `string` | — |
| onClick | 点击卡片回调（传入后卡片以 button 语义呈现） | `() => void` | — |
| sx | sx 快速布局属性 | `LhSxProps` | — |

服务方法：`LhNotification(options)` / `LhNotification.success/info/warning/danger(options)`，返回 `{ close }` 句柄；另有 `LhNotification.close(id)`、`LhNotification.closeAll()` 与 `LhNotification.config({ duration, offset, appendTo })`。

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| close | 点击条目上的关闭按钮时触发 | — |

命令式用法中，关闭（含自动关闭与手动关闭）通过 Options 的 `onClose` 回调感知。

### Options

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| title | 标题 | `string` | — |
| content | 正文内容 | `string` | — |
| type | 语义类型 | `'success' \| 'warning' \| 'error' \| 'info' \| 'danger'` | `'info'` |
| duration | 自动关闭毫秒数，`0` 表示不自动关闭 | `number` | `4500` |
| position | 弹出位置 | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | `'top-right'` |
| showClose | 是否显示关闭按钮 | `boolean` | `true` |
| sx | sx 快速布局属性 | `LhSxProps` | — |
| onClick | 点击卡片回调 | `() => void` | — |
| onClose | 关闭后的回调 | `() => void` | — |

## 无障碍

- 每个位置的容器为 `role="region"` + `aria-live="polite"`，新通知温和播报，不抢焦点
- 传入 `onClick` 的卡片为 `role="button"`、可 Tab 聚焦，Enter / Space 触发
- 关闭按钮带 `aria-label`（语言包 `notification.close`，可用 `closeLabel` 覆盖）
- 堆叠位移由 CSS 过渡；动效尊重 `prefers-reduced-motion`

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/notification/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

<details id="type-LhNotificationOptions">
<summary><code>LhNotificationOptions</code></summary>

```ts
/** 服务选项 */
export interface LhNotificationOptions {
  /** 标题 */
  title: string
  /** 正文内容 */
  content?: string
  /** 语义类型，默认 info */
  type?: LhNotificationType
  /** 自动关闭毫秒数，0 表示不自动关闭（默认 4500） */
  duration?: number
  /** 弹出位置（默认 top-right） */
  position?: LhNotificationPosition
  /** 是否显示关闭按钮（默认 true） */
  showClose?: boolean
  /** sx 快速布局属性 */
  sx?: LhSxProps
  /** 点击卡片回调（传入后卡片可聚焦、以 button 语义呈现） */
  onClick?: () => void
  /** 关闭（含自动与手动）后的回调 */
  onClose?: () => void
}
```

</details>

<details id="type-LhNotificationHandle">
<summary><code>LhNotificationHandle</code></summary>

```ts
/** 服务句柄 */
export interface LhNotificationHandle {
  close: () => void
}
```

</details>

<details id="type-LhNotificationConfig">
<summary><code>LhNotificationConfig</code></summary>

```ts
/** 全局默认配置项（LhNotification.config） */
export interface LhNotificationConfig {
  duration?: number
  offset?: number
  /** 挂载容器（默认 body） */
  appendTo?: string | HTMLElement
}
```

</details>

<details id="type-LhNotificationProps">
<summary><code>LhNotificationProps</code></summary>

```ts
/** 条目组件 props（服务内部渲染；也可声明式单用） */
export interface LhNotificationProps {
  type?: LhNotificationType
  title: string
  content?: string
  showClose?: boolean
  /** 关闭按钮的无障碍名称（未传时取语言包 notification.close） */
  closeLabel?: string
  /** 传入后卡片可点击 */
  onClick?: () => void
  sx?: LhSxProps
}
```

</details>

<details id="type-LhNotificationType">
<summary><code>LhNotificationType</code> <sub>（来自 @lh-ui/share/core/notification）</sub></summary>

```ts
/** 通知语义类型（四语义，无 loading） */
export type LhNotificationType =
  (typeof LH_TYPES_CONST)[keyof typeof LH_TYPES_CONST]
```

</details>

<details id="type-LhNotificationRecord">
<summary><code>LhNotificationRecord</code> <sub>（来自 @lh-ui/share/core/notification）</sub></summary>

```ts
/** 单条通知在服务队列中的记录形态 */
export interface LhNotificationRecord {
  id: number
  type: LhNotificationType
  title: string
  content: string
  /** 自动关闭毫秒数，0 表示不自动关闭 */
  duration: number
  position: LhNotificationPosition
  showClose: boolean
  sx?: LhSxProps
  onClick?: () => void
  onClose?: () => void
}
```

</details>

<details id="type-LhNotificationPosition">
<summary><code>LhNotificationPosition</code> <sub>（来自 @lh-ui/share/core/notification）</sub></summary>

```ts
/** 通知弹出位置（四角） */
export type LhNotificationPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
```

</details>

### 常量

本组件用到的公开常量如下（可在 Props 表的「类型 / 默认值」列点击同名条目跳转至此）：

<details id="const-LH_NOTIFICATION_POSITION_CONST">
<summary><code>LH_NOTIFICATION_POSITION_CONST</code> <sub>（来自 @lh-ui/share/core/notification）</sub></summary>

```ts
/** 位置常量 */
export const LH_NOTIFICATION_POSITION_CONST = {
  'top-right': 'top-right',
  'top-left': 'top-left',
  'bottom-right': 'bottom-right',
  'bottom-left': 'bottom-left',
} as const
```

</details>

<details id="const-LH_NOTIFICATION_DURATION_DEFAULT">
<summary><code>LH_NOTIFICATION_DURATION_DEFAULT</code> <sub>（来自 @lh-ui/share/core/notification）</sub></summary>

```ts
/** 默认自动关闭时长（通知比消息停留更久） */
export const LH_NOTIFICATION_DURATION_DEFAULT = 4500
```

</details>

<details id="const-LH_NOTIFICATION_GAP_DEFAULT">
<summary><code>LH_NOTIFICATION_GAP_DEFAULT</code> <sub>（来自 @lh-ui/share/core/notification）</sub></summary>

```ts
/** 堆叠间距 px */
export const LH_NOTIFICATION_GAP_DEFAULT = 16
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
import { LhNotification } from '@lh-ui/vue3'

const showBasic = () => LhNotification.info({ title: '同步完成', content: '3 项变更已同步到云端' })
const showInfo = () => LhNotification.info({ title: '提示', content: '内容' })
const showSuccess = () => LhNotification.success({ title: '成功', content: '备份已完成' })
const showWarning = () => LhNotification.warning({ title: '警告', content: '存储空间不足' })
const showDanger = () => LhNotification.danger({ title: '失败', content: '网络连接中断' })
const showAt = (position) => {
  LhNotification.info({ title: '位置示例', content: position, duration: 3000, position })
}
const showClickable = () => {
  LhNotification.info({ title: '发现新版本', content: '点击查看更新日志', duration: 0, onClick: () => {} })
}
const notifyClosable = () => LhNotification.info({ title: '提示', content: '可手动关闭', showClose: true, closeLabel: '知道了，关闭' })
const notifyNoClose = () => LhNotification.info({ title: '提示', content: '只能等待自动关闭', showClose: false })
</script>

<style>
.demo-notification-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
