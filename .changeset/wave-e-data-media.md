---
"@lh-ui/vue3": minor
---

新增 Wave E 数据与媒体增强八组件：

- **LhTimeline(+Item) 时间线**：语义 `<ol>` 事件流，四语义节点 / 空心节点 / 自定义圆点，左右交替布局
- **LhCollapse(+Item) 折叠面板**：APG accordion pattern（`button[aria-expanded]` + `role="region"`），手风琴约束，CSS `grid-template-rows` 高度过渡（零 JS 测高）
- **LhRate 评分**：radiogroup 语义 + roving tabindex 键盘调分（半星 0.5 步进），只读输出星级文本，半星用 background-clip 文字渐变
- **LhSegmented 分段选择器**：radiogroup 互斥选择，方向键跳过禁用项，选中底色 CSS 过渡
- **LhCalendar 日历面板**：复用 DatePicker core 月网格算法，`range` 范围约束，APG grid pattern 方向键导航（±1 天 / ±7 天 / 翻月）
- **LhAffix 固钉**：IntersectionObserver 越界检测（无 IO 环境回退 scroll），吸顶 / 吸底
- **LhBackTop 返回顶部**：阈值显隐，原生平滑滚动（reduced-motion 降级 auto）
- **LhImage(+LhImageViewer) 图片**：`alt` 类型层必填，原生懒加载，失败占位插槽；预览器 dialog 语义 + 焦点圈 + Esc/方向键，工具按钮全命名

新增 `collapse` / `rate` / `backtop` / `image` 语言组（六语言同步）；全部组件接入 sx 与 `--lh-*` 主题变量。
