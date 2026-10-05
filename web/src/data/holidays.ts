// Public and school holidays for the holiday pages, from the Lunar Calendar app's data.
// scripts/sync-holidays.mjs writes the JSON files; this file adds the words around them.
import my from './holidays/my.json';
import sg from './holidays/sg.json';
import id from './holidays/id.json';
import th from './holidays/th.json';
import vn from './holidays/vn.json';
import hk from './holidays/hk.json';
import tw from './holidays/tw.json';
import kr from './holidays/kr.json';
import au from './holidays/au.json';

export interface PublicHoliday {
  date: string; // YYYY-MM-DD
  name: string;
  local?: string; // the name in the country's language, when it differs
  cn?: string;
  states?: string[]; // only these states or provinces; absent means nationwide
  government?: boolean; // government offices only
  remark?: string;
}

export interface Observance {
  date: string;
  name: string;
  local?: string;
}

export interface SchoolPeriod {
  kind: 'break' | 'term';
  key?: string;
  start: string;
  end: string;
  regions?: string[]; // absent means every region
}

interface YearData {
  publicHolidays: PublicHoliday[];
  observances: Observance[];
  school: SchoolPeriod[];
}

// A search term in the country's own language, shown next to the English one.
export interface Term {
  lang: string;
  text: string;
}

export interface Country {
  code: string;
  appId: string; // the app page the holiday pages sit under
  name: string;
  regionNoun: string; // what a holiday's `states` are
  regionNounPlural: string;
  weekStartsMonday: boolean;
  hasSchool: boolean; // the app shows school holidays at all; see hasSchoolIn for a given year
  publicTitle: (y: number) => string;
  schoolTitle: (y: number) => string;
  publicTerms: (y: number) => Term[];
  schoolTerms: (y: number) => Term[];
  calendarTerms: (y: number) => Term[];
  breakName: (p: SchoolPeriod) => string;
  weekendNote?: string;
  schoolNote?: string;
}

// Holiday pages exist for these years. Keep a year once it is live: its pages are indexed.
export const HOLIDAY_YEARS = [2026, 2027, 2028];
// The year most people are planning for, which the app pages and the hub lead with.
export const FEATURED_YEAR = 2027;
// From this year on, most countries have not announced their holidays yet, so the dates are
// the app's expected ones.
export const PROVISIONAL_FROM = 2028;
// How the years are listed: the featured year first, then later ones, then past ones.
export const YEARS_BY_RELEVANCE = [
  FEATURED_YEAR,
  ...HOLIDAY_YEARS.filter((y) => y > FEATURED_YEAR),
  ...HOLIDAY_YEARS.filter((y) => y < FEATURED_YEAR).reverse(),
];

// JSON imports type `kind` as string; the sync script only writes 'break' or 'term'.
const data = { my, sg, id, th, vn, hk, tw, kr, au } as unknown as Record<
  string,
  { years: Record<string, YearData> }
>;

const month = (date: string) => Number(date.slice(5, 7));

// MY and SG record school holidays as days, so their breaks have no names; name them by when
// they start, as KPM and MOE do.
const malaysianBreak = (p: SchoolPeriod) => {
  const m = month(p.start);
  if (m >= 11 || m === 1) return 'Year-end school holidays (Cuti Akhir Persekolahan)';
  if (m <= 3) return 'Term 1 break (Cuti Penggal 1)';
  if (m <= 6) return 'Term 2 break (Cuti Penggal 2)';
  return 'Term 3 break (Cuti Penggal 3)';
};

const singaporeBreak = (p: SchoolPeriod) => {
  const m = month(p.start);
  if (m >= 11 || m === 1) return 'Year-end holidays';
  if (m <= 3) return 'March holidays';
  if (m <= 6) return 'June holidays';
  return 'September holidays';
};

const named = (names: Record<string, string>) => (p: SchoolPeriod) =>
  names[p.key ?? ''] ?? 'School holidays';

const zhHans = (text: string): Term => ({ lang: 'zh-Hans', text });

export const countries: Country[] = [
  {
    code: 'my',
    appId: 'malaysia-calendar',
    name: 'Malaysia',
    regionNoun: 'state',
    regionNounPlural: 'states',
    weekStartsMonday: false,
    hasSchool: true,
    publicTitle: (y) => `Malaysia Public Holidays ${y} by State (Cuti Umum ${y})`,
    schoolTitle: (y) => `Malaysia School Holidays ${y} (Cuti Sekolah ${y})`,
    publicTerms: (y) => [
      { lang: 'ms', text: `Cuti Umum Malaysia ${y}` },
      { lang: 'ms', text: `Hari Kelepasan Am ${y}` },
      zhHans(`${y}年马来西亚公共假期`),
    ],
    schoolTerms: (y) => [
      { lang: 'ms', text: `Cuti Sekolah ${y}` },
      { lang: 'ms', text: `Kalendar Akademik ${y}` },
      zhHans(`${y}年马来西亚学校假期`),
    ],
    calendarTerms: (y) => [
      { lang: 'ms', text: `Kalendar Malaysia ${y}` },
      zhHans(`${y}年马来西亚日历`),
    ],
    breakName: malaysianBreak,
    weekendNote:
      'Long weekends are worked out for a Saturday and Sunday weekend. Kedah, Kelantan and ' +
      'Terengganu rest on Friday and Saturday, so theirs fall differently.',
    schoolNote:
      'The dates are for Kumpulan B, the states with a Saturday and Sunday weekend. Kumpulan A ' +
      '(Kedah, Kelantan and Terengganu) starts and ends each break one day earlier. Extra festive ' +
      'school holidays (cuti perayaan) announced by KPM are not included.',
  },
  {
    code: 'sg',
    appId: 'singapore-calendar',
    name: 'Singapore',
    regionNoun: 'region',
    regionNounPlural: 'regions',
    weekStartsMonday: false,
    hasSchool: true,
    publicTitle: (y) => `Singapore Public Holidays ${y} & Long Weekends`,
    schoolTitle: (y) => `Singapore School Holidays ${y} (MOE)`,
    publicTerms: (y) => [zhHans(`${y}年新加坡公共假期`)],
    schoolTerms: (y) => [
      { lang: 'en', text: `MOE school holidays ${y}` },
      zhHans(`${y}年新加坡学校假期`),
    ],
    calendarTerms: (y) => [zhHans(`${y}年新加坡日历`)],
    breakName: singaporeBreak,
    schoolNote:
      'These are the MOE school holidays for primary and secondary schools. One-off school ' +
      "holidays, such as the day after Youth Day or Teachers' Day, are not included.",
  },
  {
    code: 'id',
    appId: 'indonesia-calendar',
    name: 'Indonesia',
    regionNoun: 'province',
    regionNounPlural: 'provinces',
    weekStartsMonday: false,
    hasSchool: true,
    publicTitle: (y) => `Indonesia Public Holidays ${y}: Libur Nasional & Cuti Bersama`,
    schoolTitle: (y) => `Indonesia School Holidays ${y} by Province (Libur Sekolah)`,
    publicTerms: (y) => [
      { lang: 'id', text: `Hari Libur Nasional ${y}` },
      { lang: 'id', text: `Cuti Bersama ${y}` },
      { lang: 'id', text: `Tanggal Merah ${y}` },
    ],
    schoolTerms: (y) => [
      { lang: 'id', text: `Libur Sekolah ${y}` },
      { lang: 'id', text: `Kalender Pendidikan ${y}` },
    ],
    calendarTerms: (y) => [
      { lang: 'id', text: `Kalender ${y}` },
      { lang: 'id', text: `Kalender Indonesia ${y}` },
    ],
    breakName: named({
      libur_semester_ganjil: 'Semester break (Libur Semester Ganjil)',
      libur_idul_fitri: 'Eid al-Fitr holiday (Libur Idul Fitri)',
      libur_akhir_tahun: 'End of school year holiday (Libur Akhir Tahun Pelajaran)',
    }),
    schoolNote:
      'Each province sets its own school calendar (kalender pendidikan), so check with your ' +
      "province's education office for your child's school.",
  },
  {
    code: 'th',
    appId: 'thailand-calendar',
    name: 'Thailand',
    regionNoun: 'province',
    regionNounPlural: 'provinces',
    weekStartsMonday: false,
    hasSchool: false,
    publicTitle: (y) => `Thailand Public Holidays ${y} (วันหยุด ${y + 543})`,
    schoolTitle: (y) => `Thailand School Holidays ${y}`,
    publicTerms: (y) => [
      { lang: 'th', text: `วันหยุดราชการ ${y + 543}` },
      { lang: 'th', text: `วันหยุดนักขัตฤกษ์ ${y + 543}` },
    ],
    schoolTerms: () => [],
    calendarTerms: (y) => [
      { lang: 'th', text: `ปฏิทิน ${y + 543}` },
      { lang: 'th', text: `ปฏิทินวันหยุด ${y + 543}` },
    ],
    breakName: () => 'School holidays',
  },
  {
    code: 'vn',
    appId: 'vietnamese-calendar',
    name: 'Vietnam',
    regionNoun: 'province',
    regionNounPlural: 'provinces',
    weekStartsMonday: true,
    hasSchool: false,
    publicTitle: (y) => `Vietnam Public Holidays ${y}: Tết & Lịch Nghỉ Lễ ${y}`,
    schoolTitle: (y) => `Vietnam School Holidays ${y}`,
    publicTerms: (y) => [
      { lang: 'vi', text: `Lịch nghỉ lễ ${y}` },
      { lang: 'vi', text: `Lịch nghỉ Tết ${y}` },
    ],
    schoolTerms: () => [],
    calendarTerms: (y) => [
      { lang: 'vi', text: `Lịch ${y}` },
      { lang: 'vi', text: `Lịch vạn niên ${y}` },
    ],
    breakName: () => 'School holidays',
  },
  {
    code: 'hk',
    appId: 'hong-kong-calendar',
    name: 'Hong Kong',
    regionNoun: 'district',
    regionNounPlural: 'districts',
    weekStartsMonday: false,
    hasSchool: true,
    publicTitle: (y) => `Hong Kong Public Holidays ${y} (${y}年香港公眾假期)`,
    schoolTitle: (y) => `Hong Kong School Holidays ${y} (學校假期)`,
    publicTerms: (y) => [
      { lang: 'zh-Hant-HK', text: `${y}年香港公眾假期` },
      { lang: 'zh-Hant-HK', text: `${y}年勞工假期` },
    ],
    schoolTerms: (y) => [{ lang: 'zh-Hant-HK', text: `${y}年香港學校假期` }],
    calendarTerms: (y) => [
      { lang: 'zh-Hant-HK', text: `${y}年香港月曆` },
      { lang: 'zh-Hant-HK', text: `${y}年日曆` },
    ],
    breakName: named({
      winter_break: 'Christmas and New Year holidays (聖誕及新年假期)',
      lunar_new_year_break: 'Lunar New Year holidays (農曆新年假期)',
      easter_break: 'Easter holidays (復活節假期)',
      summer_break: 'Summer holidays (暑假)',
    }),
    schoolNote:
      "Based on the Education Bureau's example school calendar. Each school sets its own " +
      'holidays within the guidelines, so check with your school.',
  },
  {
    code: 'tw',
    appId: 'taiwan-calendar',
    name: 'Taiwan',
    regionNoun: 'city',
    regionNounPlural: 'cities',
    weekStartsMonday: false,
    hasSchool: true,
    publicTitle: (y) => `Taiwan Public Holidays ${y} (民國${y - 1911}年 國定假日)`,
    schoolTitle: (y) => `Taiwan School Holidays ${y}: Winter & Summer Break (寒暑假)`,
    publicTerms: (y) => [
      { lang: 'zh-Hant-TW', text: `${y} 國定假日` },
      { lang: 'zh-Hant-TW', text: `${y - 1911}年 放假日` },
      { lang: 'zh-Hant-TW', text: `${y - 1911}年 連假` },
    ],
    schoolTerms: (y) => [
      { lang: 'zh-Hant-TW', text: `${y} 寒假` },
      { lang: 'zh-Hant-TW', text: `${y} 暑假` },
    ],
    calendarTerms: (y) => [
      { lang: 'zh-Hant-TW', text: `${y - 1911}年 行事曆` },
      { lang: 'zh-Hant-TW', text: `${y} 月曆` },
    ],
    breakName: named({ winter_break: 'Winter break (寒假)', summer_break: 'Summer break (暑假)' }),
    schoolNote:
      "Dates follow Taipei City's primary and secondary school calendar; other cities are " +
      'usually the same or within a few days.',
  },
  {
    code: 'kr',
    appId: 'south-korea-calendar',
    name: 'South Korea',
    regionNoun: 'region',
    regionNounPlural: 'regions',
    weekStartsMonday: false,
    hasSchool: true,
    publicTitle: (y) => `South Korea Public Holidays ${y} (${y}년 공휴일·대체공휴일)`,
    schoolTitle: (y) => `South Korea School Holidays ${y} (${y} 방학)`,
    publicTerms: (y) => [
      { lang: 'ko', text: `${y}년 공휴일` },
      { lang: 'ko', text: `${y} 대체공휴일` },
      { lang: 'ko', text: `${y} 빨간날` },
    ],
    schoolTerms: (y) => [
      { lang: 'ko', text: `${y} 여름방학` },
      { lang: 'ko', text: `${y} 겨울방학` },
    ],
    calendarTerms: (y) => [{ lang: 'ko', text: `${y}년 달력` }],
    breakName: named({
      winter_break: 'Winter vacation (겨울방학)',
      summer_break: 'Summer vacation (여름방학)',
    }),
    schoolNote:
      'Typical dates for primary and secondary schools. Each school sets its own vacation, so ' +
      'check with your school.',
  },
  {
    code: 'au',
    appId: 'australia-calendar',
    name: 'Australia',
    regionNoun: 'state or territory',
    regionNounPlural: 'states and territories',
    weekStartsMonday: true,
    hasSchool: true,
    publicTitle: (y) => `Australia Public Holidays ${y} by State & Territory`,
    schoolTitle: (y) => `Australia School Holidays & Term Dates ${y} by State`,
    publicTerms: (y) => [
      { lang: 'en', text: `NSW, VIC, QLD, WA, SA, TAS, ACT and NT public holidays ${y}` },
    ],
    schoolTerms: (y) => [{ lang: 'en', text: `School terms ${y}` }],
    calendarTerms: (y) => [{ lang: 'en', text: `${y} calendar Australia` }],
    breakName: named({
      summer_break: 'Summer holidays',
      autumn_break: 'Autumn holidays',
      winter_break: 'Winter holidays',
      spring_break: 'Spring holidays',
      term_1: 'Term 1',
      term_2: 'Term 2',
      term_3: 'Term 3',
      term_4: 'Term 4',
    }),
    schoolNote:
      'Government school terms. Catholic and independent schools can differ by a few days.',
  },
];

export const findCountry = (code: string) => countries.find((c) => c.code === code);
export const countryForApp = (appId: string) => countries.find((c) => c.appId === appId);

export function yearData(country: Country, year: number): YearData {
  return data[country.code].years[String(year)];
}

// School breaks that start in the year. A break that started the year before is left to
// that year's page, which links on.
export function schoolBreaks(country: Country, year: number) {
  return yearData(country, year).school.filter(
    (p) => p.kind === 'break' && p.start.startsWith(String(year)),
  );
}

export function carriedOverBreak(country: Country, year: number) {
  return yearData(country, year).school.find(
    (p) => p.kind === 'break' && p.start < `${year}-01-01`,
  );
}

export const isNational = (h: PublicHoliday) => !h.states && !h.government;

// School holiday pages exist only for years whose school calendar has been published.
export const hasSchoolIn = (c: Country, year: number) =>
  c.hasSchool && schoolBreaks(c, year).length > 0;

export type HolidayView = 'calendar' | 'public' | 'school';

export const viewsFor = (c: Country, year: number): HolidayView[] =>
  hasSchoolIn(c, year) ? ['calendar', 'public', 'school'] : ['calendar', 'public'];

export const holidayPath = (c: Country, view: HolidayView, year: number) =>
  view === 'calendar'
    ? `/${c.appId}/${year}/`
    : `/${c.appId}/${view === 'public' ? 'public-holidays' : 'school-holidays'}-${year}/`;

// Dates are calendar dates, so all arithmetic is done in UTC to keep them from shifting.
export const toDate = (iso: string) => new Date(`${iso}T00:00:00Z`);
export const toIso = (d: Date) => d.toISOString().slice(0, 10);
export const addDays = (iso: string, n: number) => {
  const d = toDate(iso);
  d.setUTCDate(d.getUTCDate() + n);
  return toIso(d);
};
export const daysBetween = (start: string, end: string) =>
  Math.round((toDate(end).getTime() - toDate(start).getTime()) / 86_400_000) + 1;

const fmt = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  toDate(iso).toLocaleDateString('en-GB', { timeZone: 'UTC', ...opts });
export const weekday = (iso: string) => fmt(iso, { weekday: 'long' });
export const shortDate = (iso: string) => fmt(iso, { weekday: 'short', day: 'numeric', month: 'short' });
export const longDate = (iso: string) => fmt(iso, { day: 'numeric', month: 'long', year: 'numeric' });
export const dayMonth = (iso: string) => fmt(iso, { day: 'numeric', month: 'short' });

export interface LongWeekend {
  start: string;
  end: string;
  days: number;
  holidays: string[];
}

// Runs of three or more days off — Saturday, Sunday and nationwide holidays — that include a
// holiday on a weekday, starting in the year.
export function longWeekends(country: Country, year: number): LongWeekend[] {
  const holidays = new Map<string, string[]>();
  const all = [
    ...yearData(country, year).publicHolidays,
    ...(HOLIDAY_YEARS.includes(year + 1) ? yearData(country, year + 1).publicHolidays : []),
  ];
  for (const h of all.filter(isNational)) {
    holidays.set(h.date, [...(holidays.get(h.date) ?? []), h.name]);
  }
  const off = (iso: string) => holidays.has(iso) || [0, 6].includes(toDate(iso).getUTCDay());

  const out: LongWeekend[] = [];
  let day = `${year}-01-01`;
  while (day <= `${year}-12-31`) {
    if (!off(day) || (day !== `${year}-01-01` && off(addDays(day, -1)))) {
      day = addDays(day, 1);
      continue;
    }
    let end = day;
    while (off(addDays(end, 1))) end = addDays(end, 1);
    const days = daysBetween(day, end);
    const names: string[] = [];
    for (let d = day; d <= end; d = addDays(d, 1)) {
      for (const n of holidays.get(d) ?? []) if (!names.includes(n)) names.push(n);
    }
    if (days >= 3 && names.length > 0) out.push({ start: day, end, days, holidays: names });
    day = addDays(end, 1);
  }
  return out;
}

// Every state or province named in the year's holidays, for the by-state section.
export function regionsOf(country: Country, year: number) {
  const set = new Set<string>();
  for (const h of yearData(country, year).publicHolidays) h.states?.forEach((s) => set.add(s));
  return [...set].sort();
}
