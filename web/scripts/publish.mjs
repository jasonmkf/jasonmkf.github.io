// Copies the static export (web/out) to the repo root, which GitHub Pages serves from main.
// Everything at the root except KEEP is replaced, so old pages don't linger.
import { cpSync, existsSync, readdirSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const web = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(web, 'out');
const site = join(web, '..');
const KEEP = new Set(['.git', '.gitignore', 'README.md', 'web']);

if (!existsSync(join(site, '.git')) || !existsSync(join(out, 'index.html'))) {
  throw new Error('Run from jasonmkf.github.io/web after next build');
}

// Store listings and Google Auth Platform link to /<app>/privacy.html.
for (const name of readdirSync(out)) {
  const dir = join(out, name, 'privacy');
  if (existsSync(join(dir, 'index.html'))) {
    renameSync(join(dir, 'index.html'), join(out, name, 'privacy.html'));
    rmSync(dir, { recursive: true });
  }
}

for (const name of readdirSync(site)) {
  if (!KEEP.has(name)) rmSync(join(site, name), { recursive: true, force: true });
}
cpSync(out, site, { recursive: true });
// Without this GitHub Pages runs Jekyll, which drops the _next folder.
writeFileSync(join(site, '.nojekyll'), '');
console.log('Published web/out to', site);
