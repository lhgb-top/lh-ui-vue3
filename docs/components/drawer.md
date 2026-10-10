# Drawer 抽屉

侧滑面板，从屏幕边缘滑入，适合比 Dialog 更贴边的临时操作（详情、筛选、向导步骤）。与 Dialog 一致采用 `role="dialog"` + `aria-modal="true"`，焦点圈在面板内，Esc 与遮罩点击均可关闭。

## 基础用法

<DemoBlock title="右侧抽屉">
  <LhButton @click="basic = true">打开抽屉</LhButton>
  <LhDrawer v-model="basic" title="订单详情">
    <p>这里放置抽屉主体内容。</p>
    <p>面板宽度由 size 控制，默认 30% 视口宽度。</p>
  </LhDrawer>
</DemoBlock>

```vue composition
<template>
  <LhButton @click="basic = true">打开抽屉</LhButton>
  <LhDrawer v-model="basic" title="订单详情">
    <p>这里放置抽屉主体内容。</p>
  </LhDrawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const basic = ref(false)
</script>
```

```vue options
<script>
export default {
  data() {
    return { basic: false }
  },
}
</script>

<template>
  <LhButton @click="basic = true">打开抽屉</LhButton>
  <LhDrawer v-model="basic" title="订单详情">
    <p>这里放置抽屉主体内容。</p>
  </LhDrawer>
</template>
```

## 四个方向

<DemoBlock title="right / left / top / bottom">
  <div class="demo-drawer-row">
    <LhButton @click="openDir('right')">right</LhButton>
    <LhButton @click="openDir('left')">left</LhButton>
    <LhButton @click="openDir('top')">top</LhButton>
    <LhButton @click="openDir('bottom')">bottom</LhButton>
  </div>
  <LhDrawer v-model="dirVisible" :title="`${direction} 抽屉`" :direction="direction" :size="size">
    <p>当前方向：{{ direction }}</p>
  </LhDrawer>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
const dirVisible = ref(false)
const direction = ref<'right' | 'left' | 'top' | 'bottom'>('right')
const size = ref('40%')
function openDir(d: 'right' | 'left' | 'top' | 'bottom') {
  direction.value = d
  dirVisible.value = true
}
</script>

<template>
  <!-- 打开右侧抽屉 -->
  <LhButton @click="openDir('right')">right</LhButton>
  <!-- 打开左侧抽屉 -->
  <LhButton @click="openDir('left')">left</LhButton>
  <!-- 打开顶部抽屉 -->
  <LhButton @click="openDir('top')">top</LhButton>
  <!-- 打开底部抽屉 -->
  <LhButton @click="openDir('bottom')">bottom</LhButton>
  <!-- 按指定方向滑出 -->
  <LhDrawer v-model="dirVisible" :title="`${direction} 抽屉`" :direction="direction" :size="size">
    <p>当前方向：{{ direction }}</p>
  </LhDrawer>
</template>
```

```vue options
<script>
export default {
  data() {
    return { dirVisible: false, direction: 'right', size: '40%' }
  },
  methods: {
    openDir(d) {
      this.direction = d
      this.dirVisible = true
    },
  },
}
</script>

<template>
  <!-- 打开右侧抽屉 -->
  <LhButton @click="openDir('right')">right</LhButton>
  <!-- 打开左侧抽屉 -->
  <LhButton @click="openDir('left')">left</LhButton>
  <!-- 打开顶部抽屉 -->
  <LhButton @click="openDir('top')">top</LhButton>
  <!-- 打开底部抽屉 -->
  <LhButton @click="openDir('bottom')">bottom</LhButton>
  <!-- 按指定方向滑出 -->
  <LhDrawer v-model="dirVisible" :title="`${direction} 抽屉`" :direction="direction" :size="size">
    <p>当前方向：{{ direction }}</p>
  </LhDrawer>
</template>
```

## 自定义尺寸与底部

<DemoBlock title="size 与 footer 插槽">
  <LhButton @click="sized = true">480px 宽抽屉</LhButton>
  <LhDrawer v-model="sized" title="筛选条件" :size="480">
    <div class="demo-drawer-form">
      <LhInput placeholder="按名称筛选" />
      <LhInput placeholder="按标签筛选" />
    </div>
    <template #footer>
      <LhButton @click="sized = false">取消</LhButton>
      <LhButton type="primary" @click="sized = false">应用筛选</LhButton>
    </template>
  </LhDrawer>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const sized = ref(false)
</script>

<template>
  <!-- 打开 480px 宽抽屉 -->
  <LhButton @click="sized = true">480px 宽抽屉</LhButton>
  <!-- 固定尺寸的抽屉，底部为操作区 -->
  <LhDrawer v-model="sized" title="筛选条件" :size="480">
    <LhInput placeholder="按名称筛选" />
    <LhInput placeholder="按标签筛选" />
    <template #footer>
      <LhButton @click="sized = false">取消</LhButton>
      <LhButton type="primary" @click="sized = false">应用筛选</LhButton>
    </template>
  </LhDrawer>
</template>
```

```vue options
<script>
export default {
  data() {
    return { sized: false }
  },
}
</script>

<template>
  <!-- 打开 480px 宽抽屉 -->
  <LhButton @click="sized = true">480px 宽抽屉</LhButton>
  <!-- 固定尺寸的抽屉，底部为操作区 -->
  <LhDrawer v-model="sized" title="筛选条件" :size="480">
    <LhInput placeholder="按名称筛选" />
    <LhInput placeholder="按标签筛选" />
    <template #footer>
      <LhButton @click="sized = false">取消</LhButton>
      <LhButton type="primary" @click="sized = false">应用筛选</LhButton>
    </template>
  </LhDrawer>
</template>
```

> `size` 传数字为 px，传字符串支持百分比（如 `'40%'`）。左右方向作用于宽度，上下方向作用于高度。

## 行为开关

`mask-closable` 禁止点遮罩关闭、`show-close` 隐藏右上角关闭按钮、`close-on-esc` 禁用 Esc 关闭、`lock-scroll` 打开时不锁定页面滚动、`teleport-target` 指定挂载容器。

<DemoBlock title="行为开关">
  <LhButton @click="adv1 = true">仅按钮关闭</LhButton>
  <LhButton @click="adv2 = true">不锁定滚动</LhButton>
  <LhDrawer
    v-model="adv1"
    title="仅按钮关闭"
    :mask-closable="false"
    :show-close="false"
    :close-on-esc="false"
  >
    <p>遮罩点击与 Esc 均不关闭，只能通过按钮关闭。</p>
    <template #footer>
      <LhButton type="primary" @click="adv1 = false">关闭</LhButton>
    </template>
  </LhDrawer>
  <LhDrawer v-model="adv2" title="不锁定滚动" :lock-scroll="false">
    <p>抽屉打开时页面仍可滚动。</p>
  </LhDrawer>
  <LhDrawer v-model="adv3" title="指定挂载容器" teleport-target="#drawer-host">
    <p>面板被传送到 id 为 drawer-host 的容器内。</p>
  </LhDrawer>
  <div id="drawer-host" />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const adv1 = ref(false)
const adv2 = ref(false)
const adv3 = ref(false)
</script>

<template>
  <!-- 打开「仅按钮关闭」抽屉 -->
  <LhButton @click="adv1 = true">仅按钮关闭</LhButton>
  <!-- 打开「不锁定滚动」抽屉 -->
  <LhButton @click="adv2 = true">不锁定滚动</LhButton>
  <!-- 遮罩点击与 Esc 均不关闭 -->
  <LhDrawer
    v-model="adv1"
    title="仅按钮关闭"
    :mask-closable="false"
    :show-close="false"
    :close-on-esc="false"
  >
    <p>遮罩点击与 Esc 均不关闭，只能通过按钮关闭。</p>
    <template #footer>
      <LhButton type="primary" @click="adv1 = false">关闭</LhButton>
    </template>
  </LhDrawer>
  <!-- 打开时页面仍可滚动 -->
  <LhDrawer v-model="adv2" title="不锁定滚动" :lock-scroll="false">
    <p>抽屉打开时页面仍可滚动。</p>
  </LhDrawer>
  <!-- 挂载到指定容器 -->
  <LhDrawer v-model="adv3" title="指定挂载容器" teleport-target="#drawer-host">
    <p>面板被传送到 id 为 drawer-host 的容器内。</p>
  </LhDrawer>
</template>
```

```vue options
<script>
export default {
  data() {
    return { adv1: false, adv2: false, adv3: false }
  },
}
</script>

<template>
  <!-- 打开「仅按钮关闭」抽屉 -->
  <LhButton @click="adv1 = true">仅按钮关闭</LhButton>
  <!-- 打开「不锁定滚动」抽屉 -->
  <LhButton @click="adv2 = true">不锁定滚动</LhButton>
  <!-- 遮罩点击与 Esc 均不关闭 -->
  <LhDrawer
    v-model="adv1"
    title="仅按钮关闭"
    :mask-closable="false"
    :show-close="false"
    :close-on-esc="false"
  >
    <p>遮罩点击与 Esc 均不关闭，只能通过按钮关闭。</p>
    <template #footer>
      <LhButton type="primary" @click="adv1 = false">关闭</LhButton>
    </template>
  </LhDrawer>
  <!-- 打开时页面仍可滚动 -->
  <LhDrawer v-model="adv2" title="不锁定滚动" :lock-scroll="false">
    <p>抽屉打开时页面仍可滚动。</p>
  </LhDrawer>
  <!-- 挂载到指定容器 -->
  <LhDrawer v-model="adv3" title="指定挂载容器" teleport-target="#drawer-host">
    <p>面板被传送到 id 为 drawer-host 的容器内。</p>
  </LhDrawer>
</template>
```

## Drawer API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
| modelValue | 是否显示（v-model） | `boolean` | — |
| title | 标题（也可用 header 插槽） | `string` | — |
| direction | 方向 | `"right" \| "left" \| "top" \| "bottom"` | `'right'` |
| size | 尺寸：数字为 px，字符串支持百分比 | `string \| number` | `'30%'` |
| maskClosable | 点击遮罩是否关闭 | `boolean` | `true` |
| showClose | 是否显示关闭按钮 | `boolean` | `true` |
| teleportTarget | Teleport 目标（选择器或元素，默认 body） | `string \| HTMLElement` | `'body'` |
| lockScroll | 是否锁定页面滚动 | `boolean` | `true` |
| closeOnEsc | 是否响应 Esc 关闭 | `boolean` | `true` |
| themeVars | 组件级主题变量，覆盖 ConfigProvider 配置 | `{ [x: string]: string; }` | — |
| bgPattern | 组件级背景花纹，覆盖 ConfigProvider 配置 | `string` | — |
| sx | sx 快速布局属性（作用于面板） | `SxProps` | — |

### Events

| 事件 | 说明 | 参数 |
| ---- | ---- | ---- |
| update:model-value | 显隐变化 | `(value: boolean)` |
| open | 打开后触发 | — |
| close | 关闭后触发 | — |

### Slots

| 插槽 | 说明 |
| ---- | ---- |
| default | 主体内容 |
| header | 自定义头部（含标题区） |
| footer | 自定义底部操作区 |

### Methods

| 方法 | 说明 |
| ---- | ---- |
| open | 编程式打开 |
| close | 编程式关闭 |

### 无障碍

- `role="dialog"` + `aria-modal="true"`；有标题时通过 `aria-labelledby` 关联，无标题时用语言包 `drawer.title` 作 aria-label 兜底
- 打开时焦点移入面板首个可聚焦元素，Tab 在面板内循环，关闭后归还触发器焦点
- Esc 关闭（可由 `close-on-esc` 关闭该行为）；遮罩为装饰性（`aria-hidden`）
- 关闭按钮为真实 `<button>`，aria-label 取语言包 `drawer.close`
- 进出滑动动效在 `prefers-reduced-motion` 下降级为纯淡入淡出

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/drawer/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

<details id="type-LhDrawerProps">
<summary><code>LhDrawerProps</code></summary>

```ts
/**
 * Drawer 组件 Props
 */
export interface LhDrawerProps {
  /** 是否显示（v-model） */
  modelValue?: boolean
  /** 标题 */
  title?: string
  /** 方向 */
  direction?: LhDrawerDirection
  /** 尺寸：数字为 px，字符串支持百分比 */
  size?: string | number
  /** 点击遮罩是否关闭 */
  maskClosable?: boolean
  /** 是否显示关闭按钮 */
  showClose?: boolean
  /** Teleport 目标（选择器或元素，默认 body） */
  teleportTarget?: string | HTMLElement
  /** 是否锁定页面滚动 */
  lockScroll?: boolean
  /** 是否响应 Esc 关闭 */
  closeOnEsc?: boolean
  /** 组件级主题变量，覆盖 ConfigProvider 配置 */
  themeVars?: Record<string, string>
  /** 组件级背景花纹，覆盖 ConfigProvider 配置 */
  bgPattern?: string
  /** sx 快速布局属性（作用于面板） */
  sx?: SxProps
}
```

</details>

<details id="type-LhDrawerDirection">
<summary><code>LhDrawerDirection</code> <sub>（来自 @lh-ui/share/core/drawer (logic.ts)）</sub></summary>

```ts
/**
 * Drawer 纯函数逻辑（无框架依赖）
 */

/** 抽屉方向 */
export type LhDrawerDirection = 'right' | 'left' | 'top' | 'bottom'
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
import { ref } from 'vue'

const basic = ref(false)
const adv1 = ref(false)
const adv2 = ref(false)
const adv3 = ref(false)
const dirVisible = ref(false)
const direction = ref<'right' | 'left' | 'top' | 'bottom'>('right')
const size = ref('40%')
const sized = ref(false)

function openDir(d: 'right' | 'left' | 'top' | 'bottom') {
  direction.value = d
  dirVisible.value = true
}
</script>

<style scoped>
.demo-drawer-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.demo-drawer-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
