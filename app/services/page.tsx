import Link from "next/link";
import { PageIntro, ContactCTA, InlineLink } from "@/components/ui";
import { Process } from "@/components/process";
import { services } from "@/data/services";
import { projects, shortTitle } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Websites, Applications & MVP Development", "Business websites, custom web applications, startup MVPs, AI integrations and maintenance for founders, businesses and agencies.", "/services");

const commerce = { number: "06", title: "E-Commerce", short: "From product discovery to checkout.", outcome: "A storefront your customers can browse and buy from with confidence.", deliverables: ["Product catalogs & shopping flows", "Responsive storefronts", "Payment & commerce integrations scoped to your business"] };

/** The works in the edition that demonstrate each kind of commission. Maintenance has none to show. */
const evidence: Record<string, string[]> = { "01": ["vanta", "ember", "atelier"], "02": ["nexa"], "03": ["nexa"], "04": ["nexa"], "06": ["form27", "sova"] };

function SeenIn({ number }: { number: string }) {
  const works = (evidence[number] || []).map(slug => projects.find(project => project.slug === slug)!);
  if (!works.length) return <p className="service-evidence">Applies to your existing product rather than a concept in the edition.</p>;
  return <p className="service-evidence">Seen in {works.map((project, index) => <span key={project.slug}>{index > 0 && ", "}<Link href={`/work/${project.slug}`}>{Number(project.number)}/6 {shortTitle(project.title)}</Link></span>)}</p>;
}

export default function Services() {
  return <>
    <PageIntro title="Your next move, built." description="Websites, stores, and software. A clear scope, considered design, and one person responsible through launch." />
    <section className="services-page-list container" aria-label="Development services">
      {[...services, commerce].map(service => <article className="service-detail" data-reveal="rule" id={service.number === "06" ? "commerce" : `service-${service.number}`} key={service.number}>
        <div><h2>{service.title}</h2><p>{service.short}</p><p className="service-outcome">{service.outcome}</p><SeenIn number={service.number} /><InlineLink href="/contact">{service.number === "06" ? "Discuss your store" : `Discuss ${/^[A-Z][a-z]/.test(service.title) ? service.title[0].toLowerCase() + service.title.slice(1) : service.title}`}</InlineLink></div>
        <ul className="service-deliverables">{service.deliverables.map(item => <li key={item}>{item}</li>)}</ul>
      </article>)}
    </section>
    <Process />
    <ContactCTA />
  </>;
}
