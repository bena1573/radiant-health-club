"use client";

import { useRef } from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Testimonial } from "@/lib/types";

/**
 * HOME / 7. Testimonials: a scroll-snap carousel.
 * Deliberately NOT auto-advancing (accessibility: no moving content to chase).
 * Works with touch swipe, trackpad, keyboard (focusable list) and the arrow buttons.
 */
export function Testimonials({ items: testimonials }: { items: Testimonial[] }) {
  const listRef = useRef<HTMLUListElement>(null);
  const page = (dir: 1 | -1) => {
    const el = listRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const arrow = "flex h-12 w-12 items-center justify-center border border-ink-950 text-ink-950 transition-colors duration-500 hover:bg-ink-950 hover:text-ivory-50";

  return (
    <Section surface="ivory" labelledBy="testimonials-title">
      <div className="flex items-end justify-between gap-6">
        <SectionHeader id="testimonials-title" label="Success stories" title="In members' words." />
        <div className="hidden gap-3 md:flex">
          <button type="button" className={arrow} aria-label="Previous testimonials" onClick={() => page(-1)}>
            <svg aria-hidden width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor"><path d="M11 3 5 9l6 6" /></svg>
          </button>
          <button type="button" className={arrow} aria-label="Next testimonials" onClick={() => page(1)}>
            <svg aria-hidden width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor"><path d="m7 3 6 6-6 6" /></svg>
          </button>
        </div>
      </div>

      <div role="region" aria-roledescription="carousel" aria-label="Member testimonials" className="mt-14">
        <ul
          ref={listRef}
          tabIndex={0}
          className="flex snap-x snap-mandatory gap-10 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((t, i) => (
            <li key={i} className="w-[85%] shrink-0 snap-start md:w-[46%] lg:w-[31%]">
              <figure className="border-t border-stone-300 pt-8">
                <blockquote className="font-serif text-h3 font-light leading-snug">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-6 text-sm text-stone-500">
                  <span className="block text-ink-950">{t.name}</span>
                  {t.detail}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
