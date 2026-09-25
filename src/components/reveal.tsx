"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Reveal once on load instead of when scrolled into view — for content above the fold. */
  onLoad?: boolean;
  /** Seconds. */
  delay?: number;
};

/**
 * Fade and rise, for blocks that are not headlines.
 *
 * Headlines get `Rise`, which slides type from behind a clip; a paragraph or a card has no
 * baseline to slide from, so it fades in over a short climb instead. Same curve as `Rise`,
 * so the two read as one motion when they land together.
 */
export function Reveal({ children, className, onLoad = false, delay = 0 }: Props) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      {...(onLoad
        ? { animate: { opacity: 1, y: 0 } }
        : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.25 } })}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
