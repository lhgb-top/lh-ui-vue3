# Breadcrumb 面包屑

层级路径导航。基于原生 `nav + ol` 语义，当前页自动标记 `aria-current="page"` 且不可点击；支持自定义分隔符与超出折叠。

## 基础用法

<DemoBlock title="基础用法">
  <LhBreadcrumb>
    <LhBreadcrumbItem>首页</LhBreadcrumbItem>
    <LhBreadcrumbItem>组件</LhBreadcrumbItem>
    <LhBreadcrumbItem>Breadcrumb</LhBreadcrumbItem>
  </LhBreadcrumb>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhBreadcrumb>
    <LhBreadcrumbItem>首页</LhBreadcrumbItem>
    <LhBreadcrumbItem>组件</LhBreadcrumbItem>
    <LhBreadcrumbItem>Breadcrumb</LhBreadcrumbItem>
  </LhBreadcrumb>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhBreadcrumb>
    <LhBreadcrumbItem>首页</LhBreadcrumbItem>
    <LhBreadcrumbItem>组件</LhBreadcrumbItem>
    <LhBreadcrumbItem>Breadcrumb</LhBreadcrumbItem>
  </LhBreadcrumb>
</template>
```

## 链接导航

<DemoBlock title="链接导航">
  <LhBreadcrumb>
    <LhBreadcrumbItem to="/">首页</LhBreadcrumbItem>
    <LhBreadcrumbItem to="/guide">指南</LhBreadcrumbItem>
    <LhBreadcrumbItem>当前页</LhBreadcrumbItem>
  </LhBreadcrumb>
</DemoBlock>

<DemoBlock title="replace 模式">
  <LhBreadcrumb>
    <LhBreadcrumbItem to="/" replace>替换历史</LhBreadcrumbItem>
    <LhBreadcrumbItem>当前页</LhBreadcrumbItem>
  </LhBreadcrumb>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- 链接导航 -->
  <LhBreadcrumb>
    <LhBreadcrumbItem to="/">首页</LhBreadcrumbItem>
    <LhBreadcrumbItem to="/guide">指南</LhBreadcrumbItem>
    <LhBreadcrumbItem>当前页</LhBreadcrumbItem>
  </LhBreadcrumb>
  <!-- replace 模式 -->
  <LhBreadcrumb>
    <LhBreadcrumbItem to="/" replace>替换历史</LhBreadcrumbItem>
    <LhBreadcrumbItem>当前页</LhBreadcrumbItem>
  </LhBreadcrumb>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- 链接导航 -->
  <LhBreadcrumb>
    <LhBreadcrumbItem to="/">首页</LhBreadcrumbItem>
    <LhBreadcrumbItem to="/guide">指南</LhBreadcrumbItem>
    <LhBreadcrumbItem>当前页</LhBreadcrumbItem>
  </LhBreadcrumb>
  <!-- replace 模式 -->
  <LhBreadcrumb>
    <LhBreadcrumbItem to="/" replace>替换历史</LhBreadcrumbItem>
    <LhBreadcrumbItem>当前页</LhBreadcrumbItem>
  </LhBreadcrumb>
</template>
```

> 传入 `to` 的项渲染为 `<a>`；检测到 vue-router 时走路由跳转（`replace` 控制是否替换历史记录），否则保持原生导航。末项始终渲染为当前页文本。

## 自定义分隔符

<DemoBlock title="自定义分隔符">
  <LhBreadcrumb separator="·">
    <LhBreadcrumbItem to="/">首页</LhBreadcrumbItem>
    <LhBreadcrumbItem to="/components">组件</LhBreadcrumbItem>
    <LhBreadcrumbItem>
      <template #separator>➜</template>
      独立分隔符
    </LhBreadcrumbItem>
  </LhBreadcrumb>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhBreadcrumb separator="·">
    <LhBreadcrumbItem to="/">首页</LhBreadcrumbItem>
    <LhBreadcrumbItem to="/components">组件</LhBreadcrumbItem>
    <LhBreadcrumbItem>
      <template #separator>➜</template>
      独立分隔符
    </LhBreadcrumbItem>
  </LhBreadcrumb>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhBreadcrumb separator="·">
    <LhBreadcrumbItem to="/">首页</LhBreadcrumbItem>
    <LhBreadcrumbItem to="/components">组件</LhBreadcrumbItem>
    <LhBreadcrumbItem>
      <template #separator>➜</template>
      独立分隔符
    </LhBreadcrumbItem>
  </LhBreadcrumb>
</template>
```

## 超出折叠

<DemoBlock title="超出折叠">
  <LhBreadcrumb :max-items="3">
    <LhBreadcrumbItem to="/">首页</LhBreadcrumbItem>
    <LhBreadcrumbItem to="/a">一级目录 A</LhBreadcrumbItem>
    <LhBreadcrumbItem to="/a/b">二级目录 B</LhBreadcrumbItem>
    <LhBreadcrumbItem to="/a/b/c">三级目录 C</LhBreadcrumbItem>
    <LhBreadcrumbItem>当前页</LhBreadcrumbItem>
  </LhBreadcrumb>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhBreadcrumb :max-items="3">
    <LhBreadcrumbItem to="/">首页</LhBreadcrumbItem>
    <LhBreadcrumbItem to="/a">一级目录 A</LhBreadcrumbItem>
    <LhBreadcrumbItem to="/a/b">二级目录 B</LhBreadcrumbItem>
    <LhBreadcrumbItem to="/a/b/c">三级目录 C</LhBreadcrumbItem>
    <LhBreadcrumbItem>当前页</LhBreadcrumbItem>
  </LhBreadcrumb>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhBreadcrumb :max-items="3">
    <LhBreadcrumbItem to="/">首页</LhBreadcrumbItem>
    <LhBreadcrumbItem to="/a">一级目录 A</LhBreadcrumbItem>
    <LhBreadcrumbItem to="/a/b">二级目录 B</LhBreadcrumbItem>
    <LhBreadcrumbItem to="/a/b/c">三级目录 C</LhBreadcrumbItem>
    <LhBreadcrumbItem>当前页</LhBreadcrumbItem>
  </LhBreadcrumb>
</template>
```

> 超出 `maxItems` 时保留首项 + 省略号 + 末尾若干项；点击省略号展开全部。

## Breadcrumb API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| separator | 分隔符字符 | `string` | `'/'` |
| maxItems | 最大可见项数（首项 + 省略号 + 末尾若干项），超出折叠 | `number` | `0` |
| sx | sx 快速布局属性 | `SxProps` | — |

### LhBreadcrumbItem Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| to | 跳转地址；存在且非末项时渲染为链接 | `string` | — |
| replace | 使用 vue-router 跳转时是否以 replace 方式 | `boolean` | `false` |

### Slots

| 插槽名 | 说明 | 作用组件 |
|--------|------|----------|
| default | 面包屑项 | LhBreadcrumb |
| default | 项内容 | LhBreadcrumbItem |
| separator | 自定义分隔符（覆盖全局 `separator`） | LhBreadcrumbItem |

### 无障碍

- 根元素为 `<nav aria-label>`（取语言包 `breadcrumb.label`）包 `<ol>`，语义顺序即文档顺序
- 当前页（末项）渲染为文本并自动设置 `aria-current="page"`，即使传入 `to` 也不可点击
- 分隔符 `aria-hidden="true"`，不进入无障碍树
- 折叠省略号是真实 `<button>`，aria-label 取语言包 `breadcrumb.more`，点击展开全部

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/breadcrumb/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

<details id="type-LhBreadcrumbProps">
<summary><code>LhBreadcrumbProps</code></summary>

```ts
export interface LhBreadcrumbProps {
  /** 分隔符字符 */
  separator?: string
  /** 最大可见项数（首项 + 省略号 + 末尾若干项），超出折叠；0 或不传表示不折叠 */
  maxItems?: number
  /** sx 快速布局属性 */
  sx?: SxProps
}
```

</details>

<details id="type-LhBreadcrumbItemProps">
<summary><code>LhBreadcrumbItemProps</code></summary>

```ts
export interface LhBreadcrumbItemProps {
  /** 跳转地址；存在且非末项时渲染为链接（检测到 vue-router 时走路由跳转，否则原生导航） */
  to?: string
  /** 使用 vue-router 跳转时是否以 replace 方式（无路由时无效果） */
  replace?: boolean
}
```

</details>

<!-- lh-types:end -->
