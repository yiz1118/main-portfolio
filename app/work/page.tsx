import { PageIntro, ContactCTA } from "@/components/ui";
import { ProjectGrid } from "@/components/project-grid";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Work & Case Studies", "Six independent concept projects by Alson Chua, spanning automotive, SaaS, fashion, hospitality, architecture and skincare. Explore the design and development decisions.", "/work");

export default function Work() {
  return <><PageIntro eyebrow="Selected work / 2026" title="Six worlds. One developer." description="Independent concepts across automotive, SaaS, fashion, hospitality, architecture, and skincare. Explore the work. Try the live experiences." /><section className="container" aria-label="Project collection"><ProjectGrid projects={projects} /></section><ContactCTA /></>;
}
