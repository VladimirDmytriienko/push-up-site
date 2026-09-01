"use client";

import { motion, useReducedMotion } from "motion/react";

type Props = {
  text: string;
  className?: string;
  /** Reveal on scroll instead of on load. */
  onView?: boolean;
  delay?: number;
};

/**
 * Words rising into place from behind their own baseline.
 *
 * A clipped slide rather than a fade: the display face is a condensed black, and letters
 * that fade in at low opacity go grey and mushy before they arrive. Sliding keeps every
 * frame at full weight, and the clip makes the line read as type being set rather than
 * text appearing.
 *
 * Split by word, not by character — a per-letter stagger on a headline this size turns the
 * word into a wave and costs a DOM node per glyph for the privilege.
 */
export function Rise({ text, className, onView = false, delay = 0 }: Props) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (reduceMotion) return <span className={className}>{text}</span>;

  const animation = {
    initial: { y: "110%" },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <span className={className}>
      {words.map((word, i) => (
        // Each word gets its own clipping window, so a word never slides past its neighbour.
        <span key={`${word}-${i}`} className="inline-flex overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={animation.initial}
            {...(onView
              ? { whileInView: { y: 0 }, viewport: { once: true, amount: 0.4 } }
              : { animate: { y: 0 } })}
            transition={{ ...animation.transition, delay: delay + i * 0.07 }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? <span className="whitespace-pre">&nbsp;</span> : null}
        </span>
      ))}
    </span>
  );
}
