import { Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "./social-icons";
import { emailUrl, site, whatsappUrl } from "@/lib/site";

export function ContactLinks({ github = false, className = "contact-links" }: { github?: boolean; className?: string }) {
  return <div className={className}>
    <a href={emailUrl()}><Mail size={16} aria-hidden="true" /><span>Email Alson</span><ArrowUpRight size={14} aria-hidden="true" /></a>
    <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} aria-hidden="true" /><span>WhatsApp</span><ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
    <a href={site.linkedin} target="_blank" rel="noopener noreferrer"><LinkedinIcon size={16} /><span>LinkedIn</span><ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
    {github && <a className="secondary-contact" href={site.github} target="_blank" rel="noopener noreferrer"><GithubIcon size={16} /><span>GitHub</span><ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>}
  </div>;
}
