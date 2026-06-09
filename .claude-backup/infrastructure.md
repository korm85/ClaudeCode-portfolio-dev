# Infrastructure — ClaudeCode Portfolio Dev

## Overview

This is a DEVELOPMENT / EXPERIMENT repository for Michael Korenevsky's PM portfolio site.
All experimental features and redesigns are built here first, then promoted to the official site.

## Deployment targets

| Repo | Domain | Deploy method |
|---|---|---|
| `ClaudeCode-portfolio-dev` (THIS REPO) | `michael-korenevsky-portfolio-dev.vercel.app` | `npx vercel --prod --yes` |
| `michael-korenevsky-portfolio` (official) | `themishka.me` | Push to GitHub → Vercel auto-deploys |

**NEVER run `npx vercel --prod --yes` targeting the official project from this repo.**

## Official site repo

Path: `/home/korm85/projects/michael-korenevsky-portfolio`
Remote: `git@github-personal:korm85/michael-korenevsky-portfolio` (or via GitHub at `korm85/michael-korenevsky-portfolio`)

## Vercel projects

| Project | Vercel project name | Notes |
|---|---|---|
| Dev | `michael-korenevsky-portfolio-dev` | Connected to this repo |
| Official | `michael-korenevsky-portfolio` | Connected to `michael-korenevsky-portfolio` repo |

## MCP servers (Claude Code integration)

| Server | Purpose |
|---|---|
| `google-drive` | Fetch portfolio content (case studies, metrics) from Google Drive shared folder |
| `figma` | Extract design references from Figma files (AMVero, Simulation) |

### Google Drive shared folder
`https://drive.google.com/drive/folders/184rMRm2T_1RM4CjZvGG_wtHHoHYS4Ip2`
Contains: simulation accuracy data, case study metrics, AMVero screenshots.

### Figma files
- AMVero Design: `https://www.figma.com/design/Nu8ghzAlidpkeoaiXqlyNm/AMVero-Design`
- Simulation flows: `https://www.figma.com/board/nYR5upFW85oPRLffvl3vH1/`

## Local development

```bash
cd /home/korm85/projects/personal/ClaudeCode-portfolio-dev
npm install
npm run dev     # → http://localhost:3000
```

## Claude Code skills in use

| Skill | Purpose |
|---|---|
| `superpowers` | Brainstorming, plan execution, branch finishing |
| `portfolio-design-system` | Design tokens, visual rules — MUST invoke before any UI change |
| `portfolio-copy-voice` | Editorial rules — no em dashes, voice constraints |
| `ip-handling` | Oqton attribution scrubbing, AI vs physics distinction |
| `vercel` | Deployment guidance |
| `frontend-design` | Component and layout patterns |

## Content source of truth

`docs/product-case-studies.md` — verified metrics, customer names, case study outcomes.
Read this before writing or editing any metric or customer reference.
