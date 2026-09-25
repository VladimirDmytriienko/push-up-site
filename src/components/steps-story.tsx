"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

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

/** Where the counter lands by the end of the scroll — the count in the workout screenshot. */
const FINAL_REPS = 26;

const SHOT_W = 1179;
const SHOT_H = 2556;

/**
 * How it works, told on one phone.
 *
 * The phone stays pinned while the page scrolls past it: it tips back onto the floor, the
 * camera looks for a chin, and then the number climbs with the scroll — the reader does the
 * pushing, and the count keeps up without being asked.
 *
 * The server renders the plain three-column list. The pinned stage replaces it only once
 * the client has mounted and the reader has not asked for reduced motion, so a page without
 * scripts, or a reader who wants it still, gets the list as it always was.
 */
export function StepsStory() {
  const reduceMotion = useReducedMotion();
  // False on the server and during hydration, true once mounted: the list is what hydrates.
  const mounted = useSyncExternalStore(noop, () => true, () => false);

  return mounted && !reduceMotion ? <Stage /> : <List />;
}

const noop = () => () => {};

function List() {
  return (
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
  );
}

function Stage() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Re-renders only when the step changes; everything continuous is a motion value.
  useMotionValueEvent(p, "change", (v) => {
    setStep(Math.min(STEPS.length - 1, Math.floor(v * STEPS.length)));
  });

  // Step one: the phone starts standing and is laid down on its back.
  const tilt = useTransform(p, [0, 0.26], [0, 52]);
  const lift = useTransform(p, [0, 0.26, 0.36], [0, 0, 1]);
  const rotateX = useTransform([tilt, lift], ([t, l]: number[]) => t * (1 - l));
  const scale = useTransform(p, [0, 0.26, 0.36], [1, 0.92, 1]);

  return (
    // One viewport to pin, plus most of a viewport of scroll per step.
    <div ref={ref} className="relative mt-24 border-t border-rule" style={{ height: "340svh" }}>
      <section
        aria-labelledby="how-heading"
        className="sticky top-0 flex h-svh items-center overflow-hidden"
      >
        {/* Light from the floor, where the phone is. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(50%_60%_at_30%_100%,rgba(255,159,10,0.12),transparent_72%)]"
        />

        <div className="relative mx-auto grid w-full max-w-5xl items-center gap-8 px-6 md:grid-cols-[minmax(0,320px)_1fr] md:gap-16">
          <div className="flex justify-center [perspective:1400px]">
            <motion.div
              className="relative w-[min(50vw,21svh)] md:w-[min(100%,34svh,300px)]"
              style={{ aspectRatio: `${SHOT_W} / ${SHOT_H}`, rotateX, scale, transformOrigin: "50% 90%" }}
            >
              <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-rule bg-cream shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
                <Screen visible={step === 0}>
                  <Image
                    src="/shots/guide.png"
                    alt="The first-run guide, listing the three steps"
                    width={SHOT_W}
                    height={SHOT_H}
                    sizes="(max-width: 768px) 52vw, 300px"
                    className="h-full w-full object-contain"
                  />
                </Screen>
                <Screen visible={step === 1}>
                  <Aim />
                </Screen>
                <Screen visible={step === 2}>
                  <Counter progress={p} />
                </Screen>
              </div>
            </motion.div>
          </div>

          <div>
            <h2 id="how-heading" className="mono text-fg-tertiary">
              How it works
            </h2>

            <ol className="relative mt-6 min-h-[9.5rem] list-none p-0 md:mt-10 md:min-h-[14rem]">
              {STEPS.map(([title, detail], i) => (
                <motion.li
                  key={title}
                  className="absolute inset-0"
                  aria-current={i === step ? "step" : undefined}
                  initial={false}
                  animate={{
                    opacity: i === step ? 1 : 0,
                    y: i === step ? 0 : i < step ? -28 : 28,
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="mono tabular-nums text-amber">
                    {String(i + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
                  </span>
                  <span className="display mt-4 block text-[clamp(2.5rem,6vw,4.5rem)] uppercase">
                    {title}
                  </span>
                  <span className="mt-3 block text-xl text-fg-secondary">{detail}</span>
                </motion.li>
              ))}
            </ol>

            {/* Position through the story: one bar per step, each filling as you scroll it. */}
            <div className="mt-8 flex max-w-xs gap-2" aria-hidden>
              {STEPS.map(([title], i) => (
                <Segment key={title} progress={p} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Screen({ visible, children }: { visible: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      className="absolute inset-0"
      aria-hidden={!visible}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 1.04 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Segment({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const n = STEPS.length;
  const scaleX = useTransform(progress, [index / n, (index + 1) / n], [0, 1]);
  return (
    <span className="h-1 flex-1 overflow-hidden rounded-full bg-rule">
      <motion.span className="block h-full origin-left bg-fg" style={{ scaleX }} />
    </span>
  );
}

/** The island, drawn where it sits on the screenshots, so the screens swap without a jump. */
function Island() {
  return (
    <span className="absolute left-[34%] top-[1.3%] h-[4.3%] w-[32%] rounded-full bg-ink" />
  );
}

/** Step two: the front camera, looking for a chin. */
function Aim() {
  return (
    <div className="absolute inset-0 bg-cream">
      <Island />
      <div className="absolute left-1/2 top-[3.5%] -translate-x-1/2 -translate-y-1/2">
        {[0, 1, 2].map((ring) => (
          <span
            key={ring}
            className="absolute left-1/2 top-1/2 block size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-amber opacity-0 animate-[aim_2.4s_cubic-bezier(0.22,1,0.36,1)_infinite]"
            style={{ animationDelay: `${ring * 0.8}s` }}
          />
        ))}
      </div>
      <p className="mono absolute inset-x-0 top-[46%] text-center text-[10px] text-ink/50">
        Line yourself up
      </p>
    </div>
  );
}

/** Step three: the workout screen, with the count driven by the scroll. */
function Counter({ progress }: { progress: MotionValue<number> }) {
  const reps = useTransform(progress, [0.7, 0.96], [0, FINAL_REPS], { clamp: true });
  const count = useTransform(reps, (v) => String(Math.round(v)));
  // Roughly a rep every 1.1 s, which is the pace the screenshot was taken at.
  const clock = useTransform(reps, (v) => {
    const cs = Math.round(v * 113);
    const s = Math.floor(cs / 100);
    return `00:${String(s).padStart(2, "0")}.${String(cs % 100).padStart(2, "0")}`;
  });

  return (
    <div className="absolute inset-0 bg-cream text-ink">
      <Island />
      <p className="mono absolute inset-x-0 top-[8.3%] text-center text-[9px] text-ink/50">Set 1</p>
      <motion.p className="mono absolute inset-x-0 top-[10.9%] text-center text-[11px] tabular-nums text-ink/30">
        {clock}
      </motion.p>
      <motion.p className="display absolute inset-x-0 top-[31%] text-center text-[clamp(4rem,11svh,7rem)] tabular-nums">
        {count}
      </motion.p>
      <span className="absolute inset-x-[7%] bottom-[6.8%] flex h-[8.2%] items-center justify-center gap-[3px] rounded-full bg-white">
        <span className="h-[36%] w-[4px] rounded-full bg-ink" />
        <span className="h-[36%] w-[4px] rounded-full bg-ink" />
      </span>
    </div>
  );
}
