import { processSteps } from "@/data/services";
import { SectionLabel } from "./ui";
export function Process() {
  return <section className="process-section container"><div className="process-heading"><SectionLabel number="03">From idea to launch</SectionLabel><h2>A clear way forward.</h2></div><ol className="process-grid">{processSteps.map((step, index) => <li key={step.title} data-reveal="up" className={`reveal-delay-${index}`}><span className="process-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol></section>;
}
