import Image from 'next/image';
import Link from 'next/link';
import { apps } from '@/data/apps';

const published = apps.filter((a) => a.url || a.appStoreUrl);
const rated = apps.filter((a) => a.rating !== '-');
const averageRating = rated.reduce((sum, a) => sum + Number(a.rating), 0) / rated.length;
const topApp = apps.find((a) => a.id === 'malaysia-calendar')!;

const stats = [
  { value: '600K+', label: 'Downloads' },
  { value: `${averageRating.toFixed(1)}★`, label: 'Average rating' },
  { value: String(published.length), label: 'Apps published' },
  { value: String(new Set(apps.flatMap((a) => a.countries)).size), label: 'Countries' },
];

// Three columns of icons that scroll past each other; each list is doubled so the loop is seamless.
const columns = [0, 1, 2].map((c) => apps.filter((_, i) => i % 3 === c));
const speeds = ['38s', '46s', '42s'];

function IconColumn({ items, index }: { items: typeof apps; index: number }) {
  return (
    <div className="flex-1 overflow-hidden">
      <div
        className={`flex flex-col gap-4 ${index === 1 ? 'hero-marquee-down' : 'hero-marquee-up'}`}
        style={{ animationDuration: speeds[index] }}
      >
        {[false, true].map((copy) =>
          items.map((app) => (
            <Link
              key={`${app.id}-${copy}`}
              href={`/${app.id}/`}
              aria-hidden={copy || undefined}
              tabIndex={copy ? -1 : undefined}
              title={app.name}
              className="relative block rounded-[26%] bg-white p-1.5 shadow-xl shadow-purple-900/10 ring-1 ring-gray-900/5 transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.03]"
            >
              <Image
                src={app.icon}
                alt={copy ? '' : `${app.name} icon`}
                width={160}
                height={160}
                className="aspect-square w-full rounded-[22%]"
              />
            </Link>
          )),
        )}
      </div>
    </div>
  );
}

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-10 items-center pt-14 pb-16 sm:pt-20 lg:pt-24 lg:pb-16">
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

          <dl className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-y-6 max-w-xl mx-auto lg:mx-0 sm:divide-x sm:divide-gray-200">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col px-2 sm:px-5 sm:first:pl-0 text-center lg:text-left">
                <dt className="order-2 mt-1 text-sm text-gray-500">{stat.label}</dt>
                <dd className="order-1 text-3xl font-extrabold tracking-tight text-gray-950">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero-fade-in relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative h-[22rem] sm:h-[28rem] lg:h-[34rem] rotate-[-4deg] [mask-image:linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)]">
            <div className="flex h-full gap-4 sm:gap-5 px-2">
              {columns.map((items, i) => (
                <IconColumn key={i} items={items} index={i} />
              ))}
            </div>
          </div>
          <Link
            href={`/${topApp.id}/`}
            className="absolute left-0 bottom-8 sm:-left-6 flex items-center gap-3 rounded-2xl bg-white/90 py-3 pl-3 pr-5 shadow-2xl shadow-purple-900/15 ring-1 ring-gray-900/5 backdrop-blur hover:ring-purple-300 transition"
          >
            <Image src={topApp.icon} alt="" width={44} height={44} className="rounded-xl" />
            <span>
              <span className="block text-sm font-semibold text-gray-900">{topApp.name}</span>
              <span className="block text-xs text-gray-500">
                <span className="text-amber-500">★</span> {topApp.rating} · {topApp.downloads} downloads
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
