"use client";

import { useEffect, useState } from "react";

export type SectionItem = { id: string; label: string; number?: string };

/** Track the current section with one rAF-batched read per scroll frame; React only re-renders on change. */
export function SectionNavigation({ items, label, collection = false }: { items: SectionItem[]; label: string; collection?: boolean }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const nodes = items.map(item => document.getElementById(item.id)).filter((node): node is HTMLElement => Boolean(node));
    let frame = 0;
    function update() {
      frame = 0;
      const line = collection ? 205 : 155;
      const passed = nodes.filter(node => node.getBoundingClientRect().top <= line);
      setActive(passed.at(-1)?.id ?? nodes[0]?.id);
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, [items, collection]);

  return <nav className={collection ? "collection-navigation" : "section-navigation"} aria-label={label}>
    {collection && <span className="collection-label">Turn to a work</span>}
    <div className="section-navigation-links">{items.map(item => <a key={item.id} href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined} onClick={() => setActive(item.id)}>
      {item.number && <span className="section-navigation-number" aria-hidden="true">{item.number}</span>}<span>{item.label}</span>
    </a>)}</div>
  </nav>;
}
