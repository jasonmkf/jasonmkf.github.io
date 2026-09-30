import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AppCard from '@/components/AppCard';
import AsiaCoverageMap from '@/components/AsiaCoverageMap';
import { apps } from '@/data/apps';
import Image from 'next/image';

const features = [
  {
    title: 'User-Friendly Design',
    description:
      'Our apps are designed with simplicity and ease of use in mind, ensuring a seamless experience for all users.',
    icon: (
      <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
  },
  {
    title: 'Fast Performance',
    description:
      'We optimize our apps for speed and efficiency, ensuring they run smoothly on Android and iOS devices alike.',
    icon: (
      <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Localized for Asia',
    description:
      'Every app is built around local holidays, languages, and traditions — not just translated, but made for each market.',
    icon: (
      <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />

        <section className="py-20 bg-gradient-to-b from-white to-purple-50/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-600">
                Where We Are
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Made for Asia, market by market
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Our apps cover 8 countries and regions across Asia — hover over the map to explore.
              </p>
            </div>

            <AsiaCoverageMap />
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-600">
                Our Apps
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Everyday tools, thoughtfully made
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Convenience is just one tap away
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {apps.map((app) => (
                <AppCard
                  key={app.id}
                  href={`/${app.id}/`}
                  name={app.name}
                  description={app.description}
                  icon={app.icon}
                  url={app.url}
                  appStoreUrl={app.appStoreUrl}
                  comingSoon={app.comingSoon}
                  rating={app.rating}
                  downloads={app.downloads}
                />
              ))}
            </div>

            <div className="mt-14 text-center">
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
                      width={120}
                      height={40}
                      className="w-[190px] h-auto"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-600">
                Why KF Production
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                A decade of simplifying lives
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                We&apos;ve been building apps that people rely on every day since 2015
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl bg-gradient-to-b from-purple-50/80 to-white ring-1 ring-purple-100 p-8 hover:ring-purple-300 hover:shadow-lg hover:shadow-purple-100 transition-all duration-300"
                >
                  <span className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-purple-700 to-indigo-600 rounded-xl shadow-lg shadow-purple-700/25">
                    {feature.icon}
                  </span>
                  <h3 className="mt-6 text-lg font-bold text-gray-900 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-base text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
