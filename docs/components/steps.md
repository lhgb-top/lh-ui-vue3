# Steps 步骤条

流程步骤指示：当前/完成/等待/错误四态，水平/垂直方向，可选点击导航。横向步骤条按定宽基准自动折行，标题始终一行显示。

## 基础用法

<DemoBlock title="基础用法">
  <LhSteps :current="1">
    <LhStep title="研墨" />
    <LhStep title="落笔" />
    <LhStep title="钤印" />
  </LhSteps>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhSteps :current="1">
    <LhStep title="研墨" />
    <LhStep title="落笔" />
    <LhStep title="钤印" />
  </LhSteps>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhSteps :current="1">
    <LhStep title="研墨" />
    <LhStep title="落笔" />
    <LhStep title="钤印" />
  </LhSteps>
</template>
```

## 带描述

<DemoBlock title="带描述">
  <LhSteps :current="1">
    <LhStep title="注册" description="填写基本信息" />
    <LhStep title="验证" description="邮箱与手机验证" />
    <LhStep title="开通" description="开通账号权限" />
  </LhSteps>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhSteps :current="1">
    <LhStep title="注册" description="填写基本信息" />
    <LhStep title="验证" description="邮箱与手机验证" />
    <LhStep title="开通" description="开通账号权限" />
  </LhSteps>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhSteps :current="1">
    <LhStep title="注册" description="填写基本信息" />
    <LhStep title="验证" description="邮箱与手机验证" />
    <LhStep title="开通" description="开通账号权限" />
  </LhSteps>
</template>
```

`icon` 为步骤指定自定义图标（取内置 `LhIcon` 图标名，如 `user`/`check`/`star`），未传时完成/错误用勾叉，其余显示序号。需要完全自定义图标渲染时，可用 `#icon` 插槽覆盖。

<DemoBlock title="自定义图标">
  <LhSteps :current="1">
    <LhStep icon="user" title="注册" />
    <LhStep icon="check" title="验证" />
    <LhStep icon="star" title="开通" />
  </LhSteps>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhSteps :current="1">
    <LhStep icon="user" title="注册" />
    <LhStep icon="check" title="验证" />
    <LhStep icon="star" title="开通" />
  </LhSteps>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhSteps :current="1">
    <LhStep icon="user" title="注册" />
    <LhStep icon="check" title="验证" />
    <LhStep icon="star" title="开通" />
  </LhSteps>
</template>
```

## 错误状态

<DemoBlock title="错误状态">
  <LhSteps :current="1" status="error">
    <LhStep title="上传" />
    <LhStep title="校验" />
    <LhStep title="完成" />
  </LhSteps>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhSteps :current="1" status="error">
    <LhStep title="上传" />
    <LhStep title="校验" />
    <LhStep title="完成" />
  </LhSteps>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhSteps :current="1" status="error">
    <LhStep title="上传" />
    <LhStep title="校验" />
    <LhStep title="完成" />
  </LhSteps>
</template>
```

> `status` 为整体覆盖：设置后所有步骤均为该状态，适合自定义展示。

## 可点击导航

<DemoBlock title="可点击导航">
  <LhSteps v-model:current="current" clickable>
    <LhStep title="选稿" description="挑选底本" />
    <LhStep title="临摹" description="对临或背临" />
    <LhStep title="装裱" description="上墙装裱" />
  </LhSteps>
  <p class="demo-steps-current">当前步骤：{{ current }}</p>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
const current = ref(1)
</script>

<template>
  <LhSteps v-model:current="current" clickable>
    <LhStep title="选稿" description="挑选底本" />
    <LhStep title="临摹" description="对临或背临" />
    <LhStep title="装裱" description="上墙装裱" />
  </LhSteps>
</template>
```

```vue options
<script>
export default {
  data() {
    return { current: 1 }
  },
}
</script>

<template>
  <LhSteps v-model:current="current" clickable>
    <LhStep title="选稿" description="挑选底本" />
    <LhStep title="临摹" description="对临或背临" />
    <LhStep title="装裱" description="上墙装裱" />
  </LhSteps>
</template>
```

## 垂直方向

<DemoBlock title="垂直方向">
  <LhSteps :current="1" direction="vertical">
    <LhStep title="起" description="起势藏锋" />
    <LhStep title="行" description="行笔中锋" />
    <LhStep title="收" description="收笔回锋" />
  </LhSteps>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhSteps :current="1" direction="vertical">
    <LhStep title="起" description="起势藏锋" />
    <LhStep title="行" description="行笔中锋" />
    <LhStep title="收" description="收笔回锋" />
  </LhSteps>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhSteps :current="1" direction="vertical">
    <LhStep title="起" description="起势藏锋" />
    <LhStep title="行" description="行笔中锋" />
    <LhStep title="收" description="收笔回锋" />
  </LhSteps>
</template>
```

## 定宽折行

横向步骤条按 `--lh-steps-item-basis`（默认 `160px`）的基准宽度排布：容器放得下时各步等分一行，放不下时整步折到下一行，而不是把标题挤换行。标题始终单行显示，超长时以省略号截断；折行后行末步骤的连接线会自动隐藏，不指向行尾空白。

<DemoBlock title="定宽折行">
  <div class="demo-steps-narrow">
    <LhSteps :current="1">
      <LhStep title="选稿" description="挑选底本" />
      <LhStep title="临摹" description="对临或背临" />
      <LhStep title="题跋" description="题款盖章" />
      <LhStep title="装裱" description="上墙装裱" />
    </LhSteps>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhSteps :current="1">
    <LhStep title="选稿" description="挑选底本" />
    <LhStep title="临摹" description="对临或背临" />
    <LhStep title="题跋" description="题款盖章" />
    <LhStep title="装裱" description="上墙装裱" />
  </LhSteps>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhSteps :current="1">
    <LhStep title="选稿" description="挑选底本" />
    <LhStep title="临摹" description="对临或背临" />
    <LhStep title="题跋" description="题款盖章" />
    <LhStep title="装裱" description="上墙装裱" />
  </LhSteps>
</template>
```

> 上例容器限宽 `280px` 以演示折行。想改变折行节奏时，通过 `themeVars` 覆盖 `steps-item-basis`（键自动加 `--lh-` 前缀）即可：`<LhSteps :theme-vars="{ 'steps-item-basis': '220px' }">`，也可经 `LhConfigProvider` 的 `componentTheme.steps` 全局配置。

## Steps API

### LhSteps Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| current | 当前步骤索引（`v-model:current`，0 起） | `number` | `0` |
| direction | 方向 | `"horizontal" \| "vertical"` | `'horizontal'` |
| clickable | 步骤是否可点击导航 | `boolean` | `false` |
| status | 整体覆盖所有步骤的状态（用于自定义展示） | `"wait" \| "process" \| "finish" \| "error"` | — |
| themeVars | 组件级主题变量（键自动加 --lh- 前缀） | `{ [x: string]: string; }` | — |
| sx | sx 快速布局属性 | `LhSxProps` | — |

### LhSteps Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:current | 当前步骤变化（v-model） | `(index: number)` |
| change | 当前步骤变化 | `(index: number)` |

### LhStep Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| title | 步骤标题（也可用 title 插槽） | `string` | `''` |
| description | 步骤描述（也可用 description 插槽） | `string` | `''` |
| icon | 自定义图标名称（内置 LhIcon 图标，未传时 finish/error 用勾叉，其余显示序号） | `LhIconName` | — |

### Slots

| 插槽名 | 说明 | 作用组件 |
|--------|------|----------|
| default | 步骤项（LhStep 列表） | LhSteps |
| title | 自定义标题 | LhStep |
| description | 自定义描述 | LhStep |
| icon | 自定义图标（覆盖 icon prop 的默认渲染） | LhStep |

### 组件级变量

以下 CSS 变量在 `.lh-steps` 上定义默认值，可通过 `themeVars` 全局或组件级覆盖（键自动加 `--lh-` 前缀）：

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `--lh-steps-item-basis` | 横向步骤项的定宽基准宽度，容器放不下时按此宽度折行 | `160px` |

### 无障碍

- 容器为 `<ol role="list">`，语义顺序即流程顺序
- 当前步骤自动设置 `aria-current="step"`
- `clickable` 时已完成/当前步骤的头部是真实 `<button>`，aria-label 取语言包（`steps.finish` / `steps.error` / `steps.step`）；等待中的步骤不可点击，避免引导用户跳过未到达的阶段
- 连接线由伪元素绘制，天然不进入无障碍树

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/steps/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

<details id="type-LhStepsProps">
<summary><code>LhStepsProps</code></summary>

```ts
export interface LhStepsProps {
  /** 当前步骤索引（v-model:current，0 起） */
  current?: number
  /** 方向 */
  direction?: LhStepsDirection
  /** 步骤是否可点击导航 */
  clickable?: boolean
  /** 整体覆盖所有步骤的状态（用于自定义展示） */
  status?: LhStepStatus
  /** 组件级主题变量（键自动加 --lh- 前缀，如 `steps-item-basis`） */
  themeVars?: Record<string, string>
  /** sx 快速布局属性 */
  sx?: LhSxProps
}
```

</details>

<details id="type-LhStepProps">
<summary><code>LhStepProps</code></summary>

```ts
export interface LhStepProps {
  /** 步骤标题（也可用 title 插槽） */
  title?: string
  /** 步骤描述（也可用 description 插槽） */
  description?: string
  /** 自定义图标名称（未传时 finish/error 用勾叉，其余显示序号） */
  icon?: LhIconName
}
```

</details>

<details id="type-LhIconName">
<summary><code>LhIconName</code> <sub>（来自 @lh-ui/share/core/icon (svgs.ts)）</sub></summary>

```ts
export type LhIconName = keyof typeof LH_ICON_SVGS_CONST
```

</details>

<details id="type-LhStepsDirection">
<summary><code>LhStepsDirection</code> <sub>（来自 @lh-ui/share/core/steps）</sub></summary>

```ts
/**
 * 步骤条方向
 */
export type LhStepsDirection = 'horizontal' | 'vertical'
```

</details>

<details id="type-LhStepStatus">
<summary><code>LhStepStatus</code> <sub>（来自 @lh-ui/share/core/steps）</sub></summary>

```ts
/**
 * 步骤状态
 */
export type LhStepStatus = 'wait' | 'process' | 'finish' | 'error'
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
import { ref } from 'vue'
const current = ref(1)
</script>

<style scoped>
.demo-steps-narrow {
  width: 280px;
  max-width: 100%;
}
</style>
