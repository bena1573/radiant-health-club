import { defineField, defineType } from "sanity";

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [defineField({ name: "alt", title: "Alt text", type: "string", validation: (r) => r.required().max(140) })],
});

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "image", title: "Social share image", type: "imageWithAlt" }),
  ],
});

export const slugField = (source = "title") =>
  defineField({ name: "slug", type: "slug", options: { source, maxLength: 96 }, validation: (r) => r.required() });

export const richText = defineType({
  name: "richText",
  title: "Rich text",
  type: "array",
  of: [{ type: "block" }, { type: "imageWithAlt" }],
});