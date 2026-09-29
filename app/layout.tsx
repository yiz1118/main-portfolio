import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { PageView } from "@/components/page-view";
import { publicationConfig, site } from "@/lib/site";
import "./globals.css";

const config = publicationConfig();
export const metadata: Metadata = {
  metadataBase: config.url || new URL("http://localhost:3000"),
  title: { default: `${site.name} — ${site.title}`, template: `%s | ${site.name}` },
  description: "Alson Chua designs and builds websites, web apps, e-commerce, MVPs, dashboards and AI products for startups, brands and businesses. Malaysia, working worldwide.",
  robots: { index: config.indexable, follow: config.indexable },
  openGraph: { type: "website", siteName: site.name, images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Alson Chua — Independent Web & App Developer" }] },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><PageView /><a href="#main-content" className="skip-link">Skip to content</a><Navigation /><main id="main-content" tabIndex={-1}>{children}</main><Footer /></body></html>;
}
