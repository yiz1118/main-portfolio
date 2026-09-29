import { PageIntro, ContactCTA } from "@/components/ui";
import { ProjectGrid } from "@/components/project-grid";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Work & Case Studies", "Six independent concept projects by Alson Chua, spanning automotive, SaaS, fashion, hospitality, architecture and skincare. Explore the design and development decisions.", "/work");

export default function Work() {
  return <><PageIntro eyebrow="Work & case studies / 2026" title="Different industries. The same care in building." description="Six independent concepts, each with its own visual direction, user journey, and standalone application. Explore the decisions behind the work, then try the live experience." /><section className="container" aria-label="Project collection"><ProjectGrid projects={projects} /></section><ContactCTA /></>;
}
