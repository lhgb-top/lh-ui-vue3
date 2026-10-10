---
"@lh-ui/vue3": minor
---

DatePicker 月份/年份面板与插槽自定义文案：

- **DatePicker 月份/年份面板落地**：`mode` 的 `'month'` / `'year'` 此前声明但面板未实现（`toggleView` 为空壳）。现实现三层视图切换（日期 ⇄ 月份 ⇄ 年份）：面板标题可逐级下钻，月份/年份模式下打开即落在对应网格、点击直接选中并关闭（无底部按钮）。月份格文案消费语言包 `datepicker.month1~12` 死键（中文「1 月…12 月」/英文 Jan…Dec），年份网格复用 core 的 `generateYears`（此前无人消费）。core 的 `generateMonths`/`generateYears` 不再是死代码。
- **插槽自定义文案**（降低对 i18n 的硬依赖）：
  - LhSelect 新增 `empty` 插槽——自定义下拉空状态内容，默认仍为语言包 `select.noData`；
  - LhCascader 新增 `no-match` 插槽——自定义过滤无匹配内容，默认仍为语言包 `cascader.noMatch`。
- **文档**：date-picker 中英文档补「选择模式」小节与可运行示例；select/cascader 中英文档补 Slots 表；修正 EN cascader Slots 表此前列出的幽灵插槽（`default`/`option` 组件中不存在）与 EN date-picker Props 表漂移（`type`→`mode`、绑定值类型、format 默认值）。

至此语言包 `datepicker` 组全部键（weeks/month1-12/year/month）均已接入组件，仅 `months` 数组保留为消费者便利别名。
