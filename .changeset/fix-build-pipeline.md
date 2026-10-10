---
"@lh-ui/vue3": patch
---

Fix the build pipeline: move inline SFC styles of date-picker/time-picker/cascader/config-provider into their canonical `style/index.scss` entries, generate real CSS artifacts via `scripts/build-styles.mjs` (the previous `outputDir` option was silently ignored and produced empty files), build the UMD bundle as part of `pnpm build`, and de-duplicate the `:root` token blocks emitted by the theme.
