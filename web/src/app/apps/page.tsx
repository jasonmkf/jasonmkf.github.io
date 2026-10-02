import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { apps } from '@/data/apps';
import StoreBadges from '@/components/StoreBadges';
import Image from 'next/image';
import Link from 'next/link';
import { appListJsonLd, JsonLd, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Our Apps: Holiday Calendars and Loan Calculators',
  description:
    'All KF Production apps: holiday and lunar calendars for Asia and Australia, Malaysian car ' +
    'and home loan calculators, and the Shelfbell expiry date reminder. Free on Android and iPhone.',
  path: '/apps/',
});

const hasValue = (v?: string) => v && v !== '-';

export default function AppsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={appListJsonLd(apps)} />
      <Navbar />
      <main className="flex-grow">
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-900 py-20">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-300">
              KF Production
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Our Apps
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-purple-200">
              Localized calendars and everyday tools for Asia and Australia, on Android and iOS
            </p>
          </div>
        </div>

        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              {apps.map((app) => (
                <div
                  key={app.id}
                  className="group relative bg-white rounded-2xl ring-1 ring-gray-200 overflow-hidden hover:ring-purple-300 hover:shadow-xl hover:shadow-purple-100 transition-all duration-300"
                >
                  <div className="p-6 sm:p-7 flex flex-col md:flex-row md:items-center">
                    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-7">
                      <Image
                        src={app.icon}
                        alt={`${app.name} icon`}
                        width={80}
                        height={80}
                        className="rounded-2xl ring-1 ring-gray-200 shadow-sm"
                      />
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        <Link href={`/${app.id}/`} className="after:absolute after:inset-0 group-hover:text-purple-800">
                          {app.name}
                        </Link>
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4">{app.description}</p>

                      <div className="flex flex-wrap items-center gap-2">
                        {hasValue(app.rating) && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 ring-1 ring-amber-200 px-3 py-1 text-xs font-semibold text-amber-700">
                            <svg className="h-3 w-3 fill-amber-400" viewBox="0 0 20 20" aria-hidden="true">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.539 1.118l-3.366-2.445a1 1 0 00-1.176 0l-3.367 2.445c-.783.57-1.838-.196-1.538-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.062 9.385c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.958z" />
                            </svg>
                            {app.rating}
                            {hasValue(app.reviews) && (
                              <span className="font-normal text-amber-600">
                                ({app.reviews} reviews)
                              </span>
                            )}
                          </span>
                        )}
                        {hasValue(app.downloads) && (
                          <span className="inline-flex items-center rounded-full bg-purple-50 ring-1 ring-purple-200 px-3 py-1 text-xs font-semibold text-purple-700">
                            {app.downloads} downloads
                          </span>
                        )}
                        {!hasValue(app.rating) && !hasValue(app.downloads) && (
                          <span className="inline-flex items-center rounded-full bg-emerald-50 ring-1 ring-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-700">
                            {app.comingSoon ? 'Coming soon' : 'Newly launched'}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex-shrink-0 mt-5 md:mt-0 md:ml-7 relative z-10">
                      <StoreBadges
                        name={app.name}
                        url={app.url}
                        appStoreUrl={app.appStoreUrl}
                        className="flex flex-row md:flex-col items-start gap-2.5"
                        badgeClassName="w-[150px] h-auto"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <div className="flex flex-col items-center">
                <p className="mb-3 text-base font-medium text-gray-600">
                  View all our apps on Google Play and the App Store
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="https://play.google.com/store/apps/dev?id=8791158212658173660"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/google-play-badge.png"
                      alt="View All Apps on Google Play"
                      width={270}
                      height={80}
                      className="w-[190px] h-auto"
                    />
                  </a>
                  <a
                    href="https://apps.apple.com/us/developer/kek-fu-mun/id6804686923"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/app-store-badge.svg"
                      alt="View All Apps on the App Store"
                      width={135}
                      height={40}
                      className="w-[190px] h-auto"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
