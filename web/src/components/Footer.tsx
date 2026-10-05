import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-purple-950 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center">
              <Image
                src="/kf-production-logo.png"
                alt="KF Production Logo"
                width={40}
                height={40}
                className="h-10 w-auto filter brightness-0 invert"
              />
              <span className="ml-3 text-xl font-bold tracking-tight">KF Production</span>
            </div>
            <p className="mt-4 text-sm text-purple-200 leading-relaxed">
              Localized calendars and everyday tools for users across Asia, on Android and iOS —
              simplifying life, one app at a time.
            </p>
            <p className="mt-3 inline-flex items-center gap-2 text-sm text-purple-300">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-purple-400" />
              Developing apps since 2015
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-purple-300">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/" className="text-purple-200 hover:text-white text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/apps" className="text-purple-200 hover:text-white text-sm transition-colors">
                  Our Apps
                </Link>
              </li>
              <li>
                <Link href="/holidays" className="text-purple-200 hover:text-white text-sm transition-colors">
                  Public &amp; School Holidays
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-purple-200 hover:text-white text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-purple-200 hover:text-white text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-purple-300">
              Connect
            </h3>
            <div className="mt-4 flex space-x-3">
              <a
                href="https://play.google.com/store/apps/dev?id=8791158212658173660"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-white/10 p-2.5 text-purple-200 hover:text-white hover:bg-white/20 transition-colors"
              >
                <span className="sr-only">Google Play</span>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3.609 1.814L13.792 12 3.609 22.186c-.181-.181-.301-.406-.301-.663V2.477c0-.257.12-.482.301-.663zm10.831 10.309l2.128-2.127L21.382 12l-4.814 2.004-2.128-2.127 1.749-1.749-10.836 6.155 9.087-5.156zm7.34-6.497l-2.066 1.066-2.127 2.127L7.298 3.322l10.289 5.301 4.193-2.997zM7.302 20.677l10.288-5.3-2.127-2.128-8.161 7.428z" />
                </svg>
              </a>
              <a
                href="https://apps.apple.com/us/developer/kek-fu-mun/id6804686923"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-white/10 p-2.5 text-purple-200 hover:text-white hover:bg-white/20 transition-colors"
              >
                <span className="sr-only">App Store</span>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
              </a>
              <a
                href="mailto:support@kf-production.com"
                className="rounded-xl bg-white/10 p-2.5 text-purple-200 hover:text-white hover:bg-white/20 transition-colors"
              >
                <span className="sr-only">Email</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-purple-800/60 text-sm text-center text-purple-300">
          <p>&copy; {currentYear} KF Production. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
