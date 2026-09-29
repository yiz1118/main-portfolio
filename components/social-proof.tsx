import Image from "next/image";
import { testimonials, clientLogos } from "@/data/social-proof";
import { SectionLabel } from "./ui";
export function SocialProof() {
  if (!testimonials.length && !clientLogos.length) return null;
  return <section className="social-proof container" aria-label="Client feedback">
    <SectionLabel>Client feedback</SectionLabel>
    {testimonials.length > 0 && <div className="testimonial-grid">{testimonials.map(t => <figure key={`${t.name}-${t.context}`}><blockquote><p>{t.quote}</p></blockquote><figcaption>{t.name}<span>{t.context}</span></figcaption></figure>)}</div>}
    {clientLogos.length > 0 && <div className="client-logos">{clientLogos.map(logo => <Image key={logo.name} src={logo.src} alt={logo.name} width={logo.width} height={logo.height} />)}</div>}
  </section>;
}
