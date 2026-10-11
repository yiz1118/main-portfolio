"use client";

import { useEffect, useState } from "react";

export type SectionItem = { id: string; label: string; number?: string };

/** Observe section boundaries, rather than subscribe React to every scroll frame. */
export function SectionNavigation({ items, label, collection = false }: { items: SectionItem[]; label: string; collection?: boolean }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const nodes = items.map(item => document.getElementById(item.id)).filter((node): node is HTMLElement => Boolean(node));
    function update() {
      const positions = nodes.map(node => ({ id: node.id, top: node.getBoundingClientRect().top }));
      const passed = positions.filter(node => node.top <= (collection ? 205 : 155));
      setActive(passed.at(-1)?.id ?? positions[0]?.id);
    }
    const observer = new IntersectionObserver(update, { rootMargin: "-130px 0px -60% 0px", threshold: 0 });
    nodes.forEach(node => observer.observe(node));
    update();
    return () => observer.disconnect();
  }, [items, collection]);

  return <nav className={collection ? "collection-navigation" : "section-navigation"} aria-label={label}>
    {collection && <span className="collection-label">Explore the six concepts</span>}
    <div className="section-navigation-links">{items.map(item => <a key={item.id} href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined} onClick={() => setActive(item.id)}>
      {item.number && <span className="section-navigation-number" aria-hidden="true">{item.number}</span>}<span>{item.label}</span>
    </a>)}</div>
  </nav>;
}
