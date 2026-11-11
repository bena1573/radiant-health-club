import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { images } from "@/lib/images";

/** HOME / 9. Closing call to action over a full-width image band. */
export function ClosingCta() {
  return (
    <section aria-labelledby="closing-title" className="relative isolate flex min-h-[70vh] items-center overflow-hidden bg-ink-950 py-28 text-ivory-50">
      <Photo src={images.closing} alt="" fill sizes="100vw" className="-z-10" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink-950/70" />
      <div className="mx-auto w-full max-w-wide px-5 text-center md:px-10 lg:px-16">
        <h2 id="closing-title" className="mx-auto max-w-3xl text-h1">Begin with a visit.</h2>
        <p className="mx-auto mt-6 max-w-xl text-lead text-ivory-50/80">
          Take a private tour of the club and meet the team. There is no obligation.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/book-a-tour" size="lg">Book a Tour</Button>
          <Button href="/contact" variant="secondary" size="lg">Contact us</Button>
        </div>
      </div>
    </section>
  );
}
