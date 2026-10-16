import Image from "next/image";
import Link from "next/link";
import { PageIntro, ContactCTA } from "@/components/ui";
import { ContactLinks } from "@/components/contact-links";
import { Chop } from "@/components/chop";
import { Inscription, PlateImage } from "@/components/plate";
import { StudioClock } from "@/components/studio-clock";
import { projects } from "@/data/projects";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("About Alson Chua", "Alson Chua, an independent web and app developer based in Malaysia. Game-development roots, product design, frontend development, and delivery for teams worldwide.", "/about");

const principles = [
  { title: "Start with the problem.", text: "Get clear on the users, goals, and scope before anything is drawn." },
  { title: "Keep it practical.", text: "Choose features and architecture that serve the product, not the portfolio." },
  { title: "Own the details.", text: "Test, communicate, and make the handover clear. The work carries my name." },
];

export default function About() {
  return <>
    <PageIntro title="Curious by nature. A builder by choice." description={`${site.name}, ${site.title.toLowerCase()}. Malaysia, working worldwide.`} />
    <section className="about-page container">
      <div className="about-story" data-reveal="up">
        <h2>From interactive worlds to useful products.</h2>
        <p>My background is in game development: programming, interactive systems, and the details that make an experience feel responsive.</p>
        <p>Today I design and build websites, web applications, stores, and digital products. I connect the visual direction with the way the software works, so the thing you approve is the thing that ships.</p>
        <h3>Modern tools. Personal responsibility.</h3>
        <p>AI-assisted tools help me prototype and iterate. Architecture, implementation, testing, deployment, and handover remain my responsibility.</p>
        <ContactLinks />
      </div>
      <aside className="profile-panel" aria-label="Developer profile">
        <div className="profile-card">
          {site.portrait && <Image src={site.portrait} width={500} height={500} alt={`Portrait of ${site.name}`} />}
          <h2>{site.name}<Chop /></h2>
          <p className="profile-role">{site.title}</p>
          <p>{site.availability}</p>
          <dl><div><dt>Based in</dt><dd>Malaysia</dd></div><div><dt>Local time</dt><dd><StudioClock /></dd></div><div><dt>Working with</dt><dd>Teams worldwide</dd></div><div><dt>Focus</dt><dd>Web, apps, products</dd></div></dl>
        </div>
      </aside>
    </section>
    <section className="about-values container" aria-labelledby="principles-heading">
      <h2 id="principles-heading" className="sr-only">Working principles</h2>
      {principles.map(item => <div key={item.title} data-reveal="rule"><h3>{item.title}</h3><p>{item.text}</p></div>)}
    </section>
    <section className="about-projects container" aria-labelledby="about-works-heading">
      <h2 id="about-works-heading">Three of the six.</h2>
      <div>{[projects[0], projects[2], projects[1]].map(project => <Link key={project.slug} href={`/work/${project.slug}`} aria-label={`View ${project.title} case study`}><figure className="plate plate-sheet" data-reveal="plate"><PlateImage><Image src={project.coverImage} alt={project.coverAlt} width={1440} height={960} sizes="(max-width: 767px) calc(100vw - 64px), 420px" /></PlateImage><Inscription title={project.title} edition={`${Number(project.number)}/6`} /></figure></Link>)}</div>
    </section>
    <ContactCTA />
  </>;
}
