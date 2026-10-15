# DESIGN.md — PT Agung Wijaya Nitya Landing Page

> Single source of truth. Every implementation decision must trace back to this file.
> If this file and the code disagree, this file wins (or this file gets updated first).
>
> **This file replaces the former SIMRS / "Unified Hospital Data System" version, and the former dark theme.**
> Those concepts are dropped. Do not reintroduce hospital-system content, modules, copy, or dark-theme tokens.

**Theme: light.** White, airy, product-page feel (in the spirit of Apple's product pages: large type, generous whitespace, one hero object). Emulate the principles only. Do not copy Apple's layouts, assets, fonts, or wording.

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

## 1. Company & audience

- **Company:** PT Agung Wijaya Nitya, a limited liability company (Perseroan Terbatas) in Kab. Badung, Bali.
- **Positioning:** procurement partner for information-system solutions and IT equipment for institutions.
- **Audience:** government procurement officers (PPK, pejabat pengadaan) and institution admins who find providers through INAPROC.
- **Primary goal:** confirm the provider is real and active → understand what they offer → make contact.
- **Language:** Indonesian copy; professional, calm, factual. No hype, no jargon walls, no unverifiable claims.

### 1.1 Verified facts (the only facts that may appear as claims)

| Fact                                                                                                                                                                                                              | Source / note                                                                          |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Active provider on INAPROC Katalog Elektronik, provider type UMKK, Kab. Badung                                                                                                                                    | https://katalog.inaproc.id/agung-wijaya-nitya                                          |
| 742 products listed in the catalog (as of 15 Oct 2026)                                                                                                                                                            | Keep as a constant in `src/content/site.ts` with a comment: "re-verify before release" |
| Services stated on the company's own site: system building, system implementation, system reverse-engineering                                                                                                     | Company site                                                                           |
| One listed software product: "SIMDINKES Layanan Manajemen dan SDM Kesehatan"                                                                                                                                      | Mention only as one listed product, never as a general capability claim                |
| Registered business fields (KBLI): software and IT services; computer and electronics trade; repair; general wholesale (including laboratory and medical equipment); equipment rental; consulting and advertising | INAPROC "Daftar KBLI" tab. KBLI shows registered scope, not proof of activity          |
| Email: info@agungwijayanitya.com. Phone number: placeholder (TODO)                                                                                                                                                | Company site                                                                           |

### 1.2 Forbidden claims and assets

- No "verified on PaDi UMKM", "registered on LPSE", "BUMN vendor", or tender wins. No proof exists yet. Only INAPROC may be named.
- No invented client counts, client names, testimonials, institutions served, sales figures, awards, or certifications.
- No brand names or logos (Sony, HID, Krisbow, Behringer, etc.) and no product photos copied from INAPROC.
- No INAPROC logo; use the plain text "INAPROC Katalog Elektronik" (TODO: check brand rules before using the logo).
- No hospital or doctor imagery. Do not use the word "SIMRS" in titles, headings, or metadata.

---

## 2. Stack

| Concern                               | Choice                                                    |
| ------------------------------------- | --------------------------------------------------------- |
| Framework                             | Next.js 16 (App Router), strict TypeScript                |
| 3D                                    | React Three Fiber + drei + three                          |
| Scroll story / camera / 3D transforms | GSAP + ScrollTrigger                                      |
| UI micro-interactions only            | Framer Motion                                             |
| Smooth scrolling                      | Lenis, driven by `gsap.ticker`, synced to ScrollTrigger   |
| Styling                               | Tailwind CSS v4 (tokens in `@theme`)                      |
| Form                                  | React Server Action + `useActionState` (works without JS) |

**Architecture rules:** one component per file. Separate folders for `scene/`, `sections/`, `hooks/`, `data/`. All copy, pillar order, links, and constants live in `src/content/site.ts` so emphasis can change without redesign.

---

## 3. Color tokens (light)

Token names below are the Tailwind v4 utility names defined in `app/globals.css` (e.g. `bg-canvas`, `text-ink`, `border-rule`). **These replace all former dark tokens** (`graphite`, `blue`, `#0B0B0D`, etc.). Search the codebase and remove them.

| Token           | Name               | Hex       | Use                                                                                                                                                            |
| --------------- | ------------------ | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `canvas`        | Canvas             | `#FFFFFF` | Page background                                                                                                                                                |
| `wash`          | Wash               | `#F5F5F7` | Alternating section background, cards                                                                                                                          |
| `surface`       | Surface            | `#E8E8ED` | Input fills, hover surfaces, skeletons                                                                                                                         |
| `rule`          | Hairline           | `#D2D2D7` | Dividers, outlines                                                                                                                                             |
| `muted`         | Muted Text         | `#6E6E73` | Secondary text (≈ 5:1 on `canvas`, ≈ 4.6:1 on `wash`, AA)                                                                                                      |
| `ink`           | Primary Text       | `#1D1D1F` | Primary text (≈ 16:1 on `canvas`, AA)                                                                                                                          |
| `accent`        | Brand Blue         | `#0B6BAE` | Primary brand color, sampled from the company logo (approximate). Buttons, links, active states, focus rings, 3D accent LED (≈ 5.6:1 on `canvas`, AA for text) |
| `accent-strong` | Brand Blue (hover) | `#095A94` | Hover and pressed state of `accent`                                                                                                                            |
| `on-accent`     | On Accent          | `#FFFFFF` | Text on `accent` fills (≈ 5.6:1, AA)                                                                                                                           |
| `error`         | Error              | `#C9272D` | Form error text and borders only (≈ 5.5:1 on `canvas`)                                                                                                         |

Rules:

- Contrast figures are approximate; confirm with a contrast checker. If the company supplies official brand values, replace `accent` and re-check every ratio.
- One brand hue only (the blue). No second accent color.
- Accent stays small: buttons, links, focus, one LED. Never a large fill, gradient, or glow, except the primary button fill itself.
- Alternate `canvas` and `wash` between sections to create rhythm instead of borders or heavy shadows.
- `error` is a functional status color, always paired with an icon and copy, never decorative.

### 3.1 Logo

- The logo is a circular emblem: blue and white, with the company name on the upper arc, the tagline "Unlocking Innovation, Empowering Possibilities" on the lower arc, and an abstract wing/wave mark in the center.
- Its white background matches `canvas`, so it sits directly on the page. On `wash` sections, crop it to a circle (`border-radius: 50%`) so no white square shows.
- The supplied file is a 204 × 204 px PNG, so use it only at small sizes (navbar, footer, favicon source) until a vector or high-resolution version arrives. Do not upscale it.
- Do not recolor, stretch, or add effects to the logo. The tagline may appear in the footer as written (English).
- The wing/wave mark may inspire UI curves, but never trace or copy it into the 3D device.

---

## 4. Typography

- **Headings and body:** Inter, self-hosted via `next/font`. Headings weight 600, body 400/500. The family is defined only in `lib/fonts.ts`, so swapping to a licensed display face later is a one-file change. (Inter is used instead of Space Grotesk because its neutral, system-like letterforms suit the clean product-page look.)
- **Minimum content size:** 14px. Labels/eyebrows may be 12px only when uppercase, tracked, and non-essential.
- Scale (fluid `clamp`): display 48→96px, h2 32→60px, h3 20→28px, body 17→19px, small 14px.
- Headings: tight leading (1.03–1.1) and negative tracking (-0.03em). Body leading 1.5–1.6, max line length ~64ch.
- Section headings may be centered, with generous space above and below. Body copy stays left-aligned when longer than two lines.
- One `<h1>` (hero). Each section has one `<h2>`; sub-items use `<h3>`.

---

## 5. Visual reference & tone

Layout and typography feel: a minimal product page (Apple-style principles) with generous negative space, one idea per viewport, confident large type. Object quality bar: **Oryzo (oryzo.ai)**: tangible, textured 3D objects, cinematic but soft lighting, smooth camera. Emulate the quality and principles, never copy the design or assets.

**Forbidden:** cyberpunk, neon, holograms, Web3/gaming vibes, heavy glassmorphism, excessive particles or bloom, stock photos of people or hospitals, dark-mode or dark-hero treatments.

Composition:

- The hero headline sits at the top (centered is fine), and the device sits below or beside it. Text never overlaps busy geometry.
- Cards: `wash` fill, large radius (20–28px), no border and no heavy shadow. Hairline `rule` only where separation is needed.
- Buttons: pill-shaped. Primary = `accent` fill with `on-accent` text. Secondary = text link in `accent` with a chevron.
- Sections alternate `canvas` and `wash`.

---

## 6. 3D concept — "The device, taken apart"

One persistent R3F scene, fixed behind the content, with a **transparent canvas** (`alpha: true`) so the page background shows through and the object blends into the white page. No video, no portal/canvas masks. A single generic IT device comes apart as the user scrolls: hardware → software → service.

### 6.1 Objects

Build procedurally with drei `RoundedBox` (no external model by default). One `<group>` per layer so each can be animated independently.

| Layer               | Form                                                                              | Notes                                                                                                                                                                  |
| ------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Lower casing     | Flat mini-PC style body, rounded corners, bevelled edges, **dark graphite satin** | Dark against the white page gives strong, premium contrast. Vents, ports, and one small accent-blue LED                                                                |
| 2. Component board  | Thin slabs and fine lines inside the casing, lighter gray                         | Simple geometry only, no literal circuit-board textures                                                                                                                |
| 3. Upper casing     | Lid that lifts during the hardware stage                                          | Same material family as the lower casing                                                                                                                               |
| 4. Interface panel  | Floating panel above the device                                                   | Use a generic **light** UI mockup image as texture (white surface, `accent` details), not HTML inside 3D. No real data and no real product screenshots unless provided |
| 5. Connection lines | Thin `ink`/gray lines drawn progressively to a few small nodes                    | Nodes symbolize institutions. Lines draw in during the service stage                                                                                                   |

The device carries **no brand logo** and no real manufacturer's design. If graphite proves too heavy in review, a silver/aluminum variant is the allowed alternative.

### 6.2 Materials & light

- `MeshPhysicalMaterial` / `MeshStandardMaterial` only. Light clearcoat; roughness differs per part (casing satin, panel slightly glossy), metalness 0–0.6. No unlit or flat materials.
- Subtle procedural micro-roughness texture (small generated texture, no download) to avoid uniform plastic.
- Environment: drei `<Environment>` built from large in-scene `<Lightformer>` softboxes (or a **local** HDR stored in the repo). Never load presets from an external CDN. Think product photography: big soft key, soft fill, gentle rim to separate the dark casing from the white page.
- **Grounding is critical on white.** Use drei `ContactShadows` (low opacity, around 0.15–0.25, wide blur) so the device sits on the page. Without a soft shadow the object will look like it is floating.
- Tone mapping: `NeutralToneMapping` (Khronos PBR Neutral, designed for product rendering), sRGB output. Verify that whites and the page background stay clean. **No bloom.**
- Camera: narrow FOV (about 30–35) for a product-photo feel.

### 6.3 Motion rules

- Camera easing: `power3.inOut` / `expo.inOut`; values damped every frame (no snapping).
- Idle: ±0.04 units float, ≤ 2° rotation, rotation speed about 0.1 rad/s, periods 6–10s.
- Pointer response on the whole device (desktop only): max rotateX ±1.5°, rotateY ±2°, heavily damped. Never chases the cursor.
- Every stage transition must read as cause → effect, not objects relocating.
- Camera vocabulary: slow dolly, subtle orbit, controlled zoom. Never: spinning, shake, extreme FOV changes.

### 6.4 Motion tokens

| Token     | Duration           | Use                         |
| --------- | ------------------ | --------------------------- |
| instant   | 0.15s              | Icon / micro feedback       |
| fast      | 0.25–0.35s         | Buttons, hover              |
| normal    | 0.6s               | UI reveal                   |
| slow      | 0.9s               | Section content             |
| cinematic | 1.2–1.8s           | Major visual movement       |
| spatial   | 2–4s (or scrubbed) | 3D camera / object movement |

- UI easing: `cubic-bezier(0.22, 1, 0.36, 1)` ≈ GSAP `power3.out`. No bounce, elastic, or back easing anywhere.
- Reveals: opacity 0→1 + translateY 24–32px, trigger at ~18% into the viewport, 0.6–0.8s, stagger 0.06–0.1s, play once. One reveal per visual group, not per element.
- Hero text sequence: eyebrow → headline → body → CTAs, 80–120ms apart. The h1 is visible in SSR HTML (reveal is an enhancement only, never `visibility: hidden` before JS).
- Buttons: hover → `accent-strong`, scale ≤ 1.02, active 0.98, 0.25–0.3s. No glow, no magnetic effect.
- Cards: hover y −4px (scale ≤ 1.02), 0.3s.
- Navigation: transparent at top; after ~80px it gains a `canvas` fill at ~80% opacity with a light backdrop blur and a hairline `rule` border, 0.4–0.6s. This light blur on the nav is the only allowed blur.
- Pinned scenes use `scrub: 1`; pins release promptly, never trap scrolling.

### 6.5 Library ownership

| Library              | Owns                                                                  |
| -------------------- | --------------------------------------------------------------------- |
| R3F / three          | Rendering, materials, lighting, idle motion                           |
| GSAP + ScrollTrigger | Scroll storytelling, pins, camera and 3D stage progress, text reveals |
| Framer Motion        | UI micro-interactions only (hover, menu, accordion, form states)      |

Rule: GSAP and Framer Motion never animate the same property of the same element.

### 6.6 Responsive & reduced motion

- Tablet/mobile: shorter camera paths, shorter pins, same device (the concept must survive simplification).
- Reduced motion: no camera travel, no pins, no smooth scroll, no idle rotation; opacity-only transitions ≤ 250ms. Show a static poster image of the device.

---

## 7. Scroll stages (choreography)

Total scroll length: **6–7 viewports.** Keep it short; the previous page was too long.

| #   | Section                  | Stage         | What happens in 3D                                    | Meaning                                                                      |
| --- | ------------------------ | ------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------- |
| 1   | Hero                     | **Assembled** | Device whole, very slow idle rotation, camera ¾ angle | "A complete solution"                                                        |
| 2   | Perangkat TI             | **Hardware**  | Upper casing lifts, component board visible           | IT equipment pillar                                                          |
| 3   | Software & Jasa TI       | **Software**  | Interface panel floats in above the device            | Software and IT services pillar (SIMDINKES as one listed example)            |
| 4   | Implementasi & Dukungan  | **Service**   | Connection lines draw to small nodes                  | Implementation and support                                                   |
| 5   | Bukti                    | **Proof**     | Camera pulls back, device reassembles quietly         | Static proof section follows (INAPROC status, product count, business scope) |
| 6   | Pilar pendukung → Kontak | **Closing**   | Calm composition, slow idle, camera at rest           | Ready for contact                                                            |

---

## 8. Sections (content)

Required, in order: Hero · Software & Jasa TI · Perangkat TI · Layanan (implementasi dan dukungan) · Bukti · Peralatan & Perlengkapan · Servis & Sewa · Kontak · Footer.

### 8.1 The four pillars (data, in `src/content/site.ts`)

Order = emphasis. Change the order there, not in components.

1. **Software & Jasa TI** — headline pillar: system building, implementation, reverse-engineering; SIMDINKES as one listed product.
2. **Perangkat TI** — computers, electronic devices, scanners (as seen in the catalog).
3. **Peralatan & Perlengkapan** — racks, cabinets, laboratory and healthcare equipment.
4. **Servis & Sewa** — repair and equipment rental.

Pillars 1–2 are told through the 3D device. Pillars 3–4 are **static cards** (icon or simple illustration, no 3D, no supplier photos).

### 8.2 Hero

- h1: short statement of positioning, e.g. "Solusi sistem informasi dan perangkat TI untuk instansi".
- One primary CTA: "Lihat profil di INAPROC" → https://katalog.inaproc.id/agung-wijaya-nitya. Secondary: "Hubungi kami".

### 8.3 Proof section

Show only: active provider status on INAPROC, the listed-product count (with the constant above), and a plain summary of registered business fields. Link out to the INAPROC profile so buyers can check for themselves. No sales numbers.

### 8.4 Contact form

- Fields: Nama, Instansi, Jabatan, Email atau WhatsApp, Kebutuhan. Client + server validation, inline errors, success and error states. Not a `mailto:` link.
- Server Action validates, then POSTs to `CONTACT_WEBHOOK_URL` (console log in development). Honeypot field + simple rate limit.
- Replaces the former "Jadwalkan Demo" button, which only opened an email.

### 8.5 Rules

- All content is server-rendered HTML; the 3D scene is an enhancement, never the only carrier of information.
- Metadata title: "PT Agung Wijaya Nitya - Solusi Sistem Informasi & Perangkat TI untuk Instansi". Description is short, contains no "SIMRS" and none of the forbidden claims.
- All site text is Indonesian.

---

## 9. Performance budget

- LCP < 2.5s (LCP element is the hero `<h1>`, never the canvas).
- 60fps mid-range laptop; stable 30fps mid-range phone.
- 3D scene lazy-loaded after first paint; DPR cap 1.5 on mobile (2 desktop). No heavy shadows on mobile; use a pre-baked or simplified contact shadow there.
- Render loop paused when the canvas is off-screen or the tab is hidden.
- Default is procedural geometry with zero 3D downloads. If an external model is ever used: Draco/Meshopt geometry, KTX2 textures, under 1–2 MB, license documented.
- Loader never blocks the page > 1s; without JS the page is fully readable.
- Page length stays compact (see section 7).

---

## 10. Accessibility & robustness

- `prefers-reduced-motion`: no camera travel, no smooth scroll; static poster of the device with simple fades. All content readable.
- Static fallback image when WebGL is unavailable or the device is weak.
- Full keyboard navigation, visible focus rings (2px `accent`, 2px offset). Closed mobile menu is `inert`.
- Decorative elements `aria-hidden` and not focusable. Touch targets ≥ 44px. Minimum text 12px (see section 4).
- One `h1`, correct heading hierarchy, WCAG AA contrast.
- Resizing desktop ↔ mobile must not crash (no `removeChild` error): ScrollTrigger, GSAP contexts, R3F, Lenis, and listeners are all cleaned up.

---

## 11. Open items (do not block Phase 1)

- Logo received as a 204 × 204 px PNG on white. Still needed: an SVG or high-resolution PNG, and official brand color values if they exist. Until then `accent` is the sampled approximation.
- Real phone number and `CONTACT_WEBHOOK_URL`.
- PaDi UMKM / LPSE profile links. Do not mention either platform until proof is provided.
- Confirmation from the company of which pillar to emphasise (order lives in `site.ts`).
- Re-verify the 742 product count before release.
- Verify INAPROC's buyer ordering flow against the official guide before adding any "how to order" section.

### Fallback concept

If the hero frame is not approved after 2–3 revision rounds, switch to a **showroom walkthrough**: a minimal bright room where the camera visits one station per pillar. Do not build this unless explicitly instructed.
