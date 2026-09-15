# Avatar 头像

`LhAvatar` 用于展示用户或事物的头像，支持图片、图标和文字三种形态，图片加载失败时自动回退。

## 基础用法

<DemoBlock title="图片头像">
  <LhAvatar src="https://api.dicebear.com/9.x/notionists/svg?seed=mo" />
</DemoBlock>

```vue
<template>
  <LhAvatar src="https://example.com/avatar.png" />
</template>
```

## 形状与尺寸

<DemoBlock title="圆形与方形、四种尺寸">
  <div style="display: flex; align-items: center; gap: 12px">
    <LhAvatar shape="square" size="small" text="小" />
    <LhAvatar shape="square" size="medium" text="中" />
    <LhAvatar shape="square" size="large" text="大" />
    <LhAvatar size="large" text="圆" />
  </div>
</DemoBlock>

```vue
<template>
  <div style="display: flex; align-items: center; gap: 12px">
    <LhAvatar shape="square" size="small" text="小" />
    <LhAvatar shape="square" size="medium" text="中" />
    <LhAvatar shape="square" size="large" text="大" />
    <LhAvatar size="large" text="圆" />
  </div>
</template>
```

## 文字与图标兜底

<DemoBlock title="无图片时按 icon、text 顺序回退">
  <div style="display: flex; align-items: center; gap: 12px">
    <LhAvatar text="水墨" />
    <LhAvatar icon="lh-icon-user" />
    <LhAvatar text="Alice Chen" />
  </div>
</DemoBlock>

```vue
<template>
  <div style="display: flex; align-items: center; gap: 12px">
    <LhAvatar text="水墨" />
    <LhAvatar icon="lh-icon-user" />
    <LhAvatar text="Alice Chen" />
  </div>
</template>
```

文字头像自动取首字展示（中文取首字、英文取首字母大写）。

## 图片加载失败

<DemoBlock title="失败后回退到 text 并触发 error 事件">
  <LhAvatar
    src="/broken-avatar.png"
    text="备"
    @error="console.log('avatar load error')"
  />
</DemoBlock>

```vue
<template>
  <LhAvatar src="/broken-avatar.png" text="备" @error="onError" />
</template>

<script setup lang="ts">
function onError(e: Event) {
  console.log('avatar load error', e)
}
</script>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 图片地址，为空时回退到图标/文字 | `string` | — |
| alt | 替代文本 | `string` | — |
| icon | 图标类名（src 缺省时展示） | `string` | — |
| text | 文字内容（src 与 icon 缺省时取首字展示） | `string` | — |
| shape | 形状 | `'circle' \| 'square'` | `'circle'` |
| size | 尺寸 | `'small' \| 'medium' \| 'large' \| 'mini' \| 'x-large'` | `'medium'` |
| fit | 图片填充模式 | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'cover'` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| error | 图片加载失败时触发 | `(e: Event)` |
