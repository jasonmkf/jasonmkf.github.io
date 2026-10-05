import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StoreBadges from '@/components/StoreBadges';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedApps from '@/components/RelatedApps';
import { HolidayNav } from '@/components/HolidayParts';
import { allApps, findApp } from '@/data/apps';
import { countries, countryForApp, findCountry, holidayPath, LATEST_YEAR } from '@/data/holidays';
import { appJsonLd, JsonLd, pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return allApps.map((app) => ({ slug: app.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const app = findApp((await params).slug)!;
  return {
    ...pageMetadata({
      title: app.seo.title,
      description: app.seo.description,
      path: `/${app.id}/`,
      image: `/og/${app.id}.jpg`,
      absoluteTitle: true,
    }),
    icons: { icon: app.icon },
  };
}

export default async function AppPage({ params }: Props) {
  const app = findApp((await params).slug);
  if (!app) notFound();
  const iphoneApp = app.iphoneApp ? findApp(app.iphoneApp) : undefined;
  // Kalendar Hijrah is a Malaysian calendar too, so it links to Malaysia's holiday pages.
  const country =
    countryForApp(app.id) ??
    (app.category === 'Calendar' && app.countries.length === 1 ? findCountry(app.countries[0]) : undefined);

  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={appJsonLd(app)} />
      <Navbar />
      <main className="flex-grow">
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-900 py-16 sm:py-20">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <Breadcrumbs items={[{ name: 'Our Apps', path: '/apps/' }, { name: app.name, path: `/${app.id}/` }]} />
          </div>
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-center sm:text-left">
            <Image
              src={app.icon}
              alt={`${app.name} icon`}
              width={112}
              height={112}
              className="rounded-3xl ring-4 ring-white/10 shadow-xl flex-shrink-0"
              priority
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-300">
                {app.category} · {app.platforms}
              </p>
              <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                {app.name}
              </h1>
              <p className="mt-3 text-lg text-purple-200">{app.tagline}</p>
              <div className="mt-6 flex justify-center sm:justify-start">
                {app.comingSoon ? (
                  <span className="inline-flex items-center rounded-full bg-white/10 ring-1 ring-white/20 px-4 py-1.5 text-sm font-semibold text-white">
                    {app.comingSoon}
                  </span>
                ) : (
                  <StoreBadges
                    name={app.name}
                    url={app.url}
                    appStoreUrl={app.appStoreUrl}
                    badgeClassName="w-[150px] h-auto"
                  />
                )}
              </div>
              {iphoneApp && country && (
                <p className="mt-3 text-sm text-purple-200">
                  On iPhone, get {iphoneApp.name} and choose {country.name}.
                </p>
              )}
            </div>
          </div>
        </div>

        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-6 sm:p-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">About the app</h2>
                <p className="mt-4 text-lg text-gray-600 leading-relaxed">{app.intro}</p>
                {app.sections?.map((s) => (
                  <div key={s.heading}>
                    <h3 className="mt-8 text-lg font-bold text-gray-900">{s.heading}</h3>
                    <p className="mt-3 text-base text-gray-600 leading-relaxed">{s.body}</p>
                  </div>
                ))}
              </div>

              {country && (
                <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-6 sm:p-8">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    {country.name} holidays {LATEST_YEAR}
                  </h2>
                  <p className="mt-3 text-gray-600">
                    The public{country.hasSchool && ' and school'} holidays in the app, on the web.
                  </p>
                  <div className="mt-5">
                    <HolidayNav country={country} />
                  </div>
                </div>
              )}

              {app.unlisted && app.category === 'Calendar' && (
                <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-6 sm:p-8">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Public holidays {LATEST_YEAR} by country
                  </h2>
                  <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {countries.map((c) => (
                      <li key={c.code}>
                        <Link href={holidayPath(c, 'public', LATEST_YEAR)} className="text-purple-800 font-medium hover:underline">
                          {c.name} public holidays {LATEST_YEAR}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-6 sm:p-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Features</h2>
                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  {app.features.map((f, i) => (
                    <li key={i} className="flex gap-3 text-gray-700 leading-relaxed">
                      <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-6">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-purple-600">
                  Available on
                </h2>
                <p className="mt-3 text-gray-900 font-medium">{app.platforms}</p>
              </div>

              <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-6">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-purple-600">
                  Languages
                </h2>
                <p className="mt-3 text-gray-700 leading-relaxed">{app.languages}</p>
              </div>

              <div className="rounded-2xl bg-gradient-to-b from-purple-50/80 to-white ring-1 ring-purple-200 p-6">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-purple-600">
                  Privacy
                </h2>
                <p className="mt-3 text-gray-700 leading-relaxed">{app.privacy}</p>
                <a
                  href={`/${app.id}/privacy.html`}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-purple-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-700/25 hover:bg-purple-600 transition-colors"
                >
                  {iphoneApp ? 'Android privacy policy' : 'Privacy Policy'}
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                {iphoneApp && (
                  <a
                    href={`/${iphoneApp.id}/privacy.html`}
                    className="mt-3 block text-sm font-semibold text-purple-800 hover:underline"
                  >
                    iPhone privacy policy ({iphoneApp.name})
                  </a>
                )}
              </div>

              <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-6">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-purple-600">
                  Support
                </h2>
                <a
                  href="mailto:support@kf-production.com"
                  className="mt-3 block text-purple-800 font-medium hover:underline break-all"
                >
                  support@kf-production.com
                </a>
              </div>
            </aside>
          </div>

          {app.note && (
            <p className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 text-sm text-gray-500">
              {app.note}
            </p>
          )}
        </section>

        <RelatedApps app={app} />
      </main>
      <Footer />
    </div>
  );
}
