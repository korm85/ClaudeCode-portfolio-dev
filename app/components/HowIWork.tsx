"use client";

const CARDS = [
  {
    area: "Discovery",
    outcome: "Identified thermo-mechanical simulation as the next market requirement before competitors shipped it",
    body: "Using OpenCLAW and market signals, I tracked competing AM simulation products starting to build thermo-mechanical capability. I prioritized it early, scoped it as a unified solver rather than a bolt-on, and shipped before the market consolidated. We led rather than followed.",
  },
  {
    area: "Prototyping",
    outcome: "Got operator sign-off on the AMVero alert UX before a single engineering ticket was written",
    body: "I prototyped the AMVero alert rule-creation flow and put it in front of operators before writing any requirements. Operators flagged that the conditions were too abstract to connect to real machine behavior. That feedback drove a UX redesign at prototype stage. Requirements only went to engineering after operators had validated the interaction.",
  },
  {
    area: "User Feedback",
    outcome: "Operator feedback shifted the entire Smart Alerting roadmap before sprint planning started",
    body: "Reading across hundreds of support tickets in one pass showed that operators were not struggling with detection accuracy. They were overwhelmed by alerts they could not act on. That pattern redirected the v26.2 roadmap. The same signal from customer calls would have arrived after engineering was already committed.",
  },
  {
    area: "Market Intelligence",
    outcome: "Had a verified competitive rebuttal ready before sales flagged the threat",
    body: "A custom agent tracks competitor product updates and pricing changes weekly. When a competitor claimed predictive defect detection, I had a technical breakdown of why the claim was unverified ready before anyone in sales raised it. That is the only position that is useful to the business.",
  },
];

export default function HowIWork() {
  return (
    <section id="how-i-work" className="px-6 md:px-12 py-16 border-t border-border-dark bg-surface">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-text-muted font-mono">AI Practice</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mt-2 mb-6">
            Where AI changes what&apos;s possible
          </h2>
          <p className="text-base text-text-secondary max-w-2xl leading-relaxed">
            AI does not change what I do as a PM. It changes what I can know before a decision, and how early I can act on a signal before engineering commits.
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
