# 安装

## 环境要求

- Node.js >= 18
- pnpm >= 8

## 安装

```bash
# 使用 pnpm
pnpm add @lh-ui/vue3

# 使用 npm
npm install @lh-ui/vue3

# 使用 yarn
yarn add @lh-ui/vue3
```

## 引入组件

### 完整引入

```ts
import { createApp } from 'vue'
import App from './App.vue'
import LhUiPlus from '@lh-ui/vue3'
import '@lh-ui/vue3/dist/index.css'

const app = createApp(App)
app.use(LhUiPlus)
app.mount('#app')
```

### 按需引入

从包根路径具名导入组件，并单独引入对应组件的样式（样式子路径为 `@lh-ui/vue3/style/<组件名>`）：

```vue
<script setup lang="ts">
import { LhButton } from '@lh-ui/vue3'
import '@lh-ui/vue3/style/button'
</script>

<template>
  <LhButton type="primary">国风按钮</LhButton>
</template>
```

> 暂未提供 `unplugin-vue-components` 的 Resolver，自动按需引入可按上方写法手动导入组件与样式。

按需引入有两条样式路径可选：

| 子路径 | 说明 |
| ------ | ---- |
| `@lh-ui/vue3/style/<组件名>` | 指向 SCSS 源文件，可在消费侧覆盖设计变量做深度定制，但要求项目安装了 `sass` |
| `@lh-ui/vue3/style-css/<组件名>` | 指向构建时预编译的 CSS，开箱即用，无需 `sass` |

```ts
// 项目有 sass，需要深度定制主题
import '@lh-ui/vue3/style/button'

// 项目没有 sass，或不需要定制
import '@lh-ui/vue3/style-css/button'
```

## CDN 引入

包的 UMD 产物已发布到公共 CDN，适合演示页面或不想走打包链的场景：

```html
<!-- 组件（全局暴露 window.lhUiPlus） -->
<script src="https://unpkg.com/@lh-ui/vue3"></script>
<!-- 或 jsdelivr -->
<script src="https://cdn.jsdelivr.net/npm/@lh-ui/vue3"></script>
<!-- 全量样式 -->
<link rel="stylesheet" href="https://unpkg.com/@lh-ui/vue3/dist/index.css" />
```

```js
const app = Vue.createApp({ /* ... */ })
app.use(lhUiPlus)
app.mount('#app')
```

锁定版本时在包名后加 `@<version>`，例如 `https://unpkg.com/@lh-ui/vue3@1.0.0`。生产环境建议锁定版本，避免新版本发布时 CDN 产物意外升级。

## 私有服务器安装

如果你在内网、npm 访问受限，或想把版本锁定在自己托管的镜像上，可以从作者私有服务器直接安装 tarball（托管细节见[发布指南](/guide/publishing#私有服务器托管-静态-tarball)）：

```bash
# pnpm
pnpm add https://www.lhgb.top/lhui/plus/packages/1.0.0/lh-ui-vue3-1.0.0.tgz

# npm
npm install https://www.lhgb.top/lhui/plus/packages/1.0.0/lh-ui-vue3-1.0.0.tgz

# yarn
yarn add https://www.lhgb.top/lhui/plus/packages/1.0.0/lh-ui-vue3-1.0.0.tgz
```

或写入 `package.json`：

```json
{
  "dependencies": {
    "@lh-ui/vue3": "https://www.lhgb.top/lhui/plus/packages/1.0.0/lh-ui-vue3-1.0.0.tgz"
  }
}
```

> tarball 安装会绕过 registry 的版本解析，升级时需手动替换 URL；本包零运行时依赖，仅需项目内已安装 Vue 3。
>
> 如果你希望像安装普通包一样 `pnpm add @lhgb/vue3` 并走版本解析，可以用[私有 registry 元数据](/guide/publishing#私有服务器托管-registry-元数据)方式安装。