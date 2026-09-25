import { existsSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { Rise } from "@/components/rise";
import { Screens } from "@/components/screens";
import { StepsStory } from "@/components/steps-story";
import { StoreNote } from "@/components/store-note";
import { VideoShowcase } from "@/components/video-showcase";
import { APP_NAME, APP_STORE_URL, VIDEO_POSTER, VIDEO_SRC } from "@/lib/site";

/** True when a file under `public/` exists at build time. Every route here prerenders static. */
const inPublic = (path: string) => existsSync(join(process.cwd(), "public", path));

export default function Home() {
  const hasVideo = inPublic(VIDEO_SRC);
  const hasPoster = inPublic(VIDEO_POSTER);

  return (
    <main className="relative flex-1 overflow-x-clip pb-24">
      {/* Amber light falling on the hero, the one warm thing on the ink. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[40rem] animate-[breathe_7s_ease-in-out_infinite] bg-[radial-gradient(60%_50%_at_50%_-10%,rgba(255,159,10,0.14),transparent_70%)]"
      />

      {/*
        One screen at a time, beside the headline.

        The order differs by width on purpose. On a phone the headline lands first, then the
        screen, then the prose — you scroll, so the claim should arrive before its evidence.
        On a wide display both are in view at once, and the screen reads better on the left
        where the eye starts.
      */}
      <section className="relative mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 pt-16 sm:pt-24 md:grid md:grid-cols-[minmax(0,320px)_1fr] md:items-center md:gap-16">
        <div className="md:col-start-2 md:row-start-1">
          <Reveal onLoad>
            <p className="mono text-fg-tertiary">{APP_NAME}</p>
          </Reveal>
          <h1 className="display mt-6 text-[clamp(2.75rem,7vw,5rem)] uppercase">
            <Rise text="Put the phone down and push" delay={0.15} />
          </h1>
        </div>

        <Reveal onLoad delay={0.3} className="md:col-start-1 md:row-span-2 md:row-start-1">
          <Screens />
        </Reveal>

        <Reveal onLoad delay={0.55} className="md:col-start-2 md:row-start-2">
          <p className="max-w-[46ch] text-xl leading-relaxed text-fg-secondary">
            The TrueDepth camera watches your chest and counts every rep. No wearable, no
            tapping the screen between sets, no account. Everything happens on the iPhone
            and nothing leaves it.
          </p>
          <div className="mt-9 max-w-[26rem]">
            <StoreNote />
          </div>
        </Reveal>
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
    </main>
  );
}
