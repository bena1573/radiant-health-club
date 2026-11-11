import { images, moreImages } from "@/lib/images";
import type { ClassType, Session } from "@/lib/types";

export const classesIntro = {
  title: "Train with intent. Move with ease.",
  text: "Small classes, experienced coaches and a schedule that fits around your week.",
};

export const placeholderClasses: ClassType[] = [
  { slug: "strength-foundations", title: "Strength Foundations", category: "Strength", level: "All levels", durationMinutes: 50, summary: "Build strength with sound technique, guided by a coach.", image: { src: moreImages.weights, alt: "Weights prepared for a strength class" }, instructors: [], paragraphs: ["A coached session focused on the main movement patterns, built to be demanding and safe in equal measure.", "Suitable whether you are new to lifting or returning to it."] },
  { slug: "conditioning", title: "Conditioning", category: "Conditioning", level: "Intermediate", durationMinutes: 45, summary: "Raise your engine with paced, structured intervals.", image: { src: moreImages.coach, alt: "A coach leading a conditioning class" }, instructors: [], paragraphs: ["Interval-based work that builds stamina and resilience. Intensity is scaled to each person in the room."] },
  { slug: "yoga-flow", title: "Yoga Flow", category: "Mind and body", level: "All levels", durationMinutes: 60, summary: "Steady, breath-led movement for strength and calm.", image: { src: images.studio, alt: "A yoga class in progress" }, instructors: [], paragraphs: ["A flowing practice linking breath and movement. Come as you are; every pose has options."] },
  { slug: "mobility-and-recovery", title: "Mobility and Recovery", category: "Mind and body", level: "All levels", durationMinutes: 45, summary: "Release tension and restore range of motion.", image: { src: moreImages.lounge, alt: "A quiet studio prepared for mobility work" }, instructors: [], paragraphs: ["Gentle, deliberate work to ease stiffness and support the rest of your training."] },
  { slug: "pilates", title: "Pilates", category: "Mind and body", level: "Beginner", durationMinutes: 50, summary: "Core control and posture, taught in small groups.", image: { src: images.studio, alt: "Mats arranged for a Pilates class" }, instructors: [], paragraphs: ["Precise, low-impact work that builds deep strength and awareness."] },
  { slug: "aqua-conditioning", title: "Aqua Conditioning", category: "Aqua", level: "All levels", durationMinutes: 45, summary: "Joint-friendly conditioning in the pool.", image: { src: images.pool, alt: "The pool prepared for an aqua class" }, instructors: [], paragraphs: ["Use the resistance of water for a full-body session that is gentle on the joints."] },
];

const s = (id: string, day: Session["day"], startTime: string, slug: string): Session => {
  const c = placeholderClasses.find((x) => x.slug === slug)!;
  return { id, day, startTime, classSlug: slug, classTitle: c.title, level: c.level, durationMinutes: c.durationMinutes, studio: "[PLACEHOLDER: studio]" };
};

export const placeholderSessions: Session[] = [
  s("p1", "Monday", "07:00", "strength-foundations"),
  s("p2", "Monday", "18:00", "yoga-flow"),
  s("p3", "Tuesday", "06:30", "conditioning"),
  s("p4", "Tuesday", "12:30", "mobility-and-recovery"),
  s("p5", "Wednesday", "07:00", "pilates"),
  s("p6", "Wednesday", "18:30", "strength-foundations"),
  s("p7", "Thursday", "06:30", "aqua-conditioning"),
  s("p8", "Thursday", "18:00", "conditioning"),
  s("p9", "Friday", "07:00", "yoga-flow"),
  s("p10", "Saturday", "09:00", "strength-foundations"),
  s("p11", "Saturday", "10:30", "pilates"),
  s("p12", "Sunday", "10:00", "mobility-and-recovery"),
];

export const personalTraining = {
  label: "Personal training",
  title: "One coach. One plan. Entirely yours.",
  text: "Work one to one with a coach who designs around your goals, your schedule and your body. Sessions are available by appointment.",
  image: { src: moreImages.coach, alt: "A personal trainer and client reviewing a programme" },
};

export const groupFitness = {
  label: "Group fitness",
  title: "Energy of a group, attention of a coach.",
  text: "Our classes are kept deliberately small, so you get the motivation of training alongside others without losing individual guidance.",
  image: { src: images.studio, alt: "A small group class in the studio" },
};