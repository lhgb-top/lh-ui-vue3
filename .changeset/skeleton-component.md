---
"@lh-ui/vue3": minor
---

新增 LhSkeleton 骨架屏与 LhSkeletonItem 独立占位块：文本行（末行自动缩短模拟段落）/矩形/圆形三种占位形状，可组合头像，`loading` 切换真实内容。占位块 `aria-hidden` 对屏读隐藏，容器输出 `aria-busy="true"` + `aria-live="polite"` 在加载完成时播报；呼吸动画尊重 `prefers-reduced-motion` 自动关闭。含 core 纯逻辑（含行宽算法）、单元与组件测试、中英文文档。
