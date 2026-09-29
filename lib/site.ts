/** Public identity supplied by Alson; credentials belong only in server environment variables. */
export const site = {
  name: "Alson Chua",
  brand: "Alson Chua",
  title: "Independent Web & App Developer",
  positioning: "Websites, Web Apps, E-Commerce, MVPs, Dashboards & AI Products",
  url: "https://alson-portfolio-nine.vercel.app/",
  email: "alsonchua18@gmail.com",
  github: "https://github.com/yiz1118",
  linkedin: "https://www.linkedin.com/in/chua-yiz-063ba9272",
  whatsapp: "https://wa.me/601158576386",
  whatsappMessage: "Hi Alson, I came across your portfolio and I'm interested in discussing a website/app project with you.",
  portrait: "",
  availability: "Available for freelance projects worldwide",
  location: "Malaysia · Working with clients worldwide",
  budgetOptions: ["Not sure yet", "Prefer to discuss"],
  projectTypes: ["Website", "Web Application", "E-Commerce", "MVP", "Dashboard", "AI Integration", "Existing Product Improvements", "Other"],
};

export function whatsappUrl(message = site.whatsappMessage) {
  return `${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function emailUrl(brief?: string) {
  return brief ? `mailto:${site.email}?subject=${encodeURIComponent("Website / app project enquiry")}&body=${encodeURIComponent(brief)}` : `mailto:${site.email}`;
}

export function publicationConfig(env: Partial<NodeJS.ProcessEnv> = process.env) {
  const isProduction = env.VERCEL_ENV === "production" || env.SITE_MODE === "production";
  const includeDrafts = !isProduction;
  let url: URL | undefined;
  try {
    const candidate = new URL(env.SITE_URL || site.url);
    if (candidate.protocol === "https:" && !["localhost", "127.0.0.1"].includes(candidate.hostname)) url = candidate;
  } catch { /* An invalid override must not produce a misleading canonical. */ }
  return { includeDrafts, url, indexable: isProduction && env.SITE_INDEXING === "true" && Boolean(url) };
}

export const navigation = [
  { href: "/work", label: "Work" }, { href: "/services", label: "Services" },
  { href: "/about", label: "About" }, { href: "/contact", label: "Contact" },
];
