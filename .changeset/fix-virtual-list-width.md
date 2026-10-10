---
'@lh-ui/vue3': patch
---

修复 VirtualList 在 flex 等收缩容器下宽度塌陷为 0 的问题（列表根元素补充 `width: 100%`），并为定高模式的项包裹层增加 `overflow: hidden`，防止插槽内容超出 `itemHeight` 时相邻行文字叠压。
