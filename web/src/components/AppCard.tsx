'use client';

import Image from 'next/image';
import Link from 'next/link';
import StoreBadges from './StoreBadges';

interface AppCardProps {
  href: string;
  name: string;
  description: string;
  icon: string;
  url?: string;
  appStoreUrl?: string;
  comingSoon?: string;
  rating?: string;
  downloads?: string;
  reviews?: string;
}

const hasValue = (v?: string) => v && v !== '-';

export default function AppCard({ href, name, description, icon, url, appStoreUrl, comingSoon, rating, downloads }: AppCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl ring-1 ring-gray-200 overflow-hidden hover:ring-purple-300 hover:shadow-xl hover:shadow-purple-100 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      <div className="p-6 flex-grow">
        <div className="flex items-start justify-between mb-4">
          <Image
            src={icon}
            alt={`${name} icon`}
            width={64}
            height={64}
            className="rounded-2xl ring-1 ring-gray-200 shadow-sm group-hover:scale-105 transition-transform duration-300"
            style={{ width: '64px', height: '64px', objectFit: 'cover' }}
          />
          <div className="flex flex-col items-end gap-1.5">
            {hasValue(rating) && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 ring-1 ring-amber-200 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                <svg className="h-3 w-3 fill-amber-400" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.539 1.118l-3.366-2.445a1 1 0 00-1.176 0l-3.367 2.445c-.783.57-1.838-.196-1.538-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.062 9.385c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.958z" />
                </svg>
                {rating}
              </span>
            )}
            {hasValue(downloads) && (
              <span className="inline-flex items-center rounded-full bg-purple-50 ring-1 ring-purple-200 px-2.5 py-0.5 text-xs font-semibold text-purple-700">
                {downloads}
              </span>
            )}
          </div>
        </div>
        <h3 className="text-lg font-bold text-gray-900">
          <Link href={href} className="after:absolute after:inset-0 group-hover:text-purple-800">
            {name}
          </Link>
        </h3>
        <p className="mt-2 text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
      <div className="px-6 pb-6 mt-auto relative z-10">
        {comingSoon ? (
          <span className="inline-flex items-center rounded-full bg-emerald-50 ring-1 ring-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-700">
            Coming soon
          </span>
        ) : (
          <StoreBadges
            name={name}
            url={url}
            appStoreUrl={appStoreUrl}
            badgeClassName="w-[130px] h-auto"
          />
        )}
      </div>
    </div>
  );
}
