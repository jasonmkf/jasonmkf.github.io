// Copies public and school holidays from the Lunar Calendar app's data into src/data/holidays,
// one JSON file per country, for the holiday pages. Run it after the app data changes:
//
//   node scripts/sync-holidays.mjs [path/to/lunar-calendar/app-config/countries]
//
// The default path assumes the android repos sit next to this one, as ~/github/android.
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Years that get pages. Add a year once its data is in the app; never drop one that is live.
const YEARS = [2026, 2027];
// Countries whose school holidays the apps show. TH has none; VN's app does not show them.
const COUNTRIES = ['MY', 'SG', 'ID', 'TH', 'VN', 'HK', 'TW', 'KR', 'AU'];
const NO_SCHOOL = new Set(['TH', 'VN']);

const web = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = process.argv[2] ?? join(web, '../../android/lunar-calendar/app-config/countries');
const dest = join(web, 'src/data/holidays');
if (!existsSync(src)) throw new Error(`No app data at ${src}`);
mkdirSync(dest, { recursive: true });

const read = (path) => JSON.parse(readFileSync(path, 'utf8'));
const iso = (y, m, d) => `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
const nextDay = (date) => {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
};
const overlapsYear = (p, y) => p.start <= `${y}-12-31` && p.end >= `${y}-01-01`;

// Public holidays, and the festivals and observances that are not days off (NORMAL_DAY).
function events(country, year) {
  const data = read(join(src, country, 'calendar_data', `${year}.json`));
  const holidays = [];
  const observances = [];
  for (const month of data.months) {
    for (const day of month.specialDays ?? []) {
      for (const e of day.events) {
        if (e.type === 'NORMAL_DAY') {
          const o = { date: iso(year, month.month, day.date), name: e.name };
          if (e.nameLocale && e.nameLocale !== e.name) o.local = e.nameLocale;
          observances.push(o);
        }
        if (e.type !== 'PUBLIC_HOLIDAY') continue;
        const scope = (e.scope ?? 'NATIONAL').toUpperCase();
        const h = { date: iso(year, month.month, day.date), name: e.name };
        if (e.nameLocale && e.nameLocale !== e.name) h.local = e.nameLocale;
        if (e.nameCn) h.cn = e.nameCn;
        if (scope === 'STATE' && e.states?.length) h.states = [...e.states].sort();
        if (scope === 'GOVERNMENT') h.government = true;
        if (e.remark) h.remark = e.remark;
        holidays.push(h);
      }
    }
  }
  const byDate = (a, b) => a.date.localeCompare(b.date);
  return { publicHolidays: holidays.sort(byDate), observances: observances.sort(byDate) };
}

// MY and SG record school holidays as days of each month; join them into breaks, across years,
// so a year-end break that runs into January is one break.
function inlineBreaks(country) {
  const dir = join(src, country, 'calendar_data');
  const days = readdirSync(dir)
    .filter((f) => /^\d{4}\.json$/.test(f))
    .flatMap((f) =>
      read(join(dir, f)).months.flatMap((m) =>
        (m.schoolHolidays ?? []).map((d) => iso(Number(f.slice(0, 4)), m.month, d)),
      ),
    )
    .sort();
  const breaks = [];
  for (const day of days) {
    const last = breaks.at(-1);
    if (last && nextDay(last.end) === day) last.end = day;
    else breaks.push({ kind: 'break', start: day, end: day });
  }
  return breaks;
}

function periods(country) {
  const dir = join(src, country, 'school_holiday_data');
  const seen = new Map();
  for (const f of readdirSync(dir).filter((f) => /^\d{4}\.json$/.test(f))) {
    for (const p of read(join(dir, f)).periods) {
      const period = {
        kind: p.type === 'BREAK' ? 'break' : 'term',
        key: p.nameKey,
        start: p.startDate,
        end: p.endDate,
        ...(p.regions?.length && { regions: [...p.regions].sort() }),
      };
      seen.set(JSON.stringify(period), period);
    }
  }
  return [...seen.values()].sort((a, b) => a.start.localeCompare(b.start));
}

for (const country of COUNTRIES) {
  const config = read(join(src, country, 'config.json'));
  const school = NO_SCHOOL.has(country)
    ? []
    : config.features.schoolHolidayScreen
      ? periods(country)
      : inlineBreaks(country);
  const years = {};
  for (const year of YEARS) {
    years[year] = {
      ...events(country, year),
      school: school.filter((p) => overlapsYear(p, year)),
    };
  }
  const file = join(dest, `${country.toLowerCase()}.json`);
  writeFileSync(file, `${JSON.stringify({ country, years }, null, 1)}\n`);
  console.log('Wrote', file);
}
