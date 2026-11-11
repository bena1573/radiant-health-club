import { SiteChrome } from "@/components/layout/SiteChrome";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "Page not found" };

/** Global 404 (also catches unknown URLs). Wrapped in the site chrome so it stays on-brand. */
export default function NotFound() {
  return (
    <SiteChrome>
      <Section surface="ink" className="flex min-h-[80vh] items-center pt-40">
        <div className="max-w-xl">
          <h1 className="text-h1">This page could not be found.</h1>
          <p className="mt-6 text-lead text-stone-300">It may have moved. Head back home or book a visit.</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/">Return home</Button>
            <Button href="/book-a-tour" variant="secondary">Book a Tour</Button>
          </div>
        </div>
      </Section>
    </SiteChrome>
  );
}
