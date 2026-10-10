---
"@lh-ui/vue3": minor
---

Table 阶段化增强（DEV-F4）：**多级表头**——列配置嵌套 `children` 即得（可无限嵌套），`buildHeaderCells` 纯函数展开 colspan/rowspan 布局，表体按叶子列对齐，组表头在其叶子区间全部 fixed 同侧时继承 sticky 偏移；**列筛选**——列配置 `filters`（+ 可选 `filterMethod` / `filterMultiple`），表头筛选触发器弹层（复用 popper 引擎），勾选 + 确定/重置草稿式交互，`filterChange` / `update:filteredValues` 事件，数据链为 过滤 → 排序 → 虚拟切片；**列宽拖拽**——`resizable` 总开关 + 列级 `resizable`，手柄 `role="separator"` 可聚焦 ←/→ ±10px，拖动下限 40px，`columnResize` 事件。i18n 六语言新增 `table.filterTitle` / `filterConfirm` / `filterReset` / `resizeLabel`。
