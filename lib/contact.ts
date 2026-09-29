import { site } from "./site";

export interface Inquiry {
  name: string; email: string; company: string; projectType: string; budget: string;
  description: string; website: string; submissionId: string;
}
export type FieldErrors = Partial<Record<keyof Inquiry, string>>;
export type ContactResult = { ok: true; status: "accepted" } | { ok: false; status: "invalid" | "unconfigured" | "failed" | "forbidden" | "too_large"; message: string; errors?: FieldErrors };
export function validateInquiry(input: unknown): { data?: Inquiry; errors: FieldErrors } {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { errors: { description: "Provide a project inquiry." } };
  const source = input as Record<string, unknown>; const errors: FieldErrors = {};
  const field = (key: keyof Inquiry) => typeof source[key] === "string" ? source[key].trim() : "";
  const data: Inquiry = { name: field("name"), email: field("email"), company: field("company"), projectType: field("projectType"), budget: field("budget"), description: field("description"), website: field("website"), submissionId: field("submissionId") };
  if (data.name.length < 2 || data.name.length > 100 || /[\r\n]/.test(data.name)) errors.name = "Enter a name between 2 and 100 characters.";
  if (data.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Enter a valid email address.";
  if (data.company.length > 150 || /[\r\n]/.test(data.company)) errors.company = "Keep the company name under 150 characters.";
  if (!site.projectTypes.includes(data.projectType)) errors.projectType = "Choose a project type.";
  if (data.budget && !site.budgetOptions.includes(data.budget)) errors.budget = "Choose one of the listed budget options.";
  if (data.description.length < 20 || data.description.length > 5000) errors.description = "Describe your project in 20 to 5,000 characters.";
  if (data.website) errors.website = "This submission could not be accepted.";
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data.submissionId)) errors.submissionId = "Refresh the page and try again.";
  return { data: Object.keys(errors).length ? undefined : data, errors };
}
export function inquirySummary(data: Pick<Inquiry, "name" | "email" | "company" | "projectType" | "budget" | "description">) {
  return [`Name: ${data.name}`, `Email: ${data.email}`, `Company: ${data.company || "Not provided"}`, `Project type: ${data.projectType || "Not selected"}`, `Budget: ${data.budget || "Prefer to discuss"}`, "", "Project description:", data.description].join("\n");
}
