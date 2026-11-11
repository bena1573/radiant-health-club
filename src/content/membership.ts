/**
 * PLACEHOLDER membership content. Tier names and features are illustrative; pricing is never shown.
 * Features are cumulative so the comparison table reads clearly. Replace via Sanity "Membership tier".
 */
import type { Tier } from "@/lib/types";

export const membershipIntro = {
  title: "Membership, shaped around how you live.",
  text: "Choose the level of access that suits your routine. Our team will guide you to the right fit.",
};

export const placeholderTiers: Tier[] = [
  { name: "Essential", text: "Full access to the training floor, studios and pool.", features: ["Training floor", "Studios and group classes", "Pool", "Locker rooms"] },
  { name: "Signature", text: "Everything in Essential, with the full wellness experience.", features: ["Training floor", "Studios and group classes", "Pool", "Locker rooms", "Sauna, steam and bath house", "Priority class booking", "Guest privileges"], featured: true },
  { name: "Private", text: "A tailored membership with dedicated coaching and care.", features: ["Training floor", "Studios and group classes", "Pool", "Locker rooms", "Sauna, steam and bath house", "Priority class booking", "Guest privileges", "Personal training", "Spa treatment allowance", "Concierge scheduling"] },
];

export const joiningSteps = [
  { title: "Visit", text: "Book a private tour and see the club for yourself." },
  { title: "Talk", text: "Meet the team, share your goals and ask anything you like." },
  { title: "Join", text: "Choose your membership and we will take care of the rest." },
];

export const corporateIntro = {
  title: "Wellbeing for the people who move your business.",
  text: "Corporate memberships give your team access to the club, with arrangements tailored to your organisation.",
};

export const corporateBenefits = [
  { title: "Tailored access", text: "Plans shaped around your team's size, schedules and goals." },
  { title: "One point of contact", text: "A dedicated member of our team handles onboarding and questions." },
  { title: "Wellbeing that shows", text: "A place for teams to train, recover and spend time well together." },
  { title: "Flexible arrangements", text: "[PLACEHOLDER: confirm corporate terms, billing and eligibility]" },
];
