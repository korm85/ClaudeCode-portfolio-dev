"use client";

import { useState } from "react";
import Image from "next/image";

const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Michael Korenevsky",
  jobTitle: "Senior Product Manager",
  worksFor: { "@type": "Organization", name: "Oqton" },
  url: "https://michael-korenevsky.vercel.app",
  sameAs: ["https://www.linkedin.com/in/michael-korenevsky/"],
  knowsAbout: ["AI Platform", "Enterprise Software", "B2B Product Management", "Regulated Industries"],
};

const CLIENTS = [
  { name: "Baker Hughes", industry: "Energy" },
  { name: "Thales", industry: "Defense" },
  { name: "Elos Medtech", industry: "Medical Devices" },
  { name: "Beehive", industry: "Manufacturing" },
];

const AMVERO = {
  eyebrow: "AI Platform",
  scope: "Senior PM · Oqton · 2025–Present · 3 engineers + 1 designer",
  kpis: [{ value: "98%", label: "Eng review time cut" }, { value: "5", label: "Clients / 5 mo" }, { value: "136h", label: "Saved / printer / yr" }],
  title: "AMVero: AI monitoring tool from pilot to five enterprise contracts",
  desc: "Designed the smart alerting system eliminating operator alert fatigue and authored the deployment playbook getting regulated manufacturers live without disrupting production.",
  decisions: [
    { label: "Alert Design", metric: "98%", text: "Condition-based multi-layer filtering over severity thresholds." },
    { label: "Deployment", metric: "5 clients", text: "On-premise as a product, not a cloud port, for air-gapped environments." },
    { label: "Onboarding", metric: "1 Day", text: "Self-service setup from week-long IT coordination process." },
    { label: "Pricing", metric: "18%", text: "Consumption-based credits over flat per-seat licensing." },
  ],
  quote: { text: "98% reduction in engineering review time per build, allowing our team to focus on more critical tasks.", author: "Amar Patel", role: "Digital Transformation Lead, Baker Hughes" },
};

const SIM = {
  eyebrow: "Predictive Simulation",
  scope: "PM, Simulation · Oqton · 2022–2025 · 3 modules · 4 engineers",
  kpis: [{ value: "~100%", label: "Distortion compensated" }, { value: "80%", label: "Fewer dim errors" }, { value: "<0.2mm", label: "Max deviation" }],
  title: "Simulation Suite: three modules leading to first-time-right manufacturing",
  desc: "Built out Thermal, Mechanical, and the combined Thermo-mechanical module — predicting heat distribution and physical distortion simultaneously, enabling ~100% dimensional distortion compensation.",
  decisions: [
    { label: "Module Arch", metric: "80%", text: "Unified thermo-mechanical pass eliminated inter-stage wait times." },
    { label: "Infrastructure", metric: "8h 15m", text: "Standard workstation solve time for air-gapped ITAR environments." },
    { label: "Beta Strategy", metric: "<0.2mm", text: "Structured Knauf beta before release generated credible customer story." },
    { label: "Market Timing", metric: "Led", text: "Prioritized thermo-mechanical before competitors consolidated the market." },
  ],
  quote: { text: "We achieved a lightweight component we would have never imagined creating before this project.", author: "Francesco Trevisan", role: "AM Expert, Wärtsilä" },
};

const AI_CARDS = [
  { area: "Discovery", outcome: "Identified thermo-mechanical simulation as next market req before competitors shipped", body: "Tracked competing AM simulation products building thermo-mechanical capability early. Prioritized as a unified solver, shipped before market consolidated." },
  { area: "Prototyping", outcome: "Operator sign-off on AMVero alert UX before any eng ticket", body: "Prototyped alert rule-creation flow before writing requirements. Operators flagged conditions too abstract — drove UX redesign at prototype stage." },
  { area: "User Feedback", outcome: "Operator feedback shifted Smart Alerting roadmap before sprint planning", body: "Reading hundreds of support tickets revealed operators overwhelmed by unactionable alerts. Redirected v26.2 roadmap before engineering committed." },
  { area: "Market Intel", outcome: "Competitive rebuttal ready before sales flagged the threat", body: "Custom agent tracks competitor updates weekly. Had a technical breakdown ready before sales raised a competitor claim." },
];

export default function VariationB() {
  const [dark, setDark] = useState(false);

  function toggleDark() {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }}
      />
      <main className="flex flex-col min-h-screen bg-canvas dark:bg-slate-950 text-text-primary dark:text-slate-100 overflow-x-hidden">

        {/* Nav */}
        <header className="sticky top-0 z-10 px-6 md:px-12 py-3 border-b border-border-dark dark:border-slate-700 bg-canvas/90 dark:bg-slate-950/90 backdrop-blur flex items-center justify-between">
          <a href="/" className="text-xs font-mono uppercase tracking-[0.2em] text-text-muted dark:text-slate-400 hover:text-text-primary dark:hover:text-white transition-colors">
            ← Main site
          </a>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted dark:text-slate-500">Variation B</span>
            <button
              onClick={toggleDark}
              className="text-xs font-mono uppercase tracking-[0.15em] border border-border-dark dark:border-slate-600 px-3 py-1.5 rounded bg-surface dark:bg-slate-800 text-text-muted dark:text-slate-400 hover:text-text-primary dark:hover:text-white transition-colors"
              aria-label="Toggle dark mode"
            >
              {dark ? "Light" : "Dark"}
            </button>
          </div>
        </header>

        {/* Hero — two column, tighter */}
        <section id="hero" className="px-6 md:px-12 py-12 border-b border-border-dark dark:border-slate-700 bg-canvas dark:bg-slate-950">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-start md:gap-12 gap-8">
              {/* Left: text */}
              <div className="flex-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary font-medium mb-3">
                  Senior PM · Oqton · AI Platform
                </p>
                <h1 className="text-3xl md:text-4xl font-bold font-display text-text-primary dark:text-white leading-tight tracking-tight mb-4">
                  I turn AI capability into products where reliability matters.
                </h1>
                <p className="text-sm text-text-secondary dark:text-slate-300 leading-relaxed mb-5 max-w-md">
                  I focus on the decisions between a capable system and one people actually rely on.
                </p>
                <div className="flex flex-wrap gap-3 mb-5">
                  <a href="#work" className="text-primary text-sm font-medium border border-primary/40 bg-surface dark:bg-slate-800 px-4 py-2 rounded hover:bg-primary-dim transition-all">View Work</a>
                  <a href="https://www.linkedin.com/in/michael-korenevsky/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium border border-border-dark dark:border-slate-600 bg-surface dark:bg-slate-800 text-text-secondary dark:text-slate-300 px-4 py-2 rounded hover:border-primary/40 transition-all">LinkedIn</a>
                  <a href="/resume.pdf" download className="text-sm font-medium border border-border-dark dark:border-slate-600 bg-surface dark:bg-slate-800 text-text-secondary dark:text-slate-300 px-4 py-2 rounded hover:border-primary/40 transition-all">Resume ↓</a>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Enterprise · Regulated Industries", "B2B", "Israel · Open to Remote"].map((tag) => (
                    <span key={tag} className="text-[10px] font-mono uppercase tracking-[0.15em] text-text-muted dark:text-slate-400 border border-border-dark dark:border-slate-600 rounded px-2 py-1 bg-surface dark:bg-slate-800">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Right: photo + chips */}
              <div className="flex flex-col items-center md:items-end gap-5 md:w-64 shrink-0 order-first md:order-last">
                <div className="rounded-full p-[3px] bg-primary-dim border border-primary/20">
                  <Image src="/profile.jpeg" alt="Michael Korenevsky" width={180} height={180} priority className="h-40 w-40 md:h-44 md:w-44 rounded-full object-cover object-[center_15%]" />
                </div>
                <div className="w-full">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted dark:text-slate-500 mb-2 text-right">Shipped to</p>
                  <div className="flex flex-wrap justify-end gap-1.5">
                    {CLIENTS.map(({ name, industry }) => (
                      <div key={name} className="flex items-center gap-1.5 border border-border-dark dark:border-slate-600 rounded px-2.5 py-1.5 bg-surface dark:bg-slate-800">
                        <span className="text-xs font-semibold text-text-primary dark:text-white font-display">{name}</span>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-primary/60 border-l border-border-dark dark:border-slate-600 pl-1.5">{industry}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Work — side by side */}
        <section id="work" className="px-6 md:px-12 py-12 border-t border-border-dark dark:border-slate-700 bg-surface dark:bg-slate-900">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <span className="text-[10px] tracking-[0.4em] uppercase text-text-muted dark:text-slate-500 font-mono">Selected Work</span>
              <h2 className="text-2xl md:text-3xl font-bold font-display text-text-primary dark:text-white mt-2">Both products, side by side.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[AMVERO, SIM].map((product, pi) => (
                <article key={pi} className="bg-canvas dark:bg-slate-950 border border-border-dark dark:border-slate-700 rounded p-6 flex flex-col gap-4">
                  <div>
                    <span className="text-[10px] tracking-[0.4em] uppercase text-primary font-mono">{product.eyebrow}</span>
                    <p className="text-[10px] text-text-muted dark:text-slate-500 font-mono mt-1">{product.scope}</p>
                  </div>

                  {/* KPI strip */}
                  <div className="grid grid-cols-3 gap-px bg-border-dark dark:bg-slate-700 border border-border-dark dark:border-slate-700 rounded overflow-hidden">
                    {product.kpis.map((kpi, i) => (
                      <div key={i} className="bg-canvas dark:bg-slate-900 px-3 py-2 flex flex-col gap-0.5">
                        <span className="text-xl font-bold font-display text-primary leading-none">{kpi.value}</span>
                        <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-text-muted dark:text-slate-500 leading-snug">{kpi.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="w-full aspect-video bg-slate-200 dark:bg-slate-800 rounded flex items-center justify-center text-slate-400 text-xs">Product UI</div>

                  <div>
                    <h3 className="text-base font-semibold font-display text-text-primary dark:text-white mb-2 leading-snug">{product.title}</h3>
                    <p className="text-xs text-text-secondary dark:text-slate-300 leading-relaxed line-clamp-3">{product.desc}</p>
                  </div>

                  {/* Customer quote — always visible, accessible */}
                  <blockquote className="border-l-2 border-primary/30 pl-3 py-1" aria-label="Customer quote">
                    <p className="text-xs italic text-text-secondary dark:text-slate-400 leading-relaxed">
                      &ldquo;{product.quote.text}&rdquo;
                    </p>
                    <footer className="mt-1 text-[9px] font-mono uppercase tracking-wider text-text-muted dark:text-slate-500">
                      — {product.quote.author} · {product.quote.role}
                    </footer>
                  </blockquote>

                  {/* Decision tiles 2x2 */}
                  <div>
                    <div className="text-[9px] font-mono tracking-[0.15em] uppercase text-text-muted dark:text-slate-500 mb-2">Key decisions</div>
                    <div className="grid grid-cols-2 gap-2">
                      {product.decisions.map((d, i) => (
                        <div key={i} className="border border-border-dark dark:border-slate-700 rounded p-3 bg-surface dark:bg-slate-900 flex flex-col gap-1">
                          <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-primary/70">{d.label}</span>
                          <span className="text-lg font-bold font-display text-primary leading-none">{d.metric}</span>
                          <p className="text-[10px] text-text-secondary dark:text-slate-400 leading-snug">{d.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* AI Practice — single row */}
        <section id="ai-practice" className="px-6 md:px-12 py-12 border-t border-border-dark dark:border-slate-700 bg-canvas dark:bg-slate-950">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6">
              <span className="text-[10px] tracking-[0.4em] uppercase text-text-muted dark:text-slate-500 font-mono">AI Practice</span>
              <h2 className="text-2xl font-bold font-display text-text-primary dark:text-white mt-2">Where AI changes what&apos;s possible</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {AI_CARDS.map((card, i) => (
                <div key={i} className="bg-surface dark:bg-slate-900 border border-border-dark dark:border-slate-700 rounded p-5 flex flex-col gap-2 hover:border-primary/30 transition-colors">
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-primary/70">{card.area}</span>
                  <h3 className="text-xs font-semibold font-display text-text-primary dark:text-white leading-snug">{card.outcome}</h3>
                  <p className="text-[11px] text-text-secondary dark:text-slate-400 leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Career horizontal timeline + Contact strip */}
        <section id="career-contact" className="px-6 md:px-12 py-12 border-t border-border-dark dark:border-slate-700 bg-surface dark:bg-slate-900">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6">
              <span className="text-[10px] tracking-[0.4em] uppercase text-text-muted dark:text-slate-500 font-mono">Career</span>
            </div>
            {/* Horizontal timeline */}
            <div className="flex flex-col md:flex-row gap-0 mb-8 border border-border-dark dark:border-slate-700 rounded overflow-hidden">
              {[
                { period: "2025–Present", role: "Senior PM, AI Platform", company: "Oqton" },
                { period: "2022–2025", role: "PM, Simulation", company: "Oqton" },
                { period: "2018–2022", role: "Product Manager", company: "Earlier roles" },
                { period: "2008–2012", role: "B.Sc. Mech Eng", company: "Ben-Gurion University" },
              ].map((item, i, arr) => (
                <div key={i} className={`flex-1 p-4 bg-canvas dark:bg-slate-950 ${i < arr.length - 1 ? "border-b md:border-b-0 md:border-r border-border-dark dark:border-slate-700" : ""}`}>
                  <p className="text-[9px] font-mono uppercase tracking-[0.15em] text-text-muted dark:text-slate-500 mb-1">{item.period}</p>
                  <p className="text-sm font-semibold text-text-primary dark:text-white leading-snug">{item.role}</p>
                  <p className="text-xs text-text-muted dark:text-slate-500 mt-0.5">{item.company}</p>
                </div>
              ))}
            </div>

            {/* Contact strip */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 border border-border-dark dark:border-slate-700 rounded bg-canvas dark:bg-slate-950">
              <div>
                <p className="text-sm font-semibold text-text-primary dark:text-white">Open to senior PM roles</p>
                <p className="text-xs text-text-muted dark:text-slate-400">AI · Enterprise · Regulated industries · Israel, open to remote</p>
              </div>
              <div className="flex gap-3">
                <a href="https://www.linkedin.com/in/michael-korenevsky/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary border border-primary/40 rounded px-4 py-2 hover:bg-primary-dim transition-all">LinkedIn →</a>
                <a href="/resume.pdf" download className="text-sm font-medium text-text-secondary dark:text-slate-300 border border-border-dark dark:border-slate-600 rounded px-4 py-2 hover:border-primary/40 transition-all">Resume ↓</a>
              </div>
            </div>
          </div>
        </section>

        <footer className="px-6 md:px-12 py-5 border-t border-border-dark dark:border-slate-700 bg-canvas dark:bg-slate-950">
          <div className="max-w-5xl mx-auto flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-text-muted dark:text-slate-500 font-mono">
            <span>© 2026 Michael Korenevsky</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Available</span>
          </div>
        </footer>
      </main>
    </>
  );
}
