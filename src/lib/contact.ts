import { z } from "zod";

export const TOPICS = ["Membership", "Classes", "Wellness and Spa", "Corporate", "Careers", "Something else"] as const;

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name.").max(100),
  email: z.email("Enter a valid email address.").max(200),
  phone: z.string().trim().max(40).optional(),
  topic: z.enum(TOPICS, { error: "Choose a topic." }),
  message: z.string().trim().min(5, "Please write a short message.").max(2000, "Please keep your message under 2000 characters."),
  website: z.string().max(200).optional(), // honeypot, checked in the route
});
