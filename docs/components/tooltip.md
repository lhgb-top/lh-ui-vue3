# Tooltip 提示

文字提示组件，用于鼠标悬停时显示额外信息。

## 基础用法

<DemoBlock title="基础用法">
  <div class="demo-row">
    <LhTooltip content="这是一个提示信息">
      <LhButton>悬停显示提示</LhButton>
    </LhTooltip>
  </div>
</DemoBlock>

```vue
<template>
  <LhTooltip content="这是一个提示信息">
    <LhButton>悬停显示提示</LhButton>
  </LhTooltip>
</template>
```

## 不同位置

<DemoBlock title="不同位置">
  <div class="demo-row">
    <LhTooltip content="上方提示" placement="top">
      <LhButton>上</LhButton>
    </LhTooltip>
    <LhTooltip content="下方提示" placement="bottom">
      <LhButton>下</LhButton>
    </LhTooltip>
    <LhTooltip content="左侧提示" placement="left">
      <LhButton>左</LhButton>
    </LhTooltip>
    <LhTooltip content="右侧提示" placement="right">
      <LhButton>右</LhButton>
    </LhTooltip>
  </div>
</DemoBlock>

```vue
<template>
  <LhTooltip content="上方提示" placement="top">
    <LhButton>上</LhButton>
  </LhTooltip>
  <LhTooltip content="下方提示" placement="bottom">
    <LhButton>下</LhButton>
  </LhTooltip>
  <LhTooltip content="左侧提示" placement="left">
    <LhButton>左</LhButton>
  </LhTooltip>
  <LhTooltip content="右侧提示" placement="right">
    <LhButton>右</LhButton>
  </LhTooltip>
</template>
```

## 自定义延迟

<DemoBlock title="自定义延迟">
  <LhTooltip content="延迟1秒显示" :delay="1000">
    <LhButton>延迟提示</LhButton>
  </LhTooltip>
</DemoBlock>

```vue
<template>
  <LhTooltip content="延迟1秒显示" :delay="1000">
    <LhButton>延迟提示</LhButton>
  </LhTooltip>
</template>
```

## Tooltip API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| content | 提示内容 | `string` | — |
| placement | 提示位置 | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` |
| delay | 显示延迟（毫秒） | `number` | `200` |
| disabled | 禁用提示 | `boolean` | `false` |
| trigger | 触发方式 | `'hover' \| 'click' \| 'focus'` | `'hover'` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 触发提示的元素 |
| content | 自定义提示内容 |

<style scoped>
.demo-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}
</style>