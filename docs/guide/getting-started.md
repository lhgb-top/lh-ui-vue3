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

## 在线示例

以下演示了 lh-ui-plus 的基本使用效果：

<DemoBlock>
  <div class="demo-row">
    <LhButton type="primary">主要按钮</LhButton>
    <LhButton type="success">成功按钮</LhButton>
    <LhButton type="warning">警告按钮</LhButton>
    <LhButton type="danger">危险按钮</LhButton>
    <LhButton>默认按钮</LhButton>
  </div>
  <div class="demo-row" style="margin-top: 12px;">
    <LhButton type="primary" plain>朴素按钮</LhButton>
    <LhButton type="primary" round>圆角按钮</LhButton>
    <LhButton type="primary" circle>圆</LhButton>
    <LhButton type="primary" loading>加载中</LhButton>
    <LhButton type="primary" disabled>禁用</LhButton>
  </div>
</DemoBlock>

<style scoped>
.demo-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}
</style>