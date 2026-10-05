import type { MetadataRoute } from 'next';
import { allApps } from '@/data/apps';
import { countries, HOLIDAY_YEARS, holidayPath } from '@/data/holidays';
import { SITE } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['/', '/apps/', '/holidays/', '/about/', '/contact/'];
  return [
    ...pages.map((path) => ({ url: `${SITE}${path}` })),
    ...allApps.flatMap((app) => [
      { url: `${SITE}/${app.id}/` },
      { url: `${SITE}/${app.id}/privacy.html` },
    ]),
    ...countries.flatMap((c) =>
      HOLIDAY_YEARS.flatMap((year) =>
        (c.hasSchool ? (['calendar', 'public', 'school'] as const) : (['calendar', 'public'] as const)).map(
          (view) => ({ url: `${SITE}${holidayPath(c, view, year)}` }),
        ),
      ),
    ),
  ];
}
