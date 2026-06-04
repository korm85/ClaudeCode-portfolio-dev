"use client";

import { useScrollReveal } from "../hooks/useScrollReveal";

const TIMELINE = [
  {
    years: "2025–Present",
    company: "Oqton",
    role: "Senior PM, AI Platform",
    achievements: [
      "Launched AMVero to 5 enterprise clients in 5 months",
      "Designed condition-based alert system — cut operator review time by 98%",
      "Defined on-premise product variant for aerospace and defense clients",
    ],
  },
  {
    years: "2022–2025",
    company: "Oqton",
    role: "Product Manager, Simulation",
    achievements: [
      "Shipped thermo-mechanical module — coupled two solvers, eliminated inter-stage wait times",
      "Validated on standard workstations, expanding the addressable market beyond dedicated compute",
      "Structured beta with Knauf reduced launch risk and produced a credible customer story at release",
    ],
  },
  {
    years: "2017–2022",
    company: "3D Systems",
    role: "QA Team Lead",
    achievements: [
      "Built the QA function from scratch; led release certification for enterprise CAD/CAM software",
      "Developed defect classification frameworks still used after the team scaled",
    ],
  },
  {
    years: "2015–2017",
    company: "3D Systems",
    role: "QA Engineer (Founding Team)",
    achievements: [
      "Wrote the first validation frameworks for a new generation of manufacturing tools",
      "Pre-release environment, no existing playbook — high failure cost if defects shipped",
    ],
  },
  {
    years: "2012–2015",
    company: "Cimatron",
    role: "QA Engineer",
    achievements: [
      "Certified CAD/CAM software for tooling manufacturers across Europe and North America",
      "Developed instinct for failure modes product teams hadn't considered",
    ],
  },
];

function TimelineEntry({ entry }: { entry: (typeof TIMELINE)[0] }) {
  const ref = useScrollReveal("left");
  return (
    <div ref={ref} className="flex gap-6 md:gap-10 group">
      <div className="hidden md:flex flex-col items-center pt-2">
        <div className="w-[14px] h-[14px] rounded-full border-2 border-border-dark group-hover:border-primary group-hover:bg-primary-dim transition-all duration-300 flex items-center justify-center">
          <div className="w-[5px] h-[5px] rounded-full bg-text-muted group-hover:bg-primary transition-colors" />
        </div>
      </div>
      <div className="flex-1 pb-12 border-b border-border-dark last:border-0 last:pb-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
          <span className="text-xs text-primary font-medium tracking-wider font-mono">{entry.years}</span>
          <span className="text-sm font-semibold font-display text-text-primary">{entry.company}</span>
          <span className="text-xs text-text-muted">·</span>
          <span className="text-sm text-text-secondary">{entry.role}</span>
        </div>
        <ul className="space-y-2">
          {entry.achievements.map((a, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-text-muted leading-snug">
              <span className="text-primary/40 mt-[3px] shrink-0">—</span>
              <span>{a}</span>
            </li>
          ))}
        </ul>
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
            10+ years in industrial B2B software
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-[7px] top-3 bottom-3 w-px bg-border-dark hidden md:block" />
          <div className="space-y-0">
            {TIMELINE.map((entry, i) => (
              <TimelineEntry key={i} entry={entry} />
            ))}
          </div>
        </div>

        <p className="text-sm text-text-muted mt-12 italic border-l-2 border-primary/30 pl-4">
          A decade of QA before PM means I approach AI product decisions the way a test engineer approaches release certification: assume it will fail, design for the edge case, then validate before shipping.
        </p>
      </div>
    </section>
  );
}
