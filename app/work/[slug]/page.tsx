import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { ContactCTA, ExternalLink, SectionLabel } from "@/components/ui";
import { ProjectView } from "@/components/project-view";
import { findProject, nextProject, projects, type ProjectImage } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };
const sections = [["overview", "Overview"], ["brief", "The brief"], ["design", "Design"], ["experience", "Experience"], ["responsive", "Mobile"], ["implementation", "Build"], ["skills", "Capabilities"]];

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return { title: "Project not found", robots: { index: false, follow: false } };
  const metadata = pageMetadata(`${project.title} — Case Study`, project.description, `/work/${slug}`);
  return { ...metadata, openGraph: { ...metadata.openGraph, images: [{ url: project.coverImage, width: 1440, height: 960, alt: project.coverAlt }] }, twitter: { ...metadata.twitter, images: [project.coverImage] } };
}

function Screenshot({ image, mobile = false }: { image: ProjectImage; mobile?: boolean }) {
  return <figure className={mobile ? "mobile-screenshot" : "case-screenshot"} data-reveal="image">
    <a href={image.src} target="_blank" rel="noopener noreferrer" aria-label={`Enlarge ${image.alt} (opens in a new tab)`}><Image src={image.src} alt={image.alt} width={mobile ? 390 : 1440} height={mobile ? 844 : 1000} sizes={mobile ? "(max-width: 767px) 280px, 320px" : "(max-width: 767px) calc(100vw - 40px), 1050px"} /></a>
    <figcaption>{image.caption}</figcaption>
  </figure>;
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();
  const next = nextProject(slug)!;
  return <div className={`case-study case-${slug}`}>
    <ProjectView slug={slug} />
    <header className="case-header container">
      <Link href="/work" className="back-link"><ArrowLeft size={15} aria-hidden="true" />All work</Link>
      <div className="case-badges"><SectionLabel number={project.number}>{project.industry}</SectionLabel><span className="concept-label">{project.projectType} · {project.year}</span></div>
      <div className="case-title-row"><div><h1>{project.title}</h1><p className="case-subtitle">{project.summary}</p></div><div className="case-actions"><ExternalLink href={project.liveUrl} secondary={false}>View Live Website</ExternalLink><ExternalLink href={project.githubUrl}>View Source Code</ExternalLink></div></div>
    </header>
    <figure className="case-hero container"><Image src={project.heroImage} alt={project.coverAlt} width={1440} height={1000} sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 64px), 1320px" priority /><figcaption>Live concept / {project.title}</figcaption></figure>
    <div className="case-body container">
      <aside className="case-toc"><SectionLabel>Inside the project</SectionLabel><nav aria-label="Case study sections">{sections.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</nav></aside>
      <div className="case-content">
        <section className="case-section case-overview" id="overview" data-reveal="up"><SectionLabel number="01">The concept</SectionLabel><h2>{project.overview}</h2><dl className="case-meta"><div><dt>Role</dt><dd>{project.role.join(" / ")}</dd></div><div><dt>Services</dt><dd>{project.services.join(" · ")}</dd></div><div><dt>Stack</dt><dd>{project.technologies.join(" · ")}</dd></div></dl><p className="concept-note">{project.demoNote}</p></section>
        <section className="case-section" id="brief" data-reveal="up"><SectionLabel number="02">The brief</SectionLabel><div className="case-two-col"><div><h3>Design for the visitor.</h3><p>{project.brief}</p></div><div><h3>The intended journey.</h3><p>{project.businessObjective}</p></div></div></section>
        <div className="case-gallery"><Screenshot image={project.galleryImages[0]} /></div>
        <section className="case-section" id="design"><SectionLabel number="03">Design direction</SectionLabel><h2>A distinct visual language.</h2><div className="case-decisions">{project.designDirection.map((item, index) => <div key={item.title} data-reveal="up" className={`reveal-delay-${index}`}><h3>{item.title}</h3><p>{item.description}</p></div>)}</div></section>
        <div className="case-gallery-pair">{project.galleryImages.slice(1).map(image => <Screenshot key={image.src} image={image} />)}</div>
        <section className="case-section" id="experience"><SectionLabel number="04">Explore the experience</SectionLabel><h2>See how it works.</h2><div className="experience-list">{project.experience.map((item, index) => <div key={item.title} data-reveal="up"><span className="eyebrow">0{index + 1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div><ExternalLink href={new URL(item.page, project.liveUrl).toString()} inline>Explore this page</ExternalLink></div>)}</div></section>
        <section className="case-section case-mobile-section" id="responsive"><div className="responsive-story"><div>{project.mobileImages.map(image => <Screenshot image={image} mobile key={image.src} />)}</div><div data-reveal="type"><SectionLabel number="05">Built for the smaller screen</SectionLabel><h2>Same intent.<br />New composition.</h2><p>{project.responsive}</p><ExternalLink href={project.liveUrl} inline>Explore on your device</ExternalLink><span className="mobile-dimension">390 × 844 / live interface</span></div></div></section>
        <section className="case-section" id="implementation"><SectionLabel number="06">Behind the interface</SectionLabel><h2>The build, in brief.</h2><div className="stack-list">{project.technologies.map(technology => <span key={technology}>{technology}</span>)}</div><div className="case-decisions">{project.implementation.map(item => <div key={item.title} data-reveal="up"><h3>{item.title}</h3><p>{item.description}</p></div>)}</div></section>
        <section className="case-section" id="skills"><SectionLabel number="07">Capabilities demonstrated</SectionLabel><ul className="skills-list">{project.skills.map(skill => <li key={skill}>{skill}</li>)}</ul><div className="case-actions"><ExternalLink href={project.liveUrl} secondary={false}>View Live Website</ExternalLink><ExternalLink href={project.githubUrl}>View Source Code</ExternalLink></div></section>
      </div>
    </div>
    <section className="next-project container" aria-label="Next project"><div data-reveal="type"><SectionLabel>Keep exploring / {next.number}</SectionLabel><Link href={`/work/${next.slug}`} className="next-project-title">{next.title}<ArrowRight size={28} aria-hidden="true" /></Link><p>{next.industry}</p></div><Link href={`/work/${next.slug}`} aria-label={`View ${next.title} next project`} data-reveal="image"><Image src={next.coverImage} alt={next.coverAlt} width={1440} height={960} sizes="(max-width: 767px) calc(100vw - 40px), 600px" /></Link></section>
    <ContactCTA project />
  </div>;
}
