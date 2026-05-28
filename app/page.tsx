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
        className="relative min-h-screen flex flex-col items-center justify-center px-6 py-32 border-b border-border-dark overflow-hidden bg-canvas"
      >
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-4">
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary font-medium mb-8">
            👋 Hi, I&apos;m Michael, Senior Product Manager
          </p>

          <div className="mb-10 rounded-full p-[3px] bg-primary-dim border border-primary/20 hover:border-primary/50 transition-colors duration-500">
            <Image
              src="/profile.jpeg"
              alt="Michael Korenevsky"
              width={220}
              height={220}
              priority
              className="h-44 w-44 md:h-52 md:w-52 rounded-full object-cover object-top p-0.5"
            />
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-text-primary leading-tight tracking-tight max-w-3xl mb-8">
            I spent a decade{" "}
            <em className="not-italic text-primary">breaking</em>{" "}
            enterprise software before I built it.
          </h1>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl mb-12">
            Now I apply that edge-case thinking to AI products where a missed alert costs a production run, and a wrong decision costs a customer.
          </p>

          <div className="flex gap-4 mb-14">
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
          </div>

          <div className="w-full max-w-md border-t border-border-dark mb-8" />

          <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-text-muted">
            Shipped to:{" "}
            <span className="text-text-secondary font-semibold">
              Baker Hughes · Thales · Elos Medtech · Beehive
            </span>
          </p>
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
