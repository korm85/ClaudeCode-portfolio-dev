"use client";

const CARDS = [
  {
    area: "Discovery",
    outcome: "Identified the next market requirement before competitors shipped it",
    body: "Tracked competing simulation products via OpenCLAW and prioritized thermo-mechanical capability early — scoped as a unified solver, not a bolt-on. Shipped before the market consolidated.",
  },
  {
    area: "Prototyping",
    outcome: "Got operator sign-off on alert UX before a single engineering ticket was written",
    body: "Prototyped the alert flow and tested with operators first. They flagged that conditions were too abstract — that feedback drove a full UX redesign before requirements reached engineering.",
  },
  {
    area: "User Feedback",
    outcome: "Synthesized hundreds of support tickets in one pass to redirect a roadmap",
    body: "Operators weren't struggling with detection accuracy — they were overwhelmed by alerts they couldn't act on. That pattern, surfaced in hours, redirected the v26.2 roadmap before sprint planning.",
  },
  {
    area: "Market Intelligence",
    outcome: "Had a verified competitive rebuttal ready before sales flagged the threat",
    body: "A custom agent monitors competitor updates weekly. When a competitor claimed predictive defect detection, a technical breakdown was ready before anyone in sales raised it.",
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
