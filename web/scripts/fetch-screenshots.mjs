// Downloads each app's phone screenshots from its Google Play and App Store listings into
// public/screenshots/<app>/, and lists them in src/data/screenshots.json for the app pages.
// Apps not in the stores yet read their store screenshots from a local folder instead.
// Needs ImageMagick (`magick`). Run it again after a listing's screenshots change:
//
//   node scripts/fetch-screenshots.mjs [app-id ...]
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const web = join(dirname(fileURLToPath(import.meta.url)), '..');
const material = join(web, '../../App Material');
const MAX = 8; // per platform
const WIDTH = 480; // shown at about 240px wide, so sharp on 2x screens

const LUNAR_IOS = 'https://apps.apple.com/us/app/lunar-calendar-holidays/id6806542405';
const APPS = [
  { id: 'malaysia-calendar', play: 'org.jm.malaysiahorsecalendar' },
  { id: 'singapore-calendar', play: 'org.kf.singaporehorsecalendar' },
  { id: 'kalendar-hijrah', play: 'org.jm.kalendarhijrahmalaysia' },
  {
    id: 'housing-loan-calculator',
    play: 'com.houseloancalculator',
    appStore: 'https://apps.apple.com/my/app/housing-loan-calculator-my/id6806969416',
  },
  { id: 'thailand-calendar', play: 'org.kf.thaicalendar' },
  { id: 'vietnamese-calendar', play: 'org.kf.vietnamesecalendar' },
  { id: 'hong-kong-calendar', play: 'org.kf.hongkongcalendar' },
  { id: 'taiwan-calendar', play: 'org.kf.taiwancalendar' },
  { id: 'south-korea-calendar', play: 'org.kf.southkoreacalendar' },
  { id: 'indonesia-calendar', play: 'org.kf.indonesiacalendar' },
  { id: 'australia-calendar', play: 'org.kf.australiacalendar' },
  {
    id: 'car-loan-calculator',
    play: 'org.kf.carloancalculatormalaysia',
    appStore: 'https://apps.apple.com/my/app/car-loan-calculator-my/id6806989718',
  },
  { id: 'lunar-calendar', appStore: LUNAR_IOS },
  {
    id: 'shelfbell',
    local: { android: join(material, 'Shelfbell/android'), ios: join(material, 'Shelfbell/ios') },
  },
];

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) ' +
  'Chrome/130 Safari/537.36';

async function get(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res;
}

// Screenshot URLs in listing order, at a size big enough to scale down from.
async function playShots(pkg) {
  const html = await (await get(`https://play.google.com/store/apps/details?id=${pkg}&hl=en`)).text();
  return [...html.matchAll(/<img[^>]*alt="Screenshot image"[^>]*>/g)]
    .map((m) => /src="([^"=]+)/.exec(m[0])?.[1])
    .filter(Boolean)
    .map((u) => `${u}=w${WIDTH * 2}`);
}

async function appStoreShots(url) {
  const html = await (await get(url)).text();
  const bases = html.match(/https:\/\/is\d-ssl\.mzstatic\.com\/image\/thumb\/PurpleSource[^\s"/]*\/v4\/[^\s"]+?\.(?:png|jpg|jpeg)(?=\/)/g) ?? [];
  return [...new Set(bases)].map((b) => `${b}/${WIDTH * 2}x${WIDTH * 5}bb.png`);
}

function localShots(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => /^\d+.*\.png$/.test(f))
    .sort()
    .map((f) => join(dir, f));
}

// Some listings upload screenshots already drawn in a phone. Their edges read: a light metal
// rim, then a run of near-black bezel, on both sides and at several heights. A plain
// screenshot, even a dark-mode one, has no light rim before its dark pixels.
function framed(file, height) {
  const row = (y, fromRight) => {
    const crop = fromRight ? `40x1+${WIDTH - 40}+${y}` : `40x1+0+${y}`;
    const px = execFileSync('magick', [file, '-crop', crop, '+repage', '-depth', '8', 'txt:-'])
      .toString()
      .split('\n')
      .slice(1)
      .map((l) => /#([0-9A-F]{6})/i.exec(l)?.[1])
      .filter(Boolean)
      .map((hex) => Math.max(...[0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16))));
    return fromRight ? px.reverse() : px;
  };
  const bezel = (px) => {
    const start = px.findIndex((v, i) => px.slice(i, i + 5).length === 5 && px.slice(i, i + 5).every((p) => p < 0x28));
    return start > 0 && px.slice(0, start).some((v) => v > 0x60);
  };
  return [0.3, 0.5, 0.7].every((f) => {
    const y = Math.round(height * f);
    return bezel(row(y, false)) && bezel(row(y, true));
  });
}

const tmp = join(tmpdir(), 'kf-screenshots');
mkdirSync(tmp, { recursive: true });

// Saves one screenshot as WebP, or returns null if it is not a phone screenshot (tablets
// and feature graphics are wider than 9:16).
async function save(source, out) {
  let input = source;
  if (source.startsWith('https://')) {
    input = join(tmp, 'in');
    writeFileSync(input, Buffer.from(await (await get(source)).arrayBuffer()));
  }
  const [w, h] = execFileSync('magick', ['identify', '-format', '%w %h', `${input}[0]`])
    .toString()
    .split(' ')
    .map(Number);
  if (h / w < 1.7) return null;
  execFileSync('magick', [input, '-resize', `${WIDTH}x`, '-quality', '82', out]);
  const height = Math.round((h * WIDTH) / w);
  return { width: WIDTH, height, ...(framed(out, height) && { framed: true }) };
}

const manifestPath = join(web, 'src/data/screenshots.json');
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : {};
const only = process.argv.slice(2);

for (const app of APPS.filter((a) => only.length === 0 || only.includes(a.id))) {
  const dir = join(web, 'public/screenshots', app.id);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  const sources = {
    android: app.play ? await playShots(app.play) : localShots(app.local?.android ?? ''),
    ios: app.appStore ? await appStoreShots(app.appStore) : localShots(app.local?.ios ?? ''),
  };
  manifest[app.id] = {};
  for (const [platform, urls] of Object.entries(sources)) {
    const shots = [];
    for (const url of urls) {
      if (shots.length === MAX) break;
      const name = `${platform}-${shots.length + 1}.webp`;
      const size = await save(url, join(dir, name));
      if (size) shots.push({ src: `/screenshots/${app.id}/${name}`, ...size });
    }
    if (shots.length) manifest[app.id][platform] = shots;
  }
  console.log(app.id, Object.fromEntries(Object.entries(manifest[app.id]).map(([k, v]) => [k, v.length])));
}

writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 1)}\n`);
