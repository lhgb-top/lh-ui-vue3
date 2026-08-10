# 安装

## 环境要求

- Node.js >= 18
- pnpm >= 8

## 安装

```bash
# 使用 pnpm
pnpm add lh-ui-plus

# 使用 npm
npm install lh-ui-plus

# 使用 yarn
yarn add lh-ui-plus
```

## 引入组件

### 完整引入

```ts
import { createApp } from 'vue'
import App from './App.vue'
import LhUiPlus from 'lh-ui-plus'
import 'lh-ui-plus/dist/index.css'

const app = createApp(App)
app.use(LhUiPlus)
app.mount('#app')
```

### 按需引入

```vue
<script setup lang="ts">
import { LhButton } from 'lh-ui-plus'
import 'lh-ui-plus/dist/button/style.css'
</script>

<template>
  <LhButton type="primary">国风按钮</LhButton>
</template>
```

## 自动按需引入

推荐使用 `unplugin-vue-components` 实现自动按需加载：

```bash
pnpm add -D unplugin-vue-components
```

```ts
// vite.config.ts
import Components from 'unplugin-vue-components/vite'
import { LhUiPlusResolver } from 'lh-ui-plus/resolver'

export default {
  plugins: [
    Components({
      resolvers: [LhUiPlusResolver()],
    }),
  ],
}
```