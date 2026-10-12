# 预设主题 / Theme Presets

lh-ui-plus 内置 5 种国风预设主题，开箱即用。有两种使用方式：

- **全局切换**（推荐）：`useLhPresetTheme` 把预设变量写到 `:root`，整站生效并持久化到 localStorage。
- **局部切换**：`LhConfigProvider :theme-vars` 只影响其子树，适合同一页面内并列展示多套主题。

预设变量可通过 `getThemeVars(name)`（来自 `@lh-ui/vue3/theme`）获取，`name` 取值见下方各小节。

## 站点级主题切换

本站在顶部导航栏提供「主题预设」下拉，可一键切换 5 种国风主题。选择会持久化到 `localStorage['lh-docs-preset']`，刷新后仍保持。

> 主题预设与明暗模式是**两轴独立**的系统：VitePress 导航栏右侧的 🌙/☀️ 切换明/暗色，「主题预设」下拉切换色板（青花瓷、朱砂、松花绿等）。暗色模式下预设同样生效，表现为不同色调的暗色主题。

## 通用主题属性 `themeVars` 与 `bgPattern`

所有 lh-ui-plus 组件都支持通过 `LhConfigProvider` 或组件自身 `themeVars` 属性进行局部主题覆盖；纹样背景通过 `bgPattern` 属性统一控制（花纹来自 `ConfigProvider` 的 `patternComponents` 白名单）。这两个属性是跨组件的通用能力，因此不在各组件文档里逐一举例，统一在 [主题定制](/guide/theme-customization) 和 [花纹背景系统](/guide/theme-patterns) 中说明。

## 青花瓷 / Ceramic Blue（默认）

默认主题，青花瓷釉下彩，清雅素净。预设名：`cerblue`。

<DemoBlock title="青花瓷主题">
  <LhConfigProvider :theme-vars="cerblueTheme">
    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <LhButton type="primary">主要按钮</LhButton>
      <LhButton type="success">成功</LhButton>
      <LhButton type="warning">警告</LhButton>
      <LhButton type="danger">危险</LhButton>
      <LhTag type="primary">标签</LhTag>
      <LhSwitch />
    </div>
  </LhConfigProvider>
</DemoBlock>

```vue
<script setup lang="ts">
import { LhConfigProvider, LhButton, LhTag, LhSwitch } from '@lh-ui/vue3'
import { getThemeVars } from '@lh-ui/vue3/theme'

// getThemeVars 返回的键已带 --lh- 前缀，ConfigProvider 的前缀处理是幂等的，可直接传入
const cerblueTheme = getThemeVars('cerblue')
</script>

<template>
  <LhConfigProvider :theme-vars="cerblueTheme">
    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <LhButton type="primary">主要按钮</LhButton>
      <LhButton type="success">成功</LhButton>
      <LhButton type="warning">警告</LhButton>
      <LhButton type="danger">危险</LhButton>
      <LhTag type="primary">标签</LhTag>
      <LhSwitch />
    </div>
  </LhConfigProvider>
</template>
```

## 松花绿 / Pine Green

竹林修竹，生机勃勃。预设名：`songhua`。

```vue
<script setup lang="ts">
import { LhConfigProvider, LhButton, LhTag, LhSwitch } from '@lh-ui/vue3'
import { getThemeVars } from '@lh-ui/vue3/theme'

const songhuaTheme = getThemeVars('songhua')
</script>

<template>
  <LhConfigProvider :theme-vars="songhuaTheme">
    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <LhButton type="primary">主要按钮</LhButton>
      <LhTag type="primary">标签</LhTag>
      <LhSwitch />
    </div>
  </LhConfigProvider>
</template>
```

## 朱砂 / Vermilion

传统印章朱砂红，喜庆庄重。预设名：`zhusha`。

```vue
<script setup lang="ts">
import { LhConfigProvider, LhButton, LhTag, LhSwitch } from '@lh-ui/vue3'
import { getThemeVars } from '@lh-ui/vue3/theme'

const zhushaTheme = getThemeVars('zhusha')
</script>

<template>
  <LhConfigProvider :theme-vars="zhushaTheme">
    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <LhButton type="primary">主要按钮</LhButton>
      <LhTag type="primary">标签</LhTag>
      <LhSwitch />
    </div>
  </LhConfigProvider>
</template>
```

## 水墨 / Ink Wash

水墨丹青，素雅极简。预设名：`shuimo`。

```vue
<script setup lang="ts">
import { LhConfigProvider, LhButton, LhTag, LhSwitch } from '@lh-ui/vue3'
import { getThemeVars } from '@lh-ui/vue3/theme'

const shuimoTheme = getThemeVars('shuimo')
</script>

<template>
  <LhConfigProvider :theme-vars="shuimoTheme">
    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <LhButton type="primary">主要按钮</LhButton>
      <LhTag type="primary">标签</LhTag>
      <LhSwitch />
    </div>
  </LhConfigProvider>
</template>
```

## 藤黄 / Golden Autumn

深秋枫黄，温暖金黄。预设名：`golden`。

```vue
<script setup lang="ts">
import { LhConfigProvider, LhButton, LhTag, LhSwitch } from '@lh-ui/vue3'
import { getThemeVars } from '@lh-ui/vue3/theme'

const goldenTheme = getThemeVars('golden')
</script>

<template>
  <LhConfigProvider :theme-vars="goldenTheme">
    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <LhButton type="primary">主要按钮</LhButton>
      <LhTag type="primary">标签</LhTag>
      <LhSwitch />
    </div>
  </LhConfigProvider>
</template>
```

## 主题对比

| 主题 | 预设名 | 主色 `--lh-primary-color` | 主色背景 `--lh-primary-color-bg` | 描述 |
|------|--------|---------------------------|----------------------------------|------|
| 青花瓷 | `cerblue` | `#2B4C7C` | `#E8EDF3` | 青花瓷釉下彩，清雅素净 |
| 松花绿 | `songhua` | `#5B8C5A` | `#E8F5E8` | 竹林修竹，生机勃勃 |
| 朱砂 | `zhusha` | `#B23A3A` | `#FDF0F0` | 传统印章朱砂红，喜庆庄重 |
| 水墨 | `shuimo` | `#2C2C2C` | `#F5F5F5` | 水墨丹青，素雅极简 |
| 藤黄 | `golden` | `#B8860B` | `#FBF6EA` | 深秋枫黄，温暖金黄 |

> 预设只覆盖主色（primary）色板，`--lh-primary-color-bg` 是主色的淡化背景色，并非整页背景色。

## 编程式切换

两种机制，按作用域选择：

- **全局切换**（推荐）：`useLhPresetTheme` 把预设变量写到 `:root`，整站生效并持久化到 localStorage，刷新后保持选择。无需 `LhConfigProvider` 包裹。
- **局部切换**：`LhConfigProvider :theme-vars` 只影响其子树，适合同一页面内并列展示多套主题。

### 全局预设切换

下面这组切换按钮会写入 `:root`，因此整个文档站都会受影响——这也是本页不再单独演示全局切换的原因。

```vue
<script setup lang="ts">
import { LhButton, useLhPresetTheme } from '@lh-ui/vue3'

const { preset, setPreset, presets } = useLhPresetTheme()
</script>

<template>
  <LhButton
    v-for="theme in presets"
    :key="theme.name"
    :type="preset === theme.name ? 'primary' : 'default'"
    @click="setPreset(theme.name)"
  >
    {{ theme.label }}
  </LhButton>
</template>
```

### 局部作用域切换

传入 `applyToRoot: false` 可关闭全局写入，只取返回的 `themeVars`（已按 ConfigProvider 约定去掉 `--lh-` 前缀），由 Provider 接管作用范围。

切换按钮要放在 `LhConfigProvider` **外部**，否则按钮自身也会被主题改色：

<DemoBlock title="局部切换预设主题">
  <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px">
    <LhButton
      v-for="theme in presets"
      :key="theme.name"
      size="small"
      :type="preset === theme.name ? 'primary' : 'default'"
      @click="setPreset(theme.name)"
    >
      {{ theme.label }}
    </LhButton>
  </div>
  <LhConfigProvider :theme-vars="presetThemeVars">
    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <LhButton type="primary">主要按钮</LhButton>
      <LhButton type="success">成功</LhButton>
      <LhButton type="warning">警告</LhButton>
      <LhButton type="danger">危险</LhButton>
      <LhTag type="primary">标签</LhTag>
      <LhSwitch />
    </div>
  </LhConfigProvider>
</DemoBlock>

```vue
<script setup lang="ts">
import { LhConfigProvider, LhButton, LhTag, LhSwitch, useLhPresetTheme } from '@lh-ui/vue3'

const { preset, setPreset, presets, themeVars } = useLhPresetTheme({ applyToRoot: false })
</script>

<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px">
    <LhButton
      v-for="theme in presets"
      :key="theme.name"
      :type="preset === theme.name ? 'primary' : 'default'"
      @click="setPreset(theme.name)"
    >
      {{ theme.label }}
    </LhButton>
  </div>
  <LhConfigProvider :theme-vars="themeVars">
    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <LhButton type="primary">主要按钮</LhButton>
      <LhButton type="success">成功</LhButton>
      <LhButton type="warning">警告</LhButton>
      <LhButton type="danger">危险</LhButton>
      <LhTag type="primary">标签</LhTag>
      <LhSwitch />
    </div>
  </LhConfigProvider>
</template>
```

> **前缀写法**：ConfigProvider 的前缀处理是幂等的，`getThemeVars()`（来自 `@lh-ui/vue3/theme`）返回的键已带 `--lh-` 前缀，可直接传入 `:theme-vars`；而 `useLhPresetTheme()` 返回的 `themeVars` 已去掉前缀。两者都能直接用于 `:theme-vars`，无需二次处理。

<script setup lang="ts">
import { LhConfigProvider, LhButton, LhTag, LhSwitch } from '~/components'
import { useLhPresetTheme } from '~/composables'
import { getThemeVars } from '@lh-ui/share/theme'
import '@lh-ui/share/styles/config-provider'
import '@lh-ui/share/styles/button'
import '@lh-ui/share/styles/tag'
import '@lh-ui/share/styles/switch'

// getThemeVars 返回的键已带 --lh- 前缀，ConfigProvider 前缀处理幂等，可直接传入
const cerblueTheme = getThemeVars('cerblue')

// 局部预设切换演示：applyToRoot: false 只取 themeVars，作用域交给 ConfigProvider
const { preset, setPreset, presets, themeVars: presetThemeVars } = useLhPresetTheme({
  applyToRoot: false,
})
</script>
