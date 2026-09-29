import { notFound, permanentRedirect } from "next/navigation";
import { findProject } from "@/data/projects";
export default async function LegacyProject({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!findProject(slug)) notFound();
  permanentRedirect(`/work/${slug}`);
}
