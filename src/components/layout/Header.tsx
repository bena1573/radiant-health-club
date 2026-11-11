"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNav } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";

/** Routes whose first screen is a full-bleed dark hero, so the header starts transparent. */
const TRANSPARENT_ON_TOP = ["/"];

/**
 * HEADER (sticky)
 *  - transparent over the hero, solid ink once scrolled
 *  - hides when scrolling down, returns when scrolling up
 *  - "Book a Tour" is always visible, including on mobile
 *  - full-screen mobile menu (Escape closes, scroll locked, focus moves into the menu)
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Scroll behaviour (passive listener, no layout thrash).
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastY.current && y > 240); // down past the fold => hide
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu after navigating.
  useEffect(() => setOpen(false), [pathname]);

  // Mobile menu: lock scroll, close on Escape, move focus in and back out.
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  const solid = scrolled || open || !TRANSPARENT_ON_TOP.includes(pathname);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 text-ivory-50 transition-[transform,background-color,backdrop-filter] duration-500 ease-luxe",
          solid ? "bg-ink-950/90 backdrop-blur-md" : "bg-transparent",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div className="mx-auto flex h-20 max-w-wide items-center justify-between px-5 md:px-10 lg:px-16">
          <Logo className="relative z-[60]" />

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {primaryNav.map((item) => (
                <li key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="py-2 text-sm tracking-wide text-ivory-50/90 transition-colors duration-200 hover:text-champagne-400 aria-[current=page]:text-champagne-400"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    // Opens on hover AND keyboard focus (focus-within), so it works without a mouse.
                    <ul className="invisible absolute left-1/2 top-full min-w-52 -translate-x-1/2 translate-y-2 border border-ink-700 bg-ink-950 p-3 opacity-0 shadow-float transition-[opacity,transform] duration-500 ease-luxe group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-ivory-50/80 transition-colors hover:text-champagne-400"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-[60] flex items-center gap-3">
            <Button href="/book-a-tour" size="sm" className="px-4 sm:px-5">
              Book a Tour
            </Button>
            <button
              ref={toggleRef}
              type="button"
              className="flex h-11 w-11 items-center justify-center lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden className="relative block h-3 w-6">
                <span className={cn("absolute inset-x-0 h-px bg-current transition-transform duration-500 ease-luxe", open ? "top-1/2 rotate-45" : "top-0")} />
                <span className={cn("absolute inset-x-0 h-px bg-current transition-transform duration-500 ease-luxe", open ? "top-1/2 -rotate-45" : "bottom-0")} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!open}
        className="fixed inset-0 z-40 overflow-y-auto bg-ink-950 px-5 pb-12 pt-28 text-ivory-50 lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="space-y-1">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block py-3 font-serif text-4xl font-light transition-colors hover:text-champagne-400">
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="mb-3 ml-1 flex flex-wrap gap-x-6 gap-y-1 border-l border-ink-700 pl-4">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} className="block py-1.5 text-sm text-stone-300 hover:text-champagne-400">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
