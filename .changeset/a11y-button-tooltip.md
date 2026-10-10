---
"@lh-ui/vue3": patch
---

Improve accessibility of Button and Tooltip. Button ships a unified `:focus-visible` keyboard focus ring (previously `outline: none` with no focus indicator), stops the loading spinner under `prefers-reduced-motion`, and documents the aria-label convention for icon-only buttons. Tooltip now links the trigger to the popper via `aria-describedby` while visible and shows on keyboard focus (`focusin`) for the hover/focus trigger modes, aligned with the WAI-ARIA APG tooltip pattern. Note: the `click` value of Tooltip `trigger` is documented as not implemented yet.
