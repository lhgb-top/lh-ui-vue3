---
"@lh-ui/vue3": patch
---

修正 Card 与 Skeleton 的视觉表现，使其贴合国风主题：

- Card 阴影由冷蓝黑（rgba(16,24,40)）改为与主题同源的暖墨色（rgba(26,26,26)），不再与宣纸底色冲突；边框改用 `--lh-border-color-light`，卡片轮廓可感知。
- Card 头部/底部分隔线改为两端对称渐隐的墨痕，底部去掉浑浊的半透明叠色。
- Card 加载占位与 Skeleton 占位块底色改用可感知的灰度，新增 `--lh-card-loading-bg` / `--lh-card-loading-highlight` 两个组件级变量。
- Skeleton 占位底色由 `--lh-border-color-lighter` 改为墨色（text-regular）10% 透明混合，明暗主题下都能保持对比度，不再是暗色主题里“看不见的占位”。
