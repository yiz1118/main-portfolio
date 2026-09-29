import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ContactCTA, SectionLabel } from "@/components/ui";
import { ProjectView } from "@/components/project-view";
import { findProject, visibleProjects } from "@/data/projects";
import { publicationConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() { return visibleProjects(publicationConfig().includeDrafts).map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const p = findProject(slug, publicationConfig().includeDrafts);
  if (!p) return { title: "Case study not found", robots: { index: false, follow: false } };
  return pageMetadata(p.title, p.description, `/projects/${p.slug}`, p.publicationStatus === "draft");
}
const sections = [{ id: "overview", label: "Overview" }, { id: "problem", label: "Problem & goal" }, { id: "role", label: "My role" }, { id: "solution", label: "Solution" }, { id: "features", label: "Key features" }, { id: "flow", label: "User flow" }, { id: "architecture", label: "Architecture" }, { id: "process", label: "Development process" }, { id: "challenges", label: "Challenges" }, { id: "screenshots", label: "Visuals" }, { id: "technologies", label: "Technologies" }, { id: "result", label: "Result & limitations" }];
export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const p = findProject(slug, publicationConfig().includeDrafts); if (!p) notFound();
  return <><ProjectView slug={p.slug} /><header className="case-header container"><Link href="/projects" className="back-link"><ArrowLeft size={14} aria-hidden="true" />All work</Link><div className="case-badges"><SectionLabel>{p.category}</SectionLabel>{p.publicationStatus === "draft" && <span className="draft-badge">Draft case study</span>}</div><h1>{p.title}</h1><p className="case-subtitle">{p.subtitle}</p><dl className="case-meta"><div><dt>Project type</dt><dd>{p.projectType || "[NEEDS MY CONTENT]"}</dd></div><div><dt>Status / year</dt><dd>{p.developmentStatus}{p.year ? ` / ${p.year}` : ""}</dd></div><div><dt>My role</dt><dd>{p.role}</dd></div></dl></header><div className="container"><div className="case-cover"><Image src={p.coverImage} alt={p.screenshots[0].alt} width={1200} height={800} priority sizes="(max-width: 767px) 100vw, 1200px" /></div><p className="case-image-caption">Interface illustration · actual product screenshots are awaiting content.</p><div className="case-body"><aside className="case-toc"><SectionLabel>Inside this project</SectionLabel><nav aria-label="Case study sections">{sections.map(s => <a key={s.id} href={`#${s.id}`}>{s.label}</a>)}</nav></aside><div>
  {p.publicationStatus === "draft" && <p className="content-notice">Draft for review. This page describes inspected source and historical documentation. Current live behavior, project classification, and personal contribution need confirmation before publication.</p>}
  <section id="overview" className="case-section"><h2>Overview</h2><p>{p.overview}</p></section>
  <section id="problem" className="case-section"><div className="case-two-col"><div><h2>The problem</h2><p>{p.problem}</p></div><div><h2>The goal</h2><p>{p.goal}</p></div></div></section>
  <section id="role" className="case-section"><h2>My role</h2><p>{p.role}</p><p>Confirm the parts personally handled across discovery, planning, design, development, testing, and deployment.</p></section>
  <section id="solution" className="case-section"><h2>The solution</h2><p>{p.solution}</p></section>
  <section id="features" className="case-section"><h2>Key features</h2><div className="feature-grid">{p.features.map(f => <div key={f.title}><h3>{f.title}</h3><p>{f.description}</p></div>)}</div></section>
  <section id="flow" className="case-section"><h2>User flow</h2><ol className="flow-list">{p.userFlow.map(step => <li key={step}>{step}</li>)}</ol></section>
  <section id="architecture" className="case-section"><h2>Technical architecture</h2><div className="architecture-grid">{p.architecture.map(layer => <div className="architecture-node" key={layer.layer}><span>{layer.layer}</span><p>{layer.detail}</p></div>)}</div></section>
  <section id="process" className="case-section"><h2>Development process</h2><ul className="case-bullets">{p.developmentProcess.map(step => <li key={step}>{step}</li>)}</ul></section>
  <section id="challenges" className="case-section"><h2>Challenges & decisions</h2>{p.challenges.map(c => <div className="challenge" key={c.problem}><h3>{c.problem}</h3><p>{c.resolution}</p></div>)}</section>
  <section id="screenshots" className="case-section"><h2>Product visuals</h2><p>[NEEDS MY CONTENT] Add real screenshots of implemented desktop, mobile, dashboard, or workflow screens where applicable.</p>{p.screenshots.map(s => <figure key={s.src}><Image src={s.src} alt={s.alt} width={1200} height={800} sizes="(max-width: 767px) 100vw, 900px" /><figcaption>{s.kind === "illustration" ? "Illustration · " : "Screenshot · "}{s.caption}</figcaption></figure>)}</section>
  <section id="technologies" className="case-section"><h2>Technologies</h2><div className="project-tags">{p.technologies.map(t => <span key={t}>{t}</span>)}</div></section>
  <section id="result" className="case-section"><h2>Result</h2><ul className="case-bullets">{p.results.map(result => <li key={result}>{result}</li>)}</ul><div className="limitations"><h3>What this case study does not claim</h3><ul className="case-bullets">{p.limitations.map(l => <li key={l}>{l}</li>)}</ul></div>{(p.demoUrl || p.githubUrl) && <div className="project-external">{p.demoUrl && <a href={p.demoUrl} target="_blank" rel="noreferrer">Live demo ↗</a>}{p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer">Repository ↗</a>}</div>}</section>
  </div></div></div><ContactCTA project /></>;
}
