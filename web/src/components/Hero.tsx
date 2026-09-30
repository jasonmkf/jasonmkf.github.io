'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { apps } from '@/data/apps';

const stats = [
  { value: '600K+', label: 'Downloads' },
  { value: String(apps.filter((a) => a.url || a.appStoreUrl).length), label: 'Apps published' },
  { value: '8', label: 'Asian markets' },
];

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-purple-100/70 via-purple-50/40 to-transparent" />
      <div className="absolute -top-32 -left-32 -z-10 h-96 w-96 rounded-full bg-purple-300/30 blur-3xl" />
      <div className="absolute top-20 right-0 -z-10 h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-16 sm:py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 ring-1 ring-purple-200 px-4 py-1.5 text-sm font-medium text-purple-800 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600" />
              </span>
              Building apps since 2015
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Simplifying life,</span>
              <span className="block bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                one app at a time
              </span>
            </h1>

            <p className="mt-5 text-lg text-gray-600 sm:text-xl max-w-xl mx-auto lg:mx-0">
              Localized calendars and everyday tools trusted by hundreds of thousands of users
              across Asia — on Android and iOS, thoughtfully built around local holidays,
              languages, and traditions.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                href="/apps"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-700 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-700/25 hover:bg-purple-600 hover:shadow-purple-600/30 transition-all"
              >
                Explore Our Apps
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-base font-semibold text-gray-900 ring-1 ring-gray-200 hover:ring-purple-300 hover:bg-purple-50 transition-all"
              >
                About Us
              </Link>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <dt className="order-2 text-sm text-gray-500">{stat.label}</dt>
                  <dd className="order-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="relative h-64 sm:h-80 lg:h-[28rem] hidden sm:block"
          >
            <Image
              src="/hero-image.svg"
              alt="App Development Illustration"
              fill
              className="object-contain drop-shadow-xl"
              priority
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
