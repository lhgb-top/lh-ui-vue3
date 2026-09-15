# Progress 进度条

`LhProgress` 用于展示任务或容量的完成进度，支持线形与圆形两种形态，可自定义颜色与文字。

## 基础用法

<DemoBlock title="线形进度条">
  <LhProgress :percentage="60" />
</DemoBlock>

```vue
<template>
  <LhProgress :percentage="60" />
</template>
```

## 状态

<DemoBlock title="normal / success / warning / exception，达到 100 自动 success">
  <div style="display: flex; flex-direction: column; gap: 12px">
    <LhProgress :percentage="100" />
    <LhProgress :percentage="80" status="warning" />
    <LhProgress :percentage="40" status="exception" />
  </div>
</DemoBlock>

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <LhProgress :percentage="100" />
    <LhProgress :percentage="80" status="warning" />
    <LhProgress :percentage="40" status="exception" />
  </div>
</template>
```

## 自定义颜色与文字

<DemoBlock title="color 支持字符串与函数，format 自定义文案">
  <div style="display: flex; flex-direction: column; gap: 12px">
    <LhProgress :percentage="55" color="#B8860B" />
    <LhProgress
      :percentage="70"
      :color="(p: number) => `hsl(${p * 1.2}, 60%, 45%)`"
      :format="(p: number) => `${p} 分`"
    />
  </div>
</DemoBlock>

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <LhProgress :percentage="55" color="#B8860B" />
    <LhProgress
      :percentage="70"
      :color="(p: number) => `hsl(${p * 1.2}, 60%, 45%)`"
      :format="(p: number) => `${p} 分`"
    />
  </div>
</template>
```

## 圆形进度

<DemoBlock title="type 设为 circle">
  <div style="display: flex; align-items: center; gap: 24px">
    <LhProgress type="circle" :percentage="75" />
    <LhProgress
      type="circle"
      :percentage="100"
      :width="100"
      :stroke-width="8"
    />
  </div>
</DemoBlock>

```vue
<template>
  <div style="display: flex; align-items: center; gap: 24px">
    <LhProgress type="circle" :percentage="75" />
    <LhProgress type="circle" :percentage="100" :width="100" :stroke-width="8" />
  </div>
</template>
```

## 不展示文字

<DemoBlock title="showText 设为 false">
  <LhProgress :percentage="45" :show-text="false" />
</DemoBlock>

```vue
<template>
  <LhProgress :percentage="45" :show-text="false" />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| percentage | 进度百分比，超出 [0, 100] 自动钳制 | `number` | `0` |
| type | 形态 | `'line' \| 'circle'` | `'line'` |
| status | 状态，`normal` 时达到 100 自动转为 `success` | `'normal' \| 'success' \| 'warning' \| 'exception'` | `'normal'` |
| color | 进度颜色，字符串或按百分比返回颜色的函数 | `string \| ((percentage: number) => string)` | 按状态取主题色 |
| strokeWidth | 线条宽度（line 为高度 px，circle 为描边宽度） | `number` | `6` |
| width | 圆形模式画布宽度 px | `number` | `126` |
| showText | 是否展示文字 | `boolean` | `true` |
| format | 自定义文字格式化 | `(percentage: number) => string` | 取整百分比 |

### Slots

| 插槽名 | 说明 | 作用域 |
| --- | --- | --- |
| text | 自定义文字内容 | `{ percentage }` |
