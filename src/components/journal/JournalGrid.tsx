"use client";

import Link from "next/link";
import { useState } from "react";
import { Photo } from "@/components/ui/Photo";
import { formatDate } from "@/lib/dates";
import type { Post } from "@/lib/types";
import { cn } from "@/lib/utils";

export function JournalGrid({ posts }: { posts: Post[] }) {
  const [cat, setCat] = useState("All");
  const cats = ["All", ...Array.from(new Set(posts.map((p) => p.category).filter((c): c is string => !!c)))];
  const filtered = posts.filter((p) => cat === "All" || p.category === cat);
  const [featured, ...rest] = filtered;

  return (
    <div>
      {cats.length > 2 && (
        <div role="group" aria-label="Filter by category" className="mb-14 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={cn("min-h-11 border px-4 text-sm transition-colors duration-300", cat === c ? "border-ink-950 bg-ink-950 text-ivory-50" : "border-stone-300 hover:border-ink-950")}>{c}</button>
          ))}
        </div>
      )}
      {featured && (
        <Link href={`/journal/${featured.slug}`} className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="relative aspect-[3/2] overflow-hidden lg:col-span-7"><Photo src={featured.cover.src} alt={featured.cover.alt} fill preload sizes="(min-width: 1024px) 58vw, 100vw" className="transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.03]" /></div>
          <div className="lg:col-span-5">
            <p className="text-sm text-champagne-600">{[featured.category, formatDate(featured.publishedAt)].filter(Boolean).join(", ")}</p>
            <h2 className="mt-3 text-h2 transition-colors duration-500 group-hover:text-champagne-600">{featured.title}</h2>
            <p className="mt-5 max-w-[44ch] text-lead text-stone-500">{featured.excerpt}</p>
          </div>
        </Link>
      )}
      {rest.length > 0 && (
        <ul className="mt-20 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <li key={p.slug}>
              <Link href={`/journal/${p.slug}`} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden"><Photo src={p.cover.src} alt={p.cover.alt} fill sizes="(min-width: 1024px) 30vw, 100vw" className="transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.04]" /></div>
                <p className="mt-6 text-sm text-champagne-600">{[p.category, formatDate(p.publishedAt)].filter(Boolean).join(", ")}</p>
                <h3 className="mt-2 text-h3 transition-colors duration-500 group-hover:text-champagne-600">{p.title}</h3>
                <p className="mt-3 max-w-[40ch] text-stone-500">{p.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}