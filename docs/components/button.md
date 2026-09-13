# Button 按钮

按钮组件，支持多种类型、尺寸、状态及国风主题色。

## 基础用法

<DemoBlock title="基础用法">
  <div class="demo-row">
    <LhButton>默认按钮</LhButton>
    <LhButton type="primary">主要按钮</LhButton>
    <LhButton type="success">成功按钮</LhButton>
    <LhButton type="warning">警告按钮</LhButton>
    <LhButton type="danger">危险按钮</LhButton>
    <LhButton type="info">信息按钮</LhButton>
  </div>
</DemoBlock>

```vue
<template>
  <LhButton>默认按钮</LhButton>
  <LhButton type="primary">主要按钮</LhButton>
  <LhButton type="success">成功按钮</LhButton>
  <LhButton type="warning">警告按钮</LhButton>
  <LhButton type="danger">危险按钮</LhButton>
  <LhButton type="info">信息按钮</LhButton>
</template>
```

## 不同尺寸

<DemoBlock title="不同尺寸">
  <div class="demo-row">
    <LhButton size="large">大型按钮</LhButton>
    <LhButton>默认按钮</LhButton>
    <LhButton size="small">小型按钮</LhButton>
    <LhButton size="mini">迷你按钮</LhButton>
  </div>
</DemoBlock>

```vue
<template>
  <LhButton size="large">大型按钮</LhButton>
  <LhButton>默认按钮</LhButton>
  <LhButton size="small">小型按钮</LhButton>
  <LhButton size="mini">迷你按钮</LhButton>
</template>
```

## 朴素按钮

<DemoBlock title="朴素按钮">
  <div class="demo-row">
    <LhButton plain>朴素按钮</LhButton>
    <LhButton type="primary" plain>主要按钮</LhButton>
    <LhButton type="success" plain>成功按钮</LhButton>
  </div>
</DemoBlock>

```vue
<template>
  <LhButton plain>朴素按钮</LhButton>
  <LhButton type="primary" plain>主要按钮</LhButton>
  <LhButton type="success" plain>成功按钮</LhButton>
</template>
```

## 圆形按钮

<DemoBlock title="圆形按钮">
  <div class="demo-row">
    <LhButton circle>圆</LhButton>
    <LhButton type="primary" circle>主</LhButton>
    <LhButton type="success" circle>成</LhButton>
  </div>
</DemoBlock>

```vue
<template>
  <LhButton circle>圆</LhButton>
  <LhButton type="primary" circle>主</LhButton>
  <LhButton type="success" circle>成</LhButton>
</template>
```

## 加载状态

<DemoBlock title="加载状态">
  <div class="demo-row">
    <LhButton loading>加载中</LhButton>
    <LhButton type="primary" loading>加载中</LhButton>
  </div>
</DemoBlock>

```vue
<template>
  <LhButton loading>加载中</LhButton>
  <LhButton type="primary" loading>加载中</LhButton>
</template>
```

## 禁用状态

<DemoBlock title="禁用状态">
  <div class="demo-row">
    <LhButton disabled>禁用按钮</LhButton>
    <LhButton type="primary" disabled>主要按钮</LhButton>
  </div>
</DemoBlock>

```vue
<template>
  <LhButton disabled>禁用按钮</LhButton>
  <LhButton type="primary" disabled>主要按钮</LhButton>
</template>
```

## Block 按钮

<DemoBlock title="Block 按钮">
  <div style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
    <LhButton block>块级按钮</LhButton>
    <LhButton type="primary" block>主要块级</LhButton>
  </div>
</DemoBlock>

```vue
<template>
  <LhButton block>块级按钮</LhButton>
</template>
```

## Button API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| type | 按钮类型 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | `'default'` |
| size | 按钮尺寸 | `'large' \| 'default' \| 'small' \| 'mini'` | `'default'` |
| plain | 是否为朴素按钮 | `boolean` | `false` |
| round | 是否为圆角按钮 | `boolean` | `false` |
| circle | 是否为圆形按钮 | `boolean` | `false` |
| loading | 加载状态 | `boolean` | `false` |
| disabled | 禁用状态 | `boolean` | `false` |
| block | 是否块级 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击事件 | `(event: MouseEvent)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 按钮内容 |

<style scoped>
.demo-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}
</style>