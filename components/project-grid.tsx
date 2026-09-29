"use client";
import { useState } from "react";
import type { Project } from "@/data/projects";
import { ProjectCard } from "./project-card";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState("All work");
  const categories = ["All work", ...new Set(projects.map(project => project.category))];
  const filtered = projects.filter(project => category === "All work" || project.category === category);
  return <div>
    <div className="project-filters" aria-label="Filter work by category">{categories.map(item => <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
    <p className="sr-only" aria-live="polite">{filtered.length} projects shown</p>
    <div className="editorial-work">{filtered.map((project, index) => <ProjectCard key={project.slug} project={project} priority={index === 0} />)}</div>
  </div>;
}
