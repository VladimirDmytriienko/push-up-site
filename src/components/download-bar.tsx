"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { APP_NAME, APP_STORE_URL } from "@/lib/site";

/** The hero's download button: while it is on screen, the bar steps aside for it. */
export const STORE_ANCHOR_ID = "get";

/**
 * A download button that is always in reach.
 *
 * Once the hero's button scrolls away, nothing on the page links to the store until the
 * footer. This bar fills that gap: pinned to the bottom edge on every size of screen, and
 * stepping aside only while the hero's button is itself in view, so there is always exactly
 * one way to download showing.
 *
 * It renders visible. JavaScript only ever hides it, and only while the hero's button is
 * showing — so a page without scripts still has a download button on every screen.
 */
export function DownloadBar() {
  const [hidden, setHidden] = useState(false);
  // No transition for the first answer: a bar that starts hidden should not slide out on load.
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const anchor = document.getElementById(STORE_ANCHOR_ID);
    if (!anchor) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHidden(entry.isIntersecting);
        if (!frame) frame = requestAnimationFrame(() => setSettled(true));
      },
      { threshold: 0.6 },
    );
    observer.observe(anchor);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden={hidden}
      inert={hidden}
      className={`fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] ${
        settled ? "transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" : ""
      } ${
        hidden ? "pointer-events-none translate-y-[130%] opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="flex w-full max-w-[26rem] items-center gap-3 rounded-[1.4rem] border border-rule bg-panel/85 p-2.5 pl-3 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)] backdrop-blur-xl">
        <Image
          src="/app-icon.png"
          alt=""
          width={1024}
          height={1024}
          sizes="44px"
          className="size-10 shrink-0 rounded-[0.7rem] sm:size-11"
        />
        <div className="min-w-0 flex-1">
          <p className="display truncate text-xl uppercase leading-none">{APP_NAME}</p>
          <p className="mono mt-1 truncate text-[9px] text-fg-tertiary">iPhone with Face ID</p>
        </div>
        <a
          href={APP_STORE_URL}
          className="shrink-0 rounded-lg focus-visible:outline-2 focus-visible:outline-amber focus-visible:outline-offset-4"
        >
          <Image
            src="/app-store-badge.svg"
            alt={`Download ${APP_NAME} on the App Store`}
            width={120}
            height={40}
            unoptimized
            className="h-10 w-auto sm:h-11"
          />
        </a>
      </div>
    </div>
  );
}
