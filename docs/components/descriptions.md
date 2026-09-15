# Descriptions 描述列表

`LhDescriptions` 用于展示对象的属性列表，支持列数、跨列与边框模式。

## 基础用法

<DemoBlock title="标题 + 条目列表">
  <LhDescriptions
    title="藏品档案"
    :column="2"
    :items="[
      { label: '名称', value: '青花缠枝莲纹瓶' },
      { label: '年代', value: '明永乐' },
      { label: '类别', value: '瓷器' },
      { label: '级别', value: '一级文物' },
    ]"
  />
</DemoBlock>

```vue
<template>
  <LhDescriptions
    title="藏品档案"
    :column="2"
    :items="[
      { label: '名称', value: '青花缠枝莲纹瓶' },
      { label: '年代', value: '明永乐' },
      { label: '类别', value: '瓷器' },
      { label: '级别', value: '一级文物' },
    ]"
  />
</template>
```

## 列数与跨列

<DemoBlock title="column 控制每行列数，item 的 span 控制跨列">
  <LhDescriptions
    :column="3"
    :items="[
      { label: '名称', value: '千里江山图', span: 2 },
      { label: '年代', value: '北宋' },
      { label: '作者', value: '王希孟' },
      { label: '材质', value: '绢本设色' },
      { label: '藏地', value: '北京故宫博物院' },
    ]"
  />
</DemoBlock>

```vue
<template>
  <LhDescriptions
    :column="3"
    :items="[
      { label: '名称', value: '千里江山图', span: 2 },
      { label: '年代', value: '北宋' },
      { label: '作者', value: '王希孟' },
      { label: '材质', value: '绢本设色' },
      { label: '藏地', value: '北京故宫博物院' },
    ]"
  />
</template>
```

span 超出本行剩余宽度时自动钳制；最后一行不足会自动补位。

## 边框模式

<DemoBlock title="border 展示表格边框">
  <LhDescriptions
    :column="2"
    border
    :items="[
      { label: '名称', value: '兰亭序' },
      { label: '作者', value: '王羲之' },
      { label: '年代', value: '东晋' },
      { label: '书体', value: '行书' },
    ]"
  />
</DemoBlock>

```vue
<template>
  <LhDescriptions
    :column="2"
    border
    :items="[
      { label: '名称', value: '兰亭序' },
      { label: '作者', value: '王羲之' },
      { label: '年代', value: '东晋' },
      { label: '书体', value: '行书' },
    ]"
  />
</template>
```

## 自定义内容

条目内容可通过 `item-<index>` 作用域插槽覆盖。

<DemoBlock title="作用域插槽">
  <LhDescriptions
    :column="1"
    :items="[
      { label: '状态', value: '进行中' },
      { label: '进度', value: '' },
    ]"
  >
    <template #item-1="{ item }">
      <LhProgress :percentage="66" />
    </template>
  </LhDescriptions>
</DemoBlock>

```vue
<template>
  <LhDescriptions :column="1" :items="[{ label: '状态', value: '进行中' }, { label: '进度', value: '' }]">
    <template #item-1="{ item }">
      <LhProgress :percentage="66" />
    </template>
  </LhDescriptions>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 列表标题 | `string` | — |
| column | 每行展示的条目列数 | `number` | `3` |
| border | 是否展示边框 | `boolean` | `false` |
| items | 条目列表 | `LhDescriptionsItem[]` | `[]` |

### LhDescriptionsItem

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 条目标签 | `string` | — |
| value | 条目内容 | `string \| number` | — |
| span | 占据的列数，超出会钳制 | `number` | `1` |

### Slots

| 插槽名 | 说明 | 作用域 |
| --- | --- | --- |
| title | 自定义标题 | — |
| item-\<index\> | 覆盖第 index 个条目的内容 | `{ item }` |
