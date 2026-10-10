---
"@lh-ui/vue3": patch
---

全面修正文档示例与描述的一致性错误（中英文同步）：

- **`guide/themes`**：开头改为同时说明全局（`usePresetTheme`）与局部（`LhConfigProvider`）两种切换方式；为松花绿/朱砂/水墨/藤黄四个小节补齐缺失的 template 与预设名；修复「局部作用域切换」代码示例把切换按钮错误放进 Provider 内部（与实际 DemoBlock 行为相反）；统一前缀写法说明（`getThemeVars` 带前缀、`usePresetTheme.themeVars` 去前缀，均可直传 `:theme-vars`）；合并重复 import；主题对比表列名改为明确 CSS 变量名并注明预设仅覆盖主色色板。
- **不可运行的示例**：删除 `installation` 中不存在的 `LhUiPlusResolver` 自动按需引入章节；修复 `getting-started` 的 `:config` prop（不存在）、`size: 'default'`（非法值）与 `zhCn` 导入；修复 `faq` 的 `toggleDark`（应为 `toggleTheme`）、无效 `sx` 的 `bg` 属性、`patternComponents` 的 `LhButton` 大小写错误及缺失的 `###` 标题；修复 `button` 国际化示例 `computed` 未导入；补全 `button` Props 的 `error` 类型。
- **DemoBlock 渲染空白**：`config-provider` 的花纹演示 `bg-pattern="willow"` 是无效 CSS（不渲染），改为 `var(--lh-pattern-willow)`；同步修复 `theme-patterns` 的同类写法与未定义的 `visible` 变量。
- **虚构的 API/属性**：移除 `LhConfigProvider` 的 `zIndex` prop（不存在）及 `:z-index` 示例；修复 `LhSlot`（不存在）、`sx` 的 `maxWidth`（不受支持）；`accessibility` 的 ARIA 示例改为真实 DOM 输出，并将未实现的焦点管理标注为待实现。
- **错误的取值与术语**：`design-philosophy` 配色表 4 处色值与源码不符、花纹名 `wave`/`mountain` 不存在（实为 `water`/`snow`）、"零 any" 表述不实、i18n 支持范围与 `comparison`/`migration` 的第三方对比错误（Element Plus/Ant Design Vue 均有暗色模式，Naive UI 无 sx/PassThrough）。
- **导入路径**：全库示例统一为真实包名 `@lh-ui/vue3`（80 处 `lh-ui/locales/*` 子路径不存在、39 处裸 `lh-ui` 在消费者项目中不可解析），修正 `zhCn`/`enUs` 大小写。
