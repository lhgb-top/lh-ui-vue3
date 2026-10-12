# Popover 弹出框

富内容弹出层：比 Tooltip 承载更多信息（标题、正文、操作按钮）。触发器包裹在默认插槽里，弹出内容通过 `content` 插槽传入。点击触发时弹出层是 `role="dialog"` 并圈住焦点，悬停触发时只展示内容、不打断键盘流。

## 基础用法

<DemoBlock title="点击触发">
  <LhPopover title="水墨提示" placement="top">
    <LhButton>点击弹出</LhButton>
    <template #content>
      <p>这是一段富内容，可以放置任意 markup。</p>
    </template>
  </LhPopover>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhPopover title="水墨提示" placement="top">
    <LhButton>点击弹出</LhButton>
    <template #content>
      <p>这是一段富内容，可以放置任意 markup。</p>
    </template>
  </LhPopover>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhPopover title="水墨提示" placement="top">
    <LhButton>点击弹出</LhButton>
    <template #content>
      <p>这是一段富内容，可以放置任意 markup。</p>
    </template>
  </LhPopover>
</template>
```

## 触发方式

<DemoBlock title="hover / focus / manual">
  <div class="demo-popover-row">
    <LhPopover trigger="hover" title="悬停触发" :show-after="0">
      <LhButton>悬停我</LhButton>
      <template #content><p>指针移进弹出层不会触发关闭。</p></template>
    </LhPopover>
    <LhPopover trigger="focus" title="聚焦触发" :show-after="0">
      <LhInput placeholder="聚焦输入框" />
      <template #content><p>输入框获得焦点时展示。</p></template>
    </LhPopover>
    <LhPopover v-model:visible="manualVisible" trigger="manual" title="手动控制">
      <LhButton @click="manualVisible = !manualVisible">外部开关</LhButton>
      <template #content><p>显隐完全由外部 v-model 控制。</p></template>
    </LhPopover>
  </div>
</DemoBlock>

```vue composition
<template>
  <!-- 悬停触发 -->
  <LhPopover trigger="hover" title="悬停触发" :show-after="0">
    <LhButton>悬停我</LhButton>
    <template #content><p>指针移进弹出层不会触发关闭。</p></template>
  </LhPopover>
  <!-- 聚焦触发 -->
  <LhPopover trigger="focus" title="聚焦触发" :show-after="0">
    <LhInput placeholder="聚焦输入框" />
    <template #content><p>输入框获得焦点时展示。</p></template>
  </LhPopover>
  <!-- 手动控制 -->
  <LhPopover v-model:visible="manualVisible" trigger="manual" title="手动控制">
    <LhButton @click="manualVisible = !manualVisible">外部开关</LhButton>
    <template #content><p>显隐完全由外部 v-model 控制。</p></template>
  </LhPopover>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const manualVisible = ref(false)
</script>
```

```vue options
<template>
  <!-- 悬停触发 -->
  <LhPopover trigger="hover" title="悬停触发" :show-after="0">
    <LhButton>悬停我</LhButton>
    <template #content><p>指针移进弹出层不会触发关闭。</p></template>
  </LhPopover>
  <!-- 聚焦触发 -->
  <LhPopover trigger="focus" title="聚焦触发" :show-after="0">
    <LhInput placeholder="聚焦输入框" />
    <template #content><p>输入框获得焦点时展示。</p></template>
  </LhPopover>
  <!-- 手动控制 -->
  <LhPopover v-model:visible="manualVisible" trigger="manual" title="手动控制">
    <LhButton @click="manualVisible = !manualVisible">外部开关</LhButton>
    <template #content><p>显隐完全由外部 v-model 控制。</p></template>
  </LhPopover>
</template>

<script>
export default {
  data() {
    return { manualVisible: false }
  },
}
</script>
```

## 十二种方位

<DemoBlock title="placement">
  <div class="demo-popover-grid">
    <LhPopover
      v-for="p in placements"
      :key="p"
      :placement="p"
      :title="p"
      trigger="hover"
      :show-after="0"
    >
      <LhButton size="small">{{ p }}</LhButton>
      <template #content><p>方位：{{ p }}</p></template>
    </LhPopover>
  </div>
</DemoBlock>

```vue composition
<template>
  <LhPopover
    v-for="p in placements"
    :key="p"
    :placement="p"
    :title="p"
    trigger="hover"
    :show-after="0"
  >
    <LhButton size="small">{{ p }}</LhButton>
    <template #content><p>方位：{{ p }}</p></template>
  </LhPopover>
</template>

<script setup lang="ts">
const placements = [
  'top', 'top-start', 'top-end',
  'bottom', 'bottom-start', 'bottom-end',
  'left', 'left-start', 'left-end',
  'right', 'right-start', 'right-end',
] as const
</script>
```

```vue options
<template>
  <LhPopover
    v-for="p in placements"
    :key="p"
    :placement="p"
    :title="p"
    trigger="hover"
    :show-after="0"
  >
    <LhButton size="small">{{ p }}</LhButton>
    <template #content><p>方位：{{ p }}</p></template>
  </LhPopover>
</template>

<script>
export default {
  data() {
    return {
      placements: [
        'top', 'top-start', 'top-end',
        'bottom', 'bottom-start', 'bottom-end',
        'left', 'left-start', 'left-end',
        'right', 'right-start', 'right-end',
      ],
    }
  },
}
</script>
```

> 视口空间不足时弹出层会自动翻转方向（flip）并夹回交叉轴（shift），箭头位置随之切换。

## 嵌套交互内容

<DemoBlock title="表单示例">
  <LhPopover placement="right" title="快速备注">
    <LhButton>添加备注</LhButton>
    <template #content>
      <div class="demo-popover-form">
        <LhInput v-model="note" placeholder="填写备注内容" />
        <LhButton type="primary" @click="saveNote">保存</LhButton>
      </div>
    </template>
  </LhPopover>
  <p v-if="saved" class="demo-popover-saved">已保存：{{ saved }}</p>
</DemoBlock>

```vue composition
<template>
  <LhPopover placement="right" title="快速备注">
    <LhButton>添加备注</LhButton>
    <template #content>
      <div class="demo-popover-form">
        <LhInput v-model="note" placeholder="填写备注内容" />
        <LhButton type="primary" @click="saveNote">保存</LhButton>
      </div>
    </template>
  </LhPopover>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const note = ref('')
const saved = ref('')
function saveNote() {
  saved.value = note.value
  note.value = ''
}
</script>
```

```vue options
<template>
  <LhPopover placement="right" title="快速备注">
    <LhButton>添加备注</LhButton>
    <template #content>
      <div class="demo-popover-form">
        <LhInput v-model="note" placeholder="填写备注内容" />
        <LhButton type="primary" @click="saveNote">保存</LhButton>
      </div>
    </template>
  </LhPopover>
</template>

<script>
export default {
  data() {
    return { note: '', saved: '' }
  },
  methods: {
    saveNote() {
      this.saved = this.note
      this.note = ''
    },
  },
}
</script>
```

## 更多属性

<DemoBlock title="disabled / arrow / width / hideAfter / popperClass / teleportTarget">
  <div class="demo-popover-row">
    <LhPopover disabled title="已禁用">
      <LhButton disabled>禁用触发器</LhButton>
      <template #content><p>disabled 时触发器与弹出层均不响应。</p></template>
    </LhPopover>
    <LhPopover title="无箭头" :arrow="false" :show-after="0">
      <LhButton>无箭头</LhButton>
      <template #content><p>arrow 为 false 时不渲染指向箭头。</p></template>
    </LhPopover>
    <LhPopover title="固定宽度" width="240" :show-after="0">
      <LhButton>固定宽度</LhButton>
      <template #content><p>通过 width 指定弹出层宽度，这里为 240px。</p></template>
    </LhPopover>
    <LhPopover title="延迟隐藏" :hide-after="800" :show-after="0">
      <LhButton>延迟隐藏</LhButton>
      <template #content><p>移出触发器后延迟 800ms 才收起。</p></template>
    </LhPopover>
    <LhPopover title="自定义类名" popper-class="demo-popper-accent" :show-after="0">
      <LhButton>自定义类名</LhButton>
      <template #content><p>popperClass 会加在弹出层根元素上，可用于定制样式。</p></template>
    </LhPopover>
    <LhPopover title="指定传送目标" teleport-target="#demo-popover-host" :show-after="0">
      <LhButton>Teleport 容器</LhButton>
      <template #content><p>弹出层被传送到下方容器而非 body。</p></template>
    </LhPopover>
  </div>
  <div id="demo-popover-host" class="demo-popover-host">Teleport 容器（#demo-popover-host）</div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- 已禁用 -->
  <LhPopover disabled title="已禁用">
    <LhButton disabled>禁用触发器</LhButton>
    <template #content><p>disabled 时触发器与弹出层均不响应。</p></template>
  </LhPopover>
  <!-- 无箭头 -->
  <LhPopover title="无箭头" :arrow="false" :show-after="0">
    <LhButton>无箭头</LhButton>
    <template #content><p>arrow 为 false 时不渲染指向箭头。</p></template>
  </LhPopover>
  <!-- 固定宽度 -->
  <LhPopover title="固定宽度" width="240" :show-after="0">
    <LhButton>固定宽度</LhButton>
    <template #content><p>通过 width 指定弹出层宽度，这里为 240px。</p></template>
  </LhPopover>
  <!-- 延迟隐藏 -->
  <LhPopover title="延迟隐藏" :hide-after="800" :show-after="0">
    <LhButton>延迟隐藏</LhButton>
    <template #content><p>移出触发器后延迟 800ms 才收起。</p></template>
  </LhPopover>
  <!-- 自定义类名 -->
  <LhPopover title="自定义类名" popper-class="demo-popper-accent" :show-after="0">
    <LhButton>自定义类名</LhButton>
    <template #content><p>popperClass 会加在弹出层根元素上，可用于定制样式。</p></template>
  </LhPopover>
  <!-- 指定传送目标 -->
  <LhPopover title="指定传送目标" teleport-target="#demo-popover-host" :show-after="0">
    <LhButton>Teleport 容器</LhButton>
    <template #content><p>弹出层被传送到下方容器而非 body。</p></template>
  </LhPopover>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- 已禁用 -->
  <LhPopover disabled title="已禁用">
    <LhButton disabled>禁用触发器</LhButton>
    <template #content><p>disabled 时触发器与弹出层均不响应。</p></template>
  </LhPopover>
  <!-- 无箭头 -->
  <LhPopover title="无箭头" :arrow="false" :show-after="0">
    <LhButton>无箭头</LhButton>
    <template #content><p>arrow 为 false 时不渲染指向箭头。</p></template>
  </LhPopover>
  <!-- 固定宽度 -->
  <LhPopover title="固定宽度" width="240" :show-after="0">
    <LhButton>固定宽度</LhButton>
    <template #content><p>通过 width 指定弹出层宽度，这里为 240px。</p></template>
  </LhPopover>
  <!-- 延迟隐藏 -->
  <LhPopover title="延迟隐藏" :hide-after="800" :show-after="0">
    <LhButton>延迟隐藏</LhButton>
    <template #content><p>移出触发器后延迟 800ms 才收起。</p></template>
  </LhPopover>
  <!-- 自定义类名 -->
  <LhPopover title="自定义类名" popper-class="demo-popper-accent" :show-after="0">
    <LhButton>自定义类名</LhButton>
    <template #content><p>popperClass 会加在弹出层根元素上，可用于定制样式。</p></template>
  </LhPopover>
  <!-- 指定传送目标 -->
  <LhPopover title="指定传送目标" teleport-target="#demo-popover-host" :show-after="0">
    <LhButton>Teleport 容器</LhButton>
    <template #content><p>弹出层被传送到下方容器而非 body。</p></template>
  </LhPopover>
</template>
```

<style>
.demo-popper-accent {
  border: 1px solid var(--lh-primary-color);
}
</style>

## 受控显隐

`v-model:visible` 手动控制弹出层显隐。

<DemoBlock title="受控显隐">
  <LhPopover v-model:visible="popVisible" title="受控弹出层" trigger="manual">
    <LhButton>{{ popVisible ? '收起' : '展开' }}</LhButton>
    <template #content><p>由按钮与 v-model:visible 联动控制。</p></template>
  </LhPopover>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
const popVisible = ref(false)
</script>

<template>
  <LhPopover v-model:visible="popVisible" title="受控弹出层" trigger="manual">
    <LhButton>{{ popVisible ? '收起' : '展开' }}</LhButton>
  </LhPopover>
</template>
```

```vue options
<script>
export default {
  data() {
    return { popVisible: false }
  },
}
</script>

<template>
  <LhPopover v-model:visible="popVisible" title="受控弹出层" trigger="manual">
    <LhButton>{{ popVisible ? '收起' : '展开' }}</LhButton>
  </LhPopover>
</template>
```

## Popover API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
| placement | 展示位置 | `"top" \| "top-start" \| "top-end" \| "bottom" \| "bottom-start" \| "bottom-end" \| "left" \| "left-start" \| "left-end" \| "right" \| "right-start" \| "right-end"` | `'top'` |
| trigger | 触发方式 | `"click" \| "hover" \| "focus" \| "manual"` | `'click'` |
| title | 标题（也可用 title 插槽） | `string` | — |
| visible | 手动控制的显示状态（v-model:visible） | `boolean` | — |
| disabled | 是否禁用 | `boolean` | — |
| arrow | 是否显示箭头 | `boolean` | `true` |
| width | 弹出层宽度 | `string \| number` | — |
| popperClass | 弹出层自定义类名 | `string` | — |
| teleportTarget | Teleport 目标（选择器或元素） | `string \| HTMLElement` | `'body'` |
| showAfter | 延迟显示时间（ms） | `number` | — |
| hideAfter | 延迟隐藏时间（ms） | `number` | — |
| themeVars | 组件级主题变量，覆盖 ConfigProvider 配置 | `{ [x: string]: string; }` | — |
| bgPattern | 组件级背景花纹，覆盖 ConfigProvider 配置 | `string` | — |
| sx | sx 快速布局属性（作用于触发器根元素） | `LhSxProps` | — |

### Events

| 事件 | 说明 | 参数 |
| ---- | ---- | ---- |
| update:visible | 显隐变化 | `(value: boolean)` |
| show | 显示后触发 | — |
| hide | 隐藏后触发 | — |

### Slots

| 插槽 | 说明 |
| ---- | ---- |
| default | 触发器内容 |
| title | 自定义标题 |
| content | 弹出内容 |

### Methods

| 方法 | 说明 |
| ---- | ---- |
| show | 编程式显示 |
| hide | 编程式隐藏 |
| toggle | 编程式切换 |

### 无障碍

- 点击触发时弹出层为 `role="dialog"` + `aria-modal="true"`，触发器带 `aria-haspopup` / `aria-expanded`
- 点击触发会把焦点移入弹出层首个可聚焦元素，Tab 在弹出层内循环，关闭后归还触发器焦点
- 悬停/聚焦触发时不移动焦点，避免打断键盘操作
- Escape 关闭、点击弹出层外部关闭；有标题时通过 `aria-labelledby` 关联
- 定位引擎为自研纯函数（flip/shift 防溢出），零第三方运行时依赖

> **触发器滚出视口即收起**：弹出层为 `fixed` 定位，触发器离开视口后它不会再随触发器移动，
> 会以高 z-index 悬浮在页面内容上。因此无论何种触发方式（含 `manual` 受控模式），
> 触发器整体滚出视口时面板都会收起，并抛出 `update:visible` 同步外部状态。

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/popover/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

<details id="type-LhPopoverProps">
<summary><code>LhPopoverProps</code></summary>

```ts
/**
 * Popover 组件 Props
 */
export interface LhPopoverProps {
  /** 展示位置 */
  placement?: LhPlacement
  /** 触发方式 */
  trigger?: LhPopoverTrigger
  /** 标题 */
  title?: string
  /** 手动控制的显示状态（v-model:visible） */
  visible?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 是否显示箭头 */
  arrow?: boolean
  /** 弹出层宽度 */
  width?: string | number
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
  sx?: LhSxProps
}
```

</details>

<details id="type-LhPopoverPlacement">
<summary><code>LhPopoverPlacement</code> <sub>（来自 @lh-ui/share/core/shared/popper）</sub></summary>

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

<details id="type-LhPopoverTrigger">
<summary><code>LhPopoverTrigger</code> <sub>（来自 @lh-ui/share/core/popover (logic.ts)）</sub></summary>

```ts
/** 触发方式 */
export type LhPopoverTrigger = 'click' | 'hover' | 'focus' | 'manual'
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
import { ref } from 'vue'

const manualVisible = ref(false)
const placements = [
  'top', 'top-start', 'top-end',
  'bottom', 'bottom-start', 'bottom-end',
  'left', 'left-start', 'left-end',
  'right', 'right-start', 'right-end',
] as const
const note = ref('')
const saved = ref('')
function saveNote() {
  if (!note.value) return
  saved.value = note.value
  note.value = ''
}
const popVisible = ref(false)
</script>

<style scoped>
.demo-popover-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}
.demo-popover-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  width: 100%;
}
.demo-popover-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 220px;
}
.demo-popover-saved {
  margin-top: 12px;
  color: var(--lh-text-secondary);
}
.demo-popover-host {
  margin-top: 16px;
  width: 100%;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed var(--lh-border-color, #d4cfc6);
  border-radius: 6px;
  color: var(--lh-text-secondary);
}
</style>
