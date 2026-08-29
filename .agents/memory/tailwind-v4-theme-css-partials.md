---
name: Tailwind v4 @theme vs plain :root for secondary CSS partials
description: Why a @theme block works in an app's main index.css but gets silently dropped in a secondary/imported CSS partial, and what to do instead.
---

## The rule
A Tailwind v4 `@theme { ... }` block only reliably auto-generates utility classes when it lives in the file that is part of Tailwind's actual processed entry chain (typically the app's main `index.css`, which already has `@import "tailwindcss"`). Putting a second `@theme` block in a secondary CSS partial that gets `@import`-ed from elsewhere (e.g. a mockup's `_group.css`, or a new theme partial added during a redesign) can be silently ignored by the browser/build — no error, just missing fonts/colors, rendering in generic fallback styles.

**Why:** Observed directly: a mockup extraction's token file used `@theme {...}` and all custom fonts/colors failed silently (generic sans-serif, wrong colors) until changed to a plain `:root {...}` block. The app's own primary `index.css` @theme block worked fine because it's the real entry file.

**How to apply:** For any *secondary* token/partial CSS file (mockup sandbox extractions, a new theme file added alongside an existing app's main stylesheet, etc.), use plain `:root { --custom-prop: value; }` custom properties plus handwritten CSS classes that reference them — do not rely on Tailwind's `@theme`-driven utility class generation outside the main processed entry file. Also remember multiple `@import` statements (fonts, tailwind, partials) must all appear consecutively at the very top of a stylesheet before any other rule, or the build/dev-server will error with "@import must precede all other statements".
