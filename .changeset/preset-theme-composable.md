---
"@lh-ui/vue3": minor
---

主题切换收口：

- **修复预设主题二次前缀 bug**：`getThemeVars()` 返回的键已带 `--lh-` 前缀，传入 `LhConfigProvider` 的 `themeVars` 后曾被拼成 `--lh---lh-primary-color`，预设主题切换在运行时静默失效。前缀逻辑收敛为幂等的 `toCssVarName()`（`packages/utils/css-var.ts`），ConfigProvider 与 `useLhComponentTheme` 统一改用，已带前缀的键不再二次拼接。**Breaking（类型层）**：`packages/utils` 的 `cssVars()` 现由 `css-var.ts` 重新导出，行为不变。
- **新增 `usePresetTheme` composable**：与切换明暗的 `useLhTheme` 互补，用于切换国风预设色板。默认把预设变量写到 `:root`（全局生效、持久化到 localStorage，默认 key `lh-ui-preset`，优先级低于 ConfigProvider 局部覆盖）；传入 `applyToRoot: false` 可只取已去掉 `--lh-` 前缀的 `themeVars`，交给 `LhConfigProvider` 接管作用域。返回 `preset`、`setPreset`、`presets`、`themeVars`。
- **导出**：`usePresetTheme` 从 `lh-ui`（`src/index.ts`）与 `~/utils` 命名导出。
- **文档修正**：`docs/guide/themes.md`「编程式切换」示例改用 `usePresetTheme`，并说明全局（`:root`）与局部（ConfigProvider）两种机制的适用差异，英文站同步补齐该小节。
