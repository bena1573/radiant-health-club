import { placeholderPosts, type JournalCard } from "@/content/home";
import { sanityFetch } from "./fetch";
import { urlFor } from "./image";
export async function getLatestPosts(limit = 3): Promise<JournalCard[]> {
  const posts = await sanityFetch<any[]>(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...$limit]{ title, "slug": slug.current, excerpt, "cover": coverImage }`, { limit });
  if (!posts.length) return placeholderPosts;
  return posts.map((p) => ({ title: p.title, slug: p.slug, excerpt: p.excerpt || "", image: p.cover?.asset ? urlFor(p.cover).width(1200).height(800).auto("format").url() : placeholderPosts[0].image, alt: p.title }));
}
