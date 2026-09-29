import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { ButtonLink, ContactCTA, InlineLink, SectionLabel } from "@/components/ui";
import { ProjectCard } from "@/components/project-card";
import { Process } from "@/components/process";
import { SocialProof } from "@/components/social-proof";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = { ...pageMetadata("Alson Chua — Independent Web & App Developer", "Websites, web apps, e-commerce, MVPs, dashboards and AI products for startups, brands and businesses. Explore six independent concept projects by Alson Chua.", "/"), title: { absolute: `${site.name} — ${site.title}` } };

export default function Home() {
  return <>
    <section className="hero container">
      <div className="hero-top"><span aria-hidden="true" /><span>{site.availability}</span></div>
      <h1>I build websites and apps<br className="desktop-break" /> that turn ideas into<br className="desktop-break" /> <span className="hero-emphasis">real products.</span></h1>
      <div className="hero-bottom"><p className="hero-copy">I’m Alson, an independent web and app developer. I help startups, brands, entrepreneurs, and businesses build websites, web apps, e-commerce, MVPs, dashboards, and AI products—from the first idea to launch.</p><div className="hero-actions"><ButtonLink href="#selected-work">View My Work</ButtonLink><ButtonLink href="/contact" secondary>Start a Project</ButtonLink></div></div>
      <div className="hero-meta"><span>{site.location}</span><span className="hero-method">{["Idea", "Plan", "Build", "Launch"].map((step, index) => <span key={step}>{index > 0 && <ArrowRight size={11} aria-hidden="true" />}{step}</span>)}<ArrowDown size={13} aria-hidden="true" /></span></div>
    </section>
    <section className="selected-work container" id="selected-work">
      <div className="section-heading"><div><SectionLabel number="01">Selected work / 2026</SectionLabel><h2>Six industries.<br />Six distinct experiences.</h2></div><div className="work-introduction"><p>Independent concepts, designed and built to explore what a thoughtful digital experience can do.</p><InlineLink href="/work">Explore the collection</InlineLink></div></div>
      <div className="editorial-work">{projects.map((project, index) => <ProjectCard project={project} priority={index === 0} key={project.slug} />)}</div>
    </section>
    <section className="services-home"><div className="container"><div className="section-heading"><div><SectionLabel number="02">How I can help</SectionLabel><h2>Built for what<br />your business needs.</h2></div><p>A focused website, a custom workflow, or a first product. We’ll start with the problem and build the right scope.</p></div><div>{services.map(service => <Link key={service.number} href={`/services#service-${service.number}`} className="service-row"><span className="service-number">{service.number}</span><h3>{service.title}</h3><p>{service.short}</p><ArrowUpRight size={23} aria-hidden="true" /></Link>)}</div></div></section>
    <Process />
    <section className="about-teaser container"><div><SectionLabel number="04">A little about me</SectionLabel><h2>A developer who thinks<br />about the whole product.</h2></div><div className="about-copy"><p>I’m Alson Chua, a Malaysian developer with a background in game development. Building interactive systems taught me to connect programming, user experience, and product thinking.</p><p>Today, I bring that approach to websites, apps, and software products—with responsibility for the architecture, implementation, testing, and delivery.</p><InlineLink href="/about">More about my approach</InlineLink></div></section>
    <SocialProof /><ContactCTA />
  </>;
}
