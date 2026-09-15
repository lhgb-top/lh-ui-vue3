# Badge 徽标

`LhBadge` 用于显示未读消息数量或状态标记。

## 基础用法

<DemoBlock title="基础用法">
  <LhBadge :value="5">
    <div style="width: 100px; height: 100px; border: 1px solid #eee; border-radius: 4px;"></div>
  </LhBadge>
</DemoBlock>

```vue
<template>
  <LhBadge :value="5">
    <div>目标内容</div>
  </LhBadge>
</template>
```

## 自定义最大值

<DemoBlock title="自定义最大值">
  <LhBadge :value="100" :max="99">
    <div style="width: 100px; height: 100px; border: 1px solid #eee; border-radius: 4px;"></div>
  </LhBadge>
</DemoBlock>

```vue
<template>
  <LhBadge :value="100" :max="99">
    <div>目标内容</div>
  </LhBadge>
</template>
```

## 红点

<DemoBlock title="红点">
  <LhBadge is-dot>
    <div style="width: 100px; height: 100px; border: 1px solid #eee; border-radius: 4px;"></div>
  </LhBadge>
</DemoBlock>

```vue
<template>
  <LhBadge is-dot>
    <div>目标内容</div>
  </LhBadge>
</template>
```

## 类型

<DemoBlock title="类型">
  <LhBadge type="primary" :value="2">
    <div style="width: 50px; height: 50px; border: 1px solid #eee; border-radius: 4px;"></div>
  </LhBadge>
  <LhBadge type="success" :value="1">
    <div style="width: 50px; height: 50px; border: 1px solid #eee; border-radius: 4px;"></div>
  </LhBadge>
  <LhBadge type="warning" :value="1">
    <div style="width: 50px; height: 50px; border: 1px solid #eee; border-radius: 4px;"></div>
  </LhBadge>
  <LhBadge type="info" :value="1">
    <div style="width: 50px; height: 50px; border: 1px solid #eee; border-radius: 4px;"></div>
  </LhBadge>
</DemoBlock>

```vue
<template>
  <LhBadge type="primary" :value="2">
    <div>Primary</div>
  </LhBadge>
  <LhBadge type="success" :value="1">
    <div>Success</div>
  </LhBadge>
  <LhBadge type="warning" :value="1">
    <div>Warning</div>
  </LhBadge>
  <LhBadge type="info" :value="1">
    <div>Info</div>
  </LhBadge>
</template>
```

## 尺寸

<DemoBlock title="尺寸">
  <LhBadge size="small" :value="5">
    <div style="width: 50px; height: 50px; border: 1px solid #eee; border-radius: 4px;"></div>
  </LhBadge>
  <LhBadge size="medium" :value="5">
    <div style="width: 50px; height: 50px; border: 1px solid #eee; border-radius: 4px;"></div>
  </LhBadge>
  <LhBadge size="large" :value="5">
    <div style="width: 50px; height: 50px; border: 1px solid #eee; border-radius: 4px;"></div>
  </LhBadge>
</DemoBlock>

```vue
<template>
  <LhBadge size="small" :value="5">
    <div>Small</div>
  </LhBadge>
  <LhBadge size="medium" :value="5">
    <div>Medium</div>
  </LhBadge>
  <LhBadge size="large" :value="5">
    <div>Large</div>
  </LhBadge>
</template>
```

## 控制显示与隐藏

<DemoBlock title="控制显示与隐藏">
  <LhBadge :value="badgeValue" :hidden="isHidden">
    <div style="width: 100px; height: 100px; border: 1px solid #eee; border-radius: 4px;"></div>
  </LhBadge>
  <LhButton @click="isHidden = !isHidden">
    {{ isHidden ? '显示' : '隐藏' }}
  </LhButton>
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const badgeValue = ref(10)
const isHidden = ref(false)
</script>

<template>
  <LhBadge :value="badgeValue" :hidden="isHidden">
    <div>目标内容</div>
  </LhBadge>
  <LhButton @click="isHidden = !isHidden">
    {{ isHidden ? '显示' : '隐藏' }}
  </LhButton>
</template>
```

## API

| 属性      | 说明                   | 类型                                           | 默认值     |
| --------- | ---------------------- | ----------------------------------------------- | ---------- |
| type      | 徽标类型               | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | `'danger'` |
| value     | 显示值                 | `string \| number`                             | —          |
| max       | 最大值                 | `number`                                       | `99`       |
| size      | 尺寸                   | `'small' \| 'medium' \| 'large'`               | `'medium'` |
| isDot     | 小圆点模式             | `boolean`                                      | `false`    |
| hidden    | 是否隐藏               | `boolean`                                      | `false`    |
| offset    | 偏移量                 | `[number, number]`                             | —          |
| showZero  | 是否显示0              | `boolean`                                      | `false`    |
| content   | 自定义内容             | `string`                                       | —          |