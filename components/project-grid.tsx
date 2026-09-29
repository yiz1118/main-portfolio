"use client";
import { useState } from "react";
import type { Project } from "@/data/projects";
import { ProjectCard } from "./project-card";
export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState("All work");
  const categories = ["All work", ...new Set(projects.map(p => p.category))];
  const filtered = projects.filter(p => category === "All work" || p.category === category);
  return <div><div className="project-filters" aria-label="Filter work by category">{categories.map(item => <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div><p className="sr-only" aria-live="polite">{filtered.length} projects shown</p><div className="work-grid">{filtered.map(project => <ProjectCard key={project.slug} project={project} />)}</div>{!projects.length && <div className="empty-work"><h2>Case studies are being prepared.</h2><p>I’m putting together detailed examples of my work. In the meantime, explore my services or tell me about your project.</p><a className="inline-link" href="/services">Explore services →</a></div>}</div>;
}
