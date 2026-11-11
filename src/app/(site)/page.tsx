import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { Facilities } from "@/components/home/Facilities";
import { Pillars } from "@/components/home/Pillars";
import { SpaTeaser } from "@/components/home/SpaTeaser";
import { MembershipTeaser } from "@/components/home/MembershipTeaser";
import { Testimonials } from "@/components/home/Testimonials";
import { JournalPreview } from "@/components/home/JournalPreview";
import { ClosingCta } from "@/components/home/ClosingCta";
import { getLatestPosts } from "@/sanity/lib/queries";
import { getTestimonials } from "@/sanity/lib/content";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} | Private health club in Addis Ababa` },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

/**
 * HOME. Surface rhythm: ink hero, ivory intro, ink facilities, ivory pillars,
 * sand spa, ink membership, ivory testimonials, sand journal, ink closing CTA.
 */
export default async function HomePage() {
  const [posts, testimonials] = await Promise.all([getLatestPosts(3), getTestimonials()]);
  return (
    <>
      <Hero />
      <Intro />
      <Facilities />
      <Pillars />
      <SpaTeaser />
      <MembershipTeaser />
      <Testimonials items={testimonials} />
      <JournalPreview posts={posts} />
      <ClosingCta />
    </>
  );
}
