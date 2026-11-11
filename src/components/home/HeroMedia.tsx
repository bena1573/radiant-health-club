"use client";

import { useRef, useState } from "react";
import { Photo } from "@/components/ui/Photo";

/**
 * HERO MEDIA: poster image + optional looping video.
 *  - Video is muted, inline, and not preloaded (poster paints first, so LCP is the image).
 *  - Hidden for users who prefer reduced motion (they see the poster only).
 *  - A visible pause/play control is provided for any autoplaying motion (WCAG 2.2.2).
 */
export function HeroMedia({ poster, videoSrc }: { poster: string; videoSrc?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { void v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };

  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        <Photo src={poster} alt="" fill preload sizes="100vw" className="animate-slow-zoom" />
        {videoSrc && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
            autoPlay muted loop playsInline preload="none" poster={poster} aria-hidden
          >
            <source src={videoSrc} />
          </video>
        )}
      </div>
      {/* Legibility overlay: darkest where the headline sits. */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/25" />
      {videoSrc && (
        <button
          type="button"
          onClick={toggle}
          className="absolute bottom-8 right-5 z-10 border border-ivory-50/40 px-4 py-2.5 text-label uppercase text-ivory-50 transition-colors hover:border-champagne-400 hover:text-champagne-400 md:right-10 lg:right-16"
        >
          {playing ? "Pause video" : "Play video"}
        </button>
      )}
    </>
  );
}
