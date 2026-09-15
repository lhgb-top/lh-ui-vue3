---
"lh-ui-plus": patch
---

Fix ConfigProvider context reactivity: injected consumers now receive a computed ref, so prop changes on the provider (size, locale, themeVars, patternComponents, componentTheme) propagate to children. Previously the context was captured once at setup and never updated.
