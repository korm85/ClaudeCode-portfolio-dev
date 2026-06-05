# Portfolio Redesign — Option A: Impact-First Compact Hero

Date: 2026-06-05

## Goal
Replace the current text-heavy layout with an imagery-led, impact-first design. First viewport sells Michael. Product cards visible without scrolling. Full mobile/desktop parity.

## Hero (~45-50vh desktop, natural height mobile)

Single column, centered, max-width 800px.

Order:
1. Eyebrow: `Senior PM · Oqton · AI Platform` — 12px mono, uppercase, letter-spacing 0.05em, muted
2. Name: `Michael Korenevsky` — large display font, prominent
3. Value sentence: `I turn AI capability into products where reliability matters.` — 2xl, lighter weight
4. CTA row: `View Work` (filled primary) + `Get in Touch` (outline) — two buttons only
5. No photo, no credential tags, no CV/LinkedIn links in hero body

CV download + LinkedIn move to header nav (right side, persistent).

## Client Strip (between hero and first product card)

Single line: `Shipped to: Baker Hughes · Thales · Elos Medtech · Beehive`
Subtle, muted, 11px mono. Establishes credibility at the moment the user is about to see the work.

## Product Cards (vertical stack, two cards)

Each card: image 60% / text+metrics 40% on desktop. Stacks to image-top / text-below on mobile.

**AMVero card:**
- Image: `amvero-product.png` (dashboard screenshot) — full-width within image column, rounded corners
- Text: product name, one-sentence objective, 2-3 key metrics, CTA to modal

**Simulation card:**
- Image: `simulation-knauf-fit.png` (Knauf before/after) — best communicates the outcome story
- Text: product name, one-sentence objective, 2-3 key metrics, CTA to modal

Image alternates sides on desktop (AMVero: image left; Simulation: image right) for visual rhythm.

## Remaining Sections

AI Practice, Career Timeline, About, Contact — all retained. Spacing tightened. No content removed.

## Mobile

Identical content order. No hidden elements. Single column throughout. CTA buttons stack vertically if needed. Image always above text in product cards.

## What's removed from current design

- Profile photo from hero (moves to About section)
- Credential tags from hero (covered by value sentence + client strip)
- CV/LinkedIn from hero body (moved to header nav)
- Three layout variations (A, B, C pages) — can be deleted after this ships
