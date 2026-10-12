# 主题定制

lh-ui-plus 提供了一套完整的 CSS 变量主题系统，支持国风主题色、暗色模式、花纹背景、运行时切换等丰富定制能力。

> 想要可视化地调色并直接导出一份 scss？见 [主题定制台](/guide/theme-studio)。

## 国风主题色体系

组件库以传统水墨丹青为设计灵感，定义了 8 种国风色彩主题：

| 色彩 | 寓意 | 主色 |  hover |  应用 |
|------|------|------|--------|------|
| 靛蓝 | 青花瓷之蓝 | `#2B4C7C` | `#3D649E` | 主要按钮、链接、聚焦态 |
| 松花绿 | 竹影青翠 | `#5B8C5A` | `#6FA36E` | 成功状态 |
| 藤黄 | 秋叶金黄 | `#C4A35A` | `#D4B76F` | 警告状态 |
| 朱砂（危险） | 印泥朱红 | `#B23A3A` | `#C45050` | 危险/错误状态（`--lh-danger-*`） |
| 黛色 | 水墨淡彩 | `#7A7A7A` | `#8F8F8F` | 信息状态 |
| 金色 | 华贵古韵 | `#B8860B` | `#D4A843` | 装饰点缀（`--lh-gold-*`） |
| 朱砂红（强调） | 朱砂偏红的强调变体 | `#C43A31` | `#E85D4A` | 强调色（`--lh-vermilion-*`） |
| 玉色 | 翠竹清雅 | `#5B8C5A` | `#7AAE7A` | 成功/装饰（与松花绿同值） |

每种色彩通常包含 4 个层级（主色/hover/active/light 背景色），主色与金色额外提供 `lighter` 描边色（`*-color-border`），确保在不同场景下都有合适的对比度。

## CSS 变量主题系统

所有主题色通过 CSS 自定义属性（`--lh-*`）实现，共 88+ 个变量，覆盖以下类别：

### 颜色变量

| 变量前缀 | 说明 | 示例 |
|----------|------|------|
| `--lh-primary-color` | 主色基础值 | `#2B4C7C` |
| `--lh-primary-color-hover` | 主色 hover 态 | `#3D649E` |
| `--lh-primary-color-active` | 主色 active 态 | `#1F3A5F` |
| `--lh-primary-color-bg` | 主色浅色背景 | `#E8EDF3` |
| `--lh-success-color` | 成功色 | `#5B8C5A` |
| `--lh-warning-color` | 警告色 | `#C4A35A` |
| `--lh-danger-color` | 危险色 | `#B23A3A` |
| `--lh-info-color` | 信息色 | `#7A7A7A` |

### 文本变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `--lh-text-primary` | 主要文字 | `#2C2C2C` |
| `--lh-text-regular` | 常规文字 | `#5A5A5A` |
| `--lh-text-secondary` | 辅助文字 | `#8A8A8A` |
| `--lh-text-placeholder` | 占位符 | `#B0B0B0` |
| `--lh-text-disabled` | 禁用文字 | `#C8C8C8` |

### 边框变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `--lh-border-color-base` | 默认边框 | `#D8D3CC` |
| `--lh-border-color-light` | 轻量边框 | `#E5E0D8` |
| `--lh-border-radius-base` | 基础圆角 | `2px` |
| `--lh-border-radius-round` | 胶囊圆角 | `20px` |

### 背景变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `--lh-bg-color` | 组件背景 | `#FAF6F0`（宣纸色） |
| `--lh-bg-color-page` | 页面背景 | `#F5F0EB` |
| `--lh-bg-color-overlay` | 遮罩背景 | `rgba(26, 26, 26, 0.4)` |

### 阴影变量

| 变量名 | 说明 |
|--------|------|
| `--lh-box-shadow-base` | 默认阴影 |
| `--lh-box-shadow-light` | 轻量阴影 |
| `--lh-box-shadow-lighter` | 极轻阴影 |

### 字体变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `--lh-font-family` | 字体族 | `Noto Serif SC, STSong, SimSun...` |
| `--lh-font-size-base` | 基础字号 | `14px` |
| `--lh-font-size-small` | 小号字号 | `13px` |
| `--lh-font-weight-primary` | 常规字重 | `400` |
| `--lh-font-line-height-primary` | 行高 | `1.8` |

### 间距变量

| 变量名 | 值 | 用途 |
|--------|-----|------|
| `--lh-spacing-xs` | `4px` | 极小间距 |
| `--lh-spacing-sm` | `8px` | 小间距 |
| `--lh-spacing-md` | `12px` | 中间距 |
| `--lh-spacing-base` | `16px` | 基础间距 |
| `--lh-spacing-lg` | `20px` | 大间距 |
| `--lh-spacing-xl` | `24px` | 超大间距 |

### Z-Index 变量

| 变量名 | 值 | 用途 |
|--------|-----|------|
| `--lh-z-index-dropdown` | `1000` | 下拉菜单 |
| `--lh-z-index-modal` | `1050` | 模态框 |
| `--lh-z-index-tooltip` | `2000` | 提示框 |

### 过渡变量

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `--lh-transition-duration-fast` | `0.25s` | 快速过渡 |
| `--lh-transition-duration-base` | `0.3s` | 默认过渡 |
| `--lh-transition-duration-slow` | `0.4s` | 慢速过渡 |

## 暗色主题

组件库内置暗色主题样式，所有 CSS 变量在暗色模式下自动切换为适配值。

### 方案一：使用 `useLhTheme` 组合式函数

#### Composition API

```vue
<script setup lang="ts">
import { useLhTheme } from '@lh-ui/vue3'

const { theme, toggleTheme, setTheme } = useLhTheme()
</script>

<template>
  <div>
    <LhButton @click="toggleTheme">
      {{ theme === 'dark' ? '切换明色' : '切换暗色' }}
    </LhButton>
    <LhButton @click="() => setTheme('light')">明色</LhButton>
    <LhButton @click="() => setTheme('dark')">暗色</LhButton>
  </div>
</template>
```

#### Options API

```vue
<script>
import { useLhTheme } from '@lh-ui/vue3'

export default {
  setup() {
    const { theme, toggleTheme, setTheme } = useLhTheme()
    return { theme, toggleTheme, setTheme }
  },
}
</script>

<template>
  <div>
    <LhButton @click="toggleTheme">
      {{ theme === 'dark' ? '切换明色' : '切换暗色' }}
    </LhButton>
  </div>
</template>
```

> `useLhTheme` 会自动将主题状态持久化到 `localStorage`（key: `lh-ui-theme`），刷新页面后主题不会丢失。

### 方案二：HTML 属性切换

在根元素设置 `data-theme="dark"` 即可全局启用暗色模式：

```html
<!DOCTYPE html>
<html lang="zh-CN" data-theme="dark">
  <!-- ... -->
</html>
```

## 自定义主题色（青花瓷 / 松花绿 / 朱砂红）

除了内置的明暗主题，组件库支持通过 `themeVars` 自定义任意颜色组合，实现个性化主题。

> 下面示例是**手写自定义变量**的演示，取值为讲解而调整，与[预设主题](/guide/themes)中的同名内置预设（`cerblue` / `songhua` / `zhusha`）并不完全相同。要直接使用内置预设，请用 `useLhPresetTheme` 或 `getThemeVars(name)`。

### 青花瓷主题

以深靛蓝为主色调，灵感来自传统青花瓷。

#### Composition API

```vue
<script setup lang="ts">
const cerblueTheme = {
  'primary-color': '#2B4C7C',
  'primary-color-hover': '#3D649E',
  'primary-color-active': '#1F3A5F',
  'primary-color-bg': '#E8EDF3',
  'bg-color': '#F0F4F8',
  'border-color-base': '#C8D6E5',
}
</script>

<template>
  <LhConfigProvider :theme-vars="cerblueTheme">
    <LhButton type="primary">青花瓷按钮</LhButton>
    <LhInput placeholder="青花瓷输入框" />
  </LhConfigProvider>
</template>
```

#### Options API

```vue
<script>
import { LhConfigProvider, LhButton, LhInput } from '@lh-ui/vue3'

export default {
  components: { LhConfigProvider, LhButton, LhInput },
  data() {
    return {
      cerblueTheme: {
        'primary-color': '#2B4C7C',
        'primary-color-hover': '#3D649E',
        'primary-color-bg': '#E8EDF3',
        'bg-color': '#F0F4F8',
      },
    }
  },
}
</script>

<template>
  <LhConfigProvider :theme-vars="cerblueTheme">
    <LhButton type="primary">青花瓷按钮</LhButton>
  </LhConfigProvider>
</template>
```

### 松花绿主题

以竹绿为点缀，营造清新自然的风格。

```vue
<script setup lang="ts">
const bambooTheme = {
  'primary-color': '#5B8C5A',
  'primary-color-hover': '#6FA36E',
  'primary-color-bg': '#EDF5EC',
  'success-color': '#5B8C5A',
  'bg-color': '#F6FAF5',
}
</script>

<template>
  <LhConfigProvider :theme-vars="bambooTheme">
    <LhButton type="primary">竹林幽径</LhButton>
    <LhTag type="success">新叶</LhTag>
  </LhConfigProvider>
</template>
```

### 朱砂红主题

以印泥朱红为主调，突出典雅华贵的氛围。

```vue
<script setup lang="ts">
const vermilionTheme = {
  'primary-color': '#C43A31',
  'primary-color-hover': '#E85D4A',
  'primary-color-bg': '#FDF0EE',
  'bg-color': '#FFFBF9',
  'border-color-base': '#F0D5CF',
}
</script>

<template>
  <LhConfigProvider :theme-vars="vermilionTheme">
    <LhButton type="primary">丹书铁券</LhButton>
  </LhConfigProvider>
</template>
```

## 花纹背景系统

组件库提供了一套国风诗意花纹背景系统，支持 6 种预设花纹，可配合 `patternComponents` 白名单精确控制应用范围。

### 预设花纹

| 花纹名 | CSS 变量 | 说明 |
|--------|----------|------|
| 柳叶 | `var(--lh-pattern-willow)` | 细长柳叶，疏密有致 |
| 祥云 | `var(--lh-pattern-cloud)` | 祥云舒展，蜿蜒流转 |
| 水波 | `var(--lh-pattern-water)` | 涟漪微动，层层叠叠 |
| 雪花 | `var(--lh-pattern-snow)` | 六角雪花，细枝分岔 |
| 梅花 | `var(--lh-pattern-plum)` | 五瓣舒展，蕊心分明 |
| 竹叶 | `var(--lh-pattern-bamboo)` | 披针形竹叶，错落有致 |

### 全局花纹配置

#### Composition API

```vue
<script setup lang="ts">
const config = {
  themeVars: {
    'bg-pattern': 'var(--lh-pattern-cloud)',
    'bg-pattern-opacity': '0.15',
  },
  patternComponents: ['button', 'input'] as const,
}
</script>

<template>
  <LhConfigProvider
    :theme-vars="config.themeVars"
    :pattern-components="config.patternComponents"
  >
    <!-- 按钮和输入框会应用纹理，Dialog 不会 -->
    <LhButton>带花纹的按钮</LhButton>
    <LhInput placeholder="带花纹的输入框" />
  </LhConfigProvider>
</template>
```

#### Options API

```vue
<script>
export default {
  data() {
    return {
      config: {
        themeVars: {
          'bg-pattern': 'var(--lh-pattern-cloud)',
          'bg-pattern-opacity': '0.15',
        },
        patternComponents: ['button', 'input'],
      },
    }
  },
}
</script>

<template>
  <LhConfigProvider
    :theme-vars="config.themeVars"
    :pattern-components="config.patternComponents"
  >
    <LhButton>带花纹的按钮</LhButton>
  </LhConfigProvider>
</template>
```

### 花纹变量参考

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `--lh-bg-pattern` | 花纹背景 URL | `none` |
| `--lh-bg-pattern-repeat` | 平铺模式 | `repeat` |
| `--lh-bg-pattern-size` | 花纹大小 | `40px` |
| `--lh-bg-pattern-opacity` | 花纹透明度 | `0.15` |
| `--lh-bg-pattern-color` | 花纹颜色 | `var(--lh-decoration-color, rgba(184, 134, 11, 0.12))` |
| `--lh-bg-pattern-blend` | 混合模式 | `soft-light` |

## 完整配置示例

以下展示 ConfigProvider 的完整配置用法，整合主题、语言、尺寸、花纹等所有能力。

#### Composition API

```vue
<script setup lang="ts">
import { zhCN } from '@lh-ui/vue3'

const configProvider = {
  size: 'medium' as const,
  locale: zhCN,
  themeVars: {
    'primary-color': '#2B4C7C',
    'bg-pattern': 'var(--lh-pattern-cloud)',
    'bg-pattern-opacity': '0.15',
  },
  patternComponents: ['button', 'input', 'dialog'],
}
</script>

<template>
  <LhConfigProvider
    :size="configProvider.size"
    :locale="configProvider.locale"
    :theme-vars="configProvider.themeVars"
    :pattern-components="configProvider.patternComponents"
  >
    <slot />
  </LhConfigProvider>
</template>
```

#### Options API

```vue
<script>
import { zhCN } from '@lh-ui/vue3'

export default {
  data() {
    return {
      configProvider: {
        size: 'medium',
        locale: zhCN,
        themeVars: {
          'primary-color': '#2B4C7C',
          'bg-pattern': 'var(--lh-pattern-cloud)',
        },
        patternComponents: ['button', 'input', 'dialog'],
      },
    }
  },
}
</script>

<template>
  <LhConfigProvider
    :size="configProvider.size"
    :locale="configProvider.locale"
    :theme-vars="configProvider.themeVars"
    :pattern-components="configProvider.patternComponents"
  >
    <slot />
  </LhConfigProvider>
</template>
```

## 主题变量优先级

组件最终的 CSS 变量会按以下优先级合并（后者覆盖前者）：

1. ConfigProvider 全局 `themeVars`（最低优先级）
2. ConfigProvider 按组件 `componentTheme[组件名]`
3. 组件自身 `themeVars` prop
4. 组件自身 `bgPattern` prop（最高优先级）

对于 `bg-pattern` 变量，还会额外受到 `patternComponents` 白名单控制：只有白名单中的组件才会应用全局配置的 `bg-pattern`。

## sx 快速布局

`sx` 属性提供了一种声明式的内联布局方式，无需编写 CSS 即可设置组件的间距和尺寸。目前已在以下组件中支持：Button、Input、Dialog、Tooltip、Alert、Card、Empty、Breadcrumb、Pagination、Steps、Tabs、Skeleton。

### 原理

`sx` 基于 `8px` 基准网格，数字乘 `8` 得到实际像素值。例如 `mt: 2` 等价于 `marginTop: 16px`。

### 支持属性

#### 间距

| 属性 | 说明 | 示例 | 等效 CSS |
|------|------|------|----------|
| `m` | 四边外间距 | `m: 2` | `margin: 16px` |
| `mx` | 水平外间距 | `mx: 1` | `marginLeft: 8px; marginRight: 8px` |
| `my` | 垂直外间距 | `my: 1` | `marginTop: 8px; marginBottom: 8px` |
| `mt`, `mr`, `mb`, `ml` | 单边外间距 | `mt: 2` | `marginTop: 16px` |
| `p` | 四边内间距 | `p: 3` | `padding: 24px` |
| `px` | 水平内间距 | `px: 2` | `paddingLeft: 16px; paddingRight: 16px` |
| `py` | 垂直内间距 | `py: 1` | `paddingTop: 8px; paddingBottom: 8px` |
| `pt`, `pr`, `pb`, `pl` | 单边内间距 | `pt: 2` | `paddingTop: 16px` |

#### 尺寸

| 属性 | 说明 | 示例 |
|------|------|------|
| `w` | 宽度（数字为 px，字符串为值本身） | `w: 200` 或 `w: '100%'` |
| `h` | 高度 | `h: 100` 或 `h: 'auto'` |

#### Flex 布局

| 属性 | 说明 | 示例 |
|------|------|------|
| `display` | 显示类型 | `display: 'flex'` |
| `flex` | flex 简写 | `flex: '1 1 0%'` |
| `flexDirection` | 主轴方向 | `flexDirection: 'column'` |
| `alignItems` | 交叉轴对齐 | `alignItems: 'center'` |
| `justifyContent` | 主轴对齐 | `justifyContent: 'flex-end'` |

### 使用示例

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <!-- 按钮间距 -->
  <LhButton type="primary" :sx="{ mt: 2, mx: 1 }">带间距的按钮</LhButton>

  <!-- 输入框外间距 -->
  <LhInput placeholder="输入框上下间距" :sx="{ my: 1 }" />

  <!-- Dialog 宽度：sx 仅支持 w/h 与间距类属性 -->
  <LhDialog v-model="visible" title="示例" :sx="{ w: 480 }">
    <p>固定宽度的对话框</p>
  </LhDialog>
</template>
```

```vue options
<script>
export default {
  data() {
    return { visible: false }
  },
}
</script>

<template>
  <LhButton type="primary" :sx="{ mt: 2, mx: 1 }">带间距的按钮</LhButton>
</template>
```

