import type { MetadataRoute } from "next";
import { publicationConfig } from "@/lib/site";
import { visibleProjects } from "@/data/projects";
export default function sitemap(): MetadataRoute.Sitemap {
  const { indexable, url } = publicationConfig(); if (!indexable || !url) return [];
  return ["/", "/projects", "/services", "/about", "/contact", ...visibleProjects(false).map(p => `/projects/${p.slug}`)].map(path => ({ url: new URL(path, url).toString() }));
}
