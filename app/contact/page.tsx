import { ArrowUpRight, Mail } from "lucide-react";
import { PageIntro } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { deliveryConfigured } from "@/lib/delivery";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Start a Project", "Tell me about your website, application, MVP, dashboard or AI integration. Share your goals and scope to start a freelance project conversation.", "/contact");
export const dynamic = "force-dynamic";
export default function Contact() {
  return <>
    <PageIntro eyebrow="Start a conversation" title="What are you thinking of building?" description="A new product, a better website, or an improvement to something you already have. Tell me a little about it." />
    <section className="contact-layout container">
      <ContactForm configured={deliveryConfigured()} />
      <aside className="contact-sidebar">
        <h2>Start with the idea.</h2>
        <p>You don’t need a complete specification. A description of the problem, your users, and what you want to achieve is a useful place to start.</p>
        <p>I work with founders, small businesses, and agencies on websites and applications.</p>
        <div className="contact-alternatives">
          {site.email && <a href={`mailto:${site.email}`}><Mail size={16} aria-hidden="true" />{site.email}</a>}
          {site.linkedin && <a href={site.linkedin} rel="noreferrer" target="_blank">Connect on LinkedIn<ArrowUpRight size={16} aria-hidden="true" /></a>}
        </div>
        {!site.email && !site.linkedin && <p className="contact-note">[NEEDS MY CONTENT]<br />Email and LinkedIn contact details.</p>}
        <p className="contact-note">Based in Malaysia.<br />Open to conversations with teams worldwide.</p>
      </aside>
    </section>
  </>;
}
