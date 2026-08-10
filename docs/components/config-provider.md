# ConfigProvider 配置

配置提供者组件，用于统一管理全局组件的配置项。

## 基础用法

```vue
<template>
  <LhConfigProvider :config="config">
    <LhButton type="primary">全局配置按钮</LhButton>
  </LhConfigProvider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { zhCn } from 'lh-ui-plus/locales'

const config = ref({
  locale: zhCn,
  size: 'default',
  zIndex: 2000,
})
</script>
```

## 全局尺寸

```vue
<template>
  <LhConfigProvider :config="{ size: 'small' }">
    <LhButton>小型按钮</LhButton>
    <LhInput v-model="value" placeholder="小型输入框" />
  </LhConfigProvider>
</template>
```

## 国际化

```vue
<template>
  <LhConfigProvider :config="{ locale: locale }">
    <LhButton>国际化按钮</LhButton>
  </LhConfigProvider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { zhCn, en } from 'lh-ui-plus/locales'

const locale = ref(zhCn)
// 切换语言: locale.value = en
</script>
```

## ConfigProvider API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| config | 全局配置对象 | `ConfigContext` | — |

### ConfigContext 类型

```ts
interface ConfigContext {
  locale?: LocaleConfig      // 国际化配置
  size?: 'large' | 'default' | 'small' | 'mini'  // 全局尺寸
  zIndex?: number            // 全局 z-index 基准值
}
```

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 被配置管理的组件内容 |