import { validateInquiry, type ContactResult } from "./contact";
import { createResendDelivery, deliveryConfigured, type InquiryDelivery } from "./delivery";

const MAX_BYTES = 16 * 1024;
function response(body: ContactResult, status: number) { return Response.json(body, { status, headers: { "Cache-Control": "no-store" } }); }
export async function handleContact(request: Request, options: { env?: Partial<NodeJS.ProcessEnv>; delivery?: InquiryDelivery } = {}) {
  const env = options.env || process.env;
  const origin = request.headers.get("origin");
  const allowedOrigins = new Set([new URL(request.url).origin]);
  if (env.SITE_URL) { try { allowedOrigins.add(new URL(env.SITE_URL).origin); } catch { /* Invalid configured origin is not allowed. */ } }
  if (!origin || !allowedOrigins.has(origin)) return response({ ok: false, status: "forbidden", message: "Submit this form from the portfolio website." }, 403);
  if (!(request.headers.get("content-type") || "").toLowerCase().startsWith("application/json")) return response({ ok: false, status: "invalid", message: "Send a JSON project inquiry." }, 415);
  if (Number(request.headers.get("content-length") || 0) > MAX_BYTES) return response({ ok: false, status: "too_large", message: "Your inquiry is too large. Please shorten it." }, 413);
  let input: unknown;
  try {
    const reader = request.body?.getReader(); let size = 0; const parts: Uint8Array[] = [];
    if (!reader) throw new Error("Missing body");
    while (true) {
      const chunk = await reader.read(); if (chunk.done) break;
      size += chunk.value.byteLength;
      if (size > MAX_BYTES) { await reader.cancel(); return response({ ok: false, status: "too_large", message: "Your inquiry is too large. Please shorten it." }, 413); }
      parts.push(chunk.value);
    }
    const bytes = new Uint8Array(size); let offset = 0;
    for (const part of parts) { bytes.set(part, offset); offset += part.length; }
    input = JSON.parse(new TextDecoder().decode(bytes));
  } catch { return response({ ok: false, status: "invalid", message: "The inquiry could not be read. Please try again." }, 400); }
  const { data, errors } = validateInquiry(input);
  if (!data) return response({ ok: false, status: "invalid", message: "Please check the highlighted fields.", errors }, 400);
  if (!options.delivery && !deliveryConfigured(env)) return response({ ok: false, status: "unconfigured", message: "Online submission is not available yet. Copy your project brief or use the listed contact methods." }, 503);
  try { await (options.delivery || createResendDelivery(env)).send(data); }
  catch { return response({ ok: false, status: "failed", message: "Your inquiry could not be confirmed. Your details are still here; try again or copy your brief." }, 502); }
  return response({ ok: true, status: "accepted" }, 200);
}
