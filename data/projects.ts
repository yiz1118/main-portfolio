export interface ProjectImage {
  src: string;
  alt: string;
  caption: string;
  page: string;
}

export interface Project {
  slug: string;
  number: string;
  title: string;
  industry: string;
  category: "Brand Website" | "SaaS & Dashboard" | "E-Commerce";
  projectType: "Independent Concept Project";
  year: number;
  summary: string;
  description: string;
  role: string[];
  services: string[];
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  coverImage: string;
  coverAlt: string;
  heroImage: string;
  galleryImages: ProjectImage[];
  mobileImages: ProjectImage[];
  overview: string;
  brief: string;
  businessObjective: string;
  designDirection: { title: string; description: string }[];
  experience: { title: string; description: string; page: string }[];
  responsive: string;
  implementation: { title: string; description: string }[];
  skills: string[];
  demoNote: string;
}

function presentation(slug: string, title: string, views: { page: string; caption: string }[], mobilePage: string) {
  const image = (name: string, view: { page: string; caption: string }): ProjectImage => ({
    src: `/projects/${slug}/${name}.webp`, alt: `${title}: ${view.caption}`, ...view,
  });
  return {
    projectType: "Independent Concept Project" as const, year: 2026,
    role: ["Product design", "Frontend development"],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    coverImage: `/projects/${slug}/cover.webp`, coverAlt: `${title} deployed website, desktop homepage`,
    heroImage: `/projects/${slug}/hero.webp`,
    galleryImages: views.map((view, index) => image(["desktop-01", "desktop-02", "detail-01"][index], view)),
    mobileImages: [image("mobile-01", { page: mobilePage, caption: "Deployed interface at a 390 pixel mobile viewport." })],
  };
}

/** A presentation hub: the six applications and their repositories remain independent. */
export const projects: Project[] = [
  {
    ...presentation("vanta", "VANTA Motorworks", [
      { page: "/builds", caption: "Vehicle studies paired with concise engineering facts." },
      { page: "/engineering", caption: "A dedicated engineering narrative explains the process." },
      { page: "/gallery", caption: "A gallery gives each concept vehicle room to be examined." },
    ], "/"),
    slug: "vanta", number: "01", title: "VANTA Motorworks", industry: "Automotive / Performance", category: "Brand Website",
    summary: "Cinematic automotive. Precise engineering.",
    description: "An automotive concept bringing vehicle presentation, engineering detail, and a focused enquiry journey into one precise visual system.",
    services: ["Brand direction", "Website design", "Frontend development", "Responsive implementation"],
    liveUrl: "https://vanta-automotive.vercel.app/", githubUrl: "https://github.com/yiz1118/vanta-automotive",
    overview: "A performance-studio concept connecting cinematic vehicle imagery, engineering stories, and a focused enquiry.",
    brief: "Let the vehicles lead. Keep technical facts and navigation precise.",
    businessObjective: "Connect build discovery to enquiry. No lead or business results are claimed.",
    designDirection: [
      { title: "Typography & colour", description: "Barlow Condensed headlines, Instrument Sans body, mono facts. Graphite surfaces keep attention on the vehicles." },
      { title: "Composition & imagery", description: "Wide vehicle views alternate with close details and aligned specifications." },
      { title: "Motion & rhythm", description: "Quiet transitions connect cinematic imagery and compact engineering information." },
    ],
    experience: [
      { title: "Vehicle presentation", description: "Three fictional vehicle studies lead into individual build pages.", page: "/builds" },
      { title: "Technical storytelling", description: "Engineering and studio pages explain the thinking behind each build.", page: "/engineering" },
      { title: "Image exploration", description: "A visual route through the vehicle collection.", page: "/gallery" },
      { title: "Focused enquiry", description: "A local form organizes build interest into a project brief.", page: "/enquiry" },
    ],
    responsive: "Wide vehicle views become a vertical story, with readable facts, deliberate crops, compact navigation, and touch-sized actions.",
    implementation: [
      { title: "Typed content & routes", description: "Next.js routes and TypeScript models organize builds and supporting pages." },
      { title: "Responsive media", description: "Local vehicle assets and responsive images keep specifications readable." },
      { title: "Interaction decisions", description: "Small React components handle navigation and a local enquiry demonstration." },
    ],
    skills: ["Automotive art direction", "Technical storytelling", "Vehicle presentation", "Responsive frontend craft", "Interaction design"],
    demoNote: "VANTA is a fictional studio. Vehicles, specifications, and performance targets are concept content. The enquiry is a local demonstration and does not submit a real request.",
  },
  {
    ...presentation("nexa", "NEXA", [
      { page: "/app", caption: "The dashboard brings workspace activity and the next task into one view." },
      { page: "/app/knowledge", caption: "The knowledge library organizes locally stored sample documents." },
      { page: "/app/workflows", caption: "An editable workflow exposes its sequence and simulated run." },
    ], "/app"),
    slug: "nexa", number: "02", title: "NEXA", industry: "AI / SaaS / Productivity", category: "SaaS & Dashboard",
    summary: "Team knowledge. Connected workflows.",
    description: "An AI-focused SaaS concept combining product marketing with an interactive workspace for documents, sample answers, and workflow building.",
    services: ["Product strategy", "SaaS website design", "Dashboard UX", "Frontend development"],
    liveUrl: "https://nexa-saas-alpha.vercel.app/", githubUrl: "https://github.com/yiz1118/nexa-saas",
    overview: "A connected SaaS marketing site and workspace for documents, sample answers, and editable workflows. Browser state persists across tasks.",
    brief: "Explain the product simply. Make its promise tangible in the workspace.",
    businessObjective: "Let teams explore knowledge and workflow interfaces. Pricing and integrations are illustrative.",
    designDirection: [
      { title: "Typography & colour", description: "Manrope, quiet neutrals, and one product accent connect marketing and workspace screens." },
      { title: "Grid & hierarchy", description: "Structured panels, tables, and charts organize dense information." },
      { title: "Product imagery & motion", description: "Product previews and state changes explain tasks with minimal decoration." },
    ],
    experience: [
      { title: "Product marketing", description: "Features, use cases, and pricing lead into the workspace demo.", page: "/product" },
      { title: "Knowledge library", description: "Typed sample documents support previews, search, sorting, and filters.", page: "/app/knowledge" },
      { title: "Workflow builder", description: "Edit, validate, and follow a simulated run with sample results.", page: "/app/workflows" },
      { title: "Team & analytics", description: "Connected screens organize sample membership and reporting.", page: "/app/analytics" },
    ],
    responsive: "Compact navigation and contained data regions keep workspace tasks reachable. The mobile capture shows the live application.",
    implementation: [
      { title: "Connected architecture", description: "Typed models and a shared provider connect marketing routes with workspace screens." },
      { title: "Persistence & recovery", description: "Versioned localStorage supports edits and recovery from invalid browser state." },
      { title: "Transparent AI demonstration", description: "Sample answers cite sources. AI, authentication, and team security are demonstrations." },
    ],
    skills: ["SaaS product design", "Dashboard UX", "Information architecture", "AI product interfaces", "Structured data", "Stateful frontend development"],
    demoNote: "NEXA uses local browser data and deterministic sample answers. Accounts, AI responses, integrations, billing, and workflow execution do not connect to production services.",
  },
  {
    ...presentation("form27", "FORM / 27", [
      { page: "/shop", caption: "The collection makes silhouette, category, and selection easy to compare." },
      { page: "/products/axis-trouser", caption: "A large garment gallery sits beside fit, material, and size decisions." },
      { page: "/campaign", caption: "Campaign storytelling connects the visual world back to the garments." },
    ], "/products/axis-trouser"),
    slug: "form27", number: "03", title: "FORM / 27", industry: "Fashion / E-Commerce", category: "E-Commerce",
    summary: "Fashion editorial meets digital commerce.",
    description: "A bold store concept where campaign imagery, garment detail, and practical shopping controls share a distinctive visual language.",
    services: ["Brand direction", "E-commerce UX", "Editorial design", "Frontend development"],
    liveUrl: "https://form27-fashion-k22d.vercel.app/", githubUrl: "https://github.com/yiz1118/form27-fashion",
    overview: "A sculptural fashion identity and shopping frontend: eight fictional products, campaign stories, garment galleries, and a persistent local bag.",
    brief: "Make the label recognizable. Keep finding and selecting a garment practical.",
    businessObjective: "Connect campaign discovery, size selection, and simulated checkout. No sales outcomes are claimed.",
    designDirection: [
      { title: "Typography & colour", description: "Archivo Black headlines, clear Archivo product text, and citron against chalk and graphite." },
      { title: "Grid & imagery", description: "Asymmetric campaign crops give way to a regular catalog grid." },
      { title: "Motion & composition", description: "Native gallery scrolling and restrained transitions keep selection predictable." },
    ],
    experience: [
      { title: "Collection discovery", description: "Shareable URL filters for category, size, colour, and price.", page: "/shop" },
      { title: "Garment detail", description: "Detailed garment views support fit, material, and required size selection.", page: "/products/axis-trouser" },
      { title: "Campaign & lookbook", description: "Editorial stories connect the collection to relevant products.", page: "/lookbook" },
      { title: "Persistent bag", description: "Variant quantities and removal persist through a simulated checkout.", page: "/cart" },
    ],
    responsive: "Mobile pairs focused navigation and filters with a scrollable garment gallery and compact purchase controls.",
    implementation: [
      { title: "Structured commerce data", description: "Typed products define integer-cent prices, variants, galleries, fit, and care." },
      { title: "URL & local state", description: "URL filters and validated localStorage entries preserve selection and bag state." },
      { title: "Accessible selection", description: "Keyboard gallery controls, native dialogs, and explicit size requirements support selection." },
    ],
    skills: ["Fashion art direction", "Editorial composition", "E-commerce UX", "Product discovery", "Variant selection", "Responsive shopping interfaces"],
    demoNote: "FORM / 27, its catalog, imagery, inventory, and measurements are fictional. Checkout processes no payment or order. The newsletter demonstration does not store addresses.",
  },
  {
    ...presentation("ember", "EMBER", [
      { page: "/menu", caption: "Open menu rows and written dietary labels make the food easy to explore." },
      { page: "/reservation", caption: "The reservation journey begins with the visit before personal details." },
      { page: "/gallery", caption: "A filterable gallery builds a sense of food, fire, and the dining room." },
    ], "/"),
    slug: "ember", number: "04", title: "EMBER", industry: "Restaurant / Hospitality", category: "Brand Website",
    summary: "A dining experience, before the visit.",
    description: "A warm editorial restaurant website connecting food, the dining room, a readable menu, and a considered reservation demonstration.",
    services: ["Brand direction", "Hospitality UX", "Website design", "Frontend development"],
    liveUrl: "https://ember-restaurant-psi.vercel.app/", githubUrl: "https://github.com/yiz1118/ember-restaurant",
    overview: "A fictional live-fire restaurant identity, editorial website, and three-step reservation demonstration. Atmosphere meets useful menu and visit information.",
    brief: "Make the dining experience memorable. Keep menu information and booking easy to find.",
    businessObjective: "Connect cuisine and atmosphere to a reservation journey. No booking or revenue results are claimed.",
    designDirection: [
      { title: "Typography & colour", description: "Cormorant Garamond and Manrope pair with cream, charcoal, and tobacco." },
      { title: "Imagery & composition", description: "Asymmetric food and room imagery balances open, readable menu rows." },
      { title: "Motion & pacing", description: "Quiet transitions pace the story and return visitors to booking." },
    ],
    experience: [
      { title: "Restaurant story", description: "Story and chef pages establish a culinary point of view.", page: "/story" },
      { title: "Readable menu", description: "Twenty-five sample dishes include SGD prices and written dietary labels.", page: "/menu" },
      { title: "Gallery exploration", description: "A focus-managed, keyboard-accessible food and room viewer.", page: "/gallery" },
      { title: "Reservation journey", description: "Date, time, and party size lead to validated guest details and review.", page: "/reservation" },
    ],
    responsive: "Editorial spreads become a vertical story. Menu rows, image crops, and a mobile booking action retain clear hierarchy.",
    implementation: [
      { title: "Content-led application", description: "Typed restaurant facts and menu records support route-specific Next.js pages." },
      { title: "Time-aware form logic", description: "Demonstration date bounds and arrival options use Asia/Singapore time." },
      { title: "Media & interaction", description: "Local WebP media, fonts, and small client components support controlled interactions." },
    ],
    skills: ["Hospitality storytelling", "Editorial layout", "Menu UX", "Reservation flow design", "Form validation", "Responsive frontend craft"],
    demoNote: "EMBER, its chef, menu, hours, and location are fictional. Reservation availability is illustrative; the flow sends and stores no booking or personal details.",
  },
  {
    ...presentation("atelier", "ATELIER NORTH", [
      { page: "/projects", caption: "A discipline-led index lets the work establish the studio's range." },
      { page: "/projects/coastal-house", caption: "The project story moves from context to space, material, and facts." },
      { page: "/studio", caption: "The studio narrative follows the same measured alignment as the work." },
    ], "/projects/coastal-house"),
    slug: "atelier", number: "05", title: "ATELIER NORTH", industry: "Architecture / Interiors", category: "Brand Website",
    summary: "Architecture, told through space and material.",
    description: "A quiet studio concept using large imagery, measured typography, and an editorial grid to turn architectural projects into considered stories.",
    services: ["Art direction", "Portfolio UX", "Website design", "Frontend development"],
    liveUrl: "https://atelier-architecture-six.vercel.app/", githubUrl: "https://github.com/yiz1118/atelier-architecture",
    overview: "An architectural website conceived as a monograph: five fictional projects, spatial imagery, material details, and a clear enquiry route.",
    brief: "Give imagery room. Let alignment and project narratives communicate the studio's judgment.",
    businessObjective: "Help visitors explore taste, range, and process. No real commissions or client outcomes are implied.",
    designDirection: [
      { title: "Typography & colour", description: "Manrope, IBM Plex Mono captions, warm paper, and thin rules frame the work." },
      { title: "Grid & imagery", description: "A twelve-column composition pairs context with offset material and spatial studies." },
      { title: "Motion & composition", description: "Restrained transitions and changing image scale support a measured reading pace." },
    ],
    experience: [
      { title: "Project index", description: "Discipline filters organize five fictional architectural studies.", page: "/projects" },
      { title: "Project storytelling", description: "Context, material, spatial views, and a marked diagrammatic plan.", page: "/projects/coastal-house" },
      { title: "Studio & services", description: "Supporting pages explain philosophy and engagement.", page: "/studio" },
      { title: "Journal & enquiry", description: "Editorial writing leads to a locally validated enquiry demonstration.", page: "/journal" },
    ],
    responsive: "Large imagery and ruled alignment remain. Spreads stack, captions sit outside images, and enquiries stay accessible.",
    implementation: [
      { title: "Typed project system", description: "Typed project and journal content supports pre-rendered routes and a designed 404." },
      { title: "Image delivery", description: "Fifteen local WebP concept images reserve space and load responsively." },
      { title: "Focused client components", description: "Small client components handle navigation, filters, transitions, and local form validation." },
    ],
    skills: ["Architecture art direction", "Editorial grid systems", "Project storytelling", "Image-led portfolio UX", "Responsive image delivery", "Restrained motion"],
    demoNote: "ATELIER NORTH, its locations, buildings, and imagery are fictional studies. The studio enquiry demonstration sends and stores nothing and does not represent a real commission.",
  },
  {
    ...presentation("sova", "SOVA", [
      { page: "/shop", caption: "Product purpose, size, and selection stay easy to understand." },
      { page: "/ingredients", caption: "Ingredient education provides context beside the shopping journey." },
      { page: "/routine", caption: "A short routine flow turns preferences into explained next steps." },
    ], "/shop"),
    slug: "sova", number: "06", title: "SOVA", industry: "Skincare / Wellness / E-Commerce", category: "E-Commerce",
    summary: "Daily care. Thoughtful digital commerce.",
    description: "A skincare concept combining product discovery, ingredient education, and explainable routine guidance with a soft, practical shopping interface.",
    services: ["Brand direction", "E-commerce UX", "Routine flow design", "Frontend development"],
    liveUrl: "https://sova-skincare.vercel.app/", githubUrl: "https://github.com/yiz1118/sova-skincare",
    overview: "A botanical skincare identity and commerce frontend: six fictional products, ingredient education, a local bag, and explainable routine guidance.",
    brief: "Make skincare approachable. Let product purpose, ingredients, and usage inform exploration.",
    businessObjective: "Connect discovery, product selection, and a simulated bag. No health or sales outcomes are claimed.",
    designDirection: [
      { title: "Typography & colour", description: "DM Sans and Instrument Serif pair with cream, mineral green, olive, and clay." },
      { title: "Imagery & composition", description: "Matte packaging and botanical still lifes establish the brand; information stays in HTML." },
      { title: "Grid & motion", description: "A regular product grid and small state changes make browsing calm." },
    ],
    experience: [
      { title: "Product discovery", description: "URL filters and sorting surface purpose, size, and price.", page: "/shop" },
      { title: "Product information", description: "Galleries connect usage, cosmetic information, quantity, and related products.", page: "/shop" },
      { title: "Ingredient education", description: "Dedicated ingredient pages provide botanical and cosmetic context.", page: "/ingredients" },
      { title: "Routine guidance", description: "Three nonmedical questions produce an explained, editable routine.", page: "/routine" },
    ],
    responsive: "Compact navigation, a two-column catalog, stacked details, and mobile purchase controls keep shopping practical.",
    implementation: [
      { title: "Typed product model", description: "Typed products connect sizes, ingredient information, images, and routine placement." },
      { title: "Explainable routine logic", description: "Deterministic cosmetic preferences map to explained routines without diagnosis or an AI API." },
      { title: "Local shopping state", description: "React and localStorage manage bag quantities; checkout creates no payments or orders." },
    ],
    skills: ["Beauty brand direction", "Product discovery UX", "Ingredient storytelling", "Routine flow design", "Responsive commerce", "Stateful frontend development"],
    demoNote: "SOVA's products, formulas, packaging, prices, and imagery are fictional. Routine guidance is nonmedical and does not diagnose conditions. No payments, subscriptions, or orders are processed.",
  },
];

export function visibleProjects() { return projects; }
export function findProject(slug: string) { return projects.find(project => project.slug === slug); }
export function nextProject(slug: string) {
  const index = projects.findIndex(project => project.slug === slug);
  return index < 0 ? undefined : projects[(index + 1) % projects.length];
}
