import type { Metadata } from "next";
import { publicationConfig } from "./site";
export function pageMetadata(title: string, description: string, path: string, draft = false): Metadata {
  const { indexable, url } = publicationConfig();
  return {
    title, description,
    alternates: url ? { canonical: new URL(path, url).toString() } : undefined,
    robots: { index: indexable && !draft, follow: indexable && !draft },
    openGraph: { title, description, type: "website", locale: "en_US", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Websites, apps, and ideas made real" }], ...(url ? { url: new URL(path, url).toString() } : {}) },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  };
}
