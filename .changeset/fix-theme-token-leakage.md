---
"lh-ui-plus": patch
---

Fix theme token leakage: component styles referenced Element-Plus-style variables (`--lh-text-color-primary`, `--lh-border-color`, `--lh-*-color-light-5/9`, …) that are not defined in this library, so hardcoded fallback colors always won and theming silently failed. They are now mapped to the real tokens (`--lh-text-primary`, `--lh-border-color-base`, `--lh-*-color-bg`, …).
