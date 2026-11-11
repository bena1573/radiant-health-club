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
