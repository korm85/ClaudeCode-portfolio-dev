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
  customerLine, ctaLabel, onCta, docs, quote, prdQuote,
}: WorkCardProps) {
  const ref = useScrollReveal();

  return (
    <div ref={ref} className="relative bg-surface border border-border-dark rounded p-8 md:p-10">
      {/* Eyebrow */}
      <div className="mb-4">
        <span className="text-[10px] tracking-[0.4em] uppercase text-primary font-medium font-mono">
          {eyebrow}
        </span>
      </div>

      {/* KPI strip — 3 headline numbers before the image */}
      {kpis && kpis.length > 0 && (
        <div className="grid grid-cols-3 gap-px bg-border-dark border border-border-dark rounded overflow-hidden mb-8">
          {kpis.map((kpi, i) => (
            <div key={i} className="bg-canvas px-5 py-4 flex flex-col gap-1">
              <span className="text-3xl md:text-4xl font-bold font-display text-primary leading-none tracking-tight">
                {kpi.value}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-text-muted leading-snug">
                {kpi.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* 16:9 image */}
      <div className="relative overflow-hidden rounded border border-border-dark mb-8 group">
        <img
          src={image}
          alt={imageAlt}
          className="w-full aspect-[16/9] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute bottom-3 left-3">
          <p className="text-xs text-text-secondary bg-surface/80 backdrop-blur-sm px-2 py-1 rounded border border-border-dark">
            {roleTag}
          </p>
        </div>
      </div>

      {/* Top row: title+description (left) | docs (right) */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-xl md:text-2xl font-semibold font-display text-text-primary leading-snug mb-4">{title}</h3>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">{description}</p>
          <p className="text-xs text-text-muted mb-4">
            <span className="text-text-secondary">Customers:</span> {customerLine}
          </p>
          {prdQuote && (
            <div className="border-l-2 border-primary/30 bg-primary-dim rounded-r px-3 py-2 mb-4">
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
          <button
            onClick={onCta}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs border border-primary/40 rounded text-primary hover:bg-primary-dim hover:border-primary/70 transition-all uppercase tracking-[0.08em] font-mono font-medium"
          >
            {ctaLabel}
          </button>
        </div>

        <div>
          {/* Docs grouped by PM lifecycle category */}
          {(() => {
            const groups = docs.reduce<Array<{ label: string; items: Doc[] }>>(
              (acc, doc) => {
                const cat = doc.category ?? "";
                const existing = acc.find((g) => g.label === cat);
                if (existing) existing.items.push(doc);
                else acc.push({ label: cat, items: [doc] });
                return acc;
              },
              []
            );
            const categorised = groups.some((g) => g.label !== "");
            return (
              <div className={categorised ? "space-y-4" : ""}>
                {groups.map((group, gi) => (
                  <div key={gi}>
                    {categorised && group.label && (
                      <div className="text-[9px] font-mono tracking-[0.15em] uppercase text-text-muted mb-1.5">
                        {group.label}
                      </div>
                    )}
                    <div className={`grid gap-2 ${group.items.length >= 3 ? "grid-cols-3" : "grid-cols-2"}`}>
                      {group.items.map((doc, i) => (
                        <a
                          key={i}
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start justify-between gap-1 text-xs text-text-secondary hover:text-primary transition-colors border border-border-dark hover:border-primary/30 rounded px-3 py-2 bg-canvas hover:bg-primary-dim"
                        >
                          <span className="leading-snug">
                            {doc.name}
                            {doc.suffix && (
                              <span className="block opacity-50 text-[10px] mt-0.5">{doc.suffix}</span>
                            )}
                          </span>
                          <svg className="w-3 h-3 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </div>

      {/* Decision tiles — stat-burst layout: metric dominates, text is secondary */}
      {decisions && decisions.length > 0 && (
        <div className="border-t border-border-dark pt-8">
          <div className="text-[9px] font-mono tracking-[0.15em] uppercase text-text-muted mb-4">Key decisions</div>
          <div className="grid sm:grid-cols-2 gap-3">
            {decisions.map((d, i) => {
              const text = typeof d === "string" ? d : d.text;
              const docLabel = typeof d !== "string" ? d.docLabel : undefined;
              const docUrl = typeof d !== "string" ? d.docUrl : undefined;
              const label = typeof d !== "string" ? d.label : undefined;
              const metric = typeof d !== "string" ? d.metric : undefined;
              return (
                <div key={i} className="border border-border-dark rounded-sm p-5 bg-canvas flex flex-col gap-3">
                  {/* Label row */}
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

                  {/* Metric burst — dominant visual anchor */}
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

                  {/* Decision text — supporting detail below the number */}
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
        <div className="mt-10 border-t border-border-dark pt-8">
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
        </div>
      )}
    </div>
  );
}

interface SelectedWorkProps {
  onOpenAmvero: () => void;
  onOpenSimulation: () => void;
}

export default function SelectedWork({ onOpenAmvero, onOpenSimulation }: SelectedWorkProps) {
  return (
    <section id="work" className="px-6 md:px-12 py-24 border-t border-border-dark bg-canvas">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-text-muted font-mono">Selected Work</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mt-2">
            Two products I owned. Documented decisions. Verified outcomes.
          </h2>
        </div>

        <div className="space-y-12">
          <WorkCard
            eyebrow="AI Platform"
            roleTag="Senior PM, AI Platform · Oqton · 2025–Present"
            title="Took an AI monitoring tool from pilot to five enterprise contracts in five months"
            description="I took AMVero from first enterprise pilot to five paying clients in five months, writing the GTM narrative, designing the smart alerting system that eliminated operator alert fatigue, and authoring the deployment playbook that got regulated manufacturers live without disrupting production."
            kpis={[
              { value: "98%", label: "Alert review time cut" },
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
                text: "Wrote the deployment playbook to compress enterprise onboarding so regulated manufacturers could go live without disrupting production.",
                docLabel: "Deployment Playbook",
                docUrl: "/artifacts/amvero-enterprise-deployment-playbook.pdf",
                metric: { value: "136h", context: "saved per printer per year", tag: "impact" },
              },
              {
                label: "Pricing Model",
                text: "Moved AMVero from flat per-seat to consumption-based credits, aligning costs with production volume. Built the ROI simulator to find the optimal rate.",
                docLabel: "ROI Optimizer",
                docUrl: "/artifacts/roi-optimizer.html",
                metric: { value: "18%", context: "scrap cost reduction for clients", tag: "impact" },
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
            eyebrow="Predictive Simulation"
            roleTag="Product Manager, Simulation · Oqton · 2022–2025"
            title="Shipped three simulation modules, culminating in the thermo-mechanical solver that made first-time-right manufacturing achievable"
            description="I built out the Simulation Suite over three years, shipping a Thermal module, a Mechanical module, and then the Thermo-mechanical module that combined both into a single pass. The Thermo-mechanical module is the flagship: it simultaneously predicts heat distribution and physical distortion, which is what lets clients hit 99%+ dimensional accuracy without running trial parts or waiting between stages."
            kpis={[
              { value: "99%+", label: "Dimensional accuracy" },
              { value: "80%", label: "Fewer dimensional errors" },
              { value: "<150µm", label: "Max deviation measured" },
            ]}
            decisions={[
              {
                label: "Module Architecture",
                text: "Shipped Thermal and Mechanical as separate modules, then unified them into the Thermo-mechanical module — both solvers in a single coupled pass. That step eliminated inter-stage wait times and made first-time-right serial production viable.",
                metric: { value: "80%", context: "fewer dimensional deviations vs. uncompensated", tag: "outcome" },
              },
              {
                label: "Infrastructure Scope",
                text: "Validated on standard engineering workstations, not servers — a deliberate scope decision that expanded the addressable market to any manufacturer running 3DXpert, not just those with dedicated compute infrastructure.",
                metric: { value: "8h 15m", context: "to solve 6.7M elements on a standard workstation", tag: "outcome" },
              },
              {
                label: "Beta Strategy",
                text: "Ran a structured beta with Knauf to validate against real production components before release, reducing launch risk and generating a credible customer story at launch.",
                metric: { value: "<150µm", context: "max measured dimensional deviation", tag: "impact" },
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
