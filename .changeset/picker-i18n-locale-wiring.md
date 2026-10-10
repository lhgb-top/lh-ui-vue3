---
"@lh-ui/vue3": minor
---

DatePicker / TimePicker 语言包死键消费收口，组件文案不再硬编码：

- **DatePicker 表头星期**：面板日历表头此前硬编码 `['日','一','二','三','四','五','六']`，现消费语言包 `datepicker.weeks.sun→sat`（英文 Sun…Sat），切换语言即时生效。
- **DatePicker 占位符分层修正**：`@lh-ui/core/date-picker` 的 `getDefaultDatePickerPlaceholder()`（硬编码「年/月/日」）已删除，格式转义改由组件层结合 `t('datepicker.year'/'month')` 完成，未传 placeholder 时按 format 生成语言对应的占位符。
- **TimePicker 列标题**：时/分/秒列标题此前硬编码，现消费 `timepicker.hour/minute/second`（新增键，中文「时/分/秒」、英文 H/M/S）。
- **TimePicker 占位符分层修正**：`@lh-ui/core/time-picker` 的 `getDefaultTimePlaceholder()`（硬编码「时/分/秒」）已删除，同款改由组件层 `t()` 完成。
- 6 份语言包（zh-CN / en-US / ja-JP / ko-KR / de-DE / fr-FR）同步新增 timepicker 列标题键；至此 `datepicker`/`timepicker` 两组语言键中仅 `datepicker.months`/`month1-12` 因月份列表面板尚未实现而保留为死键。

**Breaking（类型层）**：`@lh-ui/core/date-picker` 与 `@lh-ui/core/time-picker` 不再导出 `getDefaultDatePickerPlaceholder` / `getDefaultTimePlaceholder`，如有消费者需自行在组件层组装占位文案。
