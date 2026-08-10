# Icon 图标

图标组件，提供丰富的图标资源。

## 基础用法

```vue
<template>
  <LhIcon name="edit" />
  <LhIcon name="delete" />
  <LhIcon name="search" />
  <LhIcon name="check" />
  <LhIcon name="close" />
</template>
```

## 不同尺寸

```vue
<template>
  <LhIcon name="edit" size="small" />
  <LhIcon name="edit" size="default" />
  <LhIcon name="edit" size="large" />
</template>
```

## 自定义颜色

```vue
<template>
  <LhIcon name="edit" color="#2B4C7C" />
  <LhIcon name="edit" color="#C23B22" />
  <LhIcon name="edit" color="#4A7B3D" />
</template>
```

## Icon API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| name | 图标名称 | `string` | — |
| size | 图标尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| color | 图标颜色 | `string` | — |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 自定义图标内容 |