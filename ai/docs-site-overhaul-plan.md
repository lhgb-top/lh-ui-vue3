# 文档站点全面优化执行计划 / Docs Site Overhaul Plan

> **状态**: 已完成（全链路交付完成，验证清单见节点 8，**待用户手动验证**）
> **创建日期**: 2026-09-18
> **最后更新**: 2026-09-18

## 目标 / Objectives

打造上线即完美的文档站点：白色大气布局、多个东方美学主题、完善的多语言支持（扩展架构）、丰富的介绍文档、SEO 优化、极具吸引力的首页。

---

## 节点 1: 语言扩展架构 / Language Extensible Architecture

### 当前状态
- `LH_LANGUAGE_CONST`: 仅 zh-CN, en-US
- `packages/locales/lang/`: 仅 zh-CN.ts, en-US.ts
- 无日语/韩语预留

### 交付内容
1. **constants/index.ts** — 语言常量可扩展（预留 jp-JP, ko-KR, de-DE, fr-FR 占位，marked `// TODO`）
2. **locales 目录结构** — 添加 `packages/locales/lang/ja-JP.ts`（空骨架，默认翻译）和 `packages/locales/lang/ko-KR.ts`（空骨架）
3. **locales/index.ts** — 语言加载器支持动态导入，不硬编码语言列表
4. **VitePress config** — 语言切换下拉菜单预留插槽，新语言只需添加 locale 配置 + 翻译文件即可接入
5. **主题 index.ts** — 全局 inject 当前语言状态，供组件使用

### 验证命令
```bash
pnpm typecheck
pnpm build
pnpm lint
```

### 状态: [x] 已完成（待用户手动验证）

**已完成项**：
- `constants/index.ts`: 预留 ja-JP, ko-KR, de-DE, fr-FR 占位（已注释）
- `packages/locales/lang/`: 新增 ja-JP.ts, ko-KR.ts, de-DE.ts, fr-FR.ts 骨架文件
- `packages/locales/index.ts`: 注册预留语言，支持动态切换
- `packages/locales/lang/README.md`: 语言包管理文档

**用户验证命令**：
```bash
pnpm typecheck
pnpm lint
```

---

## 节点 2: 个性化主题扩展 / Theme Pack Expansion

### 当前状态
- `packages/theme/src/common/var.scss`: 默认靛蓝青花瓷主题
- `packages/theme/src/common/var-dark.scss`: 暗色模式
- 组件通过 `themeVars` prop 切换主题

### 交付内容
1. **主题包类型定义** (`packages/theme/src/types.ts`) — 新增 `ThemePreset` 接口和预设常量枚举
2. **预设主题文件**：
   - `packages/theme/src/themes/cerblue.scss` — 青花瓷（靛蓝）- 已存在，迁移
   - `packages/theme/src/themes/songhua.scss` — 松花绿（竹影青翠）
   - `packages/theme/src/themes/zhusha.scss` — 朱砂（印泥朱红）
   - `packages/theme/src/themes/shuimo.scss` — 水墨黑白
   - `packages/theme/src/themes/golden.scss` — 藤黄（秋叶金黄）
3. **主题切换导出** (`packages/theme/src/themes/index.ts`) — 导出所有主题预设
4. **themeVars prop 更新** — 在 ConfigProvider 增加 `theme-name` 快捷切换
5. **主题展示文档** — 新增 `docs/guide/themes.md` 展示 5 种预设主题效果

### 验证命令
```bash
pnpm build
pnpm docs:build
```

### 状态: [x] 已完成（待用户手动验证）

**已完成项**：
- `packages/theme/src/types.ts` — ThemePreset 接口和 ThemePresetName 类型
- 5个预设主题 SCSS 文件已创建（cerblue, songhua, zhusha, shuimo, golden）
- `packages/theme/src/themes/index.ts` — 主题配置对象和切换函数
- `packages/theme/index.ts` — 导出主题类型和预设
- `docs/guide/themes.md` — 中文主题展示文档
- `docs/en/guide/themes.md` — 英文主题展示文档
- `docs/.vitepress/config.ts` — 侧边栏新增"预设主题"条目

**用户验证命令**：
```bash
pnpm build
pnpm docs:build
```

---

## 节点 3: 英文文档对齐 & import 规范 / En Docs Alignment & Import Convention

### 重要规范
> **所有文档 import 必须统一为 `'lh-ui'`**（不是 `'lh-ui-plus'`）
> 与中文文档保持一致，这是强制约定

### 当前状态
- 17 个英文组件文档已创建
- DemoBlock 已补全
- Composition/Options API 已配对

### 待完成任务
1. **import 路径统一** — 搜索所有 `lh-ui-plus` 替换为 `lh-ui`
2. **DemoBlock 与代码块对齐** — 确保 DemoBlock 渲染与下方代码块一致
3. **API 表格补充** — 确保每个组件都有完整 Props/Events/Slots

### 验证命令
```bash
pnpm docs:build
# 检查输出目录中文档内容
```

### 状态: [x] 已完成（待用户手动验证）

**已完成项**：
- 搜索 `docs/en/components/` 下所有文件，确认 import 统一为 `'lh-ui'`（无 `lh-ui-plus` 引用）
- DemoBlock 已补全（17个组件）
- Composition/Options API 已配对
- API 表格（Props/Events/Slots）已完整
- **补遗（2026-09-18，待验证）**：英文组件文档后来补齐至 22 篇；但 `dialog`/`input`/`select` 三页的 DemoBlock 引用了页面级状态（`visible`、`value`、`options`）却缺页面级 `<script setup>`，交互 demo 实际不可用。已补齐声明，审计脚本见 `scripts/fix-docs-demo-state.mjs`

**用户验证命令**：
```bash
pnpm docs:build
```

---

## 节点 4: 新增介绍文档 / New Documentation Pages

### 交付内容
1. **docs/guide/design-philosophy.md** — 设计理念（国风美学，水墨丹青，CSS 变量体系）
2. **docs/guide/migration.md** — 迁移指南（从 Element Plus / Ant Design 迁移）
3. **docs/guide/comparison.md** — 与其他 UI 库对比
4. **docs/guide/changelog.md** — 更新日志
5. **docs/guide/faq.md** — 常见问题
6. **docs/guide/contributing.md** — 贡献指南（参考 CONTRIBUTING.md）
7. **docs/guide/accessibility.md** — 无障碍访问指南

### 英文同步创建
- `docs/en/guide/design-philosophy.md`
- `docs/en/guide/migration.md`
- `docs/en/guide/comparison.md`
- `docs/en/guide/changelog.md`
- `docs/en/guide/faq.md`
- `docs/en/guide/contributing.md`
- `docs/en/guide/accessibility.md`

### config.ts 更新 — 新增侧边栏条目

### 验证命令
```bash
pnpm docs:build
```

### 状态: [x] 已完成（待用户手动验证）

**已完成项**：
- `docs/guide/design-philosophy.md` — 设计理念文档
- `docs/guide/migration.md` — 迁移指南
- `docs/guide/comparison.md` — 组件库对比
- `docs/guide/changelog.md` — 更新日志
- `docs/guide/faq.md` — 常见问题
- `docs/guide/contributing.md` — 贡献指南
- `docs/guide/accessibility.md` — 无障碍访问指南
- 7篇英文同步文档已创建
- `docs/.vitepress/config.ts` — 中/英文侧边栏已更新（"更多"分类）

**用户验证命令**：
```bash
pnpm docs:build
```

---

## 节点 5: 首页美化 / Landing Page Enhancement

### 当前状态
- 当前有 hero + features + LhHome 组件
- 缺少 Gallery 组件展示

### 交付内容
1. **docs/index.md** — 首页全面升级
   - Hero 区域增加背景动画
   - 功能展示区增加 Grid 布局动画
   - 数据统计区（GitHub Stars、npm 下载量、组件数量）
   - 组件 Gallery 预览（5 种预设主题）
   - 快速开始代码块
   - 内置中/英文切换按钮
2. **docs/.vitepress/components/LhHome.vue** — 首页增强组件
   - Gallery 组件预览
   - 主题切换器
   - 中/英文实时切换
3. **docs/en/index.md** — 英文首页同步
4. **docs/.vitepress/theme/style.css** — 首页中国风动画
   - 水墨背景渐变动画
   - hover 交互涟漪效果
   - 组件淡入动画（intersection observer）
   - 宣纸纹理底纹

### 验证命令
```bash
pnpm docs:dev
# 手动检查首页视觉效果
```

### 状态: [x] 已完成

---

## 节点 6: SEO 与性能优化 / SEO & Performance Optimization

### 交付内容
1. **meta 标签完善** — 在 config.ts 中增加 head 配置
   - description, keywords
   - Open Graph (og:title, og:description, og:image, og:url)
   - Twitter Card 兼容格式
2. **JSON-LD** — 添加 JSON-LD structured data (SoftwareApplication)
3. **favicon** — 使用项目 logo 生成 favicon.ico
4. **robots.txt** — 添加 sitemap 引用和索引规则
5. **404 页面** — 自定义 404 页面并回归首页链接
6. **sitemap.xml** — 启用 VitePress 内置 sitemap 插件

### 验证命令
```bash
pnpm docs:build
# 检查 .vitepress/dist/robots.txt, sitemap.xml
```

### 状态: [x] 已完成（待用户手动验证）

**已完成项**：
- `docs/.vitepress/config.ts` — meta 标签、Open Graph、Twitter Card、JSON-LD 已配置
- `docs/.vitepress/config.ts` — sitemap 插件已启用
- `docs/.vitepress/public/robots.txt` — 爬虫索引规则
- `docs/404.md` — 自定义 404 页面（中英双语）

**用户验证命令**：
```bash
pnpm docs:build
# 检查 .vitepress/dist/robots.txt, sitemap.xml
```

---

## 节点 7: 组件 & 主题修正 / Component & Theme Fixes

### 修正清单
1. **sx 接入** — Button、Input、Dialog、Tooltip 四个高频组件的 sx props 接入
2. **ConfigProvider themeVars 文档** — 完善所有可定制 CSS 变量的说明
3. **dark mode 组件适配** — 检查是否有遗留组件暗色模式异常
4. **i18n 组件文案** — 检查 Select, DatePicker, Cascader 等空状态是否全部支持 i18n

### 检查结果
#### sx 接入（2026-09-25 复核）

接入范围已从试点四件扩展到 **34 个组件，顶层样式组件全覆盖**（2026-09-25 第十七轮收官）：高频五件 + Wave A/B/C 全部新组件 + 存量 16 件（Avatar、Badge、Cascader、Checkbox、DatePicker、Descriptions、Form、InputNumber、Progress、Radio、Select、Slider、Statistic、Switch、Tag、TimePicker）。`config-provider` / `icon` 无样式根，按设计不接入。完整明细表（含 composable / SFC 内联两种接入位置）见 `ai/pt-sx-research.md` §八。

`packages/core/shared/sx.ts` 的 `sxToStyle()` 函数始终就绪。决策背景见 `ai/pt-sx-research.md`；后续新组件按交付清单默认接入，不再有存量欠账。四个 popper 组件（Cascader / Select / DatePicker / TimePicker）与 Tooltip 一致，sx 作用于触发器根元素，文档已注明。

#### ConfigProvider themeVars 文档
- `packages/components/config-provider/src/types.ts`：已有完整的 `themeVars`, `componentTheme`, `patternComponents` 定义 ✅
- 文档 `docs/components/config-provider.md`：已有 themeVars 示例 ✅

#### Dark mode 适配
- `packages/theme/src/common/var-dark.scss`：暗色变量完整（95行） ✅
- 所有 CSS 变量通过 `[data-theme='dark']` 选择器覆盖 ✅

#### i18n 组件文案
- `packages/locales/lang/zh-CN.ts`：覆盖 select、cascader、datepicker、timepicker 等组件 ✅
- `packages/locales/lang/en-US.ts`：英文翻译完整 ✅
- 预留语言包（ja-JP, ko-KR, de-DE, fr-FR）：使用英文作为兜底翻译 ✅

### 验证命令
```bash
pnpm lint
pnpm typecheck
pnpm build
```

### 状态: [x] 已完成（sx 18 组件接入 + i18n/dark mode 检查；sx 部分待用户验证）

> 历史记录：本节点最初写成「检查型节点 — 无需代码改动」，与修正清单第 1 项（sx 接入）自相矛盾，且当时对 Input/Dialog 状态的描述已过时。2026-09-18 按实测修正：Button/Input/Dialog 于 09-17 接入，Tooltip 于 09-18 接入；2026-09-20 复核时接入范围已扩至 18 个组件（随 Wave A/B/C 组件落地同步接入），明细见上方「sx 接入」小节。

---

## 节点 8: 全链路验证 / Full Pipeline Verification

### 用户手动验证命令

请按以下顺序执行验证：

```bash
# 1. 代码质量
pnpm lint
pnpm typecheck

# 2. 组件库构建
pnpm build

# 3. 文档站点构建
pnpm docs:build
```

### 验证清单
- [ ] `pnpm lint` — lint 通过
- [ ] `pnpm typecheck` — 类型检查通过
- [ ] `pnpm build` — 组件库构建通过
- [ ] `pnpm docs:build` — 文档站点构建通过
- [ ] 手工检查：中文首页、英文首页、组件文档、指南文档
- [ ] 手工检查：暗色模式、大图/小图适配
- [ ] 手工检查：API 风格切换按钮中英文站点均正常

### 状态: [x] 待用户手动验证（全链路交付完成）

---

## 最终执行报告 / Final Report

> **完成日期**: 2026-09-18
> **执行时间**: 约 3 小时

### 节点交付概览

| 节点 | 状态 | 交付内容 |
|------|------|----------|
| 节点 1 | [x] 完成 | 4 语言骨架 (ja-JP, ko-KR, de-DE, fr-FR)、constants 预留、locales 动态导入 |
| 节点 2 | [x] 完成 | 5 预设主题、类型定义、主题文档 |
| 节点 3 | [x] 完成 | 17+ 英文文档 import 规范 |
| 节点 4 | [x] 完成 | 14 篇介绍文档（7中+7英） |
| 节点 5 | [x] 完成 | LhHome 增强、中国风动画、数据统计、Gallery |
| 节点 6 | [x] 完成 | meta 标签、sitemap、robots.txt、404 页面 |
| 节点 7 | [x] 完成 | sx/i18n/dark mode 检查 |
| 节点 8 | [ ] 待用户验证 | lint/typecheck/build/docs:build |

### 新增文件清单

**locales (4)**：
- `packages/locales/lang/ja-JP.ts`
- `packages/locales/lang/ko-KR.ts`
- `packages/locales/lang/de-DE.ts`
- `packages/locales/lang/fr-FR.ts`

**themes (5)**：
- `packages/theme/src/themes/cerblue.scss`
- `packages/theme/src/themes/songhua.scss`
- `packages/theme/src/themes/zhusha.scss`
- `packages/theme/src/themes/shuimo.scss`
- `packages/theme/src/themes/golden.scss`

**docs (16)**：
- `docs/guide/design-philosophy.md`
- `docs/guide/migration.md`
- `docs/guide/comparison.md`
- `docs/guide/changelog.md`
- `docs/guide/faq.md`
- `docs/guide/contributing.md`
- `docs/guide/accessibility.md`
- `docs/guide/themes.md`
- `docs/404.md`
- `docs/en/guide/design-philosophy.md`
- `docs/en/guide/migration.md`
- `docs/en/guide/comparison.md`
- `docs/en/guide/changelog.md`
- `docs/en/guide/faq.md`
- `docs/en/guide/contributing.md`
- `docs/en/guide/accessibility.md`
- `docs/en/guide/themes.md`

**SEO (1)**：
- `docs/.vitepress/public/robots.txt`

### 用户手动验证命令

```bash
# 按顺序执行
pnpm lint
pnpm typecheck
pnpm build
pnpm docs:build
```

### 待办事项（需用户确认）
- ~~sx 接入 Input/Dialog/Tooltip 组件~~ — 已完成（2026-09-18，待验证），明细见节点 7
- 构建产物人工视觉检查

---

## 执行顺序 / Execution Order

```
节点 1 (语言架构) -> 节点 3 (英文对齐) -> 节点 4 (新增文档) -> 节点 2 (主题扩展) -> 节点 5 (首页美化) -> 节点 6 (SEO) -> 节点 7 (修正) -> 节点 8 (验证)
```

### 依赖关系
- 节点 3 可以在节点 1 完成后并行
- 节点 4 与节点 2 无依赖，可以并行
- 节点 5 依赖节点 2（主题扩展）
- 节点 7 依赖节点 3（英文补全）
- 节点 8 是最后一步

---

## 关键规范 / Key Conventions

1. **import 路径**: 所有文档统一 `'lh-ui'`（不是 `'lh-ui-plus'`）
2. **语言扩展**: 新语言只需 `packages/locales/lang/ja-JP.ts` + VitePress config + constants，不需要改核心逻辑
3. **主题扩展**: CSS 变量系统已支持动态切换，新增主题只需定义 `--lh-*` 变量即可
4. **中英文同步**: 每个中文文档新增/修改，必须同步英文版
5. **AI 验证**: 所有文件交付后，列出验证命令，用户手动执行验证
