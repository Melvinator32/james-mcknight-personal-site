---
name: Content-editor schema extension checklist
description: What must change in lockstep when adding new editable copy fields to an app that has a browser-based (localStorage) content editor.
---

## The rule
When an app has a browser-based content editor that persists edits to localStorage and validates the stored JSON shape before trusting it (a `isValidContent`/schema-guard function), adding any new editable field requires updating three things together:
1. The TypeScript type/interface for the content shape.
2. The default content object (so the field has a real starting value).
3. The validator function itself (so a saved snapshot containing the new field is still recognized as valid).

**Why:** If the validator isn't updated, it still accepts stored content that predates the new field (since the old shape technically satisfies an unchanged validator), but once a user's browser saves a snapshot *with* the new field, nothing breaks immediately — the real risk is the reverse: if the validator is updated to *require* the new field but a differently-shaped default/content object doesn't actually provide it, or the validator is missed entirely, edits can silently be discarded on the next reload with no visible error, which is very confusing to debug later.

**How to apply:** Treat "extend type + extend default content + extend validator" as one atomic change whenever a redesign or new feature introduces new user-editable copy in such a system. Grep for the existing validator function first and mirror its exact style (e.g. plain string-shape checks) for the new fields.
