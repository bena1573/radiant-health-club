"use client";

import { useRef, useState } from "react";
import { Photo } from "@/components/ui/Photo";
import type { GalleryItem } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Varied aspect ratios give the grid a masonry rhythm without needing image dimensions. */
const RATIOS = ["aspect-[4/5]", "aspect-square", "aspect-[3/4]", "aspect-[4/3]", "aspect-[4/5]", "aspect-[3/2]"];

/**
 * GALLERY: masonry grid with category filters and an accessible lightbox built on the native
 * <dialog> element (focus trap and Escape come for free). Arrow keys move between items.
 */
export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState("All");
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);

  const cats = ["All", ...Array.from(new Set(items.map((i) => i.category)))];
  const visible = items.filter((i) => filter === "All" || i.category === filter);
  const current = visible[index];

  const open = (i: number) => { setIndex(i); dialog.current?.showModal(); };
  const step = (d: number) => setIndex((i) => (i + d + visible.length) % visible.length);

  return (
    <div>
      <div role="group" aria-label="Filter by category" className="mb-12 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)} className={cn("min-h-11 border px-4 text-sm transition-colors duration-300", filter === c ? "border-ink-950 bg-ink-950 text-ivory-50" : "border-stone-300 hover:border-ink-950")}>{c}</button>
        ))}
      </div>

      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {visible.map((it, i) => (
          <li key={it.id} className="mb-4 break-inside-avoid">
            <button type="button" onClick={() => open(i)} className="group relative block w-full overflow-hidden" aria-label={`${it.kind === "video" ? "Play video" : "View photo"}: ${it.title}`}>
              <div className={cn("relative", RATIOS[i % RATIOS.length])}>
                <Photo src={it.image.src} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.04]" />
                {it.kind === "video" && <span aria-hidden className="absolute inset-0 flex items-center justify-center bg-ink-950/30"><span className="flex h-14 w-14 items-center justify-center border border-ivory-50 text-ivory-50">&#9654;</span></span>}
              </div>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label="Gallery viewer"
        onKeyDown={(e) => { if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); }}
        onClick={(e) => { if (e.target === dialog.current) dialog.current?.close(); }}
        className="m-auto h-[90vh] w-[min(96vw,80rem)] max-w-none bg-ink-950 p-0 text-ivory-50 backdrop:bg-ink-950/90"
      >
        {current && (
          <div className="relative flex h-full flex-col">
            <div className="relative min-h-0 flex-1">
              {current.kind === "video" && current.videoUrl ? (
                <video key={current.id} src={current.videoUrl} poster={current.image.src} controls playsInline className="h-full w-full object-contain" />
              ) : (
                <Photo key={current.id} src={current.image.src} alt={current.image.alt} fill sizes="96vw" className="object-contain" />
              )}
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-ink-700 px-5 py-4">
              <p className="text-sm text-stone-300">{current.title} ({index + 1} of {visible.length})</p>
              <div className="flex gap-2">
                <button type="button" onClick={() => step(-1)} className="min-h-11 border border-ink-700 px-4 text-sm hover:border-champagne-400">Previous</button>
                <button type="button" onClick={() => step(1)} className="min-h-11 border border-ink-700 px-4 text-sm hover:border-champagne-400">Next</button>
                <button type="button" onClick={() => dialog.current?.close()} className="min-h-11 border border-champagne-400 px-4 text-sm text-champagne-400 hover:bg-champagne-400 hover:text-ink-950">Close</button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
