---
"@lh-ui/vue3": minor
---

新增 Wave D 命令式全局反馈三组件：

- **LhMessage 全局轻提示**：服务式 API（`LhMessage.success/info/warning/danger/loading(content, options?)` 与 `LhMessage(options)`），队列渲染在独立 `createApp` 容器；`duration` / `max` / `offset` / `appendTo` 全局配置，返回 `{ close }` 句柄
- **LhNotification 通知**：四角堆叠通知卡片，标题 / 正文 / 语义图标 / 可关闭 / 自动消失；`onClick` 卡片具备按钮语义
- **LhLoading 加载**：服务（`LhLoading.show({ target?, text?, lock? })`，全屏或指定容器）+ `v-loading` 指令双形态；`inert` 渐进增强防止操作底层内容
- **LhSpinner 旋转图形**：基础旋转图形，loading 遮罩内部同由它呈现

激活 `message.close` 死键，新增 `notification` / `loading` 语言组（六语言同步）。live region 语义对齐 APG（`role="status"` / `role="alert"` / `role="region"`），动效尊重 `prefers-reduced-motion`。
