# 花纹背景系统

lh-ui-plus 提供了一套国风诗意花纹背景系统，支持 6 种预设花纹图案，通过 CSS 变量（`bg-pattern`）或组件的 `bgPattern` prop 应用。明暗模式切换是另一套独立能力，见文末「明暗模式」。

## 预设花纹

系统内置以下 6 种花纹：

| 花纹名 | CSS 变量 | 说明 |
|--------|----------|------|
| 无 | `--lh-pattern-none` | 默认无花纹 |
| 柳叶 | `--lh-pattern-willow` | 细长柳叶，疏密有致 |
| 祥云 | `--lh-pattern-cloud` | 祥云舒展，蜿蜒流转 |
| 水波 | `--lh-pattern-water` | 涟漪微动，层层叠叠 |
| 雪花 | `--lh-pattern-snow` | 六角雪花，细枝分岔 |
| 梅花 | `--lh-pattern-plum` | 五瓣舒展，蕊心分明 |
| 竹叶 | `--lh-pattern-bamboo` | 披针形竹叶，错落有致 |

## 使用方式

### 通过 ConfigProvider 全局配置

```vue
<template>
  <LhConfigProvider :theme-vars="{ 'bg-pattern': 'var(--lh-pattern-willow)' }">
    <LhButton>默认</LhButton>
    <LhButton type="primary">主要</LhButton>
  </LhConfigProvider>
</template>
```

### 控制花纹应用范围（patternComponents 白名单）

默认情况下，全局 `bg-pattern` 不会应用到任何组件，需要通过 `patternComponents` 白名单显式开启：

```vue
<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <LhConfigProvider
    :theme-vars="{ 'bg-pattern': 'var(--lh-pattern-cloud)' }"
    :pattern-components="['button', 'input']"
  >
    <!-- 按钮和输入框会应用花纹，Dialog 不会 -->
    <LhButton>带花纹的按钮</LhButton>
    <LhInput placeholder="带花纹的输入框" />
    <LhDialog v-model="visible">此对话框没有花纹</LhDialog>
  </LhConfigProvider>
</template>
```

### 组件级别花纹配置

组件自身通过 `bgPattern` prop 或 `themeVars` 设置的花纹不受白名单限制：

```vue
<template>
  <LhButton :bg-pattern="'var(--lh-pattern-bamboo)'">
    此按钮始终有花纹
  </LhButton>
</template>
```

### 自定义花纹透明度

```vue
<template>
  <LhConfigProvider
    :theme-vars="{
      'bg-pattern': 'var(--lh-pattern-snow)',
      'bg-pattern-opacity': '0.3',
      'bg-pattern-color': 'rgba(255, 0, 0, 0.2)',
    }"
  >
    <LhButton>自定义透明度</LhButton>
  </LhConfigProvider>
</template>
```

## CSS 变量参考

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `--lh-bg-pattern` | 花纹背景 URL | `none` |
| `--lh-bg-pattern-repeat` | 花纹平铺模式 | `repeat` |
| `--lh-bg-pattern-size` | 花纹大小 | `40px` |
| `--lh-bg-pattern-opacity` | 花纹透明度 | `0.15` |
| `--lh-bg-pattern-color` | 花纹颜色 | `var(--lh-decoration-color, rgba(184, 134, 11, 0.12))` |
| `--lh-bg-pattern-blend` | 花纹混合模式 | `soft-light` |

## 明暗模式

花纹系统本身通过 CSS 变量控制，与明暗模式互不影响。明暗模式使用 `useLhTheme` 组合式函数切换（写入 `data-theme` 属性）：

```vue
<script setup lang="ts">
import { useLhTheme } from '@lh-ui/vue3'

const { theme, toggleTheme, setTheme } = useLhTheme()

// 切换明暗主题
function onToggle() {
  toggleTheme()
}
</script>

<template>
  <div>
    <LhButton @click="onToggle">
      {{ theme === 'dark' ? '切换明色' : '切换暗色' }}
    </LhButton>
  </div>
</template>
```

## 主题变量优先级

组件最终的 CSS 变量会按以下优先级合并（后者覆盖前者）：

1. ConfigProvider 全局 `themeVars`（最低优先级）
2. ConfigProvider 按组件 `componentTheme[组件名]`
3. 组件自身 `themeVars` prop
4. 组件自身 `bgPattern` prop（最高优先级）

对于 `bg-pattern` 变量，还会额外受到 `patternComponents` 白名单控制：只有白名单中的组件才会应用全局配置的 `bg-pattern`。
