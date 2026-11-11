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
