"use client";

import { useState } from "react";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "AI Practice", href: "#ai-practice" },
  { label: "Career", href: "#career" },
  { label: "Contact", href: "#contact" },
];

const products = [
  {
    id: "amvero",
    name: "AMVero",
    tagline: "Smart Alerting for Metal AM",
    description:
      "Enterprise monitoring platform that turns raw printer telemetry into actionable alerts — cutting review time by 98% across enterprise metal AM environments.",
    kpis: [
      { value: "98%", label: "Alert review time cut" },
      { value: "5", label: "Enterprise clients in 5 mo" },
      { value: "136h", label: "Saved / printer / yr" },
    ],
    decisions: [
      { title: "Alert Design", outcome: "98% review time reduction" },
      { title: "Deployment Model", outcome: "5 clients, 5 months" },
      { title: "Onboarding", outcome: "1-day go-live" },
      { title: "Pricing Model", outcome: "18% revenue impact" },
    ],
    customers: ["Baker Hughes", "Thales", "Elos Medtech"],
  },
  {
    id: "simulation",
    name: "Simulation Suite",
    tagline: "Distortion Compensation for Metal AM",
    description:
      "Predictive simulation tooling that compensates for thermal distortion before printing — achieving near-100% compensation and reducing dimensional errors by 80%.",
    kpis: [
      { value: "~100%", label: "Distortion compensated" },
      { value: "80%", label: "Fewer dimensional errors" },
      { value: "<0.2mm", label: "Max deviation" },
    ],
    decisions: [
      { title: "Module Architecture", outcome: "80% error reduction" },
      { title: "Infrastructure Scope", outcome: "8h 15m build time" },
      { title: "Beta Strategy", outcome: "<0.2mm deviation" },
      { title: "Market Timing", outcome: "First-to-market" },
    ],
    customers: ["Knauf Industries"],
  },
];

const aiCards = [
  {
    title: "Discovery",
    body: "Identified thermo-mechanical simulation as the next market requirement before competitors shipped it.",
  },
  {
    title: "Prototyping",
    body: "Got operator sign-off on the AMVero alert UX before a single engineering ticket was written.",
  },
  {
    title: "User Feedback",
    body: "Operator feedback shifted the entire Smart Alerting roadmap before sprint planning started.",
  },
  {
    title: "Market Intelligence",
    body: "Had a verified competitive rebuttal ready before sales flagged the threat.",
  },
];

export default function Mockup3() {
  const [drawerOpen, setDrawerOpen] = useState<string | null>(null);
  const activeProduct = products.find((p) => p.id === drawerOpen);

  return (
    <div className="flex min-h-screen bg-white text-slate-900 font-sans">
      {/* Fixed Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-[220px] border-r border-slate-200 flex flex-col justify-between py-8 px-6 z-40 bg-white">
        <div>
          {/* Back link */}
          <a href="/" className="text-slate-400 hover:text-slate-700 text-xs transition-colors block mb-8">
            ← Back
          </a>

          {/* Name */}
          <div className="mb-8">
            <div className="font-black text-base leading-tight text-slate-900">Michael</div>
            <div className="font-black text-base leading-tight text-blue-600">Korenevsky</div>
            <div className="text-slate-400 text-xs mt-1">Senior Product Manager</div>
          </div>

          {/* Nav */}
          <nav className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block py-2 px-3 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Availability indicator */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-slate-500">Open to opportunities</span>
        </div>
      </aside>

      {/* Main content — offset by sidebar */}
      <main className="ml-[220px] flex-1">

        {/* Section 1: Hero — 100vh */}
        <section className="h-screen flex items-center px-16 border-b border-slate-100">
          <div className="flex items-center gap-16 w-full max-w-4xl">
            {/* Left: text */}
            <div className="flex-1">
              <div className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-4">
                Senior Product Manager
              </div>
              <h1 className="text-4xl font-black leading-tight mb-6 text-slate-900">
                I turn AI capability into products where{" "}
                <span className="text-blue-600">reliability matters.</span>
              </h1>
              <p className="text-slate-500 text-lg mb-8 leading-relaxed max-w-md">
                I focus on the decisions between a capable system and one people actually rely on.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Enterprise · Regulated", "B2B", "Israel · Remote"].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full font-medium border border-slate-200">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <a href="#work" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors">
                  View Work
                </a>
                <a href="#contact" className="px-5 py-2.5 border border-slate-300 hover:border-slate-500 text-slate-700 text-sm font-semibold rounded-lg transition-colors">
                  Get in Touch
                </a>
              </div>
              <div className="flex gap-2 flex-wrap mt-8">
                {["Baker Hughes", "Thales", "Elos Medtech", "Beehive"].map((c) => (
                  <span key={c} className="text-xs text-slate-400 font-medium">{c}</span>
                ))}
              </div>
            </div>

            {/* Right: photo */}
            <div className="flex-shrink-0">
              <div className="w-64 h-64 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                <img src="/profile.jpeg" alt="Michael Korenevsky" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Work — 100vh */}
        <section id="work" className="h-screen flex flex-col justify-center px-16 border-b border-slate-100">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-900 mb-1">Work</h2>
            <p className="text-slate-400 text-sm">Key decisions that drove the outcomes</p>
          </div>

          <div className="grid grid-cols-2 gap-6 max-w-4xl">
            {products.map((product) => (
              <div
                key={product.id}
                className="border border-slate-200 rounded-2xl p-6 hover:border-blue-300 transition-colors"
              >
                <h3 className="text-lg font-black mb-0.5">{product.name}</h3>
                <p className="text-blue-600 text-xs font-medium mb-4">{product.tagline}</p>

                {/* KPIs */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {product.kpis.map((kpi) => (
                    <div key={kpi.label} className="bg-slate-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-black text-blue-600">{kpi.value}</div>
                      <div className="text-slate-400 text-xs leading-tight mt-0.5">{kpi.label}</div>
                    </div>
                  ))}
                </div>

                <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-1 flex-wrap">
                    {product.customers.map((c) => (
                      <span key={c} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        {c}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setDrawerOpen(product.id)}
                    className="text-blue-600 text-xs font-semibold hover:text-blue-800 transition-colors"
                  >
                    See decisions →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: AI Practice — 100vh */}
        <section id="ai-practice" className="h-screen flex flex-col justify-center px-16 border-b border-slate-100">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-900 mb-1">AI Practice</h2>
            <p className="text-slate-400 text-sm">How I use AI to make better product decisions faster</p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-3xl">
            {aiCards.map((card, i) => (
              <div key={card.title} className="border border-slate-200 rounded-xl p-6 hover:border-blue-200 transition-colors">
                <div className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-3">
                  {String(i + 1).padStart(2, "0")} — {card.title}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Career + Contact — 100vh */}
        <section id="career" className="h-screen flex">
          {/* Career left */}
          <div id="contact" className="flex-1 flex flex-col justify-center px-16 border-r border-slate-100">
            <h2 className="text-2xl font-black mb-8">Career</h2>
            <div className="space-y-6 max-w-sm">
              {[
                { role: "Senior PM — Oqton", period: "2021–present", note: "AMVero, Simulation Suite" },
                { role: "PM — Earlier roles", period: "2016–2021", note: "B2B enterprise software" },
              ].map((item) => (
                <div key={item.role} className="border-l-2 border-blue-200 pl-4">
                  <div className="font-semibold text-slate-900 text-sm">{item.role}</div>
                  <div className="text-slate-400 text-xs">{item.period}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{item.note}</div>
                </div>
              ))}

              <div className="mt-6">
                <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-3">Clients</div>
                <div className="flex flex-wrap gap-2">
                  {["Baker Hughes (Energy)", "Thales (Defense)", "Elos Medtech (Medical)", "Beehive (Mfg)"].map((c) => (
                    <span key={c} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact right */}
          <div className="flex-1 flex flex-col justify-center px-16">
            <h2 className="text-2xl font-black mb-8">Contact</h2>
            <div className="space-y-4 max-w-xs">
              <p className="text-slate-500 text-sm leading-relaxed">
                I'm available for new product leadership opportunities in enterprise, regulated, or AI-adjacent domains.
              </p>
              <div className="space-y-3">
                <a
                  href="mailto:korm85@gmail.com"
                  className="flex items-center gap-3 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
                >
                  <span className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-xs">@</span>
                  korm85@gmail.com
                </a>
                <a
                  href="https://linkedin.com"
                  className="flex items-center gap-3 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
                >
                  <span className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-xs">in</span>
                  LinkedIn
                </a>
              </div>
              <div className="pt-4">
                <span className="inline-flex items-center gap-2 text-xs text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Open to new opportunities
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Decision Drawer Overlay */}
      {drawerOpen && activeProduct && (
        <div className="fixed inset-0 z-50 flex items-end justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setDrawerOpen(null)}
          />

          {/* Drawer */}
          <div className="relative w-[480px] h-full bg-white border-l border-slate-200 shadow-2xl flex flex-col overflow-auto ml-[220px]">
            <div className="p-8 border-b border-slate-100 flex items-start justify-between">
              <div>
                <div className="text-xs text-blue-600 font-bold uppercase tracking-widest mb-1">Decisions</div>
                <h3 className="text-xl font-black">{activeProduct.name}</h3>
                <p className="text-slate-400 text-sm">{activeProduct.tagline}</p>
              </div>
              <button
                onClick={() => setDrawerOpen(null)}
                className="text-slate-400 hover:text-slate-700 text-xl font-light leading-none mt-1"
              >
                ×
              </button>
            </div>

            <div className="p-8 flex-1">
              <div className="grid grid-cols-2 gap-3 mb-8">
                {activeProduct.decisions.map((d) => (
                  <div key={d.title} className="border border-slate-200 rounded-xl p-4">
                    <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">Decision</div>
                    <div className="font-bold text-slate-900 mb-1 text-sm">{d.title}</div>
                    <div className="text-blue-600 text-sm font-semibold">{d.outcome}</div>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <div className="text-xs text-slate-400 uppercase tracking-wide mb-3">KPIs</div>
                <div className="grid grid-cols-3 gap-2">
                  {activeProduct.kpis.map((kpi) => (
                    <div key={kpi.label} className="bg-slate-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-black text-blue-600">{kpi.value}</div>
                      <div className="text-slate-400 text-xs leading-tight mt-0.5">{kpi.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-slate-500 text-sm leading-relaxed">
                {activeProduct.description}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-2 right-4 text-slate-300 text-xs z-30">
        Mockup 3 — Sidebar + Viewport Sections
      </div>
    </div>
  );
}
