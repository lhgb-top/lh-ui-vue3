# ConfigProvider 配置提供者

通过 provide/inject 为子组件提供全局配置，支持主题、尺寸、国际化统一管理。

## 基础用法

<DemoBlock title="基础用法">
  <p>默认尺寸：</p>
  <div class="demo-row">
    <LhButton>默认按钮</LhButton>
    <LhButton type="primary" disabled>主要按钮</LhButton>
  </div>
  <p style="margin-top: 16px;">小型尺寸：</p>
  <LhConfigProvider :size="'small'">
    <div class="demo-row">
      <LhButton>小按钮</LhButton>
      <LhButton type="primary">小主要</LhButton>
    </div>
  </LhConfigProvider>
</DemoBlock>

```vue
<template>
  <LhConfigProvider :size="'small'">
    <LhButton>小按钮</LhButton>
    <LhButton type="primary">小主要</LhButton>
  </LhConfigProvider>
</template>
```

## 自定义主题色

<DemoBlock title="自定义主题色">
  <LhConfigProvider :theme-vars="{ 'primary-color': '#e6a23c' }">
    <div class="demo-row">
      <LhButton>默认</LhButton>
      <LhButton type="primary">金色主题</LhButton>
    </div>
  </LhConfigProvider>
</DemoBlock>

```vue
<template>
  <LhConfigProvider :theme-vars="{ 'primary-color': '#e6a23c' }">
    <LhButton>默认</LhButton>
    <LhButton type="primary">金色主题</LhButton>
  </LhConfigProvider>
</template>
```

## ConfigProvider API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| size | 全局尺寸 | `'large' \| 'default' \| 'small' \| 'mini'` | — |
| locale | 国际化配置 | `LocaleConfig` | — |
| themeVars | 主题变量 | `object` | — |
| zIndex | 全局 z-index 基准值 | `number` | `2000` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 需要配置的组件内容 |

<style scoped>
.demo-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}
</style>