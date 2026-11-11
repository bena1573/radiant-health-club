import { images } from "@/lib/images";

export const hero = {
  title: "Move well. Restore deeply. Belong.",
  text: "A private health club in Addis Ababa, designed for training, recovery and quiet.",
  videoSrc: undefined as string | undefined,
  poster: images.heroPoster,
};

export const intro = {
  statement: "Radiant is a place to slow down and do the work that matters: training with intent, recovering with care, and spending time among people who value both.",
  body: "Every space has been considered, from the training floor to the bath house. Nothing is hurried and nothing is excessive. You arrive, and the day settles.",
  image: images.intro,
  imageAlt: "A calm treatment room with soft light and folded towels",
};

export const facilities = [
  { slug: "gym-floor", title: "The training floor", text: "Considered equipment, generous space and natural light.", image: images.gym, alt: "Weights and training equipment on the gym floor" },
  { slug: "pool", title: "The pool", text: "Still water for lengths, recovery and quiet.", image: images.pool, alt: "A swimming pool with marked lanes" },
  { slug: "studios", title: "The studios", text: "Rooms for yoga, mobility and small-group classes.", image: images.studio, alt: "A person practising yoga in a bright studio" },
  { slug: "sauna-steam", title: "Sauna and steam", text: "Heat and stillness to close the session.", image: images.steam, alt: "A warm, softly lit steam room" },
];

export const pillars = [
  { title: "Move", text: "Strength, conditioning and mobility programmes guided by coaches who listen before they prescribe." },
  { title: "Restore", text: "Time in the bath house, the sauna and the treatment rooms is part of the plan, not an extra." },
  { title: "Belong", text: "A members' club in the truest sense: familiar faces, unhurried service and a room that knows you." },
];

export const spa = {
  label: "Wellness and Spa",
  title: "Restoration, practised as a ritual.",
  text: "From the Moroccan bath to deep-tissue massage, each treatment is paced to let the body release what it has been holding. Arrive early. Leave later than you planned.",
  largeImage: images.spaLarge,
  largeAlt: "Smooth stones, a folded towel and a candle arranged on a spa table",
  smallImage: images.spaSmall,
  smallAlt: "A massage table prepared for a treatment",
};

export const testimonials = [
  { quote: "The calmest hour of my day. I walk in tired and walk out clear.", name: "[PLACEHOLDER: member name]", detail: "[PLACEHOLDER: membership detail]" },
  { quote: "Serious training in a room that never feels like a gym.", name: "[PLACEHOLDER: member name]", detail: "[PLACEHOLDER: membership detail]" },
  { quote: "The bath house alone is worth the visit. The people make it a habit.", name: "[PLACEHOLDER: member name]", detail: "[PLACEHOLDER: membership detail]" },
  { quote: "Attentive without being intrusive. Exactly the standard I look for.", name: "[PLACEHOLDER: member name]", detail: "[PLACEHOLDER: membership detail]" },
];

export type JournalCard = { title: string; slug: string; excerpt: string; date?: string; image: string; alt: string; category?: string };

export const placeholderPosts: JournalCard[] = [
  { title: "Why recovery is part of the programme", slug: "why-recovery-is-part-of-the-programme", excerpt: "Rest is where adaptation happens. How to build it into your week.", image: images.steam, alt: "A softly lit steam room", category: "Recovery" },
  { title: "A beginner's guide to the Moroccan bath", slug: "beginners-guide-to-the-moroccan-bath", excerpt: "What to expect, how to prepare and why it is worth the time.", image: images.spaLarge, alt: "Spa stones and a towel", category: "Wellness" },
  { title: "Strength training after thirty", slug: "strength-training-after-thirty", excerpt: "Simple principles for building strength that lasts.", image: images.gym, alt: "Weights on the training floor", category: "Training" },
];