/**
 * PLACEHOLDER spa content. No invented durations, prices or ingredients.
 * Durations stay empty until confirmed; add them in Sanity ("Spa treatment").
 */
import { images, moreImages } from "@/lib/images";
import type { Treatment } from "@/lib/types";

export const spaIntro = {
  title: "Restoration, practised as a ritual.",
  text: "A calm, unhurried space to release what the day has held. Arrive early. Leave later than you planned.",
  hero: { src: images.spaLarge, alt: "Smooth stones, a folded towel and a candle arranged on a spa table" },
};

export const spaJourney = [
  { title: "Arrive", text: "Settle in with a few quiet minutes before your treatment begins." },
  { title: "Cleanse", text: "Begin with steam or the bath house to warm and prepare the body." },
  { title: "Restore", text: "Your treatment, paced and tailored to what you need that day." },
  { title: "Rest", text: "Linger in the lounge. There is no rush to leave." },
];

export const spaCategories = ["Bath rituals", "Massage", "Journeys"] as const;

const t = (p: Omit<Treatment, "durationMinutes"> ): Treatment => p;

export const placeholderTreatments: Treatment[] = [
  t({ slug: "moroccan-bath", title: "The Moroccan Bath", category: "Bath rituals", isSignature: true, summary: "Steam, a full-body exfoliation and a deep cleanse, in the traditional manner.", image: { src: images.steam, alt: "A softly lit steam room" }, paragraphs: ["Our signature ritual. Warmth and steam open the body, followed by a traditional exfoliation that leaves skin renewed and the mind quiet.", "Allow time to rest afterwards. This is a treatment to be taken slowly."] }),
  t({ slug: "relaxation-massage", title: "Relaxation Massage", category: "Massage", isSignature: false, summary: "Long, flowing strokes to ease the body and settle the mind.", image: { src: images.spaSmall, alt: "A massage table prepared for a treatment" }, paragraphs: ["A gentle massage designed for deep rest. Pressure is tailored to you, and the room is yours for as long as you need."] }),
  t({ slug: "deep-tissue-massage", title: "Deep Tissue Massage", category: "Massage", isSignature: false, summary: "Focused work on tension held in muscles and joints.", image: { src: moreImages.coach, alt: "A therapist preparing for a deep tissue treatment" }, paragraphs: ["Firm, targeted work to release areas of tightness, ideal alongside a training programme. Tell your therapist where you hold tension."] }),
  t({ slug: "hot-stone-massage", title: "Hot Stone Massage", category: "Massage", isSignature: false, summary: "Warmed stones and unhurried strokes for profound relaxation.", image: { src: images.spaLarge, alt: "Smooth stones arranged beside a candle" }, paragraphs: ["Heat melts tension before the hands begin. A deeply grounding treatment, especially restorative in the evening."] }),
  t({ slug: "bath-and-massage-journey", title: "Bath and Massage Journey", category: "Journeys", isSignature: false, summary: "The Moroccan bath followed by a massage, as one continuous experience.", image: { src: moreImages.lounge, alt: "A quiet lounge with soft seating" }, paragraphs: ["Our most complete experience: cleanse, restore and rest in a single, unhurried visit."] }),
];
