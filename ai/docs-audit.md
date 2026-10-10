# 文档审计报告 / Docs Audit Report

> 创建时间: 2026-09-15
> 状态: 历史快照（问题均已修复，见文末「后续复核」）

> 本报告记录 2026-09-15 当时的一次审计。其中的"当前状态"描述已随后续工作过时，保留原文作为问题记录；最新状态以 `ai/项目分析.md` §5 与 `ai/docs-site-overhaul-plan.md` 为准。

## 审计范围

- `docs/components/` 下所有中文组件文档 (22个文件)
- `docs/guide/` 下所有指南文档 (5个文件)
- `docs/en/` 英文文档目录 (5个文件, 严重不完整)

## 发现的主要问题

### 1. 缺少英文文档 (P0)

`docs/en/components/` 缺少 17 个组件文档:
- avatar, badge, cascader, checkbox, date-picker
- descriptions, form, icon, input-number
- progress, radio, slider, statistic
- switch, tag, time-picker, tooltip

### 2. 缺少交互示例 (P1)

大部分英文文档仅有代码块，缺少 `<DemoBlock>` 渲染预览

### 3. 缺少 Composition/Options API 配对 (P1)

部分文档代码块仅有一种 API 风格，未提供切换功能

### 4. DemoBlock 与代码块不匹配 (P1)

DemoBlock 中的组件配置与下方代码块不完全一致

### 5. import 路径不一致 (P0)

部分文档使用 `lh-ui-plus` 而非统一 `lh-ui`

### 6. 亮色模式代码块不可见 (P0)

自定义主题强制代码块背景为深色，导致亮色模式下看不清

### 7. 英文站点 API 切换按钮缺失 (P2)

ApiLayout.vue 仅匹配 `components/` 路径

## 修复状态

| 问题 | 状态 |
|------|------|
| 英文文档缺失 | 已修复 |
| DemoBlock 补充 | 已修复 |
| API 配对 | 已修复 |
| import 路径统一 | 已修复 |
| 亮色模式代码块 | 已修复 |
| API 切换按钮 | 已修复 |

## 验证命令

```bash
pnpm docs:build
pnpm docs:dev
```

---

## 后续复核（2026-09-18）

- 英文组件文档已补齐（2026-09-18 复核时为 22 篇，随 Wave A/B/C 及第十七轮 sx 文档同步，现已 **36 篇**，与中文一一对应），不再有不完整问题。
- 上述修复项在本次复核中重新验证，唯一新发现的遗留缺陷是**英文页交互 demo 缺页面级状态声明**（`dialog`/`input`/`select` 三页），已于 2026-09-18 修复（待验证），明细见 `ai/项目分析.md` §5.1'''' DOC-2。
- 持续防回归：`scripts/fix-docs-demo-state.mjs` 可扫描任意文档页 DemoBlock 使用了未声明状态的情况。
