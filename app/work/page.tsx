import { PageIntro, ContactCTA } from "@/components/ui";
import { ProjectGrid } from "@/components/project-grid";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Work & Case Studies", "Six independent concept projects by Alson Chua, spanning automotive, SaaS, fashion, hospitality, architecture and skincare. Explore the design and development decisions.", "/work");

export default function Work() {
  return <><PageIntro title="Six worlds. One pair of hands." description="The 2026 collection: independent concepts across automotive, SaaS, fashion, hospitality, architecture and skincare. Read each catalogue entry, then open the live site." /><section className="container work-collection" aria-label="Project collection"><ProjectGrid projects={projects} /></section><ContactCTA /></>;
}
