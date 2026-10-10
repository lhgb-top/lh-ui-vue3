---
"@lh-ui/vue3": patch
---

修复 provide 快照注入（红线 #6）：checkbox group 与 radio group 的 `disabled`/`name`/`size`、menu 的 `mode`/`collapse`、collapse 的 `accordion`、timeline 的 `mode` 原以 props 快照 provide，动态修改父级 prop 不传导——现统一改为 computed ref 本体注入，子项动态响应（如整组动态禁用、时间线动态切换 alternate）。同步收紧上下文类型为 `Ref`。移除全仓无引用的 `core/config` 死代码（mergeConfig/getEffective* 为废弃方向，config-provider 本地 computed 实现已正确）。
