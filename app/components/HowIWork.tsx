"use client";

const CARDS = [
  {
    area: "Discovery",
    outcome: "Found the market gap that shaped the Simulation roadmap before any customer asked for it",
    body: "I use OpenCLAW to track what PMs in adjacent industries are solving — not to copy, but to see what problems are becoming table stakes. A pattern in industrial simulation pointed to ITAR-compliant air-gapped deployment as the next barrier for regulated aerospace customers. That signal informed the on-premise architecture decision months before it appeared in any sales call.",
  },
  {
    area: "Knowledge Synthesis",
    outcome: "Made roadmap decisions grounded in years of product history, not the loudest recent voice",
    body: "Connecting current decisions to institutional knowledge — prior PRDs, past support escalations, earlier customer interviews — is the hardest part of PM at scale. I maintain a structured knowledge base and use AI to surface relevant precedents before writing specs. When a new alert design decision came up for AMVero, 18 months of prior engineering tradeoffs were in context in minutes, not weeks of archaeology.",
  },
  {
    area: "User Feedback",
    outcome: "Turned unstructured operator feedback into a prioritized roadmap shift — before a single sprint was planned",
    body: "Synthesizing hundreds of support tickets and field notes in one pass revealed that operators weren't struggling with detection accuracy — they were overwhelmed by alerts they couldn't interpret or act on. That pattern, surfaced in hours instead of months, redirected the entire Smart Alerting v26.2 roadmap. Without AI synthesis, the same signal would have arrived after engineering was already committed.",
  },
  {
    area: "Decision Quality",
    outcome: "Spec'd a deployment model that opened a market segment — by pressure-testing it before a single eng ticket",
    body: "Before writing the AMVero on-premise deployment spec, I used AI to model the failure modes: IT coordination, compliance gaps, operator self-sufficiency. The pressure-test caught a week-long IT handoff process that would have killed enterprise adoption. The rewrite — from IT-assisted to self-service — happened at the spec stage, not after the first customer deployment failed.",
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
            AI doesn&apos;t change what I do as a PM — it changes what&apos;s possible to know before a decision, and how much signal I can act on before engineering commits.
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
