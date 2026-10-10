# 迁移指南

从其他 UI 库迁移到 lh-ui-plus 的步骤与注意事项。

## 从 Element Plus 迁移

### 主要差异

| 特性 | Element Plus | lh-ui-plus |
|------|-------------|------------|
| 前缀 | `el-` | `lh-` |
| 主题 | SCSS 变量 | CSS 变量 (88+ token) |
| 暗色模式 | 内置（`html.dark` 类切换） | 完整支持（`data-theme` + `useLhTheme`） |
| 花纹背景 | 无 | 6 种预设 |

### 组件映射

| Element Plus | lh-ui-plus |
|-------------|------------|
| `ElButton` | `LhButton` |
| `ElInput` | `LhInput` |
| `ElForm` | `LhForm` |
| `ElSelect` | `LhSelect` |
| `ElDialog` | `LhDialog` |

### 迁移步骤

1. 替换 import 路径
2. 替换组件标签前缀
3. 检查 themeVars 配置
4. 运行 `pnpm lint` 和 `pnpm typecheck`

## 从 Ant Design Vue 迁移

Ant Design 以 ant- 前缀，lh-ui-plus 以 lh- 前缀。

| Ant Design Vue | lh-ui-plus |
|---------------|------------|
| `a-button` | `LhButton` |
| `a-input` | `LhInput` |
| `a-form` | `LhForm` |

## 通用迁移建议

1. **先运行测试** — 确保迁移前项目可正常构建
2. **逐个组件替换** — 不要一次性全部替换
3. **检查主题差异** — CSS 变量与 SCSS 变量的映射
4. **查看 API 文档** — 确认 props/events 兼容性
