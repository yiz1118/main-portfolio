/** Replace marked identity values before publication. No identity is inferred from local paths. */
export const site = {
  name: "[NEEDS MY CONTENT]",
  brand: "Independent developer",
  positioning: "Web & App Developer | Websites, MVPs, Dashboards & AI Integrations",
  email: "",
  github: "",
  linkedin: "",
  portrait: "",
  availability: "",
  location: "Malaysia",
  budgetOptions: ["Not sure yet", "Prefer to discuss"],
  projectTypes: ["Website", "Web Application", "MVP", "Dashboard", "AI Integration", "Existing Product Improvements", "Other"],
};

export function publicationConfig(env: Partial<NodeJS.ProcessEnv> = process.env) {
  const isProduction = env.VERCEL_ENV === "production" || env.SITE_MODE === "production";
  const includeDrafts = !isProduction;
  let url: URL | undefined;
  try {
    const candidate = new URL(env.SITE_URL || "");
    if (candidate.protocol === "https:" && !["localhost", "127.0.0.1"].includes(candidate.hostname)) url = candidate;
  } catch { /* Unconfigured site has no canonical rather than a fake domain. */ }
  return { includeDrafts, url, indexable: isProduction && env.SITE_INDEXING === "true" && Boolean(url) };
}

export const navigation = [
  { href: "/projects", label: "Work" }, { href: "/services", label: "Services" },
  { href: "/about", label: "About" }, { href: "/contact", label: "Contact" },
];
