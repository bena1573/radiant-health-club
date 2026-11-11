import { Resend } from "resend";
import { siteConfig } from "@/config/site";

/** Escape user-supplied text before placing it in HTML email. */
export const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

export type BookingEmailData = {
  classTitle: string;
  sessionLabel?: string;
  preferredDateLabel: string;
  fullName: string;
  email: string;
  phone?: string;
  isMember: boolean;
  notes?: string;
};

const shell = (inner: string) => `<!doctype html><html><body style="margin:0;background:#f8f4ec;font-family:Helvetica,Arial,sans-serif;color:#0d0c0a">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff">
<tr><td style="background:#0d0c0a;padding:28px 32px;color:#f8f4ec;font-family:Georgia,serif;font-size:26px;letter-spacing:.02em">Radiant <span style="font-size:11px;letter-spacing:.3em;color:#c8a96a;text-transform:uppercase">Health Club</span></td></tr>
<tr><td style="padding:32px;line-height:1.65;font-size:15px">${inner}</td></tr>
<tr><td style="padding:20px 32px;border-top:1px solid #e6dfd2;font-size:12px;color:#7a7468">${esc(siteConfig.name)}, ${esc(siteConfig.contact.city)}</td></tr>
</table></td></tr></table></body></html>`;

const rows = (d: BookingEmailData) =>
  [
    ["Class", d.classTitle],
    d.sessionLabel ? ["Session", d.sessionLabel] : null,
    ["Preferred date", d.preferredDateLabel],
    ["Name", d.fullName],
    ["Email", d.email],
    d.phone ? ["Phone", d.phone] : null,
    ["Member", d.isMember ? "Yes" : "Not yet"],
    d.notes ? ["Notes", d.notes] : null,
  ].filter((r): r is string[] => !!r);

const rowsTable = (r: string[][]) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;border-top:1px solid #e6dfd2">${r
    .map(([k, v]) => `<tr><td style="padding:10px 0;border-bottom:1px solid #e6dfd2;color:#7a7468;width:130px;vertical-align:top">${esc(k)}</td><td style="padding:10px 0;border-bottom:1px solid #e6dfd2;white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join("")}</table>`;

/** Guest confirmation. Honest wording: this is a request, not a guaranteed place. */
export function guestEmail(d: BookingEmailData) {
  return {
    subject: `We've received your request: ${d.classTitle}`,
    html: shell(`<p>Dear ${esc(d.fullName.split(" ")[0])},</p>
<p>Thank you for your request. We have received it and our team will confirm your place by email or phone.</p>${table(d)}
<p>If anything needs to change, simply reply to this email.</p><p>We look forward to welcoming you.</p>`),
    text: `Dear ${d.fullName.split(" ")[0]},\n\nThank you for your request. We have received it and our team will confirm your place by email or phone.\n\n${rows(d).map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nIf anything needs to change, reply to this email.\n\n${siteConfig.name}`,
  };
}

/** Internal notification for the front desk. */
export function staffEmail(d: BookingEmailData) {
  return {
    subject: `New class request: ${d.classTitle} (${d.preferredDateLabel})`,
    html: shell(`<p><strong>New class booking request</strong></p>${table(d)}<p>Reply to this email to contact the guest directly.</p>`),
    text: `New class booking request\n\n${rows(d).map(([k, v]) => `${k}: ${v}`).join("\n")}`,
  };
}

const table = (d: BookingEmailData) => rowsTable(rows(d));

export type Mail = { subject: string; html: string; text: string; attachments?: { filename: string; content: Buffer }[] };

/**
 * Sends a pair of emails: an acknowledgement to the guest and a notification to the front desk.
 * Shared by every form (class booking, corporate enquiry). Never throws; reports what happened.
 */
export async function sendPair(guestTo: string, guest: Mail, staff: Mail): Promise<{ guest: boolean; staff: boolean }> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.BOOKING_FROM_EMAIL;
  const staffTo = process.env.BOOKING_NOTIFY_EMAIL;
  if (!key || !from) {
    console.warn("[email] Resend not configured (RESEND_API_KEY / BOOKING_FROM_EMAIL). Emails skipped.");
    return { guest: false, staff: false };
  }
  const resend = new Resend(key);
  const send = async (to: string, mail: Mail, replyTo?: string) => {
    try {
      const { error } = await resend.emails.send({ from, to, subject: mail.subject, html: mail.html, text: mail.text, ...(mail.attachments ? { attachments: mail.attachments } : {}), ...(replyTo ? { replyTo } : {}) });
      if (error) { console.error("[email] Resend error:", error); return false; }
      return true;
    } catch (e) {
      console.error("[email] Resend failure:", e);
      return false;
    }
  };
  const [g, s] = await Promise.all([send(guestTo, guest, staffTo), staffTo ? send(staffTo, staff, guestTo) : Promise.resolve(false)]);
  return { guest: g, staff: s };
}

export const sendBookingEmails = (d: BookingEmailData) => sendPair(d.email, guestEmail(d), staffEmail(d));

/* ---------------------------- Corporate enquiry ---------------------------- */
export type EnquiryEmailData = { company: string; fullName: string; role?: string; email: string; phone?: string; teamSize: string; message?: string };

const enquiryRows = (d: EnquiryEmailData) =>
  [["Company", d.company], ["Name", d.fullName], d.role ? ["Role", d.role] : null, ["Email", d.email], d.phone ? ["Phone", d.phone] : null, ["Team size", d.teamSize], d.message ? ["Message", d.message] : null].filter((r): r is string[] => !!r);

export function enquiryGuestEmail(d: EnquiryEmailData): Mail {
  const first = d.fullName.split(" ")[0];
  return {
    subject: "Thank you for your corporate membership enquiry",
    html: shell(`<p>Dear ${esc(first)},</p><p>Thank you for your enquiry on behalf of ${esc(d.company)}. A member of our team will be in touch shortly to discuss how we can help.</p>${rowsTable(enquiryRows(d))}<p>If you would like to add anything, simply reply to this email.</p>`),
    text: `Dear ${first},\n\nThank you for your enquiry on behalf of ${d.company}. A member of our team will be in touch shortly.\n\n${enquiryRows(d).map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${siteConfig.name}`,
  };
}

export function enquiryStaffEmail(d: EnquiryEmailData): Mail {
  return {
    subject: `New corporate enquiry: ${d.company} (${d.teamSize})`,
    html: shell(`<p><strong>New corporate membership enquiry</strong></p>${rowsTable(enquiryRows(d))}<p>Reply to this email to contact them directly.</p>`),
    text: `New corporate membership enquiry\n\n${enquiryRows(d).map(([k, v]) => `${k}: ${v}`).join("\n")}`,
  };
}

export const sendEnquiryEmails = (d: EnquiryEmailData) => sendPair(d.email, enquiryGuestEmail(d), enquiryStaffEmail(d));

/**
 * Generic acknowledgement + staff notification for simple forms (contact, careers).
 * `rows` are label/value pairs shown in both emails; values are HTML-escaped.
 */
export function simpleMails(o: { first: string; guestSubject: string; guestLead: string; staffSubject: string; staffTitle: string; rows: string[][] }): { guest: Mail; staff: Mail } {
  const list = o.rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  return {
    guest: {
      subject: o.guestSubject,
      html: shell(`<p>Dear ${esc(o.first)},</p><p>${esc(o.guestLead)}</p>${rowsTable(o.rows)}<p>If you would like to add anything, simply reply to this email.</p>`),
      text: `Dear ${o.first},\n\n${o.guestLead}\n\n${list}\n\n${siteConfig.name}`,
    },
    staff: { subject: o.staffSubject, html: shell(`<p><strong>${esc(o.staffTitle)}</strong></p>${rowsTable(o.rows)}<p>Reply to this email to contact them directly.</p>`), text: `${o.staffTitle}\n\n${list}` },
  };
}
