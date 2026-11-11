import { Button } from "@/components/ui/Button";
import { hero } from "@/content/home";
import { HeroMedia } from "./HeroMedia";

/** HOME / 1. Full-bleed hero. The headline is the one big typographic moment on the page. */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative flex min-h-svh items-end bg-ink-950 pb-20 pt-40 text-ivory-50 md:pb-28">
      <HeroMedia poster={hero.poster} videoSrc={hero.videoSrc} />
      <div className="relative mx-auto w-full max-w-wide px-5 md:px-10 lg:px-16">
        <h1 id="hero-title" className="max-w-5xl text-display">{hero.title}</h1>
        <p className="mt-8 max-w-xl text-lead text-ivory-50/80">{hero.text}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/book-a-tour" size="lg">Book a Tour</Button>
          <Button href="/membership" variant="secondary" size="lg">Explore Membership</Button>
        </div>
      </div>
    </section>
  );
}
