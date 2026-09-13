# Changesets

Add one Markdown file per user-facing change before releasing. For example:

```md
---
'lh-ui-plus': patch
---

Describe the change and its impact.
```

Run `pnpm changeset status` to inspect pending release notes and
`pnpm changeset version` to prepare a version update.
