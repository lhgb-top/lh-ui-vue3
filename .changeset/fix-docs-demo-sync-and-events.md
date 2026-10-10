---
"@lh-ui/vue3": patch
---

修复文档「示例与代码块不同步」：70 个文档页共 383 处漂移全部修正，`check-api-style-pairs.mjs --check-demos` 归零。DemoBlock 视觉示例为唯一真相，成对的 ```vue composition / ```vue options 代码块逐元素（属性、placeholder、icon、type、title）对齐；孤儿节补齐缺失的 DemoBlock 与页级状态（`locale`/`messages` 等），孤儿行删除；中英文成对同步。另外补齐 24 个组件的中英文 Events 事件表（含 dialog opened/closed、dropdown click、input keydown 缺行与 LhImageViewer Props 小节）。
