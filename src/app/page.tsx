import Link from "next/link";

import { Rise } from "@/components/rise";
import { Screens } from "@/components/screens";
import { StoreNote } from "@/components/store-note";
import { APP_NAME, APP_STORE_URL } from "@/lib/site";

/**
 * The steps, word for word from the app's own guide.
 *
 * Rewriting them for the web would only let the site and the product start disagreeing
 * about how the thing works — and these three lines have already been tested on a screen.
 */
const STEPS = [
  ["Put phone on the floor", "Screen up."],
  ["Chin over the camera", "Line yourself up."],
  ["Push", "Reps count themselves."],
] as const;

export default function Home() {
  return (
    <main className="flex-1 pb-24">
      {/*
        One screen at a time, beside the headline.

        The order differs by width on purpose. On a phone the headline lands first, then the
        screen, then the prose — you scroll, so the claim should arrive before its evidence.
        On a wide display both are in view at once, and the screen reads better on the left
        where the eye starts.
      */}
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 pt-16 sm:pt-24 md:grid md:grid-cols-[minmax(0,320px)_1fr] md:items-center md:gap-16">
        <div className="md:col-start-2 md:row-start-1">
          <p className="mono text-fg-tertiary">{APP_NAME}</p>
          <h1 className="display mt-6 text-[clamp(2.75rem,7vw,5rem)] uppercase">
            <Rise text="Put the phone down and push" delay={0.15} />
          </h1>
        </div>

        <div className="md:col-start-1 md:row-span-2 md:row-start-1">
          <Screens />
        </div>

        <div className="md:col-start-2 md:row-start-2">
          <p className="max-w-[46ch] text-xl leading-relaxed text-fg-secondary">
            The TrueDepth camera watches your chest and counts every rep. No wearable, no
            tapping the screen between sets, no account. Everything happens on the iPhone
            and nothing leaves it.
          </p>
          <div className="mt-9 max-w-[26rem]">
            <StoreNote />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-24 w-full max-w-5xl border-t border-rule px-6 pt-14">
        <h2 className="mono text-fg-tertiary">How it works</h2>
        <ol className="mt-10 grid list-none gap-10 p-0 sm:grid-cols-3">
          {STEPS.map(([title, detail], i) => (
            <li key={title} className="flex gap-5">
              <span className="mono pt-1 tabular-nums text-fg-tertiary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="mono block text-[13px] text-fg">{title}</span>
                <span className="mt-2 block text-fg-secondary">{detail}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto mt-24 w-full max-w-5xl border-t border-rule px-6 pt-14">
        <h2 className="mono text-fg-tertiary">Privacy</h2>
        <p className="mt-8 max-w-[52ch] text-2xl leading-snug">
          <Rise
            onView
            text="Depth readings become a number and are thrown away. No photo, no video, no upload, no account, no analytics."
          />
        </p>
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
