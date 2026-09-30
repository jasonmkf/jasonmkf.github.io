import Image from 'next/image';

interface StoreBadgesProps {
  name: string;
  url?: string;
  appStoreUrl?: string;
  className?: string;
  badgeClassName?: string;
}

export default function StoreBadges({
  name,
  url,
  appStoreUrl,
  className = 'flex flex-wrap items-center gap-2',
  badgeClassName = 'w-[135px] h-auto',
}: StoreBadgesProps) {
  return (
    <div className={className}>
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block hover:opacity-90 transition-opacity"
        >
          <Image
            src="/google-play-badge.png"
            alt={`Get ${name} on Google Play`}
            width={270}
            height={80}
            className={badgeClassName}
          />
        </a>
      )}
      {appStoreUrl && (
        <a
          href={appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block hover:opacity-90 transition-opacity"
        >
          <Image
            src="/app-store-badge.svg"
            alt={`Download ${name} on the App Store`}
            width={120}
            height={40}
            className={badgeClassName}
          />
        </a>
      )}
    </div>
  );
}
