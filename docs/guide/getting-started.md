# 快速开始

## 创建一个 Vue 3 项目

```bash
# 使用 pnpm 创建 Vite 项目
pnpm create vite my-app --template vue-ts
cd my-app
```

## 安装 lh-ui-plus

```bash
pnpm add lh-ui-plus
```

## 完整引入（main.ts）

```ts
import { createApp } from 'vue'
import App from './App.vue'
import LhUiPlus from 'lh-ui-plus'
import 'lh-ui-plus/dist/index.css'

const app = createApp(App)
app.use(LhUiPlus)
app.mount('#app')
```

## 使用组件

```vue
<script setup lang="ts">
</script>

<template>
  <div>
    <LhButton type="primary">主要按钮</LhButton>
    <LhButton type="success">成功按钮</LhButton>
    <LhButton type="warning">警告按钮</LhButton>
    <LhButton type="danger">危险按钮</LhButton>
    <LhButton type="info">信息按钮</LhButton>
  </div>
</template>
```

## 配置主题

如果你需要自定义主题，可以使用 ConfigProvider：

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { zhCn } from 'lh-ui-plus/locales'

const config = ref({
  locale: zhCn,
  size: 'default',
  zIndex: 2000,
})
</script>

<template>
  <LhConfigProvider :config="config">
    <LhButton type="primary">国风按钮</LhButton>
  </LhConfigProvider>
</template>
```