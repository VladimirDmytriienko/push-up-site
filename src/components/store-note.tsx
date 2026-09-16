import Image from "next/image";

import { APP_NAME, APP_STORE_URL } from "@/lib/site";

/**
 * Where to get it.
 *
 * The badge is Apple's own artwork from their marketing tools, unmodified, as their
 * guidelines require. It is served from this site rather than hotlinked from Apple's, so
 * that opening the page sends no request to anyone but this site.
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
        <p className="display text-2xl uppercase sm:text-3xl">{APP_NAME}</p>
        <a
          href={APP_STORE_URL}
          className="mt-3 inline-flex rounded-lg focus-visible:outline-2 focus-visible:outline-amber focus-visible:outline-offset-4"
        >
          {/* 44px tall: above Apple's 40px minimum for the badge, and a comfortable tap. */}
          <Image
            src="/app-store-badge.svg"
            alt={`Download ${APP_NAME} on the App Store`}
            width={120}
            height={40}
            unoptimized
            className="h-11 w-auto"
          />
        </a>
        {/* The requirement belongs beside the button someone is about to press, not buried
            on the support page where nobody looks before downloading. */}
        <p className="mono mt-3 text-[10px] text-fg-tertiary">Requires an iPhone with Face ID</p>
      </div>
    </div>
  );
}
