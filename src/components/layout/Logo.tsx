import Link from "next/link";
import { siteConfig } from "@/config/site";

/**
 * LOGO: text wordmark placeholder.
 * TODO: replace the inner markup with the official SVG once supplied
 * (keep the <Link> and the accessible name).
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label={`${siteConfig.name}, home`} className={className}>
      <span className="block font-serif text-2xl font-light leading-none tracking-wide md:text-3xl">Radiant</span>
      <span className="mt-1 block text-[0.625rem] font-semibold uppercase tracking-[0.32em] text-champagne-400">
        Health Club
      </span>
    </Link>
  );
}
