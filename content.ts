import { placeholderFacilities } from "@/content/facilities";
import { placeholderClasses, placeholderSessions } from "@/content/classes";
import { placeholderTiers } from "@/content/membership";
import { placeholderTreatments } from "@/content/spa";
import { placeholderFaqs } from "@/content/faq";
import { placeholderTeam } from "@/content/team";
import { placeholderJournal } from "@/content/journal";
import { placeholderGallery } from "@/content/gallery";
import { testimonials as placeholderTestimonials } from "@/content/home";

export async function getFacilities() { return placeholderFacilities; }
export async function getFacility(slug: string) { return { facility: placeholderFacilities[0], next: placeholderFacilities[1], total: 1 }; }
export async function getClasses() { return placeholderClasses; }
export async function getClass(slug: string) { return placeholderClasses[0]; }
export async function getSessions() { return placeholderSessions; }
export async function getTiers() { return placeholderTiers; }
export async function getTreatments() { return placeholderTreatments; }
export async function getTreatment(slug: string) { return { treatment: placeholderTreatments[0], related: [] }; }
export async function getFaqs(group?: string) { return placeholderFaqs; }
export async function getTeam() { return placeholderTeam; }
export async function getTeamMember(slug: string) { return placeholderTeam[0]; }
export async function getPosts() { return placeholderJournal; }
export async function getPost(slug: string) { return { post: placeholderJournal[0], related: [] }; }
export async function getTestimonials() { return placeholderTestimonials; }
export async function getGallery() { return placeholderGallery; }
export async function getJobs() { return []; }