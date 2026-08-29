# Memory Index

- [Tailwind v4 @theme vs plain :root for secondary CSS partials](tailwind-v4-theme-css-partials.md) — a `@theme` block in a file outside the main processed entry can be silently dropped; use plain `:root` custom properties + handwritten classes for secondary/imported token files.
- [Content-editor schema extension checklist](content-editor-schema-extension.md) — adding new editable copy fields to an app with a browser-based content editor requires updating the type, the default data, AND the validator in lockstep, or saved edits get silently discarded on reload.
- [Artifact preview image reliability](artifact-preview-image-reliability.md) — imported asset-manifest URLs can resolve to SPA HTML under artifact routing; use real local image imports for reliable card previews.
