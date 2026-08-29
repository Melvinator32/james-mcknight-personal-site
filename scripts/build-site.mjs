import { spawnSync } from 'node:child_process';
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';

const build = spawnSync('pnpm', ['--filter', '@workspace/james-mcknight-portfolio', 'build'], {
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'production', PORT: '4173', BASE_PATH: '/' },
});
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
