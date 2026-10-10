# Loading 加载

加载中反馈。三种形态：服务式遮罩（`LhLoading.show(...)`，全屏或指定容器）、`v-loading` 指令、基础旋转图形 `LhSpinner`。

## 服务式全屏遮罩

<DemoBlock title="全屏加载">
  <LhButton @click="showFullscreen">全屏加载 2 秒</LhButton>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhLoading } from '@lh-ui/vue3'

const showFullscreen = () => {
  const handle = LhLoading.show({ fullscreen: true, lock: true })
  setTimeout(() => handle.close(), 2000)
}
</script>

<template>
  <LhButton @click="showFullscreen">全屏加载 2 秒</LhButton>
</template>
```

```vue options
<script>
import { LhLoading } from '@lh-ui/vue3'

export default {
  methods: {
    showFullscreen() {
      const handle = LhLoading.show({ fullscreen: true, lock: true })
      setTimeout(() => handle.close(), 2000)
    },
  },
}
</script>

<template>
  <LhButton @click="showFullscreen">全屏加载 2 秒</LhButton>
</template>
```

## 指定容器遮罩

不传 `target` 为全屏；传入选择器或元素则在容器内铺开（`absolute` 铺满最近的定位祖先，`static` 容器自动补 `relative` 并在关闭时还原）。

<DemoBlock title="局部加载">
  <div
    class="demo-loading-box"
    ref="boxRef"
  >
    <LhButton @click="showBox">容器内加载</LhButton>
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhLoading } from '@lh-ui/vue3'

const boxRef = ref<HTMLElement>()

const showBox = () => {
  const handle = LhLoading.show({ target: boxRef.value, text: '拼命加载中', lock: true })
  setTimeout(() => handle.close(), 2000)
}
</script>

<template>
  <div
    ref="boxRef"
    class="demo-loading-box"
  >
    <LhButton @click="showBox">容器内加载</LhButton>
  </div>
</template>
```

```vue options
<script>
import { LhLoading } from '@lh-ui/vue3'

export default {
  methods: {
    showBox() {
      const handle = LhLoading.show({ target: this.$refs.boxRef, text: '拼命加载中', lock: true })
      setTimeout(() => handle.close(), 2000)
    },
  },
}
</script>

<template>
  <div
    ref="boxRef"
    class="demo-loading-box"
  >
    <LhButton @click="showBox">容器内加载</LhButton>
  </div>
</template>
```

## v-loading 指令

`app.use(LhLoading)`（或全量引入）后注册 `v-loading` 指令，布尔值控制显隐。

```vue composition
<template>
  <div v-loading="busy" class="table-zone">…</div>
  <div v-loading:text="'自定义文案'" :style="busy2 ? 'height:200px' : ''">…</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const busy = ref(false)
const busy2 = ref(false)
</script>
```

```vue options
<template>
  <div v-loading="busy" class="table-zone">…</div>
  <div v-loading:text="'自定义文案'" :style="busy2 ? 'height:200px' : ''">…</div>
</template>

<script>
export default {
  data() {
    return { busy: false, busy2: false }
  },
}
</script>
```

## LhSpinner 旋转图形

基础旋转图形，可独立使用（loading 语义遮罩内部同样由它呈现）。

<DemoBlock title="LhSpinner">
  <div class="demo-loading-row">
    <LhSpinner size="small" />
    <LhSpinner size="medium" />
    <LhSpinner size="large" color="#8f9779" />
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <div class="demo-loading-row">
    <LhSpinner size="small" />
    <LhSpinner size="medium" />
    <LhSpinner size="large" color="#8f9779" />
  </div>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <div class="demo-loading-row">
    <LhSpinner size="small" />
    <LhSpinner size="medium" />
    <LhSpinner size="large" color="#8f9779" />
  </div>
</template>
```

## 自定义外观

`text` 自定义提示文字、`background` 设置遮罩背景、`z-index` 控制层叠顺序、`spinner` 关闭旋转图形。

<DemoBlock title="自定义外观">
  <LhButton @click="showStyled">自定义外观加载 2 秒</LhButton>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhLoading } from '@lh-ui/vue3'

const showStyled = () => {
  const handle = LhLoading.show({
    text: '正在同步数据…',
    background: 'rgba(42, 37, 32, 0.6)',
    zIndex: 4000,
    spinner: false,
  })
  setTimeout(() => handle.close(), 2000)
}
</script>

<template>
  <LhButton @click="showStyled">自定义外观加载 2 秒</LhButton>
</template>
```

```vue options
<script>
import { LhLoading } from '@lh-ui/vue3'

export default {
  methods: {
    showStyled() {
      const handle = LhLoading.show({
        text: '正在同步数据…',
        background: 'rgba(42, 37, 32, 0.6)',
        zIndex: 4000,
        spinner: false,
      })
      setTimeout(() => handle.close(), 2000)
    },
  },
}
</script>

<template>
  <LhButton @click="showStyled">自定义外观加载 2 秒</LhButton>
</template>
```

## API

### LhLoadingMask Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| fullscreen | 是否全屏（目标是 body 时为 true） | `boolean` | — |
| text | 加载提示文案（未传时取语言包 `loading.text`） | `string` | — |
| background | 遮罩背景色（CSS background 值） | `string` | — |
| zIndex | 层级 | `number` | — |
| spinner | 是否显示旋转图标 | `boolean` | `true` |
| sx | sx 快速布局属性 | `SxProps` | — |

服务：`LhLoading.show({ target?, text?, background?, lock?, spinner?, sx? })` 返回 `{ close }`；`app.use(LhLoading)` 注册 `v-loading` 指令。

## 无障碍

- 遮罩为 `role="status"` + `aria-busy="true"`，提示文案作为 `aria-label` 播报
- 指定容器时 `inert` 可用（渐进增强）则容器对键盘与辅助技术不可达，防止操作底层数据
- `lock` 锁滚动，关闭后还原；遮罩关闭时恢复容器原始定位与滚动状态
- 旋转动效尊重 `prefers-reduced-motion`

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/loading/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

<details id="type-LhLoadingMaskProps">
<summary><code>LhLoadingMaskProps</code></summary>

```ts
/** 遮罩组件 props（服务/指令内部渲染） */
export interface LhLoadingMaskProps {
  /** 是否全屏（目标是 body 时为 true） */
  fullscreen?: boolean
  /** 加载提示文案（未传时取语言包 loading.text） */
  text?: string
  /** 遮罩背景色（CSS background 值） */
  background?: string
  /** 层级 */
  zIndex?: number
  /** 是否显示旋转图标（默认 true） */
  spinner?: boolean
  sx?: SxProps
}
```

</details>

<details id="type-LhLoadingOptions">
<summary><code>LhLoadingOptions</code> <sub>（来自 @lh-ui/share/core/loading）</sub></summary>

```ts
/** 加载遮罩选项（服务与指令共用） */
export interface LhLoadingOptions {
  /** 挂载目标：选择器字符串 / 元素；不传为全屏 */
  target?: string | HTMLElement
  /** 加载提示文案（未传时取语言包 loading.text） */
  text?: string
  /** 遮罩背景色（CSS background 值） */
  background?: string
  /** 是否锁定滚动（全屏遮罩锁 body，指定目标锁目标自身的滚动） */
  lock?: boolean
  /** 是否显示旋转图标 */
  spinner?: boolean
  sx?: SxProps
}
```

</details>

<details id="type-LhLoadingHandle">
<summary><code>LhLoadingHandle</code> <sub>（来自 @lh-ui/share/core/loading）</sub></summary>

```ts
/** 服务句柄 */
export interface LhLoadingHandle {
  close: () => void
}
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
import { ref } from 'vue'
import { LhLoading } from '@lh-ui/vue3'

const boxRef = ref<HTMLElement>()

const showFullscreen = () => {
  const handle = LhLoading.show({ lock: true })
  setTimeout(() => handle.close(), 2000)
}

const showBox = () => {
  const handle = LhLoading.show({ target: boxRef.value, text: '拼命加载中', lock: true })
  setTimeout(() => handle.close(), 2000)
}
const showStyled = () => {
  const handle = LhLoading.show({
    text: '正在同步数据…',
    background: 'rgba(42, 37, 32, 0.6)',
    zIndex: 4000,
    spinner: false,
  })
  setTimeout(() => handle.close(), 2000)
}
</script>

<style>
.demo-loading-box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 140px;
  padding: 16px;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 8px;
}

.demo-loading-row {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
