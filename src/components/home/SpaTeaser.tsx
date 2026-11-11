import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { spa } from "@/content/home";

/** HOME / 5. Wellness and Spa teaser: split layout, one large image with a smaller overlapping inset. */
export function SpaTeaser() {
  return (
    <Section surface="sand" labelledBy="spa-title">
      <div className="grid items-center gap-16 lg:grid-cols-12">
        <div className="relative lg:col-span-6">
          <div className="relative aspect-[4/5] w-[85%]">
            <Photo src={spa.largeImage} alt={spa.largeAlt} fill sizes="(min-width: 1024px) 40vw, 85vw" />
          </div>
          <div className="absolute -bottom-10 right-0 aspect-square w-[45%] border-8 border-sand-100">
            <Photo src={spa.smallImage} alt={spa.smallAlt} fill sizes="(min-width: 1024px) 20vw, 45vw" />
          </div>
        </div>
        <Reveal className="lg:col-span-5 lg:col-start-8">
          <SectionHeader id="spa-title" label={spa.label} title={spa.title} intro={spa.text} />
          <Button href="/wellness-spa" variant="secondary" tone="light" className="mt-10">Discover the spa</Button>
        </Reveal>
      </div>
    </Section>
  );
}
