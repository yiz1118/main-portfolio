import { ButtonLink, SectionLabel } from "@/components/ui";
export default function NotFound() { return <section className="not-found container"><SectionLabel>404 / Page not found</SectionLabel><h1>This page isn’t here.</h1><p>The link may have changed. Explore the project collection to find the work you’re looking for.</p><ButtonLink href="/work">Back to work</ButtonLink></section>; }
