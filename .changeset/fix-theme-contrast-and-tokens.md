---
"@lh-ui/vue3": patch
---

重排主题 token 并补齐面板类组件的对比度：统一 hover/selected 的文字与底色 token（`--lh-hover-bg-color`、`--lh-selected-color`、`--lh-primary-color-bg`），hover 不再与选中态仅靠字色区分。五个预设主题（cerblue/songhua/zhusha/shuimo/golden）在明暗两色下复算 52 组文字/底色对比度均 ≥ 4.5:1：songhua/golden 属浅主色，新增预设级 `--lh-color-on-primary`（墨字替代白字，白字仅 3.9/3.25:1）；songhua/golden 选中态文字单独加深（`#456F44` / `#82600A`，active 色在悬停底上仅 4.19/4.44:1，按钮 active 底色不受影响）；songhua/golden 按压态底色提亮（`#4F8F4C` / `#A87F0A`，原值墨字对比仅 3.64/3.94:1）；菜单/树激活文字统一引用 `--lh-selected-color`（默认解析值不变，浅主色预设跟随之）；暗色 selected 改为主色 40% 掺白（60% 在暗色面板上仅 3.86:1，50% 在悬停底上也只有 4.03:1）。
