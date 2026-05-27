---
name: project_copy_transformation_2026_05_27
description: "The PM copy transformation completed 2026-05-27 — what changed, why, and what patterns it established"
metadata: 
  node_type: memory
  type: project
  originSessionId: b8eac168-cf05-4277-bc5b-99435d06df1d
---

On 2026-05-27 the entire portfolio copy was rewritten from product-marketing language to PM-attribution language. Every work card, timeline entry, modal overview, and HowIWork card was touched.

**Why:** A Head-of-PM review pass found that the site described what products do rather than what Michael decided and why. The "PM contributions" were buried or generic.

**How to apply:** Any new copy added to the site should follow the Decision→Outcome→Attribution pattern. When adding a new card, artifact, or timeline entry: ask "does this tell you what Michael chose and why, or just what was built?"

Key patterns established:
- `Decision` type in `SelectedWork.tsx` supports `{ text, docLabel?, docUrl? }` to render inline `[doc ↗]` badges — use this whenever a decision bullet has a proof artifact
- Simulation card: Thermal→Mechanical→Thermo-mechanical progression is the canonical story; do not collapse it to a single outcome
- AMVero card: credit-based pricing + ROI Optimizer badge is the 4th decision; ROI Optimizer belongs to AMVero, not Simulation
- "Shipped to" in hero: Oqton is the builder, never a customer — only Baker Hughes, Thales, Elos Medtech, Beehive

See also: [[feedback_pm_copy_voice]]
