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
    summary: "Performance engineering, given a cinematic digital presence.",
    description: "An automotive concept bringing vehicle presentation, engineering detail, and a focused enquiry journey into one precise visual system.",
    services: ["Brand direction", "Website design", "Frontend development", "Responsive implementation"],
    liveUrl: "https://vanta-automotive.vercel.app/", githubUrl: "https://github.com/yiz1118/vanta-automotive",
    overview: "VANTA Motorworks imagines an independent performance studio with an engineering-led identity. I designed and developed a standalone website where visitors move from a cinematic first impression to vehicle studies, technical context, and an enquiry. The concept explores how an automotive business could communicate both craft and capability.",
    brief: "Create a presence that feels deliberate, technical, and cinematic. Vehicle imagery should lead, while build information and navigation remain clear enough for someone evaluating the studio's work.",
    businessObjective: "Make builds easy to explore, explain the studio's approach, and give interested visitors a clear route to an enquiry. These are design objectives; no lead or business results are claimed.",
    designDirection: [
      { title: "Typography & colour", description: "Barlow Condensed gives headlines the language of performance graphics. Instrument Sans handles reading and IBM Plex Mono distinguishes technical facts. Dark surfaces and restrained accents let the vehicles carry the visual weight." },
      { title: "Composition & imagery", description: "Wide vehicle views establish atmosphere. Close details and aligned specification blocks create a second, more analytical reading layer." },
      { title: "Motion & rhythm", description: "Controlled transitions support inspection and navigation. Large visual moments alternate with compact engineering information, with reduced-motion support." },
    ],
    experience: [
      { title: "Vehicle presentation", description: "The builds index introduces three fictional vehicle studies and leads into individual build pages.", page: "/builds" },
      { title: "Technical storytelling", description: "Engineering, services, and studio pages explain the thinking behind the work.", page: "/engineering" },
      { title: "Image exploration", description: "A gallery provides a visual route through the vehicle collection.", page: "/gallery" },
      { title: "Focused enquiry", description: "A local form demonstration organizes interest in a build or service into a project brief.", page: "/enquiry" },
    ],
    responsive: "Broad desktop imagery and aligned facts become a readable vertical sequence on mobile. Compact navigation, intentional vehicle crops, and touch-sized actions retain the same hierarchy. The mobile capture shows the deployed homepage at 390 pixels wide.",
    implementation: [
      { title: "Typed content & routes", description: "Next.js App Router and TypeScript organize the vehicle studies and supporting pages in a standalone application." },
      { title: "Responsive media", description: "Local vehicle assets and responsive image delivery keep photography central while specifications remain readable." },
      { title: "Interaction decisions", description: "Small React components handle navigation, build inspection, and the enquiry demonstration. The concept needs no production booking backend." },
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
    summary: "A clearer workspace for team knowledge and everyday workflows.",
    description: "An AI-focused SaaS concept combining product marketing with an interactive workspace for documents, sample answers, and workflow building.",
    services: ["Product strategy", "SaaS website design", "Dashboard UX", "Frontend development"],
    liveUrl: "https://nexa-saas-alpha.vercel.app/", githubUrl: "https://github.com/yiz1118/nexa-saas",
    overview: "NEXA explores how a team could bring documents, questions, and repeatable work into one product. I designed the marketing story and a connected SaaS-style workspace, then implemented the frontend with shared, persistent browser state. AI-oriented tasks are demonstrated with deterministic sample behavior.",
    brief: "Communicate a complex product simply and make the promise tangible in the interface. The website needed a clear narrative; the workspace needed information hierarchy, understandable states, and connected task flows.",
    businessObjective: "Help visitors understand the product, explore an interactive frontend, and evaluate how a knowledge workspace could fit their team. Pricing and integrations illustrate product packaging; they are not active commercial services.",
    designDirection: [
      { title: "Typography & colour", description: "Manrope connects marketing and application screens. Quiet neutrals, a controlled product accent, and clear contrast separate actions from supporting information." },
      { title: "Grid & hierarchy", description: "Marketing introduces the product in stages. Persistent application navigation, scoped panels, structured tables, and restrained charts support a denser information layer." },
      { title: "Product imagery & motion", description: "The interface is the visual proof. Product previews and state changes explain a task instead of relying on decorative imagery or motion." },
    ],
    experience: [
      { title: "Product marketing", description: "Features, use cases, integrations, and pricing explain the concept and lead into the workspace demo.", page: "/product" },
      { title: "Knowledge library", description: "Document previews, text search, sorting, and filters use typed local records and browser persistence.", page: "/app/knowledge" },
      { title: "Workflow builder", description: "Visitors edit an ordered workflow, validate it, and follow a simulated run with explicit sample results.", page: "/app/workflows" },
      { title: "Team & analytics", description: "Related application screens share context and show how membership and reporting could be organized.", page: "/app/analytics" },
    ],
    responsive: "Marketing spreads become a direct reading sequence. Dashboard navigation compacts, dense content stays within its own region, and task controls remain reachable. The mobile capture shows the live workspace rather than a device mockup.",
    implementation: [
      { title: "Connected architecture", description: "Next.js marketing routes sit beside React application screens. Typed models and a shared provider keep workspace state consistent across tasks." },
      { title: "Persistence & recovery", description: "Versioned localStorage and deterministic helpers support document organization, workspace edits, and recovery from invalid local state." },
      { title: "Transparent AI demonstration", description: "Example answers cite sample sources and workflow runs expose their simulated state. There is no live AI API, production authentication, or enforced team security." },
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
    summary: "An editorial fashion identity with a complete path to the bag.",
    description: "A bold store concept where campaign imagery, garment detail, and practical shopping controls share a distinctive visual language.",
    services: ["Brand direction", "E-commerce UX", "Editorial design", "Frontend development"],
    liveUrl: "https://form27-fashion-k22d.vercel.app/", githubUrl: "https://github.com/yiz1118/form27-fashion",
    overview: "FORM / 27 is a fictional independent fashion label built around sculptural utility and an OFF / AXIS collection. I developed the brand direction and a standalone shopping frontend with eight typed products, editorial campaign pages, detailed garment galleries, and a locally persistent bag.",
    brief: "Give an independent label a recognizable voice without losing the usefulness of a store. The campaign should create interest; catalog and product pages should help visitors understand and select a garment.",
    businessObjective: "Connect campaign discovery to product evaluation, size selection, and a simulated checkout summary. The concept demonstrates that journey without claiming manufactured merchandise, sales, or conversion improvements.",
    designDirection: [
      { title: "Typography & colour", description: "Archivo Black creates confident oversized headlines. Archivo handles product reading and Barlow Condensed marks editorial indices. Chalk, graphite, and near-black are punctuated by citron." },
      { title: "Grid & imagery", description: "Concrete settings, strong shadows, asymmetric crops, and generous garment imagery make proportion visible. A regular catalog grid supports comparison after the campaign." },
      { title: "Motion & composition", description: "Native gallery scrolling and restrained transitions keep focus on clothing. Editorial pacing stays strong while selection controls remain predictable." },
    ],
    experience: [
      { title: "Collection discovery", description: "Category, size, colour, and price filters use URL state so the collection view can be shared.", page: "/shop" },
      { title: "Garment detail", description: "Front, back, construction, fabric, and model views support fit and material information. A size is required before adding to the bag.", page: "/products/axis-trouser" },
      { title: "Campaign & lookbook", description: "Editorial pages give the collection a setting and lead toward relevant products.", page: "/lookbook" },
      { title: "Persistent bag", description: "Stable variant identifiers support quantity changes, removal, and a local demonstration checkout summary.", page: "/cart" },
    ],
    responsive: "Mobile uses focused navigation and filter dialogs, a horizontally scrollable garment gallery, and a compact purchase bar. Image scale, text hierarchy, and touch targets adapt together so campaign and shopping remain coherent.",
    implementation: [
      { title: "Structured commerce data", description: "TypeScript records define integer-cent prices, galleries, variants, availability, fit, and care. Pure catalog helpers separate selection decisions from the interface." },
      { title: "URL & local state", description: "Filters live in query parameters. Bag entries refer to stable variants and are validated when restored from localStorage." },
      { title: "Accessible selection", description: "Native dialogs, visible unavailable states, keyboard gallery controls, and a required size make the purchase flow explicit." },
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
    summary: "A live-fire dining concept that starts with atmosphere.",
    description: "A warm editorial restaurant website connecting food, the dining room, a readable menu, and a considered reservation demonstration.",
    services: ["Brand direction", "Hospitality UX", "Website design", "Frontend development"],
    liveUrl: "https://ember-restaurant-psi.vercel.app/", githubUrl: "https://github.com/yiz1118/ember-restaurant",
    overview: "EMBER imagines a contemporary European live-fire restaurant in Singapore. I designed its brand, editorial website, and three-step reservation demonstration. The experience connects atmosphere with practical information: what the restaurant serves, what a visit feels like, and how a guest could plan an evening.",
    brief: "Make a dining experience memorable before a visitor reaches the restaurant. Balance cinematic imagery with useful menu and visit information, and give booking a clear place in the story.",
    businessObjective: "Help prospective guests understand the cuisine and setting, explore the menu, and move toward a table reservation. This is a designed path for a fictional restaurant; no booking volume or revenue is claimed.",
    designDirection: [
      { title: "Typography & colour", description: "Cormorant Garamond gives the dining narrative an expressive serif voice, with Manrope for details. Cream, charcoal, and tobacco tones support the warmth of the hearth." },
      { title: "Imagery & composition", description: "Fire is the first visual anchor. Asymmetric spreads move between room, chef, and dishes. Open menu rows keep practical information visible." },
      { title: "Motion & pacing", description: "Quiet transitions and alternating light and dark sections pace the visit. Booking reappears when the narrative has provided enough context." },
    ],
    experience: [
      { title: "Restaurant story", description: "Distinct story and chef pages give the concept a culinary point of view.", page: "/story" },
      { title: "Readable menu", description: "Twenty-five sample dishes across five categories use concise descriptions, SGD prices, and written dietary labels.", page: "/menu" },
      { title: "Gallery exploration", description: "Food and room imagery opens in a keyboard-accessible, focus-managed viewer.", page: "/gallery" },
      { title: "Reservation journey", description: "Date, time, and party size precede guest details and review, with in-place validation and preserved answers.", page: "/reservation" },
    ],
    responsive: "Desktop spreads become a deliberate vertical sequence. Image crops and serif scale adjust, menu rows stay readable, and a mobile booking action provides a direct next step. The mobile screenshot comes from the deployed homepage.",
    implementation: [
      { title: "Content-led application", description: "Typed local restaurant facts, menu items, and service rules support route-specific Next.js pages." },
      { title: "Time-aware form logic", description: "Demonstration date bounds and arrival choices use Asia/Singapore time rather than the visitor's local clock." },
      { title: "Media & interaction", description: "Local WebP images and fonts, focused client components, and reduced-motion support keep the visual experience controlled." },
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
    summary: "An architectural portfolio shaped by space, material, and restraint.",
    description: "A quiet studio concept using large imagery, measured typography, and an editorial grid to turn architectural projects into considered stories.",
    services: ["Art direction", "Portfolio UX", "Website design", "Frontend development"],
    liveUrl: "https://atelier-architecture-six.vercel.app/", githubUrl: "https://github.com/yiz1118/atelier-architecture",
    overview: "ATELIER NORTH imagines an architecture and interiors studio with a material-led approach. I designed and implemented a standalone website that behaves like an architectural monograph: five project studies, contextual imagery, spatial details, material information, and a clear enquiry route.",
    brief: "Let a studio's judgment be understood through its work. Give imagery room, maintain precise alignment, and make project narratives feel considered without making navigation difficult.",
    businessObjective: "Help a potential architecture or interiors client understand taste, range, and process before sharing an enquiry. The studio and buildings are concept studies; no commissioned work or client outcome is implied.",
    designDirection: [
      { title: "Typography & colour", description: "Manrope keeps headings and reading restrained, with IBM Plex Mono for captions and facts. Warm paper and thin rules give imagery a quiet frame." },
      { title: "Grid & imagery", description: "A twelve-column desktop composition aligns contextual views with smaller offset spatial and material studies. Tablet and mobile simplify the grid but preserve its alignment logic." },
      { title: "Motion & composition", description: "Restrained loading transitions support the photographs. Alternating image scale and generous whitespace slow the reading without decorative effects." },
    ],
    experience: [
      { title: "Project index", description: "Discipline filters organize five fictional studies while keeping imagery prominent.", page: "/projects" },
      { title: "Project storytelling", description: "Detail pages pair concept text with contextual, spatial, and material views, facts, and a clearly marked diagrammatic plan.", page: "/projects/coastal-house" },
      { title: "Studio & services", description: "Supporting pages explain the studio philosophy and the shape of an engagement.", page: "/studio" },
      { title: "Journal & enquiry", description: "Editorial writing adds another route through the work, followed by a locally validated enquiry demonstration.", page: "/journal" },
    ],
    responsive: "Mobile retains large images, direct headlines, and ruled alignment. Spreads stack into a readable story, captions remain outside images, and the same enquiry path stays available. The capture shows a deployed project detail page.",
    implementation: [
      { title: "Typed project system", description: "Local TypeScript content powers project and journal routes. Known details are pre-rendered and unknown slugs use a designed 404." },
      { title: "Image delivery", description: "Fifteen consistent concept images are stored locally as WebP. Responsive variants reserve space and load below-the-fold imagery lazily." },
      { title: "Focused client components", description: "Small components handle navigation, filters, image transitions, and local enquiry validation. Semantic structure and visible focus support keyboard access." },
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
    summary: "Thoughtful daily care, translated into calm digital commerce.",
    description: "A skincare concept combining product discovery, ingredient education, and explainable routine guidance with a soft, practical shopping interface.",
    services: ["Brand direction", "E-commerce UX", "Routine flow design", "Frontend development"],
    liveUrl: "https://sova-skincare.vercel.app/", githubUrl: "https://github.com/yiz1118/sova-skincare",
    overview: "SOVA imagines a small skincare brand built around daily care and botanical science. I developed its identity and a standalone commerce frontend with six fictional products, ingredient information, a local bag, and a deterministic routine builder. The concept explores how a softer brand can still provide clear product decisions.",
    brief: "Make skincare approachable and understandable. Imagery should establish the brand, while product purpose, ingredients, usage, and routine order help visitors decide what to explore.",
    businessObjective: "Create a coherent path from brand discovery to product selection and a simulated bag, supported by ingredient education and simple routine guidance. No health, sales, or conversion outcomes are claimed.",
    designDirection: [
      { title: "Typography & colour", description: "DM Sans makes product information clear; Instrument Serif adds softness to selected headlines. Cream, mineral green, deep olive, and restrained clay define the botanical direction." },
      { title: "Imagery & composition", description: "Matte packaging, limestone, oat stems, and serum textures form quiet still lifes. Product names and information stay in accessible HTML rather than being embedded in imagery." },
      { title: "Grid & motion", description: "Generous spacing and a regular product grid make the store calm to browse. Small state changes give feedback without competing with imagery." },
    ],
    experience: [
      { title: "Product discovery", description: "Category filters and sorting use URL state, with concise purpose, size, and price on the cards.", page: "/shop" },
      { title: "Product information", description: "Product pages combine galleries, usage, cosmetic benefits, ingredient links, quantity selection, and related items.", page: "/shop" },
      { title: "Ingredient education", description: "A dedicated section makes the concept's botanical and cosmetic information accessible.", page: "/ingredients" },
      { title: "Routine guidance", description: "Three nonmedical questions lead to a deterministic routine with explained steps, editable answers, and an add-to-bag action.", page: "/routine" },
    ],
    responsive: "Compact navigation, scrollable category controls, a two-column catalog, stacked product details, and a mobile purchase action keep the store useful on smaller screens. The capture shows the deployed shop at a mobile viewport.",
    implementation: [
      { title: "Typed product model", description: "Next.js and TypeScript organize product purpose, sizes, images, ingredient links, and routine placement as structured local data." },
      { title: "Explainable routine logic", description: "A deterministic mapping uses cosmetic preferences to suggest a short sequence, explain order, and support edits without an AI or diagnostic service." },
      { title: "Local shopping state", description: "React and localStorage support bag quantities and removal. The demonstration checkout never processes payments or creates orders." },
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
