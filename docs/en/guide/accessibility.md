# Accessibility (A11y)

lh-ui-plus is committed to providing an accessible UI experience for users worldwide.

## Keyboard Navigation

All interactive components support keyboard operations:

| Key | Action |
|-----|--------|
| `Tab` | Switch between focusable elements |
| `Enter` / `Space` | Activate button/switch |
| `Escape` | Close Dialog/Select dropdowns |
| `Arrow Up/Down` | Navigate in Select/Cascader options |

## ARIA Attributes

Components emit ARIA attributes as needed (below is the actual rendered output):

```html
<!-- Button disabled state: native disabled, skipped by Tab -->
<button disabled>...</button>

<!-- Switch: button + role/aria-checked -->
<button role="switch" aria-checked="false">...</button>

<!-- Checkbox: native input, semantics provided by the label -->
<input type="checkbox" />

<!-- Dialog: aria-modal + aria-label pointing at the title -->
<div role="dialog" aria-modal="true" aria-label="Dialog title">
  ...
</div>
```

> Native semantics first: Button uses native `disabled` and Checkbox uses a native `<input type="checkbox">`, without redundant `aria-disabled` / `role="checkbox"` — layering redundant ARIA on native elements violates the spec.

## Screen Readers

- Icon-only buttons require a manual `aria-label` (see Development Tips below)
- The Dialog close button ships with `aria-label="close"`
- Components fall through native attributes: anything not explicitly handled lands on the root element, so extra `aria-*` can be added as needed

## Color Contrast

Body text and accent colors target **WCAG 2.1 AA** (normal text ≥ 4.5:1, large text and non-text elements ≥ 3:1); with the low-saturation traditional palette, prefer the `--lh-text-color-*` tiers from [Theme Customization](/en/guide/theme-customization) over hand-picked colors to keep contrast safe.

## Focus Management

- The root element provides a unified `:focus-visible` ring: shown during keyboard navigation, hidden on mouse click
- Dialog/Select popovers close on `Escape`
- Keyboard operability: focusable elements are native `<button>` / `<input>`, so `Tab` traversal works out of the box

> Focus trapping and focus restoration (moving focus into the Dialog on open, returning it to the trigger on close) are not implemented yet — follow progress in the [Issue tracker](https://github.com).

## Development Tips

### Add aria-label to components

```vue
<LhButton aria-label="Close dialog" @click="close">
  <LhIcon name="close" />
</LhButton>
```

### Live region announcements

```vue
<script setup lang="ts">
import { ref } from 'vue'
const message = ref('')
</script>

<template>
  <div aria-live="polite">{{ message }}</div>
</template>
```

### Skip Navigation

```html
<a href="#main" class="skip-link">Skip to main content</a>
```

## Testing Tools

Recommended tools for accessibility auditing:

- **axe DevTools** — Browser extension
- **WAVE** — Web Accessibility Evaluation Tool
- **Lighthouse** — Built-in accessibility audit

---

> Accessibility is not a feature, it's a fundamental human right.
> — Web Accessibility Initiative (WAI)