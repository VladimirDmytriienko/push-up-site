"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

/** Every screenshot is a full iPhone frame at 3x, so the aspect never has to be guessed. */
const SHOT_W = 1179;
const SHOT_H = 2556;

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Three real screens, fanned under the headline.
 *
 * The set in progress stands in front, because the number is the product. Either side, the
 * board it fills and the same board in dark mode lean out from behind it on load, and fan
 * further apart as the page starts to scroll, so the hero opens up rather than just leaving.
 *
 * Under reduced motion the fan simply sits at rest.
 */
export function HeroPhones() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  // 0 at the top of the page, 1 a little over a phone's height of scroll later.
  const spread = useTransform(scrollY, [0, 500], [0, 1], { clamp: true });
  const centreY = useTransform(spread, [0, 1], [0, -40]);

  return (
    // The bottom of the fan fades into the ground, so on a phone the hero ends on the
    // screens' content — the number, the board — and not on a hard crop of three frames.
    // A mask clips to its own box, so it sits on this full-width layer, with headroom above
    // for the centre phone to rise into: on the phone-sized stage it would cut the fan off.
    <div className="w-full pt-12 [mask-image:linear-gradient(to_bottom,black_65%,transparent_97%)]">
      <div
        className="relative mx-auto w-[min(58vw,300px)] sm:w-[min(40vw,320px)]"
        style={{ aspectRatio: `${SHOT_W} / ${SHOT_H}` }}
      >
        <Side
          side={-1}
          src="/shots/home.png"
          alt="The home screen: a sixteen day streak and a calendar of green dots"
          spread={spread}
          still={!!reduceMotion}
        />
        <Side
          side={1}
          src="/shots/home-dark.png"
          alt="The same home screen in dark mode"
          spread={spread}
          still={!!reduceMotion}
        />

        <motion.div
          className="absolute inset-0 z-10"
          initial={reduceMotion ? false : { opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.35 }}
        >
          <motion.div className="h-full w-full" style={reduceMotion ? undefined : { y: centreY }}>
            <Phone
              src="/shots/workout.png"
              alt="A set in progress, the count filling the screen"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function Side({
  side,
  src,
  alt,
  spread,
  still,
}: {
  side: -1 | 1;
  src: string;
  alt: string;
  spread: MotionValue<number>;
  still: boolean;
}) {
  // Rest position, then how much further it travels as the page scrolls.
  const x = useTransform(spread, [0, 1], [`${side * 52}%`, `${side * 66}%`]);
  const rotate = useTransform(spread, [0, 1], [side * 7, side * 11]);

  return (
    // The outer layer is the entrance: it starts by cancelling the rest position, so the
    // phone begins tucked behind the centre one and slides out to it. The inner layer is
    // the rest position plus the scroll, and never has to know about the entrance.
    <motion.div
      className="absolute inset-0 origin-bottom"
      initial={still ? false : { x: `${-side * 52}%`, rotate: -side * 7, opacity: 0 }}
      animate={{ x: "0%", rotate: 0, opacity: 1 }}
      transition={{ duration: 1.1, ease: EASE, delay: 0.75 }}
    >
      <motion.div
        className="h-full w-full origin-bottom"
        style={
          still
            ? { x: `${side * 52}%`, rotate: side * 7, scale: 0.86, y: "8%" }
            : { x, rotate, scale: 0.86, y: "8%" }
        }
      >
        <div className="h-full w-full brightness-[0.55]">
          <Phone src={src} alt={alt} />
        </div>
      </motion.div>
    </motion.div>
  );
}

function Phone({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={SHOT_W}
      height={SHOT_H}
      priority={priority}
      sizes="(max-width: 640px) 58vw, 320px"
      className="h-full w-full rounded-[13%/6%] border border-rule object-contain shadow-[0_40px_90px_-30px_rgba(0,0,0,0.95)]"
    />
  );
}
