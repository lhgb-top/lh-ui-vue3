# PT (PassThrough) 与 sx 功能调研报告

> 创建时间：2026-09-15
> 最后更新：2026-09-25（sx 已接入 34 个组件、顶层样式组件全覆盖，明细见 §八）
> 研究对象：`packages/core/shared/pt.ts` 和 `packages/core/shared/sx.ts`

## 一、功能概述

### PT (PassThrough) — 内部元素样式透传

**设计意图**：允许消费者精确控制组件内部元素的 class、style 和 HTML 属性，而不需要修改组件源码或编写 CSS hack。

```ts
interface PtAttrs {
  class?: string | string[] | Record<string, boolean>  // 类名透传
  style?: Record<string, string>                         // 内联样式透传
  attrs?: Record<string, any>                            // HTML 属性透传
}
```

**当前实现文件**：`packages/core/shared/pt.ts`（46 行，`mergePt` 函数）

### sx — 原子化内联样式

**设计意图**：提供 Tailwind CSS 风格的快捷属性（`mt`, `px`, `flex` 等），自动转换为标准 CSS 内联样式，避免写 `<style scoped>` 覆盖。

```ts
interface SxProps {
  mt?: number       // marginTop: 24px (3 * 8px)
  px?: number       // paddingLeft + Right: 16px (2 * 8px)
  w?: string | number
  display?: string
  flex?: string
  flexDirection?: 'row' | 'column'
  // ...
}
```

**当前实现文件**：`packages/core/shared/sx.ts`（95 行，`sxToStyle` 函数）

## 二、竞品参考

| 库 | PT 功能 | 原子化样式 | 备注 |
|----|---------|-----------|------|
| **Naive UI** | 支持 `pt` + `sx` | 支持 `sx` | 最知名的 PT/sx 实现，每个组件都支持 |
| **Element Plus** | 不支持 | 不支持 | 依赖 CSS 变量 + Scoped CSS |
| **Ant Design Vue** | 不支持 | 不支持 | 依赖 `customize` CSS 变量 |
| **Vuetify** | 不支持 | 不支持 | 依赖 Density 系统 + 主题 |

PT/sx 是 Naive UI 的独有特性，其他主流库不采用此方案。

## 三、优点分析

### PT (PassThrough) 的优点

1. **精准控制**：可以精确定位到组件内部某个元素（如 `button-text`、`input-wrapper`），无需 CSS 选择器穿透
2. **类型安全**：通过 Props 传递，IDE 可以提供自动补全
3. **框架无关**：本质是纯函数合并，不绑定 Vue 模板
4. **解决极客需求**：对于需要微调的场景（如按钮内部图标位置），比 CSS 变量更灵活

### sx 的优点

1. **零 CSS**：声明式内联样式，无需写 SCSS 文件
2. **间距系统**：基于 `8px` 基准的 Tailwind 式数字映射，保证设计一致性
3. **快速布局**：`<LhButton sx={{ mt: 2, ml: 1 }}>` 比 `<div style="margin: 16px 8px"><LhButton>快速上手`
4. **响应式友好**：可以作为计算属性动态生成

## 四、缺点分析

### PT (PassThrough) 的缺点

1. **破坏组件封装**：允许修改内部元素相当于暴露实现细节，如果内部结构变更可能导致用户使用方式 breaking
2. **增加复杂度**：每个组件需要额外处理 pt prop 的合并逻辑（每个内部元素都要 `mergePt`）
3. **维护负担**：组件重构时不仅要保证功能，还要保证 pt 透传的稳定
4. **文档成本高**：每个组件需要文档说明可透传的"key"列表

### sx 的缺点

1. **内联样式污染**：大量内联样式会导致 DOM 膨胀（每个实例都有完整 style 对象）
2. **功能受限**：内联样式无法使用伪类（`:hover`, `:focus`）、媒体查询、动画等
3. **与 CSS 变量冲突**：如果组件使用 CSS 变量，sx 的内联样式会覆盖变量优先级，可能导致主题切换失效
4. **设计一致性破坏**：虽然间距系统有单位但消费者仍可能写任意值

## 五、工作量评估

### 如果要实现 PT

| 步骤 | 工作量 | 说明 |
|------|--------|------|
| 1. 定义组件内部元素 key 映射表 | 中等 | 每个组件需要定义"可透传的key到DOM元素"映射 |
| 2. 在组件 Props 中声明 `pt` 属性 | 低 | 类型定义 |
| 3. 在组件内部调用 `mergePt` | 中等 | 每个内部元素位置都需要调用 |
| 4. 新增测试覆盖 | 中等 | 每个组件需要 pt 透传测试 |
| 5. 文档补充 | 中等 | API 表格 + 示例 |
| **总计** | **约 2-3 天/组件** | 22 个组件约需 3 周 |

### 如果要实现 sx

| 步骤 | 工作量 | 说明 |
|------|--------|------|
| 1. 在组件 Props 中声明 `sx` prop | 低 | 类型定义 |
| 2. 根元素应用 `sxToStyle(props.sx)` | 低 | 只需根元素处理 |
| 3. 测试覆盖 | 低 | 间距/尺寸转换测试 |
| 4. 文档 | 低 | API 表格 + 示例 |
| **总计** | **约 0.5 天/组件** | 22 个组件约需 1 周 |

## 六、与现主题系统的关系

本项目已有 CSS 变量主题系统（88+ token），这已经提供了"全局可控的定制能力"。PT/sx 是"实例级"的定制能力，两者的定位不同：

| | CSS 变量主题 | PT/sx |
|---|----------|----------|
| **作用范围** | 全局 / 组件级 | 单实例级 |
| **优先级** | 中等（可被内联覆盖） | 最高（内联不可被覆盖） |
| **主题切换** | 支持（CSS 变量实时切换） | 不支持（内联写死） |
| **伪类支持** | 支持（SCSS 中可以写 `:hover`） | 不支持 |

## 七、结论与建议

### 不值得全面实现 PT

理由：
1. **破坏封装**：组件库的核心价值之一是封装细节，PT 是反方向操作
2. **工作量巨大**：22 个组件 x 2-3 天约 3 周开发 + 持续维护成本
3. **有替代方案**：CSS 变量主题系统 + `themeVars` prop 已经覆盖 95% 的定制需求
4. **竞品很少采用**：只有 Naive UI 采用，Element Plus / Ant Design 均不采用

### 可考虑局部实现 sx（轻量版）

理由：
1. **实现成本低**：仅根元素需要处理，每个组件约 10 行代码
2. **解决痛点**：间距调整确实是高频需求
3. **不破坏封装**：sx 只作用于根元素，不暴露内部结构
4. **与主题系统互补**：sx 处理间距/尺寸，CSS 变量处理颜色，不冲突

### 推荐方案

**方案 A（推荐）：保留 sx，放弃 PT**
- sx 可以实现轻量版（仅根元素 + 常用属性）
- PT 不实现，因为 `themeVars` + CSS 变量已满足定制需求
- 首页描述改为"CSS 变量主题系统 + sx 快速布局"

**方案 B：都不实现**
- 全面依赖 CSS 变量主题系统
- 间距需求通过 `style` prop 或包裹 div 解决
- 首页描述改为"CSS 变量主题系统"

**方案 C：全面实现（不推荐）**
- 实现完整的 PT + sx，走 Naive UI 路线
- 需要 1-2 个月全量接入
- 维护成本显著增加

### 最终建议

**采用方案 A**：
1. 先接入 sx 到 3-5 个高频组件（Button、Input、Dialog、Tooltip、Card）作为演示
2. 首页描述改为"sx 快速布局 + CSS 变量主题系统"
3. PT 暂不实现，但保留代码以备未来决策

## 八、实际进度核实（2026-09-18）

### PT 状态

- `packages/core/shared/pt.ts` 文件存在：是（46行，`mergePt` 函数）
- `packages/core/shared/index.ts` 导出 pt：是
- 组件调用 `mergePt`：0 个（搜索零匹配）
- 结论：决策维持 - 不实现

### sx 状态（2026-09-25 更新）

- `packages/core/shared/sx.ts` 文件存在：是（95行，`sxToStyle` 函数）
- `packages/core/shared/index.ts` 导出 sx：是
- 组件声明 `sx` prop：34 个（见下表）
- 组件调用 `sxToStyle`：34 个（同上）
- 首页宣传 sx：是（`docs/index.md` 改为"支持 sx 快速布局"，表述更谨慎）

**已接入组件明细（34 项，顶层样式组件全覆盖）**：

| 组件 | types.ts 声明 | 接入位置 | 完成度 |
|------|----------|------------|--------|
| Button | 是 | composable | 100% |
| Input | 是 | composable | 100% |
| Dialog | 是 | composable | 100% |
| Tooltip | 是 | composable（触发器根元素） | 100%（待验证） |
| Card | 是 | composable | 100%（待验证） |
| Alert | 是 | SFC 内联 | 100%（待验证） |
| Empty | 是 | SFC 内联 | 100%（待验证） |
| Skeleton | 是 | SFC 内联 | 100%（待验证） |
| Breadcrumb | 是 | SFC 内联 | 100%（待验证） |
| Pagination | 是 | SFC 内联 | 100%（待验证） |
| Tabs | 是 | SFC 内联 | 100%（待验证） |
| Steps | 是 | SFC 内联 | 100%（待验证） |
| Popover | 是 | composable | 100%（待验证） |
| Popconfirm | 是 | composable | 100%（待验证） |
| Drawer | 是 | composable | 100%（待验证） |
| Dropdown | 是 | composable | 100%（待验证） |
| Divider | 是（2026-09-20 第十五轮） | SFC 内联 | 100%（待验证） |
| Space | 是（2026-09-20 第十五轮，合并进既有 `spaceStyle`） | SFC 内联 | 100%（待验证） |
| Avatar | 是（2026-09-25 第十七轮，复用既有 `avatarStyle`） | SFC 内联 | 100%（待验证） |
| Badge | 是（2026-09-25 第十七轮） | SFC 内联 | 100%（待验证） |
| Cascader | 是（2026-09-25 第十七轮，作用于触发器根元素） | SFC 内联 | 100%（待验证） |
| Checkbox | 是（2026-09-25 第十七轮） | SFC 内联 | 100%（待验证） |
| DatePicker | 是（2026-09-25 第十七轮，作用于触发器根元素） | SFC 内联 | 100%（待验证） |
| Descriptions | 是（2026-09-25 第十七轮） | SFC 内联 | 100%（待验证） |
| Form | 是（2026-09-25 第十七轮） | SFC 内联 | 100%（待验证） |
| InputNumber | 是（2026-09-25 第十七轮） | SFC 内联 | 100%（待验证） |
| Progress | 是（2026-09-25 第十七轮） | SFC 内联 | 100%（待验证） |
| Radio | 是（2026-09-25 第十七轮） | SFC 内联 | 100%（待验证） |
| Select | 是（2026-09-25 第十七轮，作用于触发器根元素） | SFC 内联 | 100%（待验证） |
| Slider | 是（2026-09-25 第十七轮） | SFC 内联 | 100%（待验证） |
| Statistic | 是（2026-09-25 第十七轮） | SFC 内联 | 100%（待验证） |
| Switch | 是（2026-09-25 第十七轮） | SFC 内联 | 100%（待验证） |
| Tag | 是（2026-09-25 第十七轮） | SFC 内联 | 100%（待验证） |
| TimePicker | 是（2026-09-25 第十七轮，作用于触发器根元素） | SFC 内联 | 100%（待验证） |

**口径说明**：`packages/components` 共 36 个组件目录，`config-provider`（无样式根、职责是下发上下文）与 `icon`（无根容器）按设计不接入，故顶层样式组件口径为 34 个，**34/34 全覆盖**。checkbox-group / radio-group / form-item 等已注册子组件不纳入该口径（分组的布局职责由父级 gap/对齐承担，form-item 的间距由表单行样式控制）。

**结论**：sx 已完成顶层样式组件全覆盖（34/34，2026-09-25 第十七轮收官），后续新组件按交付清单默认接入即可，不再有存量欠账。Card 于第九轮（组件扩充计划 Wave A）落地时同步接入 `useLhComponentTheme` + `sxToStyle`；第十七轮的 16 个存量组件均为 SFC 内联接入（均无 composable），avatar 复用既有空 `avatarStyle`。中英文档（32 个组件页 + `theme-customization` 指南）均已补 sx Props 行。

### 风险

首页文案已修正为"CSS 变量主题系统 + 花纹背景，支持 sx 快速布局"，消除了"已有"意味。Tooltip 的 sx 作用于触发器根元素（popper 已 teleport 到 body），文档已注明该差异。