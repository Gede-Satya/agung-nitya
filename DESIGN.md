# DESIGN.md — PT Agung Wijaya Nitya

> Single source of truth for the website’s visual design, content presentation, and interaction behavior. If implementation and this document disagree, update the implementation or revise this document deliberately. This specification is original to PT Agung Wijaya Nitya. It uses broad product-page principles—clarity, restraint, and generous space—without copying another brand’s layouts, assets, fonts, wording, or interface.

## 1. Product and experience goals

### Company context

- **Company:** PT Agung Wijaya Nitya, a limited liability company in Kabupaten Badung, Bali.

- **Public role:** an active UMKK provider on the INAPROC Electronic Catalog.

- **Audience:** government procurement officers, institutional buyers, and other organizations evaluating listed products or asking for a quotation.

- **Primary user journey:** understand the provider and its offer → browse relevant catalog items → verify details on INAPROC → contact the company if needed.

- **Primary conversion:** a qualified inquiry or a click-through to the relevant INAPROC listing.

- **Language:** Indonesian by default. Use clear, professional, factual language. Explain necessary procurement or technical terms in context.

### Verified facts and content boundaries

Treat the following as the only approved factual claims unless the company provides updated evidence:

- The INAPROC profile lists **AGUNG WIJAYA NITYA** as an active provider, type UMKK, located in Kabupaten Badung, Bali: [https://katalog.inaproc.id/agung-wijaya-nitya](https://katalog.inaproc.id/agung-wijaya-nitya)

- The company’s catalog lists **742 products as observed on 17 October 2026**. Treat this number as time-sensitive. Read it from the current catalog source where feasible; otherwise label it with a last-verified date and recheck before release.

- Catalog entries span goods, services, and digital/software listings. Registered KBLI classifications indicate registered business scope; they are not proof that every registered activity is currently offered.

- A listed product includes “SIMDINKES Layanan Manajemen dan SDM Kesehatan.” Mention it only as a specific catalog listing, not as proof of broad healthcare-sector expertise.

- Public company-site search results describe system building, system implementation, and reverse-engineering services. Reconfirm these statements on a working company-controlled page before featuring them as claims.

- Public contact email: `info@agungwijayanitya.com`.

- The phone number currently available in prior site material is unverified/placeholder. Do not make it a primary contact method until the owner confirms it.

Never invent product availability, stock, prices, specifications, delivery coverage, warranty terms, certifications, customers, project outcomes, testimonials, or response times. Product facts and prices must link to or be synchronized with the corresponding official INAPROC listing.

### Brand and asset boundaries

- Do not claim PaDi UMKM registration, LPSE registration, BUMN-vendor status, tender wins, or customer relationships without evidence.

- Do not use hospital/doctor imagery as generic brand imagery. A healthcare-software catalog item may be described factually without positioning the whole company as a healthcare provider.

- Do not copy manufacturer logos, product photos, or INAPROC branding assets unless the owner has confirmed permission and usage rules. Prefer original diagrams, simple category icons, and neutral illustration. Link to INAPROC for official product images and details.

- Use the company logo as supplied; do not recolor, stretch, or upscale a low-resolution asset. The interface palette follows the owner-supplied brand pair—deep navy `#0B1D36` and gold `#C9A227`—while the logo asset itself stays untouched. Request a vector/high-resolution version if needed, but do not block the design on it.

- Do not reuse a third-party visual identity as the company’s design system. In particular, avoid Apple-specific typography, product UI, exact layouts, and wording.

## 2. Design direction

### Brand essence

A dependable, clear procurement partner that helps institutional buyers understand the offer and reach the official product source.

**Personality:** composed, capable, transparent.

### Design movement

**Corporate navy & gold:** a confident, high-contrast corporate presentation built on deep navy (`#0B1D36`) surfaces with restrained gold (`#C9A227`) accents over a soft-white canvas. Dark navy bands anchor the hero and the closing CTA, while catalog and content areas stay bright, spacious, and information-dense. The precision and product-forward confidence of modern B2B software marketing stays, but the tone reads as an institutional procurement vendor: dependable, official, and calm rather than playful.

### Core principles

1. **Make the next step obvious.** Prioritize catalog exploration and quotation requests.

1. **Earn trust through verifiable information.** Distinguish company information from official listing data.

1. **Make a large inventory navigable.** Search and filters should be useful without overwhelming the page.

1. **Use motion as feedback, not decoration.** Never let animation delay, obscure, or carry essential content.

### Visual signature

- A soft-white canvas with deep navy section bands for the hero and the closing CTA.

- **Navy is authority, gold is action.** Deep navy carries headings, dark bands, and the brand mark; gold marks primary actions, active navigation, and key eyebrow labels. Keep gold fills for buttons and small motifs only—never as low-contrast body text.

- Gold must satisfy contrast as text: use `--color-accent-ink` (`#8A6A12`) for accent-colored text on light surfaces, and the bright `--color-accent` (`#C9A227`) only on navy surfaces or as a fill behind navy text.

- A simple “procurement pathway” motif—small connected steps or rules—may illustrate how a buyer moves from need to listing to inquiry. Keep it subtle and do not imply official endorsement by INAPROC.

## 3. Information architecture

### Global navigation

Use a compact, consistent header with a visible company mark and these destinations:

- **Beranda**

- **Kategori** or **Lini Produk**

- **Katalog**

- **Layanan** (only when the service content is confirmed). It contains the Pemeliharaan section (`#pemeliharaan`, see 4.1). Until the owner confirms the services, the nav item may point to the section, but every service claim inside it stays flagged as draft.

- **Tentang / Ekosistem**

- **Kontak**

- Primary action: **Minta Penawaran**

On smaller screens, place navigation links in an accessible menu. Keep the quotation action available without forcing the full desktop navigation into a narrow row. Show a clear active state for the current route.

### Required pages and sections

1. **Home (****`/`****)**
  - Positioning headline and short factual description.
  - Primary actions: **Lihat Katalog** and **Minta Penawaran**.
  - A concise overview of the company’s offer, based on verified catalog categories.
  - A small set of featured items or categories, with a clear link to the full catalog.
  - Maintenance section (Pemeliharaan, see 4.1).
  - Verifiable provider information and contact details.

1. **Catalog (****`/katalog`****)**
  - Dedicated discovery page for the available product and service listings.
  - Search, category/type filters, origin filter if present in source data, sorting, results count, pagination, and official listing links.
  - Clear loading, empty, and error states.

1. **Contact / quotation (****`/#kontak`**** or ****`/kontak`****)**
  - Explain what information helps prepare an inquiry.
  - Offer verified contact options. A form is optional and must not imply submission succeeded unless it did.

1. **About / provider information** (optional)
  - Keep factual company details distinct from marketing positioning and registered KBLI scope.

Keep the home page concise. It is an introduction and routing page, not a duplicate of every catalog listing.

## 4. Home-page experience

### Hero

- One Indonesian `<h1>` that states what the provider offers to institutional buyers without unsupported claims.

- Keep the lead paragraph short, concrete, and readable at a glance.

- Primary CTA: **Lihat Katalog** → `/katalog`.

- Secondary CTA: **Minta Penawaran** → quotation/contact section.

- A link to the official provider profile may appear as a supporting trust action.

- Use a single clear visual focus. The hero sits on a deep navy gradient band: headline, lead, CTAs, and trust chips in white with a gold primary action, plus a `navy-grid` texture and the 3D storytelling scene (Section 7) as the right-hand visual. A live-feeling product mock (an HTML/CSS “katalog pengadaan” dashboard preview) may sit inside a light device/browser frame on top of the dark band. The mock is illustrative interface chrome only—it must not display fabricated prices, stock, or product claims.

- Do not crowd the hero with rotating slides, excessive badges, multiple competing primary buttons, or a headline that promises every listed capability.

### Category overview

Show a small number of category entry points based on the live catalog taxonomy. Each category card should have:

- A recognizable label.

- A one-sentence plain-language explanation based on the actual catalog.

- A count only when it can be kept accurate and the count’s scope is clear.

- A link that opens the catalog with the category filter applied.

Do not imply that registered KBLI categories are equivalent to currently listed catalog products.

### Featured products

- Keep the home-page slider, if retained, as a **featured-products showcase**, not the primary catalog interface.

- Limit it to 3–5 verified selections. Prefer a static horizontal scroll/carousel with explicit previous/next controls; automatic rotation is off by default.

- Include a clear **Lihat semua produk** link to `/katalog`.

- Each slide needs a factual name, category, short description, and link to the exact INAPROC item when that URL is known.

- The carousel must work with keyboard and touch, announce changes accessibly, and respect reduced-motion settings.

- If accurate content or rights-cleared imagery is unavailable, use category highlights instead of fabricated product cards.

### 4.1 Maintenance section (Pemeliharaan)

**Purpose:** show that the company can maintain and repair IT equipment, component by component, without implying anything beyond what the owner has confirmed.

**Position:** after the category overview and featured products, before trust and contact. Section id: `pemeliharaan`.

**Copy (Indonesian):**

- Eyebrow: “Pemeliharaan & purnajual”
- h2: “Dirancang untuk dirawat, bukan diganti.”
- Closing CTA: “Jadwalkan pemeliharaan” → `/?tujuan=pemeliharaan#kontak`

**Visual:** one generic, unbranded exploded-view laptop (a 2D layered image or the section’s own lightweight animation). It is not part of the hero 3D scene and must not conflict with it. Use an original or rights-cleared image. Do not use a manufacturer’s product photo.

**Components and numbering.** Fixed order, top to bottom, matching the physical layers in the image:

| No. | id | Label | Leader point lands on |
| --- | --- | --- | --- |
| 01 | `layar` | Layar & panel display | Screen |
| 02 | `cooling` | Cooling fan & heat pipe | Fan / heat pipe |
| 03 | `motherboard` | Motherboard (RAM & SSD) | Board |
| 04 | `baterai` | Baterai & modul daya | Battery block |
| 05 | `sasis` | Bottom cover & rangka sasis | Lower casing |

Rules:

- Each component appears **exactly once**. No duplicated labels and no leader line that ends in empty space.
- Every leader point must land on the component it names. The battery is the dark block above the bottom cover. Re-check after any image change.
- Numbers always read in the same direction (01 at the top). Never reorder per breakpoint.

**Data (single source, `src/content/maintenance.ts`):**

~~~ts
type MaintenanceItem = {
  id: "layar" | "cooling" | "motherboard" | "baterai" | "sasis";
  order: 1 | 2 | 3 | 4 | 5;
  label: string;
  x: number;            // leader point, % of image width
  y: number;            // leader point, % of image height
  side: "left" | "right";
  services: string[];   // service claims
  duration?: string;    // omit until confirmed
  confirmed: boolean;   // false = draft, not yet approved by owner
};
~~~

Initial draft content (all `confirmed: false` until the owner approves):

- `layar`: pemeriksaan dead pixel dan backlight bleeding; penggantian panel LCD/IPS
- `cooling`: pembersihan sirip radiator dan blower; penggantian thermal paste
- `motherboard`: upgrade RAM; penambahan atau penggantian SSD; diagnosa
- `baterai`: pengecekan kesehatan baterai; penggantian modul baterai
- `sasis`: penggantian casing bawah; perbaikan engsel

**Claim rules (these override any copy in code):**

- Show service text only for items with `confirmed: true`. For unconfirmed items, show the component name only, with the neutral line “Layanan dikonfirmasi saat penawaran.”
- Do not show a duration unless it is confirmed. If absent, omit the field entirely, with no placeholder.
- Do not state specific technologies (DDR4/DDR5, NVMe PCIe 4.0, IPS) unless confirmed.
- Do not state warranty on parts or service here (see Section 12).

**Interaction:**

- Desktop: labels left and right of the image with leader lines, no overlap at 1024px and above. Hover or focus on a hotspot opens a small card with the component name, confirmed services, and “Tanya layanan ini”.
- Mobile (below 768px): image on top, components as a vertical list of cards below. Tapping a card highlights its hotspot on the image. No side labels.
- Every behavior works by keyboard and touch. Hotspots are buttons with an `aria-label`, `Esc` closes the card, and focus returns to the hotspot.
- “Tanya layanan ini” → `/?layanan=<id>#kontak`. The query string goes **before** the hash. The contact section reads `layanan` and pre-fills the “Kebutuhan” field. If there is no contact form yet, the link must still land on the contact section with the component name visible.
- The entrance animation is optional: layers separate once on first view, at most 500ms per reveal, and off under `prefers-reduced-motion` (show the static exploded view). No pinned scroll.

**Fallbacks:** if the image fails to load, the component list remains fully usable as plain text. The section must not need JavaScript to show the five components and the CTA.

### Trust and contact

- Describe the provider’s active INAPROC status using plain text and a direct link. Do not imitate the INAPROC logo or suggest government endorsement.

- Present email consistently and only use a confirmed phone/WhatsApp number.

- A contact form should request only information needed to respond. Show clear validation, submission, success, and failure feedback.

## 5. Catalog-page experience

### Catalog source and integrity

- INAPROC is the source of truth for official product names, prices, descriptions, status, and product URLs.

- Prefer an authorized, maintainable data feed or server-side synchronization. Respect platform terms, rate limits, and robots/access restrictions. Do not silently scrape in a way that violates platform rules.

- If live synchronization is not available, use a clearly maintained snapshot with `lastVerifiedAt`, a source URL, and a refresh procedure. Do not describe a snapshot as live or real-time.

- Never invent a total count, category mapping, specification, product status, image, price, or direct listing URL.

- When a listing cannot be matched to a direct INAPROC detail page, provide the official provider profile link rather than fabricating a product URL.

### Catalog layout

1. Page title and concise explanation.

1. Provider profile link and data freshness note, if data is synchronized or cached.

1. Search and filters.

1. Result count and selected-filter summary.

1. Responsive product/service listing.

1. Pagination or a deliberate “load more” interaction.

1. Empty/error state and a persistent link to the official INAPROC profile.

### Search and filters

- Search by product name, brand where present in source data, and category.

- Filters should follow actual source fields, such as listing type, category, and domestic/import origin if those attributes are available.

- Show selected filters as removable chips and provide **Reset filter**.

- On desktop, filters may appear as a compact sidebar or a single well-organized toolbar. On mobile, place them in a filter drawer/sheet with a clearly labelled apply and reset action.

- Do not make a dense row of tiny filter chips the only control. Allow wrapping or horizontal scrolling only when its behavior is clear.

- The toolbar is sticky beneath the header on both desktop and mobile so search, filters, and sorting stay reachable while browsing results. On desktop, category pills wrap so no option is hidden; horizontal scrolling is reserved for narrow mobile rails. The sticky surface uses a translucent wash with backdrop blur and must never obscure a focused control or results count.

- Sorting labels must explain the result order, e.g. **Harga terendah** or **Nama A–Z**. Do not offer price sorting if prices are incomplete or incomparable.

- Keep the search term and filters in the URL query string where practical so a filtered catalog can be shared and browser back/forward works.

### Product cards

Each card should show, when available from the verified source:

- Product/service name.

- Listing type and category.

- A factual short description.

- Official price and tax context, if present and current.

- Origin or brand only if supplied by the source.

- A clear **Lihat di INAPROC** action that opens the exact official listing.

Do not overemphasize badges. Keep cards consistent even when some data fields are absent; omit unavailable values instead of filling placeholders that look factual.

### Catalog states

- **Loading:** stable skeletons and concise text such as “Memuat katalog…”. Do not show stale totals as current.

- **No matches:** explain that no items match and provide a one-step clear-filter action.

- **Empty source:** explain that there are currently no listings to show and link to the official profile.

- **Error:** state that catalog data could not be loaded, offer a retry control, and retain the official INAPROC link.

- **Stale data:** show the last verification date and avoid real-time claims.

## 6. Visual system

### Color tokens

Use CSS custom properties as the source of truth. Keep all text/background combinations WCAG AA compliant and verify actual combinations with a contrast checker.

| Token | Hex | Role |
| --- | --- | --- |
| `--color-canvas` | `#FFFFFF` | Main page background |
| `--color-wash` | `#F5F7FA` | Alternating page bands and quiet panels |
| `--color-wash-2` | `#E9EDF3` | Third, slightly deeper band for section rhythm |
| `--color-surface` | `#FFFFFF` | Cards, menus, and form surfaces |
| `--color-rule` | `#D9E0E9` | Dividers and control outlines |
| `--color-rule-strong` | `#B9C4D2` | Grid patterns and stronger separations |
| `--color-ink` | `#0B1D36` | Primary text, headings, and dark navy bands |
| `--color-ink-soft` | `#24395B` | Dense secondary text on light surfaces |
| `--color-muted` | `#4C5E78` | Secondary text; verify contrast on each surface |
| `--color-navy` | `#0B1D36` | Dark band background (hero, closing CTA, footer) |
| `--color-navy-soft` | `#14304F` | Raised surfaces and hovers inside navy bands |
| `--color-accent` | `#C9A227` | Brand gold: primary actions, active states, motifs |
| `--color-accent-hover` | `#B08D1F` | Darker accessible hover and pressed state |
| `--color-accent-ink` | `#8A6A12` | Accent-colored **text** on light surfaces (AA) |
| `--color-accent-soft` | `#FAF3DF` | Quiet gold fills, selected chips, icon wells |
| `--color-on-accent` | `#0B1D36` | Text on the gold accent fill (navy) |
| `--color-success` | `#1F7A52` | Confirmed success state only |
| `--color-error` | `#B42318` | Error state only |

Navy `#0B1D36` and gold `#C9A227` form the brand pair supplied by the owner. Gold is a **fill**, not a text color on light surfaces: white-on-gold fails contrast, so primary buttons use a gold fill with navy labels (`--color-on-accent`), and any gold-tinted text on light surfaces uses `--color-accent-ink`. Verified ratios: navy-on-gold ≈ 7.0:1, white-on-navy ≈ 16.9:1, gold-on-navy ≈ 7.0:1, `accent-ink`-on-white ≈ 5.0:1. Focus outlines use `--color-accent-ink` so they stay visible on both light and navy surfaces. Restrained atmospheric gradients—the navy `navy-surface` mesh and a fine `grid-pattern`/`navy-grid`—are allowed only as low-opacity backgrounds behind content; do not use large saturated color fields, neon, or decorative status colors.

### Typography (decided)

- **Font:** Geist, self-hosted via `next/font`, defined in one place (`lib/fonts.ts`). Fallback: system sans-serif stack. All text on the site, including image labels and hotspot cards, uses this family. No second family. Do not depend on proprietary Apple fonts.

- **Weights:** hero and display headings 700; other headings 600; body 400; labels and buttons 500.

| Token | Value |
| --- | --- |
| `--text-hero` | `clamp(2.5rem, 1.05rem + 5vw, 5rem)`, line-height 1.02, tracking -0.035em |
| `--text-display` | `clamp(2rem, 1.3rem + 2.6vw, 3.5rem)`, line-height 1.06, tracking -0.03em |
| `--text-h2` | `clamp(1.9rem, 1.25rem + 2.2vw, 3rem)`, line-height 1.08, tracking -0.025em |
| `--text-h3` | `clamp(1.125rem, 1rem + 0.5vw, 1.5rem)`, line-height 1.3 |
| `--text-body` | `clamp(1rem, 0.95rem + 0.2vw, 1.125rem)`, line-height 1.6 |
| `--text-small` | `0.875rem` (14px, the minimum for any content text) |

- Keep paragraph line length around 60–70 characters. Long descriptions should be left-aligned.

- Use font weight and spacing to establish hierarchy. Do not rely on uppercase, color, or tiny labels alone to communicate meaning.

- Use one `<h1>` per page and a logical heading order.

### Layout and surfaces (decided)

| Token | Value |
| --- | --- |
| Spacing scale | 4, 8, 12, 16, 24, 32, 48, 64, 96px (4px base unit) |
| `--space-section` | `clamp(4rem, 2rem + 5vw, 7.5rem)` (≈64–120px) |
| `--space-gutter` | `clamp(1rem, 0.5rem + 2vw, 2.5rem)` |
| `--container-max` | 1200px |
| `--radius-card` | 20px |
| `--radius-control` | 12px (buttons, inputs) |
| `--radius-pill` | 9999px (filter chips and hotspot markers only) |
| Shadows | none on cards; a hairline `--color-rule` only where separation is needed |

- Separate sections mainly with whitespace and subtle neutral backgrounds. Use thin rules when they aid grouping.

- Avoid an oversized amount of blank space that hides the next useful action. Keep the catalog information-dense enough for procurement comparison while preserving readable breathing room.

- Do not place text over a busy product image. Ensure every section remains understandable if imagery fails to load.

### Buttons and links

- Primary action: solid gold (`--color-accent`) with navy (`--color-on-accent`) label, strong contrast, clear verb-first Indonesian text.

- Secondary action: outlined or text-link style with an obvious focus/hover state. On navy surfaces, the outlined variant uses a translucent white border and white label.

- Accent-colored text and inline links on light surfaces use `--color-accent-ink`, never the bright gold fill color.

- Links should describe the destination. Avoid ambiguous labels such as “Klik di sini”.

- Minimum touch target: 44 × 44px.

- External links should be identifiable; use a new tab only when it helps users keep their place, and announce that behavior accessibly.

- Links that carry a query string place it **before** the hash (`/?layanan=layar#kontak`), never after it.

## 7. Video, imagery, and 3D storytelling

Use product storytelling as a deliberate part of the home-page experience: a concise video and a restrained 3D scene can make the company’s offer easier to understand. They must support—not replace—the catalog, written explanation, trust information, or contact path. Keep the catalog route focused on finding and comparing listings; do not add video or 3D to every product card.

### Video

- Reserve one clearly labelled video feature on the home page for a real company introduction, product/service demonstration, or procurement-process explanation. Choose a subject that the company can substantiate and that helps institutional buyers understand the offer.

- Use owner-provided or rights-cleared footage. Do not invent client footage, product capabilities, testimonials, tender outcomes, logos, or claims. If suitable footage is not yet available, design the video section with an approved poster and a clearly marked content placeholder for the owner—never ship fabricated footage as real company evidence.

- Give the video a concise title, a poster image, visible play/pause and volume controls, and captions/transcript when spoken information matters. Do not autoplay with sound. If a muted preview is used, it must be short, silent, pausable, and respect reduced-motion preferences.

- Load the video only when needed or near the viewport. Use a responsive player, reserve its aspect ratio to prevent layout shifts, and provide a stable fallback if playback is unavailable.

- Do not place text or the primary CTA over moving footage. Keep the section’s meaning and key information available as ordinary HTML text.

### 3D scene

- Include one focused 3D storytelling scene on the home page, not throughout the site. Its purpose is to make the relationship between equipment, software, and service understandable—not to simulate a specific product or imply an unverified capability.

- Concept: a clean, generic, unbranded IT device shown assembled, then gently separated into a few understandable layers. A neutral interface panel may represent software, and simple connection lines may represent implementation/support. Avoid healthcare-specific visuals unless a specific verified software listing is being described.

- Use original procedural geometry or a rights-cleared model. Do not copy a manufacturer’s design or present the generic model as an exact item sold by the company.

- Keep the camera calm: a slow orbit or controlled dolly, subtle idle motion, and clear cause-and-effect transitions. No spinning, shake, continuous scroll trapping, bloom, particles, cyberpunk/neon effects, or heavy glassmorphism.

- Load the scene after the core page content, pause it off-screen or when the tab is hidden, cap device pixel ratio on mobile, and provide a static poster/illustration fallback. The visitor must not need WebGL to understand the offer or reach the catalog/contact CTA.

- On mobile, shorten or simplify the animation rather than forcing a long pinned scroll sequence. With `prefers-reduced-motion`, show the static scene and remove camera travel and idle movement.

- The 3D scene and the Pemeliharaan visual (4.1) are separate. The 3D scene explains the offer at a high level; Pemeliharaan lists component-level services. Do not reuse one as the other.

### Asset and visual rules

- Prefer original, lightweight illustrations or rights-cleared assets. Do not copy product images from INAPROC or manufacturers without approval.

- Do not use hospitals, doctors, or medical-device scenes as generic company imagery. Use a neutral software/interface illustration for a specific software catalog category, when useful.

- Keep the corporate look: soft-white and cool-neutral surfaces inside bright content bands, deep navy bands for hero and closing CTA, product imagery with breathing room, and restrained gold accents. The object or footage is the visual focus; avoid dense overlays and decorative chrome.

## 8. Motion and interaction

- Motion should clarify the story or confirm an action; it must never delay content, hide a control, or trap scrolling. Use a restrained easing curve such as `cubic-bezier(0.22, 1, 0.36, 1)`.

- Typical durations: 150ms for micro-feedback, 200–300ms for controls, and up to 500ms for simple reveals. The home-page 3D story may progress with scroll, but keep each stage short and release scroll naturally. The catalog remains a conventional, fast, non-pinned page.

- Do not smooth-scroll by default. Native scrolling is more predictable and accessible.

- Respect `prefers-reduced-motion`: remove nonessential transitions, parallax, carousel auto-rotation, video previews, and 3D camera movement; show static alternatives.

- Do not rely on hover-only discovery. Every interactive behavior must also work by keyboard and touch.

- Focus indicators must be visible, consistent, and not obscured by sticky navigation.

- If the home page has a featured-product slider, keep it to 3–5 verified items. Provide visible previous/next controls, slide position, keyboard/touch support, and a direct **Lihat semua produk** link. Auto-rotation is off by default; if specifically enabled, provide a pause control and stop it on user interaction.

- Video controls must remain visible and usable with keyboard and touch. Never start audio automatically.

## 9. Responsive behavior

- Design and validate at approximately 360px, 390px, 768px, 1024px, and 1440px widths.

- The page must not have horizontal overflow at common mobile sizes.

- Header controls should collapse intentionally. Keep the catalog search easy to reach; present advanced filters in a mobile sheet or drawer.

- Product cards should use a single-column layout on narrow screens, then progressively denser layouts on larger screens without making card content too small.

- Keep buttons full-width only when that improves mobile usability. Preserve clear spacing between actions.

- Crop imagery responsively without removing essential content.

- Test both portrait and landscape where the 3D scene or carousel is present.

- The Pemeliharaan section switches layout at 768px (see 4.1): side labels with leader lines above, image plus vertical component list below.

## 10. Accessibility and robustness

- Target WCAG 2.2 AA for text contrast, keyboard access, focus visibility, and form error communication.

- Use semantic landmarks, buttons for actions, links for navigation, labels for inputs, and accessible names for icon-only controls.

- Provide text alternatives for informative images; hide decorative assets from assistive technology. An exploded-view image needs a descriptive alt text that names the five components.

- Carousel controls must expose slide position and pause state. Auto-play is off by default.

- Announce catalog result-count changes and asynchronous status updates without moving focus unexpectedly.

- Keep focus trapped and returned appropriately when a mobile filter drawer or menu is opened and closed.

- A closed menu/drawer must not leave hidden controls keyboard-focusable.

- Forms must work with keyboard, have field-level error text, retain safe entered values after validation errors, and announce submission outcome.

- Ensure the core page content remains available if JavaScript, WebGL, imagery, or the catalog data request fails.

## 11. Performance and technical guardrails

- Prioritize readable server-rendered page content, the hero heading, and primary links. Neither video nor the 3D canvas may be the only carrier of essential information or block the initial page render.

- Target LCP under 2.5 seconds on a representative mobile connection; keep scripts and media proportionate to the page’s purpose.

- Defer the 3D bundle and video player until needed. Use a poster/fallback, reserve media dimensions to prevent layout shifts, and avoid downloading full video data before playback.

- Pause 3D and any preview animation when off-screen or when the browser tab is hidden. Keep the catalog route free of heavy 3D/video libraries unless essential to the catalog itself.

- Avoid loading heavy libraries on the catalog route unless they provide essential catalog functionality.

- Catalog loading must be bounded and resilient. Use caching only with a visible freshness policy; handle timeouts and provider errors.

- Avoid exposing private credentials or webhook secrets in client code. A contact form must not claim delivery unless the server confirms it.

- Keep route metadata and page copy accurate. Example home title: `PT Agung Wijaya Nitya | Katalog dan Solusi Pengadaan`. Adjust if the owner confirms a more precise positioning.

### 11.1 Stack reference

- Next.js (App Router), strict TypeScript, Tailwind CSS with the tokens above defined once in the global stylesheet. No hardcoded hex values in components.

- All copy, links, constants, and maintenance data live in `src/content/` (e.g. `site.ts`, `maintenance.ts`). Components never hardcode copy.

- One component per file. Folders: `components/`, `sections/`, `hooks/`, `content/`.

- Animation: keep the library count small. Do not add a smooth-scroll library (Section 8 forbids smooth-scroll by default).

- Images go through `next/image` with an explicit `sizes` attribute and reserved dimensions. Never default to the largest generated width for small elements such as the logo.

## 12. Content style

- Write in natural, concise Indonesian.

- Prefer concrete descriptions over slogans. Explain what a visitor can do next.

- Separate **official catalog facts**, **company statements**, and **design copy** so they are not mistaken for each other.

- Use sentence case for headings and action labels. Use acronyms such as INAPROC, UMKK, KBLI, PPK, and BoQ only when relevant; explain less familiar terms on first use.

- Use “TI” consistently in Indonesian copy (not a mix of “IT” and “TI”), except inside names such as “INAPROC”.

- Do not call a listing “unggulan”, “terlaris”, “terverifikasi”, “ready stock”, or “resmi bergaransi” unless the source supports that exact statement.

- Ensure metadata, social previews, navigation labels, and on-page headings describe the same business accurately.

## 13. Open items requiring owner confirmation

- Official logo vector/high-resolution asset (the current logo is used as-is; the navy/gold interface palette is owner-supplied and independent of the mark).

- Confirmed phone/WhatsApp number.

- Whether the 742 listing count is still current at the next release.

- Company-approved description and emphasis across software/system services, IT equipment, other goods, maintenance, and rental.

- Rights to use supplier/product imagery or logos.

- Whether a contact form is desired and the authorized destination/retention policy for submitted data.

- Whether catalog data can be synchronized through an authorized source/API and how often it should refresh.

- Confirmation of any warranty, delivery, support, or service-level statements before they appear as factual claims.

- Which maintenance services are actually offered for each of the five components, for which device types, and the real durations (until then every `MaintenanceItem` stays `confirmed: false`).

- Whether the “Unit siap pengadaan” highlights can link to real INAPROC listings. Without a matching listing, use category highlights instead of specific unit specifications (see Featured products).

## 14. Acceptance checklist (per section)

A section is done only when every applicable item is true.

**Content and claims**

- [ ] Every factual claim traces to Section 1, or is flagged as unconfirmed and hidden or neutralized.
- [ ] No placeholder data is used as a primary contact (phone, WhatsApp) or presented as real.
- [ ] No product specification, stock, price, warranty, client, or duration appears without a source or confirmation.
- [ ] Forbidden words in Section 12 do not appear without source support.
- [ ] Title, meta description, social preview, navigation, and headings describe the same business.

**Design tokens**

- [ ] Font is Inter via `next/font`, and image labels and hotspot cards use the same family.
- [ ] Colors, spacing, radius, and type sizes come from the tokens in Section 6, with no hardcoded values.
- [ ] Text is at least 14px, and touch targets are at least 44 × 44px.
- [ ] Contrast is checked with a contrast checker for each text/background pair actually used.

**Behavior**

- [ ] All interactive elements work by keyboard and touch, with a visible focus indicator not hidden by the sticky header.
- [ ] Links with query parameters place the query before the hash and land on the right section.
- [ ] Cards, menus, and drawers close with `Esc` and return focus to their trigger.
- [ ] `prefers-reduced-motion` shows static alternatives, with no camera travel and no auto-rotation.

**Robustness and performance**

- [ ] The section stays readable without JavaScript, WebGL, or images.
- [ ] Verified at 360, 390, 768, 1024, and 1440px, with no horizontal overflow.
- [ ] Images use `next/image` with `sizes`, reserved dimensions, and meaningful alt text (or empty alt if decorative).
- [ ] No new heavy library is loaded on the catalog route, and LCP stays under 2.5s on a mobile connection.

**Catalog (`/katalog`)**

- [ ] Loading, no-match, empty, error, and stale states are implemented, with a persistent INAPROC link.
- [ ] Search and filters live in the URL query string, and back/forward works.
- [ ] Cards omit unavailable fields instead of showing look-alike placeholders.

**Pemeliharaan (`#pemeliharaan`)**

- [ ] Exactly five components, each shown once, numbered 01–05 in the same direction at every breakpoint.
- [ ] Each leader point lands on the component it names (battery is not labelled bottom cover).
- [ ] Services and durations appear only for items with `confirmed: true`.
- [ ] “Tanya layanan ini” and “Jadwalkan pemeliharaan” reach the contact section, with the component name pre-filled or visible.
- [ ] Hotspots are keyboard-focusable buttons with an `aria-label`, and the mobile list layout works below 768px.