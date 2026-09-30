import Image from 'next/image';
import Link from 'next/link';
import { apps, type App } from '@/data/apps';

// Up to three other apps, same category first.
export default function RelatedApps({ app }: { app: App }) {
  const others = apps.filter((a) => a.id !== app.id);
  const related = [
    ...others.filter((a) => a.category === app.category),
    ...others.filter((a) => a.category !== app.category),
  ].slice(0, 3);

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">More apps from KF Production</h2>
        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {related.map((a) => (
            <li key={a.id}>
              <Link
                href={`/${a.id}/`}
                className="flex h-full items-center gap-4 rounded-2xl ring-1 ring-gray-200 p-4 hover:ring-purple-300 hover:shadow-lg hover:shadow-purple-100 transition-all"
              >
                <Image
                  src={a.icon}
                  alt=""
                  width={56}
                  height={56}
                  className="rounded-xl ring-1 ring-gray-200 flex-shrink-0"
                />
                <span>
                  <span className="block font-semibold text-gray-900">{a.name}</span>
                  <span className="block mt-0.5 text-sm text-gray-500">{a.platforms}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/apps/"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-purple-700 hover:text-purple-900"
        >
          See all apps
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
