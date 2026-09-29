import type { Inquiry } from "./contact";
import { inquirySummary } from "./contact";

export interface InquiryDelivery { send(inquiry: Inquiry): Promise<void>; }
export function deliveryConfigured(env: Partial<NodeJS.ProcessEnv> = process.env) {
  const production = env.VERCEL_ENV === "production" || env.SITE_MODE === "production";
  return Boolean(env.RESEND_API_KEY && env.CONTACT_FROM && env.CONTACT_TO && (!production || env.CONTACT_RATE_LIMIT_READY === "true"));
}
export function createResendDelivery(env: Partial<NodeJS.ProcessEnv> = process.env, fetcher: typeof fetch = fetch): InquiryDelivery {
  return {
    async send(inquiry) {
      const response = await fetcher("https://api.resend.com/emails", {
        method: "POST", signal: AbortSignal.timeout(10_000),
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json", "Idempotency-Key": `portfolio-inquiry/${inquiry.submissionId}` },
        body: JSON.stringify({ from: env.CONTACT_FROM, to: [env.CONTACT_TO], reply_to: inquiry.email, subject: `Project inquiry: ${inquiry.projectType}`, text: inquirySummary(inquiry) }),
      });
      if (!response.ok) throw new Error("Email provider did not accept the inquiry.");
      const result = await response.json() as { id?: unknown };
      if (typeof result.id !== "string" || !result.id) throw new Error("Email provider acceptance could not be confirmed.");
    },
  };
}
