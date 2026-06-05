"use client";
import { useState } from "react";

const products = {
  amvero: {
    name: "AMVero",
    tagline: "Smart Alerting for Industrial 3D Printing",
    description:
      "AI-powered alert management system that cuts noise and surfaces what operators actually need to act on — deployed across enterprise metal AM environments.",
    kpis: [
      { value: "98%", label: "Alert review time cut" },
      { value: "5", label: "Enterprise clients in 5 mo" },
      { value: "136h", label: "Saved per printer/yr" },
    ],
    decisions: [
      { title: "Alert Design", outcome: "98% time reduction" },
      { title: "Deployment Model", outcome: "5 clients impacted" },
      { title: "Onboarding", outcome: "1 day to live" },
      { title: "Pricing Model", outcome: "18% revenue uplift" },
    ],
    customers: ["Baker Hughes", "Thales", "Elos Medtech"],
  },
  simulation: {
    name: "Simulation Suite",
    tagline: "Distortion Compensation for Metal AM",
    description:
      "Physics-based simulation toolchain that predicts and compensates for distortion in metal parts — from pre-print prediction to closed-loop correction.",
    kpis: [
      { value: "~100%", label: "Distortion compensated" },
      { value: "80%", label: "Fewer dimensional errors" },
      { value: "<0.2mm", label: "Max deviation" },
    ],
    decisions: [
      { title: "Module Architecture", outcome: "80% error reduction" },
      { title: "Infrastructure Scope", outcome: "8h 15m build time" },
      { title: "Beta Strategy", outcome: "<0.2mm deviation" },
      { title: "Solver Selection", outcome: "10x speed gain" },
    ],
    customers: ["Knauf Industries"],
  },
};

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

export default function Mockup1() {
  const [activeTab, setActiveTab] = useState<"amvero" | "simulation">("amvero");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const product = products[activeTab];

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans">
      {/* Nav */}
      <div className="fixed top-4 left-4 z-50">
        <a href="/" className="text-slate-400 hover:text-white text-sm transition-colors">
          ← Back
        </a>
      </div>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-screen px-6 pt-16 text-center">
        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-blue-500 mb-8 shadow-[0_0_60px_rgba(59,130,246,0.4)]">
          <img src="/profile.jpeg" alt="Michael Korenevsky" className="w-full h-full object-cover" />
        </div>
        <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">
          Senior Product Manager
        </p>
        <h1 className="text-4xl md:text-6xl font-black leading-tight max-w-3xl mb-4">
          I turn AI capability into products where{" "}
          <span className="text-blue-400">reliability matters.</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mb-8 leading-relaxed">
          I focus on the decisions between a capable system and one people actually rely on.
        </p>
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {["Enterprise · Regulated Industries", "B2B", "Israel · Open to Remote"].map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full border border-slate-700 text-slate-300 text-sm">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          <a href="#work" className="px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-lg transition-colors">
            View Work
          </a>
          <a href="#contact" className="px-6 py-3 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-semibold rounded-lg transition-colors">
            Get in Touch
          </a>
        </div>
        <div className="mt-16 flex flex-wrap gap-3 justify-center">
          {["Baker Hughes", "Thales", "Elos Medtech", "Beehive"].map((client) => (
            <span key={client} className="px-4 py-1.5 bg-slate-800 text-slate-400 text-xs rounded-full font-medium">
              {client}
            </span>
          ))}
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="max-w-5xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-black mb-8 text-center">Work</h2>

        {/* Tabs */}
        <div className="flex gap-2 justify-center mb-8">
          {(["amvero", "simulation"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                activeTab === tab
                  ? "bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {products[tab].name}
            </button>
          ))}
        </div>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          {/* KPI Strip */}
          <div className="grid grid-cols-3 divide-x divide-slate-800 border-b border-slate-800">
            {product.kpis.map((kpi) => (
              <div key={kpi.label} className="px-6 py-6 text-center">
                <div className="text-4xl font-black text-blue-400 mb-1">{kpi.value}</div>
                <div className="text-slate-400 text-sm">{kpi.label}</div>
              </div>
            ))}
          </div>

          {/* Body */}
          <div className="p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-black mb-1">{product.name}</h3>
                <p className="text-blue-400 text-sm font-medium">{product.tagline}</p>
              </div>
              <div className="flex gap-2 flex-wrap justify-end">
                {product.customers.map((c) => (
                  <span key={c} className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-slate-400 mb-8 leading-relaxed">{product.description}</p>

            {/* Decision Tiles */}
            <div className="grid grid-cols-2 gap-3">
              {product.decisions.map((d) => (
                <div key={d.title} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Decision</div>
                  <div className="font-bold text-white mb-1">{d.title}</div>
                  <div className="text-blue-400 text-sm font-semibold">{d.outcome}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Practice */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-black mb-2 text-center">AI Practice</h2>
        <p className="text-slate-400 text-center mb-10">How I use AI to make better product decisions</p>
        <div className="grid grid-cols-2 gap-4">
          {aiCards.map((card, i) => (
            <div
              key={card.title}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative bg-slate-900 border border-slate-800 rounded-xl p-6 cursor-default overflow-hidden transition-all hover:border-blue-500/50"
            >
              <div className="text-sm text-blue-400 font-semibold uppercase tracking-widest mb-2">
                {card.title}
              </div>
              <div
                className={`text-slate-300 text-sm leading-relaxed transition-all duration-300 ${
                  hoveredCard === i ? "opacity-100 max-h-24" : "opacity-0 max-h-0"
                } overflow-hidden`}
              >
                {card.body}
              </div>
              {hoveredCard !== i && (
                <div className="text-slate-600 text-xs mt-1">Hover to read →</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-slate-800 mt-16 py-10 text-center">
        <p className="text-slate-400 text-sm mb-4">Michael Korenevsky · Senior Product Manager</p>
        <div className="flex gap-6 justify-center">
          <a href="mailto:korm85@gmail.com" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
            Email
          </a>
          <a href="https://linkedin.com" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
            LinkedIn
          </a>
          <a href="https://github.com" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
            GitHub
          </a>
        </div>
        <p className="text-slate-700 text-xs mt-6">Mockup 1 — Rounds-inspired Bold Hub</p>
      </footer>
    </div>
  );
}
