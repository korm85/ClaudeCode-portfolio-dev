"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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

      {/* ── Hero — editorial full-bleed ── */}
      <section
        id="hero"
        className="relative px-6 md:px-12 pt-28 pb-12 md:pt-32 md:pb-16 border-b border-border-dark bg-canvas overflow-hidden"
      >
        <div className="max-w-5xl mx-auto">

          {/* Eyebrow */}
          <p className="font-mono text-[12px] uppercase tracking-[0.35em] text-primary font-medium mb-8">
            Senior PM · Oqton · AI Platform
          </p>

          {/* Main editorial row: huge name left, photo + value right */}
          <div className="flex flex-col md:flex-row md:items-end md:gap-12 gap-8 mb-10">

            {/* Name — dominates the left */}
            <div className="flex-1">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-display text-text-primary leading-[0.9] tracking-tight">
                Michael<br />Korenevsky
              </h1>
            </div>

            {/* Right col: photo + value sentence */}
            <div className="flex flex-row md:flex-col items-start md:items-end gap-6 md:gap-5 md:pb-2 shrink-0 md:max-w-xs">
              <div className="shrink-0">
                <div className="rounded-full p-[2px] bg-primary-dim border border-primary/20">
                  <Image
                    src="/profile.jpeg"
                    alt="Michael Korenevsky"
                    width={96}
                    height={96}
                    priority
                    className="h-20 w-20 md:h-24 md:w-24 rounded-full object-cover object-[center_15%]"
                  />
                </div>
              </div>
              <p className="text-base md:text-lg text-text-secondary leading-relaxed md:text-right">
                I turn AI capability into products where reliability matters.
              </p>
            </div>
          </div>

          {/* Bottom row: CTAs left, client list right */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-6 border-t border-border-dark">
            <div className="flex flex-wrap gap-3">
              <a
                href="#work"
                className="text-white text-sm font-medium bg-primary px-7 py-2.5 rounded hover:bg-primary-bright transition-all"
              >
                View Work
              </a>
              <a
                href="#contact"
                className="text-primary text-sm font-medium border border-primary/40 bg-surface px-7 py-2.5 rounded hover:bg-primary-dim hover:border-primary/70 transition-all"
              >
                Get in Touch
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-text-muted">Shipped to</span>
              {["Baker Hughes", "Thales", "Elos Medtech", "Beehive"].map((name) => (
                <span key={name} className="text-xs font-semibold text-text-secondary font-display">{name}</span>
              ))}
            </div>
          </div>

        </div>
      </section>

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
