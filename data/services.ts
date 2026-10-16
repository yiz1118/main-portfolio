export const services = [
  { number: "01", title: "Business websites", short: "A clear, credible home for your business.", description: "For small businesses that need a fast, professional website that explains their offer and makes the next step easy.", deliverables: ["Responsive design & development", "SEO foundations & accessible content", "Contact, CMS & booking integrations"], outcome: "A website your customers can understand and use." },
  { number: "02", title: "Web applications", short: "Software built around the way you work.", description: "For teams that need a customer portal, dashboard, admin system, or internal tool with workflows tailored to their business.", deliverables: ["Authentication & permissions", "Database-backed features & dashboards", "API integrations & admin workflows"], outcome: "A working application with clear structure and maintainable code." },
  { number: "03", title: "MVP development", short: "From an idea to something you can test.", description: "For founders who want to define the essential features, build a usable first version, and learn from real feedback.", deliverables: ["Scope, user flows & technical planning", "Prototype & milestone-based development", "Testing, deployment & launch verification"], outcome: "A focused first product with an explicit path to the next version." },
  { number: "04", title: "AI integrations", short: "Useful AI, connected to your product.", description: "For products that need document processing, search, assistants, or workflow automation with clear limits and review points.", deliverables: ["Provider & API integration", "Document and knowledge workflows", "Error handling & human review steps"], outcome: "A bounded integration that supports a specific user task." },
  { number: "05", title: "Maintenance & improvements", short: "Make your existing product work better.", description: "For teams with an existing website or application that needs fixes, new features, or a better user experience.", deliverables: ["Bug investigation & fixes", "Performance & UI improvements", "Feature development & technical handover"], outcome: "Practical improvements based on the current product and its users." },
];
export const processSteps = [
  { title: "Discover", description: "Goals, users, scope.", after: "Ends with a written brief and an agreed first scope." },
  { title: "Design", description: "Structure, flows, visuals.", after: "Ends with page structure, key flows, and a visual direction you have approved." },
  { title: "Build", description: "Working milestones.", after: "Ends with a working product on a preview link, delivered in milestones." },
  { title: "Test", description: "Devices, features, details.", after: "Ends with checks across phones, tablets and desktop, forms, keyboard use and loading." },
  { title: "Launch", description: "Deploy, verify, hand over.", after: "Ends with a live, verified release, the source code, and a clear handover." },
];

export const capabilities = [
  { title: "Websites", detail: "A clear home for your brand.", href: "/services#service-01" },
  { title: "E-Commerce", detail: "Discovery, selection, checkout.", href: "/services#commerce" },
  { title: "Web applications", detail: "Tools built around your workflow.", href: "/services#service-02" },
  { title: "SaaS / MVPs", detail: "A first product you can test.", href: "/services#service-03" },
  { title: "Dashboards", detail: "Make complex information usable.", href: "/services#service-02" },
  { title: "AI integrations", detail: "Connect AI to a specific task.", href: "/services#service-04" },
];
