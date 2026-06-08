# Portfolio Project Status

## Current state

Full Themishka-inspired redesign live on `themishka.me`. Dark canvas (`#1b1916`), cream paper (`#f3efe6`), forest green accent (`#16a34a`). Fraunces display serif, Hanken Grotesk body, JetBrains Mono labels. Long-scroll layout with alternating dark/cream sections, crow rows, border-grid metrics, Fraunces italic pullquotes, scroll progress bar in header. All modals (AmveroModal, SimulationModal), overlays (RoiOverlay, ImageOverlay), and mobile layouts are production-ready. New `/portfolio` internal page replaces the Google Drive PDF link — styled to match the site, covers work, AI practice, and career timeline. Resume link removed from contact section. Caveman token compression active globally, full mode always-on.

## Last completed

- 2026-06-08: Added styled `/portfolio` page — internal route replacing the Google Drive PDF link. Matches site design system (dark/cream sections, crow rows, border-grid metrics). Updated ContactSection to link there.
- 2026-06-08: Removed Resume link from ContactSection — portfolio is better proof than a static resume.
- 2026-06-08: Replaced profile photo with new headshot (`OfficialProfile.jpg`) in both repos.
- 2026-06-08: Installed Caveman globally — full mode set as permanent default via `~/.config/caveman/config.json`, auto-activates every session via SessionStart hook.
- 2026-06-08: Audited and fixed all stale `/home/michaek/` paths across both repos for WSL2 environment. Added ImageOverlay, RoiOverlay, rewrote HowIWork and SimulationModal PM copy.

## In progress

Nothing. Clean state.

## Next up

- Run `/caveman-compress` on `~/.claude/CLAUDE.md` and memory files to reduce input tokens per session (~46% savings)
- Review `themishka.me` on a real mobile device
- Any feedback-driven changes from sharing the site

## Decisions log

- **Portfolio page over PDF link**: Replaced Google Drive PDF in ContactSection with an internal `/portfolio` route. A styled page reads better than a raw Drive doc and keeps visitors on-site.
- **Resume removed from contact**: Single resume doesn't adapt per role — portfolio is stronger proof. Removing it avoids a weak signal.
- **Caveman full mode always-on**: Compression active from first message every session via SessionStart hook. Default locked to `full` in `~/.config/caveman/config.json`. cavecrew-* agents used for sub-tasks.
- **ROI tab removed from SimulationModal**: AMVero pricing content misplaced in Simulation case study. Now lives in its own `RoiOverlay` with zoom controls.
- **HowIWork copy rule**: Cards must name the specific project and outcome — not generic AI productivity claims.
- **Official repo deploy path**: Dev work in `ClaudeCode-portfolio-dev`. To ship: copy `app/` and `public/artifacts/` to `michael-korenevsky-portfolio`, commit, push. Vercel auto-deploys via GitHub.

## Next session starter

```
This is Michael's PM portfolio (Next.js 16 + Tailwind CSS v4, deployed to themishka.me).
Dev repo: /home/korm85/projects/ClaudeCode-portfolio-dev
Official repo: /home/korm85/projects/michael-korenevsky-portfolio (github.com/korm85/michael-korenevsky-portfolio)

What was done last session (2026-06-08):
- Added styled /portfolio page at app/portfolio/page.tsx — internal route replacing Google Drive PDF link
- Updated ContactSection: removed Resume entry, changed "Portfolio PDF" to link to /portfolio
- Replaced profile photo with OfficialProfile.jpg in both repos
- Pushed all changes to official repo → live on themishka.me

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
