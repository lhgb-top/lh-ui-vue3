# Image 图片

带加载失败占位的图片，可选全屏预览（缩放 / 旋转 / 多图切换）。原生 `loading="lazy"` + `decoding="async"`。

## 基础用法

<DemoBlock title="基础用法">
  <LhImage
    src="https://picsum.photos/240/140"
    alt="示例图片"
    width="240"
    style="width: 240px"
  />
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- 基础用法 -->
  <LhImage src="https://picsum.photos/240/140" alt="示例图片" width="240" style="width: 240px" />
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- 基础用法 -->
  <LhImage src="https://picsum.photos/240/140" alt="示例图片" width="240" style="width: 240px" />
</template>
```

## 预览

<DemoBlock title="点击预览">
  <LhImage
    src="https://picsum.photos/240/140?random=2"
    alt="可预览图片"
    preview
    :preview-src-list="['https://picsum.photos/600/400?random=2', 'https://picsum.photos/600/400?random=3']"
    style="width: 240px"
  />
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- 点击预览 -->
  <LhImage
    src="https://picsum.photos/240/140?random=2"
    alt="可预览图片"
    preview
    :preview-src-list="['https://picsum.photos/600/400?random=2', 'https://picsum.photos/600/400?random=3']"
    style="width: 240px"
  />
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- 点击预览 -->
  <LhImage
    src="https://picsum.photos/240/140?random=2"
    alt="可预览图片"
    preview
    :preview-src-list="['https://picsum.photos/600/400?random=2', 'https://picsum.photos/600/400?random=3']"
    style="width: 240px"
  />
</template>
```

## 裁切与懒加载

`fit` 对应原生 object-fit；`lazy` 开启原生懒加载（进入视口才加载）。预览器 `LhImageViewer` 可独立使用，接收 `images` 与 `initial-index`。

<DemoBlock title="fit 裁切模式">
  <LhImage
    v-for="f in ['fill', 'contain', 'cover', 'none', 'scale-down']"
    :key="f"
    src="https://picsum.photos/240/140"
    :alt="`fit=${f}`"
    :fit="f"
    style="width: 110px; height: 80px"
  />
</DemoBlock>

<DemoBlock title="懒加载">
  <div style="max-height: 120px; overflow-y: auto; width: 100%">
    <LhImage
      v-for="i in 4"
      :key="i"
      :src="`https://picsum.photos/240/120?random=${i}`"
      :alt="`懒加载图片 ${i}`"
      lazy
      style="width: 240px; display: block; margin-bottom: 8px"
    />
  </div>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- fit 裁切模式 -->
  <LhImage
    v-for="f in ['fill', 'contain', 'cover', 'none', 'scale-down']"
    :key="f"
    src="https://picsum.photos/240/140"
    :alt="`fit=${f}`"
    :fit="f"
    style="width: 110px; height: 80px"
  />
  <!-- 懒加载 -->
  <div style="max-height: 120px; overflow-y: auto; width: 100%">
    <LhImage
      v-for="i in 4"
      :key="i"
      :src="`https://picsum.photos/240/120?random=${i}`"
      :alt="`懒加载图片 ${i}`"
      lazy
      style="width: 240px; display: block; margin-bottom: 8px"
    />
  </div>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- fit 裁切模式 -->
  <LhImage
    v-for="f in ['fill', 'contain', 'cover', 'none', 'scale-down']"
    :key="f"
    src="https://picsum.photos/240/140"
    :alt="`fit=${f}`"
    :fit="f"
    style="width: 110px; height: 80px"
  />
  <!-- 懒加载 -->
  <div style="max-height: 120px; overflow-y: auto; width: 100%">
    <LhImage
      v-for="i in 4"
      :key="i"
      :src="`https://picsum.photos/240/120?random=${i}`"
      :alt="`懒加载图片 ${i}`"
      lazy
      style="width: 240px; display: block; margin-bottom: 8px"
    />
  </div>
</template>
```

## 独立预览器

`LhImageViewer` 可脱离 LhImage 独立使用，`images` 传入图列表，`initial-index` 指定初始图。

<DemoBlock title="独立预览器">
  <LhImageViewer
    :images="['https://picsum.photos/600/400?random=11', 'https://picsum.photos/600/400?random=12']"
    :initial-index="1"
  >
    <LhButton>打开图集（从第 2 张开始）</LhButton>
  </LhImageViewer>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- 独立预览器 -->
  <LhImageViewer
    :images="['https://picsum.photos/600/400?random=11', 'https://picsum.photos/600/400?random=12']"
    :initial-index="1"
  >
    <LhButton>打开图集（从第 2 张开始）</LhButton>
  </LhImageViewer>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- 独立预览器 -->
  <LhImageViewer
    :images="['https://picsum.photos/600/400?random=11', 'https://picsum.photos/600/400?random=12']"
    :initial-index="1"
  >
    <LhButton>打开图集（从第 2 张开始）</LhButton>
  </LhImageViewer>
</template>
```

## API

### LhImage Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| src | 图片地址 | `string` | — |
| alt | 替代文本（a11y 强约束，TS 层必填） | `string` | — |
| fit | 裁切模式（原生 object-fit） | `"contain" \| "cover" \| "fill" \| "none" \| "scale-down"` | `'cover'` |
| preview | 是否可点击预览 | `boolean` | `false` |
| previewSrcList | 预览图列表（未传时退化为 [src]） | `string[]` | — |
| lazy | 原生懒加载（loading="lazy"） | `boolean` | `false` |
| sx | sx 快速布局属性 | `SxProps` | — |

### LhImageViewer Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| images | 预览图列表 | `string[]` | — |
| initialIndex | 初始预览的图片下标 | `number` | `0` |
| sx | sx 快速布局属性（作用于预览图） | `SxProps` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| load | 图片加载成功时触发 | `(event: Event)` |
| error | 图片加载失败时触发（切换为失败占位） | `(event: Event)` |

插槽：`error`（失败占位）、`placeholder`。

`LhImageViewer` 独立导出，另可监听 `close`（关闭预览，Esc 同样触发）与 `switch`（切换图片，含方向键）事件。

## 无障碍

- `alt` 在 TS 层必填，杜绝无替代文本的图片
- 预览器 `role="dialog"` + `aria-modal="true"`、焦点圈、Esc 关闭、方向键切图；工具按钮全部命名（放大/缩小/旋转/上一张/下一张/关闭）
- 旋转/缩放过渡尊重 `prefers-reduced-motion`

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/image/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

<details id="type-LhImageProps">
<summary><code>LhImageProps</code></summary>

```ts
export interface LhImageProps {
  /** 图片地址 */
  src: string
  /** 替代文本（a11y 强约束，TS 层必填） */
  alt: string
  /** 裁切模式（原生 object-fit） */
  fit?: LhImageFit
  /** 是否可点击预览 */
  preview?: boolean
  /** 预览图列表（未传时退化为 [src]） */
  previewSrcList?: string[]
  /** 原生懒加载（loading="lazy"） */
  lazy?: boolean
  /** sx 快速布局属性 */
  sx?: SxProps
}
```

</details>

<details id="type-LhImageViewerProps">
<summary><code>LhImageViewerProps</code></summary>

```ts
/** 预览器 props（LhImageViewer 独立导出） */
export interface LhImageViewerProps {
  /** 预览图列表 */
  images: string[]
  /** 初始下标 */
  initialIndex?: number
  /** sx 快速布局属性（作用于预览图） */
  sx?: SxProps
}
```

</details>

<details id="type-LhImageFit">
<summary><code>LhImageFit</code> <sub>（来自 @lh-ui/share/core/image）</sub></summary>

```ts
/** 图片裁切模式（原生 object-fit） */
export type LhImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
```

</details>

### 常量

本组件用到的公开常量如下（可在 Props 表的「类型 / 默认值」列点击同名条目跳转至此）：

<details id="const-LH_IMAGE_ZOOM_MIN">
<summary><code>LH_IMAGE_ZOOM_MIN</code> <sub>（来自 @lh-ui/share/core/image）</sub></summary>

```ts
/** 缩放边界 */
export const LH_IMAGE_ZOOM_MIN = 0.25
```

</details>

<details id="const-LH_IMAGE_ZOOM_MAX">
<summary><code>LH_IMAGE_ZOOM_MAX</code> <sub>（来自 @lh-ui/share/core/image）</sub></summary>

```ts
export const LH_IMAGE_ZOOM_MAX = 4
```

</details>

<details id="const-LH_IMAGE_ZOOM_STEP">
<summary><code>LH_IMAGE_ZOOM_STEP</code> <sub>（来自 @lh-ui/share/core/image）</sub></summary>

```ts
export const LH_IMAGE_ZOOM_STEP = 0.25
```

</details>

<!-- lh-types:end -->
