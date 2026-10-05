import Image from 'next/image';

export interface Screenshot {
  src: string;
  width: number;
  height: number;
  framed?: boolean; // the listing's image already shows the phone
}

export type Platform = 'android' | 'ios';

// A store screenshot in a phone body. The screenshots already carry the status bar and the
// camera cut-out or Dynamic Island, so the frame only draws the body and side buttons; a
// screenshot that already shows the phone is drawn as it is.
export default function PhoneFrame({
  shot,
  platform,
  alt,
  className = '',
  priority = false,
}: {
  shot: Screenshot;
  platform: Platform;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const ios = platform === 'ios';
  if (shot.framed) {
    return (
      <div className={`relative ${className}`}>
        <Image
          src={shot.src}
          alt={alt}
          width={shot.width}
          height={shot.height}
          priority={priority}
          className="block h-auto w-full drop-shadow-[0_20px_30px_rgba(59,7,100,0.35)]"
        />
      </div>
    );
  }
  return (
    <div className={`relative ${className}`}>
      {/* side buttons */}
      <span
        aria-hidden="true"
        className={`absolute -right-[3px] top-[22%] h-[12%] w-[3px] rounded-r ${ios ? 'bg-zinc-400' : 'bg-gray-700'}`}
      />
      <span
        aria-hidden="true"
        className={`absolute -left-[3px] top-[18%] h-[7%] w-[3px] rounded-l ${ios ? 'bg-zinc-400' : 'bg-gray-700'}`}
      />
      {ios && (
        <span aria-hidden="true" className="absolute -left-[3px] top-[27%] h-[7%] w-[3px] rounded-l bg-zinc-400" />
      )}
      <div
        className={
          ios
            ? 'rounded-[2.4rem] bg-zinc-900 p-[7px] ring-[3px] ring-zinc-300 shadow-2xl shadow-purple-950/30'
            : 'rounded-[1.9rem] bg-gray-950 p-[6px] ring-1 ring-gray-700 shadow-2xl shadow-purple-950/30'
        }
      >
        <div className={`overflow-hidden bg-white ${ios ? 'rounded-[2rem]' : 'rounded-[1.55rem]'}`}>
          <Image
            src={shot.src}
            alt={alt}
            width={shot.width}
            height={shot.height}
            priority={priority}
            className="block h-auto w-full"
          />
        </div>
      </div>
    </div>
  );
}
