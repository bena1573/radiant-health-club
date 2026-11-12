"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DAYS, type Session } from "@/lib/types";
import { formatTime } from "@/lib/format";
import { cn } from "@/lib/utils";

export function ScheduleBoard({ sessions }: { sessions: Session[] }) {
  const [day, setDay] = useState<string>("All");
  const [cls, setCls] = useState("All");
  const [level, setLevel] = useState("All");

  const classOptions = useMemo(() => Array.from(new Map(sessions.map((s) => [s.classSlug, s.classTitle])).entries()), [sessions]);
  const levelOptions = useMemo(() => Array.from(new Set(sessions.map((s) => s.level))), [sessions]);
  const visible = sessions.filter((s) => (day === "All" || s.day === day) && (cls === "All" || s.classSlug === cls) && (level === "All" || s.level === level));

  const select = "min-h-11 w-full border border-stone-300 bg-transparent px-4 text-sm text-ink-950";

  return (
    <div>
      <div role="group" aria-label="Filter by day" className="flex flex-wrap gap-2">
        {["All", ...DAYS].map((d) => (
          <button key={d} type="button" aria-pressed={day === d} onClick={() => setDay(d)} className={cn("min-h-11 border px-4 text-sm transition-colors duration-300", day === d ? "border-ink-950 bg-ink-950 text-ivory-50" : "border-stone-300 hover:border-ink-950")}>
            {d === "All" ? "All days" : d.slice(0, 3)}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-4 sm:max-w-xl sm:grid-cols-2">
        <label className="block text-sm"><span className="mb-1.5 block text-stone-500">Class</span>
          <select className={select} value={cls} onChange={(e) => setCls(e.target.value)}>
            <option value="All">All classes</option>
            {classOptions.map(([slug, title]) => <option key={slug} value={slug}>{title}</option>)}
          </select>
        </label>
        <label className="block text-sm"><span className="mb-1.5 block text-stone-500">Level</span>
          <select className={select} value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="All">All levels</option>
            {levelOptions.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </label>
      </div>
      {visible.length === 0 ? (
        <p className="mt-12 border-t border-stone-300 pt-8 text-stone-500">No classes match these filters.</p>
      ) : (
        <ul className="mt-10 border-t border-stone-300">
          {visible.map((s) => (
            <li key={s.id} className="grid items-center gap-x-6 gap-y-1 border-b border-stone-300 py-5 sm:grid-cols-[9rem_1fr_auto] md:grid-cols-[11rem_1fr_10rem_auto]">
              <p className="text-stone-500"><span className="block text-ink-950">{s.day}</span>{formatTime(s.startTime)}</p>
              <p>
                <Link href={`/classes/${s.classSlug}`} className="font-serif text-h3 font-light transition-colors hover:text-champagne-600">{s.classTitle}</Link>
              </p>
              <p className="text-sm text-stone-500 md:block">{s.level}</p>
              <Link href={`/classes/book?class=${s.classSlug}&session=${encodeURIComponent(s.id)}`} className="text-label uppercase text-champagne-600 underline underline-offset-8 hover:text-ink-950 sm:justify-self-end">
                Reserve
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}