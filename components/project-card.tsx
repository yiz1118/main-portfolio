import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { ExternalLink } from "./ui";
import { ProjectImageLink } from "./project-image-link";
import { Inscription, PlateImage } from "./plate";

/** Each work is a spread: its own composition, a numbered plate, and an inscription. */
export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const edition = Number(project.number);
  const companion = project.slug === "nexa" ? project.galleryImages[0] : project.slug === "atelier" ? project.galleryImages[1] : project.slug === "ember" || project.slug === "sova" ? project.mobileImages[0] : undefined;
  const phone = companion?.src.includes("mobile");
  return <article className={`project-presentation presentation-${project.slug}`} id={`project-${project.slug}`}>
    <header className="presentation-heading">
      <p className="work-number" aria-hidden="true">{edition}<span>/6</span></p>
      <h3><Link href={`/work/${project.slug}`}>{project.title}</Link></h3>
      <p className="presentation-statement">{project.summary}</p>
      <p className="presentation-meta">{project.industry}</p>
    </header>
    <div className="presentation-visuals" data-reveal="plate">
      <figure className="plate plate-sheet">
        <ProjectImageLink href={`/work/${project.slug}`} label={`View ${project.title} case study`}>
          <PlateImage><ViewTransition name={`plate-${project.slug}`} share="plate-morph" default="none"><Image src={project.coverImage} alt={project.coverAlt} width={1440} height={960} sizes="(max-width: 767px) calc(100vw - 68px), (max-width: 1023px) calc(100vw - 120px), 860px" priority={priority} /></ViewTransition></PlateImage>
        </ProjectImageLink>
        <Inscription title={project.title} edition={`${edition}/6`} />
      </figure>
      {companion && <figure className="plate plate-sheet presentation-companion">
        <PlateImage><Image src={companion.src} alt={companion.alt} width={phone ? 390 : 1440} height={phone ? 844 : 1000} sizes={phone ? "236px" : "(max-width: 1023px) 40vw, 420px"} /></PlateImage>
        <figcaption className="inscription"><span className="inscription-title">{phone ? "Phone, 390 px" : project.slug === "nexa" ? "Workspace dashboard" : "Project story"}</span><span className="inscription-edition">{edition}/6</span></figcaption>
      </figure>}
    </div>
    <div className="presentation-caption">
      <p className="presentation-type">{project.projectType} · {project.year}</p>
      <div className="presentation-links"><Link href={`/work/${project.slug}`} className="inline-link">View Case Study<ArrowUpRight size={16} aria-hidden="true" /></Link><ExternalLink href={project.liveUrl} inline>View Live Site</ExternalLink></div>
    </div>
  </article>;
}
