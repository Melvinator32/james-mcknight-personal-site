---
name: Artifact preview image reliability
description: Why portfolio preview cards should use real local images rather than imported asset-manifest URLs.
---

For application screenshots and other card-preview imagery, prefer real local image files imported through Vite. Do not assume a JSON asset manifest's URL will return image bytes inside a path-routed artifact.

**Why:** In this project, asset-manifest URLs returned the portfolio HTML shell with a successful HTTP status and `text/html` content type, causing image error fallbacks even though the manifest metadata looked valid.

**How to apply:** When adding or replacing card previews, verify the response content type or rendered `naturalWidth`. If the manifest route does not serve image bytes, capture or copy the image into the app and import the file directly.