---
"@lh-ui/vue3": minor
---

sx 快速布局属性完成顶层样式组件全覆盖：Avatar、Badge、Cascader、Checkbox、DatePicker、Descriptions、Form、InputNumber、Progress、Radio、Select、Slider、Statistic、Switch、Tag、TimePicker 共 16 个存量组件新增 `sx?: SxProps` prop，转内联样式作用于根元素。

- `config-provider` 与 `icon` 无样式根，按设计不接入；至此 34 个顶层样式组件 34/34 支持 sx
- Cascader / Select / DatePicker / TimePicker 四个带浮层的组件与 Tooltip 一致，sx 作用于触发器根元素，浮层面板不受影响
- Avatar 复用既有根样式绑定；其余组件 sx 均绑定在根元素，不与组件内部布局样式（进度条宽度、描述列表列宽等）混算
