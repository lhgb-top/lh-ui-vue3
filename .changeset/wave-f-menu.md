---
"@lh-ui/vue3": minor
---

新增 Wave F 首个组件 **LhMenu 导航菜单**（+ LhMenuItem / LhSubMenu / LhMenuItemGroup）：

- **两种布局**：垂直（`role="menu"`，子菜单内联展开）与水平（`role="menubar"`，子菜单飞出面板）
- **嵌套子菜单**：LhSubMenu 可递归嵌套，provide/inject 上下文传递激活态 / 展开态 / 深度；飞出定位复用 popper 引擎（flip / shift / 触发器滚出视口自动收起）
- **受控 / 非受控双模**：`v-model` 激活项、`openeds`（或 `defaultOpeneds`）展开态；`uniqueOpened` 手风琴约束
- **折叠态**：`collapse` 把垂直菜单收成图标条，子菜单改为飞出面板
- **分组**：LhMenuItemGroup 提供不可选的分组标题（`role="group"`）
- **无障碍**：APG menu pattern——Enter/Space/→ 展开并聚焦首项、← 收起、Esc 关闭，roving tabindex，禁用项保留焦点位；内联展开用 CSS `grid-template-rows: 0fr/1fr` 零测高过渡
- 主题变量 `--lh-menu-*`（三处 + 暗色）、i18n `menu.submenuLabel`（六语言同步）、sx 接入
