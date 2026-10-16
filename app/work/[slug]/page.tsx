import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { ContactCTA, ExternalLink } from "@/components/ui";
import { ProjectView } from "@/components/project-view";
import { SectionNavigation } from "@/components/section-navigation";
import { Inscription, PlateImage } from "@/components/plate";
import { Chop } from "@/components/chop";
import { findProject, nextProject, projects, type ProjectImage } from "@/data/projects";
import { captureDate, receiptFor, receiptsFor } from "@/lib/provenance";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };
const sections = [["overview", "Overview"], ["brief", "Brief"], ["design", "Design"], ["experience", "Experience"], ["responsive", "Mobile"], ["implementation", "Build"], ["skills", "Capabilities"]];
const sectionItems = sections.map(([id, label]) => ({ id, label }));

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return { title: "Project not found", robots: { index: false, follow: false } };
  const metadata = pageMetadata(`${project.title} — Case Study`, project.description, `/work/${slug}`);
  return { ...metadata, openGraph: { ...metadata.openGraph, images: [{ url: project.coverImage, width: 1440, height: 960, alt: project.coverAlt }] }, twitter: { ...metadata.twitter, images: [project.coverImage] } };
}

function Screenshot({ image, mobile = false }: { image: ProjectImage; mobile?: boolean }) {
  return <figure className={`plate ${mobile ? "mobile-screenshot" : "case-screenshot plate-sheet"}`} data-reveal="plate">
    <a href={image.src} target="_blank" rel="noopener noreferrer" aria-label={`Enlarge ${image.alt} (opens in a new tab)`}>
      <PlateImage><Image src={image.src} alt={image.alt} width={mobile ? 390 : 1440} height={mobile ? 844 : 1000} sizes={mobile ? "(max-width: 767px) 260px, 320px" : "(max-width: 767px) calc(100vw - 68px), (max-width: 1023px) calc(100vw - 120px), 1000px"} /></PlateImage>
      <span className="screenshot-action" aria-hidden="true">Enlarge<ArrowUpRight size={15} /></span>
    </a>
    <figcaption>{image.caption}</figcaption>
  </figure>;
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();
  const next = nextProject(slug)!;
  const previous = projects[(projects.findIndex(item => item.slug === slug) - 1 + projects.length) % projects.length];
  const edition = Number(project.number);
  const receipts = receiptsFor(slug);
  const heroReceipt = receiptFor(project.heroImage);
  const live = new URL(project.liveUrl);
  const source = new URL(project.githubUrl);
  return <div className={`case-study case-${slug}`}>
    <ProjectView slug={slug} />
    <header className="case-header container">
      <Link href="/work" className="back-link"><ArrowLeft size={16} aria-hidden="true" />All six works</Link>
      <div className="case-title-row"><div><h1>{project.title}</h1><p className="case-subtitle">{project.summary}</p><div className="case-badges"><p className="case-number">Work {edition} of 6</p><span className="concept-label">{project.projectType} · {project.year}</span></div></div><div className="case-actions"><ExternalLink href={project.liveUrl} secondary={false}>View Live Website</ExternalLink><ExternalLink href={project.githubUrl}>View Source Code</ExternalLink></div></div>
    </header>

    <div className="case-hero container"><figure className="plate plate-sheet">
      <PlateImage><ViewTransition name={`plate-${slug}`} share="plate-morph" default="none"><Image src={project.heroImage} alt={project.coverAlt} width={1440} height={1000} sizes="(max-width: 767px) calc(100vw - 68px), (max-width: 1023px) calc(100vw - 120px), 1260px" priority /></ViewTransition></PlateImage>
      <Inscription title={project.title} edition={`${edition}/6`} meta={`Independent concept, ${project.year} · captured from ${live.host}`} />
    </figure></div>

    <section className="catalogue container" aria-labelledby="catalogue-heading">
      <div><h2 id="catalogue-heading">Catalogue entry</h2><p className="note">The work’s facts, recorded the way a print room records an edition.</p></div>
      <dl>
        <div><dt>Edition</dt><dd>Work {edition} of 6, independent concept, {project.year}</dd></div>
        <div><dt>Field</dt><dd>{project.industry}</dd></div>
        <div><dt>Made by</dt><dd>{site.name}: {project.role.join(" and ").toLowerCase()}</dd></div>
        <div><dt>Medium</dt><dd>{project.technologies.join(", ")}</dd></div>
        <div><dt>Services</dt><dd>{project.services.join(", ")}</dd></div>
        <div><dt>Dimensions</dt><dd>Desktop at 1440 px, phone at 390 px</dd></div>
        <div><dt>Live</dt><dd><a href={project.liveUrl} target="_blank" rel="noopener noreferrer">{live.host}<span className="sr-only"> (opens in a new tab)</span></a></dd></div>
        <div><dt>Source</dt><dd><a href={project.githubUrl} target="_blank" rel="noopener noreferrer">{source.host}{source.pathname}<span className="sr-only"> (opens in a new tab)</span></a></dd></div>
        {heroReceipt && <div className="catalogue-wide"><dt>Provenance</dt><dd>{receipts.length} screenshots captured from the deployed site on {captureDate(heroReceipt.capturedAt)}, every page answering HTTP {heroReceipt.status}. Each file is checked against its recorded SHA-256; the hero reads <span className="hash">{heroReceipt.sha256.slice(0, 20)}…</span></dd></div>}
      </dl>
    </section>

    <div className="case-body container">
      <aside className="case-toc"><p className="note">In this entry</p><SectionNavigation items={sectionItems} label="Case study sections" /></aside>
      <div className="case-content">
        <section className="case-section case-overview" id="overview" data-reveal="up"><h2>{project.overview}</h2><div className="concept-note"><Chop /><p>{project.demoNote}</p></div></section>
        <section className="case-section" id="brief" data-reveal="up"><h2>The brief</h2><div className="case-two-col"><div><h3>Design for the visitor.</h3><p>{project.brief}</p></div><div><h3>The intended journey.</h3><p>{project.businessObjective}</p></div></div></section>
        <div className="case-gallery"><Screenshot image={project.galleryImages[0]} /></div>
        <section className="case-section" id="design"><h2>Design direction</h2><div className="case-decisions">{project.designDirection.map(item => <div key={item.title} data-reveal="rule"><h3>{item.title}</h3><p>{item.description}</p></div>)}</div></section>
        <div className="case-gallery-pair">{project.galleryImages.slice(1).map(image => <Screenshot key={image.src} image={image} />)}</div>
        <section className="case-section" id="experience"><h2>Explore the experience</h2><div className="experience-list">{project.experience.map(item => <div key={item.title}><div><h3>{item.title}</h3><p>{item.description}</p></div><ExternalLink href={new URL(item.page, project.liveUrl).toString()} inline>Explore this page</ExternalLink></div>)}</div></section>
        <section className="case-section case-mobile-section" id="responsive"><div className="responsive-story"><div>{project.mobileImages.map(image => <Screenshot image={image} mobile key={image.src} />)}</div><div><h2>Same intent, a new composition.</h2><p>{project.responsive}</p><ExternalLink href={project.liveUrl} inline>Explore on your device</ExternalLink><span className="mobile-dimension">390 × 844, captured from the live interface</span></div></div></section>
        <section className="case-section" id="implementation"><h2>The build, in brief</h2><div className="stack-list">{project.technologies.map(technology => <span key={technology}>{technology}</span>)}</div><div className="case-decisions">{project.implementation.map(item => <div key={item.title} data-reveal="rule"><h3>{item.title}</h3><p>{item.description}</p></div>)}</div></section>
        <section className="case-section" id="skills"><h2>Capabilities demonstrated</h2><ul className="skills-list">{project.skills.map(skill => <li key={skill}>{skill}</li>)}</ul><div className="case-actions"><ExternalLink href={project.liveUrl} secondary={false}>View Live Website</ExternalLink><ExternalLink href={project.githubUrl}>View Source Code</ExternalLink></div></section>
      </div>
    </div>

    <section className="next-project container" aria-label="Next project">
      <div><Link href={`/work/${next.slug}`} className="next-project-title">{next.title}<ArrowRight size={36} aria-hidden="true" /></Link><p className="note">Next in the edition, work {Number(next.number)} of 6</p><p>{next.industry}</p></div>
      <Link href={`/work/${next.slug}`} aria-label={`View ${next.title} next project`}><figure className="plate plate-sheet" data-reveal="plate"><PlateImage><Image src={next.coverImage} alt={next.coverAlt} width={1440} height={960} sizes="(max-width: 767px) calc(100vw - 68px), (max-width: 1023px) calc(100vw - 120px), 720px" /></PlateImage><Inscription title={next.title} edition={`${Number(next.number)}/6`} /></figure></Link>
    </section>
    <nav className="case-return container" aria-label="More project navigation"><Link href={`/work/${previous.slug}`}><ArrowLeft size={16} aria-hidden="true" /><span>Previous project<small>{previous.title}</small></span></Link><Link href="/work">Back to all six works<ArrowUpRight size={16} aria-hidden="true" /></Link></nav>
    <ContactCTA project />
  </div>;
}
