import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ButtonLink, ContactCTA, InlineLink, SectionLabel } from "@/components/ui";
import { ProjectCard } from "@/components/project-card";
import { Process } from "@/components/process";
import { SocialProof } from "@/components/social-proof";
import { services } from "@/data/services";
import { visibleProjects } from "@/data/projects";
import { publicationConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";

export const metadata = pageMetadata("Freelance Web & App Developer — Websites, MVPs & AI Integrations", "I build websites and web applications for startups and small businesses. Explore project work, MVP development, dashboards and AI integrations.", "/");
export default function Home() {
  const selected = visibleProjects(publicationConfig().includeDrafts).sort((a,b) => a.featuredOrder-b.featuredOrder).slice(0,3);
  return <><section className="hero container"><div className="hero-top"><span aria-hidden="true" /><span>Independent developer · Product-minded approach</span></div><h1>I build websites and apps<br className="desktop-break" /> that turn ideas into<br className="desktop-break" /> <span className="hero-emphasis">real products.</span></h1><div className="hero-bottom"><p className="hero-copy">I help startups, entrepreneurs, and small businesses build websites, MVPs, web apps, dashboards, and AI-powered tools—from the first idea to launch.</p><div className="hero-actions"><ButtonLink href="/projects">View My Work</ButtonLink><ButtonLink href="/contact" secondary>Start a Project</ButtonLink></div></div><div className="hero-meta"><span>BASED IN MALAYSIA · WORKING WORLDWIDE</span><span>IDEA → PLAN → BUILD → LAUNCH <ArrowDown size={13} aria-hidden="true" /></span></div></section>
  <section className="selected-work container" id="selected-work"><div className="section-heading"><div><SectionLabel number="01">Selected work</SectionLabel><h2>Different products.<br />The same care in building.</h2></div><InlineLink href="/projects">Explore all work</InlineLink></div>{selected.length ? <div className="selected-grid">{selected.map((p,i) => <ProjectCard project={p} priority={i===0} key={p.slug} />)}</div> : <div className="empty-work"><h3>Detailed case studies are on the way.</h3><p>Explore how I can help with your website, application, or next product.</p><InlineLink href="/services">Explore services</InlineLink></div>}</section>
  <section className="services-home"><div className="container"><div className="section-heading"><div><SectionLabel number="02">How I can help</SectionLabel><h2>Built for what<br />your business needs.</h2></div><p>A focused website, a custom workflow, or a first product. We’ll start with the problem and build the right scope.</p></div><div>{services.map(service => <Link key={service.number} href={`/services#service-${service.number}`} className="service-row"><span className="service-number">{service.number}</span><h3>{service.title}</h3><p>{service.short}</p><ArrowUpRight size={23} aria-hidden="true" /></Link>)}</div></div></section>
  <Process /><section className="about-teaser container"><div><SectionLabel number="04">A little about me</SectionLabel><h2>A developer who thinks<br />about the whole product.</h2></div><div className="about-copy"><p>I’m a Malaysian developer with a background in game development. Building interactive systems taught me to connect programming, user experience, and product thinking.</p><p>Today, I bring that approach to websites, apps, and software products—with responsibility for the architecture, implementation, testing, and delivery.</p><InlineLink href="/about">More about my approach</InlineLink></div></section><SocialProof /><ContactCTA /></>;
}
