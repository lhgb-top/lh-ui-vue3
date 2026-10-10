# 文档升级计划 / Docs Upgrade Plan

> 创建时间: 2026-09-15
> 最后更新: 2026-09-18
> 状态: 已交付 (待手动验证)

## P0 - 基础功能修复

1. 翻译缺失的 17 个英文组件文档
2. 为所有英文文档补充 `<DemoBlock>` 交互示例
3. 统一所有文档 import 路径为 `lh-ui`
4. 修复亮色模式代码块背景色
5. 修复英文站点 API 切换按钮

## P1 - 文档质量提升

### API 风格配对

每个组件文档示例必须同时提供 Composition API 和 Options API 两种格式：

#### Composition API

```vue
<script setup lang="ts">
import { LhComponentName } from 'lh-ui'
</script>

<template>
  <LhComponentName>Content</LhComponentName>
</template>
```

#### Options API

```vue
<script>
import { LhComponentName } from 'lh-ui'

export default {
  components: { LhComponentName }
}
</script>

<template>
  <LhComponentName>Content</LhComponentName>
</template>
```

### 自定义主题

每个组件应提供 `themeVars` 自定义主题示例：

```vue
<script setup>
import { LhComponentName } from 'lh-ui'
</script>

<template>
  <LhComponentName :theme-vars="{ 'primary-color': '#e63946' }">自定义主题色</LhComponentName>
</template>
```

### 国际化集成

```vue
<script setup>
import { LhConfigProvider, LhComponentName } from 'lh-ui'
import enUS from 'lh-ui/locales/en-US'
</script>

<template>
  <LhConfigProvider :locale="enUS">
    <LhComponentName>English Context</LhComponentName>
  </LhConfigProvider>
</template>
```

## P2 - 未来优化

1. 新增设计理念文档 (`docs/guide/design-philosophy.md`)
2. 新增更新日志文档 (`docs/guide/changelog.md`)
3. 新增 FAQ 文档 (`docs/guide/faq.md`)
4. 新增贡献指南 (`docs/guide/contributing.md`)
5. 首页 Gallery 组件展示
6. SEO 优化 (meta, Open Graph, structured data)

## 开发规范

1. **代码块标注**: 使用 `` ````vue composition ```` 和 `` ````vue options ```` 标注 API 风格
2. **Composition API** 使用 `<script setup>` 语法
3. **中文注释和说明**
4. **每个示例确保有 DemoBlock 交互演示 + 代码块**
5. **确保 `themeVars` 在 Props 表格中列出**
6. **API 表格保持一致格式**
7. **示例中使用 `lh-ui` 包名导入**（非相对路径）
8. **花纹名称使用英文名**（willow, cloud, wave, mountain, plum, bamboo）
