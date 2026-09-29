import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { TrackedLink } from "./tracked-link";

export function ButtonLink({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  return <TrackedLink href={href} className={`button ${secondary ? "button-secondary" : "button-primary"}`}>{children}<ArrowUpRight size={17} aria-hidden="true" /></TrackedLink>;
}
export function SectionLabel({ children, number }: { children: ReactNode; number?: string }) { return <p className="eyebrow">{number && <span className="section-number">{number}</span>}{children}</p>; }
export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <header className="page-intro container"><SectionLabel>{eyebrow}</SectionLabel><h1>{title}</h1><p className="intro-copy">{description}</p></header>;
}
export function ContactCTA({ project = false }: { project?: boolean }) {
  return <section className="contact-cta container"><div><SectionLabel>Let’s build something useful</SectionLabel><h2>{project ? <>Have a similar project?<br />Let’s talk.</> : <>Your next idea.<br />A clear path forward.</>}</h2><p>Tell me what you’re working on. We can start with the problem, the scope, and the next practical step.</p></div><ButtonLink href="/contact">Start a Project</ButtonLink></section>;
}
export function InlineLink({ href, children }: { href: string; children: ReactNode }) { return <Link className="inline-link" href={href}>{children}<ArrowUpRight size={16} aria-hidden="true" /></Link>; }
