# Switch 开关

`LhSwitch` 用于在两个对立状态之间切换。

## 基础用法

<DemoBlock title="基础用法">
  <LhSwitch v-model="status" />
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const status = ref(false)
</script>

<template>
  <LhSwitch v-model="status" />
</template>
```

## 文本标签

<DemoBlock title="文本标签">
  <LhSwitch v-model="notification" active-text="开" inactive-text="关" />
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const notification = ref(true)
</script>

<template>
  <LhSwitch v-model="notification" active-text="开" inactive-text="关" />
</template>
```

## 尺寸

<DemoBlock title="尺寸">
  <LhSwitch v-model="smallVal" size="small" />
  <LhSwitch v-model="mediumVal" size="medium" />
  <LhSwitch v-model="largeVal" size="large" />
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const smallVal = ref(false)
const mediumVal = ref(false)
const largeVal = ref(false)
</script>

<template>
  <LhSwitch v-model="smallVal" size="small" />
  <LhSwitch v-model="mediumVal" size="medium" />
  <LhSwitch v-model="largeVal" size="large" />
</template>
```

## 禁用与 Loading

<DemoBlock title="禁用与 Loading">
  <LhSwitch v-model="disabledVal" disabled />
  <LhSwitch v-model="loadingVal" loading />
</DemoBlock>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const disabledVal = ref(true)
const loadingVal = ref(true)
</script>

<template>
  <LhSwitch v-model="disabledVal" disabled />
  <LhSwitch v-model="loadingVal" loading />
</template>
```

## API

| 属性          | 说明         | 类型                             | 默认值     |
| ------------- | ------------ | -------------------------------- | ---------- |
| model-value   | 当前状态     | `boolean`                        | `false`    |
| disabled      | 是否禁用     | `boolean`                        | `false`    |
| loading       | 是否加载中   | `boolean`                        | `false`    |
| name          | 原生表单名称 | `string`                         | —          |
| size          | 尺寸         | `'small' \| 'medium' \| 'large'` | `'medium'` |
| active-text   | 开启时文本   | `string`                         | —          |
| inactive-text | 关闭时文本   | `string`                         | —          |

触发 `update:modelValue`（新的布尔值）和 `change` 事件。支持键盘 Enter 和 Space 切换。

<script setup lang="ts">
import { ref } from 'vue'

const status = ref(false)
const notification = ref(true)
const smallVal = ref(false)
const mediumVal = ref(false)
const largeVal = ref(false)
const disabledVal = ref(true)
const loadingVal = ref(true)
</script>