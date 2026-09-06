// Publishes each demo app from its own repo into the portfolio's public/demos.
//
// For every entry in scripts/demos.json this shallow-clones the repo, builds it,
// and copies the built output to public/demos/<slug>/. If a repo is empty,
// unreachable, or fails to build, the demo falls back to the checked-in
// public/demos/<slug>.html snapshot so the site never ships a broken link.
//
// Set SKIP_DEMO_BUILD=1 to skip cloning entirely (fallbacks still apply).
// Set STRICT_DEMOS=1 to fail the build when a demo cannot be built.
import { spawnSync } from 'node:child_process';
import { cp, mkdir, mkdtemp, readFile, rm } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const repoRoot = path.resolve(import.meta.dirname, '..');
const manifest = JSON.parse(await readFile(path.join(repoRoot, 'scripts/demos.json'), 'utf8'));
const demosDir = path.join(repoRoot, manifest.publicDir);

const token = process.env.DEMO_REPOS_TOKEN || '';
const skipAll = process.env.SKIP_DEMO_BUILD === '1';
const strict = process.env.STRICT_DEMOS === '1';
const skipped = [];

// Directories a static site generator might build into, most specific first.
const OUTPUT_CANDIDATES = ['dist/public', 'dist', 'build', 'out', 'public', '.'];

function run(command, args, cwd) {
  const result = spawnSync(command, args, { cwd, stdio: 'inherit' });
  return result.status === 0;
}

function runShell(command, cwd) {
  const result = spawnSync(command, { cwd, stdio: 'inherit', shell: true });
  return result.status === 0;
}

function cloneUrl(repo) {
  return token ? `https://x-access-token:${token}@github.com/${repo}.git` : `https://github.com/${repo}.git`;
}

// Picks the build command from the repo's own manifest so a plain static repo
// and a Vite/Next app both work without per-repo configuration.
function detectBuild(checkout) {
  const pkgPath = path.join(checkout, 'package.json');
  if (!existsSync(pkgPath)) return null;
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  if (!pkg.scripts?.build) return null;
  const install = existsSync(path.join(checkout, 'package-lock.json')) ? 'npm ci' : 'npm install';
  return `${install} && npm run build`;
}

function detectOutput(checkout, configured) {
  const candidates = configured ? [configured] : OUTPUT_CANDIDATES;
  for (const candidate of candidates) {
    if (existsSync(path.join(checkout, candidate, 'index.html'))) return candidate;
  }
  return null;
}

async function publish(demo) {
  const { slug, repo, ref = 'main' } = demo;
  const checkout = await mkdtemp(path.join(tmpdir(), `demo-${slug}-`));
  try {
    console.log(`\n[demos] ${slug}: cloning ${repo}@${ref}`);
    if (!run('git', ['clone', '--depth', '1', '--branch', ref, cloneUrl(repo), checkout])) {
      return `${slug}: could not clone ${repo}@${ref}`;
    }

    const build = demo.build === undefined ? detectBuild(checkout) : demo.build;
    if (build && !runShell(build, checkout)) {
      return `${slug}: build command failed (${build})`;
    }

    const output = detectOutput(checkout, demo.output);
    if (!output) {
      return `${slug}: no index.html found in ${demo.output ?? OUTPUT_CANDIDATES.join(', ')}`;
    }

    const target = path.join(demosDir, slug);
    await rm(target, { recursive: true, force: true });
    await cp(path.join(checkout, output), target, { recursive: true });
    console.log(`[demos] ${slug}: published from ${output} -> /demos/${slug}/`);
    return null;
  } finally {
    await rm(checkout, { recursive: true, force: true });
  }
}

// Keeps /demos/<slug>/ resolving to the committed snapshot when the repo build
// did not produce anything, so demoUrl stays stable either way.
async function applyFallback(slug) {
  const target = path.join(demosDir, slug);
  if (existsSync(path.join(target, 'index.html'))) return true;
  const legacy = path.join(demosDir, `${slug}.html`);
  if (!existsSync(legacy)) return false;
  await mkdir(target, { recursive: true });
  await cp(legacy, path.join(target, 'index.html'));
  console.log(`[demos] ${slug}: using committed snapshot ${slug}.html`);
  return true;
}

for (const demo of manifest.demos) {
  const reason = skipAll ? `${demo.slug}: SKIP_DEMO_BUILD=1` : await publish(demo);
  if (reason) {
    skipped.push(reason);
    if (!(await applyFallback(demo.slug))) {
      console.error(`[demos] ${demo.slug}: no build output and no snapshot to fall back to`);
      process.exit(1);
    }
  }
}

if (skipped.length) {
  console.warn(`\n[demos] ${skipped.length} demo(s) served from committed snapshots:`);
  for (const reason of skipped) console.warn(`  - ${reason}`);
  if (strict) process.exit(1);
}
