# Agung Nitya — Motion System

This document defines the motion language, animation behavior, scroll choreography, 3D movement, interaction rules, and performance requirements for the Agung Nitya website.

It works together with `DESIGN.md`.

`DESIGN.md` defines the visual language.

`MOTION.md` defines how that visual language moves.

The motion system must preserve the core experience:

> One system. One visual language. One continuous story.

The website should feel like a cinematic technological artifact being explored through a camera.

It must NOT feel like a collection of unrelated animations.

---

# 1. Motion Philosophy

The motion language combines:

* Oryzo-inspired spatial storytelling
* Apple's restraint
* Linear's precision
* premium enterprise technology
* cinematic product presentation

Motion should feel:

* cinematic
* minimal
* premium
* controlled
* elegant
* smooth
* spatial
* intentional
* physically believable

Animation exists to communicate:

* connection
* separation
* hierarchy
* transformation
* progression
* continuity

Never animate something simply because it can be animated.

---

# 2. Core Motion Principle

## ONE CONTINUOUS WORLD

The entire website should feel like one continuous spatial environment.

The Unified Hospital Data System is the primary visual object.

The user should feel like they are moving a camera through one technological artifact.

Do NOT create completely independent visual scenes for every section.

Instead:

* the camera moves
* objects move
* modules separate
* modules reconnect
* the system changes state
* information appears
* the same environment persists

The visual world should remain coherent from Hero to CTA.

---

# 3. Motion Character

Motion must be:

* slow
* deliberate
* smooth
* spatial
* precise
* physically believable
* cinematic

Avoid:

* bounce
* elastic motion
* excessive spring
* flashing
* rapid zoom
* aggressive rotation
* constant floating
* random movement
* excessive parallax
* excessive blur
* neon glow
* attention-seeking transitions

The motion should feel expensive because it is controlled.

---

# 4. Motion Tokens

## 4.1 Duration

| Token     |      Value | Usage                     |
| --------- | ---------: | ------------------------- |
| Instant   |      0.15s | Icon and micro feedback   |
| Fast      | 0.25–0.35s | Buttons and hover         |
| Normal    |       0.6s | UI reveal                 |
| Slow      |       0.9s | Section content           |
| Cinematic |   1.2–1.8s | Major visual movement     |
| Spatial   |       2–4s | 3D camera/object movement |

Do not use long animations for simple UI interactions.

Long durations are reserved for cinematic spatial movement.

---

# 5. Easing

Primary easing:

```text
cubic-bezier(0.22, 1, 0.36, 1)
```

GSAP equivalent:

```js
ease: "power3.out"
```

For continuous camera movement, use carefully controlled interpolation rather than aggressive easing.

Avoid:

* bounce
* elastic
* back-heavy easing
* abrupt linear movement for major cinematic sequences

---

# 6. Global Reveal System

Not every element needs a reveal animation.

Major content blocks may use:

Initial:

```css
opacity: 0;
transform: translateY(32px);
```

Visible:

```css
opacity: 1;
transform: translateY(0);
```

Optional blur:

```css
filter: blur(4px);
```

Avoid excessive blur.

Blur should be subtle and short-lived.

---

## 6.1 Reveal Rules

Trigger:

`18% viewport`

Duration:

`0.6–0.8s`

Stagger:

`0.06–0.1s`

Play once.

Do not animate every paragraph, icon, and child element individually.

Prefer one intentional reveal per visual group.

---

# 7. Hero Motion

The Hero introduces the Unified Hospital Data System.

The 3D system is the primary visual focus.

Do NOT use the old:

* floating particle field
* generic neural network
* abstract metallic object

as three independent hero layers.

Instead, the entire hero should be one coherent 3D environment.

---

## 7.1 Hero 3D Layers

### Layer 1 — Environment

Very subtle atmospheric depth.

Movement:

`0.1x`

Purpose:

Create spatial depth.

---

### Layer 2 — Unified System

The primary 3D object.

Movement:

`0.25–0.4x`

Purpose:

Communicate the hospital information architecture.

---

### Layer 3 — Camera

Very slow cinematic movement.

Movement:

`0.15–0.25x`

Purpose:

Create the feeling that the viewer is observing a physical artifact.

---

## 7.2 Hero Camera

Initial camera:

* slightly offset
* system centered visually
* large negative space
* no aggressive perspective distortion

During initial load:

Camera slowly settles into position.

Avoid:

* camera shaking
* rapid dolly
* extreme orbit
* spinning object

---

# 8. Hero Typography Reveal

Sequence:

1. Eyebrow
2. Headline
3. Supporting copy
4. Primary CTA
5. Secondary CTA

Delay:

`80–120ms`

Use opacity + small vertical translation.

Do not animate every individual character unless specifically required.

Line-based headline animation is acceptable.

---

# 9. Unified Hospital Data System

This is the most important motion system on the website.

The 3D system should evolve through scroll.

The user is not switching between unrelated scenes.

The user is observing one system changing state.

---

# 10. Scroll Storytelling

Use:

GSAP + ScrollTrigger

for the primary cinematic timeline.

Major sections may use:

```text
pin: true
scrub: 1
```

Use `scrub` to make movement directly connected to scrolling.

Do not use excessive independent autoplay animation.

---

# 11. Master 3D Timeline

The main storytelling sequence may occupy approximately:

`300vh–500vh`

depending on implementation and performance.

The exact height is not mandatory.

The timeline should be long enough to allow cinematic movement without making scrolling feel unnecessarily slow.

---

# 12. Scene 01 — Unified System

Progress:

`0% → 20%`

The system begins fully connected.

Visual state:

* central data core
* hospital modules connected
* subtle data movement
* stable camera
* large negative space

Motion:

* extremely slow camera movement
* subtle system rotation
* restrained data flow

The initial feeling should be:

> Everything is connected.

Do not immediately throw the viewer into a fast animation.

---

# 13. Scene 02 — Fragmentation

Progress:

`20% → 40%`

The system begins to separate.

Modules slowly move away from the central data layer.

Connections become longer and weaker.

Data movement becomes interrupted.

The camera moves slightly backward to reveal the growing separation.

Do NOT use:

* red warning states
* alarm animations
* flashing
* error popups

The physical separation itself communicates the problem.

Message:

> Disconnected systems create disconnected data.

---

# 14. Scene 03 — Reconnection

Progress:

`40% → 60%`

The system begins reconnecting.

Modules move toward the central data core.

Connections reform.

Data flow becomes continuous.

The camera slowly moves toward the system.

The central data layer becomes visually dominant.

Message:

> One database. Every unit connected.

This should be one of the strongest visual moments on the website.

---

# 15. Scene 04 — Module Exploration

Progress:

`60% → 75%`

The camera moves through the unified system.

Individual modules become identifiable.

Possible focus sequence:

1. Registration
2. Pharmacy
3. Laboratory
4. Medical Records
5. Billing

The camera should move toward each module rather than making the entire scene disappear and reappear.

The rest of the system remains subtly visible.

This maintains continuity.

---

# 16. Scene 05 — Operational Flow

Progress:

`75% → 90%`

The system becomes stable.

Data movement becomes smooth and continuous.

The camera moves through the architecture.

The visual language communicates:

* operational maturity
* continuity
* integration
* reliability

Motion should become calmer.

---

# 17. Scene 06 — Complete System

Progress:

`90% → 100%`

The camera slowly pulls back.

The entire Unified Hospital Data System becomes visible.

All major modules are connected.

The system reaches its final stable composition.

The visual should feel complete rather than explosive.

Avoid:

* giant glow
* dramatic particle burst
* flash
* excessive scale-up
* cinematic explosion

The ending should be quiet and confident.

---

# 18. Section Transitions

Sections should transition through spatial continuity.

Preferred:

* camera movement
* depth movement
* object transformation
* subtle opacity
* controlled vertical translation

Avoid:

* horizontal page slides
* page wipes
* aggressive zoom transitions
* full-screen flashes
* random color transitions

The user should feel like the camera is traveling through one environment.

---

# 19. Module Cards

Module cards use Framer Motion.

Default:

```text
scale: 1
y: 0
```

Hover:

```text
scale: 1.02
y: -4px
```

Duration:

`0.3s`

Use a subtle reflection only if it enhances the interaction.

Avoid:

* glowing borders
* large movement
* heavy tilt
* excessive glass effects

Cards remain secondary to the 3D system.

---

# 20. Statistics

Statistics should animate once.

Example:

```text
0 → 98%
```

Duration:

`1.2–1.4s`

Use GSAP.

Trigger when entering the viewport.

Do not loop.

Do not animate statistics continuously while scrolling.

Do not exaggerate statistics visually.

---

# 21. Technology Marquee

If a technology/company logo strip is required:

Direction:

left

Duration:

approximately `24–30s`

Infinite:

yes

Pause on hover:

yes

Default opacity:

`0.55`

Hover:

`1`

The marquee must remain subtle.

It must not become a dominant animation.

---

# 22. Buttons

## Primary CTA

Hover:

```text
scale: 1.02–1.03
y: -1px
```

Duration:

`0.25–0.3s`

Active:

```text
scale: 0.98
```

Do not exceed:

`1.03`

No glow.

No exaggerated magnetic movement by default.

---

## Secondary CTA

Hover:

```text
background: rgba(255,255,255,0.05)
```

Border becomes slightly more visible.

Duration:

`0.25–0.3s`

Do not use large fill transitions.

---

# 23. Navigation Motion

Initial state:

* transparent
* minimal

After scrolling:

* subtle dark background
* subtle backdrop blur
* subtle border

Transition:

`0.4–0.6s`

Do not make navigation slide dramatically.

Navigation should feel like it is settling into the environment.

---

# 24. Cursor Interaction

Cursor interactions should be subtle.

Allowed:

* button hover
* small magnetic movement
* card reflection
* subtle 3D response

Avoid turning the entire website into an interactive cursor experiment.

---

## 24.1 Magnetic CTA

Only use magnetic interaction for the primary CTA if it improves usability.

Maximum movement:

`6–8px`

Magnetic radius:

`40px`

Movement must remain subtle.

Do not use magnetic behavior on every interactive element.

---

# 25. 3D Object Interaction

The main 3D system may respond slightly to pointer movement.

Maximum:

```text
rotateX: ±1.5°
rotateY: ±2°
```

Keep the response extremely subtle.

The system should never chase the cursor aggressively.

The camera should remain the primary storytelling mechanism.

---

# 26. Particle System

Particles are optional.

They are NOT a primary design element.

If used:

Desktop:

`20–40`

Mobile:

`8–16`

Properties:

* size: 1–2px
* opacity: 0.1–0.25
* very slow movement
* low contrast

Particles should behave like environmental dust or atmospheric depth.

They must NOT resemble:

* stars
* neural networks
* digital rain
* glowing data clouds

No cursor-following particles.

No particle explosions.

---

# 27. Atmospheric Motion

Subtle environmental movement may be used for depth.

Examples:

* extremely slow light movement
* subtle fog movement
* slow camera drift
* minor depth changes

Duration:

`8–20s`

This movement should be almost imperceptible.

The user should notice the environment, not the animation itself.

---

# 28. Founder / About Interaction

If a founder card exists, it should remain secondary to the product.

Use Framer Motion for subtle interaction.

Pointer response:

```text
rotateX: ±2°
rotateY: ±2°
```

Do not use aggressive 3D tilt.

Glass reflection may follow pointer movement subtly.

No shadow explosion.

No glowing border.

---

# 29. Library Ownership

## Three.js / React Three Fiber

Responsible for:

* Hero 3D environment
* Unified Hospital Data System
* central data core
* module geometry
* technical materials
* lighting
* camera
* subtle environmental particles
* 3D depth

---

## GSAP + ScrollTrigger

Responsible for:

* cinematic scroll storytelling
* pinned sequences
* camera movement
* object transforms
* module separation
* module reconnection
* scene progression
* number counters
* major text reveals

---

## Framer Motion

Responsible for:

* button hover
* card hover
* subtle magnetic interaction
* small UI transitions
* founder card tilt
* glass reflection
* micro-interactions

---

## Ownership Rule

Never allow GSAP and Framer Motion to control the same property of the same element simultaneously.

Example:

BAD:

```text
GSAP → transform
Framer Motion → transform
```

GOOD:

```text
GSAP → 3D camera/object transform

Framer Motion → UI hover state
```

---

# 30. Three.js Architecture

Prefer a reusable scene architecture.

Conceptually:

```text
UnifiedHospitalScene
├── Environment
├── Camera
├── Lighting
├── DataCore
├── RegistrationModule
├── OutpatientModule
├── InpatientModule
├── PharmacyModule
├── LaboratoryModule
├── MedicalRecordsModule
├── BillingModule
└── OperationsModule
```

The scene should expose controllable state/progress values.

Example conceptual states:

```text
UNIFIED
FRAGMENTED
RECONNECTING
EXPLORING
OPERATIONAL
COMPLETE
```

GSAP / ScrollTrigger should drive the progression between these states.

Do not recreate the entire scene at every scroll section.

---

# 31. Camera Rules

The camera is a storytelling tool.

Use:

* slow dolly
* subtle orbit
* controlled zoom
* depth transitions
* intentional framing

Avoid:

* constant spinning
* fast camera rotation
* random camera shake
* extreme FOV changes
* sudden perspective changes

The camera should feel like a professional product film camera.

---

# 32. Responsive Motion

Desktop:

Full cinematic experience.

Tablet:

Reduce:

* camera movement
* object count
* particle count
* scroll complexity

Mobile:

Prioritize:

* readability
* system clarity
* performance

Reduce:

* complex camera paths
* excessive 3D geometry
* long pinned sequences
* expensive effects

The concept must survive even when the 3D experience is simplified.

---

# 33. Reduced Motion

When:

```css
@media (prefers-reduced-motion: reduce)
```

or equivalent JavaScript detection is active:

Disable or reduce:

* camera movement
* parallax
* object rotation
* particles
* complex 3D transitions
* pinned storytelling

Replace with:

* opacity
* simple fade
* minimal transform

Maximum UI transition duration:

`250ms`

The content and product story must remain fully understandable.

---

# 34. Performance Rules

Target:

`60 FPS`

Prioritize:

* transform
* opacity
* GPU-friendly animation
* optimized geometry
* optimized textures
* lazy loading
* controlled pixel ratio
* efficient rendering

Avoid unnecessary:

* layout recalculation
* DOM measurement on every frame
* expensive filters
* excessive post-processing
* large texture files
* unnecessary object duplication

Use:

```css
will-change: transform;
```

only where appropriate.

Do not apply `will-change` globally.

---

# 35. Loading Strategy

Heavy 3D assets should load progressively.

Initial page should remain visually composed even while the 3D system is loading.

Use:

* lightweight initial state
* lazy loading where appropriate
* progressive asset loading
* optimized GLTF/GLB assets
* compressed textures

Never show a broken or empty hero while waiting for the entire 3D scene.

---

# 36. Motion Anti-Patterns

NEVER create:

* cyberpunk animation
* neon trails
* glowing network explosions
* holographic HUD transitions
* digital rain
* aggressive particle effects
* random floating UI
* excessive object rotation
* constant parallax
* dramatic bounce
* elastic text
* flashing effects
* page shake
* excessive blur
* giant glow pulses
* random 3D objects
* meaningless camera movement

If the animation looks impressive but does not communicate the product, remove it.

---

# 37. Motion Decision Hierarchy

When animation decisions conflict, follow this priority:

1. Product storytelling
2. Spatial continuity
3. Readability
4. Physical believability
5. Performance
6. Micro-interaction
7. Decorative motion

Never prioritize decorative animation over product understanding.

---

# 38. Motion Acceptance Checklist

Before considering the motion system complete:

* [ ] Hero introduces one coherent 3D system
* [ ] 3D system remains visually consistent across sections
* [ ] Hero typography reveals sequentially
* [ ] Camera movement is slow and intentional
* [ ] Problem state visually fragments the system
* [ ] Solution state reconnects the system
* [ ] Module exploration uses the same 3D world
* [ ] Process section communicates progression
* [ ] Final CTA returns to the complete system
* [ ] Module cards have subtle lift
* [ ] Statistics count once
* [ ] Navigation transition is subtle
* [ ] Particles are optional and restrained
* [ ] No cyberpunk effects exist
* [ ] No excessive neon exists
* [ ] No random floating objects exist
* [ ] No unnecessary bounce or elastic animation exists
* [ ] GSAP controls cinematic motion
* [ ] Framer Motion controls micro-interactions
* [ ] Three.js controls spatial rendering
* [ ] GSAP and Framer Motion never fight over the same property
* [ ] Reduced Motion is supported
* [ ] Mobile motion is simplified
* [ ] 3D remains performant
* [ ] Motion feels like one continuous product film
* [ ] The website feels premium without relying on effects

---

# 39. Final Motion Target

The ideal experience is:

> The user scrolls through one sophisticated technological artifact.

The camera moves.

The system separates.

The system reconnects.

The camera explores the modules.

The system becomes operational.

The camera pulls back.

The complete hospital information ecosystem is visible.

The CTA appears.

Everything stops.

The final feeling should be:

> Calm technology. Clear integration. Serious capability.

Not:

> Look how many effects this website has.
