# Statistic 统计数值

`LhStatistic` 用于展示统计数值，支持精度、千位分隔与前缀后缀。

## 基础用法

<DemoBlock title="标题 + 数值">
  <LhStatistic
    title="年访问量"
    :value="2384712"
  />
</DemoBlock>

```vue
<template>
  <LhStatistic title="年访问量" :value="2384712" />
</template>
```

## 精度与分隔符

<DemoBlock title="precision 控制小数位，separator 控制千位分隔（空串关闭分组）">
  <div style="display: flex; gap: 48px">
    <LhStatistic
      title="评分"
      :value="4.8471"
      :precision="2"
    />
    <LhStatistic
      title="编号"
      :value="8899001"
      separator=""
    />
  </div>
</DemoBlock>

```vue
<template>
  <div style="display: flex; gap: 48px">
    <LhStatistic title="评分" :value="4.8471" :precision="2" />
    <LhStatistic title="编号" :value="8899001" separator="" />
  </div>
</template>
```

## 前缀与后缀

<DemoBlock title="prefix / suffix 或同名插槽">
  <div style="display: flex; gap: 48px">
    <LhStatistic
      title="成交额"
      :value="128600"
      prefix="¥"
      suffix="元"
    />
    <LhStatistic
      title="增长率"
      :value="12.6"
      :precision="1"
      suffix="%"
    />
  </div>
</DemoBlock>

```vue
<template>
  <div style="display: flex; gap: 48px">
    <LhStatistic title="成交额" :value="128600" prefix="¥" suffix="元" />
    <LhStatistic title="增长率" :value="12.6" :precision="1" suffix="%" />
  </div>
</template>
```

## 非数值文本

value 传入无法解析的字符串时按原文展示，可用于超大数或特殊文案。

<DemoBlock title="字符串 value">
  <LhStatistic
    title="星辰"
    value="不可计数"
  />
</DemoBlock>

```vue
<template>
  <LhStatistic title="星辰" value="不可计数" />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 数值标题 | `string` | — |
| value | 统计数值，字符串形式可承载超大数或特殊文本 | `number \| string` | `0` |
| precision | 小数精度 | `number` | `0` |
| separator | 千位分隔符，空串关闭分组 | `string` | `','` |
| prefix | 数值前缀 | `string` | — |
| suffix | 数值后缀 | `string` | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| title | 自定义标题 |
| prefix | 自定义前缀 |
| suffix | 自定义后缀 |
