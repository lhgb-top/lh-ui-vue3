---
"@lh-ui/vue3": minor
---

Wave F 剩余九组件落地（按用户指定顺序）：

- **LhTable 表格**：列配置式 + 排序（`aria-sort` 三态循环）+ CSS `position: sticky` 固定列 + 斑马纹/边框/尺寸 + 单元格作用域插槽 + **虚拟滚动**（`height` 启用，窗口计算为 core 纯函数）
- **LhLayout + LhLayoutHeader/Aside/Main/Footer**：语义标签骨架（`header`/`aside`/`main`/`footer`），含 Aside 时自动垂直；`aria-label` 命名 landmark
- **LhRow + LhCol 栅格**：24 栅格制**用 CSS Grid 实现**，span/offset 映射 `grid-column`，无 flex 百分比换算
- **LhTree 树形控件**：扁平化 + 勾选级联 + 半选态（真实 `indeterminate`）全在 core 纯函数；APG tree pattern 键盘（↑↓/→←/Home/End 循环跳过禁用）；受控展开/选中/勾选三组双模
- **LhTreeSelect 树选择**：触发器 + Tree 面板；单选返回 string、多选返回 string[]；`aria-haspopup="tree"`，点击外部/Esc 关闭并归还焦点
- **LhTransfer 穿梭框**：双 `role="listbox"` + APG pattern，不可变分区与移动在 core；每侧独立搜索、全选跳过禁用
- **LhUpload 上传**：原生 input + 拖拽区；**请求由使用方 `request` prop 提供**（零运行时依赖）；大小/数量/类型校验，进度 `role="progressbar"`、失败 `role="alert"`
- **LhAnchor 锚点**：`<nav>` + `aria-current="location"`，滚动联动高亮，`prefers-reduced-motion` 降级即时跳转
- **LhVirtualList 虚拟列表**：定高与动态高度双模式（动态走预计算偏移 + 二分查找），`itemSize` 由调用方提供

新增 i18n 组 `table` / `tree` / `treeSelect` / `transfer` / `upload` / `anchor`（六语言同步）；全部组件接入 `sx` 与 `--lh-*` 主题变量（含暗色）。
