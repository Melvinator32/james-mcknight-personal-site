# Demo apps

Demos on `/projects` come from two places:

- **Committed snapshots** — a single self-contained file in
  `artifacts/james-mcknight-portfolio/public/demos/<slug>.html`, linked directly
  (`demoUrl: "/demos/zen-garden.html"`). These only change when you edit the file.
- **Built from their own repo** — listed in `scripts/demos.json` and served from
  `/demos/<slug>/`. These rebuild automatically when the app repo changes.

## How the automatic path works

1. You push to the demo app's repo (e.g. `melvinator32/Blackjack-trainer`).
2. That repo's `notify-portfolio.yml` workflow POSTs a `demo-updated`
   `repository_dispatch` to this repo.
3. `.github/workflows/static.yml` runs, and `pnpm run build` calls
   `scripts/build-demos.mjs`, which clones each app repo, builds it, and copies
   the output into `public/demos/<slug>/`.
4. The portfolio builds and deploys to `jamesmcknight.me`.

The built directories are gitignored — they are produced at build time, not committed.

## Adding a demo

1. Add an entry to `scripts/demos.json`:

   ```json
   { "slug": "my-app", "repo": "melvinator32/My-App", "ref": "main" }
   ```

   The build command and output directory are detected automatically: a repo with a
   `build` script in `package.json` is installed and built, and the first of
   `dist/public`, `dist`, `build`, `out`, `public`, or the repo root containing an
   `index.html` is published. Override with `"build"` and `"output"` if needed
   (`"build": null` skips the build for a plain static repo).

2. Point the project at it in
   `artifacts/james-mcknight-portfolio/src/data/portfolio-data.ts`:
   `demoUrl: "/demos/my-app/"` (note the trailing slash, no `.html`).

3. Copy `.github/demo-app-template/notify-portfolio.yml` into the app repo as
   `.github/workflows/notify-portfolio.yml`, and add a `PORTFOLIO_DISPATCH_TOKEN`
   secret there — a fine-grained PAT scoped to this repo with
   **Contents: Read and write**.

## Fallback behaviour

If an app repo is empty, unreachable, or fails to build, `build-demos.mjs` falls
back to the committed `public/demos/<slug>.html` snapshot and the deploy still
succeeds, with a warning in the log. This is why the old snapshot files are kept
after a demo moves to its own repo.

Useful env vars:

- `SKIP_DEMO_BUILD=1` — don't clone anything, use snapshots (fast local builds).
- `STRICT_DEMOS=1` — fail the build if any demo fell back to its snapshot.
- `DEMO_REPOS_TOKEN` — token for cloning private app repos.
