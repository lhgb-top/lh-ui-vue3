---
"@lh-ui/vue3": patch
---

修复 Popover / Popconfirm / Dropdown / Tooltip 在 grid / flex 容器中定位偏移的问题。触发器根元素之前会被容器默认的 `stretch` 拉伸，定位锚点比内部触发器宽，导致弹出层与箭头按格中心对齐而非按触发器对齐；四个组件的根元素现加上 `justify-self: center; align-self: center`，保持收缩包裹。同时修复弹出层在进出过渡（`transform: scale(0.96)`）期间被 `getBoundingClientRect` 量出缩放尺寸、过渡结束后位置 stale 的问题，定位改用不受 transform 影响的 `offsetWidth / offsetHeight`。
