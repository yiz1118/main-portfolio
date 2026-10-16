"use client";
import { useState } from "react";
import { projects as allProjects, shortTitle, type Project } from "@/data/projects";
import { ProjectCard } from "./project-card";
import { SectionNavigation } from "./section-navigation";

const index = allProjects.map(project => ({ id: `project-${project.slug}`, label: shortTitle(project.title), number: String(Number(project.number)) }));

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState("All work");
  const categories = ["All work", ...new Set(projects.map(project => project.category))];
  const filtered = projects.filter(project => category === "All work" || project.category === category);
  return <div>
    <div className="project-filters" role="group" aria-label="Filter work by category">{categories.map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
    <p className="sr-only" aria-live="polite">{filtered.length} projects shown</p>
    {category === "All work" && <SectionNavigation items={index} label="Project collection index" collection />}
    <div className="editorial-work">{filtered.map((project, position) => <ProjectCard key={project.slug} project={project} priority={position === 0} />)}</div>
  </div>;
}
