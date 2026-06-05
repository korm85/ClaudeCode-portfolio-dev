"use client";

import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { label: "Work", id: "work" },
  { label: "How I work", id: "how-i-work" },
  { label: "Career", id: "career" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const offset = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: offset, behavior: "smooth" });
  }
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-canvas/90 backdrop-blur-md border-b border-border-dark shadow-sm"
          : ""
      }`}
    >
      <div className="flex items-center justify-center px-6 md:px-12 py-5 relative max-w-7xl mx-auto">
        <nav className="hidden md:flex justify-center gap-10 text-text-secondary text-[11px] tracking-[0.25em] uppercase font-mono">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}
              className="hover:text-primary transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="absolute right-6 md:right-12 flex items-center gap-3">
          <a
            href="https://www.linkedin.com/in/michael-korenevsky/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-text-secondary hover:text-primary transition-colors duration-300 p-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <ThemeToggle />
        </div>

        <button
          className="md:hidden text-text-secondary text-[11px] tracking-[0.25em] uppercase font-mono hover:text-primary transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-4 bg-canvas/95 backdrop-blur-md border-b border-border-dark">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => { e.preventDefault(); scrollTo(item.id); setMenuOpen(false); }}
              className="text-text-secondary text-xs tracking-[0.2em] uppercase font-mono hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
