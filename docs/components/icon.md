# Icon 图标

图标组件，提供丰富的图标资源。

## 基础用法

<DemoBlock title="基础用法">
  <div class="demo-row">
    <LhIcon name="star" />
    <LhIcon name="search" />
    <LhIcon name="check" />
    <LhIcon name="close" />
    <LhIcon name="edit" />
    <LhIcon name="delete" />
    <LhIcon name="loading" />
    <LhIcon name="arrow-up" />
    <LhIcon name="arrow-down" />
    <LhIcon name="arrow-left" />
    <LhIcon name="arrow-right" />
  </div>
</DemoBlock>

```vue
<template>
  <LhIcon name="star" />
  <LhIcon name="search" />
  <LhIcon name="check" />
  <LhIcon name="close" />
  <LhIcon name="edit" />
  <LhIcon name="delete" />
</template>
```

## 不同尺寸

<DemoBlock title="不同尺寸">
  <div class="demo-row">
    <LhIcon name="star" size="small" />
    <LhIcon name="star" size="default" />
    <LhIcon name="star" size="large" />
    <LhIcon name="star" size="x-large" />
  </div>
</DemoBlock>

```vue
<template>
  <LhIcon name="star" size="small" />
  <LhIcon name="star" size="default" />
  <LhIcon name="star" size="large" />
  <LhIcon name="star" size="x-large" />
</template>
```

## 自定义颜色

<DemoBlock title="自定义颜色">
  <div class="demo-row">
    <LhIcon name="star" color="#e6a23c" />
    <LhIcon name="search" color="#409eff" />
    <LhIcon name="check" color="#67c23a" />
    <LhIcon name="close" color="#f56c6c" />
  </div>
</DemoBlock>

```vue
<template>
  <LhIcon name="star" color="#e6a23c" />
  <LhIcon name="search" color="#409eff" />
  <LhIcon name="check" color="#67c23a" />
  <LhIcon name="close" color="#f56c6c" />
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

<style scoped>
.demo-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  font-size: 20px;
}
</style>