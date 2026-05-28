# Portfolio Project Status

## Current state
Portfolio site is a complete light-theme redesign ("Stitch design"). The dark teal canvas has been replaced with a Modern Minimalist Corporate Precision aesthetic: `#f7f9fb` background, primary blue (`#004ac6`), Space Grotesk headlines, Roboto Flex body, JetBrains Mono labels. All components — hero, work cards, HowIWork, CareerTimeline, ContactSection, modals, and RoiCalculator — are fully reskinned to the new design system. The AmveroPrototype intentionally retains its dark industrial UI (simulates the actual product). Content and PM attribution copy is unchanged.

## Last completed
- 2026-05-28: Full Stitch design implementation — complete dark→light reskin across all components using Space Grotesk + Roboto Flex + JetBrains Mono, primary blue `#004ac6`, white/`#f7f9fb` surfaces, `#E2E8F0` borders.
- 2026-05-27: Session-wrap infrastructure — created `/done` skill and PostToolUse hook in global settings.json; hook injects WRAP_TRIGGER into model context after any `vercel --prod` deploy so STATUS.md is always updated before the session closes.
- 2026-05-27: Initialized memory system — MEMORY.md index + 4 memory files: PM copy voice rules, copy transformation context, Michael's PM profile, and reference to `docs/product-case-studies.md` as the authoritative metrics/customer data source.
- 2026-05-27: PM copy transformation — rewrote work cards, timeline, AmveroModal PM contribution, and HowIWork cards to attribute outcomes to Michael's decisions. Added `Decision` union type with inline doc-ref badges. Fixed doc badge grid alignment, removed all em dashes.
- 2026-05-27: AMVero card 4th decision (credit pricing + ROI Optimizer badge) + Simulation three-module story (Thermal→Mechanical→Thermo-mechanical). ROI Optimizer moved from Simulation CTA to AMVero.

## In progress
Nothing. Clean state.

## Next up (in order)
Nothing. Awaiting Michael's direction.

## Decisions log
- **Stitch Design System**: Replaced dark teal theme (`#0a0a0a` canvas, `#5eead4` accent) with light corporate blue (`#f7f9fb` canvas, `#004ac6` primary). Typography swapped from Poppins/Hepta Slab to Space Grotesk (headlines) + Roboto Flex (body) + JetBrains Mono (labels).
- **AmveroPrototype stays dark**: The interactive prototype intentionally retains its dark industrial UI with hardcoded hex values — it simulates the actual AMVero product (which is dark-themed enterprise software). Changing it to light would make it look inauthentic.
- **RoiCalculator reskinned to light**: Unlike the prototype, the ROI calculator is a portfolio-owned tool (not a product simulation), so it follows the new light theme.
- **Session-End Hooks**: Two triggers for session wrap-up: (1) PostToolUse Bash hook detects `vercel --prod` and injects WRAP_TRIGGER context; (2) `/done` skill runs the full checklist (STATUS update + next-session starter + optional deploy). Hook lives in `~/.claude/settings.json` (global); skill lives in `.claude/skills/done/SKILL.md` (project).
- **Memory System Bootstrap**: Created `~/.claude/projects/.../memory/` with MEMORY.md index and 4 typed memory files. All future sessions start with PM copy voice rules, project context, and the authoritative data source pre-loaded.
- **PM Attribution Copy Pattern**: Rewrote metrics with attribution clauses ("achieved by designing X") so each number is causally linked to a Michael decision, not just associated with the product.
- **Decision→Doc Visual Link**: Extended `Decision` type to `string | { text, docLabel?, docUrl? }` — renders an inline `[doc ↗]` badge at bullet end, creating a direct visual connection between a decision and its proof artifact.

## Next session starter

```
This is Michael's PM portfolio site (Next.js + Tailwind, deployed to Vercel dev project).
It was fully reskinned this session (2026-05-28) from a dark teal theme to the Stitch design:
light corporate blue aesthetic, Space Grotesk + Roboto Flex + JetBrains Mono fonts.

What was done last session (2026-05-28):
- Complete Stitch design implementation: dark→light reskin across ALL components
- New color system: #f7f9fb canvas, #004ac6 primary blue, #E2E8F0 borders, white cards
- New fonts: Space Grotesk (headlines/display), Roboto Flex (body), JetBrains Mono (labels)
- AmveroPrototype kept dark intentionally (simulates real product UI)
- RoiCalculator reskinned to light (portfolio-owned tool, not a product simulation)

Key files:
- app/globals.css — new @theme tokens (light palette, new font CSS vars)
- app/layout.tsx — Space_Grotesk + Roboto_Flex + JetBrains_Mono imports
- app/page.tsx — hero section (light, no custom cursor, blue primary CTAs)
- app/components/*.tsx — all reskinned to light theme
- docs/product-case-studies.md — authoritative source for ALL metrics and customer names

Design reference: docs/Stitch design/product_strategy_framework/DESIGN.md

Constraints to carry forward:
- NEVER deploy to /home/michaek/ClaudeCode-portfolio (official site) — only this dev repo
- No em dashes anywhere in copy
- Oqton is the employer/builder, never a customer in "Shipped to" lists
- Before any UI/copy change: invoke portfolio-design-system and portfolio-copy-voice skills
- Before referencing customer names or metrics: invoke ip-handling skill

Nothing is actively in progress. Next work is open — await Michael's direction.
```
