import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { ExternalLink } from "./ui";

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const companion = project.slug === "nexa" ? project.galleryImages[0] : project.slug === "atelier" ? project.galleryImages[1] : undefined;
  return <article className={`project-presentation presentation-${project.slug}`} id={`project-${project.slug}`}>
    <header className="presentation-heading">
      <p className="eyebrow"><span className="section-number">{project.number}</span>{project.industry}</p>
      <h3><Link href={`/work/${project.slug}`}>{project.title}</Link></h3>
      <p className="presentation-statement">{project.summary}</p>
    </header>
    <div className="presentation-visuals">
      <Link href={`/work/${project.slug}`} className="project-image-link presentation-cover" aria-label={`View ${project.title} case study`}>
        <Image src={project.coverImage} alt={project.coverAlt} width={1440} height={960} sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) calc(100vw - 64px), 1200px" priority={priority} />
        <span className="project-arrow"><ArrowUpRight size={22} aria-hidden="true" /></span>
      </Link>
      {companion && <div className="presentation-companion"><Image src={companion.src} alt={companion.alt} width={1440} height={1000} sizes="(max-width: 767px) 78vw, 550px" /></div>}
    </div>
    <div className="presentation-caption">
      <div><p>{project.description}</p><p className="presentation-type">{project.projectType} · {project.year}</p></div>
      <div className="presentation-links"><Link href={`/work/${project.slug}`} className="inline-link">View Case Study<ArrowUpRight size={16} aria-hidden="true" /></Link><ExternalLink href={project.liveUrl} inline>View Live Site</ExternalLink></div>
    </div>
  </article>;
}
