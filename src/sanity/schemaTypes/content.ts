import { defineField, defineType } from "sanity";
import { slugField } from "./shared";

const media = (name = "image", title = "Image") => defineField({ name, title, type: "imageWithAlt" });

export const siteSettings = defineType({
  name: "siteSettings", title: "Site settings", type: "document",
  fields: [defineField({ name: "address", type: "string" }), defineField({ name: "phone", type: "string" }), defineField({ name: "email", type: "string" }), defineField({ name: "hours", type: "array", of: [{ type: "object", fields: [{ name: "days", type: "string" }, { name: "time", type: "string" }] }] })],
});

export const classType = defineType({
  name: "classType", title: "Class", type: "document",
  fields: [defineField({ name: "title", type: "string" }), slugField(), defineField({ name: "summary", type: "text" }), media()],
});

export const classSession = defineType({
  name: "classSession", title: "Class session", type: "document",
  fields: [defineField({ name: "class", type: "reference", to: [{ type: "classType" }] }), defineField({ name: "day", type: "string" }), defineField({ name: "startTime", type: "string" })],
});

export const classBooking = defineType({
  name: "classBooking", title: "Class booking", type: "document",
  fields: [defineField({ name: "classTitle", type: "string", readOnly: true }), defineField({ name: "fullName", type: "string", readOnly: true }), defineField({ name: "email", type: "string", readOnly: true }), defineField({ name: "preferredDate", type: "date", readOnly: true }), defineField({ name: "status", type: "string", initialValue: "new" })],
});

export const corporateEnquiry = defineType({
  name: "corporateEnquiry", title: "Corporate enquiry", type: "document",
  fields: [defineField({ name: "company", type: "string" }), defineField({ name: "fullName", type: "string" }), defineField({ name: "email", type: "string" })],
});

export const contactMessage = defineType({
  name: "contactMessage", title: "Contact message", type: "document",
  fields: [defineField({ name: "fullName", type: "string" }), defineField({ name: "email", type: "string" }), defineField({ name: "message", type: "text" })],
});

export const jobApplication = defineType({
  name: "jobApplication", title: "Job application", type: "document",
  fields: [defineField({ name: "fullName", type: "string" }), defineField({ name: "email", type: "string" })],
});

export const teamMember = defineType({
  name: "teamMember", title: "Team member", type: "document",
  fields: [defineField({ name: "name", type: "string" }), slugField("name"), defineField({ name: "role", type: "string" }), media("photo")],
});

export const facility = defineType({
  name: "facility", title: "Facility", type: "document",
  fields: [defineField({ name: "title", type: "string" }), slugField(), media("heroImage")],
});

export const treatment = defineType({
  name: "treatment", title: "Spa treatment", type: "document",
  fields: [defineField({ name: "title", type: "string" }), slugField(), media()],
});

export const membershipTier = defineType({
  name: "membershipTier", title: "Membership tier", type: "document",
  fields: [defineField({ name: "name", type: "string" }), defineField({ name: "features", type: "array", of: [{ type: "string" }] })],
});

export const post = defineType({
  name: "post", title: "Journal post", type: "document",
  fields: [defineField({ name: "title", type: "string" }), slugField(), media("coverImage")],
});

export const galleryItem = defineType({
  name: "galleryItem", title: "Gallery item", type: "document",
  fields: [defineField({ name: "title", type: "string" }), media()],
});

export const testimonial = defineType({
  name: "testimonial", title: "Testimonial", type: "document",
  fields: [defineField({ name: "quote", type: "text" }), defineField({ name: "name", type: "string" })],
});

export const faqItem = defineType({
  name: "faqItem", title: "FAQ", type: "document",
  fields: [defineField({ name: "question", type: "string" }), defineField({ name: "answer", type: "text" })],
});

export const jobOpening = defineType({
  name: "jobOpening", title: "Job opening", type: "document",
  fields: [defineField({ name: "title", type: "string" }), slugField()],
});