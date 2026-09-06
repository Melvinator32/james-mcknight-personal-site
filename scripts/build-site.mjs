import { spawnSync } from 'node:child_process';
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';

const isWindows = process.platform === 'win32';
const buildArgs = ['--filter', '@workspace/james-mcknight-portfolio', 'build'];
const buildOptions = {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'production',
    PORT: process.env.PORT || '4173',
    BASE_PATH: process.env.BASE_PATH || '/',
  },
};

// On Windows pnpm is a .cmd shim, which spawnSync cannot resolve from the bare
// name (it fails with ENOENT), so it has to go through the shell. The args are
// joined into the command string because Node deprecates passing an args array
// alongside shell: true; every argument here is a fixed, shell-safe literal.
const build = isWindows
  ? spawnSync(['pnpm', ...buildArgs].join(' '), { ...buildOptions, shell: true })
  : spawnSync('pnpm', buildArgs, buildOptions);
if (build.error) {
  console.error(`Failed to run pnpm: ${build.error.message}`);
  process.exit(1);
}
if (build.status !== 0) process.exit(build.status ?? 1);
await rm('dist', { recursive: true, force: true });
await mkdir('dist/server', { recursive: true });
await mkdir('dist/.openai', { recursive: true });
await cp('artifacts/james-mcknight-portfolio/dist/public', 'dist/client', { recursive: true });
await cp('.openai/hosting.json', 'dist/.openai/hosting.json');
const html = await readFile('dist/client/index.html', 'utf8');
await writeFile('dist/server/index.js', `
const html = ${JSON.stringify(html)};
export default {
  async fetch(request, env) {
    const path = new URL(request.url).pathname;
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed', { status: 405 });
    }
    if (path === '/' || path === '/index.html' || !path.split('/').pop().includes('.')) {
      return new Response(request.method === 'HEAD' ? null : html, {
        headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' },
      });
    }
    return env.ASSETS.fetch(request);
  }
};
`);
