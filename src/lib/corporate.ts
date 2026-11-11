import { z } from "zod";

export const TEAM_SIZES = ["Up to 10", "11 to 50", "51 to 200", "More than 200"] as const;

/** Server-side validation for the corporate enquiry form. */
export const enquirySchema = z.object({
  company: z.string().trim().min(2, "Enter your company name.").max(150),
  fullName: z.string().trim().min(2, "Enter your full name.").max(100),
  role: z.string().trim().max(100).optional(),
  email: z.email("Enter a valid email address.").max(200),
  phone: z.string().trim().max(40).optional(),
  teamSize: z.enum(TEAM_SIZES, { error: "Choose an approximate team size." }),
  message: z.string().trim().max(1500, "Please keep your message under 1500 characters.").optional(),
  /** Honeypot: checked in the route, which pretends success. */
  website: z.string().max(200).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
