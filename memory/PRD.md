# Birthday Memory Book — Rishii ♥ Mahendra

## Original Problem Statement
A stunning romantic single-page web app for Rishii's birthday (June 18).
- Phase 1 (Entrance): Pulsing heart button → sunflower bloom splash with falling golden petals → brand fade-in (background transitions black → warm cream).
- Phase 2 (Memory Book): An elegant virtual book with realistic 3D page-flip and 6 pages (cover + 5 chapters).
- Personalized for: Rishii (recipient) and Mahendra (sender).
- Includes vintage parchment love letter modal and confetti on the final page.

## User Personas
- **Mahendra** (sender): wants to surprise his girl with a deeply personal birthday experience.
- **Rishii** (recipient): opens the link on her birthday and walks through the love story.

## Architecture (frontend-only)
- React 19 + Tailwind + custom CSS keyframe animations.
- No backend logic required (FastAPI + Mongo are untouched / still healthy).
- Files added under `/app/frontend/src/`:
  - `App.js` — top-level phase controller.
  - `App.css` — full design system: colors, typography, animations.
  - `components/Splash.jsx` — pulsing heart intro + sunflower bloom + falling petals + brand fade-in.
  - `components/MemoryBook.jsx` — 3D page-flip book on desktop, vertical scrapbook on mobile.
  - `components/LoveLetter.jsx` — vintage parchment letter modal with personalized signature.
  - `components/Confetti.jsx` — celebration confetti on final wish page.

## Core Requirements (static)
- Pastel intro with pulsing pink heart button + "A little surprise for Rishii" caption.
- Animated sunflower (16 golden→amber petals + brown seed-textured center) blooming from black to warm cream.
- 26 falling golden petals drifting at randomized durations.
- 6 book pages: Cover · Childhood Roots · The Proposal (March 12) · Our Rare Moments (2 polaroid placeholders) · Vintage Love Letter pocket · Final Wish (June 18) with confetti.
- Letter modal opens on click, uses Dancing Script + Monsieur La Doulaise for signature.
- Mobile: vertical scrolling scrapbook for legibility.
- Typography: Playfair Display (headings), Cormorant Garamond (body), Dancing Script (script), Monsieur La Doulaise (signatures).
- Palette: cream `#FFF8E7`, dusty rose `#C99B8E`, gold `#C9A24E`, golden yellow `#FFD700`, deep amber `#FF8C00`.

## What's Been Implemented — 2026-02-15
- [x] All 3 phases (heart → splash → book) with smooth transitions.
- [x] **Realistic photo flower burst splash**: bright golden flash at center, then 70 actual sunflower/yellow-rose/white-rose photographs explode outward in tight 1.4s burst, then sway gently. Photos preloaded during heart phase for instant burst.
- [x] **Vintage brown leather diary cover** (rich brown gradients, gold inner borders, leather grain shading).
- [x] **White grid background** (110×110px grid) with realistic yellow rose & sunflower photographs scattered on both sides.
- [x] 3D page-flip book (rotateY -180deg around left edge, z-index stacking).
- [x] Realistic vintage letter modal with full personalized content (My Dearest Rishii … Yours always, Mahendra).
- [x] Confetti on final wish page (~70 multi-color pieces).
- [x] Polaroid-style photo placeholders ("your photo here") with rotated frames and Dancing Script captions.
- [x] Mobile responsive vertical scrapbook (≤768px).
- [x] All interactive elements have unique `data-testid` attributes.
- [x] Verified via Playwright screenshots end-to-end.

## Prioritized Backlog
- P1: Upload real photos for Meeting #1 and Meeting #2 (currently elegant placeholders).
- P2: Optional ambient music with mute toggle (currently silent per Mahendra's preference).
- P2: A short personalized intro audio or AI-narrated voice letter.
- P3: Shareable link that prefills custom names (turn this into a reusable gift template).

## Next Action Items
- Provide 2 photos (any aspect ratio close to 5:6) to replace the placeholders on Page 3.
- Optionally tweak the letter text or signature wording.
