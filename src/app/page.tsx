import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import Link from "next/link";

import { DownloadBar, STORE_ANCHOR_ID } from "@/components/download-bar";
import { HeroPhones } from "@/components/hero-phones";
import { Reveal } from "@/components/reveal";
import { Rise } from "@/components/rise";
import { StepsStory } from "@/components/steps-story";
import { VideoShowcase } from "@/components/video-showcase";
import { APP_NAME, APP_STORE_URL, VIDEO_POSTER, VIDEO_SRC } from "@/lib/site";

/** True when a file under `public/` exists at build time. Every route here prerenders static. */
const inPublic = (path: string) => existsSync(join(process.cwd(), "public", path));

export default function Home() {
  const hasVideo = inPublic(VIDEO_SRC);
  const hasPoster = inPublic(VIDEO_POSTER);

  return (
    <main className="relative flex-1 overflow-x-clip pb-36">
      {/* Amber light falling on the hero, the one warm thing on the ink. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[40rem] animate-[breathe_7s_ease-in-out_infinite] bg-[radial-gradient(60%_50%_at_50%_-10%,rgba(255,159,10,0.14),transparent_70%)]"
      />

      {/*
        One column, centred, on every screen: what it is, the claim, one line of how, and the
        button — then the evidence underneath. The same order at every width, so a phone
        reads it top to bottom and the download sits on the first screen, before the fan of
        screens has to fit.
      */}
      <section className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 pt-12 text-center sm:pt-16">
        <Reveal onLoad>
          <p className="mono text-[11px] text-fg-tertiary sm:text-xs">
            {APP_NAME} <span className="text-amber">·</span> Push-up counter for iPhone
          </p>
        </Reveal>

        <h1 className="display mt-5 text-balance text-[clamp(3.25rem,12vw,6.5rem)] uppercase leading-[0.9] sm:mt-6">
          <Rise text="Put the phone down and push" delay={0.1} />
        </h1>

        <Reveal onLoad delay={0.45}>
          <p className="mx-auto mt-5 max-w-[34ch] text-lg leading-snug text-fg-secondary sm:mt-7 sm:text-xl">
            The TrueDepth camera counts every rep. No wearable, no tapping, no account —
            nothing leaves the phone.
          </p>
        </Reveal>

        <Reveal onLoad delay={0.6}>
          <div id={STORE_ANCHOR_ID} className="mt-7 flex flex-col items-center gap-3 sm:mt-9">
            <a
              href={APP_STORE_URL}
              className="rounded-[0.7rem] transition hover:scale-[1.04] focus-visible:outline-2 focus-visible:outline-amber focus-visible:outline-offset-4 active:scale-[0.98]"
            >
              {/* Apple's badge, unmodified. 52px tall: well above Apple's 40px minimum. */}
              <Image
                src="/app-store-badge.svg"
                alt={`Download ${APP_NAME} on the App Store`}
                width={120}
                height={40}
                unoptimized
                priority
                className="h-[52px] w-auto"
              />
            </a>
            {/* The requirement belongs beside the button someone is about to press. */}
            <p className="mono text-[10px] text-fg-tertiary">Requires an iPhone with Face ID</p>
          </div>
        </Reveal>

        {/* Out past the section's side padding, so the fan runs to the screen's edges. */}
        <div className="-mx-6 w-[calc(100%+3rem)] sm:mt-2">
          <HeroPhones />
        </div>
      </section>

      {hasVideo ? (
        <VideoShowcase src={VIDEO_SRC} poster={hasPoster ? VIDEO_POSTER : undefined} />
      ) : null}

      <StepsStory />

      <section className="mx-auto mt-24 w-full max-w-5xl border-t border-rule px-6 pt-14">
        <h2 className="mono text-fg-tertiary">Privacy</h2>
        <p className="mt-8 max-w-[52ch] text-2xl leading-snug">
          <Rise
            onView
            text="Depth readings become a number and are thrown away. No photo, no video, no upload, no account, no analytics."
          />
        </p>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-[60ch] text-fg-secondary">
            The app works with the phone in flight mode, because there is nothing for it to
            talk to.{" "}
            <Link
              href="/privacy"
              className="underline decoration-fg-tertiary underline-offset-4 hover:decoration-amber"
            >
              Read the policy
            </Link>
            .
          </p>
        </Reveal>
      </section>

      <footer className="mx-auto mt-24 flex w-full max-w-5xl flex-wrap items-center gap-x-8 gap-y-3 border-t border-rule px-6 pt-8">
        <span className="mono text-fg-tertiary">{APP_NAME}</span>
        <a href={APP_STORE_URL} className="mono text-fg-tertiary hover:text-fg">
          App Store
        </a>
        <Link href="/privacy" className="mono text-fg-tertiary hover:text-fg">
          Privacy
        </Link>
        <Link href="/support" className="mono text-fg-tertiary hover:text-fg">
          Support
        </Link>
      </footer>

      <DownloadBar />
    </main>
  );
}
