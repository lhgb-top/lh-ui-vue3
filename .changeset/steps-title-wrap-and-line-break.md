---
'@lh-ui/vue3': patch
---

# LhSteps 标题换行修复 + 横向定宽折行

此前横向步骤条在容器宽度不足时会把 `title` 挤压换行（步骤项 `flex:1`、标题无 `white-space`
规则），连接线与圆圈错位。本次让标题保持一行、由步骤项整体承担折行，横向纵向都不再换标题。

## 修复内容

- **标题一行**：标题始终单行显示，超长以省略号截断（样式在 `@lh-ui/share/styles/steps`，
  红线 2，本仓不持有）
- **横向定宽折行**：容器放得下时各步等分一行（视觉不变），放不下时整步折到下一行；折行位置
  以 `--lh-steps-item-basis`（默认 `160px`）为基准，可通过组件新增的 `themeVars` prop 或
  `LhConfigProvider` 的 `componentTheme.steps` 覆盖
- **行末连接线隐藏**：`LhSteps` 挂载后以 `ResizeObserver`（不可用时守卫跳过）测量各步骤项
  `offsetTop`，经 share 的 `getStepsLineLastIndices` 算出每行最后一项，打
  `lh-steps__item--line-last` 类，其连接线由样式隐藏，不指向行尾空白
- **`LhSteps` 新增 `themeVars` prop**：与 button/card 等同构，走 `useLhComponentTheme`；
  `LhThemeableComponent` 相应补 `steps`，`componentTheme.steps` 类型可用
- **顺带修复「末项连接线首屏全漏画」**：连接线的「非末项」判定原本依赖 JS 类
  `lh-steps__item--last`，而该类基于子项注册总数计算——子项在各自 setup 阶段渲染，
  此时后续兄弟尚未注册，导致**每一个步骤在首屏（含 SSR/SSG 快照）都被判为末项**，
  连接线全部被隐藏，一个 tick 后才自纠正。现由 share 侧改为结构性 `:last-child`，
  纯 CSS、任意渲染时机都正确；本仓 `step.vue` 的 `total`/`isLast` 计算与
  `lh-steps__item--last` 类随之移除（vue2 仓无 steps 组件，无下游影响）

## 文档与测试

- `docs/components/steps.md`（中英）补「定宽折行」示例与「组件级变量」小节，类型块与 API 表
  已按生成器口径同步（`types:check`/`api:check` 本组件无漂移）
- `tests/components/steps.spec.ts` 补行末标记、纵向不标记、themeVars 下发三个用例；
  原「仅末项标记 `--last`」用例改为「不再输出 last 类」

> 样式与判定函数的改动在 `@lh-ui/share`（见 share 仓 changeset），本仓随其后发版。
