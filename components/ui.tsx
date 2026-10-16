import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { TrackedLink } from "./tracked-link";
import { StudioClock } from "./studio-clock";
import { site, emailUrl, whatsappUrl } from "@/lib/site";

export function ButtonLink({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  return <TrackedLink href={href} className={`button ${secondary ? "button-secondary" : "button-primary"}`}>{children}<ArrowUpRight size={17} aria-hidden="true" /></TrackedLink>;
}
export function PageIntro({ title, description }: { title: string; description: string }) {
  return <header className="page-intro container"><h1>{title}</h1><p className="intro-copy">{description}</p></header>;
}
export function ContactCTA({ project = false }: { project?: boolean }) {
  return <section className="slab" aria-labelledby="commission-heading"><div className="contact-cta container">
    <h2 id="commission-heading">{project ? <>Commission<br /><span>one like this.</span></> : <>Commission<br /><span>the seventh.</span></>}</h2>
    <div className="cta-actions">
      <p className="lede">{project ? "A website, store, or product with its own world, carried from first idea to launch by one person." : "Six works so far. Bring the next one: a website, store, SaaS, app or AI product, carried from first idea to launch."}</p>
      <ButtonLink href="/contact">Start a Project</ButtonLink>
      <div className="cta-direct"><a className="inline-link" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">WhatsApp<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a><a className="inline-link" href={emailUrl()}>Email<ArrowUpRight size={16} aria-hidden="true" /></a></div>
      <p className="cta-status"><span className="status-mark" aria-hidden="true" />{site.availability}. <StudioClock /></p>
    </div>
  </div></section>;
}
export function InlineLink({ href, children }: { href: string; children: ReactNode }) { return <Link className="inline-link" href={href}>{children}<ArrowUpRight size={16} aria-hidden="true" /></Link>; }

export function ExternalLink({ href, children, inline = false, secondary = true }: { href: string; children: ReactNode; inline?: boolean; secondary?: boolean }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={inline ? "inline-link" : `button ${secondary ? "button-secondary" : "button-primary"}`}>{children}<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>;
}
