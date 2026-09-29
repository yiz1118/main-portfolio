import Link from "next/link";
import { navigation, site } from "@/lib/site";
import { ContactLinks } from "./contact-links";
export function Footer() {
  return <footer className="site-footer container"><div className="footer-top"><div><Link href="/" className="footer-brand">{site.name}<span>.</span></Link><p>{site.title}<br />{site.location}</p></div><nav aria-label="Footer navigation">{navigation.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav><ContactLinks github className="footer-social" /></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {site.name}</span><span>Thoughtfully built. Carefully tested.</span></div></footer>;
}
