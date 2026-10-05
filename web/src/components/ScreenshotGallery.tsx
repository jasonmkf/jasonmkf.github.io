'use client';

import { useRef, useState } from 'react';
import PhoneFrame, { type Platform, type Screenshot } from '@/components/PhoneFrame';

const LABEL: Record<Platform, string> = { android: 'Android', ios: 'iPhone' };

// The store screenshots in a row that scrolls sideways, one tab per platform.
export default function ScreenshotGallery({
  name,
  shots,
}: {
  name: string;
  shots: Partial<Record<Platform, Screenshot[]>>;
}) {
  const platforms = (['android', 'ios'] as const).filter((p) => shots[p]?.length);
  const [platform, setPlatform] = useState<Platform>(platforms[0]);
  const row = useRef<HTMLUListElement>(null);
  if (platforms.length === 0) return null;

  const scroll = (dir: number) =>
    row.current?.scrollBy({ left: dir * row.current.clientWidth * 0.8, behavior: 'smooth' });

  return (
    <section className="py-16 bg-gradient-to-b from-white to-purple-50/60 border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-600">Screenshots</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">See {name} in action</h2>
          </div>
          <div className="flex items-center gap-3">
            {platforms.length > 1 && (
              <div role="tablist" aria-label="Platform" className="flex rounded-full bg-gray-100 p-1">
                {platforms.map((p) => (
                  <button
                    key={p}
                    role="tab"
                    aria-selected={p === platform}
                    onClick={() => {
                      setPlatform(p);
                      row.current?.scrollTo({ left: 0 });
                    }}
                    className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                      p === platform ? 'bg-white text-purple-800 shadow' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {LABEL[p]}
                  </button>
                ))}
              </div>
            )}
            <div className="hidden sm:flex gap-2">
              {[-1, 1].map((dir) => (
                <button
                  key={dir}
                  onClick={() => scroll(dir)}
                  aria-label={dir < 0 ? 'Previous screenshots' : 'Next screenshots'}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 ring-gray-200 text-gray-700 hover:text-purple-800 hover:ring-purple-300 transition-colors"
                >
                  <svg className={`h-5 w-5 ${dir < 0 ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ul
        ref={row}
        className="mt-10 flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-[max(1rem,calc((100vw-64rem)/2+2rem))] pb-8 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {shots[platform]!.map((shot, i) => (
          <li key={shot.src} className="snap-center flex-shrink-0 w-[200px] sm:w-[230px]">
            <PhoneFrame
              shot={shot}
              platform={platform}
              alt={`${name} on ${LABEL[platform]}, screenshot ${i + 1}`}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
