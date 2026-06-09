# Michael Korenevsky — PM Portfolio (Dev Repo)

> Claude Code-built portfolio site for a Senior PM at Oqton — proving AI products at enterprise scale.

Experiment and development repo for `themishka.me`. All redesigns and new features are built and reviewed here before being promoted to the official site. The site targets recruiters and hiring managers at AI-native B2B companies — optimized for a 30–90 second attention window.

---

## What it does

```
Recruiter lands on themishka.me
         │
         ▼
  ┌──────────────────────────────────┐
  │  Dark canvas · teal accent       │
  │  Single-page scroll              │
  │                                  │
  │  Hero ──────── name + tagline    │
  │  Work ──────── AMVero            │
  │             └─ Simulation        │
  │  How I Work ── AI practice       │
  │  Career ─────── timeline         │
  │  About ──────── education        │
  │  Contact ─────── links           │
  └──────────────────────────────────┘
         │
         ▼
  Click a WorkCard
         │
         ▼
  ┌──────────────────────────────────┐
  │  Case study expands in-place     │
  │  Metrics · Outcomes · Context    │
  └──────────────────────────────────┘
```

---

## Architecture

```
┌─────────────────────────────────────────┐
│  THIS REPO (dev/experiment)             │
│  ClaudeCode-portfolio-dev               │
│  → michael-korenevsky-portfolio-dev     │
│     .vercel.app  (manual deploy)        │
└──────────────────┬──────────────────────┘
                   │ approve → copy changes
                   ▼
┌─────────────────────────────────────────┐
│  OFFICIAL REPO                          │
│  michael-korenevsky-portfolio           │
│  → themishka.me                         │
│     (auto-deploy via GitHub → Vercel)   │
└─────────────────────────────────────────┘

Claude Code dev loop:
┌──────────────────────────────────────────────┐
│  Claude Code CLI                             │
│  ├── superpowers skill   (plan + execute)    │
│  ├── portfolio-design-system (visual rules)  │
│  ├── portfolio-copy-voice  (editorial)       │
│  ├── ip-handling           (attribution)     │
│  ├── Google Drive MCP      (content source)  │
│  └── Figma MCP             (design ref)      │
└──────────────────────────────────────────────┘
```

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 App Router · TypeScript |
| Styling | CSS Modules · custom design tokens |
| Fonts | Poppins · Hepta Slab · JetBrains Mono |
| Theme | Dark canvas (#000000) · teal accent (#5eead4) |
| Motion | Scroll-triggered reveals · custom cursor |
| Deploy | Vercel (dev preview + official) |
| AI tooling | Claude Code + Superpowers plugin |

---

## Key features

- **Single-page scroll** — hero → work → how I work → career → about → contact
- **WorkCard expand-in-place** — case study depth on click, no modal overlay
- **AI vs physics distinction** — AMVero is AI (computer vision), Simulation is physics-based
- **Skill-driven development** — design system, copy voice, IP handling enforced via Claude Code skills
- **Content source of truth** — `docs/product-case-studies.md` gates all metrics and customer references
- **Dev/prod separation** — experiment here, promote to `themishka.me` when approved

---

## Quick start

```bash
git clone git@github.com:korm85/ClaudeCode-portfolio-dev
cd ClaudeCode-portfolio-dev
npm install
npm run dev     # → http://localhost:3000
```

---

## Restoring this setup

See [RESTORE.md](./RESTORE.md) — complete step-by-step guide an AI agent can follow to rebuild the environment (Claude Code config, MCP servers, plugins, Vercel link).

See [`.claude-backup/`](./.claude-backup/) for:
- Claude Code hooks and settings
- MCP server configuration (secrets scrubbed)
- Installed plugins list
- Infrastructure documentation

---

## Design rules (non-negotiable)

- **Always invoke `portfolio-design-system` skill before any UI change**
- `BRIEF.md` overrides Bento defaults — read it before touching layout or palette
- Never add a metric not in `docs/product-case-studies.md`
- Never call the products SaaS — they are enterprise software
- Never remove a bullet permanently — bench it in `master-cv.md` first

---

## Repo identity

| Repo | Deploys to | How |
|---|---|---|
| `ClaudeCode-portfolio-dev` | `michael-korenevsky-portfolio-dev.vercel.app` | `npx vercel --prod --yes` |
| `michael-korenevsky-portfolio` | `themishka.me` | GitHub push → Vercel auto |
