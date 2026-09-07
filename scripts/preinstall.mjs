// Clears stray npm/yarn lockfiles and enforces pnpm as the package manager.
//
// This is written in Node rather than as an inline `sh -c` command so that it
// also runs on Windows, where `sh` is not on PATH and the install fails with
// "'sh' is not recognized as an internal or external command".
import { rmSync } from 'node:fs';

for (const lockfile of ['package-lock.json', 'yarn.lock']) {
  rmSync(lockfile, { force: true });
}

// pnpm reports itself as e.g. "pnpm/10.11.1 npm/? node/v24.20.0 win32 x64".
if (!(process.env.npm_config_user_agent || '').startsWith('pnpm/')) {
  console.error('Use pnpm instead');
  process.exit(1);
}
