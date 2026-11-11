import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "text";
type Size = "sm" | "md" | "lg";
type Tone = "dark" | "light";

type Common = { variant?: Variant; size?: Size; tone?: Tone; className?: string; children: ReactNode; };
type AsLink = Common & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;
type AsButton = Common & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

const base = "inline-flex items-center justify-center gap-2 font-sans text-label uppercase transition-[background-color,color,border-color] duration-500 ease-luxe disabled:pointer-events-none disabled:opacity-50 min-h-11";
const sizes: Record<Size, string> = { sm: "px-5 py-2.5", md: "px-7 py-3.5", lg: "px-9 py-4" };

function styles(variant: Variant, tone: Tone) {
  if (variant === "primary") return "bg-champagne-400 text-ink-950 hover:bg-champagne-200";
  if (variant === "secondary") return tone === "dark" ? "border border-champagne-400 text-ivory-50 hover:bg-champagne-400 hover:text-ink-950" : "border border-ink-950 text-ink-950 hover:bg-ink-950 hover:text-ivory-50";
  return cn("px-0 underline decoration-1 underline-offset-8 hover:decoration-2", tone === "dark" ? "text-champagne-400 hover:text-champagne-200" : "text-champagne-600 hover:text-ink-950");
}

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", tone = "dark", className, children, ...rest } = props;
  const classes = cn(base, variant !== "text" && sizes[size], styles(variant, tone), className);
  if (rest.href !== undefined) {
    const { href, ...linkProps } = rest as Omit<AsLink, keyof Common>;
    const external = /^https?:\/\//.test(href);
    return <Link href={href} className={classes} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...linkProps}>{children}</Link>;
  }
  return <button type="button" className={classes} {...(rest as Omit<AsButton, keyof Common>)}>{children}</button>;
}
