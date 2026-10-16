import Link from "next/link";
import { navigation, site } from "@/lib/site";
import { ContactLinks } from "./contact-links";
import { Chop } from "./chop";

/** The colophon: who made this, where, and in what type. */
export function Footer() {
  return <footer className="site-footer"><div className="container">
    <div className="footer-top">
      <div><Link href="/" className="footer-brand"><Chop />{site.name}</Link><p>{site.title}. {site.location}.</p></div>
      <nav aria-label="Footer navigation">{navigation.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav>
      <ContactLinks github className="footer-social" />
    </div>
    <div className="footer-colophon"><p className="note">Designed, written, built and tested by {site.name} in Malaysia. Set in Schibsted Grotesk and Libre Caslon.</p><span>© {new Date().getFullYear()} {site.name}</span></div>
  </div></footer>;
}
