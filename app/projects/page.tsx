import { PageIntro, ContactCTA } from "@/components/ui";
import { ProjectGrid } from "@/components/project-grid";
import { visibleProjects } from "@/data/projects";
import { publicationConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Work & Case Studies", "Explore application and AI workflow case studies, technical decisions, development processes, and documented outcomes.", "/projects");
export default function Projects() {
  const { includeDrafts } = publicationConfig();
  return <><PageIntro eyebrow="Work & case studies" title="A closer look at the work." description="The product, the problem, and the decisions behind it. Explore how each project is structured—and what has actually been built." /><section className="container" aria-label="Project collection">{includeDrafts && <p className="content-notice">These are draft case studies of existing technical work. Project type and personal contribution await confirmation. The visuals are labeled illustrations; they are not product screenshots.</p>}<ProjectGrid projects={visibleProjects(includeDrafts)} /></section><ContactCTA /></>;
}
