"use client";

import { useScrollReveal } from "../hooks/useScrollReveal";

const TIMELINE = [
  {
    years: "2025–Present",
    company: "Oqton",
    role: "Senior PM, AI Platform",
    headline: "Took an AI monitoring product from internal pilot to five enterprise contracts in five months.",
    detail: "Full ownership of an AI monitoring product from pilot to commercial deployment. The decade of QA before this role meant I knew exactly what would break in production before engineering built it — that judgment cut validation cycles and accelerated deployment.",
  },
  {
    years: "2022–2025",
    company: "Oqton",
    role: "Product Manager, Simulation",
    headline: "Owned a 3-year multi-module simulation build from initial roadmap to validated customer outcomes.",
    detail: "Shipped three modules, culminating in a thermo-mechanical solver that compensated for close to 100% of dimensional distortion on first attempt. Same questions as QA — what will fail, for whom — but now I decided what to build, not just whether it worked.",
  },
  {
    years: "2017–2022",
    company: "3D Systems",
    role: "QA Team Lead",
    headline: "Built and structured the QA team; each engineer owned a product domain, not a test file.",
    detail: "Set the operating standard: every defect had to trace to a real user scenario before it was worth filing. That principle — verify against production reality, not internal definitions — carried directly into the product decisions I make now.",
  },
  {
    years: "2015–2017",
    company: "3D Systems",
    role: "QA Engineer · Founding Team",
    headline: "First QA engineer on an all-in-one design-to-manufacturing product — designed the test suite from scratch.",
    detail: "Worked directly with PM and engineering to verify software did what users actually intended. The earliest version of the product thinking I would later do as PM.",
  },
  {
    years: "2012–2015",
    company: "Cimatron",
    role: "QA Engineer",
    headline: "Started in CAD/CAM software for tooling manufacturers — where software failure had direct production costs.",
    detail: "Learned to test systematically in a domain with zero tolerance for ambiguity. The foundation for everything that followed.",
  },
];

function TimelineEntry({ entry, isLast }: { entry: (typeof TIMELINE)[0]; isLast: boolean }) {
  const ref = useScrollReveal("left");
  return (
    <div ref={ref} className={`flex gap-8 md:gap-12 group ${!isLast ? "pb-16" : ""}`}>
      {/* Timeline dot + line */}
      <div className="hidden md:flex flex-col items-center pt-1.5 shrink-0">
        <div className="w-3 h-3 rounded-full border-2 border-border-dark group-hover:border-primary group-hover:bg-primary-dim transition-all duration-300" />
        {!isLast && <div className="w-px flex-1 bg-border-dark mt-3" />}
      </div>

      {/* Content */}
      <div className="flex-1">
        {/* Meta row */}
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
          <span className="text-[11px] font-mono tracking-[0.2em] text-primary uppercase">{entry.years}</span>
          <span className="text-base font-semibold font-display text-text-primary">{entry.company}</span>
          <span className="text-text-muted text-sm">·</span>
          <span className="text-sm text-text-secondary">{entry.role}</span>
        </div>

        {/* Impact headline */}
        <p className="text-base md:text-lg font-semibold font-display text-text-primary leading-snug mb-3">
          {entry.headline}
        </p>

        {/* Supporting narrative */}
        <p className="text-sm text-text-secondary leading-relaxed max-w-2xl">
          {entry.detail}
        </p>
      </div>
    </div>
  );
}

export default function CareerTimeline() {
  return (
    <section id="career" className="px-6 md:px-12 py-24 border-t border-border-dark bg-canvas">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-text-muted font-mono">Career</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mt-2">
            A decade of breaking enterprise software before building it.
          </h2>
          <p className="text-base text-text-secondary mt-3 max-w-2xl leading-relaxed">
            Ten years in QA across industrial software — not as a detour, but as the foundation. Every product decision I make is shaped by having seen what fails in production before it ships.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-[5px] top-2 bottom-0 w-px bg-border-dark hidden md:block" />
          {TIMELINE.map((entry, i) => (
            <TimelineEntry key={i} entry={entry} isLast={i === TIMELINE.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
