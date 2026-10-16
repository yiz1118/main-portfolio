import { processSteps } from "@/data/services";
import { site } from "@/lib/site";

/** One stage per full-width row, each with what exists after it, and the same name credited. */
export function Process({ id = "process" }: { id?: string }) {
  return <section className="process container section" id={id} aria-labelledby={`${id}-heading`}>
    <div className="section-head">
      <h2 id={`${id}-heading`}>Five stages.<br />One name on each.</h2>
      <p className="note">No handoff between a designer, a developer and a tester. The person you brief is the person who ships it.</p>
    </div>
    <ol className="process-rows">{processSteps.map((step, index) => <li key={step.title} className="process-row" data-reveal="rule">
      <span className="process-index">{index + 1}</span>
      <h3>{step.title}</h3>
      <p className="process-what">{step.description}</p>
      <p className="process-after">{step.after}</p>
      <span className="process-credit" aria-hidden="true">{site.name}</span>
    </li>)}</ol>
  </section>;
}
