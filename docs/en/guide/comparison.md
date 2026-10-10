# Component Library Comparison

Comparison of lh-ui-plus with mainstream Vue UI libraries.

## Feature Comparison

| Feature | lh-ui-plus | Element Plus | Ant Design Vue | Naive UI |
|---------|-----------|-------------|----------------|----------|
| Styling | CSS Variables | SCSS | CSS Variables (Less tokens) | CSS Variables |
| Dark Mode | ✅ | ✅ | ✅ (theme tokens) | ✅ |
| Pattern BG | ✅ 6 types | ❌ | ❌ | ❌ |
| Cross-Framework | ✅ pure function logic | ❌ | ❌ | ❌ |
| i18n | ✅ full zh/en, others placeholders | ✅ | ✅ | ✅ |
| sx Layout | ✅ | ❌ | ❌ | ❌ |
| PassThrough | ❌ | ❌ | ❌ | ❌ (theme overrides) |
| BEM Naming | `lh-` | `el-` | `ant-` | `n-` |

## Unique Advantages

1. **Chinese aesthetic design** — Color scheme based on traditional Chinese pigments
2. **CSS variable theme (88+ tokens)** — More flexible than SCSS
3. **Cross-framework** — Pure function logic, React-ready
4. **Pattern background system** — Traditional SVG patterns
5. **sx quick layout** — Tailwind-style atomic inline styles

## When to Choose

| Need | Recommendation |
|------|----------------|
| Chinese style / pattern backgrounds | lh-ui-plus |
| Dark mode | any of the four |
| Cross-framework support | lh-ui-plus (component logic decoupled from the framework) |
| Complete ecosystem & enterprise forms | Element Plus / Ant Design Vue |
| Deep theme overriding | Naive UI (theme overrides) |
