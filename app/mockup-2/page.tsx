"use client";
import { useState } from "react";

export default function Mockup2() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans p-6 md:p-10">
      {/* Nav */}
      <div className="mb-6">
        <a href="/" className="text-slate-400 hover:text-slate-700 text-sm transition-colors">
          ← Back
        </a>
      </div>

      {/* Bento Grid */}
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "auto",
        }}
      >
        {/* Hero tile — large left */}
        <div
          className="bg-slate-900 text-white rounded-2xl p-8 flex flex-col justify-end"
          style={{ gridColumn: "1 / 8", gridRow: "1 / 3", minHeight: "360px" }}
        >
          <span className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
            Senior Product Manager
          </span>
          <h1 className="text-3xl md:text-4xl font-black leading-tight mb-4">
            I turn AI capability into products where{" "}
            <span className="text-blue-400">reliability matters.</span>
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-md">
            I focus on the decisions between a capable system and one people actually rely on.
          </p>
          <div className="flex gap-3">
            <a href="#work" className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold rounded-lg transition-colors">
              View Work
            </a>
            <a href="#contact" className="px-4 py-2 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white text-sm font-semibold rounded-lg transition-colors">
              Get in Touch
            </a>
          </div>
        </div>

        {/* Photo tile */}
        <div
          className="rounded-2xl overflow-hidden border border-slate-200"
          style={{ gridColumn: "8 / 10", gridRow: "1 / 2" }}
        >
          <img src="/profile.jpeg" alt="Michael Korenevsky" className="w-full h-full object-cover" style={{ minHeight: "160px" }} />
        </div>

        {/* KPI highlight tile */}
        <div
          className="bg-blue-500 text-white rounded-2xl p-6 flex flex-col justify-center"
          style={{ gridColumn: "10 / 13", gridRow: "1 / 2" }}
        >
          <div className="text-5xl font-black mb-1">5</div>
          <div className="text-blue-100 text-sm font-medium">Enterprise clients</div>
          <div className="text-blue-200 text-xs mt-1">in 5 months</div>
        </div>

        {/* Tags tile */}
        <div
          className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col gap-2 justify-center"
          style={{ gridColumn: "8 / 13", gridRow: "2 / 3" }}
        >
          <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1">Context</div>
          {["Enterprise · Regulated Industries", "B2B", "Israel · Open to Remote"].map((tag) => (
            <span key={tag} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs rounded-full w-fit font-medium">
              {tag}
            </span>
          ))}
          <div className="flex gap-2 flex-wrap mt-2">
            {["Baker Hughes", "Thales", "Elos Medtech", "Beehive"].map((c) => (
              <span key={c} className="text-xs text-slate-400 font-medium">{c}</span>
            ))}
          </div>
        </div>

        {/* AMVero tile */}
        <div
          className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-300 transition-colors"
          style={{ gridColumn: "1 / 5", gridRow: "3 / 5" }}
        >
          <div className="text-xs text-blue-500 font-bold uppercase tracking-widest mb-2">Product</div>
          <h3 className="text-xl font-black mb-1">AMVero</h3>
          <p className="text-slate-500 text-xs mb-4">Smart Alerting for Industrial 3D Printing</p>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { v: "98%", l: "Alert time cut" },
              { v: "5", l: "Clients 5 mo" },
              { v: "136h", l: "Saved/printer" },
            ].map((k) => (
              <div key={k.l} className="bg-slate-50 rounded-lg p-2 text-center">
                <div className="text-xl font-black text-blue-600">{k.v}</div>
                <div className="text-slate-400 text-xs leading-tight">{k.l}</div>
              </div>
            ))}
          </div>
          <p className="text-slate-600 text-xs leading-relaxed mb-4">
            AI-powered alert management that cuts noise and surfaces what operators actually need to act on across enterprise metal AM environments.
          </p>
          <div className="flex items-center justify-between">
            <div className="flex gap-1 flex-wrap">
              {["Baker Hughes", "Thales", "Elos Medtech"].map((c) => (
                <span key={c} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{c}</span>
              ))}
            </div>
            <button className="text-blue-500 text-xs font-semibold hover:text-blue-700">
              View details →
            </button>
          </div>
        </div>

        {/* Simulation tile */}
        <div
          className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-300 transition-colors"
          style={{ gridColumn: "5 / 9", gridRow: "3 / 5" }}
        >
          <div className="text-xs text-blue-500 font-bold uppercase tracking-widest mb-2">Product</div>
          <h3 className="text-xl font-black mb-1">Simulation Suite</h3>
          <p className="text-slate-500 text-xs mb-4">Distortion Compensation for Metal AM</p>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { v: "~100%", l: "Distortion comp." },
              { v: "80%", l: "Fewer errors" },
              { v: "<0.2mm", l: "Max deviation" },
            ].map((k) => (
              <div key={k.l} className="bg-slate-50 rounded-lg p-2 text-center">
                <div className="text-xl font-black text-blue-600">{k.v}</div>
                <div className="text-slate-400 text-xs leading-tight">{k.l}</div>
              </div>
            ))}
          </div>
          <p className="text-slate-600 text-xs leading-relaxed mb-4">
            Physics-based simulation toolchain that predicts and compensates for distortion in metal parts from pre-print prediction to closed-loop correction.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">Knauf Industries</span>
            <button className="text-blue-500 text-xs font-semibold hover:text-blue-700">
              View details →
            </button>
          </div>
        </div>

        {/* AI Practice tall tile */}
        <div
          className="bg-slate-900 text-white rounded-2xl p-6"
          style={{ gridColumn: "9 / 13", gridRow: "3 / 6" }}
        >
          <div className="text-xs text-blue-400 font-bold uppercase tracking-widest mb-3">AI Practice</div>
          <h3 className="text-lg font-black mb-4 leading-snug">How I use AI to make better decisions faster</h3>
          <div className="space-y-3">
            {[
              { t: "Discovery", v: "Found the next market gap before competitors shipped" },
              { t: "Prototyping", v: "Operator sign-off before first eng ticket" },
              { t: "User Feedback", v: "Shifted roadmap before sprint planning" },
              { t: "Market Intel", v: "Competitive rebuttal before sales flagged threat" },
            ].map((item) => (
              <div key={item.t} className="border-b border-slate-800 pb-3 last:border-0 last:pb-0">
                <div className="text-blue-400 text-xs font-semibold mb-0.5">{item.t}</div>
                <div className="text-slate-300 text-xs leading-relaxed">{item.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 AI practice cards */}
        {[
          { title: "Discovery", body: "Identified thermo-mechanical simulation as the next market requirement before competitors shipped it." },
          { title: "Prototyping", body: "Got operator sign-off on the AMVero alert UX before a single engineering ticket was written." },
          { title: "User Feedback", body: "Operator feedback shifted the entire Smart Alerting roadmap before sprint planning started." },
          { title: "Market Intelligence", body: "Had a verified competitive rebuttal ready before sales flagged the threat." },
        ].map((card, i) => (
          <div
            key={card.title}
            className={`rounded-2xl p-5 border transition-all cursor-pointer ${
              expanded === card.title
                ? "bg-blue-50 border-blue-200"
                : "bg-slate-50 border-slate-200 hover:border-blue-200"
            }`}
            style={{ gridColumn: `${1 + i * 2} / ${3 + i * 2}`, gridRow: "5 / 6" }}
            onClick={() => setExpanded(expanded === card.title ? null : card.title)}
          >
            <div className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-1">{card.title}</div>
            <div className={`text-slate-600 text-xs leading-relaxed transition-all ${expanded === card.title ? "block" : "line-clamp-2"}`}>
              {card.body}
            </div>
          </div>
        ))}

        {/* Contact strip */}
        <div
          id="contact"
          className="bg-slate-900 text-white rounded-2xl p-6 flex items-center justify-between"
          style={{ gridColumn: "1 / 13", gridRow: "6 / 7" }}
        >
          <div>
            <div className="font-black text-lg">Michael Korenevsky</div>
            <div className="text-slate-400 text-sm">Senior Product Manager · Available for new opportunities</div>
          </div>
          <div className="flex gap-4">
            <a href="mailto:korm85@gmail.com" className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors">
              Email
            </a>
            <a href="https://linkedin.com" className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <p className="text-center text-slate-300 text-xs mt-6">Mockup 2 — Bento Grid</p>
    </div>
  );
}
