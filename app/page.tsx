import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ButtonLink, ContactCTA, InlineLink, SectionLabel } from "@/components/ui";
import { HeroShowcase } from "@/components/hero-showcase";
import { ProjectCard } from "@/components/project-card";
import { Process } from "@/components/process";
import { capabilities } from "@/data/services";
import { projects } from "@/data/projects";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = { ...pageMetadata("Alson Chua — Independent Web & App Developer", "Websites, web apps, e-commerce, MVPs, dashboards and AI products. Explore six independent concept projects by Alson Chua. Malaysia, working worldwide.", "/"), title: { absolute: `${site.name} — ${site.title}` } };

export default function Home() {
  return <>
    <section className="hero container">
      <div className="hero-introduction">
        <p className="hero-top"><span aria-hidden="true" />Available for freelance work</p>
        <h1>Ideas into<br /><span className="hero-emphasis">real products.</span></h1>
        <p className="hero-identity">{site.name}<span>{site.title}</span></p>
        <p className="hero-copy">Websites · E-Commerce · SaaS · Apps · AI</p>
        <div className="hero-actions"><ButtonLink href="#selected-work">View My Work</ButtonLink><InlineLink href="/contact">Start a Project</InlineLink></div>
      </div>
      <HeroShowcase projects={projects.map(({ slug, number, title, industry, coverImage, coverAlt }) => ({ slug, number, title, industry, coverImage, coverAlt }))} />
      <div className="hero-meta"><span>{site.location}</span><a href="#selected-work">Scroll to explore<ArrowDown size={14} aria-hidden="true" /></a></div>
    </section>
    <section className="selected-work container" id="selected-work">
      <div className="section-heading" data-reveal="type"><div><SectionLabel number="01">Selected work / 2026</SectionLabel><h2>Different worlds.<br />Same attention to detail.</h2></div><div className="work-introduction"><span className="work-count">06</span><p>Independent concepts. Designed & built by Alson.</p><InlineLink href="/work">Explore the collection</InlineLink></div></div>
      <div className="editorial-work">{projects.map(project => <ProjectCard project={project} key={project.slug} />)}</div>
    </section>
    <section className="services-home"><div className="container capability-section"><div data-reveal="type"><SectionLabel number="02">What I build</SectionLabel><h2>Made for<br />your next move.</h2><InlineLink href="/services">Explore services</InlineLink></div><div className="capability-list">{capabilities.map((item, index) => <Link href={item.href} key={item.title} className="capability" data-reveal="up"><span className="eyebrow">0{index + 1}</span><span className="capability-title">{item.title}</span><ArrowUpRight size={20} aria-hidden="true" /><span className="capability-detail">{item.detail}</span></Link>)}</div></div></section>
    <Process />
    <section className="about-teaser container"><div className="about-signature" data-reveal="type"><SectionLabel number="04">The person behind the work</SectionLabel><h2>Alson<br />Chua<span>.</span></h2></div><div className="about-copy" data-reveal="up"><p className="about-role">{site.title}</p><p>Game-development roots. Now building websites, applications, and digital products.</p><p className="eyebrow">Malaysia · Working worldwide</p><InlineLink href="/about">More About Me</InlineLink></div></section>
    <ContactCTA />
  </>;
}
