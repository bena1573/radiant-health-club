/** PLACEHOLDER team. Names, roles and credentials are NOT real. Replace via Sanity ("Team member"). Portraits are stand-ins. */
import { images, moreImages } from "@/lib/images";
import type { TeamMember } from "@/lib/types";

export const teamIntro = { title: "The people behind the club.", text: "Coaches, therapists and hosts who take pride in the details." };

const m = (slug: string, group: string, role: string, src: string, specialties: string[]): TeamMember => ({
  slug, name: `[PLACEHOLDER: name ${slug.split("-").pop()}]`, group, role, specialties,
  photo: { src, alt: `Portrait placeholder for ${role.toLowerCase()}` }, credentials: ["[PLACEHOLDER: verified qualifications]"],
  paragraphs: ["[PLACEHOLDER: biography]", "A considered, attentive approach to every member, whatever their goals."],
});

export const placeholderTeam: TeamMember[] = [
  m("leadership-1", "Leadership", "Founder", moreImages.lounge, ["Vision", "Hospitality"]),
  m("leadership-2", "Leadership", "General Manager", moreImages.lounge, ["Operations", "Member experience"]),
  m("trainer-1", "Trainer", "Head Coach", moreImages.coach, ["Strength", "Programming"]),
  m("trainer-2", "Trainer", "Personal Trainer", moreImages.weights, ["Conditioning", "Mobility"]),
  m("trainer-3", "Trainer", "Yoga Instructor", images.studio, ["Yoga", "Breathwork"]),
  m("therapist-1", "Therapist", "Senior Spa Therapist", images.spaSmall, ["Massage", "Moroccan bath"]),
];
