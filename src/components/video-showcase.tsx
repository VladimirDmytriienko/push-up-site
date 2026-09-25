"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { IconPlayerPlayFilled, IconVolume } from "@tabler/icons-react";

type Props = {
  src: string;
  poster?: string;
};

/**
 * The presentation video, growing into place as it scrolls up.
 *
 * It plays muted and looping while on screen, like a window onto the app rather than a
 * thing to press, and pauses the moment it leaves so an idle tab does not keep decoding.
 * "Watch with sound" hands it over to the browser's own controls from the start — native
 * controls, because they are the ones that already work with a keyboard and a screen reader.
 *
 * Under reduced motion nothing moves by itself: no growth, no autoplay, just the poster
 * and a play button.
 */
export function VideoShowcase({ src, poster }: Props) {
  const reduceMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [watching, setWatching] = useState(false);
  // 16:9 until the file says otherwise, so the frame holds its space before metadata lands.
  const [aspect, setAspect] = useState(16 / 9);

  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.84, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [48, 24]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  // Muted preview: plays only while at least a third of it is on screen.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduceMotion || watching) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.33 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduceMotion, watching]);

  const watch = () => {
    const video = videoRef.current;
    if (!video) return;
    setWatching(true);
    video.muted = false;
    video.loop = false;
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  return (
    <section className="mx-auto mt-24 w-full max-w-5xl border-t border-rule px-6 pt-14">
      <h2 className="mono text-fg-tertiary">See it count</h2>

      <motion.div
        ref={frameRef}
        className="relative mx-auto mt-10 overflow-hidden border border-rule bg-panel shadow-[0_60px_120px_-40px_rgba(255,159,10,0.18)]"
        style={{
          aspectRatio: aspect,
          width: `min(100%, calc(78svh * ${aspect}))`,
          ...(reduceMotion ? { borderRadius: 24 } : { scale, y, borderRadius: radius }),
        }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          poster={poster}
          muted={!watching}
          loop={!watching}
          playsInline
          preload="metadata"
          controls={watching}
          onLoadedMetadata={(e) => {
            const { videoWidth, videoHeight } = e.currentTarget;
            if (videoWidth && videoHeight) setAspect(videoWidth / videoHeight);
          }}
        >
          <a href={src}>Download the uPush presentation video</a>
        </video>

        {!watching && (
          <button
            type="button"
            onClick={watch}
            className="mono absolute bottom-5 left-5 flex items-center gap-2.5 rounded-full bg-fg px-5 py-3 text-[11px] text-bg transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber active:scale-95"
          >
            {reduceMotion ? (
              <IconPlayerPlayFilled className="h-4 w-4" />
            ) : (
              <IconVolume className="h-4 w-4" stroke={2} />
            )}
            {reduceMotion ? "Play video" : "Watch with sound"}
          </button>
        )}
      </motion.div>
    </section>
  );
}
