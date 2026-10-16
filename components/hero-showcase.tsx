"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Inscription, PlateImage } from "./plate";
import { StudioClock } from "./studio-clock";
import { site } from "@/lib/site";

type HeroProject = { slug: string; number: string; title: string; shortTitle: string; industry: string; coverImage: string; coverAlt: string };

/** All six sheets stay present; the chosen one is struck forward at once, never cross-faded. */
export function HeroShowcase({ projects }: { projects: HeroProject[] }) {
  const [selected, setSelected] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const root = useRef<HTMLDivElement>(null);
  const project = projects[selected];

  useEffect(() => {
    // Digits key a work directly while the edition is on screen and no field has focus.
    function key(event: KeyboardEvent) {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
      if ((event.target as HTMLElement | null)?.closest("input, textarea, select, [contenteditable='true']")) return;
      const index = Number(event.key) - 1;
      if (!Number.isInteger(index) || index < 0 || index >= projects.length) return;
      const rect = root.current?.getBoundingClientRect();
      if (!rect || rect.bottom < 0 || rect.top > window.innerHeight) return;
      setSelected(index);
    }
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [projects.length]);

  return <div className="hero-works" ref={root}>
    <figure className="plate plate-sheet">
      <Link className="hero-preview" href={`/work/${project.slug}`} aria-label={`Explore ${project.title} case study`}>
        <PlateImage><Image src={project.coverImage} alt={project.coverAlt} width={1440} height={960} sizes="(max-width: 767px) calc(100vw - 68px), (max-width: 1023px) calc(100vw - 180px), 700px" priority={selected === 0} /></PlateImage>
        <span className="hero-preview-action">View the work<ArrowUpRight size={16} aria-hidden="true" /></span>
      </Link>
      <Inscription live title={project.title} edition={`${Number(project.number)}/6`} meta={`${project.industry} · Independent concept`} />
    </figure>
    <div className="sheet-stack" role="group" aria-label="Choose one of the six works" aria-describedby="stack-help">
      {projects.map((item, index) => <button ref={node => { buttons.current[index] = node; }} key={item.slug} type="button" aria-label={`Preview ${item.title}`} aria-pressed={selected === index} onClick={() => setSelected(index)} onKeyDown={event => {
        const next = event.key === "ArrowRight" || event.key === "ArrowDown" ? (index + 1) % projects.length : event.key === "ArrowLeft" || event.key === "ArrowUp" ? (index - 1 + projects.length) % projects.length : event.key === "Home" ? 0 : event.key === "End" ? projects.length - 1 : undefined;
        if (next !== undefined) { event.preventDefault(); setSelected(next); buttons.current[next]?.focus(); }
      }}>
        <span className="stack-number" aria-hidden="true">{Number(item.number)}</span><span className="stack-name" aria-hidden="true">{item.shortTitle}</span>
      </button>)}
    </div>
    <div className="hero-status"><p><span className="status-mark" aria-hidden="true" /><span className="status-title">{site.title}, available for freelance work. </span><span className="status-available">Available for freelance work. </span><StudioClock /></p><p className="stack-hint" id="stack-help">Press <kbd>1</kbd> to <kbd>6</kbd>, or use the arrow keys, to turn through the edition.</p></div>
  </div>;
}
