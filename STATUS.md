# Portfolio Project Status

## Current state

Full Themishka-inspired redesign complete and live on `themishka.me`. Dark canvas (`#1b1916`), cream paper (`#f3efe6`), forest green accent (`#16a34a`). Fraunces display serif, Hanken Grotesk body, JetBrains Mono labels. Long-scroll layout with alternating dark/cream sections, crow rows, border-grid metrics, Fraunces italic pullquotes, scroll progress bar in header. All modals (AmveroModal, SimulationModal), overlays (RoiOverlay, ImageOverlay), and mobile layouts are production-ready. Caveman token compression is active globally — full mode, always-on from session start. Both repos are clean and up to date.

## Last completed

- 2026-06-08: Installed Caveman globally — full mode set as permanent default via `~/.config/caveman/config.json`, auto-activates every session via SessionStart hook. cavecrew-* sub-agents (investigator/builder/reviewer) available for token-efficient sub-tasks.
- 2026-06-08: Audited and fixed all stale `/home/michaek/` paths across both repos (`AGENTS.md`, `setup-global-claude.sh`, scratch scripts, planning docs) for WSL2 environment. Both repos committed and pushed.
- 2026-06-08: Pushed complete redesign to official repo and deployed to `themishka.me`. BRIEF.md and STATUS.md in official repo updated to match current design.
- 2026-06-08: Added ImageOverlay (hero image lightbox) and RoiOverlay (Credit Pricing Model, zoomable). Made all doc chips readable at rest (`text-ink-soft`). Removed ROI tab from SimulationModal, rewrote PM contribution copy.
- 2026-06-08: Rewrote HowIWork (02) section — four cards with first-person AI-impact framing tied to named projects. Removed marketing language.

## In progress

Nothing. Clean state.

## Next up

- Run `/caveman-compress` on `~/.claude/CLAUDE.md` and memory files to reduce input tokens per session (~46% savings)
- Review `themishka.me` on a real mobile device
- Consider adding Credit Pricing Model as a tab inside AmveroModal

## Decisions log

- **Caveman full mode always-on**: Compression active from first message every session via SessionStart hook. Default locked to `full` in `~/.config/caveman/config.json` so it survives tool updates. cavecrew-* agents used for sub-tasks (investigator=Haiku read-only, builder=Sonnet 1-2 file edits, reviewer=Haiku diff review).
- **caveman-shrink not configured**: Installed as MCP proxy but left unwrapped — no MCP servers currently returning verbose output worth compressing.
- **Themishka layout over bento grid**: Replaced expand-in-place bento with linear long-scroll. Sections alternate dark/cream. Cleaner for recruiters who scan vertically.
- **Forest green `#16a34a` accent**: Pairs with cream without gold's corporate-finance connotation.
- **Custom cursor removed**: Visual gimmick with no recruiter value.
- **ROI tab removed from SimulationModal**: AMVero pricing content misplaced in Simulation case study. Now lives in its own `RoiOverlay` with zoom controls.
- **HowIWork copy rule**: Cards must name the specific project and outcome — not generic AI productivity claims.
- **Official repo deploy path**: Dev work in `ClaudeCode-portfolio-dev`. To ship: copy `app/` and `public/artifacts/` to `michael-korenevsky-portfolio`, commit, push. Vercel auto-deploys via GitHub.

## Next session starter

```
This is Michael's PM portfolio (Next.js 16 + Tailwind CSS v4, deployed to themishka.me).
Dev repo: /home/korm85/projects/ClaudeCode-portfolio-dev
Official repo: /home/korm85/projects/michael-korenevsky-portfolio (github.com/korm85/michael-korenevsky-portfolio)

What was done last session (2026-06-08):
- Caveman token compression installed globally — full mode, always-on from session start
- cavecrew-* sub-agents available (investigator/builder/reviewer) for token-efficient tasks
- All stale /home/michaek/ paths fixed across both repos for WSL2 environment
- Themishka redesign is live on themishka.me — no portfolio code changed this session

Design tokens in app/globals.css under @theme {}.
Key tokens: bg-canvas (#1b1916), bg-paper (#f3efe6), bg-paper-2 (#ebe5d8), text-accent (#16a34a).

Constraints to carry forward:
- All experimental work stays in ClaudeCode-portfolio-dev
- To ship to themishka.me: copy app/ and public/artifacts/ to official repo, commit, push
- No em dashes in body copy
- Simulation is physics-based — never call it AI
- Doc chips must use text-ink-soft minimum at rest (not text-ink-faint)
- Read BRIEF.md in official repo before any UI/design changes

Next tasks (in order):
- Run /caveman-compress on ~/.claude/CLAUDE.md and memory files (46% input token savings)
- Mobile review of themishka.me on real device
- Any feedback-driven changes from sharing the site
```
