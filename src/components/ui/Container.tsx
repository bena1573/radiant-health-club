import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ as: Tag = "div", wide = false, className, children }: { as?: ElementType; wide?: boolean; className?: string; children: ReactNode; }) {
  return <Tag className={cn("mx-auto w-full px-5 md:px-10 lg:px-16", wide ? "max-w-wide" : "max-w-7xl", className)}>{children}</Tag>;
}
