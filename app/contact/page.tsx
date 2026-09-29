import { Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/social-icons";
import { PageIntro } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { deliveryConfigured } from "@/lib/delivery";
import { site, emailUrl, whatsappUrl } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Start a Project", "Discuss your website, web app, e-commerce, MVP or AI product with Alson Chua. Contact by email, WhatsApp or LinkedIn. Based in Malaysia, working worldwide.", "/contact");
export const dynamic = "force-dynamic";

export default function Contact() {
  return <><PageIntro eyebrow="Start a conversation" title="What are you thinking of building?" description="A new product, a better website, or an improvement to something you already have. Tell me a little about it." /><section className="contact-layout container"><aside className="contact-sidebar"><h2>Start with the idea.</h2><p>You don’t need a complete specification. Your goals, your users, and what you want to achieve are a useful place to start.</p><p>I work with startups, brands, entrepreneurs, and businesses on websites and applications.</p><div className="contact-alternatives"><a href={emailUrl()}><Mail size={17} aria-hidden="true" /><span>{site.email}</span><ArrowUpRight size={15} aria-hidden="true" /></a><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} aria-hidden="true" /><span>Discuss your project on WhatsApp</span><ArrowUpRight size={15} aria-hidden="true" /></a><a href={site.linkedin} target="_blank" rel="noopener noreferrer"><LinkedinIcon size={17} /><span>Connect on LinkedIn</span><ArrowUpRight size={15} aria-hidden="true" /></a><a className="secondary-contact" href={site.github} target="_blank" rel="noopener noreferrer"><GithubIcon size={17} /><span>Explore my GitHub</span><ArrowUpRight size={15} aria-hidden="true" /></a></div><p className="contact-note">{site.location}<br />{site.availability}</p></aside><ContactForm configured={deliveryConfigured()} /></section></>;
}
