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
const sections = [
  ["overview", "Overview"], ["brief", "Brief & objective"], ["design", "Design direction"],
  ["experience", "The experience"], ["responsive", "Responsive design"],
  ["implementation", "Implementation"], ["skills", "Skills demonstrated"],
];

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return { title: "Project not found", robots: { index: false, follow: false } };
  const metadata = pageMetadata(`${project.title} — Case Study`, project.description, `/work/${slug}`);
  return { ...metadata, openGraph: { ...metadata.openGraph, images: [{ url: project.coverImage, width: 1440, height: 960, alt: project.coverAlt }] }, twitter: { ...metadata.twitter, images: [project.coverImage] } };
}

function Screenshot({ image, mobile = false }: { image: ProjectImage; mobile?: boolean }) {
  return <figure className={mobile ? "mobile-screenshot" : "case-screenshot"}>
    <a href={image.src} target="_blank" rel="noopener noreferrer" aria-label={`Enlarge ${image.alt} (opens in a new tab)`}><Image src={image.src} alt={image.alt} width={mobile ? 390 : 1440} height={mobile ? 844 : 1000} sizes={mobile ? "(max-width: 767px) 240px, 300px" : "(max-width: 767px) calc(100vw - 48px), 920px"} /></a>
    <figcaption>{image.caption}</figcaption>
  </figure>;
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();
  const next = nextProject(slug)!;
  return <>
    <ProjectView slug={slug} />
    <header className="case-header container">
      <Link href="/work" className="back-link"><ArrowLeft size={15} aria-hidden="true" />All work</Link>
      <div className="case-badges"><SectionLabel number={project.number}>{project.industry}</SectionLabel><span className="concept-label">{project.projectType} · {project.year}</span></div>
      <h1>{project.title}</h1><p className="case-subtitle">{project.summary}</p>
      <div className="case-actions"><ExternalLink href={project.liveUrl} secondary={false}>View Live Website</ExternalLink><ExternalLink href={project.githubUrl}>View Source Code</ExternalLink></div>
      <dl className="case-meta"><div><dt>Role</dt><dd>{project.role.join(" / ")}</dd></div><div><dt>Services</dt><dd>{project.services.join(" · ")}</dd></div><div><dt>Stack</dt><dd>{project.technologies.join(" · ")}</dd></div></dl>
    </header>
    <figure className="case-hero container"><Image src={project.heroImage} alt={project.coverAlt} width={1440} height={1000} sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) calc(100vw - 64px), 1200px" priority /><figcaption>Captured from the deployed {project.title} concept website.</figcaption></figure>
    <div className="case-body container">
      <aside className="case-toc"><SectionLabel>Inside the project</SectionLabel><nav aria-label="Case study sections">{sections.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</nav><ExternalLink href={project.liveUrl} inline>Try the live site</ExternalLink></aside>
      <div>
        <section className="case-section" id="overview"><SectionLabel number="01">Project overview</SectionLabel><h2>A concept with a clear purpose.</h2><p>{project.overview}</p><p className="concept-note">{project.demoNote}</p></section>
        <section className="case-section" id="brief"><SectionLabel number="02">The brief</SectionLabel><h2>The problem to design for.</h2><div className="case-two-col"><div><h3>The brief</h3><p>{project.brief}</p></div><div><h3>Business objective</h3><p>{project.businessObjective}</p></div></div></section>
        <section className="case-section" id="design"><SectionLabel number="03">Design direction</SectionLabel><h2>A visual language for the industry.</h2><div className="case-decisions">{project.designDirection.map(item => <div key={item.title}><h3>{item.title}</h3><p>{item.description}</p></div>)}</div></section>
        <section className="case-section" id="experience"><SectionLabel number="04">The experience</SectionLabel><h2>From first impression to next step.</h2><div className="feature-grid">{project.experience.map(item => <div key={item.title}><h3>{item.title}</h3><p>{item.description}</p><ExternalLink href={new URL(item.page, project.liveUrl).toString()} inline>Explore this page</ExternalLink></div>)}</div><div className="case-gallery"><Screenshot image={project.galleryImages[0]} /><div className="case-gallery-pair">{project.galleryImages.slice(1).map(image => <Screenshot key={image.src} image={image} />)}</div></div></section>
        <section className="case-section" id="responsive"><SectionLabel number="05">Responsive design</SectionLabel><h2>The same intent, on a smaller screen.</h2><div className="responsive-story"><div>{project.mobileImages.map(image => <Screenshot image={image} mobile key={image.src} />)}</div><div><h3>Built around the viewport.</h3><p>{project.responsive}</p><p>The screenshots show the actual deployed interface. The portfolio presents these alongside desktop views so the layout and reading order can be compared directly.</p><ExternalLink href={project.liveUrl} inline>Explore on your device</ExternalLink></div></div></section>
        <section className="case-section" id="implementation"><SectionLabel number="06">Technical implementation</SectionLabel><h2>Design decisions, carried into code.</h2><div className="stack-list">{project.technologies.map(technology => <span key={technology}>{technology}</span>)}</div><div className="case-decisions">{project.implementation.map(item => <div key={item.title}><h3>{item.title}</h3><p>{item.description}</p></div>)}</div></section>
        <section className="case-section" id="skills"><SectionLabel number="07">What this demonstrates</SectionLabel><h2>The capabilities behind the concept.</h2><ul className="skills-list">{project.skills.map(skill => <li key={skill}>{skill}</li>)}</ul><div className="case-actions"><ExternalLink href={project.liveUrl} secondary={false}>View Live Website</ExternalLink><ExternalLink href={project.githubUrl}>View Source Code</ExternalLink></div></section>
      </div>
    </div>
    <ContactCTA project />
    <section className="next-project container" aria-label="Next project"><div><SectionLabel>Next project / {next.number}</SectionLabel><Link href={`/work/${next.slug}`} className="next-project-title">{next.title}<ArrowRight size={28} aria-hidden="true" /></Link><p>{next.industry}</p></div><Link href={`/work/${next.slug}`} aria-label={`View ${next.title} next project`}><Image src={next.coverImage} alt={next.coverAlt} width={1440} height={960} sizes="(max-width: 767px) calc(100vw - 48px), 500px" /></Link></section>
  </>;
}
