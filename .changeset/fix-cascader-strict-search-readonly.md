---
'@lh-ui/vue3': patch
---

修复 Cascader 面板无法展示子级列的关键缺陷：`panels` 计算使用恒为空的 `expandedValues[0]` 推进列数据源，导致面板永远只渲染第一列、深层节点无法到达（「只有一层」的根源）；同族修复 `isPanelActive` 高亮下标错位、`onItemHover` 写入单值而非完整值路径、`onItemClick` 展开分支 slice 越界一位。

另修复四项缺陷：`check-strictly` 此前未生效（现在点击任意层级节点可直接选中）；搜索结果面板分隔符硬编码为 `/`，现遵循 `separator` prop；`filterable` 开启时 `readonly` 失效（现在只读输入框不可编辑、聚焦不弹面板）；`emit-path=false` 时单选绑定末级值但输入框无法回显完整路径（现从叶值还原路径回显，搜索结果高亮同步修复）。同时 `item-config` 字段别名现在对路径回显、搜索、标签等全部代码路径生效（新增 core 归一化函数 `normalizeCascaderNodes`）。

文档「路径显示与搜索」一节重写：示例预置选中值、数据加深为三级省市区、补全含完整数据的 composition/options 双版本代码块（中英文档同步）。
