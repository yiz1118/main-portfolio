import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { PageView } from "@/components/page-view";
import { publicationConfig, site } from "@/lib/site";
import "./globals.css";

const config = publicationConfig();
export const metadata: Metadata = {
  metadataBase: config.url || new URL("http://localhost:3000"),
  title: { default: "Web & App Developer — Websites, MVPs & AI Integrations", template: "%s | Web & App Developer" },
  description: "Websites, web applications, MVPs, dashboards and AI integrations for startups and small businesses. Based in Malaysia, working worldwide.",
  robots: { index: config.indexable, follow: config.indexable },
  openGraph: { type: "website", siteName: site.name.startsWith("[") ? site.brand : site.name, images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Websites, apps, and ideas made real" }] },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><PageView /><a href="#main-content" className="skip-link">Skip to content</a>{config.includeDrafts && <div className="preview-notice">Portfolio preview · Project illustrations and draft case studies await confirmed content.<a href="/contact">Contact details pending</a></div>}<Navigation /><main id="main-content" tabIndex={-1}>{children}</main><Footer /></body></html>;
}
