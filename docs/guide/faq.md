# 常见问题

## 安装与配置

### 如何安装 @lh-ui/vue3？

```bash
pnpm add @lh-ui/vue3
```

### 如何导入组件？

```ts
import LhUiPlus from '@lh-ui/vue3'
import '@lh-ui/vue3/dist/index.css'

app.use(LhUiPlus)
```

### 如何按需导入？

```ts
import { LhButton, LhInput } from '@lh-ui/vue3'
```

## 主题定制

### 如何自定义主题色？

```vue
<LhConfigProvider :theme-vars="{ 'primary-color': '#e63946' }">
  <App />
</LhConfigProvider>
```

### 暗色模式如何使用？

```ts
import { useLhTheme } from '@lh-ui/vue3'
const { theme, toggleTheme } = useLhTheme()
```

`useLhTheme` 返回 `{ theme, setTheme, toggleTheme }`：`theme` 是当前明暗模式（`light` / `dark`），`toggleTheme` 切换，`setTheme` 直接设定。

### 如何切换预设主题？

用 `useLhPresetTheme`：

```ts
import { useLhPresetTheme } from '@lh-ui/vue3'
const { preset, setPreset, presets } = useLhPresetTheme()
setPreset('songhua') // 切到松花绿，写入 :root 并持久化
```

传入 `applyToRoot: false` 可只取返回的 `themeVars` 交给 `LhConfigProvider` 做局部作用域。详见[预设主题](/guide/themes)。

## 国际化

### 如何切换语言？

```vue
<script setup lang="ts">
import { LhConfigProvider, enUS } from '@lh-ui/vue3'
</script>

<template>
  <LhConfigProvider :locale="enUS">
    <App />
  </LhConfigProvider>
</template>
```

语言包从包根路径具名导入（`zhCN` / `enUS`）。

### 如何添加新语言？

语言包源码位于共享层 `@lh-ui/share`（`@lh-ui/share/locales/lang/`），本仓库不再持有。
运行时注册新语言：`lhlocale.use({ locale: 'xx-XX', messages })`，`lhlocale` 从 `@lh-ui/vue3` 导出。

## 组件使用

### sx 快速布局怎么用？

```vue
<LhButton :sx="{ mt: 2, px: 4 }">按钮</LhButton>
```

`sx` 只支持布局类属性（宽高 `w` / `h`、间距 `m*` / `p*`、弹性布局 `display` / `flex` 等）；颜色请用 `type` 或主题变量控制。

### 花纹背景如何启用？

```vue
<LhConfigProvider :pattern-components="['button', 'dialog']">
  <LhButton bg-pattern="var(--lh-pattern-willow)">花纹按钮</LhButton>
</LhConfigProvider>
```

`patternComponents` 接收小写组件名（`'button'` / `'dialog'` 等，不带 `Lh` 前缀）；`bg-pattern` 的值是 CSS 变量（如 `var(--lh-pattern-willow)`）或图片 URL。详见[花纹背景](/guide/theme-patterns)。

## 开发相关

### 如何贡献代码？

请参考 [贡献指南](/guide/contributing)。

### AI 辅助开发

项目使用 AI agent 辅助维护代码。所有验证命令由用户手动执行。
