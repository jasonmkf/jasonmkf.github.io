'use client';

import { useState } from 'react';
import Link from 'next/link';
import { apps } from '@/data/apps';
import { asiaCountries } from '@/data/asiaMap';

interface Market {
  id: string;
  name: string;
  flag: string;
  // Pin position in map coordinates
  x: number;
  y: number;
}

const markets: Market[] = [
  { id: 'my', name: 'Malaysia', flag: '🇲🇾', x: 651, y: 517 },
  { id: 'sg', name: 'Singapore', flag: '🇸🇬', x: 659.5, y: 527.5 },
  { id: 'th', name: 'Thailand', flag: '🇹🇭', x: 649, y: 494 },
  { id: 'vn', name: 'Vietnam', flag: '🇻🇳', x: 663, y: 488 },
  { id: 'hk', name: 'Hong Kong', flag: '🇭🇰', x: 683, y: 463.5 },
  { id: 'tw', name: 'Taiwan', flag: '🇹🇼', x: 694, y: 459 },
  { id: 'kr', name: 'South Korea', flag: '🇰🇷', x: 698, y: 417 },
  { id: 'id', name: 'Indonesia', flag: '🇮🇩', x: 665, y: 550 },
];

const appCountByCountry = apps.reduce<Record<string, number>>((acc, app) => {
  app.countries.forEach((country) => {
    acc[country] = (acc[country] || 0) + 1;
  });
  return acc;
}, {});

const coveredIds = new Set(Object.keys(appCountByCountry));

export default function AsiaCoverageMap() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-center">
      {/* Map */}
      <div className="lg:col-span-3 relative">
        <div className="rounded-3xl bg-gradient-to-br from-purple-50 via-white to-indigo-50 ring-1 ring-purple-100 p-4 sm:p-8">
          <svg
            viewBox="564 356 194 212"
            role="img"
            aria-label="Map of Asia highlighting the countries where KF Production apps are available"
            className="w-full h-auto"
          >
            {asiaCountries.map((c) => {
              const covered = coveredIds.has(c.id);
              return (
                <path
                  key={c.id}
                  d={c.d}
                  onMouseEnter={covered ? () => setActive(c.id) : undefined}
                  onMouseLeave={covered ? () => setActive(null) : undefined}
                  className={
                    covered
                      ? `cursor-pointer transition-colors duration-200 ${
                          active === c.id ? 'fill-purple-500' : 'fill-purple-600'
                        }`
                      : 'fill-purple-100'
                  }
                  stroke="#ffffff"
                  strokeWidth={0.5}
                />
              );
            })}

            {/* Market pins */}
            {markets.map((m) => (
              <g
                key={m.id}
                onMouseEnter={() => setActive(m.id)}
                onMouseLeave={() => setActive(null)}
                className="cursor-pointer"
              >
                <circle cx={m.x} cy={m.y} r={4.5} className="fill-purple-500/20">
                  <animate attributeName="r" values="3;6;3" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle
                  cx={m.x}
                  cy={m.y}
                  r={active === m.id ? 2.4 : 1.8}
                  className="fill-amber-400 stroke-white transition-all duration-200"
                  strokeWidth={0.6}
                />
              </g>
            ))}
          </svg>

          {/* Hover tooltip */}
          <div
            className={`pointer-events-none absolute top-6 left-1/2 -translate-x-1/2 transition-opacity duration-200 ${
              active ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {active && (
              <div className="flex items-center gap-2 rounded-full bg-gray-900/90 text-white text-sm font-medium px-4 py-1.5 shadow-lg backdrop-blur whitespace-nowrap">
                <span>{markets.find((m) => m.id === active)?.flag}</span>
                <span>{markets.find((m) => m.id === active)?.name}</span>
                <span className="text-purple-300">
                  {appCountByCountry[active]} app{appCountByCountry[active] > 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>
        </div>
        <p className="mt-2 text-[10px] text-gray-400 text-right">
          Map based on{' '}
          <a
            href="https://github.com/flekschas/simple-world-map"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-500"
          >
            Simple World Map
          </a>{' '}
          (CC BY-SA 3.0)
        </p>
      </div>

      {/* Market list */}
      <div className="lg:col-span-2">
        <ul className="grid grid-cols-2 gap-3">
          {markets.map((m) => (
            <li key={m.id}>
              <button
                type="button"
                onMouseEnter={() => setActive(m.id)}
                onMouseLeave={() => setActive(null)}
                className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-left ring-1 transition-all duration-200 ${
                  active === m.id
                    ? 'bg-purple-600 ring-purple-600 text-white shadow-lg shadow-purple-600/25'
                    : 'bg-white ring-gray-200 hover:ring-purple-300'
                }`}
              >
                <span className="text-2xl leading-none">{m.flag}</span>
                <span>
                  <span
                    className={`block text-sm font-semibold ${
                      active === m.id ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {m.name}
                  </span>
                  <span
                    className={`block text-xs ${
                      active === m.id ? 'text-purple-100' : 'text-gray-500'
                    }`}
                  >
                    {appCountByCountry[m.id]} app{appCountByCountry[m.id] > 1 ? 's' : ''}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-gray-600">
          From Kuala Lumpur to Seoul — our calendar and utility apps are localized for{' '}
          <span className="font-semibold text-gray-900">{markets.length} markets</span> across Asia,
          each built around local holidays, languages, and traditions. And we&apos;re not done yet.
        </p>
        <Link
          href="/apps"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-purple-700 hover:text-purple-900"
        >
          Browse all apps
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
