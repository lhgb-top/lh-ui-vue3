---
"@lh-ui/vue3": minor
---

BackTop 新增 `scrollend` 事件：滚动停止时携带当前 scrollTop 抛出。原生 `scrollend` 优先（Chromium 114+ / Safari 18.2+，`supportsScrollEnd` 特性探测），旧浏览器退回 scroll + 150ms 防抖（新共享 composable `useLhScrollEnd`）。常用于锚点联动、数据懒加载。
