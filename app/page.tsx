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

      {/* ── Hero ── */}
      <section
        id="hero"
        className="relative flex items-center px-6 md:px-12 py-20 md:py-28 border-b border-border-dark overflow-hidden bg-canvas"
      >
        <div className="max-w-5xl mx-auto w-full">
          {/* Desktop: two-column. Mobile: stacked. */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-16 gap-10">

            {/* Left col — text */}
            <div className="flex-1 flex flex-col items-start">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary font-medium mb-6">
                Senior PM · Oqton · AI Platform
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-text-primary leading-tight tracking-tight mb-6">
                I turn AI capability into products where reliability matters.
              </h1>

              <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-8 max-w-lg">
                I focus on the decisions between a capable system and one people actually rely on.
              </p>

              {/* Credential tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["10+ yrs Industrial B2B", "Enterprise · Regulated Industries", "Israel · Open to Remote"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono uppercase tracking-[0.15em] text-text-muted border border-border-dark rounded px-3 py-1.5 bg-surface"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#work"
                  className="text-primary text-sm font-medium border border-primary/40 bg-surface px-6 py-2.5 rounded hover:bg-primary-dim hover:border-primary/70 transition-all"
                >
                  View Work
                </a>
                <a
                  href="#contact"
                  className="text-white text-sm font-medium bg-primary px-6 py-2.5 rounded hover:bg-primary-bright transition-all"
                >
                  Get in Touch
                </a>
                <a
                  href="/resume.pdf"
                  download
                  className="text-primary text-sm font-medium border border-primary/40 bg-surface px-6 py-2.5 rounded hover:bg-primary-dim hover:border-primary/70 transition-all"
                >
                  Download CV
                </a>
                <a
                  href="https://www.linkedin.com/in/michael-korenevsky/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary text-sm font-medium hover:text-primary transition-colors py-2.5"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>

            {/* Right col — photo only on mobile (chips rendered below text col on mobile) */}
            <div className="flex flex-col items-center md:items-end gap-8 md:w-72 shrink-0 md:self-start md:pt-2 order-first md:order-last">
              <div className="rounded-full p-[3px] bg-primary-dim border border-primary/20 hover:border-primary/50 transition-colors duration-500">
                <Image
                  src="/profile.jpeg"
                  alt="Michael Korenevsky"
                  width={260}
                  height={260}
                  priority
                  className="h-52 w-52 md:h-64 md:w-64 rounded-full object-cover object-[center_15%] p-0.5"
                />
              </div>

              {/* Client chips — desktop only here */}
              <div className="hidden md:block w-full">
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-text-muted mb-3 text-right">
                  Shipped to
                </p>
                <div className="flex flex-wrap justify-end gap-2">
                  {[
                    { name: "Baker Hughes", industry: "Energy" },
                    { name: "Thales", industry: "Defense" },
                    { name: "Elos Medtech", industry: "Medical Devices" },
                    { name: "Beehive", industry: "Manufacturing" },
                  ].map(({ name, industry }) => (
                    <div
                      key={name}
                      className="flex items-center gap-2 border border-border-dark rounded px-3 py-2 bg-surface"
                    >
                      <span className="text-xs font-semibold text-text-primary font-display">{name}</span>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-primary/60 border-l border-border-dark pl-2">
                        {industry}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Client chips — mobile only, after text */}
            <div className="md:hidden w-full">
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-text-muted mb-3 text-center">
                Shipped to
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { name: "Baker Hughes", industry: "Energy" },
                  { name: "Thales", industry: "Defense" },
                  { name: "Elos Medtech", industry: "Medical Devices" },
                  { name: "Beehive", industry: "Manufacturing" },
                ].map(({ name, industry }) => (
                  <div
                    key={name}
                    className="flex items-center gap-2 border border-border-dark rounded px-3 py-2 bg-surface"
                  >
                    <span className="text-xs font-semibold text-text-primary font-display">{name}</span>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-primary/60 border-l border-border-dark pl-2">
                      {industry}
                    </span>
                  </div>
                ))}
              </div>
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
