import { processSteps } from "@/data/services";
import { SectionLabel } from "./ui";
export function Process() {
  return <section className="process-section container"><div className="section-heading"><div><SectionLabel number="03">A clear way forward</SectionLabel><h2>From the first conversation<br />to the next version.</h2></div><p>You’ll know what we’re building, why we’re building it, and what comes next.</p></div><ol className="process-grid">{processSteps.map((step, index) => <li key={step.title}><span className="process-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol></section>;
}
