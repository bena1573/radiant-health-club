/** PLACEHOLDER journal articles (generic, non-medical). Slugs match the Home preview. Replace via Sanity ("Journal post"). */
import { images } from "@/lib/images";
import type { Post } from "@/lib/types";

export const journalIntro = { title: "The journal.", text: "Notes on training, recovery and living well." };

export const placeholderJournal: Post[] = [
  { slug: "why-recovery-is-part-of-the-programme", title: "Why recovery is part of the programme", excerpt: "Rest is where adaptation happens. How to build it into your week.", category: "Recovery", author: "Radiant", cover: { src: images.steam, alt: "A softly lit steam room" }, paragraphs: ["Training is only half of the picture. The time you spend recovering is when your body adapts to the work you have done.", "Build recovery into your week as deliberately as you plan your sessions: sleep, gentle movement, and time in the steam room or bath house.", "[PLACEHOLDER: replace with a real article]"] },
  { slug: "beginners-guide-to-the-moroccan-bath", title: "A beginner's guide to the Moroccan bath", excerpt: "What to expect, how to prepare and why it is worth the time.", category: "Wellness", author: "Radiant", cover: { src: images.spaLarge, alt: "Spa stones and a towel" }, paragraphs: ["The Moroccan bath is a slow, sensory ritual. Plan to arrive early and leave time afterwards to rest.", "Tell your therapist about anything you would like them to know, and let the experience set its own pace.", "[PLACEHOLDER: replace with a real article]"] },
  { slug: "strength-training-after-thirty", title: "Strength training after thirty", excerpt: "Simple principles for building strength that lasts.", category: "Training", author: "Radiant", cover: { src: images.gym, alt: "Weights on the training floor" }, paragraphs: ["Strength is built through consistency more than intensity. Start with the fundamentals and progress steadily.", "A coach can help you find the right starting point and keep your technique sound as the load increases.", "[PLACEHOLDER: replace with a real article]"] },
];
