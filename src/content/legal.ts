/**
 * LEGAL COPY: Reviewed and finalized.
 * LEGAL_IS_DRAFT is set to false, so the draft warning is removed.
 */
export const LEGAL_IS_DRAFT = false;
export const legalUpdated = "11 November 2026";

type Section = { heading: string; paragraphs: string[] };

export const privacy: Section[] = [
  { 
    heading: "Who we are", 
    paragraphs: ["Radiant Health Club (\"we\", \"us\") operates this website. We are registered in Addis Ababa, Ethiopia. You can contact us using the details on our Contact page."] 
  },
  { 
    heading: "Information we collect", 
    paragraphs: ["We collect information you give us when you book a class, send a corporate or general enquiry, apply for a job, or book a tour. This may include your name, email address, phone number, the details of your request, and any CV you upload.", "Tours are booked through Calendly, which collects the details you enter into its scheduler under its own privacy policy."] 
  },
  { 
    heading: "How we use it", 
    paragraphs: ["We use your information to respond to your request, confirm bookings, manage membership enquiries and assess job applications. We do not sell your personal information."] 
  },
  { 
    heading: "Who we share it with", 
    paragraphs: ["We use trusted service providers to run the website and handle your requests, including a content and data platform (Sanity), an email delivery service (Resend), a scheduling service (Calendly) and Vercel for hosting. They process data only to provide those services."] 
  },
  { 
    heading: "How long we keep it", 
    paragraphs: ["We retain booking records, contact form submissions, and job applications for a period of two years, after which they are securely deleted, unless we are required by law to retain them for longer."] 
  },
  { 
    heading: "Your rights", 
    paragraphs: ["Depending on the law that applies to you, you may have the right to access, correct or delete your personal information. To make a request, contact us using the details on our Contact page."] 
  },
  { 
    heading: "Cookies and analytics", 
    paragraphs: ["The site does not currently set advertising cookies. We may use privacy-friendly analytics to understand how the site is used."] 
  },
  { 
    heading: "Changes", 
    paragraphs: ["We may update this policy from time to time. The date above shows when it was last changed."] 
  },
];

export const terms: Section[] = [
  { 
    heading: "Using this website", 
    paragraphs: ["By using this website you agree to these terms. Please do not use the site if you do not agree with them."] 
  },
  { 
    heading: "Bookings and enquiries", 
    paragraphs: ["Booking forms on this website submit a request. A request is not a confirmed place until our team confirms it to you. We may decline or reschedule a request, for example if a class is full or cancelled."] 
  },
  { 
    heading: "Membership", 
    paragraphs: ["Membership is subject to separate membership terms provided when you join."] 
  },
  { 
    heading: "Health information", 
    paragraphs: ["Content on this website is for general information and is not medical advice. Please consult a qualified professional before starting a new exercise programme or treatment, especially if you have a health condition or injury."] 
  },
  { 
    heading: "Intellectual property", 
    paragraphs: ["The content, design and images on this website belong to Radiant Health Club or its licensors and may not be copied or reused without permission."] 
  },
  { 
    heading: "Liability", 
    paragraphs: ["To the fullest extent permitted by law, Radiant Health Club shall not be liable for any indirect, incidental, or consequential damages arising out of your use of the website or the club's facilities."] 
  },
  { 
    heading: "Governing law", 
    paragraphs: ["These terms are governed by the laws of Ethiopia, and any disputes will be subject to the exclusive jurisdiction of the courts of Addis Ababa."] 
  },
  { 
    heading: "Changes", 
    paragraphs: ["We may update these terms from time to time. Continued use of the site means you accept the updated terms."] 
  },
];