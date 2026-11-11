/** PLACEHOLDER gallery. Replace via Sanity ("Gallery item") with club photography and video. */
import { images, moreImages } from "@/lib/images";
import type { GalleryItem } from "@/lib/types";

export const galleryCategories = ["Facilities", "Spa", "Classes", "Community"] as const;
const g = (id: string, title: string, category: string, src: string): GalleryItem => ({ id, title, kind: "photo", category, image: { src, alt: title } });

export const placeholderGallery: GalleryItem[] = [
  g("g1", "The training floor", "Facilities", images.gym),
  g("g2", "Spa stones and candle", "Spa", images.spaLarge),
  g("g3", "The pool", "Facilities", images.pool),
  g("g4", "Yoga in the studio", "Classes", images.studio),
  g("g5", "The steam room", "Spa", images.steam),
  g("g6", "Free weights", "Facilities", moreImages.weights),
  g("g7", "A quiet lounge", "Community", moreImages.lounge),
  g("g8", "Locker room", "Facilities", moreImages.lockers),
  g("g9", "Coaching on the floor", "Classes", moreImages.coach),
  g("g10", "Treatment room", "Spa", images.spaSmall),
];
