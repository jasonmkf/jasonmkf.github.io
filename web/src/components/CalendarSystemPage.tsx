import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import StoreBadges from '@/components/StoreBadges';
import { Terms } from '@/components/HolidayParts';
import { findApp } from '@/data/apps';
import {
  HIJRI_MONTHS_EN,
  HIJRI_MONTHS_MS,
  hijriDate,
  hijriMonthsStarting,
  islamicDates,
  lunarDate,
  lunarFestivals,
  lunarMonthEn,
  lunarMonthsStarting,
  lunarYear,
  solarTerms,
} from '@/data/calendars';
import {
  addDays,
  countries,
  holidayPath,
  longDate,
  shortDate,
  toDate,
  YEARS_BY_RELEVANCE,
  type Term,
} from '@/data/holidays';
import { pageMetadata } from '@/lib/seo';

export type System = 'lunar' | 'hijri';

// The app page each calendar's year pages sit under.
export const SYSTEM_APPS: Record<string, System> = {
  'lunar-calendar': 'lunar',
  'kalendar-hijrah': 'hijri',
};

export const systemPath = (system: System, year: number) =>
  `/${system === 'lunar' ? 'lunar-calendar' : 'kalendar-hijrah'}/${year}/`;

export const systemLabel = (system: System, year: number) =>
  system === 'lunar' ? `Chinese Lunar Calendar ${year}` : `Kalendar Hijrah ${year}`;

const hijriYears = (year: number) => {
  const first = hijriDate(`${year}-01-01`).year;
  const last = hijriDate(`${year}-12-31`).year;
  return first === last ? `${first}H` : `${first}–${last}H`;
};

function info(system: System, year: number) {
  if (system === 'lunar') {
    const ly = lunarYear(year);
    return {
      title: `Chinese Lunar Calendar ${year} (农历${year}): Festivals & Solar Terms`,
      description:
        `Chinese lunar calendar ${year} with the lunar date of every day, Chinese New Year on ` +
        `${longDate(ly.newYear)}, the lunar months, festivals and 24 solar terms.`,
      terms: [
        { lang: 'zh-Hans', text: `${year}年农历` },
        { lang: 'zh-Hans', text: `${year}年阴历` },
        { lang: 'zh-Hans', text: `${ly.ganZhi}${ly.zodiac}年` },
        { lang: 'en', text: `Year of the ${ly.zodiacEn}` },
      ] as Term[],
      keywords: [
        `Chinese lunar calendar ${year}`,
        `lunar calendar ${year}`,
        `Chinese calendar ${year}`,
        `Chinese New Year ${year}`,
        `Year of the ${ly.zodiacEn} ${year}`,
        `${year} solar terms`,
        `农历${year}`,
        `${year}年农历`,
        `${year}年阴历`,
        `${year}年日历`,
        `${year} 万年历`,
        `${year} 二十四节气`,
      ],
    };
  }
  const hy = hijriYears(year);
  return {
    title: `Kalendar Hijrah ${year} (${hy}): Takwim & Tarikh Penting Islam`,
    description:
      `Kalendar Hijrah ${year}: tarikh Hijrah setiap hari, awal bulan Islam ${hy}, Awal ` +
      `Ramadan, Aidilfitri, Aidiladha. Hijri calendar ${year} for Malaysia.`,
    terms: [
      { lang: 'ms', text: `Takwim Hijrah ${year}` },
      { lang: 'ms', text: `Kalendar Islam ${year}` },
      { lang: 'en', text: `Hijri Calendar ${year}` },
      { lang: 'ms', text: hy },
    ] as Term[],
    keywords: [
      `Kalendar Hijrah ${year}`,
      `Takwim Hijrah ${year}`,
      `Kalendar Islam ${year}`,
      `Tarikh Hijrah ${year}`,
      `Hijri calendar ${year}`,
      `Islamic calendar ${year}`,
      `Awal Ramadan ${year}`,
      `Hari Raya Aidilfitri ${year}`,
      `Hari Raya Haji ${year}`,
      `Awal Muharam ${year}`,
      hy,
    ],
  };
}

export function systemMetadata(system: System, year: number): Metadata {
  const app = findApp(system === 'lunar' ? 'lunar-calendar' : 'kalendar-hijrah')!;
  const { title, description, keywords } = info(system, year);
  return {
    ...pageMetadata({
      title,
      description,
      path: systemPath(system, year),
      image: `/og/${app.id}.jpg`,
      absoluteTitle: true,
    }),
    keywords,
    icons: { icon: app.icon },
  };
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface Cell {
  label: string;
  accent?: 'month' | 'event' | 'term';
  title?: string;
}

// A month grid with a second calendar's date under each Gregorian one.
function DualMonth({
  year,
  month,
  cell,
  events,
  lang,
}: {
  year: number;
  month: number;
  cell: (iso: string) => Cell;
  events: { date: string; name: string }[];
  lang: string;
}) {
  const first = `${year}-${String(month).padStart(2, '0')}-01`;
  const name = toDate(first).toLocaleDateString('en-GB', { timeZone: 'UTC', month: 'long' });
  const cells: (string | null)[] = Array(toDate(first).getUTCDay()).fill(null);
  for (let d = first; d.slice(5, 7) === first.slice(5, 7); d = addDays(d, 1)) cells.push(d);
  while (cells.length % 7) cells.push(null);
  const weeks = Array.from({ length: cells.length / 7 }, (_, i) => cells.slice(i * 7, i * 7 + 7));
  const monthEvents = events.filter((e) => e.date.slice(0, 7) === first.slice(0, 7));

  return (
    <section className="rounded-2xl bg-white ring-1 ring-gray-200 p-4" aria-labelledby={`m${month}`}>
      <h2 id={`m${month}`} className="text-lg font-bold text-gray-900">
        {name} {year}
      </h2>
      <table className="mt-3 w-full table-fixed text-center">
        <thead>
          <tr className="text-xs text-gray-500">
            {WEEKDAYS.map((w) => (
              <th key={w} scope="col" className="pb-1 font-medium">
                {w}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, i) => (
            <tr key={i}>
              {week.map((date, j) => {
                if (!date) return <td key={j} />;
                const c = cell(date);
                const sunday = toDate(date).getUTCDay() === 0;
                return (
                  <td key={j} className="p-0.5">
                    <span
                      title={c.title}
                      className={`flex h-11 flex-col items-center justify-center rounded-lg leading-tight ${
                        c.accent === 'event' ? 'bg-amber-100' : c.accent === 'month' ? 'bg-purple-50' : ''
                      }`}
                    >
                      <span className={`text-sm ${sunday ? 'text-red-600' : 'text-gray-900'}`}>
                        {Number(date.slice(8))}
                      </span>
                      <span
                        lang={lang}
                        className={`text-[10px] ${
                          c.accent === 'month'
                            ? 'font-semibold text-purple-700'
                            : c.accent === 'term'
                              ? 'text-emerald-700'
                              : c.accent === 'event'
                                ? 'font-semibold text-amber-800'
                                : 'text-gray-400'
                        }`}
                      >
                        {c.label}
                      </span>
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {monthEvents.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm">
          {monthEvents.map((e, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-amber-400" />
              <span className="w-6 flex-shrink-0 text-gray-500">{Number(e.date.slice(8))}</span>
              <span className="text-gray-800">{e.name}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function Table({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-2xl ring-1 ring-gray-200 bg-white">
      <table className="w-full text-left">
        <thead className="bg-purple-50 text-sm text-purple-900">
          <tr>
            {head.map((h) => (
              <th key={h} scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} className="px-4 py-3 align-top text-gray-800">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

const zh = (text: string) => <span lang="zh-Hans">{text}</span>;

function LunarView({ year }: { year: number }) {
  const ly = lunarYear(year);
  const nextNewYear = lunarYear(year + 1).newYear;
  const months = lunarMonthsStarting(year);
  const festivals = lunarFestivals(year);
  const terms = solarTerms(year);
  const termOn = new Map(terms.map((t) => [t.date, t]));
  const festivalOn = new Map(festivals.map((f) => [f.date, f]));
  const leap = months.find((m) => m.l.leap);

  const cell = (iso: string): Cell => {
    const l = lunarDate(iso);
    const f = festivalOn.get(iso);
    const t = termOn.get(iso);
    if (f && f.lunar !== 'Solar term') return { label: f.zh, accent: 'event', title: `${f.en} · ${l.monthName}${l.dayName}` };
    if (l.day === 1) return { label: l.monthName, accent: 'month', title: `${lunarMonthEn(l)} begins` };
    if (t) return { label: t.zh, accent: 'term', title: t.en };
    return { label: l.dayName, title: `${l.monthName}${l.dayName}` };
  };

  return (
    <>
      <p className="text-lg text-gray-700 leading-relaxed">
        {year} is the Year of the {ly.zodiacEn} ({zh(`${ly.ganZhi}${ly.zodiac}年`)}). The lunar year
        begins with Chinese New Year on {longDate(ly.newYear)} and runs until{' '}
        {longDate(addDays(nextNewYear, -1))}.
        {leap && (
          <>
            {' '}
            It has a leap month, {zh(leap.l.monthName)}, starting on {longDate(leap.date)}.
          </>
        )}{' '}
        Each day below shows its lunar date; the first day of each lunar month shows the month.
      </p>

      <Section title={`Chinese festivals ${year}`}>
        <Table
          head={['Date', 'Festival', 'Lunar date']}
          rows={festivals.map((f) => [
            <time key="d" dateTime={f.date} className="whitespace-nowrap">{shortDate(f.date)}</time>,
            <span key="n">
              <span className="font-medium text-gray-900">{f.en}</span>{' '}
              <span lang="zh-Hans" className="text-gray-500">{f.zh}</span>
            </span>,
            <span key="l" lang="zh-Hans" className="text-gray-600">{f.lunar}</span>,
          ])}
        />
      </Section>

      <Section title={`Lunar months starting in ${year}`}>
        <Table
          head={['Lunar month', 'First day (初一)', 'Days']}
          rows={months.map(({ date, l }) => [
            <span key="m">
              <span lang="zh-Hans" className="font-medium text-gray-900">{l.monthName}</span>{' '}
              <span className="text-gray-500">· {lunarMonthEn(l)}</span>
            </span>,
            <time key="d" dateTime={date} className="whitespace-nowrap">{shortDate(date)}</time>,
            l.monthDays,
          ])}
        />
      </Section>

      <Section title={`24 solar terms ${year} (二十四节气)`}>
        <Table
          head={['Date', 'Solar term']}
          rows={terms.map((t) => [
            <time key="d" dateTime={t.date} className="whitespace-nowrap">{shortDate(t.date)}</time>,
            <span key="n">
              <span lang="zh-Hans" className="font-medium text-gray-900">{t.zh}</span>{' '}
              <span className="text-gray-500">· {t.en}</span>
            </span>,
          ])}
        />
      </Section>

      <Section title={`Chinese lunar calendar ${year}, month by month`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 12 }, (_, i) => (
            <DualMonth
              key={i}
              year={year}
              month={i + 1}
              cell={cell}
              lang="zh-Hans"
              events={festivals.map((f) => ({ date: f.date, name: `${f.en} ${f.zh}` }))}
            />
          ))}
        </div>
      </Section>
    </>
  );
}

function HijriView({ year }: { year: number }) {
  const months = hijriMonthsStarting(year);
  const dates = islamicDates(year);
  const dateOn = new Map(dates.map((d) => [d.date, d]));
  const newYear = months.find((m) => m.h.month === 1);

  const cell = (iso: string): Cell => {
    const h = hijriDate(iso);
    const e = dateOn.get(iso);
    const label = h.day === 1 ? `1 ${HIJRI_MONTHS_MS[h.month - 1].slice(0, 5)}` : String(h.day);
    const title = `${h.day} ${HIJRI_MONTHS_MS[h.month - 1]} ${h.year}H`;
    if (e) return { label, accent: 'event', title: `${e.ms} · ${title}` };
    if (h.day === 1) return { label, accent: 'month', title };
    return { label, title };
  };

  return (
    <>
      <p className="text-lg text-gray-700 leading-relaxed">
        The year {year} covers {hijriYears(year)}
        {newYear && (
          <>
            ; 1 Muharam {newYear.h.year}H, Awal Muharam (Maal Hijrah), falls on{' '}
            {longDate(newYear.date)}
          </>
        )}
        . Each day below shows its Hijri date, and the first day of each Islamic month shows the
        month.
      </p>
      <p className="mt-3 text-gray-600">
        Hijri dates follow the Umm al-Qura calendar, as the Kalendar Hijrah app does. Malaysia
        fixes Ramadan, Syawal and Zulhijjah by sighting the moon, so where an Islamic day is a
        gazetted public holiday its gazetted date is used, and other dates can differ by a day
        from JAKIM&apos;s takwim.
      </p>

      <Section title={`Tarikh penting Islam ${year} (Islamic dates)`}>
        <Table
          head={['Tarikh', 'Hari', 'Tarikh Hijrah']}
          rows={dates.map((d) => [
            <time key="d" dateTime={d.date} className="whitespace-nowrap">{shortDate(d.date)}</time>,
            <span key="n">
              <span lang="ms" className="font-medium text-gray-900">{d.ms}</span>{' '}
              <span className="text-gray-500">· {d.en}</span>
            </span>,
            <span key="h" className="text-gray-600">
              <span className="whitespace-nowrap">
                {d.hijri.day} {HIJRI_MONTHS_MS[d.hijri.month - 1]} {d.hijri.year}H
              </span>
              {d.gazetted && <span className="block text-xs text-gray-500">Tarikh cuti umum diwartakan</span>}
            </span>,
          ])}
        />
      </Section>

      <Section title={`Awal bulan Hijrah ${year} (Islamic months)`}>
        <Table
          head={['Bulan', '1 haribulan', 'Hari']}
          rows={months.map(({ date, h, length }) => [
            <span key="m">
              <span lang="ms" className="font-medium text-gray-900">
                {HIJRI_MONTHS_MS[h.month - 1]} {h.year}H
              </span>{' '}
              <span className="text-gray-500">· {HIJRI_MONTHS_EN[h.month - 1]}</span>
            </span>,
            <time key="d" dateTime={date} className="whitespace-nowrap">{shortDate(date)}</time>,
            length,
          ])}
        />
      </Section>

      <Section title={`Kalendar Hijrah ${year}, bulan demi bulan`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 12 }, (_, i) => (
            <DualMonth
              key={i}
              year={year}
              month={i + 1}
              cell={cell}
              lang="ms"
              events={dates.map((d) => ({ date: d.date, name: d.ms }))}
            />
          ))}
        </div>
      </Section>
    </>
  );
}

function YearNav({ system, year }: { system: System; year: number }) {
  const links = [
    ...YEARS_BY_RELEVANCE.map((y) => ({ path: systemPath(system, y), label: systemLabel(system, y) })),
    ...(system === 'lunar'
      ? [{ path: systemPath('hijri', year), label: systemLabel('hijri', year) }]
      : [{ path: systemPath('lunar', year), label: systemLabel('lunar', year) }]),
  ];
  const current = systemPath(system, year);
  return (
    <ul className="flex flex-wrap gap-2">
      {links.map((l) => (
        <li key={l.path}>
          <Link
            href={l.path}
            aria-current={l.path === current ? 'page' : undefined}
            className={`inline-flex rounded-full px-4 py-1.5 text-sm font-medium ring-1 transition-colors ${
              l.path === current
                ? 'bg-purple-700 text-white ring-purple-700'
                : 'bg-white text-purple-800 ring-purple-200 hover:bg-purple-50'
            }`}
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Promo({ system }: { system: System }) {
  const app = findApp(system === 'lunar' ? 'lunar-calendar' : 'kalendar-hijrah')!;
  return (
    <div className="rounded-2xl bg-gradient-to-br from-purple-900 to-indigo-900 p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center gap-6">
      <Image src={app.icon} alt={`${app.name} icon`} width={80} height={80} className="rounded-2xl ring-4 ring-white/10 flex-shrink-0" />
      <div className="text-center sm:text-left">
        <h2 className="text-xl font-bold">
          {system === 'lunar' ? 'The lunar date on every day, on your phone' : 'Tarikh Hijrah setiap hari, di telefon anda'}
        </h2>
        <p className="mt-2 text-purple-200">
          {system === 'lunar' ? (
            <>
              <Link href={`/${app.id}/`} className="underline decoration-purple-400 hover:text-white">
                {app.name}
              </Link>{' '}
              shows the lunar date, festivals and a Chinese almanac with your country&apos;s
              holidays. On Android, our country calendars show it too.
            </>
          ) : (
            <>
              <Link href={`/${app.id}/`} className="underline decoration-purple-400 hover:text-white">
                {app.name}
              </Link>{' '}
              shows the Hijri date on every day, the Takwim for your state and Malaysian public and
              school holidays. On iPhone, get Lunar Calendar &amp; Holidays and choose Malaysia.
            </>
          )}
        </p>
        <StoreBadges
          name={app.name}
          url={app.url}
          appStoreUrl={app.appStoreUrl}
          className="mt-4 flex flex-wrap justify-center sm:justify-start items-center gap-2"
        />
      </div>
    </div>
  );
}

export function SystemPage({ system, year }: { system: System; year: number }) {
  const app = findApp(system === 'lunar' ? 'lunar-calendar' : 'kalendar-hijrah')!;
  const h1 = systemLabel(system, year);
  const { terms } = info(system, year);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-900 py-14 sm:py-16">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { name: 'Holidays', path: '/holidays/' },
                { name: app.name, path: `/${app.id}/` },
                { name: h1, path: systemPath(system, year) },
              ]}
            />
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl text-center sm:text-left">
              {h1}
            </h1>
            <div className="text-center sm:text-left">
              <Terms terms={terms} />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <YearNav system={system} year={year} />
          <div className="mt-10">
            {system === 'lunar' ? <LunarView year={year} /> : <HijriView year={year} />}
          </div>
          <div className="mt-14">
            <Promo system={system} />
          </div>
          <Section title={`${year} public holidays by country`}>
            <ul className="flex flex-wrap gap-2">
              {(system === 'hijri' ? countries.filter((c) => c.code === 'my' || c.code === 'id' || c.code === 'sg') : countries).map((c) => (
                <li key={c.code}>
                  <Link
                    href={holidayPath(c, 'public', year)}
                    className="inline-flex rounded-full bg-white px-4 py-1.5 text-sm font-medium text-gray-700 ring-1 ring-gray-200 hover:ring-purple-300 hover:text-purple-800"
                  >
                    {c.name} Public Holidays {year}
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
