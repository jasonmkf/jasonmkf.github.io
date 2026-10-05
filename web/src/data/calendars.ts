// The Chinese lunar and Hijri calendars for the lunar and Kalendar Hijrah pages, worked out at
// build time the same way the apps do:
// - Chinese lunar dates from tyme4ts, the TypeScript twin of the tyme4kt library the apps use;
// - Hijri dates from Umm al-Qura (Intl's islamic-umalqura), which matches the apps' own table
//   day for day. Where Malaysia gazettes an Islamic public holiday on another day, the
//   gazetted date wins, as it does in the Kalendar Hijrah app.
import { SolarDay } from 'tyme4ts';
import { addDays, findCountry, toDate, yearData } from '@/data/holidays';

const days = (year: number) => {
  const out: string[] = [];
  for (let d = `${year}-01-01`; d <= `${year}-12-31`; d = addDays(d, 1)) out.push(d);
  return out;
};

// --- Chinese lunar -------------------------------------------------------------------------

export interface LunarDate {
  year: number;
  month: number; // 1-12
  leap: boolean;
  day: number;
  monthName: string; // 正月 … 腊月, 闰五月
  dayName: string; // 初一 … 三十
  monthDays: number;
}

export function lunarDate(iso: string): LunarDate {
  const [y, m, d] = iso.split('-').map(Number);
  const ld = SolarDay.fromYmd(y, m, d).getLunarDay();
  const lm = ld.getLunarMonth();
  return {
    year: lm.getYear(),
    month: Math.abs(lm.getMonthWithLeap()),
    leap: lm.isLeap(),
    day: ld.getDay(),
    monthName: lm.getName(),
    dayName: ld.getName(),
    monthDays: lm.getDayCount(),
  };
}

const ZODIAC: Record<string, string> = {
  鼠: 'Rat', 牛: 'Ox', 虎: 'Tiger', 兔: 'Rabbit', 龙: 'Dragon', 蛇: 'Snake',
  马: 'Horse', 羊: 'Goat', 猴: 'Monkey', 鸡: 'Rooster', 狗: 'Dog', 猪: 'Pig',
};

// The lunar year that starts with Chinese New Year in this Gregorian year.
export function lunarYear(year: number) {
  const newYear = days(year).find((d) => {
    const l = lunarDate(d);
    return l.month === 1 && l.day === 1 && !l.leap;
  })!;
  const cycle = SolarDay.fromYmd(...(newYear.split('-').map(Number) as [number, number, number]))
    .getLunarDay()
    .getLunarMonth()
    .getLunarYear()
    .getSixtyCycle();
  const zodiac = cycle.getEarthBranch().getZodiac().getName();
  return { newYear, ganZhi: cycle.getName(), zodiac, zodiacEn: ZODIAC[zodiac] ?? zodiac };
}

const ORDINAL = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
export const lunarMonthEn = (l: Pick<LunarDate, 'month' | 'leap'>) =>
  `${l.leap ? 'Leap ' : ''}${ORDINAL[l.month - 1]} month`;

export function lunarMonthsStarting(year: number) {
  return days(year)
    .map((date) => ({ date, l: lunarDate(date) }))
    .filter(({ l }) => l.day === 1);
}

const TERMS: Record<string, string> = {
  小寒: 'Minor Cold', 大寒: 'Major Cold', 立春: 'Start of Spring', 雨水: 'Rain Water',
  惊蛰: 'Awakening of Insects', 春分: 'Spring Equinox', 清明: 'Pure Brightness (Qingming)',
  谷雨: 'Grain Rain', 立夏: 'Start of Summer', 小满: 'Grain Buds', 芒种: 'Grain in Ear',
  夏至: 'Summer Solstice', 小暑: 'Minor Heat', 大暑: 'Major Heat', 立秋: 'Start of Autumn',
  处暑: 'End of Heat', 白露: 'White Dew', 秋分: 'Autumn Equinox', 寒露: 'Cold Dew',
  霜降: "Frost's Descent", 立冬: 'Start of Winter', 小雪: 'Minor Snow', 大雪: 'Major Snow',
  冬至: 'Winter Solstice (Dongzhi)',
};

// The 24 solar terms (节气): the day each one begins.
export function solarTerms(year: number) {
  const out: { date: string; zh: string; en: string }[] = [];
  let previous = '';
  for (const date of [addDays(`${year}-01-01`, -1), ...days(year)]) {
    const [y, m, d] = date.split('-').map(Number);
    const name = SolarDay.fromYmd(y, m, d).getTerm().getName();
    if (previous && name !== previous && date.startsWith(String(year))) {
      out.push({ date, zh: name, en: TERMS[name] ?? name });
    }
    previous = name;
  }
  return out;
}

const LUNAR_FESTIVALS: { month: number; day: number; zh: string; en: string }[] = [
  { month: 1, day: 1, zh: '春节', en: 'Chinese New Year' },
  { month: 1, day: 15, zh: '元宵节', en: 'Lantern Festival (Chap Goh Mei)' },
  { month: 5, day: 5, zh: '端午节', en: 'Dragon Boat Festival' },
  { month: 7, day: 7, zh: '七夕', en: 'Qixi (Chinese Valentine’s Day)' },
  { month: 7, day: 15, zh: '中元节', en: 'Hungry Ghost Festival' },
  { month: 8, day: 15, zh: '中秋节', en: 'Mid-Autumn Festival' },
  { month: 9, day: 9, zh: '重阳节', en: 'Double Ninth Festival' },
  { month: 12, day: 8, zh: '腊八节', en: 'Laba Festival' },
];

export interface Festival {
  date: string;
  zh: string;
  en: string;
  lunar: string; // the lunar date, or the solar term
}

export function lunarFestivals(year: number): Festival[] {
  const out: Festival[] = [];
  for (const date of days(year)) {
    const l = lunarDate(date);
    if (l.leap) continue;
    for (const f of LUNAR_FESTIVALS) {
      if (f.month === l.month && f.day === l.day) {
        out.push({ date, zh: f.zh, en: f.en, lunar: `${l.monthName}${l.dayName}` });
      }
    }
    if (l.month === 12 && l.day === l.monthDays) {
      out.push({ date, zh: '除夕', en: 'Chinese New Year’s Eve', lunar: `${l.monthName}${l.dayName}` });
    }
  }
  for (const t of solarTerms(year).filter((t) => t.zh === '清明' || t.zh === '冬至')) {
    out.push({ date: t.date, zh: t.zh, en: t.zh === '清明' ? 'Qingming Festival' : 'Dongzhi (Winter Solstice Festival)', lunar: 'Solar term' });
  }
  return out.sort((a, b) => a.date.localeCompare(b.date));
}

// --- Hijri ---------------------------------------------------------------------------------

export const HIJRI_MONTHS_MS = [
  'Muharam', 'Safar', 'Rabiulawal', 'Rabiulakhir', 'Jamadilawal', 'Jamadilakhir',
  'Rejab', 'Syaaban', 'Ramadan', 'Syawal', 'Zulkaedah', 'Zulhijjah',
];
export const HIJRI_MONTHS_EN = [
  'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani', 'Jumada al-Ula', 'Jumada al-Akhirah',
  'Rajab', 'Shaban', 'Ramadan', 'Shawwal', 'Dhu al-Qadah', 'Dhu al-Hijjah',
];

const umalqura = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
  timeZone: 'UTC',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
});

export interface HijriDate {
  year: number;
  month: number; // 1-12
  day: number;
}

export function hijriDate(iso: string): HijriDate {
  const parts = Object.fromEntries(umalqura.formatToParts(toDate(iso)).map((p) => [p.type, p.value]));
  return { year: Number(parts.year), month: Number(parts.month), day: Number(parts.day) };
}

export function hijriMonthsStarting(year: number) {
  return days(year)
    .map((date) => ({ date, h: hijriDate(date) }))
    .filter(({ h }) => h.day === 1)
    .map(({ date, h }) => {
      let end = date;
      while (hijriDate(addDays(end, 1)).day !== 1) end = addDays(end, 1);
      return { date, h, length: Number(hijriDate(end).day) };
    });
}

// The Islamic dates the Kalendar Hijrah app lists, with the name Malaysia's holiday data uses
// when the day is a public holiday.
const OBSERVANCES = [
  { month: 7, day: 27, ms: 'Israk dan Mikraj', en: 'Isra and Miraj', holiday: 'Israk and Mikraj' },
  { month: 9, day: 1, ms: 'Awal Ramadan', en: 'Start of Ramadan', holiday: 'Awal Ramadan' },
  { month: 9, day: 17, ms: 'Nuzul Al-Quran', en: 'Nuzul al-Quran', holiday: 'Nuzul Al-Quran' },
  { month: 10, day: 1, ms: 'Hari Raya Aidilfitri', en: 'Eid al-Fitr', holiday: 'Hari Raya Aidilfitri' },
  { month: 12, day: 1, ms: 'Awal Zulhijjah', en: 'Start of Dhu al-Hijjah' },
  { month: 12, day: 9, ms: 'Hari Arafah', en: 'Day of Arafah', holiday: 'Arafat Day' },
  { month: 12, day: 10, ms: 'Hari Raya Haji (Aidiladha)', en: 'Eid al-Adha', holiday: 'Hari Raya Haji' },
  { month: 1, day: 1, ms: 'Awal Muharam (Maal Hijrah)', en: 'Islamic New Year', holiday: 'Awal Muharram' },
  { month: 1, day: 10, ms: 'Hari Asyura', en: 'Day of Ashura' },
  { month: 3, day: 12, ms: 'Maulidur Rasul', en: "Prophet Muhammad's Birthday", holiday: "Prophet Muhammad's Birthday" },
];

export interface IslamicDate {
  date: string;
  hijri: HijriDate;
  ms: string;
  en: string;
  gazetted: boolean; // on Malaysia's gazetted public holiday date, not the Umm al-Qura one
}

export function islamicDates(year: number): IslamicDate[] {
  const my = findCountry('my')!;
  // Years outside the holiday data come back undefined.
  const gazetted = [year - 1, year, year + 1].flatMap((y) => yearData(my, y)?.publicHolidays ?? []);

  const out: IslamicDate[] = [];
  for (const date of days(year)) {
    const h = hijriDate(date);
    for (const o of OBSERVANCES.filter((o) => o.month === h.month && o.day === h.day)) {
      // A gazetted date within two days of the computed one is the same occasion.
      const official = o.holiday
        ? gazetted.find(
            (g) =>
              g.name === o.holiday &&
              Math.abs(toDate(g.date).getTime() - toDate(date).getTime()) <= 2 * 86_400_000,
          )
        : undefined;
      // The occasion keeps its own Hijri date: in Malaysia the gazetted day *is* 1 Syawal.
      out.push({ date: official?.date ?? date, hijri: h, ms: o.ms, en: o.en, gazetted: Boolean(official && official.date !== date) });
    }
  }
  return out.filter((o) => o.date.startsWith(String(year))).sort((a, b) => a.date.localeCompare(b.date));
}
