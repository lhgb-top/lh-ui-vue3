# 快速开始

## 创建一个 Vue 3 项目

```bash
# 使用 pnpm 创建 Vite 项目
pnpm create vite my-app --template vue-ts
cd my-app
```

## 安装 @lh-ui/vue3

```bash
pnpm add @lh-ui/vue3
```

## 完整引入（main.ts）

```ts
import { createApp } from 'vue'
import App from './App.vue'
import LhUiPlus from '@lh-ui/vue3'
import '@lh-ui/vue3/dist/index.css'

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

## 全局配置与主题

`LhConfigProvider` 提供全局配置（语言、尺寸）与主题变量（`themeVars`），各自以独立 prop 传入：

```vue
<script setup lang="ts">
import { zhCN } from '@lh-ui/vue3'
</script>

<template>
  <LhConfigProvider
    :locale="zhCN"
    size="medium"
    :theme-vars="{ 'primary-color': '#5B8C5A' }"
  >
    <LhButton type="primary">国风按钮</LhButton>
  </LhConfigProvider>
</template>
```

- `locale`：语言包，从包根路径具名导入（`zhCN` / `enUS`）。
- `size`：全局尺寸，可选 `small` / `medium` / `large` / `mini`。
- `themeVars`：主题变量，键名可省略 `--lh-` 前缀。预设主题可用 `usePresetTheme` 一键切换，详见[预设主题](/guide/themes)。

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