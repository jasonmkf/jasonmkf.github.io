// Draws the 1200x630 share images in public/og/ (one per app, plus site.jpg) with headless
// Chrome, then converts them to JPEG with sips. macOS only; rerun after adding an app or
// changing a name or tagline:  node scripts/og-images.mjs
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const web = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(web, 'public');
const outDir = join(pub, 'og');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

// apps.tsx is TSX, so read the plain string fields instead of importing it.
const src = readFileSync(join(web, 'src/data/apps.tsx'), 'utf8');
const field = (name) => [...src.matchAll(new RegExp(`^    ${name}: '((?:[^'\\\\]|\\\\.)*)',$`, 'gm'))].map((m) => m[1].replace(/\\'/g, "'"));
const [ids, names, icons, taglines, platforms] = ['id', 'name', 'icon', 'tagline', 'platforms'].map(field);
if (new Set([ids, names, icons, taglines, platforms].map((a) => a.length)).size !== 1) {
  throw new Error('apps.tsx fields no longer line up; check the regex');
}
const apps = ids.map((id, i) => ({ id, name: names[i], icon: icons[i], tagline: taglines[i], platforms: platforms[i] }));

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const file = (p) => `file://${join(pub, p)}`;

const page = (body) => `<!doctype html><meta charset="utf-8"><style>
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; overflow: hidden; position: relative; color: #fff;
    font-family: -apple-system, "SF Pro Display", "Helvetica Neue", Arial, sans-serif;
    background: linear-gradient(135deg, #3b0764 0%, #581c87 45%, #312e81 100%); }
  .blob { position: absolute; border-radius: 50%; filter: blur(80px); }
  .a { width: 520px; height: 520px; top: -200px; right: -120px; background: rgba(168, 85, 247, .45); }
  .b { width: 460px; height: 460px; bottom: -220px; left: -140px; background: rgba(99, 102, 241, .40); }
  .wrap { position: relative; height: 100%; padding: 0 88px; display: flex; align-items: center; gap: 64px; }
  .brand { position: absolute; left: 88px; bottom: 56px; display: flex; align-items: center; gap: 14px;
    font-size: 26px; font-weight: 700; letter-spacing: -.01em; }
  .brand img { width: 44px; height: 44px; filter: brightness(0) invert(1); }
  .eyebrow { font-size: 22px; font-weight: 600; letter-spacing: .18em; text-transform: uppercase; color: #d8b4fe; }
  h1 { margin-top: 18px; font-size: 76px; line-height: 1.02; font-weight: 800; letter-spacing: -.03em; }
  p { margin-top: 22px; font-size: 32px; line-height: 1.3; color: #e9d5ff; max-width: 720px; }
  .icon { width: 260px; height: 260px; border-radius: 58px; flex: none;
    box-shadow: 0 30px 60px rgba(0,0,0,.35), 0 0 0 8px rgba(255,255,255,.08); }
  .pill { display: inline-block; margin-top: 30px; padding: 10px 22px; border-radius: 999px;
    background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.22); font-size: 24px; font-weight: 600; }
</style><div class="blob a"></div><div class="blob b"></div>${body}
<div class="brand"><img src="${file('kf-production-logo.png')}">KF Production</div>`;

const appCard = (a) => page(`<div class="wrap">
  <img class="icon" src="${file(a.icon.slice(1))}">
  <div style="margin-top:-40px">
    <div class="eyebrow">Free app · ${esc(a.platforms)}</div>
    <h1>${esc(a.name)}</h1>
    <p>${esc(a.tagline)}</p>
  </div></div>`);

const siteCard = () => page(`<div class="wrap" style="flex-direction:column;align-items:flex-start;justify-content:center;gap:0">
  <div class="eyebrow">KF Production</div>
  <h1 style="font-size:84px;max-width:1000px">Simplifying life,<br>one app at a time</h1>
  <p style="max-width:960px">Holiday calendars for Asia and Australia, and loan calculators for Malaysia.</p>
  <div style="display:flex;gap:18px;margin-top:40px;margin-bottom:60px">
    ${apps.slice(0, 9).map((a) => `<img src="${file(a.icon.slice(1))}" style="width:84px;height:84px;border-radius:20px;box-shadow:0 10px 24px rgba(0,0,0,.3)">`).join('')}
  </div></div>`);

const tmp = mkdtempSync(join(tmpdir(), 'og-'));
mkdirSync(outDir, { recursive: true });
try {
  for (const [name, html] of [['site', siteCard()], ...apps.map((a) => [a.id, appCard(a)])]) {
    const htmlPath = join(tmp, `${name}.html`);
    const png = join(tmp, `${name}.png`);
    writeFileSync(htmlPath, html);
    execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files',
      '--window-size=1200,630', `--screenshot=${png}`, `file://${htmlPath}`], { stdio: 'ignore' });
    execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '85', png, '--out', join(outDir, `${name}.jpg`)], { stdio: 'ignore' });
    console.log(`og/${name}.jpg`);
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
