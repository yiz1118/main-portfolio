import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navigation, site } from "@/lib/site";
export function Footer() {
  return <footer className="site-footer container"><div className="footer-top"><div><Link href="/" className="footer-brand">{site.name.startsWith("[") ? site.brand : site.name}<span>.</span></Link><p>Building websites, apps<br />and digital products.</p></div><nav aria-label="Footer navigation">{navigation.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav><div className="footer-social">{site.github && <a href={site.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a>}{site.linkedin && <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14} /></a>}<span>Based in Malaysia.<br />Working worldwide.</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {site.name.startsWith("[") ? "Independent developer" : site.name}</span><span>Thoughtfully built. Carefully tested.</span></div></footer>;
}
