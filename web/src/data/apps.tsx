import type { ReactNode } from 'react';

export type Policy =
  | { kind: 'calendar'; settings: string }
  | { kind: 'lunar' }
  | { kind: 'loan'; stored: string; exportFiles: boolean }
  | { kind: 'shelfbell' };

export interface App {
  id: string; // URL slug: /<id>/ is the app page, /<id>/privacy.html its policy
  name: string;
  description: string;
  icon: string;
  url?: string; // Google Play listing, when the app is published on Android
  appStoreUrl?: string; // App Store listing, when the app is published on iOS
  comingSoon?: string; // shown instead of store badges before release
  rating: string;
  downloads: string;
  reviews: string;
  countries: string[]; // ISO 3166-1 alpha-2 codes of the markets the app serves
  category: string;
  seo: { title: string; description: string }; // <title> and meta description
  tagline: string;
  platforms: string;
  intro: ReactNode;
  features: ReactNode[];
  sections?: { heading: string; body: ReactNode }[];
  languages: string;
  privacy: string;
  note?: string;
  policy: Policy;
  updated: string; // privacy policy date
}

const L = (lang: string, text: string) => <span lang={lang}>{text}</span>;

const EVENTS = 'Your own calendar events on the matching days, if you allow it';
const WIDGET = 'A home screen widget showing today';
const CAL_PRIVACY =
  'No account and no sign-up. The holiday data is built into the app, and your settings stay on ' +
  'your phone. Calendar access is optional. The app shows ads from Google AdMob.';
const CAL_NOTE =
  'Not a government app. Holiday dates can be changed by the authorities after the app is ' +
  'updated, so check official announcements for anything important.';
const LOAN_PRIVACY =
  'No account and no sign-up. Your calculations stay on your phone; the only request the app ' +
  'makes by itself is for the policy rate Bank Negara Malaysia publishes. The app shows ads from ' +
  'Google AdMob.';
const LOAN_NOTE = "Figures are estimates. Your bank's offer is final.";
const UPDATED = '30 September 2026';

const play = (id: string) => `https://play.google.com/store/apps/details?id=${id}`;

export const apps: App[] = [
  {
    id: 'malaysia-calendar',
    seo: {
      title: 'Malaysia Calendar: Public & School Holidays, Cuti Sekolah',
      description:
        'Malaysian public and school holidays by state (cuti umum, cuti sekolah), long weekends, jadual gaji, and Chinese lunar, Hijri and Tamil calendars. Free on Android.',
    },
    name: 'Malaysia Calendar',
    description:
      'Plan your year with the Malaysia Calendar app, featuring public holidays, zodiac insights, and cultural events.',
    icon: '/app-icons/malaysia-calendar.webp',
    url: play('org.jm.malaysiahorsecalendar'),
    rating: '4.4',
    downloads: '500K+',
    reviews: '1.46K',
    countries: ['my'],
    category: 'Calendar',
    tagline: 'Malaysian holidays, school holidays and lunar calendar.',
    platforms: 'Android',
    intro:
      'Malaysia Calendar shows public and school holidays for your state, long weekends, and the ' +
      'Chinese lunar, Hijri and Tamil calendars side by side. The holiday data is built into the ' +
      'app, so it works offline.',
    features: [
      'Public and school holidays (cuti umum, cuti sekolah), filtered by state',
      'Long weekend planner, including states with a Friday and Saturday weekend',
      'Salary and pension payment dates (jadual gaji)',
      'Horse racing days',
      'Chinese lunar calendar and Tong Shing almanac',
      'Hijri dates, Takwim and Islamic dates; Tamil calendar',
      'Zodiac year outlook',
      EVENTS,
      WIDGET,
    ],
    languages: 'English, Bahasa Melayu and Simplified Chinese.',
    privacy: CAL_PRIVACY,
    note: CAL_NOTE,
    policy: { kind: 'calendar', settings: 'language, state and weekend days' },
    updated: UPDATED,
  },
  {
    id: 'singapore-calendar',
    seo: {
      title: 'Singapore Calendar: Public & School Holidays, Lunar Dates',
      description:
        'Singapore public holidays, MOE school holidays and long weekends, with Chinese lunar dates, a Tong Shing almanac, and Hijri and Tamil calendars. Free on Android.',
    },
    name: 'Singapore Calendar',
    description:
      "Navigate Singapore's holidays and zodiac traditions with the Singapore Calendar app.",
    icon: '/app-icons/singapore-calendar.webp',
    url: play('org.kf.singaporehorsecalendar'),
    rating: '4.5',
    downloads: '50k+',
    reviews: '232',
    countries: ['sg'],
    category: 'Calendar',
    tagline: 'Singapore holidays, school holidays and lunar calendar.',
    platforms: 'Android',
    intro:
      'Singapore Calendar shows public and school holidays, long weekends, and lunar dates with a ' +
      'Tong Shing almanac. The holiday data is built into the app, so it works offline.',
    features: [
      'Singapore public holidays',
      'MOE school holidays',
      'Long weekend planner',
      'Chinese lunar calendar and Tong Shing almanac',
      'Hijri dates and Tamil calendar',
      'Horse racing days',
      'Zodiac year outlook',
      EVENTS,
      WIDGET,
    ],
    languages: 'English, Bahasa Melayu and Simplified Chinese.',
    privacy: CAL_PRIVACY,
    note: CAL_NOTE,
    policy: { kind: 'calendar', settings: 'language and weekend days' },
    updated: UPDATED,
  },
  {
    id: 'kalendar-hijrah',
    seo: {
      title: 'Kalendar Hijrah Malaysia: Takwim, Islamic Dates & Cuti Umum',
      description:
        'The Hijri date every day, the Takwim by state and Islamic dates, with Malaysian public and school holidays, jadual gaji and long weekends. Free on Android.',
    },
    name: 'Kalendar Hijrah Malaysia',
    description:
      'Kalendar Hijrah Malaysia offers precise Hijrah dates, the Takwim, and Islamic events for Malaysian Muslims.',
    icon: '/app-icons/kalendar-hijrah.webp',
    url: play('org.jm.kalendarhijrahmalaysia'),
    rating: '4.3',
    downloads: '50K+',
    reviews: '164',
    countries: ['my'],
    category: 'Calendar',
    tagline: 'Hijri calendar, Takwim and Malaysian holidays.',
    platforms: 'Android',
    intro:
      'Kalendar Hijrah Malaysia puts the Hijri date on every day, with the Takwim for your state, ' +
      'important Islamic dates, and Malaysian public and school holidays.',
    features: [
      'Hijri date on every day, with Malay month names',
      'Takwim table by state',
      'Important Islamic dates',
      'Public and school holidays, filtered by state',
      'Salary and pension payment dates (jadual gaji)',
      'Long weekend planner',
      'Chinese lunar and Tamil calendars, and an almanac',
      EVENTS,
      WIDGET,
    ],
    languages: 'English, Bahasa Melayu and Simplified Chinese.',
    privacy: CAL_PRIVACY,
    note: CAL_NOTE,
    policy: { kind: 'calendar', settings: 'language, state and weekend days' },
    updated: UPDATED,
  },
  {
    id: 'housing-loan-calculator',
    seo: {
      title: 'Housing Loan Calculator Malaysia: Instalment & Stamp Duty',
      description:
        'Malaysian home loan instalment, SPA and loan stamp duty, legal fees and the full payment schedule, with the rate from Bank Negara\'s OPR. Free on Android and iPhone.',
    },
    name: 'Housing Loan Calculator',
    description:
      'Simplify home financing with the Housing Loan Calculator app, estimating payments and interest rates.',
    icon: '/app-icons/housing-loan-calculator.webp',
    url: play('com.houseloancalculator'),
    appStoreUrl: 'https://apps.apple.com/my/app/housing-loan-calculator-my/id6806969416',
    rating: '4.4',
    downloads: '10K+',
    reviews: '47',
    countries: ['my'],
    category: 'Calculator',
    tagline: 'Home loan instalments, stamp duty and legal fees for Malaysia.',
    platforms: 'Android and iPhone',
    intro:
      'Housing Loan Calculator works out the monthly instalment on a Malaysian home loan, with ' +
      'stamp duty, legal fees and the full payment schedule, before you sign.',
    features: [
      'Monthly instalment on a standard home loan',
      'Stamp duty and legal fees for the sale and purchase agreement and the loan, and the total cash needed upfront',
      "Interest rate pre-filled from Bank Negara Malaysia's Overnight Policy Rate",
      'Payment schedule by year or by month, with charts',
      'Extra repayments: a monthly top-up or a one-off lump sum',
      'Affordability by debt service ratio',
      'Every calculation saved to history, with favourites',
    ],
    languages: 'English, Bahasa Melayu and Simplified Chinese.',
    privacy: LOAN_PRIVACY,
    note: LOAN_NOTE,
    policy: {
      kind: 'loan',
      stored: 'property price, down payment, loan term, interest rate, fees and results',
      exportFiles: false,
    },
    updated: UPDATED,
  },
  {
    id: 'thailand-calendar',
    seo: {
      title: 'Thailand Calendar (ปฏิทินประเทศไทย): Thai Holidays & Lunar Dates',
      description:
        'Thai public holidays and long weekends, the Thai lunar calendar with the Buddhist Era year, a Thai almanac, and Chinese lunar and Hijri dates. Free on Android.',
    },
    name: 'Thailand Calendar',
    description:
      'Plan your year with the Thailand Calendar app, featuring public holidays, zodiac insights, and cultural events.',
    icon: '/app-icons/thailand-calendar.webp',
    url: play('org.kf.thaicalendar'),
    rating: '-',
    downloads: '1K+',
    reviews: '-',
    countries: ['th'],
    category: 'Calendar',
    tagline: 'Thai holidays and the Thai lunar calendar.',
    platforms: 'Android',
    intro: (
      <>
        Thailand Calendar ({L('th', 'ปฏิทินประเทศไทย')}) shows Thai public holidays, long weekends,
        and the Thai lunar calendar with the Buddhist Era year, alongside Chinese lunar and Hijri
        dates.
      </>
    ),
    features: [
      'Thai public holidays',
      'Long weekend planner',
      <>
        Thai lunar calendar with the Buddhist Era year, and a Thai almanac ({L('th', 'โหร')}) page
      </>,
      'Chinese lunar dates and a Tong Shing almanac',
      'Hijri date in the month view',
      'Zodiac year outlook',
      EVENTS,
      WIDGET,
    ],
    languages: 'Thai, English, Bahasa Melayu, Burmese and Simplified Chinese.',
    privacy: CAL_PRIVACY,
    note: CAL_NOTE,
    policy: { kind: 'calendar', settings: 'language and weekend days' },
    updated: UPDATED,
  },
  {
    id: 'vietnamese-calendar',
    seo: {
      title: 'Vietnamese Calendar (Lịch Vạn Niên): Holidays, Tết & Âm Lịch',
      description:
        'Vietnamese public holidays and the Tết break, long weekends, and the lunar calendar (âm lịch) with can chi and a traditional almanac. Free on Android.',
    },
    name: 'Vietnamese Calendar',
    description:
      'Stay ahead with Vietnamese Calendar - the most comprehensive and feature-rich calendar designed specifically for Vietnamese!',
    icon: '/app-icons/vietnamese-calendar.webp',
    url: play('org.kf.vietnamesecalendar'),
    rating: '-',
    downloads: '100+',
    reviews: '-',
    countries: ['vn'],
    category: 'Calendar',
    tagline: 'Vietnamese holidays, Tết and the lunar calendar.',
    platforms: 'Android',
    intro: (
      <>
        Vietnamese Calendar ({L('vi', 'Lịch Vạn Niên - Âm Lịch')}) shows public holidays and the
        Tết break, long weekends, and the Vietnamese lunar calendar with can chi and a traditional
        almanac.
      </>
    ),
    features: [
      'Public holidays and the Tết break',
      'Long weekend planner',
      'Vietnamese lunar calendar, with the Chinese lunar date alongside',
      'Can chi year and zodiac, with the Cat as the fourth sign',
      'Vietnamese and Chinese almanac pages',
      'Hijri date on every day',
      'Zodiac year outlook',
      EVENTS,
      WIDGET,
    ],
    languages: 'Vietnamese, English, Bahasa Melayu and Simplified Chinese.',
    privacy: CAL_PRIVACY,
    note: CAL_NOTE,
    policy: { kind: 'calendar', settings: 'language and weekend days' },
    updated: UPDATED,
  },
  {
    id: 'hong-kong-calendar',
    seo: {
      title: 'Hong Kong Calendar (香港月曆): Holidays & Lunar Calendar',
      description:
        'Hong Kong general holidays, school holidays and long weekends, with lunar dates (農曆), the 24 solar terms and a Tong Shing almanac (通勝). Free on Android.',
    },
    name: 'Hong Kong Calendar',
    description:
      'Hong Kong public holidays, lunar dates (農曆), school terms, and local festivals — fully offline in English, Traditional, and Simplified Chinese, with no sign-up needed.',
    icon: '/app-icons/hong-kong-calendar.webp',
    url: play('org.kf.hongkongcalendar'),
    rating: '-',
    downloads: '10+',
    reviews: '-',
    countries: ['hk'],
    category: 'Calendar',
    tagline: 'Hong Kong holidays, school holidays and lunar calendar.',
    platforms: 'Android',
    intro: (
      <>
        Hong Kong Calendar ({L('zh-Hant-HK', '香港月曆')}) shows general holidays, school holidays,
        long weekends and lunar dates ({L('zh-Hant-HK', '農曆')}) with the solar terms and a Tong
        Shing almanac.
      </>
    ),
    features: [
      'General holidays',
      'School holidays',
      'Long weekend planner',
      'Lunar calendar in Traditional Chinese, with the 24 solar terms',
      <>Tong Shing almanac ({L('zh-Hant-HK', '通勝')})</>,
      'Hijri date',
      'Zodiac year outlook',
      EVENTS,
      WIDGET,
    ],
    languages: 'Traditional Chinese, Simplified Chinese and English.',
    privacy: CAL_PRIVACY,
    note: CAL_NOTE,
    policy: { kind: 'calendar', settings: 'language and weekend days' },
    updated: UPDATED,
  },
  {
    id: 'taiwan-calendar',
    seo: {
      title: 'Taiwan Calendar (台灣月曆): Holidays, Make-up Days & Lunar',
      description:
        'Taiwan national holidays and make-up workdays, long weekends and school breaks, with the lunar calendar, ROC (民國) year and farmer\'s almanac (農民曆). Free on Android.',
    },
    name: 'Taiwan Calendar',
    description:
      "Taiwan's official public holidays, make-up workdays, and long weekends at a glance — with the lunar calendar, 24 solar terms, school breaks, and your own calendar events, in English and Traditional Chinese.",
    icon: '/app-icons/taiwan-calendar.webp',
    url: play('org.kf.taiwancalendar'),
    rating: '-',
    downloads: '10+',
    reviews: '-',
    countries: ['tw'],
    category: 'Calendar',
    tagline: 'Taiwan holidays, make-up workdays and lunar calendar.',
    platforms: 'Android',
    intro: (
      <>
        Taiwan Calendar ({L('zh-Hant-TW', '台灣月曆')}) shows national holidays with make-up
        workdays, long weekends and school breaks, with the lunar calendar and the ROC (
        {L('zh-Hant-TW', '民國')}) year.
      </>
    ),
    features: [
      'National holidays and make-up workdays',
      'Long weekend planner',
      'School breaks',
      <>ROC ({L('zh-Hant-TW', '民國')}) year next to the Western year</>,
      'Lunar calendar in Traditional Chinese',
      <>Farmer&apos;s almanac ({L('zh-Hant-TW', '農民曆')})</>,
      'Zodiac year outlook',
      EVENTS,
      WIDGET,
    ],
    languages: 'Traditional Chinese, Simplified Chinese and English.',
    privacy: CAL_PRIVACY,
    note: CAL_NOTE,
    policy: { kind: 'calendar', settings: 'language and weekend days' },
    updated: UPDATED,
  },
  {
    id: 'south-korea-calendar',
    seo: {
      title: 'South Korea Calendar (한국 달력): Holidays & Lunar Dates',
      description:
        'Korean public and substitute holidays (대체공휴일), long weekends and school holidays, with Korean and Chinese lunar dates and a 만세력 almanac. Free on Android.',
    },
    name: 'South Korea Calendar',
    description:
      "South Korea's public and substitute holidays with solar and lunar dates side by side — spot long weekends, follow school breaks, and keep Seollal, Chuseok, and more on a home-screen widget.",
    icon: '/app-icons/south-korea-calendar.webp',
    url: play('org.kf.southkoreacalendar'),
    rating: '-',
    downloads: '-',
    reviews: '-',
    countries: ['kr'],
    category: 'Calendar',
    tagline: 'Korean holidays, substitute holidays and lunar calendar.',
    platforms: 'Android',
    intro: (
      <>
        South Korea Calendar ({L('ko', '한국 달력')}) shows public holidays and substitute
        holidays, long weekends and school holidays, with Korean and Chinese lunar dates on every
        day.
      </>
    ),
    features: [
      <>Public holidays and substitute holidays ({L('ko', '대체공휴일')})</>,
      'Long weekend planner',
      'School holiday dates',
      'Korean and Chinese lunar dates on every day, with ganzhi and zodiac',
      <>Korean almanac ({L('ko', '만세력')}) and Chinese almanac pages</>,
      'Zodiac year outlook',
      EVENTS,
      WIDGET,
    ],
    languages: 'Korean, English and Simplified Chinese.',
    privacy: CAL_PRIVACY,
    note: CAL_NOTE,
    policy: { kind: 'calendar', settings: 'language and weekend days' },
    updated: UPDATED,
  },
  {
    id: 'indonesia-calendar',
    seo: {
      title: 'Indonesia Calendar (Kalender Indonesia): Holidays & Cuti Bersama',
      description:
        'Indonesian national holidays and cuti bersama, school holidays by province, long weekends, the Javanese pasaran, and Hijri and Chinese lunar dates. Free on Android.',
    },
    name: 'Indonesia Calendar',
    description:
      "Indonesia's national holidays and cuti bersama, plus school breaks and regional holidays for all 38 provinces — with Hijri dates, a zoomable yearly almanac, and a long-weekend finder.",
    icon: '/app-icons/indonesia-calendar.webp',
    url: play('org.kf.indonesiacalendar'),
    rating: '-',
    downloads: '-',
    reviews: '-',
    countries: ['id'],
    category: 'Calendar',
    tagline: 'Indonesian holidays, cuti bersama and Javanese calendar.',
    platforms: 'Android',
    intro: (
      <>
        Indonesia Calendar ({L('id', 'Kalender Indonesia')}) shows national holidays and cuti
        bersama, school holidays by province, long weekends, and the Javanese, Hijri and Chinese
        lunar calendars.
      </>
    ),
    features: [
      'National holidays, cuti bersama and provincial anniversaries',
      'School holidays, filtered by province',
      'Long weekend planner',
      'Javanese date and pasaran',
      'Hijri date, a yearly Takwim table and Islamic dates',
      'Chinese lunar calendar, almanac and zodiac outlook',
      EVENTS,
      WIDGET,
    ],
    languages: 'Bahasa Indonesia, English and Simplified Chinese.',
    privacy: CAL_PRIVACY,
    note: CAL_NOTE,
    policy: { kind: 'calendar', settings: 'language, province and weekend days' },
    updated: UPDATED,
  },
  {
    id: 'australia-calendar',
    seo: {
      title: 'Australia Calendar: Public Holidays & School Terms by State',
      description:
        'Australian public holidays and government school terms for every state and territory, long weekends, and the Chinese lunar calendar with an almanac. Free on Android.',
    },
    name: 'Australia Calendar',
    description:
      'Public holidays and government school terms for every state and territory, long weekends, and the Chinese lunar calendar with an almanac.',
    icon: '/app-icons/australia-calendar.webp',
    url: play('org.kf.australiacalendar'),
    rating: '-',
    downloads: '-',
    reviews: '-',
    countries: ['au'],
    category: 'Calendar',
    tagline: 'Australian public holidays and school terms by state.',
    platforms: 'Android',
    intro:
      'Australia Calendar shows public holidays and government school terms for your state or ' +
      'territory, long weekends, and the Chinese lunar calendar.',
    features: [
      'Public holidays by state or territory, including substitute days',
      'Government school terms for each state',
      'Long weekend planner',
      'Chinese lunar calendar, with ganzhi, zodiac and solar terms',
      'Chinese almanac page, in English or Chinese',
      'Zodiac year outlook',
      EVENTS,
      WIDGET,
    ],
    languages: 'English and Simplified Chinese.',
    privacy: CAL_PRIVACY,
    note: CAL_NOTE,
    policy: { kind: 'calendar', settings: 'language, state or territory and weekend days' },
    updated: UPDATED,
  },
  {
    id: 'car-loan-calculator',
    seo: {
      title: 'Car Loan Calculator Malaysia: Instalment, Road Tax & Insurance',
      description:
        'Malaysian car loan instalment, JPJ road tax, motor insurance and affordability after EPF, SOCSO and PCB, with loans compared side by side. Free on Android and iPhone.',
    },
    name: 'Car Loan Calculator MY',
    description:
      'Malaysia car loan, HP, road tax, insurance & affordability calculator for ICE & EV Vehicles. Calculate monthly payments, interest rates, and total costs for your car financing needs.',
    icon: '/app-icons/car-loan-calculator.webp',
    url: play('org.kf.carloancalculatormalaysia'),
    appStoreUrl: 'https://apps.apple.com/my/app/car-loan-calculator-my/id6806989718',
    rating: '-',
    downloads: '-',
    reviews: '-',
    countries: ['my'],
    category: 'Calculator',
    tagline: 'Car loan, road tax and insurance for Malaysia.',
    platforms: 'Android and iPhone',
    intro:
      'Car Loan Calculator MY works out the monthly payment on a Malaysian car loan, with road ' +
      'tax, insurance and how much you can afford. No sign-up, and it works offline.',
    features: [
      'Monthly instalment for a flat-rate or variable-rate loan of 12 to 108 months, with the full payment schedule',
      "Variable rate based on Bank Negara Malaysia's Overnight Policy Rate",
      'Compare up to three loans side by side, and export the comparison as a PDF or image',
      'Affordability: take-home pay after EPF, SOCSO, EIS and PCB, then the largest instalment, loan and car price you can manage',
      'JPJ road tax for petrol, diesel and electric cars, for Peninsular Malaysia or Sabah, Sarawak and Labuan',
      'Motor insurance estimate with no-claim discount, add-ons and a takaful option',
      'Every calculation saved to history, with favourites',
    ],
    languages: 'English, Bahasa Melayu and Simplified Chinese.',
    privacy: LOAN_PRIVACY,
    note: LOAN_NOTE,
    policy: {
      kind: 'loan',
      stored: 'car price, down payment, loan term, interest rate, vehicle details and results',
      exportFiles: true,
    },
    updated: UPDATED,
  },
  {
    id: 'lunar-calendar',
    seo: {
      title: 'Lunar Calendar & Holidays for iPhone: Asia and Australia',
      description:
        'Public holidays, school breaks and long weekends for Malaysia, Singapore, Indonesia, Thailand, Vietnam, Hong Kong, Taiwan, South Korea and Australia. Free on iPhone.',
    },
    name: 'Lunar Calendar & Holidays',
    description:
      'One calendar for nine countries — pick yours and get every public holiday, school break, and long weekend worth booking leave for, with the lunar date daily and a Chinese almanac. No sign-up.',
    icon: '/app-icons/lunar-calendar.webp',
    appStoreUrl: 'https://apps.apple.com/us/app/lunar-calendar-holidays/id6806542405',
    rating: '-',
    downloads: '-',
    reviews: '-',
    countries: ['my', 'sg', 'id', 'th', 'vn', 'hk', 'tw', 'kr', 'au'],
    category: 'Calendar',
    tagline: 'Holidays and lunar dates for nine countries.',
    platforms: 'iPhone',
    intro:
      'Lunar Calendar & Holidays is one calendar for nine countries: Malaysia, Singapore, ' +
      'Indonesia, Thailand, Vietnam, Hong Kong, Taiwan, South Korea and Australia. Pick your ' +
      'country to see its public holidays, school breaks and long weekends, with the lunar date on ' +
      'every day.',
    features: [
      'Nine countries in one app, chosen in Settings',
      'Public holidays, with a state or province filter for Malaysia, Indonesia and Australia',
      'School holidays and a long weekend planner',
      'The Chinese lunar date every day, plus Hijri, Tamil, Javanese, Thai, Vietnamese and Korean dates where they apply',
      <>
        Chinese almanac ({L('zh-Hant', '通勝')}), and Korean, Vietnamese and Thai almanac pages
      </>,
      'Zodiac year outlook',
      EVENTS,
      WIDGET,
    ],
    languages:
      'English, Bahasa Indonesia, Bahasa Melayu, Burmese, Korean, Thai, Vietnamese, Simplified Chinese and Traditional Chinese.',
    privacy:
      'No account and no sign-up. Location is asked for once, only to choose your country, and ' +
      'calendar access is optional. The app shows ads from Google AdMob and never asks to track you.',
    note: CAL_NOTE,
    policy: { kind: 'lunar' },
    updated: UPDATED,
  },
  {
    id: 'shelfbell',
    seo: {
      title: 'Shelfbell: Expiry Date Reminder for Food & Medicine',
      description:
        'Track the expiry dates of food, medicine and more. Scan the barcode or the label and get one reminder a day before things expire. No sign-up. For Android and iPhone.',
    },
    name: 'Shelfbell',
    description:
      'Expiry date reminders for food, medicine and anything else on your shelf. Scan the barcode or the label, and get one reminder a day before things run out.',
    icon: '/app-icons/shelfbell.png',
    comingSoon: 'Coming soon to Google Play and the App Store',
    rating: '-',
    downloads: '-',
    reviews: '-',
    countries: [],
    category: 'Reminder',
    tagline: 'Expiry date reminders for food, medicine and more.',
    platforms: 'Android and iPhone',
    intro:
      'Shelfbell keeps track of expiry dates for food, medicine and anything else on your shelf, ' +
      'and reminds you before they run out. Add items by hand, by scanning a barcode, or by ' +
      'photographing the label; the label is read on your phone.',
    features: [
      'Scan the barcode: items you added before fill themselves in',
      'Scan the label: the expiry and manufacture dates are read on the phone, and you check them first',
      'Expiry worked out from the manufacture date and shelf life',
      'One reminder a day at the time you choose, 7, 3 or 1 days before, or any days you like',
      'Opened items too: "use within 12 months after opening"',
      'Search, filter by category and sort by expiry date',
      'Back up everything, photos included, to one file, with an optional password',
      'Optional sync between your phones through your own Google Drive',
    ],
    sections: [
      {
        heading: 'Google Drive (optional)',
        body:
          'If you connect Google Drive, Shelfbell keeps a copy of your items, photos and settings ' +
          'in a hidden folder in your own Drive, so they stay in step across your phones and can be ' +
          'restored. The app asks only for access to that folder (drive.appdata). It cannot see ' +
          'your other files, and we run no server of our own.',
      },
    ],
    languages: 'English, Bahasa Melayu and Simplified Chinese.',
    privacy:
      'No account and no sign-up. Your items stay on your phone; Google Drive is optional and uses ' +
      'only a hidden folder in your own Drive. The app shows ads from Google AdMob.',
    policy: { kind: 'shelfbell' },
    updated: '29 September 2026',
  },
];

export const findApp = (id: string) => apps.find((a) => a.id === id);
