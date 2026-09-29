import { test } from "node:test";
import assert from "node:assert/strict";
import { validateInquiry, inquirySummary } from "../lib/contact";
import { handleContact } from "../lib/contact-handler";
import { createResendDelivery, deliveryConfigured } from "../lib/delivery";

const inquiry = { name: "Test Founder", email: "founder@example.com", company: "Example", projectType: "MVP", budget: "Not sure yet", description: "Build a customer portal with clear project milestones.", website: "", submissionId: "12345678-1234-4234-8234-123456789012" };
function request(body: unknown = inquiry, extra: Record<string,string> = {}) { return new Request("http://localhost:3000/api/contact", { method: "POST", headers: { origin: "http://localhost:3000", "content-type": "application/json", ...extra }, body: JSON.stringify(body) }); }
test("valid input is normalized; optional fields remain optional", () => { const result = validateInquiry({ ...inquiry, name: "  Test Founder  ", company: "", budget: "" }); assert.equal(result.data?.name,"Test Founder"); assert.deepEqual(result.errors,{}); });
test("validation rejects invalid email, unsupported options, short description and header injection", () => { const { errors } = validateInquiry({ ...inquiry, name: "Hello\r\nInjected", email: "invalid", projectType: "Invented", budget: "Invented", description: "short" }); for (const key of ["name","email","projectType","budget","description"] as const) assert.ok(errors[key]); });
test("honeypot and missing submission ID cannot be accepted", () => { assert.ok(validateInquiry({ ...inquiry, website: "spam" }).errors.website); assert.ok(validateInquiry({ ...inquiry, submissionId: "" }).errors.submissionId); });
test("malformed object and oversized field fail validation", () => { assert.ok(validateInquiry(null).errors.description); assert.ok(validateInquiry({ ...inquiry, description: "x".repeat(5001) }).errors.description); });
test("missing delivery configuration returns explicit unavailable status", async () => { const result = await handleContact(request(),{ env: {} }); assert.equal(result.status,503); assert.equal((await result.json()).status,"unconfigured"); });
test("invalid request does not invoke delivery", async () => { let calls=0; const result = await handleContact(request({ ...inquiry,email:"bad" }),{ delivery: { async send(){calls++;} } }); assert.equal(result.status,400); assert.equal(calls,0); });
test("foreign/missing origins are rejected before delivery", async () => { for (const origin of ["https://foreign.example", ""]) { const result = await handleContact(request(inquiry,{ origin }),{ env: {} }); assert.equal(result.status,403); } });
test("non-JSON and oversized requests fail clearly", async () => { assert.equal((await handleContact(request(inquiry,{ "content-type":"text/plain" }))).status,415); assert.equal((await handleContact(request({ description:"x".repeat(17000) }))).status,413); });
test("provider acceptance is required for successful response", async () => { let sent=false; const result = await handleContact(request(),{ delivery:{async send(data){assert.equal(data.submissionId,inquiry.submissionId);sent=true;}} }); assert.equal(result.status,200); assert.equal(sent,true); assert.deepEqual(await result.json(),{ok:true,status:"accepted"}); });
test("provider failure has retryable error and does not leak details", async () => { const result = await handleContact(request(),{ delivery:{async send(){throw new Error("secret diagnostic");}} }); assert.equal(result.status,502); const body=await result.text();assert.ok(!body.includes("secret")); });
test("production delivery requires deployment rate limiting confirmation", () => { const env={RESEND_API_KEY:"test",CONTACT_FROM:"sender@example.com",CONTACT_TO:"owner@example.com",SITE_MODE:"production"}; assert.equal(deliveryConfigured(env),false);assert.equal(deliveryConfigured({...env,CONTACT_RATE_LIMIT_READY:"true"}),true); });
test("Resend adapter uses fixed sender, reply-to and stable idempotency key", async () => {
  const keys:string[]=[];
  const fetcher:typeof fetch=async (_url,options)=>{const body=JSON.parse(String(options?.body));assert.equal(body.from,"fixed@example.com");assert.equal(body.reply_to,inquiry.email);assert.equal(body.subject,"Project inquiry: MVP");assert.equal(body.text,inquirySummary(inquiry));keys.push(new Headers(options?.headers).get("Idempotency-Key") || "");return Response.json({id:"mock-id"});};
  const delivery=createResendDelivery({RESEND_API_KEY:"test",CONTACT_FROM:"fixed@example.com",CONTACT_TO:"owner@example.com"},fetcher);await delivery.send(inquiry);await delivery.send(inquiry);assert.equal(keys[0],keys[1]);assert.ok(keys[0].includes(inquiry.submissionId));
});
test("adapter rejects an HTTP success without a provider receipt", async () => { const delivery=createResendDelivery({},async()=>Response.json({}));await assert.rejects(()=>delivery.send(inquiry)); });
