import { Container } from "./Container";
import { Photo } from "./Photo";
import type { Img } from "@/lib/types";

/**
 * PAGE HERO for inner pages. Dark, with an optional full-bleed image behind the title.
 * The fixed header is ~80px tall, hence the generous top padding.
 */
export function PageHero({ label, title, intro, image }: { label?: string; title: string; intro?: string; image?: Img }) {
  return (
    <section aria-labelledby="page-title" className={image ? "relative isolate flex min-h-[70vh] items-end bg-ink-950 pb-16 pt-40 text-ivory-50 md:pb-24" : "bg-ink-950 pb-16 pt-40 text-ivory-50 md:pb-24 md:pt-48"}>
      {image && (
        <>
          <Photo src={image.src} alt={image.alt} fill preload sizes="100vw" className="-z-10" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/50 to-ink-950/30" />
        </>
      )}
      <Container wide>
        {label && <p className="mb-5 text-label uppercase text-champagne-400">{label}</p>}
        <h1 id="page-title" className="max-w-4xl text-h1">{title}</h1>
        {intro && <p className="mt-6 max-w-[56ch] text-lead text-ivory-50/80">{intro}</p>}
      </Container>
    </section>
  );
}