# DESIGN.md — Agung Nitya Landing Page

> Single source of truth. Every implementation decision must trace back to this file.
> If this file and the code disagree, this file wins (or this file gets updated first).

---

## 0. Priority order (conflict resolution)

1. Product clarity
2. Brand credibility
3. Spatial storytelling
4. Typography
5. Composition
6. Motion
7. Decorative effects

If an effect reduces readability, trust, or performance, the effect loses.

---

## 1. Product & audience

- **Product:** Agung Nitya — web-based Hospital Management Information System (SIMRS).
- **Audience:** hospital directors, heads of IT, healthcare facility decision-makers in Indonesia.
- **Primary goal:** understand the product → trust the brand → book a demo.
- **Language:** Indonesian copy; professional, calm, reassuring. No hype, no jargon walls, no unverifiable claims.

---

## 2. Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router), strict TypeScript |
| 3D | React Three Fiber + drei + three |
| Scroll story / camera / 3D transforms | GSAP + ScrollTrigger |
| UI micro-interactions only | Framer Motion |
| Smooth scrolling | Lenis, driven by `gsap.ticker`, synced to ScrollTrigger |
| Styling | Tailwind CSS v4 (tokens in `@theme`) |
| Form | React Server Action + `useActionState` (works without JS) |

**Architecture rule:** one component per file. Separate folders for `scene/`, `sections/`, `hooks/`, `data/`.

---

## 3. Color tokens

Token names below are the Tailwind v4 utility names defined in `app/globals.css` (e.g. `bg-canvas`, `text-ink`, `border-rule`).

| Token | Brief name | Hex | Use |
|---|---|---|---|
| `canvas` | Deep Canvas | `#0B0B0D` | Page background, scene clear color |
| `graphite` | Graphite Surface | `#151518` | Cards, raised surfaces |
| `surface` | Dark Surface | `#1D1D21` | Inputs, hover surfaces |
| `rule` | Structural Border | `#34312D` | Hairlines, dividers, outlines |
| `muted` | Muted Text | `#9B9892` | Secondary text (on canvas ≈ 6.8:1, AA) |
| `ink` | Primary Text | `#F1EEE8` | Primary text (on canvas ≈ 17:1, AA) |
| `blue` | Healthcare Blue | `#5B7CFF` | **The only accent.** CTAs, focus rings, active states, one 3D accent seam |

Rules:
- Blue covers < 5% of any viewport. Never used as a large fill or a glow.
- No second accent color. Error state uses `text` + an icon + copy; the red tint `#E5484D` is allowed **only** for form error text/borders, as a functional status color, not a brand accent.
- Blue text on canvas only at ≥ 14px / weight 500 (≈ 5.4:1, AA).
- **Primary buttons:** blue fill with `canvas` text (≈ 5.4:1). Never `ink` on blue (≈ 3.1:1, fails AA).

---

## 4. Typography

- **Headings:** Söhne Breit, weight ≤ 500. Currently **Space Grotesk 500** (no license yet), self-hosted via `next/font`. The family is defined only in `lib/fonts.ts`; swapping to Söhne Breit is a one-file change.
- **Body:** Inter 400/500.
- **Minimum content size:** 14px. Labels/eyebrows may be 12px only when uppercase, tracked, and non-essential.
- Scale (fluid `clamp`): display 44→88px, h2 32→56px, h3 20→24px, body 16→18px, small 14px.
- Headings: tight leading (1.02–1.1), slight negative tracking (-0.02em). Body leading 1.6, max line length ~64ch.
- One `<h1>` (hero). Each section has one `<h2>`; sub-items use `<h3>`.

---

## 5. Visual reference & tone

Quality bar: **Oryzo (oryzo.ai)** — tangible, textured 3D objects, cinematic lighting, smooth camera, generous negative space, confident type. Emulate the quality, never the design.

**Forbidden:** cyberpunk, neon, holograms, Web3/gaming vibes, heavy glassmorphism, excessive particles or bloom, stock photos of doctors/hospitals.

Composition:
- Text and 3D share the frame; text never sits on top of busy geometry — the camera frames the object to the opposite side of the copy.
- Generous negative space; one idea per viewport.
- Hairline borders (`border`) over shadows for UI surfaces.

---

## 6. 3D concept — "Unified Hospital Data System"

One persistent R3F scene, fixed behind the content. No video, no portal/canvas masks.

### 6.1 Objects

| Object | Form | Rationale |
|---|---|---|
| **Data core** | Stacked, bevelled cylinders (3 platters) in warm satin ceramic, with one thin blue seam ring between platters | Reads as "one database" without literal DB icons; the single blue seam is the brand accent made physical. |
| **9 module tiles** | Identical rounded slabs (1.0 × 1.0 × 0.24, bevel 0.08) in graphite anodized metal; each carries a debossed, simple glyph built from primitives | Identical proportions = "one system"; the glyph is the only variation, so modules stay consistent and comparable. |
| **Connections** | Thin satin tubes (curved, low arc) from each tile to the core, with a slow, small light pulse travelling along them | Physical cables feel tangible and credible; a pulse explains "data flows" without particles. |
| **Ground** | No visible floor; soft contact shadow only | Keeps negative space and grounds the objects. |

Modules: Registration (Pendaftaran), Outpatient (Rawat Jalan), Inpatient (Rawat Inap), Pharmacy (Farmasi), Laboratory (Laboratorium), Radiology (Radiologi), EMR (Rekam Medis Elektronik), Billing (Billing & Klaim), Asset & Logistics (Aset & Logistik).

### 6.2 Materials & light

- `MeshPhysicalMaterial` / `MeshStandardMaterial` only. Roughness 0.35–0.6, metalness 0–0.6. No unlit or flat materials.
- Subtle procedural micro-roughness texture (small generated texture, no download) to avoid cheap-plastic uniformity.
- Environment: drei `<Environment>` built from in-scene `<Lightformer>`s (soft studio, no HDR file download).
- Key light (warm, upper-left) + rim light (cool, behind) + low fill. Soft shadows, contact shadow baked once.
- Tone mapping: ACES Filmic, sRGB output. **No bloom.** SSAO only if contact shading is visibly missing (default: off).

### 6.3 Motion rules

- Camera easing: `power3.inOut` / `expo.inOut`; values damped every frame (no snapping).
- Idle: ±0.04 units float, ≤ 2° rotation, periods 6–10s, desynchronized per tile.
- Pointer response on the whole system (desktop only): max rotateX ±1.5°, rotateY ±2°, heavily damped. Never chases the cursor.
- Every stage transition must read as narrative (cause → effect), not objects relocating.
- Camera vocabulary: slow dolly, subtle orbit, controlled zoom. Never: spinning, shake, extreme FOV changes.
- Fragmentation reads through physical separation only: no red states, alarms, or flashing.

### 6.4 Motion tokens (migrated from the former MOTION.md)

| Token | Duration | Use |
|---|---|---|
| instant | 0.15s | Icon / micro feedback |
| fast | 0.25–0.35s | Buttons, hover |
| normal | 0.6s | UI reveal |
| slow | 0.9s | Section content |
| cinematic | 1.2–1.8s | Major visual movement |
| spatial | 2–4s (or scrubbed) | 3D camera / object movement |

- UI easing: `cubic-bezier(0.22, 1, 0.36, 1)` ≈ GSAP `power3.out`. No bounce, elastic, or back easing anywhere.
- Reveals: opacity 0→1 + translateY 24–32px, trigger at ~18% into the viewport, 0.6–0.8s, stagger 0.06–0.1s, play once. One reveal per visual group, not per element.
- Hero text sequence: eyebrow → headline → body → CTAs, 80–120ms apart. The h1 is visible in SSR HTML (reveal is a transform/opacity enhancement only, never `visibility: hidden` before JS).
- Buttons: hover scale ≤ 1.03 / y −1px, active 0.98, 0.25–0.3s. No glow, no default magnetic effect.
- Cards: hover y −4px (scale ≤ 1.02), 0.3s.
- Navigation: transparent at top; after ~80px gains `canvas`/90% fill + hairline border, 0.4–0.6s. No dramatic slide.
- Pinned scenes use `scrub: 1`; pins release promptly, never trap scrolling.

### 6.5 Library ownership

| Library | Owns |
|---|---|
| R3F / three | Rendering, materials, lighting, idle motion |
| GSAP + ScrollTrigger | Scroll storytelling, pins, camera and 3D stage progress, text reveals |
| Framer Motion | UI micro-interactions only (hover, menu, accordion, form states) |

Rule: GSAP and Framer Motion never animate the same property of the same element.

### 6.6 Responsive & reduced motion

- Tablet/mobile: shorter camera paths, shorter pins, same objects (concept must survive simplification).
- Reduced motion: no camera travel, no pins, no smooth scroll, no idle rotation; opacity-only transitions ≤ 250ms.

---

## 7. Scroll stages (choreography)

Total scroll length: **8–10 viewports.**

| # | Section | Stage | What happens in 3D | Narrative meaning |
|---|---|---|---|---|
| 1 | Hero | **Unified** | Tiles in a calm ring, cables connected, pulses flowing, camera ¾ high angle | "Everything already works as one." |
| 2 | Problem | **Fragmentation** | Cables retract, pulses stop, tiles drift outward and tilt at different angles, core dims slightly | "This is what disconnected systems feel like." |
| 3 | Solution | **Reconnection** | Tiles glide back in sequence, cables re-extend one by one, the blue seam brightens as the last one connects | "Agung Nitya brings it back together." |
| 4 | Modules | **Exploration** (pinned) | Camera visits 3 groups in turn — **Klinis** (Rawat Jalan, Rawat Inap, Rekam Medis Elektronik), **Penunjang** (Farmasi, Laboratorium, Radiologi), **Administrasi** (Pendaftaran, Billing & Klaim, Aset & Logistik). Active tile lifts and turns to camera; hover/click reveals function. All 9 modules are always visible and clickable (3D + HTML buttons). | "Here is what each part does." |
| 5 | Process | **Process** | Tiles align into an ordered line/arc; a single pulse walks along it step by step | "Implementation is orderly and predictable." |
| 6 | Trust | **Trust** | Camera pulls back; a thin protective ring/shell outline settles around the core | "Your data is contained and protected." |
| 7 | FAQ → CTA | **Final** | Scene returns to the unified composition, slower idle, camera at rest | "Calm, complete, ready." |

---

## 8. Sections (content)

Required, in order: Hero · Problem · Solution · Modules (9) · Implementation Process · Security & Data Privacy · FAQ · CTA (demo form) · Footer.

- **CTA form fields:** Nama, Institusi, Jabatan, Email atau WhatsApp, Kebutuhan. Client + server validation, inline errors, success and error states. Not a mailto link. Server Action validates, then POSTs to `DEMO_WEBHOOK_URL` (console log in development); honeypot field + simple rate limit.
- **Implementation process (4 steps):** 01 Assessment · 02 Migrasi Data · 03 Pelatihan Tim · 04 Go-Live & Pendampingan.
- **No unverified claims:** no statistics, client names, awards, or certifications that the company has not provided. Compliance copy describes capabilities/approach (e.g. alignment with Kemenkes RME regulation, SATUSEHAT integration readiness) only as "designed to support", pending confirmation from Agung Nitya.
- All content is server-rendered HTML; the 3D scene is an enhancement, never the only carrier of information.

---

## 9. Performance budget

- LCP < 2.5s (LCP element is the hero `<h1>`, never the canvas).
- 60fps mid-range laptop; stable 30fps mid-range phone.
- 3D scene lazy-loaded after first paint; DPR cap 1.5 on mobile (2 desktop).
- Render loop paused when canvas is off-screen or tab hidden.
- Assets compressed (Draco/Meshopt geometry, KTX2 textures) **where external assets exist**; the default is procedural geometry with zero 3D downloads.
- Loader never blocks the page > 1s; without JS the page is fully readable.

---

## 10. Accessibility & robustness

- `prefers-reduced-motion`: no camera travel, no smooth scroll; scene shows static stage states with simple fades. All content readable.
- 2D/static fallback (SVG system diagram) when WebGL is unavailable or the device is weak.
- Full keyboard navigation, visible focus rings (2px `blue`, 2px offset). Closed mobile menu is `inert`.
- Decorative elements `aria-hidden`. Touch targets ≥ 44px.
- One `h1`, correct heading hierarchy, WCAG AA contrast.
- Resizing desktop ↔ mobile must not crash: ScrollTrigger, GSAP contexts, R3F, Lenis and listeners are all cleaned up.
