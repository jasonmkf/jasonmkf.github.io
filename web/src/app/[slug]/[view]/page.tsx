import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import {
  AppPromo,
  HolidayNav,
  HolidaysByRegion,
  Legend,
  LongWeekendList,
  MonthGrid,
  OtherCountries,
  PublicHolidayTable,
  SchoolTable,
  Terms,
  type View,
} from '@/components/HolidayParts';
import { findApp } from '@/data/apps';
import {
  addDays,
  carriedOverBreak,
  countries,
  countryForApp,
  HOLIDAY_YEARS,
  holidayPath,
  isNational,
  longDate,
  longWeekends,
  regionsOf,
  schoolBreaks,
  yearData,
  type Country,
  type SchoolPeriod,
} from '@/data/holidays';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string; view: string }> };

export const dynamicParams = false;

const VIEW_PATTERN = /^(?:(public|school)-holidays-)?(\d{4})$/;

export function generateStaticParams() {
  return countries.flatMap((c) =>
    HOLIDAY_YEARS.flatMap((year) => {
      const views = [`${year}`, `public-holidays-${year}`];
      if (c.hasSchool) views.push(`school-holidays-${year}`);
      return views.map((view) => ({ slug: c.appId, view }));
    }),
  );
}

function resolve(slug: string, segment: string) {
  const country = countryForApp(slug);
  const match = VIEW_PATTERN.exec(segment);
  if (!country || !match) return null;
  const year = Number(match[2]);
  const view = (match[1] ?? 'calendar') as View;
  if (!HOLIDAY_YEARS.includes(year) || (view === 'school' && !country.hasSchool)) return null;
  return { country, year, view };
}

// Regional school data (Australia, Indonesia) names the state on every period.
const regional = (c: Country, year: number) => yearData(c, year).school.some((p) => p.regions);

function describe(c: Country, view: View, year: number) {
  const data = yearData(c, year);
  if (view === 'public') {
    const n = data.publicHolidays.length;
    const where = regionsOf(c, year).length > 0 ? ` and which ${c.regionNounPlural} observe them` : '';
    return (
      `All ${n} ${c.name} public holidays in ${year} with dates${where}, and the long ` +
      `weekends. Free calendar app for Android and iPhone.`
    );
  }
  if (view === 'school') {
    const by = regional(c, year) ? ` for every ${c.regionNoun}` : '';
    return (
      `${c.name} school holidays ${year}: every school break${by}, with start and end dates. ` +
      `Free calendar app for Android and iPhone.`
    );
  }
  const school = c.hasSchool ? ' and school holidays' : '';
  return (
    `${c.name} calendar ${year} with every public holiday${school} marked month by month, ` +
    `and the festivals. Free calendar app for Android and iPhone.`
  );
}

function title(c: Country, view: View, year: number) {
  if (view === 'public') return c.publicTitle(year);
  if (view === 'school') return c.schoolTitle(year);
  return `${c.name} Calendar ${year} with Public${c.hasSchool ? ' & School' : ''} Holidays`;
}

function terms(c: Country, view: View, year: number) {
  if (view === 'public') return c.publicTerms(year);
  if (view === 'school') return c.schoolTerms(year);
  return c.calendarTerms(year);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, view: segment } = await params;
  const { country: c, view, year } = resolve(slug, segment)!;
  const app = findApp(c.appId)!;
  const base = view === 'calendar' ? `${c.name} calendar ${year}` : `${c.name} ${view} holidays ${year}`;
  return {
    ...pageMetadata({
      title: title(c, view, year),
      description: describe(c, view, year),
      path: holidayPath(c, view, year),
      image: `/og/${app.id}.jpg`,
      absoluteTitle: true,
    }),
    keywords: [...new Set([
      base,
      `${c.name} public holidays ${year}`,
      ...(c.hasSchool ? [`${c.name} school holidays ${year}`] : []),
      `${c.name} long weekends ${year}`,
      `${c.name} calendar ${year}`,
      ...terms(c, view, year).map((t) => t.text),
    ])],
    icons: { icon: app.icon },
  };
}

function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-12">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function PublicView({ c, year }: { c: Country; year: number }) {
  const { publicHolidays } = yearData(c, year);
  const national = publicHolidays.filter(isNational).length;
  const regions = regionsOf(c, year);
  const weekends = longWeekends(c, year);
  return (
    <>
      <p className="text-lg text-gray-700 leading-relaxed">
        {c.name} has {national} nationwide public holidays in {year}
        {regions.length > 0 &&
          `, and ${publicHolidays.length - national} more observed only in some ${c.regionNounPlural}`}
        . Replacement days for holidays that fall on a weekend are listed as their own rows.
      </p>
      <Section title={`List of ${c.name} public holidays in ${year}`}>
        <PublicHolidayTable holidays={publicHolidays} country={c} />
      </Section>
      {weekends.length > 0 && (
        <Section id="long-weekends" title={`${c.name} long weekends in ${year}`}>
          <p className="mb-4 text-gray-600">
            {weekends.length} breaks of three days or more, from nationwide holidays next to a
            weekend.{c.weekendNote && ` ${c.weekendNote}`}
          </p>
          <LongWeekendList weekends={weekends} />
        </Section>
      )}
      {regions.length > 0 && (
        <Section
          id="by-state"
          title={`${c.name} public holidays ${year} by ${c.regionNoun}`}
        >
          <p className="mb-4 text-gray-600">
            Each {c.regionNoun} has the {national} nationwide holidays, plus its own:
          </p>
          <HolidaysByRegion holidays={publicHolidays} regions={regions} year={year} />
        </Section>
      )}
    </>
  );
}

function regionHeading(c: Country, regions: string[] | undefined, all: string[]) {
  if (!regions) return `All ${c.regionNounPlural}`;
  if (regions.length <= 3) return regions.join(', ');
  const missing = all.filter((r) => !regions.includes(r));
  return missing.length <= 4
    ? `All ${c.regionNounPlural} except ${missing.join(', ')}`
    : `${regions.length} ${c.regionNounPlural}`;
}

function SchoolView({ c, year }: { c: Country; year: number }) {
  const isRegional = regional(c, year);
  const carried = carriedOverBreak(c, year);
  const periods = yearData(c, year).school.filter(
    (p) => p.start.startsWith(String(year)) && (p.kind === 'break' || c.code === 'au'),
  );
  const breaks = schoolBreaks(c, year);

  const groups = new Map<string, SchoolPeriod[]>();
  for (const p of periods) {
    const k = JSON.stringify(p.regions ?? null);
    groups.set(k, [...(groups.get(k) ?? []), p]);
  }
  const all = [...new Set(periods.flatMap((p) => p.regions ?? []))].sort();
  const ordered = [...groups.entries()].sort(([a], [b]) =>
    a === 'null' ? -1 : b === 'null' ? 1 : a.localeCompare(b),
  );

  return (
    <>
      <p className="text-lg text-gray-700 leading-relaxed">
        {isRegional
          ? `School holidays in ${c.name} differ by ${c.regionNoun}. Find yours below.`
          : `${c.name} has ${breaks.length} school breaks starting in ${year}.`}
        {carried && !isRegional && (
          <>
            {' '}
            The break that began in {year - 1} ends on {longDate(carried.end)}, and school
            reopens on {longDate(addDays(carried.end, 1))}.
          </>
        )}
      </p>
      {c.schoolNote && <p className="mt-3 text-gray-600">{c.schoolNote}</p>}
      {isRegional ? (
        ordered.map(([k, ps]) => (
          <Section key={k} title={regionHeading(c, JSON.parse(k) ?? undefined, all)}>
            <SchoolTable periods={ps} country={c} />
          </Section>
        ))
      ) : (
        <Section title={`${c.name} school holidays ${year}`}>
          <SchoolTable periods={periods} country={c} />
        </Section>
      )}
    </>
  );
}

function CalendarView({ c, year }: { c: Country; year: number }) {
  const { publicHolidays, observances, school } = yearData(c, year);
  const isRegional = regional(c, year);
  const schoolDays = new Set<string>();
  if (!isRegional) {
    for (const p of school.filter((p) => p.kind === 'break')) {
      for (let d = p.start; d <= p.end; d = addDays(d, 1)) schoolDays.add(d);
    }
  }
  return (
    <>
      <p className="text-lg text-gray-700 leading-relaxed">
        The {year} calendar for {c.name}, with all {publicHolidays.length} public holidays
        {c.hasSchool && !isRegional && ' and the school holidays'} marked, and the festivals and
        observances of each month listed below it.
        {isRegional && c.hasSchool && (
          <>
            {' '}
            School holidays differ by {c.regionNoun}; see{' '}
            <Link href={holidayPath(c, 'school', year)} className="text-purple-700 underline">
              {c.name} school holidays {year}
            </Link>
            .
          </>
        )}
      </p>
      <div className="mt-6">
        <Legend school={schoolDays.size > 0} />
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 12 }, (_, i) => (
          <MonthGrid
            key={i}
            year={year}
            month={i + 1}
            country={c}
            holidays={publicHolidays}
            observances={observances}
            schoolDays={schoolDays}
          />
        ))}
      </div>
    </>
  );
}

export default async function HolidayPage({ params }: Props) {
  const { slug, view: segment } = await params;
  const resolved = resolve(slug, segment);
  if (!resolved) notFound();
  const { country: c, view, year } = resolved;
  const app = findApp(c.appId)!;
  const path = holidayPath(c, view, year);
  const h1 =
    view === 'calendar'
      ? `${c.name} Calendar ${year}`
      : view === 'public'
        ? `${c.name} Public Holidays ${year}`
        : `${c.name} School Holidays ${year}`;

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
                { name: h1, path },
              ]}
            />
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl text-center sm:text-left">
              {h1}
            </h1>
            <div className="text-center sm:text-left">
              <Terms terms={terms(c, view, year)} />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <HolidayNav country={c} current={path} />
          <div className="mt-10">
            {view === 'public' && <PublicView c={c} year={year} />}
            {view === 'school' && <SchoolView c={c} year={year} />}
            {view === 'calendar' && <CalendarView c={c} year={year} />}
          </div>

          <div className="mt-14">
            <AppPromo country={c} />
          </div>

          <p className="mt-8 text-sm text-gray-500">
            Not a government website. Dates follow official announcements where they have been
            made; authorities can still add or move holidays, so check official sources for anything
            important.
          </p>

          <Section title={`${year} holidays in other countries`}>
            <OtherCountries country={c} view={view} year={year} />
          </Section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
