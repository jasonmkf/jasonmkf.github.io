import Image from 'next/image';
import Link from 'next/link';
import StoreBadges from '@/components/StoreBadges';
import { findApp } from '@/data/apps';
import {
  addDays,
  countries,
  dayMonth,
  daysBetween,
  hasSchoolIn,
  holidayPath,
  isNational,
  shortDate,
  toDate,
  viewsFor,
  YEARS_BY_RELEVANCE,
  type Country,
  type HolidayView,
  type LongWeekend,
  type Observance,
  type PublicHoliday,
  type SchoolPeriod,
  type Term,
} from '@/data/holidays';

export type View = HolidayView;

export const viewLabel = (c: Country, view: View, year: number) =>
  view === 'calendar'
    ? `${c.name} Calendar ${year}`
    : view === 'public'
      ? `${c.name} Public Holidays ${year}`
      : `${c.name} School Holidays ${year}`;

export function Terms({ terms }: { terms: Term[] }) {
  if (terms.length === 0) return null;
  return (
    <p className="mt-3 text-base text-purple-200">
      {terms.map((t, i) => (
        <span key={t.text}>
          {i > 0 && <span aria-hidden="true"> · </span>}
          <span lang={t.lang}>{t.text}</span>
        </span>
      ))}
    </p>
  );
}

// Every holiday page of one country, by year: the links that tie them together.
export function HolidayNav({ country, current }: { country: Country; current?: string }) {
  return (
    <div className="space-y-3">
      {YEARS_BY_RELEVANCE.map((year) => (
        <ul key={year} className="flex flex-wrap gap-2">
          {viewsFor(country, year).map((view) => {
            const path = holidayPath(country, view, year);
            const active = path === current;
            return (
              <li key={view}>
                <Link
                  href={path}
                  aria-current={active ? 'page' : undefined}
                  className={`inline-flex rounded-full px-4 py-1.5 text-sm font-medium ring-1 transition-colors ${
                    active
                      ? 'bg-purple-700 text-white ring-purple-700'
                      : 'bg-white text-purple-800 ring-purple-200 hover:bg-purple-50'
                  }`}
                >
                  {viewLabel(country, view, year)}
                </Link>
              </li>
            );
          })}
        </ul>
      ))}
    </div>
  );
}

function Where({ h, country }: { h: PublicHoliday; country: Country }) {
  if (h.government) return <>Government offices only</>;
  if (!h.states) return <>Nationwide</>;
  return (
    <>
      {h.states.join(', ')}
      <span className="sr-only"> ({h.states.length === 1 ? country.regionNoun : country.regionNounPlural})</span>
    </>
  );
}

function HolidayName({ h, country }: { h: PublicHoliday; country: Country }) {
  const showCn = (country.code === 'my' || country.code === 'sg') && h.cn;
  return (
    <>
      <span className="font-medium text-gray-900">{h.name}</span>
      {h.local && (
        <span className="block text-sm text-gray-500" lang={localLang(country)}>
          {h.local}
        </span>
      )}
      {showCn && (
        <span className="block text-sm text-gray-500" lang="zh-Hans">
          {h.cn}
        </span>
      )}
    </>
  );
}

export const localLang = (c: Country) =>
  ({ my: 'ms', sg: 'en', id: 'id', th: 'th', vn: 'vi', hk: 'zh-Hant-HK', tw: 'zh-Hant-TW', kr: 'ko', au: 'en' })[
    c.code
  ] ?? 'en';

export function PublicHolidayTable({ holidays, country }: { holidays: PublicHoliday[]; country: Country }) {
  return (
    <div className="overflow-x-auto rounded-2xl ring-1 ring-gray-200 bg-white">
      <table className="w-full text-left">
        <thead className="bg-purple-50 text-sm text-purple-900">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">Date</th>
            <th scope="col" className="px-4 py-3 font-semibold">Holiday</th>
            <th scope="col" className="px-4 py-3 font-semibold">Where</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {holidays.map((h, i) => (
            <tr key={`${h.date}-${i}`} className={isNational(h) ? '' : 'bg-amber-50/40'}>
              <td className="px-4 py-3 align-top whitespace-nowrap text-gray-900">
                <time dateTime={h.date}>{shortDate(h.date)}</time>
              </td>
              <td className="px-4 py-3 align-top">
                <HolidayName h={h} country={country} />
              </td>
              <td className="px-4 py-3 align-top text-sm text-gray-600">
                <Where h={h} country={country} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function LongWeekendList({ weekends }: { weekends: LongWeekend[] }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {weekends.map((w) => (
        <li key={w.start} className="rounded-2xl bg-white ring-1 ring-gray-200 p-4">
          <p className="font-semibold text-gray-900">
            <time dateTime={w.start}>{shortDate(w.start)}</time> –{' '}
            <time dateTime={w.end}>{shortDate(w.end)}</time>
          </p>
          <p className="mt-1 text-sm text-purple-700 font-medium">{w.days} days off</p>
          <p className="mt-1 text-sm text-gray-600">{w.holidays.join(', ')}</p>
        </li>
      ))}
    </ul>
  );
}

// For each state, the holidays only some states have: what "Selangor public holidays" asks.
export function HolidaysByRegion({
  holidays,
  regions,
  year,
}: {
  holidays: PublicHoliday[];
  regions: string[];
  year: number;
}) {
  const national = holidays.filter(isNational).length;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {regions.map((region) => {
        const own = holidays.filter((h) => h.states?.includes(region));
        return (
          <div key={region} className="rounded-2xl bg-white ring-1 ring-gray-200 p-5">
            <h3 className="font-bold text-gray-900">
              {region} public holidays {year}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {national + own.length} public holidays: {national} nationwide and {own.length} for{' '}
              {region}
            </p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {own.map((h, i) => (
                <li key={`${h.date}-${i}`} className="flex gap-3">
                  <time dateTime={h.date} className="w-14 flex-shrink-0 text-gray-500">
                    {dayMonth(h.date)}
                  </time>
                  <span className="text-gray-800">{h.name}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export function SchoolTable({ periods, country }: { periods: SchoolPeriod[]; country: Country }) {
  return (
    <div className="overflow-x-auto rounded-2xl ring-1 ring-gray-200 bg-white">
      <table className="w-full text-left">
        <thead className="bg-purple-50 text-sm text-purple-900">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold">{country.code === 'au' ? 'Term or holiday' : 'School holiday'}</th>
            <th scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">From</th>
            <th scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">To</th>
            <th scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">Days</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {periods.map((p) => (
            <tr key={`${p.key}-${p.start}`} className={p.kind === 'break' ? 'bg-emerald-50/50' : ''}>
              <td className={`px-4 py-3 ${p.kind === 'break' ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                {country.breakName(p)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-800">
                <time dateTime={p.start}>{shortDate(p.start)}{p.start.slice(0, 4) !== p.end.slice(0, 4) && ` ${p.start.slice(0, 4)}`}</time>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-800">
                <time dateTime={p.end}>{shortDate(p.end)}{p.start.slice(0, 4) !== p.end.slice(0, 4) && ` ${p.end.slice(0, 4)}`}</time>
              </td>
              <td className="px-4 py-3 text-gray-600">{daysBetween(p.start, p.end)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const WEEKDAYS_SUN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// One month as a grid, with holidays and school breaks marked, and what falls in it listed below.
export function MonthGrid({
  year,
  month,
  country,
  holidays,
  observances,
  schoolDays,
}: {
  year: number;
  month: number; // 1-12
  country: Country;
  holidays: PublicHoliday[];
  observances: Observance[];
  schoolDays: Set<string>;
}) {
  const first = `${year}-${String(month).padStart(2, '0')}-01`;
  const name = toDate(first).toLocaleDateString('en-GB', { timeZone: 'UTC', month: 'long' });
  const offset = (toDate(first).getUTCDay() + (country.weekStartsMonday ? 6 : 0)) % 7;
  const weekdays = country.weekStartsMonday ? [...WEEKDAYS_SUN.slice(1), 'Sun'] : WEEKDAYS_SUN;

  const cells: (string | null)[] = Array(offset).fill(null);
  for (let d = first; d.slice(5, 7) === first.slice(5, 7); d = addDays(d, 1)) cells.push(d);
  while (cells.length % 7) cells.push(null);
  const weeks = Array.from({ length: cells.length / 7 }, (_, i) => cells.slice(i * 7, i * 7 + 7));

  const inMonth = (date: string) => date.slice(0, 7) === first.slice(0, 7);
  const monthHolidays = holidays.filter((h) => inMonth(h.date));
  const monthObservances = observances.filter((o) => inMonth(o.date));

  return (
    <section className="rounded-2xl bg-white ring-1 ring-gray-200 p-4" aria-labelledby={`m${month}`}>
      <h2 id={`m${month}`} className="text-lg font-bold text-gray-900">
        {name} {year}
      </h2>
      <table className="mt-3 w-full table-fixed text-center text-sm">
        <thead>
          <tr className="text-xs text-gray-500">
            {weekdays.map((w) => (
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
                const hs = holidays.filter((h) => h.date === date);
                const national = hs.some(isNational);
                const regional = !national && hs.length > 0;
                const school = schoolDays.has(date);
                const weekend = [0, 6].includes(toDate(date).getUTCDay());
                const label = [
                  ...hs.map((h) => h.name + (h.states ? ` (${h.states.join(', ')})` : '')),
                  school ? 'School holiday' : '',
                ].filter(Boolean).join('; ');
                return (
                  <td key={j} className="p-0.5">
                    <span
                      title={label || undefined}
                      className={`flex h-8 items-center justify-center rounded-lg ${
                        national
                          ? 'bg-red-600 font-bold text-white'
                          : regional
                            ? 'bg-amber-200 font-semibold text-amber-950'
                            : school
                              ? 'bg-emerald-100 text-emerald-900'
                              : weekend
                                ? 'text-gray-400'
                                : 'text-gray-800'
                      }`}
                    >
                      {Number(date.slice(8))}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {(monthHolidays.length > 0 || monthObservances.length > 0) && (
        <ul className="mt-3 space-y-1 text-sm">
          {monthHolidays.map((h, i) => (
            <li key={`h${i}`} className="flex gap-2">
              <span className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${isNational(h) ? 'bg-red-600' : 'bg-amber-400'}`} />
              <span className="w-6 flex-shrink-0 text-gray-500">{Number(h.date.slice(8))}</span>
              <span className="text-gray-900">
                {h.name}
                {h.states && <span className="text-gray-500"> · {h.states.length > 3 ? `${h.states.length} ${country.regionNounPlural}` : h.states.join(', ')}</span>}
              </span>
            </li>
          ))}
          {monthObservances.map((o, i) => (
            <li key={`o${i}`} className="flex gap-2">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-gray-300" />
              <span className="w-6 flex-shrink-0 text-gray-400">{Number(o.date.slice(8))}</span>
              <span className="text-gray-500">{o.name}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function Legend({ school }: { school: boolean }) {
  const items = [
    ['bg-red-600', 'Public holiday, nationwide'],
    ['bg-amber-200', 'Public holiday in some states or provinces'],
    ...(school ? [['bg-emerald-100', 'School holiday']] : []),
    ['bg-gray-300', 'Festival or observance, not a day off'],
  ];
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-600">
      {items.map(([color, label]) => (
        <li key={label} className="flex items-center gap-2">
          <span className={`h-3.5 w-3.5 rounded ${color}`} />
          {label}
        </li>
      ))}
    </ul>
  );
}

export function AppPromo({ country }: { country: Country }) {
  const app = findApp(country.appId)!;
  return (
    <div className="rounded-2xl bg-gradient-to-br from-purple-900 to-indigo-900 p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center gap-6">
      <Image src={app.icon} alt={`${app.name} icon`} width={80} height={80} className="rounded-2xl ring-4 ring-white/10 flex-shrink-0" />
      <div className="text-center sm:text-left">
        <h2 className="text-xl font-bold">Every {country.name} holiday on your phone</h2>
        <p className="mt-2 text-purple-200">
          <Link href={`/${app.id}/`} className="underline decoration-purple-400 hover:text-white">
            {app.name}
          </Link>{' '}
          shows public holidays, school holidays and long weekends, with the lunar calendar and a
          home screen widget. It works offline and needs no sign-up. On iPhone, get Lunar
          Calendar &amp; Holidays and choose {country.name}.
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

// The same page for the other countries, so each page links to all of its siblings.
export function OtherCountries({ country, view, year }: { country: Country; view: View; year: number }) {
  const others = countries.filter((c) => c.code !== country.code);
  return (
    <ul className="flex flex-wrap gap-2">
      {others.map((c) => {
        const v = view === 'school' && !hasSchoolIn(c, year) ? 'public' : view;
        return (
          <li key={c.code}>
            <Link
              href={holidayPath(c, v, year)}
              className="inline-flex rounded-full bg-white px-4 py-1.5 text-sm font-medium text-gray-700 ring-1 ring-gray-200 hover:ring-purple-300 hover:text-purple-800"
            >
              {viewLabel(c, v, year)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
