import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Radiant Health Club")
    .items([
      S.listItem().title("Site settings").id("siteSettings").child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.documentTypeListItem("classType").title("Classes"),
      S.documentTypeListItem("classSession").title("Class schedule"),
      S.divider(),
      S.documentTypeListItem("teamMember").title("Team"),
      S.documentTypeListItem("facility").title("Facilities"),
      S.documentTypeListItem("treatment").title("Spa treatments"),
      S.documentTypeListItem("membershipTier").title("Membership tiers"),
      S.divider(),
      S.documentTypeListItem("post").title("Journal posts"),
      S.documentTypeListItem("galleryItem").title("Gallery"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.documentTypeListItem("faqItem").title("FAQ"),
      S.documentTypeListItem("jobOpening").title("Job openings"),
    ]);