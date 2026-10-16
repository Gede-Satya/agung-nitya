<!-- # DESIGN.md — PT Agung Wijaya Nitya Landing Page

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
| 742 products listed in the catalog (as of 15 Oct 2026)                                                                                                                                                            | Keep as a constant in `src/content/site.ts` with a comment: "re-verify before release". NOTE (Oct 2026, per owner): badge & count are currently hidden from the UI; only a small text link to the INAPROC profile remains |
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

If the hero frame is not approved after 2–3 revision rounds, switch to a **showroom walkthrough**: a minimal bright room where the camera visits one station per pillar. Do not build this unless explicitly instructed. -->

# Apple — Style Reference

> foldable device in a white gallery. Center product renders as the visual event, with typography and blue controls kept deliberately quiet around it.

**Theme:** light

Source measurements are normalized; roles and recommendations are interpreted. Font summary lists are independent, not paired by position. HTML examples are reconstructions, not source components.

Apple treats the product page as a white gallery: enormous product photography occupies the center while compact black typography gives each claim a controlled, almost editorial weight. The page alternates seamless white storytelling sections with #f5f5f7 feature bands containing oversized #ffffff cards, using one saturated blue only for links and compact conversion controls. Rounded 28px media frames soften the hardware-led composition without turning the page into a card dashboard; nearly every surface stays flat and shadowless.

## Tokens — Colors

| Name            | Value     | Token                     | Role                                                                                                                     |
| --------------- | --------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Gallery White   | `#ffffff` | `--color-gallery-white`   | Primary page canvas, hero background, product story sections, and feature-card surfaces                                  |
| Studio Mist     | `#f5f5f7` | `--color-studio-mist`     | Alternate full-width section background, feature-stage backdrop, footer surface, and muted content blocks                |
| Paper Frost     | `#fafafc` | `--color-paper-frost`     | Opened global-navigation surface and secondary pale fill                                                                 |
| Hairline Silver | `#d6d6d6` | `--color-hairline-silver` | 1px dividers, restrained control outlines, and subtle separators                                                         |
| Control Gray    | `#e6e6e8` | `--color-control-gray`    | Disabled control fills, subdued utility surfaces, and single-pixel navigation edge treatment                             |
| Ink             | `#1d1d1f` | `--color-ink`             | Headlines, primary body copy, navigation labels, and dark utility icons                                                  |
| Slate           | `#707070` | `--color-slate`           | Secondary copy, legal text, subdued navigation content, and low-emphasis glyphs                                          |
| Steel           | `#86868b` | `--color-steel`           | Input outlines, inactive indicators, and fine outlined-control edges                                                     |
| Apple Blue      | `#0066cc` | `--color-apple-blue`      | Inline links, section links, and blue text controls — a precise blue punctuation against monochrome product storytelling |
| Pricing Blue    | `#0071e3` | `--color-pricing-blue`    | Filled pricing and learn-more controls — the brighter blue reserves visual urgency for compact conversion moments        |
| Launch Orange   | `#b64400` | `--color-launch-orange`   | Small launch-status labels such as new-product markers                                                                   |

## Tokens — Typography

### SF Pro Display — Product names, display headlines, large feature statements, and section-level product claims. The 80px/600 hero treatment tightens to -1.2px, making the largest type feel compact rather than promotional. · `--font-sf-pro-display`

- **Substitute:** Inter, Helvetica Neue, Arial
- **Weights:** 400, 500, 600
- **Sizes:** 19px, 21px, 24px, 28px, 40px, 48px, 80px
- **Line height:** 1.00, 1.05, 1.08, 1.14, 1.17, 1.21, 1.33, 1.38
- **Letter spacing:** -1.2px at 80px; normal at 40px; +0.23px at 19-21px; profile range -0.015em to 0.012em
- **OpenType features:** `"numr"`
- **Role:** Product names, display headlines, large feature statements, and section-level product claims. The 80px/600 hero treatment tightens to -1.2px, making the largest type feel compact rather than promotional.

### SF Pro Text — Navigation, body copy, links, compact buttons, pricing details, labels, and footnotes. The consistently negative tracking lets small interface text remain dense and Apple-specific instead of looking like generic system UI. · `--font-sf-pro-text`

- **Substitute:** Inter, Helvetica Neue, Arial
- **Weights:** 400, 500, 600
- **Sizes:** 10px, 12px, 14px, 17px, 20px, 26px, 44px
- **Line height:** 1.00, 1.18, 1.24, 1.29, 1.33, 1.43, 1.47
- **Letter spacing:** -0.37px at 10px, -0.12px at 12px, -0.22px at 14px, -0.37px at 17px; profile range -0.037em to -0.003em
- **OpenType features:** `"numr"`
- **Role:** Navigation, body copy, links, compact buttons, pricing details, labels, and footnotes. The consistently negative tracking lets small interface text remain dense and Apple-specific instead of looking like generic system UI.

### Arial — Fallback text inside the observed search/input control only. · `--font-arial`

- **Substitute:** Arial
- **Weights:** 400
- **Sizes:** 13px
- **Line height:** 1.20
- **Role:** Fallback text inside the observed search/input control only.

### Type Scale

| Role              | Family         | Weight | Size | Line Height | Letter Spacing | Token                      |
| ----------------- | -------------- | ------ | ---- | ----------- | -------------- | -------------------------- |
| global-nav        | SF Pro Text    | 400    | 12px | 1           | -0.12px        | `--text-global-nav`        |
| compact-control   | SF Pro Text    | 400    | 12px | 1.33        | -0.12px        | `--text-compact-control`   |
| body-small        | SF Pro Text    | 400    | 14px | 1.29        | -0.224px       | `--text-body-small`        |
| body              | SF Pro Text    | 400    | 17px | 1.47        | -0.374px       | `--text-body`              |
| feature-copy      | SF Pro Text    | 400    | 17px | 1.24        | -0.374px       | `--text-feature-copy`      |
| product-nav-title | SF Pro Display | 600    | 19px | 1.21        | 0.228px        | `--text-product-nav-title` |
| product-kicker    | SF Pro Display | 600    | 21px | 1           | 0.231px        | `--text-product-kicker`    |
| feature-heading   | SF Pro Display | 600    | 40px | 1           | 0px            | `--text-feature-heading`   |
| hero-display      | SF Pro Display | 600    | 80px | 1.05        | -1.2px         | `--text-hero-display`      |

## Tokens — Spacing & Shapes

**Base unit:** 4px

**Density:** comfortable

### Spacing Scale

| Name | Value | Token           |
| ---- | ----- | --------------- |
| 4    | 4px   | `--spacing-4`   |
| 8    | 8px   | `--spacing-8`   |
| 12   | 12px  | `--spacing-12`  |
| 16   | 16px  | `--spacing-16`  |
| 20   | 20px  | `--spacing-20`  |
| 24   | 24px  | `--spacing-24`  |
| 28   | 28px  | `--spacing-28`  |
| 32   | 32px  | `--spacing-32`  |
| 40   | 40px  | `--spacing-40`  |
| 48   | 48px  | `--spacing-48`  |
| 52   | 52px  | `--spacing-52`  |
| 64   | 64px  | `--spacing-64`  |
| 76   | 76px  | `--spacing-76`  |
| 80   | 80px  | `--spacing-80`  |
| 128  | 128px | `--spacing-128` |
| 144  | 144px | `--spacing-144` |

### Border Radius

| Element    | Value  |
| ---------- | ------ |
| cards      | 28px   |
| links      | 10px   |
| pills      | 36px   |
| badges     | 0px    |
| images     | 28px   |
| inputs     | 980px  |
| buttons    | 9999px |
| navigation | 20px   |

### Shadows

| Name     | Value                                | Token               |
| -------- | ------------------------------------ | ------------------- |
| subtle   | `rgb(230, 230, 232) 0px 0px 0px 1px` | `--shadow-subtle`   |
| subtle-2 | `rgb(134, 134, 139) 0px 0px 0px 1px` | `--shadow-subtle-2` |

### Layout

- **Section gap:** 90px
- **Card padding:** 28px
- **Element gap:** 20px

## Components

### Global Store Navigation

**Role:** Persistent utility navigation

A 44px-tall white navigation bar with Apple glyph, compact SF Pro Text 12px/400 links, and rgba(0,0,0,0.8) labels. Keep controls unboxed; opened navigation uses #fafafc with a 1px #e6e6e8 edge and blur(20px).

### Product Local Navigation

**Role:** Product-page header and conversion controls

A white local bar carries the product name in SF Pro Display 19px/600 and compact right-aligned pill controls. Use a 20px container radius where the local bar is floated over the page, with #d6d6d6 as the hairline boundary.

### Outlined Explore Pill

**Role:** Secondary product-navigation control

Use transparent fill, #1d1d1f text, a 1px #86868b outline, and a 9999px radius. Set compact SF Pro Text 12px/400 type with 16px line height; do not give this secondary control a colored fill.

### Pricing Blue Pill

**Role:** Filled conversion control

Use #0071e3 fill with #ffffff SF Pro Text 12px/400 at 16px line height and -0.12px tracking. Set a 9999px radius; this blue treatment stays compact inside the product bar and floating pricing callout.

### Hero Product Stage

**Role:** Launch introduction

Set a #ffffff full-bleed visual stage with centered product name in SF Pro Display 21px/600, then an 80px/600 display statement at 84px line height and -1.2px tracking. Place the foldable-device render directly beneath the text without a containing card.

### Floating Pricing Callout

**Role:** Purchase context over product imagery

Float a #ffffff rounded 28px capsule near the lower product render with 14px/600 #1d1d1f pricing text and compact secondary copy. Keep the blue Pricing Blue pill inside the callout; do not use drop shadows.

### Section Anchor Navigation

**Role:** In-page feature navigation

Render a horizontal list of SF Pro Text 17px/500 labels at 25px line height and -0.374px tracking in #1d1d1f. Use transparent backgrounds, 28px vertical padding, and no card or underline treatment.

### Highlights Stage

**Role:** Feature-carousel section

Use #f5f5f7 as the full section background, with a large #1d1d1f section heading and an Apple Blue text link aligned opposite it. Feature slides are #ffffff 28px-radius cards with no shadow.

### Feature Media Card

**Role:** Product-detail showcase

Use a #ffffff surface, 28px radius, no border, and no shadow. Center the device render with an SF Pro Display 24px/600 or 40px/600 feature statement above it; media may crop beyond the card edge.

### Carousel Playback Control

**Role:** Highlights media control

Use a translucent control track based on rgba(210,210,215,0.64), 36px radius, and subdued rgba(0,0,0,0.56) glyphs. Keep slide dots and pause control grouped in a small pill rather than adding visible card chrome.

### Editorial Feature Block

**Role:** Long-form product story

Place a small #1d1d1f SF Pro Display kicker above a large left-aligned display statement, followed by SF Pro Text 17px/400 body copy at approximately 21px line height and -0.374px tracking. The accompanying hardware image is oversized and allowed to enter from the opposite side.

### Rounded Search Input

**Role:** Global navigation search

Use #ffffff fill, #1d1d1f 13px Arial text, 24px left padding, 45px right padding, a 1px #86868b outline, and a 980px radius. Keep the default field visually absent until expanded from navigation.

### Launch Status Label

**Role:** New-product annotation

Use #b64400 SF Pro Text 12px/600 with 16px line height and -0.12px tracking. Leave it as plain text with no pill background or border.

## Do's and Don'ts

### Do

- Use #ffffff as the default product-story canvas and reserve #f5f5f7 for full-width feature bands and footer regions.
- Set display hero statements in SF Pro Display 80px/600, 84px line height, and -1.2px tracking.
- Use SF Pro Text 17px/400 with -0.374px tracking for feature paragraphs and in-page navigation at 17px/500.
- Use 28px radius for feature cards and contained media; keep those cards shadowless.
- Use #0071e3 only for compact filled conversion pills with #ffffff 12px SF Pro Text.
- Use #0066cc for inline links and textual section links rather than turning every navigation item blue.
- Space major storytelling sections by 90px and use 20px gaps between related interface elements.

### Don't

- Do not add gradients; product imagery supplies the page’s color and visual depth.
- Do not use shadows on feature cards, editorial blocks, or floating pricing capsules.
- Do not replace the 28px feature-card radius with 8px, 12px, or square corners.
- Do not use #0071e3 as a large hero background or a universal filled button color.
- Do not set hero headlines in bold 700 or wider tracking than -1.2px at 80px.
- Do not introduce colored status pills for launch labels; use bare #b64400 12px text.
- Do not place dense boxed UI panels over the product renders; keep #ffffff space around hardware imagery.

## Surfaces

| Level | Name          | Value     | Purpose                                                                     |
| ----- | ------------- | --------- | --------------------------------------------------------------------------- |
| 0     | Gallery White | `#ffffff` | Primary hero, editorial canvas, local navigation, and feature-card surface. |
| 1     | Studio Mist   | `#f5f5f7` | Alternate section band, carousel backdrop, muted content area, and footer.  |
| 2     | Paper Frost   | `#fafafc` | Opened global-navigation layer.                                             |
| 3     | Control Gray  | `#e6e6e8` | Disabled or subdued utility-control fill and thin navigation edge.          |

## Elevation

Surfaces gain separation through #ffffff against #f5f5f7, 28px media corners, and sparse 1px #d6d6d6 edges rather than cast shadows. The only elevation-like marks are 0 0 0 1px outlines on navigation and selected controls.

## Imagery

The page is dominated by high-resolution product photography and device renders rather than illustration. Hardware is isolated against pure white or warm neutral image backdrops, often cropped at an oversized scale so the fold and thin profile become the composition; hands appear in the hero to demonstrate physical scale. Images are either edge-free on the white hero canvas or contained in large 28px-radius white cards against #f5f5f7. Product UI appears inside device screens as explanatory evidence, while icons remain small, monochrome global-navigation glyphs.

## Layout

The page begins with a compact global store navigation above a product-local navigation bar, then opens into a centered white hero with stacked product label, oversized headline, preorder copy, a dominant foldable-phone render, and a floating pricing capsule. Storytelling proceeds through a light-gray #f5f5f7 highlights band with a horizontally advancing set of large white 28px-radius media cards, followed by wide white editorial sections that pair left-aligned text blocks with oversized product imagery entering from the right or below. Section headers introduce each chapter, while an in-page horizontal anchor navigation supports long-form scrolling; the page is spacious, image-led, and does not rely on visible grid lines or conventional card stacks.

## Agent Prompt Guide

Quick Color Reference:

- Gallery White: #ffffff — Primary page canvas, hero background, product story sections, and feature-card surfaces
- Studio Mist: #f5f5f7 — Alternate full-width section background, feature-stage backdrop, footer surface, and muted content blocks
- Paper Frost: #fafafc — Opened global-navigation surface and secondary pale fill
- Hairline Silver: #d6d6d6 — 1px dividers, restrained control outlines, and subtle separators
- Control Gray: #e6e6e8 — Disabled control fills, subdued utility surfaces, and single-pixel navigation edge treatment
- Ink: #1d1d1f — Headlines, primary body copy, navigation labels, and dark utility icons
- Slate: #707070 — Secondary copy, legal text, subdued navigation content, and low-emphasis glyphs
- Steel: #86868b — Input outlines, inactive indicators, and fine outlined-control edges
- Apple Blue: #0066cc — Inline links, section links, and blue text controls — a precise blue punctuation against monochrome product storytelling
- Pricing Blue: #0071e3 — Filled pricing and learn-more controls — the brighter blue reserves visual urgency for compact conversion moments
- Launch Orange: #b64400 — Small launch-status labels such as new-product markers

Create a #ffffff launch hero with centered SF Pro Display 21px/600 product label and a centered 80px/600, 84px-line-height headline in Ink (#1d1d1f); place an oversized foldable-device render directly below with no enclosing card.
Create a Product Local Navigation bar with an SF Pro Display 19px/600 Ink product title, an outlined Explore Pill, and a Pricing Blue (#0071e3) 9999px-radius pricing pill using #ffffff SF Pro Text 12px/400.
Create a Studio Mist (#f5f5f7) highlights section with an Ink heading and Apple Blue (#0066cc) text link; use a #ffffff 28px-radius feature media card with no shadow and an SF Pro Display 40px/600 feature statement.
Create a white editorial product section with a left-aligned Ink feature statement and SF Pro Text 17px/400 body copy at 21px line height and -0.374px tracking; crop a large product photograph into the right side.
Create a floating #ffffff 28px-radius pricing callout over a product render using Ink 14px/600 pricing copy and a compact Pricing Blue 9999px-radius pill.

## Similar Brands

- **Google Pixel** — Product-led landing pages pair isolated hardware renders with generous white space and compact blue conversion controls.
- **Sony** — Large hardware photography and restrained editorial feature chapters make the product, rather than decorative interface chrome, carry the page.
- **Nothing** — Uses oversized device imagery and sparse product storytelling, though Apple’s palette is more monochrome and its controls are smaller.
- **Tesla** — Full-width product visual stages and minimal surrounding UI create a similarly showroom-like conversion flow.

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-gallery-white: #ffffff;
  --color-studio-mist: #f5f5f7;
  --color-paper-frost: #fafafc;
  --color-hairline-silver: #d6d6d6;
  --color-control-gray: #e6e6e8;
  --color-ink: #1d1d1f;
  --color-slate: #707070;
  --color-steel: #86868b;
  --color-apple-blue: #0066cc;
  --color-pricing-blue: #0071e3;
  --color-launch-orange: #b64400;

  /* Typography — Font Families */
  --font-sf-pro-display:
    "SF Pro Display", ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-sf-pro-text:
    "SF Pro Text", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, sans-serif;
  --font-arial:
    "Arial", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-global-nav: 12px;
  --leading-global-nav: 1;
  --tracking-global-nav: -0.12px;
  --text-compact-control: 12px;
  --leading-compact-control: 1.33;
  --tracking-compact-control: -0.12px;
  --text-body-small: 14px;
  --leading-body-small: 1.29;
  --tracking-body-small: -0.224px;
  --text-body: 17px;
  --leading-body: 1.47;
  --tracking-body: -0.374px;
  --text-feature-copy: 17px;
  --leading-feature-copy: 1.24;
  --tracking-feature-copy: -0.374px;
  --text-product-nav-title: 19px;
  --leading-product-nav-title: 1.21;
  --tracking-product-nav-title: 0.228px;
  --text-product-kicker: 21px;
  --leading-product-kicker: 1;
  --tracking-product-kicker: 0.231px;
  --text-feature-heading: 40px;
  --leading-feature-heading: 1;
  --tracking-feature-heading: 0px;
  --text-hero-display: 80px;
  --leading-hero-display: 1.05;
  --tracking-hero-display: -1.2px;

  /* Typography — Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;

  /* Spacing */
  --spacing-unit: 4px;
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-28: 28px;
  --spacing-32: 32px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-52: 52px;
  --spacing-64: 64px;
  --spacing-76: 76px;
  --spacing-80: 80px;
  --spacing-128: 128px;
  --spacing-144: 144px;

  /* Layout */
  --section-gap: 90px;
  --card-padding: 28px;
  --element-gap: 20px;

  /* Border Radius */
  --radius-md: 4px;
  --radius-lg: 10px;
  --radius-2xl: 20px;
  --radius-3xl: 28px;
  --radius-3xl-2: 32px;
  --radius-3xl-3: 36px;
  --radius-full: 120px;
  --radius-full-2: 170px;
  --radius-full-3: 980px;
  --radius-full-4: 999px;
  --radius-full-5: 9999px;

  /* Named Radii */
  --radius-cards: 28px;
  --radius-links: 10px;
  --radius-pills: 36px;
  --radius-badges: 0px;
  --radius-images: 28px;
  --radius-inputs: 980px;
  --radius-buttons: 9999px;
  --radius-navigation: 20px;

  /* Shadows */
  --shadow-subtle: rgb(230, 230, 232) 0px 0px 0px 1px;
  --shadow-subtle-2: rgb(134, 134, 139) 0px 0px 0px 1px;

  /* Surfaces */
  --surface-gallery-white: #ffffff;
  --surface-studio-mist: #f5f5f7;
  --surface-paper-frost: #fafafc;
  --surface-control-gray: #e6e6e8;
}
```

### Tailwind v4

```css
@theme {
  /* Colors */
  --color-gallery-white: #ffffff;
  --color-studio-mist: #f5f5f7;
  --color-paper-frost: #fafafc;
  --color-hairline-silver: #d6d6d6;
  --color-control-gray: #e6e6e8;
  --color-ink: #1d1d1f;
  --color-slate: #707070;
  --color-steel: #86868b;
  --color-apple-blue: #0066cc;
  --color-pricing-blue: #0071e3;
  --color-launch-orange: #b64400;

  /* Typography */
  --font-sf-pro-display:
    "SF Pro Display", ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-sf-pro-text:
    "SF Pro Text", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, sans-serif;
  --font-arial:
    "Arial", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-global-nav: 12px;
  --leading-global-nav: 1;
  --tracking-global-nav: -0.12px;
  --text-compact-control: 12px;
  --leading-compact-control: 1.33;
  --tracking-compact-control: -0.12px;
  --text-body-small: 14px;
  --leading-body-small: 1.29;
  --tracking-body-small: -0.224px;
  --text-body: 17px;
  --leading-body: 1.47;
  --tracking-body: -0.374px;
  --text-feature-copy: 17px;
  --leading-feature-copy: 1.24;
  --tracking-feature-copy: -0.374px;
  --text-product-nav-title: 19px;
  --leading-product-nav-title: 1.21;
  --tracking-product-nav-title: 0.228px;
  --text-product-kicker: 21px;
  --leading-product-kicker: 1;
  --tracking-product-kicker: 0.231px;
  --text-feature-heading: 40px;
  --leading-feature-heading: 1;
  --tracking-feature-heading: 0px;
  --text-hero-display: 80px;
  --leading-hero-display: 1.05;
  --tracking-hero-display: -1.2px;

  /* Spacing */
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-28: 28px;
  --spacing-32: 32px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-52: 52px;
  --spacing-64: 64px;
  --spacing-76: 76px;
  --spacing-80: 80px;
  --spacing-128: 128px;
  --spacing-144: 144px;

  /* Border Radius */
  --radius-md: 4px;
  --radius-lg: 10px;
  --radius-2xl: 20px;
  --radius-3xl: 28px;
  --radius-3xl-2: 32px;
  --radius-3xl-3: 36px;
  --radius-full: 120px;
  --radius-full-2: 170px;
  --radius-full-3: 980px;
  --radius-full-4: 999px;
  --radius-full-5: 9999px;

  /* Shadows */
  --shadow-subtle: rgb(230, 230, 232) 0px 0px 0px 1px;
  --shadow-subtle-2: rgb(134, 134, 139) 0px 0px 0px 1px;
}
```
