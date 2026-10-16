import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink, ContactCTA, InlineLink } from "@/components/ui";
import { HeroShowcase } from "@/components/hero-showcase";
import { ProjectCard } from "@/components/project-card";
import { Process } from "@/components/process";
import { SectionNavigation } from "@/components/section-navigation";
import { Chop } from "@/components/chop";
import { capabilities, processSteps } from "@/data/services";
import { projects, shortTitle } from "@/data/projects";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = { ...pageMetadata("Alson Chua — Independent Web & App Developer", "Websites, online stores, SaaS, apps and AI products, designed, built, tested and launched by one developer. Six independent concept projects by Alson Chua. Malaysia, working worldwide.", "/"), title: { absolute: `${site.name} — ${site.title}` } };
const workSections = projects.map(project => ({ id: `project-${project.slug}`, label: shortTitle(project.title), number: String(Number(project.number)) }));

export default function Home() {
  return <>
    <section className="hero container" aria-labelledby="hero-heading">
      <div className="hero-ledger">
        <h1 className="ledger" id="hero-heading">
          <span className="sr-only">Discover, design, build, test and launch: every stage by {site.name}.</span>
          <span className="ledger-rows" aria-hidden="true">{processSteps.map((step, index) => <span className="ledger-row" key={step.title} style={{ "--i": index } as React.CSSProperties}>
            <span className="ledger-stage"><span>{step.title}</span></span><span className="ledger-leader" /><span className="ledger-credit">{site.name}</span>
          </span>)}</span>
        </h1>
        <p className="lede hero-lede">Websites, online stores, SaaS, apps and AI products, owned by one developer from the first idea to launch day.</p>
        <div className="hero-actions"><ButtonLink href="/contact">Start a Project</ButtonLink><InlineLink href="#the-edition">See the six works</InlineLink></div>
      </div>
      <HeroShowcase projects={projects.map(({ slug, number, title, industry, coverImage, coverAlt }) => ({ slug, number, title, shortTitle: shortTitle(title), industry, coverImage, coverAlt }))} />
    </section>

    <section className="edition container" id="the-edition" aria-labelledby="edition-heading">
      <div className="section-head">
        <h2 id="edition-heading">An edition of six.</h2>
        <div className="head-aside"><p className="note">Six independent concepts, 2026: automotive, SaaS, fashion, hospitality, architecture and skincare. Each a different world, each designed, built, tested and launched by Alson.</p><InlineLink href="/work">The full collection</InlineLink></div>
      </div>
      <SectionNavigation items={workSections} label="Selected project index" collection />
      <div className="editorial-work">{projects.map(project => <ProjectCard project={project} key={project.slug} />)}</div>
    </section>

    <section className="commissions container section" aria-labelledby="commissions-heading">
      <div className="section-head">
        <h2 id="commissions-heading">What you can<br />commission.</h2>
        <div className="head-aside"><p className="note">Scoped to your business, built to be maintained after launch.</p><InlineLink href="/services">How each one works</InlineLink></div>
      </div>
      <ul className="commission-list">{capabilities.map(item => <li key={item.title}><Link href={item.href} className="commission"><span className="commission-title">{item.title}</span><ArrowUpRight size={22} aria-hidden="true" /><span className="commission-detail">{item.detail}</span></Link></li>)}</ul>
    </section>

    <Process />

    <section className="colophon container section" aria-labelledby="colophon-heading">
      <h2 className="colophon-name" id="colophon-heading">Alson<br />Chua<Chop /></h2>
      <div className="colophon-text">
        <p>An independent web and app developer in Malaysia with game-development roots: programming, interactive systems, and the small details that make software feel responsive. Now designing and building websites, stores and products for teams worldwide.</p>
        <dl className="colophon-facts"><div><dt>Based in</dt><dd>Malaysia, GMT+8</dd></div><div><dt>Working with</dt><dd>Founders, brands, agencies</dd></div><div><dt>Builds with</dt><dd>Next.js, React, TypeScript</dd></div></dl>
        <InlineLink href="/about">More about Alson</InlineLink>
      </div>
    </section>

    <ContactCTA />
  </>;
}
