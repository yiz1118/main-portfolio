import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { TrackedLink } from "./tracked-link";
import { site, emailUrl, whatsappUrl } from "@/lib/site";

export function ButtonLink({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  return <TrackedLink href={href} className={`button ${secondary ? "button-secondary" : "button-primary"}`}>{children}<ArrowUpRight size={17} aria-hidden="true" /></TrackedLink>;
}
export function SectionLabel({ children, number }: { children: ReactNode; number?: string }) { return <p className="eyebrow">{number && <span className="section-number">{number}</span>}{children}</p>; }
export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <header className="page-intro container"><SectionLabel>{eyebrow}</SectionLabel><h1>{title}</h1><p className="intro-copy">{description}</p></header>;
}
export function ContactCTA({ project = false }: { project?: boolean }) {
  return <section className="contact-cta container"><div data-reveal="type"><SectionLabel>{project ? "Something like this, for your business?" : "Have a project in mind?"}</SectionLabel><h2>Let’s<br /><span>build it.</span></h2></div><div className="cta-actions" data-reveal="up"><ButtonLink href="/contact">Start a Project</ButtonLink><div className="cta-direct"><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">WhatsApp<ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a><a href={emailUrl()}>Email<ArrowUpRight size={15} aria-hidden="true" /></a></div><p className="availability">{site.availability}</p></div></section>;
}
export function InlineLink({ href, children }: { href: string; children: ReactNode }) { return <Link className="inline-link" href={href}>{children}<ArrowUpRight size={16} aria-hidden="true" /></Link>; }

export function ExternalLink({ href, children, inline = false, secondary = true }: { href: string; children: ReactNode; inline?: boolean; secondary?: boolean }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={inline ? "inline-link" : `button ${secondary ? "button-secondary" : "button-primary"}`}>{children}<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>;
}
