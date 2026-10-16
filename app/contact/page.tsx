import { Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/social-icons";
import { PageIntro } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { StudioClock } from "@/components/studio-clock";
import { deliveryConfigured } from "@/lib/delivery";
import { site, emailUrl, whatsappUrl } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Start a Project", "Discuss your website, web app, e-commerce, MVP or AI product with Alson Chua. Contact by email, WhatsApp or LinkedIn. Based in Malaysia, working worldwide.", "/contact");
export const dynamic = "force-dynamic";

export default function Contact() {
  return <><PageIntro title="Let’s build something." description="A website, a new product, or a better version of what you have. You talk to the person who will build it." /><section className="contact-layout container"><aside className="contact-sidebar"><h2>Start with the idea.</h2><p>Share your goals, your users, and your timing. A finished specification can come later.</p><div className="contact-alternatives"><a href={emailUrl()}><Mail size={18} aria-hidden="true" /><span>{site.email}</span><ArrowUpRight size={16} aria-hidden="true" /></a><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} aria-hidden="true" /><span>Discuss your project on WhatsApp</span><span className="sr-only"> (opens in a new tab)</span><ArrowUpRight size={16} aria-hidden="true" /></a><a href={site.linkedin} target="_blank" rel="noopener noreferrer"><LinkedinIcon size={18} /><span>Connect on LinkedIn</span><span className="sr-only"> (opens in a new tab)</span><ArrowUpRight size={16} aria-hidden="true" /></a><a className="secondary-contact" href={site.github} target="_blank" rel="noopener noreferrer"><GithubIcon size={18} /><span>Explore my GitHub</span><span className="sr-only"> (opens in a new tab)</span><ArrowUpRight size={16} aria-hidden="true" /></a></div><p className="contact-note"><span>{site.location}</span><span>{site.availability}</span><StudioClock /></p></aside><ContactForm configured={deliveryConfigured()} /></section></>;
}
