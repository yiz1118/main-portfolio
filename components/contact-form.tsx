"use client";
import { useRef, useState } from "react";
import { ArrowUpRight, Copy, LoaderCircle, Mail, MessageCircle } from "lucide-react";
import { site, emailUrl, whatsappUrl } from "@/lib/site";
import { inquirySummary, validateInquiry, type Inquiry, type FieldErrors, type ContactResult } from "@/lib/contact";
import { track } from "@/lib/analytics";

const empty = { name: "", email: "", company: "", projectType: "", budget: "", description: "", website: "" };
export function ContactForm({ configured }: { configured: boolean }) {
  const [values, setValues] = useState(empty); const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<{ message: string; error?: boolean }>(); const [pending, setPending] = useState(false);
  const [showBrief, setShowBrief] = useState(false); const [accepted, setAccepted] = useState(false);
  const id = useRef<string | null>(null); const busy = useRef(false); const form = useRef<HTMLFormElement>(null);
  function update(key: keyof typeof empty, value: string) {
    setValues(current => ({ ...current, [key]: value })); setErrors(current => ({ ...current, [key]: undefined }));
    setAccepted(false); setStatus(undefined); id.current = null;
  }
  async function submit(event: React.FormEvent) {
    event.preventDefault(); if (busy.current || accepted) return;
    const submissionId = id.current || crypto.randomUUID(); id.current = submissionId;
    const inquiry: Inquiry = { ...values, submissionId }; const validation = validateInquiry(inquiry);
    setErrors(validation.errors);
    if (!validation.data) { setStatus({ message: "Please check the highlighted fields.", error: true }); const first = Object.keys(validation.errors)[0]; form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus(); return; }
    if (!configured) { window.location.href = emailUrl(inquirySummary(values)); return; }
    busy.current = true; setPending(true); setStatus(undefined);
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(inquiry), signal: AbortSignal.timeout(15_000) });
      const result = await response.json() as ContactResult;
      if (!response.ok || !result.ok) {
        if (!result.ok) { setErrors(result.errors || {}); setStatus({ message: result.message, error: true }); }
        else setStatus({ message: "Your inquiry could not be confirmed. Please try again.", error: true });
      } else { setAccepted(true); setStatus({ message: "Your inquiry has been accepted by the email service. Thanks for sharing your project." }); track({ name: "contact_accepted" }); }
    } catch { setStatus({ message: "Your inquiry could not be confirmed. Your details are still here; try again or copy your brief.", error: true }); }
    finally { busy.current = false; setPending(false); }
  }
  async function copy() {
    const summary = inquirySummary(values);
    try { await navigator.clipboard.writeText(summary); setStatus({ message: "Project brief copied. Paste it into your preferred email or message." }); }
    catch { setShowBrief(true); setStatus({ message: "Select and copy the project brief below." }); }
  }
  const errorProps = (name: keyof Inquiry) => ({ "aria-invalid": Boolean(errors[name]), "aria-describedby": errors[name] ? `${name}-error` : name === "description" ? "description-hint" : undefined });
  const error = (name: keyof Inquiry) => errors[name] && <span id={`${name}-error`} className="field-error">{errors[name]}</span>;
  return <form className="contact-form" ref={form} onSubmit={submit} noValidate>
    <h2 className="form-title">Tell me about your project.</h2>
    {!configured && <p className="form-introduction">Put your thoughts together here, then share your brief by email or WhatsApp.</p>}
    <div className="form-grid"><div className="form-field"><label htmlFor="name">Name <span>Required</span></label><input id="name" name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Your name" value={values.name} onChange={e => update("name",e.target.value)} {...errorProps("name")} disabled={pending} />{error("name")}</div>
    <div className="form-field"><label htmlFor="email">Email <span>Required</span></label><input id="email" name="email" autoComplete="email" type="email" required maxLength={254} placeholder="you@company.com" value={values.email} onChange={e => update("email",e.target.value)} {...errorProps("email")} disabled={pending} />{error("email")}</div>
    <div className="form-field"><label htmlFor="company">Company <span>Optional</span></label><input id="company" name="company" autoComplete="organization" maxLength={150} placeholder="Company or project name" value={values.company} onChange={e => update("company",e.target.value)} {...errorProps("company")} disabled={pending} />{error("company")}</div>
    <div className="form-field"><label htmlFor="projectType">Project type <span>Required</span></label><select id="projectType" name="projectType" required value={values.projectType} onChange={e => update("projectType",e.target.value)} {...errorProps("projectType")} disabled={pending}><option value="">Select a project type</option>{site.projectTypes.map(type => <option key={type}>{type}</option>)}</select>{error("projectType")}</div>
    <div className="form-field form-wide"><label htmlFor="budget">Budget range <span>Optional</span></label><select id="budget" name="budget" value={values.budget} onChange={e => update("budget",e.target.value)} {...errorProps("budget")} disabled={pending}><option value="">Select your preference</option>{site.budgetOptions.map(b => <option key={b}>{b}</option>)}</select>{error("budget")}</div>
    <div className="form-field form-wide"><label htmlFor="description">Tell me about your project <span>Required</span></label><textarea id="description" name="description" required minLength={20} maxLength={5000} placeholder="What are you building, who is it for, and what would a useful first version look like?" value={values.description} onChange={e => update("description",e.target.value)} {...errorProps("description")} disabled={pending} /><span className="form-hint" id="description-hint">Include your goals, essential features, and any timing you have in mind.</span>{error("description")}</div></div>
    <div className="honey" aria-hidden="true"><label htmlFor="website">Leave this empty</label><input id="website" name="website" autoComplete="off" tabIndex={-1} value={values.website} onChange={e => update("website",e.target.value)} /></div>
    <div className="form-actions">{configured ? <button type="submit" className="button button-primary" disabled={pending || accepted}>{pending ? "Sending inquiry…" : accepted ? "Inquiry accepted" : "Tell me about your project"}{pending ? <LoaderCircle size={16} aria-hidden="true" /> : <ArrowUpRight size={16} aria-hidden="true" />}</button> : <><button type="submit" className="button button-primary">Email my brief<Mail size={16} aria-hidden="true" /></button><a className="button button-secondary" href={whatsappUrl(`${site.whatsappMessage}\n\n${inquirySummary(values)}`)} target="_blank" rel="noopener noreferrer">Share on WhatsApp<MessageCircle size={16} aria-hidden="true" /></a></>}<button className="button button-secondary" type="button" onClick={copy} disabled={pending}>Copy project brief<Copy size={16} aria-hidden="true" /></button></div>
    <p className="form-privacy">{configured ? "Your inquiry is sent by email; this website does not store it in a database." : "Your brief stays in this page until you share it. Email opens your mail app; WhatsApp opens a prepared message for you to send."}</p>
    <div aria-live="polite" aria-atomic="true">{status && <p className={`form-status ${status.error ? "error" : ""}`}>{status.message}</p>}</div>
    <details className="copy-fallback" open={showBrief || undefined}><summary>View a copyable project brief</summary><label className="sr-only" htmlFor="brief">Project brief to copy</label><textarea id="brief" readOnly value={inquirySummary(values)} onFocus={e => e.target.select()} /></details>
  </form>;
}
