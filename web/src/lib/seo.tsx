import type { Metadata } from 'next';
import type { App } from '@/data/apps';

export const SITE = 'https://jasonmkf.github.io';
export const PLAY_DEVELOPER = 'https://play.google.com/store/apps/dev?id=8791158212658173660';
export const APP_STORE_DEVELOPER = 'https://apps.apple.com/us/developer/kek-fu-mun/id6804686923';

export const SITE_DESCRIPTION =
  'Free Android and iPhone apps from KF Production: public holiday calendars for Malaysia, ' +
  'Singapore, Indonesia, Thailand, Vietnam, Hong Kong, Taiwan, South Korea and Australia, and ' +
  'Malaysian loan calculators.';

const ORG_ID = `${SITE}/#organization`;

// Canonical URL, description, Open Graph and Twitter card for one page. Next replaces rather
// than merges openGraph between layout and page, so every page sets all of it here.
export function pageMetadata({
  title,
  description,
  path,
  image = '/og/site.jpg',
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  absoluteTitle?: boolean;
}): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: 'KF Production',
      locale: 'en_US',
      title,
      description,
      url: path,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

const operatingSystem = (app: App) =>
  [app.platforms.includes('Android') && 'Android', app.platforms.includes('iPhone') && 'iOS']
    .filter(Boolean)
    .join(', ');

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: 'KF Production',
        url: `${SITE}/`,
        logo: `${SITE}/kf-production-logo.png`,
        email: 'jasonmkf2@gmail.com',
        foundingDate: '2015',
        sameAs: [PLAY_DEVELOPER, APP_STORE_DEVELOPER],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE}/#website`,
        url: `${SITE}/`,
        name: 'KF Production',
        inLanguage: 'en',
        publisher: { '@id': ORG_ID },
      },
    ],
  };
}

export function appJsonLd(app: App) {
  const stores = [app.url, app.appStoreUrl].filter((u): u is string => Boolean(u));
  return {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: app.name,
    description: app.seo.description,
    url: `${SITE}/${app.id}/`,
    image: `${SITE}${app.icon}`,
    operatingSystem: operatingSystem(app),
    applicationCategory: app.category === 'Calculator' ? 'FinanceApplication' : 'UtilitiesApplication',
    publisher: { '@type': 'Organization', '@id': ORG_ID, name: 'KF Production', url: `${SITE}/` },
    ...(stores.length > 0 && {
      installUrl: stores[0],
      sameAs: stores,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    }),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE}${item.path}`,
    })),
  };
}

export function appListJsonLd(apps: App[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'KF Production apps',
    itemListElement: apps.map((app, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: app.name,
      url: `${SITE}/${app.id}/`,
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
