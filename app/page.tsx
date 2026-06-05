"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import SelectedWork from "./components/SelectedWork";
import HowIWork from "./components/HowIWork";
import CareerTimeline from "./components/CareerTimeline";
import ContactSection from "./components/ContactSection";
import AmveroModal from "./components/AmveroModal";
import SimulationModal from "./components/SimulationModal";

export default function Home() {
  const [amveroOpen, setAmveroOpen] = useState(false);
  const [simulationOpen, setSimulationOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Asia/Jerusalem",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="flex flex-col min-h-screen bg-canvas text-text-primary overflow-x-hidden">
      <Header />

      {/* ── Hero ── */}
      <section
        id="hero"
        className="flex items-center justify-center px-6 md:px-12 pt-32 pb-20 md:pt-40 md:pb-24 border-b border-border-dark bg-canvas"
      >
        <div className="max-w-3xl w-full text-center">
          <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-primary font-medium mb-5">
            Senior PM · Oqton · AI Platform
          </p>

          <h1 className="text-4xl md:text-6xl font-bold font-display text-text-primary leading-tight tracking-tight mb-5">
            Michael Korenevsky
          </h1>

          <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-10 max-w-xl mx-auto">
            I turn AI capability into products where reliability matters.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#work"
              className="text-white text-sm font-medium bg-primary px-7 py-3 rounded hover:bg-primary-bright transition-all"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="text-primary text-sm font-medium border border-primary/40 bg-surface px-7 py-3 rounded hover:bg-primary-dim hover:border-primary/70 transition-all"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* ── Client strip ── */}
      <div className="px-6 md:px-12 py-4 border-b border-border-dark bg-surface">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-text-muted">Shipped to</span>
          {[
            { name: "Baker Hughes", industry: "Energy" },
            { name: "Thales", industry: "Defense" },
            { name: "Elos Medtech", industry: "Medical Devices" },
            { name: "Beehive", industry: "Manufacturing" },
          ].map(({ name, industry }) => (
            <div key={name} className="flex items-center gap-2">
              <span className="text-xs font-semibold text-text-primary font-display">{name}</span>
              <span className="text-[9px] font-mono uppercase tracking-wider text-primary/60">{industry}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Selected Work ── */}
      <SelectedWork
        onOpenAmvero={() => setAmveroOpen(true)}
        onOpenSimulation={() => setSimulationOpen(true)}
      />

      {/* ── How I Work ── */}
      <HowIWork />

      {/* ── Career ── */}
      <CareerTimeline />

      {/* ── About ── */}
      <section id="about" className="px-6 md:px-12 py-24 border-t border-border-dark bg-surface">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <span className="text-[10px] tracking-[0.4em] uppercase text-text-muted font-mono">About</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mt-2">
              Background
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-canvas border border-border-dark p-8 rounded">
              <h3 className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-primary mb-4 font-medium font-mono">Education</h3>
              <p className="text-base font-semibold font-display text-text-primary">B.Sc. Mechanical Engineering</p>
              <p className="text-sm text-text-muted mt-1">
                Ben-Gurion University of the Negev · 2008–2012
              </p>
            </div>
            <div className="bg-canvas border border-border-dark p-8 rounded">
              <h3 className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-primary mb-4 font-medium font-mono">Languages</h3>
              <div className="space-y-3">
                {[
                  ["Hebrew", "Native"],
                  ["English", "Professional"],
                  ["Russian", "Fluent"],
                ].map(([lang, level]) => (
                  <div key={lang} className="flex items-center justify-between border-b border-border-dark pb-2 last:border-0 last:pb-0">
                    <span className="text-sm text-text-secondary">{lang}</span>
                    <span className="text-xs text-text-muted font-mono">{level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <ContactSection />

      {/* ── Footer ── */}
      <footer className="px-6 md:px-12 py-8 border-t border-border-dark bg-canvas">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-4 text-[10px] tracking-[0.2em] uppercase text-text-muted font-mono">
          <span>© 2026 Michael Korenevsky</span>
          <div className="flex items-center gap-4">
            {time && <span>ISR {time}</span>}
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Available
            </span>
          </div>
        </div>
      </footer>

      {/* ── Modals ── */}
      <AmveroModal isOpen={amveroOpen} onClose={() => setAmveroOpen(false)} />
      <SimulationModal isOpen={simulationOpen} onClose={() => setSimulationOpen(false)} />
    </main>
  );
}
