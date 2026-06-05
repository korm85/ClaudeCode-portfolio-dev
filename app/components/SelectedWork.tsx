"use client";

import { useScrollReveal } from "../hooks/useScrollReveal";

interface Doc {
  name: string;
  url: string;
  suffix?: string;
  category?: string;
}

interface Quote {
  text: string;
  author: string;
  role: string;
}

interface PrdQuote {
  text: string;
  linkLabel: string;
  linkUrl: string;
}

type Decision = string | {
  text: string;
  docLabel?: string;
  docUrl?: string;
  label?: string;
  metric?: { value: string; context: string; tag?: "outcome" | "impact" };
};

interface KpiStat {
  value: string;
  label: string;
}

interface WorkCardProps {
  eyebrow: string;
  roleTag: string;
  title: string;
  description: string;
  kpis?: KpiStat[];
  decisions?: Decision[];
  image: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  customerLine: string;
  ctaLabel: string;
  ctaSubtitle: string;
  onCta: () => void;
  docs: Doc[];
  quote?: Quote;
  prdQuote?: PrdQuote;
}

function WorkCard({
  eyebrow, roleTag, title, description, kpis, decisions, image, imageAlt,
  imagePosition = "left", customerLine, ctaLabel, onCta, docs, quote, prdQuote,
}: WorkCardProps) {
  const ref = useScrollReveal();

  const imageCol = (
    <div className="relative overflow-hidden rounded border border-border-dark group md:self-stretch">
      <img
        src={image}
        alt={imageAlt}
        className="w-full h-full object-cover min-h-[220px] md:min-h-0 transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <div className="absolute bottom-3 left-3">
        <p className="text-xs text-text-secondary bg-surface/80 backdrop-blur-sm px-2 py-1 rounded border border-border-dark">
          {roleTag}
        </p>
      </div>
    </div>
  );

  const textCol = (
    <div className="flex flex-col justify-center gap-5">
      <span className="text-[12px] tracking-[0.4em] uppercase text-primary font-medium font-mono">
        {eyebrow}
      </span>

      <h3 className="text-xl md:text-2xl font-semibold font-display text-text-primary leading-snug">
        {title}
      </h3>

      <p className="text-sm text-text-secondary leading-relaxed">{description}</p>

      {kpis && kpis.length > 0 && (
        <div className="grid grid-cols-3 gap-px bg-border-dark border border-border-dark rounded overflow-hidden">
          {kpis.map((kpi, i) => (
            <div key={i} className="bg-canvas px-4 py-3 flex flex-col gap-1">
              <span className="text-2xl md:text-3xl font-bold font-display text-primary leading-none tracking-tight">
                {kpi.value}
              </span>
              <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-text-muted leading-snug">
                {kpi.label}
              </span>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-text-muted">
        <span className="text-text-secondary">Customers:</span> {customerLine}
      </p>

      {prdQuote && (
        <div className="border-l-2 border-primary/30 bg-primary-dim rounded-r px-3 py-2">
          <p className="text-xs italic text-text-secondary leading-relaxed">
            &ldquo;{prdQuote.text}&rdquo;
          </p>
          <a
            href={prdQuote.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[9px] font-mono uppercase tracking-widest text-primary/60 hover:text-primary transition-colors mt-1 inline-block"
          >
            {prdQuote.linkLabel} ↗
          </a>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={onCta}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs border border-primary/40 rounded text-primary hover:bg-primary-dim hover:border-primary/70 transition-all uppercase tracking-[0.08em] font-mono font-medium"
        >
          {ctaLabel}
        </button>
        {docs.map((doc, i) => (
          <a
            key={i}
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-text-muted hover:text-primary transition-colors underline underline-offset-2"
          >
            {doc.name}
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <div ref={ref} className="relative bg-surface border border-border-dark rounded overflow-hidden">
      {/* 60/40 image + text — image alternates sides on desktop */}
      <div className={`grid md:grid-cols-[3fr_2fr] gap-0 ${imagePosition === "right" ? "md:[&>*:first-child]:order-2" : ""}`}>
        <div className="md:max-h-[480px]">{imageCol}</div>
        <div className="p-8 md:p-10">{textCol}</div>
      </div>

      {/* Detail section: decisions + quote */}
      <div className="border-t border-border-dark p-8 md:p-10 space-y-10 bg-canvas">

        {/* Decision tiles */}
        {decisions && decisions.length > 0 && (
          <div>
            <div className="text-[9px] font-mono tracking-[0.15em] uppercase text-text-muted mb-4">Key decisions</div>
            <div className="grid sm:grid-cols-2 gap-3">
              {decisions.map((d, i) => {
                const text = typeof d === "string" ? d : d.text;
                const docLabel = typeof d !== "string" ? d.docLabel : undefined;
                const docUrl = typeof d !== "string" ? d.docUrl : undefined;
                const label = typeof d !== "string" ? d.label : undefined;
                const metric = typeof d !== "string" ? d.metric : undefined;
                return (
                  <div key={i} className="border border-border-dark rounded-sm p-5 bg-surface flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      {label && (
                        <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-primary/70">
                          {label}
                        </span>
                      )}
                      {docLabel && docUrl && (
                        <a
                          href={docUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[9px] font-mono tracking-wider text-primary/60 hover:text-primary transition-colors border border-primary/20 hover:border-primary/50 rounded px-1.5 py-0.5 whitespace-nowrap"
                        >
                          {docLabel} ↗
                        </a>
                      )}
                    </div>

                    {metric && (
                      <div>
                        {metric.tag && (
                          <span className={`text-[8px] font-mono uppercase tracking-[0.2em] px-1.5 py-0.5 rounded-sm mb-2 inline-block ${
                            metric.tag === "outcome"
                              ? "bg-primary/10 text-primary/70"
                              : "bg-text-muted/10 text-text-muted"
                          }`}>
                            {metric.tag === "outcome" ? "Decision outcome" : "Product impact"}
                          </span>
                        )}
                        <div>
                          <span className="text-4xl md:text-5xl font-bold font-display text-primary leading-none tracking-tight">
                            {metric.value}
                          </span>
                        </div>
                        <p className="text-[11px] font-mono text-text-muted mt-1 uppercase tracking-[0.12em]">
                          {metric.context}
                        </p>
                      </div>
                    )}

                    <p className="text-xs text-text-secondary leading-relaxed border-t border-border-dark pt-3">
                      {text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Customer quote */}
        {quote && (
          <blockquote className="border-l-2 border-primary/40 pl-5">
            <p className="text-sm text-text-secondary leading-relaxed italic">
              &ldquo;{quote.text}&rdquo;
            </p>
            <footer className="mt-3 flex items-center gap-2">
              <span className="w-4 h-px bg-primary/40" />
              <span className="text-[10px] font-mono tracking-wider text-text-muted uppercase">
                {quote.author} &middot; {quote.role}
              </span>
            </footer>
          </blockquote>
        )}
      </div>
    </div>
  );
}

interface SelectedWorkProps {
  onOpenAmvero: () => void;
  onOpenSimulation: () => void;
}

export default function SelectedWork({ onOpenAmvero, onOpenSimulation }: SelectedWorkProps) {
  return (
    <section id="work" className="px-6 md:px-12 pt-16 pb-24 border-t border-border-dark bg-canvas">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <span className="text-[10px] tracking-[0.4em] uppercase text-text-muted font-mono">Selected Work</span>
          <p className="text-sm text-text-secondary mt-1">Two products owned end-to-end. Documented decisions. Verified outcomes.</p>
        </div>

        <div className="space-y-12">
          <WorkCard
            imagePosition="left"
            eyebrow="AI Platform"
            roleTag="Senior PM, AI Platform · Oqton · 2025–Present"
            title="Took an AI monitoring tool from pilot to five enterprise contracts in five months"
            description="I took AMVero from first enterprise pilot to five paying clients in five months, writing the GTM narrative, designing the smart alerting system that eliminated operator alert fatigue, and authoring the deployment playbook that got regulated manufacturers live without disrupting production. Led a cross-functional team of 3 engineers and 1 designer across 5 enterprise deployments."
            kpis={[
              { value: "98%", label: "Engineering review time cut" },
              { value: "5", label: "Enterprise clients · 5 mo" },
              { value: "136h", label: "Saved / printer / yr" },
            ]}
            decisions={[
              {
                label: "Alert Design",
                text: "Chose condition-based multi-layer filtering over severity thresholds — turned AMVero from a noise source into a trusted monitoring tool operators actually relied on.",
                docLabel: "Alerts PRD",
                docUrl: "/artifacts/amvero-smart-alerting-prd.html",
                metric: { value: "98%", context: "reduction in operator review time", tag: "outcome" },
              },
              {
                label: "Deployment Model",
                text: "Defined on-premise as a product, not a cloud port, for aerospace and defense clients who required air-gapped environments.",
                metric: { value: "5", context: "enterprise clients in 5 months", tag: "impact" },
              },
              {
                label: "Onboarding",
                text: "Wrote the deployment playbook to turn a week-long IT coordination process (company IT, shopfloor operator, Oqton rep) into a self-service setup requiring minimal guidance. Regulated manufacturers went live without disrupting production.",
                docLabel: "Deployment Playbook",
                docUrl: "/artifacts/amvero-enterprise-deployment-playbook.pdf",
                metric: { value: "1 Day", context: "time-to-live (was 1 week)", tag: "outcome" },
              },
              {
                label: "Pricing Model",
                text: "Moved AMVero from flat per-seat to consumption-based credits. Small shops with low print volume pay only when printing; large enterprises avoid high upfront costs to get started. The 18% scrap reduction is the ROI that justified both models.",
                docLabel: "ROI Optimizer",
                docUrl: "/artifacts/roi-optimizer.html",
                metric: { value: "18%", context: "scrap cost reduction — the ROI that made credits viable", tag: "impact" },
              },
            ]}
            image="/amvero-product.png"
            imageAlt="AMVero AI monitoring dashboard"
            customerLine="Baker Hughes · Thales · Elos Medtech · 3D Systems · Beehive"
            prdQuote={{
              text: "Operators stop trusting the system and miss the alerts that actually matter. Solved with condition-based filtering across multiple layers.",
              linkLabel: "Smart Alerting PRD",
              linkUrl: "/artifacts/amvero-smart-alerting-prd.html",
            }}
            ctaLabel="Try interactive prototype"
            ctaSubtitle="Figma Make · ~2 min walkthrough of the alerts flow"
            onCta={onOpenAmvero}
            docs={[
              { category: "Go-to-Market", name: "Go-to-Market Narrative", suffix: "· by Michael", url: "/artifacts/amvero-go-to-market-narrative.pdf" },
              { category: "Go-to-Market", name: "Launch Announcement", url: "/artifacts/amvero-launch-announcement.html" },
              { category: "Product & Pricing", name: "Alerts PRD", url: "/artifacts/amvero-smart-alerting-prd.html" },
              { category: "Product & Pricing", name: "ROI Optimizer", url: "/artifacts/roi-optimizer.html" },
              { category: "Customer Success", name: "Enterprise Deployment Playbook", url: "/artifacts/amvero-enterprise-deployment-playbook.pdf" },
              { category: "Customer Success", name: "End-to-End Traceability Record", url: "/artifacts/amvero-end-to-end-traceability-record.pdf" },
            ]}
            quote={{
              text: "We've seen a 98% reduction in engineering review time per build, allowing our team to focus on more critical tasks. This, combined with an 18% reduction in scrap costs, has delivered a powerful return on investment and significantly improved our operational efficiency.",
              author: "Amar Patel",
              role: "Digital Transformation Lead, Baker Hughes",
            }}
          />

          <WorkCard
            imagePosition="right"
            eyebrow="Predictive Simulation"
            roleTag="Product Manager, Simulation · Oqton · 2022–2025"
            title="Shipped three simulation modules, culminating in the thermo-mechanical solver that made first-time-right manufacturing achievable"
            description="I built out the Simulation Suite over three years, shipping a Thermal module, a Mechanical module, and then the Thermo-mechanical module that combined both into a single pass. The Thermo-mechanical module is the flagship: it simultaneously predicts heat distribution and physical distortion, which is what lets clients compensate for close to 100% of dimensional distortion without running trial parts or waiting between stages. Owned the full product lifecycle across 3 modules, working with a core team of 4 simulation engineers."
            kpis={[
              { value: "~100%", label: "Distortion compensated (Knauf)" },
              { value: "80%", label: "Fewer dimensional errors" },
              { value: "<0.2mm", label: "Max deviation (Knauf)" },
            ]}
            decisions={[
              {
                label: "Module Architecture",
                text: "Shipped Thermal and Mechanical as separate modules, then unified them into the Thermo-mechanical module — both solvers in a single coupled pass. That step eliminated inter-stage wait times and made first-time-right serial production viable.",
                metric: { value: "80%", context: "fewer dimensional deviations vs. uncompensated", tag: "outcome" },
              },
              {
                label: "Infrastructure Scope",
                text: "Scoped validation to standard engineering workstations — not because it was easy, but because aerospace and defense clients operate in air-gapped, ITAR-compliant environments where cloud compute is not an option. Engineering made local execution feasible; I made the product decision to target it as the delivery platform, which turned that capability into an addressable market.",
                metric: { value: "8h 15m", context: "full solve on local hardware — air-gapped, ITAR-compliant", tag: "outcome" },
              },
              {
                label: "Beta Strategy",
                text: "Ran a structured beta with Knauf to validate against real production components before release, reducing launch risk and generating a credible customer story at launch.",
                metric: { value: "<0.2mm", context: "max dimensional deviation — Knauf validation", tag: "outcome" },
              },
            ]}
            image="/simulation-knauf-fit.png"
            imageAlt="Predictive simulation structural fit validation"
            customerLine="Knauf and tooling manufacturers across Europe"
            ctaLabel="Explore case study"
            ctaSubtitle="Overview, validation data, and customer stories"
            onCta={onOpenSimulation}
            docs={[
              { category: "Validation", name: "Thermal Whitepaper", url: "/artifacts/simulation-thermal-whitepaper.html" },
              { category: "Customers", name: "Customer Story: Tooling", url: "/artifacts/simulation-customer-story-tooling.html" },
              { category: "Customers", name: "Customer Story: Large Parts", url: "/artifacts/simulation-customer-story-large-parts.html" },
            ]}
            quote={{
              text: "We have achieved a lightweight component we would have never imagined creating before this project. This application creates new sparks for more AM applications in the marine industry.",
              author: "Francesco Trevisan",
              role: "AM Expert, Wärtsilä",
            }}
          />
        </div>
      </div>
    </section>
  );
}
