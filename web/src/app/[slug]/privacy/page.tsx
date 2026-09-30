import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PrivacyPolicy from '@/components/PrivacyPolicy';
import Breadcrumbs from '@/components/Breadcrumbs';
import { apps, findApp } from '@/data/apps';
import { pageMetadata } from '@/lib/seo';

// Exported as /<slug>/privacy/index.html; scripts/publish.mjs moves it to /<slug>/privacy.html.

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const app = findApp((await params).slug)!;
  return {
    ...pageMetadata({
      title: `Privacy Policy — ${app.name}`,
      description: `How ${app.name} by KF Production handles your information: what stays on your device, what is sent, and how to delete it.`,
      path: `/${app.id}/privacy.html`,
      image: `/og/${app.id}.jpg`,
      absoluteTitle: true,
    }),
    icons: { icon: app.icon },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const app = findApp((await params).slug);
  if (!app) notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-900 py-16">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex justify-center">
            <Breadcrumbs
              items={[
                { name: 'Our Apps', path: '/apps/' },
                { name: app.name, path: `/${app.id}/` },
                { name: 'Privacy Policy', path: `/${app.id}/privacy.html` },
              ]}
            />
          </div>
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <a href={`/${app.id}/`} className="inline-flex items-center gap-3 group">
              <Image
                src={app.icon}
                alt=""
                width={40}
                height={40}
                className="rounded-xl ring-2 ring-white/10"
              />
              <span className="text-sm font-semibold uppercase tracking-widest text-purple-300 group-hover:text-white transition-colors">
                {app.name}
              </span>
            </a>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-lg text-purple-200">Last updated: {app.updated}</p>
          </div>
        </div>

        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <article className="bg-white rounded-2xl ring-1 ring-gray-200 p-6 sm:p-10 text-gray-700 leading-relaxed [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-gray-900 [&_p]:mt-4 [&_a]:text-purple-700 [&_a]:underline [&_a]:break-words hover:[&_a]:text-purple-900">
              <PrivacyPolicy app={app} />
            </article>

            <a
              href={`/${app.id}/`}
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-purple-700 hover:text-purple-900"
            >
              <svg className="h-4 w-4 rotate-180" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
              Back to {app.name}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
