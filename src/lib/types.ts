import type { PortableTextBlock } from "next-sanity";

export type Img = { src: string; alt: string };

/** Body copy is either Sanity rich text (`body`) or placeholder paragraphs (`paragraphs`). */
export type Facility = {
  slug: string;
  title: string;
  summary: string;
  hero: Img;
  gallery: Img[];
  amenities: string[];
  paragraphs?: string[];
  body?: PortableTextBlock[];
};

export type ClassType = {
  slug: string;
  title: string;
  category: string;
  level: string;
  durationMinutes?: number;
  summary: string;
  image: Img;
  instructors: string[];
  paragraphs?: string[];
  body?: PortableTextBlock[];
};

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
export type Day = (typeof DAYS)[number];

export type Session = {
  id: string;
  day: Day;
  startTime: string; // "HH:MM" 24h
  classSlug: string;
  classTitle: string;
  level: string;
  instructor?: string;
  studio?: string;
  durationMinutes?: number;
};

export type Tier = { name: string; text: string; features: string[]; featured?: boolean; ctaLabel?: string };

export type Treatment = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  durationMinutes?: number;
  isSignature: boolean;
  image: Img;
  paragraphs?: string[];
  body?: PortableTextBlock[];
};

export type Faq = { question: string; answer: string; group: string };

export type TeamMember = { slug: string; name: string; group: string; role: string; specialties: string[]; photo: Img; credentials: string[]; paragraphs?: string[]; body?: PortableTextBlock[] };
export type Post = { slug: string; title: string; excerpt: string; publishedAt?: string; category?: string; author?: string; cover: Img; paragraphs?: string[]; body?: PortableTextBlock[] };
export type Testimonial = { quote: string; name: string; detail?: string; featured?: boolean };
export type GalleryItem = { id: string; title: string; kind: "photo" | "video"; category: string; image: Img; videoUrl?: string };
export type Job = { slug: string; title: string; department?: string; employmentType?: string; paragraphs?: string[]; body?: PortableTextBlock[] };
