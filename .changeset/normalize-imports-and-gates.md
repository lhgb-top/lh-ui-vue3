---
"@lh-ui/vue3": patch
---

Normalize all imports to the tsconfig alias table: component `src/types.ts` now import core types from `@lh-ui/core/<name>` + `@lh-ui/core/shared` instead of the root barrel, tests use `~/` instead of `../../packages/...`, and `src/index.ts`/`dev`/`docs` entries import via `~/` and `lh-ui`. Also add the Badge playground demo, export the previously missing `LhTagProps`/`LhTagSize` types from the package root, and add a CI workflow plus conservative coverage thresholds.
