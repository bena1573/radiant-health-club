#!/usr/bin/env bash

mkdir -p "src/app/(site)"
mkdir -p "src/components/ui"
mkdir -p "src/components/layout"
mkdir -p "src/components/seo"
mkdir -p "src/lib"

# --- src/lib/utils.ts ---
cat << 'EOF' > "src/lib/utils.ts"
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isPlaceholder(value?: string | null): boolean {
  return !value || value.startsWith("[PLACEHOLDER");
}
EOF

# --- src/components/ui/Container.tsx ---
cat << 'EOF' > "src/components/ui/Container.tsx"
import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ as: Tag = "div", wide = false, className, children }: { as?: ElementType; wide?: boolean; className?: string; children: ReactNode; }) {
  return <Tag className={cn("mx-auto w-full px-5 md:px-10 lg:px-16", wide ? "max-w-wide" : "max-w-7xl", className)}>{children}</Tag>;
}
EOF

# --- src/components/ui/Section.tsx ---
cat << 'EOF' > "src/components/ui/Section.tsx"
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

type Surface = "ivory" | "sand" | "ink";
const surfaces: Record<Surface, string> = { 
  ivory: "bg-ivory-50 text-ink-950", 
  sand: "bg-sand-100 text-ink-950", 
  ink: "bg-ink-950 text-ivory-50" 
};

export function Section({ surface = "ivory", id, labelledBy, className, wide, children }: { surface?: Surface; id?: string; labelledBy?: string; className?: string; wide?: boolean; children: ReactNode; }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-20 md:py-32 lg:py-40", surfaces[surface], className)}>
      <Container wide={wide}>{children}</Container>
    </section>
  );
}
EOF

# --- src/components/ui/SectionHeader.tsx ---
cat << 'EOF' > "src/components/ui/SectionHeader.tsx"
import { cn } from "@/lib/utils";

export function SectionHeader({ id, label, title, intro, tone = "light", align = "left", as: Heading = "h2" }: { id?: string; label?: string; title: string; intro?: string; tone?: "light" | "dark"; align?: "left" | "center"; as?: "h1" | "h2"; }) {
  return (
    <header className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {label && <p className={cn("mb-5 text-label uppercase", tone === "dark" ? "text-champagne-400" : "text-champagne-600")}>{label}</p>}
      <Heading id={id} className={Heading === "h1" ? "text-h1" : "text-h2"}>{title}</Heading>
      {intro && <p className={cn("mt-6 max-w-[60ch] text-lead", tone === "dark" ? "text-stone-300" : "text-stone-500", align === "center" && "mx-auto")}>{intro}</p>}
    </header>
  );
}
EOF

# --- src/components/ui/Button.tsx ---
cat << 'EOF' > "src/components/ui/Button.tsx"
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
EOF

# --- src/components/ui/Photo.tsx ---
cat << 'EOF' > "src/components/ui/Photo.tsx"
"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { BLUR_DATA_URL } from "@/lib/images";
import { cn } from "@/lib/utils";

export function Photo({ className, alt, ...props }: Omit<ImageProps, "placeholder" | "blurDataURL">) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <div role={alt ? "img" : undefined} aria-label={alt || undefined} className={cn("bg-gradient-to-br from-ink-700 to-ink-900", props.fill && "absolute inset-0", className)} />;
  }
  return <Image alt={alt} placeholder="blur" blurDataURL={BLUR_DATA_URL} onError={() => setFailed(true)} className={cn("object-cover", className)} {...props} />;
}
EOF

echo "Success! All missing UI components created."