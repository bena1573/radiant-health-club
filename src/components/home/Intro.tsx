import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import { intro } from "@/content/home";

/** HOME / 2. Brand introduction: a large serif statement beside one quiet image. */
export function Intro() {
  return (
    <Section labelledBy="intro-title" surface="ivory">
      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-7">
          <h2 id="intro-title" className="max-w-3xl font-serif text-h1 font-light">{intro.statement}</h2>
          <p className="mt-10 max-w-[52ch] text-lead text-stone-500">{intro.body}</p>
        </Reveal>
        <div className="relative aspect-[4/5] w-full lg:col-span-5">
          <Photo src={intro.image} alt={intro.imageAlt} fill sizes="(min-width: 1024px) 40vw, 100vw" />
        </div>
      </div>
    </Section>
  );
}
