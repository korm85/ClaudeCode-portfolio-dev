"use client";

const CARDS = [
  {
    area: "Customer Insight",
    outcome: "Repositioned the Smart Alerting roadmap before a single sprint was planned",
    body: "Reading across hundreds of support tickets at once surfaced the real problem: operators weren't struggling with detection — they were drowning in alerts they couldn't act on. That finding changed the entire direction of the roadmap. Without AI synthesis, the same pattern would have emerged from customer calls months later, after engineering was already committed.",
  },
  {
    area: "Spec Quality",
    outcome: "Caught a threshold conflict in the alerting spec before engineering touched it",
    body: "I pulled support data and Jira history into a single view before writing the AMVero alerting spec. A condition-based filtering conflict surfaced that would have shipped an alert operators couldn't act on. Caught at spec stage. That's the difference between a quiet fix in design review and a noisy rollback after release.",
  },
  {
    area: "Validation Speed",
    outcome: "Validated the alert UX in days — operators flagged the flow before engineering started",
    body: "I built the AMVero alert rule-creation flow as an interactive prototype before a single engineering ticket was written. Operators flagged the rule-creation UX in testing. We shipped a cleaner design in release 1 instead of patching it in release 3. The prototype cost two days. The fix it prevented would have cost two sprints.",
  },
  {
    area: "Market Intelligence",
    outcome: "Delivered a verified competitive rebuttal before the sales team asked for one",
    body: "A custom agent monitors competitor product updates and pricing moves weekly. When a competitor claimed predictive defect detection, I had a verified technical breakdown ready before anyone in sales had flagged it. Proactive, not reactive — which is the only position that's actually useful to the business.",
  },
];

export default function HowIWork() {
  return (
    <section id="how-i-work" className="px-6 md:px-12 py-24 border-t border-border-dark bg-surface">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-text-muted font-mono">AI Practice</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mt-2 mb-6">
            Where AI changes what&apos;s possible
          </h2>
          <p className="text-base text-text-secondary max-w-2xl leading-relaxed">
            AI doesn&apos;t make me a different PM. It makes me a faster one — catching signals earlier, validating before engineering commits, and arriving at decisions that would otherwise take months of customer calls.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {CARDS.map((card, i) => (
            <div
              key={i}
              className="bg-canvas border border-border-dark rounded p-8 hover:border-primary/30 hover:bg-primary-dim transition-all duration-300 flex flex-col gap-3"
            >
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-primary/70">
                {card.area}
              </span>
              <h3 className="text-sm font-semibold font-display text-text-primary leading-snug">
                {card.outcome}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
