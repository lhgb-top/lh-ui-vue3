# 设计理念

lh-ui-plus 以"以国风之美，筑代码之基"为设计哲学，将中国传统美学融入现代前端工程实践。

## 国风美学

### 配色体系

| 色彩 | 取源 | 色值 | 用途 |
|------|------|------|------|
| 靛蓝 | 青花瓷釉色 | `#2B4C7C` | 主色调（`--lh-primary-color`） |
| 松花绿 | 竹影青翠 | `#5B8C5A` | 成功色（`--lh-success-color`） |
| 藤黄 | 秋叶金黄 | `#C4A35A` | 警告色（`--lh-warning-color`） |
| 朱砂 | 印泥朱红 | `#B23A3A` | 危险色（`--lh-danger-color`） |
| 黛色 | 水墨淡彩 | `#7A7A7A` | 信息色（`--lh-info-color`） |
| 水墨 | 墨分五色 | `#2C2C2C` | 文字色（`--lh-text-color-primary`） |
| 宣纸 | 古宣纸白 | `#FAF6F0` | 背景色（`--lh-bg-color`） |

完整色板与层级见[主题定制](/guide/theme-customization)。

### 花纹背景

组件库内置 6 种传统花纹 SVG 背景（通过 `--lh-bg-pattern` 应用，值为对应 CSS 变量）：

- **willow** — 柳叶纹（轻柔雅致，`--lh-pattern-willow`）
- **cloud** — 祥云纹（吉祥如意，`--lh-pattern-cloud`）
- **water** — 水波纹（流动自然，`--lh-pattern-water`）
- **snow** — 雪花纹（六角晶莹，`--lh-pattern-snow`）
- **plum** — 梅花纹（高洁清雅，`--lh-pattern-plum`）
- **bamboo** — 竹叶纹（坚韧不屈，`--lh-pattern-bamboo`）

## 跨框架架构

核心逻辑提取为纯函数，与框架解耦：

```
@lh-ui/share           纯逻辑层 + 样式源（无框架依赖，以 npm 依赖引入）
packages/components/    Vue 3 组件封装层
packages/composables/  Vue 专属 composables
```

## TypeScript 驱动

全链路 TypeScript 类型安全：

- Props/Emit 强类型定义
- 事件回调签名携带载荷类型
- IDE 智能补全
- 类型覆盖率以 `pnpm typecheck` 守护（`LhSxProps` 等动态工具类型保留受控的索引签名）

## CSS 变量主题系统

88+ CSS 设计 token，以 `--lh-*` 命名前缀。支持实时主题切换、暗色模式、ConfigProvider 全局配置。

## 国际化

内置 ConfigProvider 配置体系，支持多语言统一管理。
当前内置完整语言包：zh-CN、en-US；ja-JP、ko-KR、de-DE、fr-FR 已注册为结构占位（未翻译部分暂以英文兜底），可按[国际化](/guide/i18n)扩展补全。

## 无障碍访问

- 键盘导航
- ARIA 属性
- WCAG 2.1 AA 颜色对比度

> 以国风之美，筑代码之基。
