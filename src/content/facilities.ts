import { images, moreImages } from "@/lib/images";
import type { Facility } from "@/lib/types";

export const facilitiesIntro = {
  title: "Spaces designed for focus and recovery.",
  text: "Each space at Radiant has one job and does it well. Move between them as your day requires.",
};

export const placeholderFacilities: Facility[] = [
  {
    slug: "gym-floor",
    title: "The training floor",
    summary: "Considered equipment, generous space and natural light.",
    hero: { src: images.gym, alt: "The training floor with weights and equipment" },
    gallery: [
      { src: moreImages.weights, alt: "Free weights on racks" },
      { src: moreImages.cardio, alt: "Cardio equipment facing the windows" },
      { src: moreImages.coach, alt: "A coach guiding a member through a lift" },
    ],
    amenities: ["[PLACEHOLDER: equipment list]", "Coaching on the floor", "Space to move between stations"],
    paragraphs: [
      "The training floor is laid out with room to breathe. Strength, conditioning and cardio zones are clearly defined, so you can move through a session without queueing or crowding.",
      "Coaches are present on the floor to guide technique and adapt your programme as you progress.",
    ],
  },
  {
    slug: "pool",
    title: "The pool",
    summary: "Still water for lengths, recovery and quiet.",
    hero: { src: images.pool, alt: "A swimming pool with marked lanes" },
    gallery: [
      { src: images.pool, alt: "Pool lanes in soft light" },
      { src: images.steam, alt: "A calm recovery space beside the pool" },
    ],
    amenities: ["[PLACEHOLDER: pool length and lanes]", "Poolside seating", "Towel service"],
    paragraphs: [
      "Swim for fitness or float for recovery. The pool is kept calm, with set lanes and a quiet atmosphere throughout the day.",
      "Pair a swim with time in the steam room to complete a full restorative session.",
    ],
  },
  {
    slug: "studios",
    title: "The studios",
    summary: "Rooms for yoga, mobility and small-group classes.",
    hero: { src: images.studio, alt: "A bright studio set up for yoga" },
    gallery: [
      { src: images.studio, alt: "The studio floor with mats laid out" },
      { src: moreImages.lounge, alt: "A quiet seating area outside the studio" },
    ],
    amenities: ["[PLACEHOLDER: studio count]", "Mats and props provided", "Natural light"],
    paragraphs: [
      "Our studios are intimate by design. Classes stay small so instructors can give real attention to each person in the room.",
      "From strength to stretch, the schedule moves through the week to suit different energy levels.",
    ],
  },
  {
    slug: "sauna-steam",
    title: "Sauna and steam",
    summary: "Heat and stillness to close the session.",
    hero: { src: images.steam, alt: "A softly lit steam room" },
    gallery: [
      { src: images.steam, alt: "Steam room benches" },
      { src: images.spaLarge, alt: "Towels and stones ready for use" },
    ],
    amenities: ["Sauna", "Steam room", "Cooling and rest area"],
    paragraphs: [
      "Heat helps the body release tension after training. Our sauna and steam rooms are kept clean, quiet and softly lit.",
      "Take your time. There is a rest area beside them for cooling down before you leave.",
    ],
  },
  {
    slug: "locker-rooms",
    title: "Locker rooms",
    summary: "Private, spotless and thoughtfully equipped.",
    hero: { src: moreImages.lockers, alt: "Lockers in a warmly lit changing room" },
    gallery: [
      { src: moreImages.lockers, alt: "Full-height lockers" },
      { src: images.spaSmall, alt: "Folded towels and toiletries" },
    ],
    amenities: ["Secure lockers", "Showers", "[PLACEHOLDER: toiletries and amenities]"],
    paragraphs: [
      "A good session ends in a good changing room. Ours are private, spacious and kept immaculate throughout the day.",
      "Everything you need is within reach, so you can leave exactly as you intended.",
    ],
  },
];