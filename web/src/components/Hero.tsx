import Link from 'next/link';
import DeviceMockups from '@/components/DeviceMockups';
import { allApps, apps } from '@/data/apps';

// Unlisted apps are still in the stores, so they count.
const published = allApps.filter((a) => a.url || a.appStoreUrl);
const rated = apps.filter((a) => a.rating !== '-');
const averageRating = rated.reduce((sum, a) => sum + Number(a.rating), 0) / rated.length;

const stats = [
  { value: '600K+', label: 'Downloads' },
  { value: `${averageRating.toFixed(1)}★`, label: 'Average rating' },
  { value: String(published.length), label: 'Apps published' },
  { value: String(new Set(apps.flatMap((a) => a.countries)).size), label: 'Countries' },
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(#d8b4fe_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-48 left-1/2 -z-10 h-[36rem] w-[64rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-purple-300/50 via-fuchsia-200/30 to-indigo-300/40 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-10 items-center pt-14 pb-12 sm:pt-20 lg:pt-16 lg:pb-12">
        <div className="text-center lg:text-left">
          <Link
            href="/shelfbell/"
            className="group inline-flex items-center gap-2.5 rounded-full bg-white/80 py-1 pl-1 pr-3.5 text-sm ring-1 ring-purple-200 shadow-sm backdrop-blur hover:ring-purple-400 transition"
          >
            <span className="whitespace-nowrap rounded-full bg-purple-700 px-2.5 py-0.5 text-xs font-semibold text-white">
              Coming soon
            </span>
            <span className="whitespace-nowrap font-medium text-gray-700">
              Shelfbell<span className="hidden sm:inline">, an expiry date reminder</span>
            </span>
            <svg className="h-4 w-4 text-purple-600 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </Link>

          <h1 className="mt-7 text-5xl font-extrabold leading-[0.95] tracking-[-0.045em] text-gray-950 sm:text-6xl lg:text-7xl">
            Simplifying life,
            <span className="block bg-gradient-to-r from-purple-700 via-fuchsia-600 to-indigo-600 bg-clip-text pb-2 text-transparent">
              one app at a time.
            </span>
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-gray-600 sm:text-xl max-w-xl mx-auto lg:mx-0">
            Holiday calendars for nine countries across Asia and Australia, loan calculators for
            Malaysia, and everyday tools, built around local holidays, languages and traditions.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <Link
              href="/apps/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-950 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-gray-950/20 hover:bg-purple-800 transition-colors"
            >
              Explore our apps
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link
              href="/about/"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-base font-semibold text-gray-900 ring-1 ring-gray-200 hover:ring-purple-300 hover:bg-purple-50 transition"
            >
              About us
            </Link>
          </div>

          <dl className="mt-12 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-y-6 max-w-xl mx-auto lg:mx-0 sm:divide-x lg:divide-x-0 xl:divide-x sm:divide-gray-200">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col px-2 sm:px-5 sm:first:pl-0 lg:px-0 xl:px-5 xl:first:pl-0 text-center lg:text-left">
                <dt className="order-2 mt-1 text-sm text-gray-500">{stat.label}</dt>
                <dd className="order-1 text-3xl font-extrabold tracking-tight text-gray-950">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero-fade-in flex justify-center lg:justify-end">
          <div className="[zoom:0.56] min-[400px]:[zoom:0.62] sm:[zoom:0.85] lg:[zoom:0.74] xl:[zoom:0.92]">
            <DeviceMockups />
          </div>
        </div>
      </div>
    </section>
  );
}
