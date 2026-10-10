# Installation

## Requirements

- Node.js >= 18
- pnpm >= 8

## Install

```bash
# Using pnpm
pnpm add @lh-ui/vue3

# Using npm
npm install @lh-ui/vue3

# Using yarn
yarn add @lh-ui/vue3
```

## Import Components

### Full Import

```ts
import { createApp } from 'vue'
import App from './App.vue'
import LhUiPlus from '@lh-ui/vue3'
import '@lh-ui/vue3/dist/index.css'

const app = createApp(App)
app.use(LhUiPlus)
app.mount('#app')
```

### On-demand Import

Import components as named exports from the package root, and import the component's styles separately (the style subpath is `@lh-ui/vue3/style/<component>`):

```vue
<script setup lang="ts">
import { LhButton } from '@lh-ui/vue3'
import '@lh-ui/vue3/style/button'
</script>

<template>
  <LhButton type="primary">Button</LhButton>
</template>
```

> No `unplugin-vue-components` Resolver is provided yet — import components and styles manually as shown above.

There are two style paths for on-demand imports:

| Subpath | Notes |
| ------- | ----- |
| `@lh-ui/vue3/style/<component>` | Points at the SCSS source — lets you override design variables for deep customization, but requires `sass` in your project |
| `@lh-ui/vue3/style-css/<component>` | Points at the pre-built CSS — works out of the box, no `sass` needed |

```ts
// Your project has sass and you need deep theme customization
import '@lh-ui/vue3/style/button'

// Your project has no sass, or you don't need customization
import '@lh-ui/vue3/style-css/button'
```

## CDN

The UMD build is published to public CDNs — handy for demos or when you don't want a bundler:

```html
<!-- Components (exposes window.lhUiPlus globally) -->
<script src="https://unpkg.com/@lh-ui/vue3"></script>
<!-- or jsdelivr -->
<script src="https://cdn.jsdelivr.net/npm/@lh-ui/vue3"></script>
<!-- Full stylesheet -->
<link rel="stylesheet" href="https://unpkg.com/@lh-ui/vue3/dist/index.css" />
```

```js
const app = Vue.createApp({ /* ... */ })
app.use(lhUiPlus)
app.mount('#app')
```

Append `@<version>` to pin a version, e.g. `https://unpkg.com/@lh-ui/vue3@1.0.0`. Pinning the version in production is recommended so a new release doesn't unexpectedly change what the CDN serves.

## Installing from a private server

If you're on an intranet, have restricted npm access, or want to pin the version to a self-hosted mirror, install the tarball directly from the author's private server (see the [publishing guide](/en/guide/publishing#hosting-on-a-private-server-static-tarball) for hosting details):

```bash
# pnpm
pnpm add https://www.lhgb.top/lhui/plus/packages/1.0.0/lh-ui-vue3-1.0.0.tgz

# npm
npm install https://www.lhgb.top/lhui/plus/packages/1.0.0/lh-ui-vue3-1.0.0.tgz

# yarn
yarn add https://www.lhgb.top/lhui/plus/packages/1.0.0/lh-ui-vue3-1.0.0.tgz
```

Or write it into `package.json`:

```json
{
  "dependencies": {
    "@lh-ui/vue3": "https://www.lhgb.top/lhui/plus/packages/1.0.0/lh-ui-vue3-1.0.0.tgz"
  }
}
```

> Tarball installs bypass the registry's version resolution, so upgrades require changing the URL manually. This package has zero runtime dependencies — you only need Vue 3 in your project.
>
> If you would rather install it like a normal package — `pnpm add @lhgb/vue3` with full version resolution — use the [private registry metadata](/en/guide/publishing#hosting-on-a-private-server-registry-metadata) approach instead.