"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

type HeroProject = { slug: string; number: string; title: string; industry: string; coverImage: string; coverAlt: string };

export function HeroShowcase({ projects }: { projects: HeroProject[] }) {
  const [selected, setSelected] = useState(0);
  const [animate, setAnimate] = useState(false);
  const project = projects[selected];
  return <div className="hero-showcase">
    <div className={`hero-stage stage-${project.slug}`}>
      <div className="browser-bar" aria-hidden="true"><span className="browser-dots"><i /><i /><i /></span><span>{project.title}</span><ArrowUpRight size={13} /></div>
      <Link key={project.slug} className={`hero-preview ${animate ? "preview-enter" : ""}`} href={`/work/${project.slug}`} aria-label={`Explore ${project.title} case study`}>
        <Image src={project.coverImage} alt={project.coverAlt} width={1440} height={960} sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 52vw, 640px" priority={selected === 0} />
        <span className="hero-preview-action">Explore project<ArrowUpRight size={17} aria-hidden="true" /></span>
      </Link>
    </div>
    <div className="hero-project-caption" aria-live="polite"><span>{project.number} / {project.industry}</span><span>Independent concept</span></div>
    <div className="hero-selector" role="group" aria-label="Preview the six projects">
      {projects.map((item, index) => <button key={item.slug} type="button" aria-label={`Preview ${item.title}`} aria-pressed={selected === index} onClick={event => { setAnimate(event.detail > 0); setSelected(index); }}>
        <span>{item.number}</span><span className="selector-name">{item.title === "VANTA Motorworks" ? "VANTA" : item.title === "ATELIER NORTH" ? "ATELIER" : item.title}</span>
      </button>)}
    </div>
  </div>;
}
