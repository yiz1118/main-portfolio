"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, type ReactNode, type PointerEvent } from "react";

/** An optional pointer affordance. The native link, focus and touch action remain primary. */
export function ProjectImageLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  const badge = useRef<HTMLSpanElement>(null);
  const bounds = useRef<DOMRect | null>(null);
  const frame = useRef(0);
  const preference = useRef<MediaQueryList | null>(null);
  useEffect(() => {
    preference.current = window.matchMedia("(prefers-reduced-motion: reduce), (hover: none), (pointer: coarse)");
    return () => cancelAnimationFrame(frame.current);
  }, []);
  function reset() {
    cancelAnimationFrame(frame.current);
    bounds.current = null;
    badge.current?.style.removeProperty("transform");
  }
  function move(event: PointerEvent<HTMLAnchorElement>) {
    if (event.pointerType !== "mouse" || preference.current?.matches || !bounds.current) return;
    const rect = bounds.current;
    // Only one DOM write per frame; layout is measured once on entry.
    const x = Math.min(rect.width - 156, Math.max(12, event.clientX - rect.left - 65));
    const y = Math.min(rect.height - 56, Math.max(12, event.clientY - rect.top - 22));
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      if (badge.current) badge.current.style.transform = `translate(${x - rect.width + 156}px, ${y - 20}px)`;
    });
  }
  return <Link href={href} className="project-image-link presentation-cover" aria-label={label}
    onPointerEnter={event => { if (!preference.current?.matches) bounds.current = event.currentTarget.getBoundingClientRect(); }}
    onPointerMove={move} onPointerLeave={reset} onBlur={reset}>
    {children}<span ref={badge} className="project-arrow" aria-hidden="true">View case study<ArrowUpRight size={18} /></span>
  </Link>;
}
