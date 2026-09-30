'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/apps', label: 'Our Apps' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname().replace(/(.)\/$/, '$1');

  return (
    <nav className="bg-white/70 backdrop-blur-xl sticky top-0 z-50 border-b border-gray-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center group">
              <Image
                src="/kf-production-logo.png"
                alt="KF Production Logo"
                width={40}
                height={40}
                className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <span className="ml-3 text-lg font-bold tracking-tight text-gray-900">
                KF <span className="text-purple-700">Production</span>
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-purple-100 text-purple-800'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href="https://play.google.com/store/apps/dev?id=8791158212658173660"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View our apps on Google Play"
              className="ml-3 inline-flex items-center gap-2 rounded-full bg-gray-900 px-3.5 lg:px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 transition-colors"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3.609 1.814L13.792 12 3.609 22.186c-.181-.181-.301-.406-.301-.663V2.477c0-.257.12-.482.301-.663zm10.831 10.309l2.128-2.127L21.382 12l-4.814 2.004-2.128-2.127 1.749-1.749-10.836 6.155 9.087-5.156zm7.34-6.497l-2.066 1.066-2.127 2.127L7.298 3.322l10.289 5.301 4.193-2.997zM7.302 20.677l10.288-5.3-2.127-2.128-8.161 7.428z" />
              </svg>
              <span className="hidden lg:inline">Google Play</span>
            </a>
            <a
              href="https://apps.apple.com/us/developer/kek-fu-mun/id6804686923"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View our apps on the App Store"
              className="ml-2 inline-flex items-center gap-2 rounded-full bg-gray-900 px-3.5 lg:px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              <span className="hidden lg:inline">App Store</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-700 hover:text-purple-900 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100">
          <div className="px-3 pt-2 pb-4 space-y-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-base font-medium ${
                    isActive
                      ? 'bg-purple-100 text-purple-800'
                      : 'text-gray-700 hover:text-purple-900 hover:bg-purple-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-3 mt-2 border-t border-gray-100 flex flex-col gap-2">
              <a
                href="https://play.google.com/store/apps/dev?id=8791158212658173660"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2.5 text-base font-semibold text-white hover:bg-gray-700 transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3.609 1.814L13.792 12 3.609 22.186c-.181-.181-.301-.406-.301-.663V2.477c0-.257.12-.482.301-.663zm10.831 10.309l2.128-2.127L21.382 12l-4.814 2.004-2.128-2.127 1.749-1.749-10.836 6.155 9.087-5.156zm7.34-6.497l-2.066 1.066-2.127 2.127L7.298 3.322l10.289 5.301 4.193-2.997zM7.302 20.677l10.288-5.3-2.127-2.128-8.161 7.428z" />
                </svg>
                Google Play
              </a>
              <a
                href="https://apps.apple.com/us/developer/kek-fu-mun/id6804686923"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2.5 text-base font-semibold text-white hover:bg-gray-700 transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                App Store
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
