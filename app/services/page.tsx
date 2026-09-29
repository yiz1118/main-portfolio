import { Check } from "lucide-react";
import { PageIntro, ContactCTA } from "@/components/ui";
import { Process } from "@/components/process";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Websites, Applications & MVP Development", "Business websites, custom web applications, startup MVPs, AI integrations and maintenance for founders, businesses and agencies.", "/services");
export default function Services() { return <><PageIntro eyebrow="Services" title="Your idea. A working product." description="From a professional business website to a custom application, I help define the scope, build the product, and prepare it for launch." /><section className="services-page-list container" aria-label="Development services">{services.map(service => <article className="service-detail" id={`service-${service.number}`} key={service.number}><p className="eyebrow">{service.number}</p><div><h2>{service.title}</h2><p>{service.description}</p></div><div><ul className="service-deliverables">{service.deliverables.map(item => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}</ul><p className="service-outcome">{service.outcome}</p></div></article>)}</section><Process /><ContactCTA /></>; }
