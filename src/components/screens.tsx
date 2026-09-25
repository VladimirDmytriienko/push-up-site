"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";

/** Every screenshot is a full iPhone frame at 3x, so the aspect never has to be guessed. */
const SHOT_W = 1179;
const SHOT_H = 2556;

const SCREENS = [
  {
    category: "Home",
    title: "The board fills itself",
    src: "/shots/home.png",
    alt: "The home screen: a sixteen day streak and a calendar of green dots",
  },
  {
    category: "A set",
    title: "One number, nothing else",
    src: "/shots/workout.png",
    alt: "A set in progress, the count filling the screen",
  },
  {
    category: "First launch",
    title: "Three lines, typed out",
    src: "/shots/guide.png",
    alt: "The first-run guide writing out three steps",
  },
  {
    category: "Both themes",
    title: "Follows the system",
    src: "/shots/home-dark.png",
    alt: "The home screen in dark mode",
  },
] as const;

export function Screens() {
  const reduceMotion = useReducedMotion();
  const [{ index, direction }, setState] = useState({ index: 0, direction: 1 });
  const screen = SCREENS[index];

  // Wraps at both ends rather than stopping: there is always a next screen, so the
  // controls never go dead and nobody has to work out why a button stopped responding.
  const go = (step: number) =>
    setState({
      index: (index + step + SCREENS.length) % SCREENS.length,
      direction: step,
    });

  const slide = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: direction * 40 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: direction * -40 },
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <div className="flex flex-col items-center gap-7">
      {/*
        The frame is sized from the screenshot's own aspect, so nothing is ever cropped —
        a phone capture forced into a squarer card loses the top and bottom of the screen,
        which on this app is the streak and the button.

        Beside the headline it is also sized from the viewport height (0.4613 is the
        screenshot's width over its height), so the store card next to it still lands on
        the first screen of a laptop.
      */}
      <div className="relative w-[min(74vw,300px)] md:w-[clamp(180px,calc((100svh-15rem)*0.4613),300px)]" style={{ aspectRatio: `${SHOT_W} / ${SHOT_H}` }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div key={screen.src} className="absolute inset-0" {...slide}>
            <Image
              src={screen.src}
              alt={screen.alt}
              width={SHOT_W}
              height={SHOT_H}
              priority={index === 0}
              sizes="(max-width: 768px) 74vw, 300px"
              className="h-full w-full rounded-[2rem] border border-rule object-contain"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex w-full max-w-[300px] items-center justify-between gap-4">
        <Control label="Previous screen" onClick={() => go(-1)}>
          <IconArrowNarrowLeft className="h-6 w-6" stroke={2} />
        </Control>

        <div className="min-w-0 text-center">
          <p className="mono text-[10px] text-fg-tertiary">{screen.category}</p>
          <p className="mt-1 truncate text-sm text-fg-secondary">{screen.title}</p>
        </div>

        <Control label="Next screen" onClick={() => go(1)}>
          <IconArrowNarrowRight className="h-6 w-6" stroke={2} />
        </Control>
      </div>

      {/* Position, not decoration: four screens, and this says which one you are on. */}
      <div className="flex gap-2" aria-hidden>
        {SCREENS.map((s, i) => (
          <span
            key={s.src}
            className={
              i === index
                ? "h-1.5 w-6 rounded-full bg-fg transition-all"
                : "h-1.5 w-1.5 rounded-full bg-fg-tertiary transition-all"
            }
          />
        ))}
      </div>
    </div>
  );
}

function Control({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-fg text-bg transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber active:scale-95"
    >
      {children}
    </button>
  );
}
