import Link from 'next/link';
import { breadcrumbJsonLd, JsonLd } from '@/lib/seo';

export default function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const trail = [{ name: 'Home', path: '/' }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-purple-300">
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <ol className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1">
        {trail.map((item, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-purple-100">
                  {item.name}
                </span>
              ) : (
                <>
                  {/* privacy.html is not a Next route, so it gets a plain link */}
                  {item.path.endsWith('.html') ? (
                    <a href={item.path} className="hover:text-white transition-colors">
                      {item.name}
                    </a>
                  ) : (
                    <Link href={item.path} className="hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  )}
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
