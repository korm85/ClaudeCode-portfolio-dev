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

const AMVERO_DECISIONS = [
  { label: "Alert Design", metric: "98%", context: "Engineering review time cut", tag: "outcome" as const, text: "Condition-based multi-layer filtering over severity thresholds — turned AMVero from a noise source into a trusted tool operators actually relied on." },
  { label: "Deployment Model", metric: "5", context: "Enterprise clients in 5 months", tag: "impact" as const, text: "Defined on-premise as a product, not a cloud port, for aerospace and defense clients requiring air-gapped environments." },
  { label: "Onboarding", metric: "1 Day", context: "Time-to-live (was 1 week)", tag: "outcome" as const, text: "Wrote the deployment playbook to turn a week-long IT coordination process into a self-service setup requiring minimal guidance." },
  { label: "Pricing Model", metric: "18%", context: "Scrap cost reduction — ROI that made credits viable", tag: "impact" as const, text: "Moved from flat per-seat to consumption-based credits. Small shops pay only when printing; large enterprises avoid high upfront costs." },
];

const SIM_DECISIONS = [
  { label: "Module Architecture", metric: "80%", context: "Fewer dimensional deviations vs. uncompensated", tag: "outcome" as const, text: "Shipped Thermal and Mechanical as separate modules, then unified into a single coupled thermo-mechanical pass. Eliminated inter-stage wait times." },
  { label: "Infrastructure Scope", metric: "8h 15m", context: "Full solve on local hardware — air-gapped, ITAR-compliant", tag: "outcome" as const, text: "Scoped validation to standard engineering workstations for aerospace and defense clients in air-gapped, ITAR-compliant environments." },
  { label: "Beta Strategy", metric: "<0.2mm", context: "Max dimensional deviation — Knauf validation", tag: "outcome" as const, text: "Ran a structured beta with Knauf to validate against real production components before release, generating a credible customer story at launch." },
];

const AI_CARDS = [
  { area: "Discovery", outcome: "Identified thermo-mechanical simulation as next market req before competitors shipped", body: "Tracked competing AM simulation products building thermo-mechanical capability early. Prioritized it as a unified solver rather than a bolt-on and shipped before the market consolidated." },
  { area: "Prototyping", outcome: "Operator sign-off on AMVero alert UX before any eng ticket", body: "Prototyped the alert rule-creation flow and put it in front of operators before writing requirements. Operators flagged that conditions were too abstract — feedback drove a UX redesign at prototype stage." },
  { area: "User Feedback", outcome: "Operator feedback shifted Smart Alerting roadmap before sprint planning", body: "Reading hundreds of support tickets in one pass revealed operators were overwhelmed by alerts they could not act on. That pattern redirected the v26.2 roadmap before engineering committed." },
  { area: "Market Intel", outcome: "Competitive rebuttal ready before sales flagged the threat", body: "A custom agent tracks competitor product updates weekly. When a competitor claimed predictive defect detection, I had a technical breakdown ready before anyone in sales raised it." },
];

export default function VariationA() {
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
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted dark:text-slate-500">Variation A</span>
            <button
              onClick={toggleDark}
              className="text-xs font-mono uppercase tracking-[0.15em] border border-border-dark dark:border-slate-600 px-3 py-1.5 rounded bg-surface dark:bg-slate-800 text-text-muted dark:text-slate-400 hover:text-text-primary dark:hover:text-white transition-colors"
              aria-label="Toggle dark mode"
            >
              {dark ? "Light" : "Dark"}
            </button>
          </div>
        </header>

        {/* Hero */}
        <section id="hero" className="px-6 md:px-12 py-16 border-b border-border-dark dark:border-slate-700 bg-canvas dark:bg-slate-950">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:gap-16 gap-10">
              <div className="flex-1 flex flex-col items-start">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary font-medium mb-4">
                  Senior PM · Oqton · AI Platform
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-text-primary dark:text-white leading-tight tracking-tight mb-5">
                  I turn AI capability into products where reliability matters.
                </h1>
                <p className="text-base md:text-lg text-text-secondary dark:text-slate-300 leading-relaxed mb-6 max-w-lg">
                  I focus on the decisions between a capable system and one people actually rely on.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Enterprise · Regulated Industries", "B2B", "Israel · Open to Remote"].map((tag) => (
                    <span key={tag} className="text-xs font-mono uppercase tracking-[0.15em] text-text-muted dark:text-slate-400 border border-border-dark dark:border-slate-600 rounded px-3 py-1.5 bg-surface dark:bg-slate-800">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href="#work" className="text-primary text-sm font-medium border border-primary/40 bg-surface dark:bg-slate-800 dark:border-primary/30 px-5 py-2.5 rounded hover:bg-primary-dim transition-all">
                    View Work
                  </a>
                  <a href="https://www.linkedin.com/in/michael-korenevsky/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium border border-border-dark dark:border-slate-600 bg-surface dark:bg-slate-800 text-text-secondary dark:text-slate-300 px-5 py-2.5 rounded hover:border-primary/40 transition-all">
                    LinkedIn
                  </a>
                  <a href="/resume.pdf" download className="text-sm font-medium border border-border-dark dark:border-slate-600 bg-surface dark:bg-slate-800 text-text-secondary dark:text-slate-300 px-5 py-2.5 rounded hover:border-primary/40 transition-all">
                    Resume ↓
                  </a>
                </div>
              </div>

              {/* Photo + clients */}
              <div className="flex flex-col items-center md:items-end gap-6 md:w-72 shrink-0 order-first md:order-last">
                <div className="rounded-full p-[3px] bg-primary-dim border border-primary/20">
                  <Image src="/profile.jpeg" alt="Michael Korenevsky" width={240} height={240} priority className="h-48 w-48 md:h-60 md:w-60 rounded-full object-cover object-[center_15%]" />
                </div>
                <div className="w-full">
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-text-muted dark:text-slate-500 mb-2 text-right">Shipped to</p>
                  <div className="flex flex-wrap justify-end gap-2">
                    {CLIENTS.map(({ name, industry }) => (
                      <div key={name} className="flex items-center gap-2 border border-border-dark dark:border-slate-600 rounded px-3 py-2 bg-surface dark:bg-slate-800">
                        <span className="text-xs font-semibold text-text-primary dark:text-white font-display">{name}</span>
                        <span className="text-xs font-mono uppercase tracking-wider text-primary/60 border-l border-border-dark dark:border-slate-600 pl-2">{industry}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Selected Work */}
        <section id="work" className="px-6 md:px-12 py-16 border-t border-border-dark dark:border-slate-700 bg-canvas dark:bg-slate-950">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <span className="text-[10px] tracking-[0.4em] uppercase text-text-muted dark:text-slate-500 font-mono">Selected Work</span>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary dark:text-white mt-2">
                Two products I owned. Documented decisions. Verified outcomes.
              </h2>
            </div>
            <div className="space-y-10">

              {/* AMVero */}
              <article className="bg-surface dark:bg-slate-900 border border-border-dark dark:border-slate-700 rounded p-8">
                <div className="mb-3">
                  <span className="text-[10px] tracking-[0.4em] uppercase text-primary font-mono">AI Platform</span>
                </div>
                <p className="text-xs text-text-muted dark:text-slate-500 font-mono mb-4">Senior PM, AI Platform · Oqton · 2025–Present · 3 engineers + 1 designer · 5 enterprise deployments</p>
                <div className="grid grid-cols-3 gap-px bg-border-dark dark:bg-slate-700 border border-border-dark dark:border-slate-700 rounded overflow-hidden mb-6">
                  {[{ value: "98%", label: "Engineering review time cut" }, { value: "5", label: "Enterprise clients · 5 mo" }, { value: "136h", label: "Saved / printer / yr" }].map((kpi, i) => (
                    <div key={i} className="bg-canvas dark:bg-slate-950 px-4 py-3 flex flex-col gap-1">
                      <span className="text-3xl md:text-4xl font-bold font-display text-primary leading-none">{kpi.value}</span>
                      <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-text-muted dark:text-slate-500">{kpi.label}</span>
                    </div>
                  ))}
                </div>
                <div className="w-full aspect-video bg-slate-200 dark:bg-slate-800 rounded flex items-center justify-center text-slate-400 text-sm mb-6">Product UI</div>
                <h3 className="text-xl md:text-2xl font-semibold font-display text-text-primary dark:text-white mb-3">Took an AI monitoring tool from pilot to five enterprise contracts in five months</h3>
                <p className="text-sm text-text-secondary dark:text-slate-300 leading-relaxed mb-4">I took AMVero from first enterprise pilot to five paying clients in five months, writing the GTM narrative, designing the smart alerting system that eliminated operator alert fatigue, and authoring the deployment playbook that got regulated manufacturers live without disrupting production.</p>
                <p className="text-xs text-text-muted dark:text-slate-500 mb-6"><span className="text-text-secondary dark:text-slate-400">Customers:</span> Baker Hughes · Thales · Elos Medtech · Beehive</p>
                <div className="border-t border-border-dark dark:border-slate-700 pt-6">
                  <div className="text-[9px] font-mono tracking-[0.15em] uppercase text-text-muted dark:text-slate-500 mb-3">Key decisions</div>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {AMVERO_DECISIONS.map((d, i) => (
                      <div key={i} className="border border-border-dark dark:border-slate-700 rounded p-4 bg-canvas dark:bg-slate-950 flex flex-col gap-2">
                        <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-primary/70">{d.label}</span>
                        <span className={`text-[8px] font-mono uppercase tracking-[0.2em] px-1.5 py-0.5 rounded-sm inline-block w-fit ${d.tag === "outcome" ? "bg-primary/10 text-primary/70" : "bg-slate-100 dark:bg-slate-800 text-text-muted dark:text-slate-400"}`}>
                          {d.tag === "outcome" ? "Decision outcome" : "Product impact"}
                        </span>
                        <span className="text-3xl font-bold font-display text-primary leading-none">{d.metric}</span>
                        <p className="text-[10px] font-mono text-text-muted dark:text-slate-500 uppercase tracking-[0.1em]">{d.context}</p>
                        <p className="text-xs text-text-secondary dark:text-slate-300 leading-relaxed border-t border-border-dark dark:border-slate-700 pt-2">{d.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>

              {/* Simulation Suite */}
              <article className="bg-surface dark:bg-slate-900 border border-border-dark dark:border-slate-700 rounded p-8">
                <div className="mb-3">
                  <span className="text-[10px] tracking-[0.4em] uppercase text-primary font-mono">Predictive Simulation</span>
                </div>
                <p className="text-xs text-text-muted dark:text-slate-500 font-mono mb-4">Product Manager, Simulation · Oqton · 2022–2025 · Full product lifecycle · 3 modules · 4 simulation engineers</p>
                <div className="grid grid-cols-3 gap-px bg-border-dark dark:bg-slate-700 border border-border-dark dark:border-slate-700 rounded overflow-hidden mb-6">
                  {[{ value: "~100%", label: "Distortion compensated" }, { value: "80%", label: "Fewer dimensional errors" }, { value: "<0.2mm", label: "Max deviation" }].map((kpi, i) => (
                    <div key={i} className="bg-canvas dark:bg-slate-950 px-4 py-3 flex flex-col gap-1">
                      <span className="text-3xl md:text-4xl font-bold font-display text-primary leading-none">{kpi.value}</span>
                      <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-text-muted dark:text-slate-500">{kpi.label}</span>
                    </div>
                  ))}
                </div>
                <div className="w-full aspect-video bg-slate-200 dark:bg-slate-800 rounded flex items-center justify-center text-slate-400 text-sm mb-6">Product UI</div>
                <h3 className="text-xl md:text-2xl font-semibold font-display text-text-primary dark:text-white mb-3">Shipped three simulation modules, culminating in the thermo-mechanical solver that made first-time-right manufacturing achievable</h3>
                <p className="text-sm text-text-secondary dark:text-slate-300 leading-relaxed mb-4">Built out the Simulation Suite over three years, shipping Thermal, Mechanical, and the combined Thermo-mechanical module — the flagship that simultaneously predicts heat distribution and physical distortion, enabling close to 100% dimensional distortion compensation without trial parts.</p>
                <p className="text-xs text-text-muted dark:text-slate-500 mb-6"><span className="text-text-secondary dark:text-slate-400">Customers:</span> Knauf and tooling manufacturers across Europe</p>
                <div className="border-t border-border-dark dark:border-slate-700 pt-6">
                  <div className="text-[9px] font-mono tracking-[0.15em] uppercase text-text-muted dark:text-slate-500 mb-3">Key decisions</div>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {SIM_DECISIONS.map((d, i) => (
                      <div key={i} className="border border-border-dark dark:border-slate-700 rounded p-4 bg-canvas dark:bg-slate-950 flex flex-col gap-2">
                        <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-primary/70">{d.label}</span>
                        <span className="text-[8px] font-mono uppercase tracking-[0.2em] px-1.5 py-0.5 rounded-sm inline-block w-fit bg-primary/10 text-primary/70">
                          Decision outcome
                        </span>
                        <span className="text-3xl font-bold font-display text-primary leading-none">{d.metric}</span>
                        <p className="text-[10px] font-mono text-text-muted dark:text-slate-500 uppercase tracking-[0.1em]">{d.context}</p>
                        <p className="text-xs text-text-secondary dark:text-slate-300 leading-relaxed border-t border-border-dark dark:border-slate-700 pt-2">{d.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>

            </div>
          </div>
        </section>

        {/* AI Practice */}
        <section id="ai-practice" className="px-6 md:px-12 py-16 border-t border-border-dark dark:border-slate-700 bg-surface dark:bg-slate-900">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10">
              <span className="text-[10px] tracking-[0.4em] uppercase text-text-muted dark:text-slate-500 font-mono">AI Practice</span>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary dark:text-white mt-2 mb-4">Where AI changes what&apos;s possible</h2>
              <p className="text-base text-text-secondary dark:text-slate-300 max-w-2xl">AI does not change what I do as a PM. It changes what I can know before a decision, and how early I can act on a signal before engineering commits.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {AI_CARDS.map((card, i) => (
                <div key={i} className="bg-canvas dark:bg-slate-950 border border-border-dark dark:border-slate-700 rounded p-6 flex flex-col gap-2 hover:border-primary/30 transition-colors">
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-primary/70">{card.area}</span>
                  <h3 className="text-sm font-semibold font-display text-text-primary dark:text-white leading-snug">{card.outcome}</h3>
                  <p className="text-xs text-text-secondary dark:text-slate-400 leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Career + Contact */}
        <section id="career-contact" className="px-6 md:px-12 py-16 border-t border-border-dark dark:border-slate-700 bg-canvas dark:bg-slate-950">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <span className="text-[10px] tracking-[0.4em] uppercase text-text-muted dark:text-slate-500 font-mono">Career</span>
              <h2 className="text-2xl font-bold font-display text-text-primary dark:text-white mt-2 mb-6">Timeline</h2>
              <div className="space-y-4">
                {[
                  { period: "2025–Present", role: "Senior PM, AI Platform", company: "Oqton" },
                  { period: "2022–2025", role: "Product Manager, Simulation", company: "Oqton" },
                  { period: "2018–2022", role: "Product Manager", company: "Earlier roles" },
                  { period: "2008–2012", role: "B.Sc. Mechanical Engineering", company: "Ben-Gurion University" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 border-l-2 border-primary/20 pl-4">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-text-muted dark:text-slate-500">{item.period}</p>
                      <p className="text-sm font-semibold text-text-primary dark:text-white">{item.role}</p>
                      <p className="text-xs text-text-muted dark:text-slate-500">{item.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[10px] tracking-[0.4em] uppercase text-text-muted dark:text-slate-500 font-mono">Contact</span>
              <h2 className="text-2xl font-bold font-display text-text-primary dark:text-white mt-2 mb-4">Get in touch</h2>
              <p className="text-sm text-text-secondary dark:text-slate-300 mb-6">Open to senior PM roles in AI, enterprise software, or regulated industries. Based in Israel, open to remote.</p>
              <div className="flex flex-col gap-3">
                <a href="https://www.linkedin.com/in/michael-korenevsky/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary border border-primary/40 rounded px-5 py-3 hover:bg-primary-dim transition-all">
                  LinkedIn →
                </a>
                <a href="/resume.pdf" download className="text-sm font-medium text-text-secondary dark:text-slate-300 border border-border-dark dark:border-slate-600 rounded px-5 py-3 hover:border-primary/40 transition-all">
                  Download Resume ↓
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="px-6 md:px-12 py-6 border-t border-border-dark dark:border-slate-700 bg-canvas dark:bg-slate-950">
          <div className="max-w-5xl mx-auto flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-text-muted dark:text-slate-500 font-mono">
            <span>© 2026 Michael Korenevsky</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Available</span>
          </div>
        </footer>
      </main>
    </>
  );
}
