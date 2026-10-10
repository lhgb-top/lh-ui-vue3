---
"@lh-ui/vue3": minor
---

国际化收口，语言包文案真正接入组件：

- **LhSelect** 接入 `t()`：未传 `placeholder` 时兜底显示语言包文案（中文「请选择」/英文「Please select」），空状态硬编码的 `No options` 改为 `t('select.noData')`（中文「暂无数据」/英文「No data」），切换语言即时生效。
- **LhInput** placeholder 兜底：未传时 fallback 到 `t('input.placeholder')`（「请输入」/「Please input」）；有 `label` 时仍保持空占位以避让浮动标签。
- **LhCascader** placeholder 兜底改由组件层通过 `t('cascader.placeholder')` 提供，`@lh-ui/core/cascader` 中硬编码中文的 `getDefaultCascaderPlaceholder()` 一并移除（core 层不再放用户文案）。
- **`lhlocale.t()` 键类型收紧**：由 zh-CN 的 `as const` 结构推导深路径联合类型，已知文案键获得自动补全与拼写校验；动态拼路径等场景仍可通过宽松重载使用，运行时行为不变。

预留的 ja-JP / ko-KR / de-DE / fr-FR 仍为英文兜底骨架，`LH_LANGUAGE_CONST` 中的登记保持注释，避免放出名不副实的「已支持」语言。
