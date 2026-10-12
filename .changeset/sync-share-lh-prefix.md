---
"@lh-ui/vue3": minor
---

跟随 share 仓命名规范收敛，同步本仓全部引用（breaking rename，机械替换）

`@lh-ui/share` 已把非第三方公共符号补齐 `LH` 前缀（见 share 的 `lh-prefix-naming` changeset），
本仓同步消费侧改名，本地联动即时生效：

- `SxProps` → `LhSxProps`（约 150 处组件 Props 声明，`packages/components` 全量）
- `ThemePresetName` → `LhThemePresetName`、`THEME_PRESETS` → `LH_THEME_PRESETS`
  （`packages/composables` 主题切换）
- `Leaves` → `LhLeaves`、`LocaleOptions` → `LhLocaleOptions`（本仓 `types/locale.ts` 本地副本，
  与 share 同步）
- `packages/locale/index.ts`：share 已直接导出 `LhLocalePath`，
  `type LocalePath as LhLocalePath` 的别名简化为 `type LhLocalePath`，外部导出面不变
- docs 全量 props 表格与示例代码同步（`SxProps` → `LhSxProps`）

用户侧迁移：从 `@lh-ui/vue3` 引入的类型名按上表改 import 即可；`zhCN` / `enUS` 不变。
