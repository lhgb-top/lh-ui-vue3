---
"@lh-ui/vue3": patch
---

Fix `lhlocale.t()` crashing when detached from the instance (`const t = lhlocale.t`), which broke the Cascader empty-search branch; it is now an arrow-function property. DatePicker and TimePicker now consume `datepicker.today`/`datepicker.confirm` and `timepicker.now`/`timepicker.confirm` from the locale packs instead of hardcoded Chinese strings.
