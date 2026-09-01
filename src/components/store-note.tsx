import Image from "next/image";

import { APP_NAME } from "@/lib/site";

/**
 * Where to find it, stated plainly.
 *
 * Deliberately NOT Apple's "Download on the App Store" badge. That badge is Apple's own
 * artwork, to be taken from their marketing resources and used unmodified — and putting it
 * here now would claim the app is already downloadable, which it is not. This says what is
 * true today; when the app is live it becomes the real badge with a real link.
 */
export function StoreNote() {
  return (
    <div className="flex items-center gap-5 rounded-3xl border border-rule bg-[var(--panel)] p-6 sm:p-7">
      <Image
        src="/app-icon.png"
        alt={`The ${APP_NAME} app icon`}
        width={1024}
        height={1024}
        sizes="72px"
        className="h-16 w-16 shrink-0 rounded-[1.1rem] sm:h-[72px] sm:w-[72px]"
      />
      <div className="min-w-0">
        <p className="mono text-[10px] text-fg-tertiary">Coming to the App Store</p>
        <p className="display mt-1.5 text-2xl uppercase sm:text-3xl">{APP_NAME}</p>
        <p className="mt-2 text-sm text-fg-secondary">
          Search that name once it is live.
        </p>
      </div>
    </div>
  );
}
