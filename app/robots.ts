import type { MetadataRoute } from "next";
import { publicationConfig } from "@/lib/site";
export default function robots(): MetadataRoute.Robots {
  const { indexable, url } = publicationConfig();
  return indexable && url ? { rules: { userAgent: "*", allow: "/", disallow: "/api/" }, sitemap: new URL("/sitemap.xml", url).toString() } : { rules: { userAgent: "*", disallow: "/" } };
}
