"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation, site } from "@/lib/site";

export function Navigation() {
  const path = usePathname(); const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null); const panel = useRef<HTMLDivElement>(null);
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
  return <header className="site-header"><div className="nav-container container">
    <Link href="/" className="brand" aria-label={`${site.name} home`} onClick={close}><span className="brand-mark" aria-hidden="true">a<span>.</span></span><span>{site.name}<small>{site.title}</small></span></Link>
    <nav aria-label="Main navigation" className="desktop-nav">{navigation.map(item => <Link key={item.href} href={item.href} aria-current={path.startsWith(item.href) ? "page" : undefined}>{item.label}</Link>)}</nav>
    <Link href="/contact" className="nav-cta">Start a Project <ArrowUpRight size={16} aria-hidden="true" /></Link>
    <button ref={trigger} className="menu-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
  </div><div ref={panel} id="mobile-navigation" className="mobile-navigation" hidden={!open}><nav aria-label="Mobile navigation">{navigation.map(item => <Link key={item.href} href={item.href} onClick={close} aria-current={path.startsWith(item.href) ? "page" : undefined}>{item.label}<ArrowUpRight size={19} aria-hidden="true" /></Link>)}<Link className="mobile-start" href="/contact" onClick={close}>Start a Project<ArrowUpRight size={19} aria-hidden="true" /></Link></nav></div></header>;
}
