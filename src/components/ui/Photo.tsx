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
