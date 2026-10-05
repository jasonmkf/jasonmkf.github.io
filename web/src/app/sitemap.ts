import type { MetadataRoute } from 'next';
import { allApps } from '@/data/apps';
import { countries, HOLIDAY_YEARS, holidayPath, viewsFor } from '@/data/holidays';
import { SITE } from '@/lib/seo';
import { systemPath } from '@/components/CalendarSystemPage';

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
        viewsFor(c, year).map((view) => ({ url: `${SITE}${holidayPath(c, view, year)}` })),
      ),
    ),
    ...HOLIDAY_YEARS.flatMap((year) =>
      (['lunar', 'hijri'] as const).map((s) => ({ url: `${SITE}${systemPath(s, year)}` })),
    ),
  ];
}
