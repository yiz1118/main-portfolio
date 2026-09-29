export type ProjectType = "Client Project" | "Personal Project" | "Concept Project" | "University Project" | "Experimental Project";
export interface Project {
  slug: string; title: string; originalTitle?: string; subtitle: string; description: string;
  category: "Web Application" | "AI Product" | "Mobile Application" | "SaaS" | "Business Platform" | "Business Website";
  projectType?: ProjectType; year?: number; role: string; technologies: string[];
  publicationStatus: "draft" | "published"; developmentStatus: string; featuredOrder: number;
  coverImage: string; accent: "sage" | "blue" | "peach";
  screenshots: { src: string; alt: string; caption: string; kind: "illustration" | "screenshot" }[];
  overview: string; problem: string; goal: string; solution: string;
  features: { title: string; description: string }[]; userFlow: string[];
  architecture: { layer: string; detail: string }[];
  developmentProcess: string[];
  challenges: { problem: string; resolution: string }[];
  results: string[]; limitations: string[]; demoUrl?: string; githubUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "rongcheng-city-explorer", title: "Rongcheng City Explorer", originalTitle: "榕城寻印",
    subtitle: "Connecting places, exploration, and digital collections.",
    description: "An interactive WeChat Mini Program that connects scenic chapters, QR checkpoints, and a digital collection experience.",
    category: "Mobile Application", publicationStatus: "draft", developmentStatus: "Application in development", featuredOrder: 1,
    role: "[NEEDS MY CONTENT] Confirm personal contribution and project type.",
    technologies: ["TypeScript", "WeChat Mini Program", "WXSS", "Cloud Functions"],
    coverImage: "/projects/explorer.svg", accent: "sage",
    screenshots: [{ src: "/projects/explorer.svg", alt: "Illustrated city exploration interface with a chapter map and collectible card", caption: "Presentation illustration. Replace with an actual mobile screenshot and verified flow.", kind: "illustration" }],
    overview: "Rongcheng City Explorer brings a location-based cultural experience into a native WeChat Mini Program. The inspected source contains scenic chapters, checkpoint scanning, collection pages, and asset-validation tooling. This draft describes source-supported architecture; production and device behavior need separate verification.",
    problem: "A cultural exploration experience needs a clear connection between physical checkpoints and digital progress. Visitors should understand where to go, what to do, and what they have collected.",
    goal: "Organize the exploration around scenic chapters and explicit checkpoint progression, while keeping mobile navigation and collection access understandable.",
    solution: "The application separates scenic navigation, QR verification, checkpoint detail, and collections. Checkpoint-specific scanning routes connect a physical visit to the intended detail page.",
    features: [
      { title: "Scenic chapters", description: "Chapter and checkpoint routes organize the city experience into understandable locations." },
      { title: "QR checkpoint entry", description: "Source and handoff describe precise payload matching before opening the corresponding checkpoint." },
      { title: "Digital collection", description: "Collection and album pages provide a place for exploration rewards and assets." },
      { title: "Asset validation", description: "Dedicated scripts inspect launch media, models, reward videos, and release prerequisites." },
    ],
    userFlow: ["Choose a scenic chapter", "Select a checkpoint", "Scan the matching QR code", "Open the checkpoint experience", "Review the collection"],
    architecture: [{ layer: "Interface", detail: "Native WXML / WXSS pages" }, { layer: "Application", detail: "TypeScript page logic and chapter configuration" }, { layer: "Integration", detail: "WeChat platform APIs and cloud-function source" }, { layer: "Assets & QA", detail: "Media processing, validation, and build scripts" }],
    developmentProcess: ["Discovery: confirm the visitor and checkpoint experience.", "Planning: map chapters, progression, and supported device capabilities.", "Design: organize maps, details, and collections around mobile use.", "Development: native pages and typed application logic exist in source.", "Testing: dedicated automated and asset-validation scripts exist; rerun for current evidence.", "Deployment: [NEEDS MY CONTENT] Provide verified device and release evidence."],
    challenges: [{ problem: "Incorrect QR input could open the wrong checkpoint.", resolution: "The handoff describes exact scenic/checkpoint matching and rejection of unrelated payloads." }, { problem: "Remote 3D media needs more than a successful download to prove it renders.", resolution: "Separate asset checks from device rendering acceptance; document the remaining device checks." }],
    results: ["Source contains multiple scenic chapters and a unified checkpoint scanning entry.", "The project demonstrates typed mobile application organization and dedicated asset tooling.", "[NEEDS MY CONTENT] Add current device screenshots, personal role, and release outcome."],
    limitations: ["Not presented as a paid client engagement.", "Current device, public release, and remote media behavior have not been verified for this portfolio."],
  },
  {
    slug: "chuangxu-planning-agent", title: "Chuangxu Planning Agent", originalTitle: "创序 Agent",
    subtitle: "Turning project documents into a reviewable planning workflow.",
    description: "An AI-assisted planning workflow with document intake, explicit approval steps, versioned plans, and generated file outputs.",
    category: "AI Product", publicationStatus: "draft", developmentStatus: "Demonstrated workflow · remediation ongoing", featuredOrder: 2,
    role: "[NEEDS MY CONTENT] Confirm personal contribution and project type.", technologies: ["Python", "JavaScript", "HiAgent", "Document Processing"],
    coverImage: "/projects/agent.svg", accent: "blue",
    screenshots: [{ src: "/projects/agent.svg", alt: "Illustrated document planning workspace with intake, review, and approval stages", caption: "Presentation illustration. It does not depict a verified product screenshot.", kind: "illustration" }],
    overview: "Chuangxu is a planning workflow built around structured input, reviewable drafts, and explicit approvals. Its local handoff records a candidate demonstration using synthetic documents, including plan revisions and downloadable files. Generic rescheduling and renderer remediation remain open.",
    problem: "Project documents contain requirements and team information that need to be reconciled before a useful plan can be reviewed. Multi-turn revisions can also lose context unless state is preserved explicitly.",
    goal: "Turn document inputs into a traceable draft, require approval before formal output, and keep revisions tied to the same project context.",
    solution: "A staged workflow moves from intake to draft, confirmation, approval, and output. State envelopes and renderer receipts preserve the distinction between an approved plan and its generated delivery artifacts.",
    features: [{ title: "Document intake", description: "The recorded demonstration used synthetic DOCX and XLSX inputs." }, { title: "Approval stages", description: "Explicit confirmation and approval phrases gate formal plan generation." }, { title: "Versioned revision", description: "The handoff records a demonstrated V1/V2 revision sequence." }, { title: "File output", description: "The recorded V1 demonstration downloaded files and checked their document container structure." }],
    userFlow: ["Provide project documents", "Review the draft", "Confirm project details", "Approve the plan", "Review generated outputs"],
    architecture: [{ layer: "Interface", detail: "HiAgent conversation and workflow orchestration" }, { layer: "Runtime", detail: "Python planning runtime and JavaScript bridges" }, { layer: "State", detail: "Versioned project context and approval gates" }, { layer: "Delivery", detail: "Document renderer and output receipts" }],
    developmentProcess: ["Discovery: define document inputs and decision authority.", "Planning: specify draft, approval, and revision states.", "Design: make the next required action explicit in replies.", "Development: runtime and bridge code organize workflow behavior.", "Testing: the handoff records local suites and a candidate demonstration; no new runtime claim is made here.", "Deployment: candidate verification is distinct from channel release."],
    challenges: [{ problem: "Stale context can replace a newer draft during a conversation.", resolution: "The handoff records a state-precedence correction that favors the current complete project envelope." }, { problem: "An approved plan can exist before its renderer returns a usable file.", resolution: "Keep approval state and rendering receipts distinct; renderer bridge remediation remains documented." }],
    results: ["A documented candidate sequence demonstrated intake, approvals, revisions, and V1 file output.", "The architecture illustrates accountable AI workflow integration with explicit state and approval boundaries.", "[NEEDS MY CONTENT] Add current workflow captures and confirm personal contribution."],
    limitations: ["Generic rescheduling and renderer remediation remain incomplete.", "The portfolio does not claim a current public release or general production readiness."],
  },
  {
    slug: "labellens", title: "LabelLens", originalTitle: "食见",
    subtitle: "Making food-label information easier to understand.",
    description: "An in-progress multilingual Flutter frontend exploring clearer food-label information, user preferences, and nutrition context.",
    category: "Mobile Application", publicationStatus: "draft", developmentStatus: "Frontend in progress", featuredOrder: 3,
    role: "[NEEDS MY CONTENT] Confirm personal contribution and project type.", technologies: ["Flutter", "Dart", "Riverpod", "GoRouter"],
    coverImage: "/projects/labellens.svg", accent: "peach",
    screenshots: [{ src: "/projects/labellens.svg", alt: "Illustrated food-label app with onboarding preferences and nutrition information", caption: "Product-direction illustration. Scanning and analysis screens are not implemented evidence.", kind: "illustration" }],
    overview: "LabelLens is an in-progress application frontend. The inspected status document identifies implemented language selection, safety acknowledgement, and goal setup, alongside domain models and sample repositories. The home and scanning journeys remain unfinished.",
    problem: "Food labels can be difficult to interpret in the context of personal preferences and nutrition goals. A useful interface should explain available information and its limits.",
    goal: "Explore an understandable, multilingual food-label experience with careful handling of incomplete information and user-selected preferences.",
    solution: "The frontend foundation separates pages, controllers, repository interfaces, and in-memory sample data. Onboarding establishes language and preference context before later product flows are implemented.",
    features: [{ title: "Language selection", description: "The current frontend includes a language-selection route and localization dictionaries." }, { title: "Safety acknowledgement", description: "A dedicated onboarding route communicates product boundaries." }, { title: "Goal setup", description: "A goal-entry interface uses a shared repository scope." }, { title: "Sample domain layer", description: "Typed models and fake repositories support future UI development without claiming live services." }],
    userFlow: ["Select a language", "Read the product boundaries", "Set optional goals", "Reach the temporary home route"],
    architecture: [{ layer: "Interface", detail: "Flutter pages and shared design tokens" }, { layer: "Application", detail: "Controllers, Riverpod scope, GoRouter" }, { layer: "Data", detail: "Repository interfaces and in-memory sample implementations" }, { layer: "Backend", detail: "Not implemented; no live OCR, API, database, or authentication" }],
    developmentProcess: ["Discovery: define a bounded nutrition-information experience.", "Planning: separate information uncertainty from technical failure.", "Design: establish an evidence-focused mobile visual system.", "Development: onboarding and frontend foundations are implemented.", "Testing: the status document records unit, widget, architecture, and build checks; rendered device acceptance remains pending.", "Deployment: no public release is claimed."],
    challenges: [{ problem: "An interface can imply certainty when product information is incomplete.", resolution: "The domain distinguishes insufficient information from technical errors and avoids absolute safety claims." }, { problem: "Separate repository instances can cause user preferences to drift across screens.", resolution: "The documented restructuring centralizes dependency composition in a shared application scope." }],
    results: ["Implemented onboarding routes provide a foundation for the future application.", "The repository architecture supports isolated frontend development with sample data.", "[NEEDS MY CONTENT] Add actual implemented-screen captures and confirm the project's classification."],
    limitations: ["Live scanning, OCR, analysis UI, authentication, backend, and the complete home flow are not implemented.", "Historical build verification does not establish current device or production readiness."],
  },
];

export function visibleProjects(includeDrafts: boolean) { return projects.filter(p => includeDrafts || p.publicationStatus === "published"); }
export function findProject(slug: string, includeDrafts: boolean) { return visibleProjects(includeDrafts).find(p => p.slug === slug); }
