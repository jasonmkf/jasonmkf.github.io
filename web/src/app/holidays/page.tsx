import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { viewLabel, type View } from '@/components/HolidayParts';
import { findApp } from '@/data/apps';
import { countries, FEATURED_YEAR, hasSchoolIn, HOLIDAY_YEARS, holidayPath, viewsFor, YEARS_BY_RELEVANCE } from '@/data/holidays';
import { pageMetadata } from '@/lib/seo';
import { systemLabel, systemPath } from '@/components/CalendarSystemPage';

const years = `${HOLIDAY_YEARS[0]}–${HOLIDAY_YEARS[HOLIDAY_YEARS.length - 1]}`;

export const metadata = {
  ...pageMetadata({
    title: `Public & School Holidays ${years}: Asia and Australia`,
    description:
      `Public holidays, school holidays and calendars for ${years} in Malaysia, Singapore, ` +
      'Indonesia, Thailand, Vietnam, Hong Kong, Taiwan, South Korea and Australia.',
    path: '/holidays/',
  }),
  keywords: countries.flatMap((c) => [
    `${c.name} public holidays ${FEATURED_YEAR}`,
    ...(hasSchoolIn(c, FEATURED_YEAR) ? [`${c.name} school holidays ${FEATURED_YEAR}`] : []),
  ]),
};

export default function HolidaysPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-900 py-16 sm:py-20">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ name: 'Holidays', path: '/holidays/' }]} />
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl text-center sm:text-left">
              Public and School Holidays {years}
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-purple-200 text-center sm:text-left">
              Holiday calendars for nine countries in Asia and Australia, from the data in our
              calendar apps.
            </p>
          </div>
        </div>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          {countries.map((c) => {
            const app = findApp(c.appId)!;
            return (
              <div key={c.code} className="rounded-2xl bg-white ring-1 ring-gray-200 p-6">
                <div className="flex items-center gap-4">
                  <Image src={app.icon} alt="" width={48} height={48} className="rounded-xl ring-1 ring-gray-200" />
                  <h2 className="text-xl font-bold text-gray-900">{c.name}</h2>
                </div>
                {YEARS_BY_RELEVANCE.map((year) => (
                  <ul key={year} className="mt-4 space-y-1.5">
                    {(['public', 'school', 'calendar'] as View[])
                      .filter((v) => viewsFor(c, year).includes(v))
                      .map((v) => (
                      <li key={v}>
                        <Link href={holidayPath(c, v, year)} className="text-purple-800 font-medium hover:underline">
                          {viewLabel(c, v, year)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ))}
                <Link href={`/${app.id}/`} className="mt-4 inline-block text-sm text-gray-500 hover:text-purple-800">
                  {app.name} app for Android and iPhone →
                </Link>
              </div>
            );
          })}
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Lunar and Hijri calendars</h2>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
            {(['lunar', 'hijri'] as const).map((s) => (
              <ul key={s} className="rounded-2xl bg-white ring-1 ring-gray-200 p-6 space-y-1.5">
                {YEARS_BY_RELEVANCE.map((y) => (
                  <li key={y}>
                    <Link href={systemPath(s, y)} className="text-purple-800 font-medium hover:underline">
                      {systemLabel(s, y)}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
