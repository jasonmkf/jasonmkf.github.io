import type { MetadataRoute } from 'next';
import { apps } from '@/data/apps';
import { SITE } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['/', '/apps/', '/about/', '/contact/'];
  return [
    ...pages.map((path) => ({ url: `${SITE}${path}` })),
    ...apps.flatMap((app) => [
      { url: `${SITE}/${app.id}/` },
      { url: `${SITE}/${app.id}/privacy.html` },
    ]),
  ];
}
