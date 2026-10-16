"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation, site } from "@/lib/site";
import { Chop } from "./chop";

export function Navigation() {
  const path = usePathname(); const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null); const panel = useRef<HTMLDivElement>(null);
  const boundary = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    if (boundary.current) observer.observe(boundary.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    function key(event: KeyboardEvent) {
      if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); }
      if (event.key === "Tab") {
        const items = [trigger.current, ...Array.from(panel.current?.querySelectorAll<HTMLAnchorElement>("a") || [])].filter(Boolean) as HTMLElement[];
        const index = items.indexOf(document.activeElement as HTMLElement);
        if (event.shiftKey && index === 0) { event.preventDefault(); items.at(-1)?.focus(); }
        else if (!event.shiftKey && index === items.length - 1) { event.preventDefault(); items[0]?.focus(); }
      }
    }
    function resize() { if (window.innerWidth >= 768) setOpen(false); }
    document.addEventListener("keydown", key); window.addEventListener("resize", resize);
    return () => { document.removeEventListener("keydown", key); window.removeEventListener("resize", resize); };
  }, [open]);
  const close = () => setOpen(false);
  return <><span ref={boundary} className="header-boundary" aria-hidden="true" /><header className={`site-header ${scrolled || open ? "header-scrolled" : ""}`}><div className="nav-container container">
    <Link href="/" className="brand" aria-label={`${site.name} home`} onClick={close}><Chop /><span>{site.name}<small>{site.title}</small></span></Link>
    <nav aria-label="Main navigation" className="desktop-nav">{navigation.filter(item => item.href !== "/contact").map(item => <Link key={item.href} href={item.href} aria-current={path.startsWith(item.href) ? "page" : undefined}>{item.label}</Link>)}</nav>
    <Link href="/contact" className="nav-cta inline-link" aria-current={path.startsWith("/contact") ? "page" : undefined}>Start a Project<ArrowUpRight size={16} aria-hidden="true" /></Link>
    <button ref={trigger} className="menu-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
  </div><div ref={panel} id="mobile-navigation" className="mobile-navigation" hidden={!open}><nav aria-label="Mobile navigation">{navigation.map(item => <Link key={item.href} href={item.href} onClick={close} aria-current={path.startsWith(item.href) ? "page" : undefined}>{item.label}<ArrowUpRight size={22} aria-hidden="true" /></Link>)}<Link className="mobile-start" href="/contact" onClick={close}>Start a Project<ArrowUpRight size={19} aria-hidden="true" /></Link><p className="mobile-meta note">{site.location}</p></nav></div></header></>;
}
