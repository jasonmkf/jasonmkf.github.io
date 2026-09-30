import Image from 'next/image';
import Link from 'next/link';
import { apps, findApp } from '@/data/apps';

// Home screens drawn in CSS: a Galaxy S26 Ultra with the Android apps, and an iPhone 18 Pro Max
// in front with the iPhone apps. Laid out on a 600 x 720 canvas that Hero scales with `zoom`.

const androidApps = apps.filter((a) => a.platforms.includes('Android'));
const iphoneApps = apps.filter((a) => a.platforms.includes('iPhone'));
const topApp = findApp('malaysia-calendar')!;
const shelfbell = findApp('shelfbell')!;
const lunar = findApp('lunar-calendar')!;

// Launcher labels as they appear on the phone.
const androidLabel: Record<string, string> = {
  'malaysia-calendar': 'Malaysia Calendar',
  'singapore-calendar': 'Singapore Calendar',
  'kalendar-hijrah': 'Kalendar Hijrah',
  'housing-loan-calculator': 'Housing Loan',
  'thailand-calendar': 'ปฏิทินประเทศไทย',
  'vietnamese-calendar': 'Lịch Việt Nam',
  'hong-kong-calendar': '香港月曆',
  'taiwan-calendar': '台灣月曆',
  'south-korea-calendar': '한국 달력',
  'indonesia-calendar': 'Kalender Indonesia',
  'australia-calendar': 'Australia Calendar',
  'car-loan-calculator': 'Car Loan MY',
  shelfbell: 'Shelfbell',
};

function Signal() {
  return (
    <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" aria-hidden="true">
      <rect x="0" y="7" width="3" height="4" rx="1" />
      <rect x="4.5" y="5" width="3" height="6" rx="1" />
      <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
      <rect x="13.5" y="0" width="3" height="11" rx="1" />
    </svg>
  );
}

function Wifi() {
  return (
    <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor" aria-hidden="true">
      <path d="M7.5 2.2c2.2 0 4.2.8 5.7 2.2l1.1-1.2A9.9 9.9 0 007.5.5 9.9 9.9 0 00.7 3.2l1.1 1.2a8.2 8.2 0 015.7-2.2z" />
      <path d="M7.5 5.3c1.3 0 2.5.5 3.4 1.3l1.1-1.2a6.6 6.6 0 00-9 0l1.1 1.2c.9-.8 2.1-1.3 3.4-1.3z" />
      <path d="M7.5 8.3c.6 0 1.1.2 1.5.6L7.5 10.5 6 8.9c.4-.4.9-.6 1.5-.6z" />
    </svg>
  );
}

function Battery({ level = 0.8 }: { level?: number }) {
  return (
    <svg width="26" height="12" viewBox="0 0 26 12" aria-hidden="true">
      <rect x="0.5" y="0.5" width="22" height="11" rx="3.5" fill="none" stroke="currentColor" strokeOpacity="0.45" />
      <rect x="2" y="2" width={19 * level} height="8" rx="2" fill="currentColor" />
      <path d="M24 4v4c.8-.3 1.3-1.1 1.3-2S24.8 4.3 24 4z" fill="currentColor" fillOpacity="0.45" />
    </svg>
  );
}

function Galaxy() {
  return (
    <div className="absolute left-[18px] top-[34px] h-[636px] w-[296px] -rotate-[8deg]">
      <span className="absolute -right-[2px] top-[150px] h-[74px] w-[4px] rounded-r bg-slate-600" />
      <span className="absolute -right-[2px] top-[240px] h-[44px] w-[4px] rounded-r bg-slate-600" />
      <div className="h-full w-full rounded-[34px] bg-gradient-to-br from-slate-400 via-slate-700 to-slate-900 p-[3px] shadow-[0_40px_80px_-24px_rgba(30,27,75,0.55)]">
        <div className="h-full w-full rounded-[31px] bg-black p-[7px]">
          <div className="relative h-full w-full overflow-hidden rounded-[25px] bg-[radial-gradient(90%_60%_at_85%_15%,rgba(45,212,191,0.55),transparent_60%),radial-gradient(90%_70%_at_10%_90%,rgba(168,85,247,0.6),transparent_60%),linear-gradient(165deg,#1e3a8a,#312e81_50%,#0f172a)] text-white">
            <span className="absolute left-1/2 top-[11px] h-[11px] w-[11px] -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10" />
            <div className="flex items-center justify-between px-[18px] pt-[10px] text-[11px] font-medium">
              <span>9:41</span>
              <span className="flex items-center gap-[5px]">
                <Wifi />
                <Signal />
                <span>87%</span>
              </span>
            </div>

            <div className="px-[20px] pt-[34px]">
              <p className="text-[56px] font-extralight leading-none tracking-tight">9:41</p>
              <p className="mt-[6px] text-[13px] font-medium text-white/85">Sat, 6 February</p>
            </div>

            <ul className="mt-[30px] grid grid-cols-4 gap-x-[6px] gap-y-[14px] px-[12px]">
              {androidApps.map((app) => (
                <li key={app.id} className="flex flex-col items-center">
                  <Image
                    src={app.icon}
                    alt=""
                    width={52}
                    height={52}
                    className="h-[52px] w-[52px] rounded-[17px] shadow-md shadow-black/30"
                  />
                  <span className="mt-[5px] w-full truncate text-center text-[9.5px] leading-tight [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
                    {androidLabel[app.id] ?? app.name}
                  </span>
                </li>
              ))}
            </ul>

            <div className="absolute inset-x-[16px] bottom-[34px] flex h-[42px] items-center gap-2 rounded-full bg-white/20 px-4 text-[12px] text-white/80 backdrop-blur-md">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.45 4.39l3.08 3.08a.75.75 0 11-1.06 1.06l-3.08-3.08A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
              Search
            </div>
            <span className="absolute bottom-[12px] left-1/2 h-[4px] w-[96px] -translate-x-1/2 rounded-full bg-white/70" />
          </div>
        </div>
      </div>
    </div>
  );
}

// February 2027 starts on a Monday; the 6th is Chinese New Year.
function MonthWidget() {
  const days = [null, ...Array.from({ length: 28 }, (_, i) => i + 1)];
  return (
    <div className="rounded-[24px] bg-white/95 px-[14px] py-[11px] text-gray-900 shadow-lg shadow-black/10">
      <div className="flex items-baseline justify-between">
        <p className="text-[11px] font-bold uppercase tracking-wide text-red-600">February</p>
        <p className="text-[10px] font-medium text-gray-500">2027</p>
      </div>
      <div className="mt-[6px] grid grid-cols-7 gap-y-[2px] text-center text-[9.5px] leading-[17px]">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <span key={i} className="font-semibold text-gray-400">
            {d}
          </span>
        ))}
        {days.map((d, i) => (
          <span
            key={i}
            className={
              d === 6
                ? 'mx-auto h-[17px] w-[17px] rounded-full bg-red-600 font-bold text-white'
                : i % 7 === 0
                  ? 'text-red-600'
                  : ''
            }
          >
            {d ?? ''}
          </span>
        ))}
      </div>
    </div>
  );
}

function IPhone() {
  return (
    <div className="hero-float absolute left-[252px] top-[58px] z-20 h-[640px] w-[300px] rotate-[5deg]">
      <span className="absolute -left-[2px] top-[118px] h-[30px] w-[4px] rounded-l bg-zinc-400" />
      <span className="absolute -left-[2px] top-[170px] h-[54px] w-[4px] rounded-l bg-zinc-400" />
      <span className="absolute -left-[2px] top-[236px] h-[54px] w-[4px] rounded-l bg-zinc-400" />
      <span className="absolute -right-[2px] top-[190px] h-[86px] w-[4px] rounded-r bg-zinc-400" />
      <span className="absolute -right-[2px] top-[390px] h-[44px] w-[4px] rounded-r bg-zinc-400" />
      <div className="h-full w-full rounded-[60px] bg-gradient-to-br from-zinc-100 via-zinc-400 to-zinc-600 p-[3px] shadow-[0_50px_90px_-20px_rgba(59,7,100,0.55)]">
        <div className="h-full w-full rounded-[57px] bg-black p-[9px]">
          <div className="relative h-full w-full overflow-hidden rounded-[48px] bg-[radial-gradient(110%_70%_at_15%_5%,rgba(244,114,182,0.75),transparent_55%),radial-gradient(90%_60%_at_95%_45%,rgba(129,140,248,0.8),transparent_60%),linear-gradient(185deg,#9333ea,#581c87_55%,#2e1065)] text-white">
            <span className="absolute left-1/2 top-[11px] h-[31px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
            <div className="flex items-center justify-between pl-[34px] pr-[30px] pt-[17px] text-[14px] font-semibold">
              <span>9:41</span>
              <span className="flex items-center gap-[5px]">
                <Signal />
                <Wifi />
                <Battery />
              </span>
            </div>

            <div className="mt-[34px] grid grid-cols-2 gap-x-[16px] px-[20px]">
              <div>
                <div className="h-[118px] rounded-[24px] bg-white/95 p-[12px] text-gray-900 shadow-lg shadow-black/10">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-red-600">Saturday</p>
                  <p className="mt-[2px] text-[38px] font-bold leading-none tracking-tight">6</p>
                  <p className="text-[10px] text-gray-500">February</p>
                  <p className="mt-[7px] text-[10px] font-semibold leading-tight text-red-600">Chinese New Year</p>
                  <p lang="zh-Hans" className="text-[9px] text-gray-500">正月初一</p>
                </div>
                <p className="mt-[5px] text-center text-[10px] font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]">
                  {lunar.name.replace(' & Holidays', '')}
                </p>
              </div>
              <div>
                <div className="h-[118px] rounded-[24px] bg-white/95 p-[12px] text-gray-900 shadow-lg shadow-black/10">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-amber-700">Expiring</p>
                  <ul className="mt-[8px] space-y-[4px] text-[10px]">
                    <li className="flex justify-between">
                      <span>Milk</span>
                      <span className="font-semibold text-amber-700">2 days</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Yogurt</span>
                      <span className="font-semibold text-amber-700">4 days</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Bread</span>
                      <span className="font-semibold text-amber-700">5 days</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Rice</span>
                      <span className="text-gray-500">6 mo</span>
                    </li>
                  </ul>
                </div>
                <p className="mt-[5px] text-center text-[10px] font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]">
                  {shelfbell.name}
                </p>
              </div>
            </div>

            <div className="mt-[14px] px-[20px]">
              <MonthWidget />
              <p className="mt-[5px] text-center text-[10px] font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]">
                {lunar.name.replace(' & Holidays', '')}
              </p>
            </div>

            <div className="absolute bottom-[118px] left-1/2 flex h-[27px] -translate-x-1/2 items-center gap-[5px] rounded-full bg-white/25 px-[13px] text-[11px] font-medium backdrop-blur-md">
              <svg width="11" height="11" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.45 4.39l3.08 3.08a.75.75 0 11-1.06 1.06l-3.08-3.08A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
              Search
            </div>

            <div className="absolute inset-x-[12px] bottom-[16px] flex h-[86px] items-center justify-evenly rounded-[36px] bg-white/25 ring-1 ring-white/35 backdrop-blur-xl">
              {iphoneApps.map((app) => (
                <Image
                  key={app.id}
                  src={app.icon}
                  alt=""
                  width={54}
                  height={54}
                  className="h-[54px] w-[54px] rounded-[13px] shadow-md shadow-black/20"
                />
              ))}
            </div>
            <span className="absolute bottom-[6px] left-1/2 h-[5px] w-[112px] -translate-x-1/2 rounded-full bg-white/85" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DeviceMockups() {
  return (
    <div className="relative h-[720px] w-[600px]">
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-purple-400/45 via-fuchsia-300/35 to-indigo-400/45 blur-3xl" />
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-300/50" />
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[470px] w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-purple-300/60" />

      <Galaxy />
      <IPhone />

      <div className="absolute right-[-6px] top-[20px] z-30 flex items-center gap-2 rounded-full bg-white/90 py-2 pl-2.5 pr-4 text-[13px] font-semibold text-gray-900 shadow-xl shadow-purple-900/15 ring-1 ring-gray-900/5 backdrop-blur">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-950 text-white">
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M3.609 1.814L13.792 12 3.609 22.186c-.181-.181-.301-.406-.301-.663V2.477c0-.257.12-.482.301-.663zm10.831 10.309l2.128-2.127L21.382 12l-4.814 2.004-2.128-2.127 1.749-1.749-10.836 6.155 9.087-5.156zm7.34-6.497l-2.066 1.066-2.127 2.127L7.298 3.322l10.289 5.301 4.193-2.997zM7.302 20.677l10.288-5.3-2.127-2.128-8.161 7.428z" />
          </svg>
        </span>
        <span className="flex h-7 w-7 -ml-3.5 items-center justify-center rounded-full bg-gray-950 text-white ring-2 ring-white">
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </svg>
        </span>
        Free on Android and iPhone
      </div>

      <Link
        href={`/${topApp.id}/`}
        className="absolute bottom-[34px] left-[-10px] z-30 flex items-center gap-3 rounded-2xl bg-white/90 py-3 pl-3 pr-5 shadow-2xl shadow-purple-900/20 ring-1 ring-gray-900/5 backdrop-blur hover:ring-purple-300 transition"
      >
        <Image src={topApp.icon} alt="" width={44} height={44} className="rounded-xl" />
        <span>
          <span className="block text-sm font-semibold text-gray-900">{topApp.name}</span>
          <span className="block text-xs text-gray-500">
            <span className="text-amber-500">★</span> {topApp.rating} · {topApp.downloads} downloads
          </span>
        </span>
      </Link>
    </div>
  );
}
