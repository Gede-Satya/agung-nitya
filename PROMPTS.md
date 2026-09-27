# Agung Nitya — Prompt Sequence for Antigravity v2.0

Paste these prompts **one at a time, in order**.

Wait for each result, review the preview/screenshot, and only then move to the next prompt.

**Do not paste the whole sequence at once.**

The purpose of this sequence is to build an **immersive, futuristic, out-of-the-box healthcare technology experience**, not a generic corporate landing page.

---

## CORE CREATIVE DIRECTION

The website is for **PT. Agung Wijaya Nitya**, a healthcare technology company focused on **SIMRS / hospital information systems**.

The core concept is:

> **THE DIGITAL HEALTHCARE ECOSYSTEM**

The website should feel like the visitor is entering and exploring a **living digital healthcare infrastructure**.

The experience should communicate:

```text
PATIENT
   ↓
DATA
   ↓
SYSTEM
   ↓
MODULES
   ↓
WORKFLOW
   ↓
CONNECTED HEALTHCARE
```

The website should be:

* futuristic
* sophisticated
* technical
* cinematic
* premium
* experimental
* intelligent
* out-of-the-box
* credible for a professional healthcare technology company

### IMPORTANT

Do NOT interpret "futuristic" as:

* cyberpunk
* excessive neon
* RGB
* hacker aesthetic
* excessive glow
* generic AI startup design
* excessive glassmorphism
* gradient-heavy SaaS design
* excessive rounded cards

Futuristic should come primarily from:

* interaction
* spatial composition
* system visualization
* data flow
* kinetic typography
* scroll-driven transformation
* depth
* parallax
* technical diagrams
* connected systems
* animated architecture
* unexpected transitions
* changing visual states

### CORE EXPERIENCE PRINCIPLE

**SCROLL SHOULD FEEL LIKE CONTROLLING THE SYSTEM.**

The website should not feel like:

```text
Hero
↓
Card section
↓
Card section
↓
Timeline
↓
Statistics
↓
Footer
```

Instead, it should feel like one continuous story:

```text
SYSTEM
   ↓
ACTIVATION
   ↓
FRAGMENTATION
   ↓
CONNECTION
   ↓
ECOSYSTEM
   ↓
DEPLOYMENT
   ↓
TRUST
   ↓
CONNECTED HEALTHCARE
```

A visual element can transform into the next section.

A network can become a diagram.

A diagram can become typography.

Typography can become a layout.

A layout can become the next system state.

Do not make every section look identical.

---

# 0. CONTEXT + EXPERIENCE DIRECTION

```text
Ini project landing page untuk PT. Agung Wijaya Nitya.

Baca dan pahami dua file di root project terlebih dahulu:

DESIGN.md
WIREFRAME.md

DESIGN.md adalah source of truth untuk:
- warna
- typography
- spacing
- radius
- components
- design tokens
- content yang sudah ditentukan

WIREFRAME.md adalah source of truth untuk:
- struktur layout
- posisi elemen
- behavior
- bento grid
- hero structure
- interaction direction

Gunakan keduanya sebagai fondasi.

JANGAN mengabaikan DESIGN.md atau WIREFRAME.md.

Namun, mulai dari sekarang terdapat creative direction tambahan:

WE ARE NOT BUILDING A GENERIC CORPORATE WEBSITE.

WE ARE BUILDING AN IMMERSIVE DIGITAL HEALTHCARE EXPERIENCE.

Core concept:

"THE DIGITAL HEALTHCARE ECOSYSTEM"

Website harus membuat pengunjung merasa sedang memasuki dan
mengeksplorasi sebuah digital healthcare infrastructure.

Futuristic tidak boleh hanya berarti:
- neon
- glow
- gradient
- glassmorphism
- rounded cards
- cyberpunk

Futuristic harus terutama berasal dari:
- interaction
- system visualization
- scroll-driven transformation
- kinetic typography
- data flow
- spatial composition
- depth
- technical diagrams
- connected systems
- motion
- unexpected transitions

SCROLL SHOULD FEEL LIKE CONTROLLING THE SYSTEM.

Bento grid dari WIREFRAME.md tetap digunakan jika memang merupakan
bagian dari desain, tetapi jangan menjadikan bento/card sebagai
identitas visual seluruh website.

Jangan membuat:
card → card → card → card.

Gunakan variasi visual:
- immersive scenes
- system maps
- oversized typography
- asymmetric composition
- pinned scenes
- horizontal storytelling
- technical diagrams
- spatial nodes
- kinetic text
- data visualization
- negative space

Jangan membuat klaim perusahaan, statistik, client, awards,
certifications, atau achievements yang tidak tersedia dalam
content project.

Jangan mengganti fakta perusahaan dengan asumsi.

Sebelum melakukan perubahan besar:
1. inspect project structure
2. inspect current stack
3. inspect existing assets
4. inspect existing content
5. inspect DESIGN.md
6. inspect WIREFRAME.md

Preserve useful existing functionality and content.

Jangan langsung rewrite seluruh project.
```

---

# 1. PROJECT SETUP + MOTION FOUNDATION

```text
Cek project setup.

Pastikan project menggunakan:
- Next.js sesuai project saat ini
- React
- TypeScript
- Tailwind CSS sesuai project
- next/font/google jika diperlukan

Jika belum sesuai:
- jangan upgrade dependency secara sembarangan
- gunakan dependency yang sudah tersedia jika memungkinkan
- install dependency baru hanya jika memang diperlukan

Pastikan CSS variables dari DESIGN.md bagian yang relevan tersedia
di globals.css.

Pastikan typography:
- Space Grotesk untuk heading jika ditentukan DESIGN.md
- Inter untuk body jika ditentukan DESIGN.md

Sekarang buat motion foundation yang reusable.

Gunakan:
- GSAP
- ScrollTrigger
- Lenis jika kompatibel
- Framer Motion hanya jika memang diperlukan

Buat utility/component reusable untuk:
- scroll reveal
- text reveal
- parallax
- pinned scenes
- line drawing
- scale transformation
- stagger
- reduced-motion handling

Motion harus memiliki tujuan komunikasi.

JANGAN memberi animasi kepada setiap elemen.

Jika prefers-reduced-motion aktif:
- hentikan continuous animation
- kurangi transform
- hilangkan unnecessary parallax
- pertahankan hierarchy dan informasi
- jangan membuat content menghilang

Jangan mengubah visual utama website dulu.
```

---

# 2. NAVBAR — DIGITAL SYSTEM INTERFACE

```text
Buat Navbar.tsx berdasarkan Nav Pill Link specification
di DESIGN.md.

Pertahankan:
- Logo Agung Nitya
- navigation yang ditentukan
- CTA Jadwalkan Demo

Namun jangan membuat navbar terasa seperti navbar corporate template.

Initial state:
- transparent
- menyatu dengan hero
- minimal

Saat scroll melewati sekitar 80px:
- berubah menjadi compact floating navigation
- solid/subtle fill sesuai DESIGN.md
- backdrop blur jika sesuai DESIGN.md
- smooth transition

Tambahkan active-section indicator secara subtle jika cocok.

Navbar harus terasa seperti interface dari sebuah digital system.

Jangan gunakan excessive glow.

Jangan membuat navbar terlalu besar.

Pastikan mobile navigation tetap usable.
```

---

# 3. HERO — SYSTEM ENTRANCE

```text
Buat HeroSection.tsx berdasarkan WIREFRAME.md.

Pertahankan struktur bento grid jika ditentukan oleh WIREFRAME.md,
tetapi jangan membuat hero terasa seperti kumpulan card biasa.

Hero adalah FIRST WOW MOMENT.

Konsep:

THE DIGITAL HEALTHCARE SYSTEM IS COMING ONLINE.

Headline dan subheadline gunakan content dari DESIGN.md.

Buat typography sangat kuat dan memiliki scale yang berani.

Di sekitar/di belakang typography, bangun visual
healthcare system infrastructure.

Visual dapat terdiri dari:
- central node
- connected nodes
- system lines
- data particles
- technical labels
- subtle grid
- system indicators
- depth layers

Konsep network:

PATIENT
REGISTRATION
CLINICAL
LABORATORY
PHARMACY
BILLING
MANAGEMENT

Gunakan hanya module/content yang memang tersedia dan relevan
di project.

Network jangan terlihat seperti flowchart biasa.

Harus terasa seperti living digital infrastructure.

Beberapa elemen boleh:
- overlap typography
- keluar sedikit dari grid
- berada di background
- berada di foreground
- memiliki depth

Gunakan Three.js / React Three Fiber hanya jika sesuai dengan
project dan memberikan nilai nyata.

Jangan menggunakan stock hospital imagery.

Hero desktop harus immersive.

Hero mobile harus disederhanakan tetapi tetap memiliki
karakter futuristic.

CTA:
- Jadwalkan Demo
- Lihat Modul

Tambahkan subtle "SCROLL TO EXPLORE" jika sesuai desain.
```

---

# 4. HERO — ACTIVATE THE SYSTEM

```text
Fokus hanya pada HeroSection.

Buat system visualization terasa hidup.

Tambahkan secara subtle:
- node pulse
- connection drawing
- data particles
- depth/parallax
- system status indicators
- small technical labels

Jangan membuat semua elemen bergerak bersamaan.

Gunakan rhythm.

Contoh:
satu data packet bergerak melalui network,
kemudian node terkait merespons,
kemudian connection lain aktif.

Animasi harus terasa seperti sistem sedang bekerja.

Gunakan IntersectionObserver atau mekanisme equivalent
untuk menghentikan animation ketika hero tidak terlihat.

Pastikan cleanup Three.js/GSAP benar.

Pada prefers-reduced-motion:
- static network
- no continuous particle animation
- no unnecessary rotation
- tetap tampilkan struktur system.
```

---

# 5. HERO — SCROLL ACTIVATION

```text
Sekarang jadikan scroll sebagai interaction utama Hero.

Gunakan GSAP ScrollTrigger.

Saat user mulai scroll:

1. headline bergerak perlahan
2. typography mengalami scale transformation
3. system visualization menjadi semakin dominan
4. connection lines mulai terbentuk
5. nodes berpindah secara halus
6. data particles mengikuti connection
7. technical labels muncul
8. central node berkembang menjadi connected ecosystem

JANGAN hanya menggunakan fade-in/fade-out.

HARUS ADA TRANSFORMATION.

Hero harus terasa seperti:

STATIC SYSTEM
→
ACTIVATED SYSTEM
→
CONNECTED SYSTEM
→
HEALTHCARE ECOSYSTEM

Gunakan pinned scene jika diperlukan.

Namun jangan mengunci scroll terlalu lama.

Setelah transformation selesai:
- release pin
- lanjutkan normal scrolling
- jangan membuat scroll terasa berat.
```

---

# 6. HERO — BREAK THE GRID TRANSITION

```text
Sekarang buat transition dari Hero menuju Problem section.

Jangan langsung melakukan:
fade out hero → fade in section.

Gunakan visual continuity.

System visualization dari hero harus:
- bergerak
- melebar
- keluar dari container
- berubah posisi
- kemudian menjadi bagian dari visual Problem section

Gunakan oversized typography dan negative space.

Tujuan:
Hero dan Problem harus terasa sebagai SATU continuous scene.

Buat transition unexpected tetapi tetap elegant.

Jangan menambahkan efek hanya demi terlihat ramai.
```

---

# 7. PATIENT JOURNEY — HUMAN ENTRY POINT

```text
Implementasikan Patient Journey dari WIREFRAME.md.

Tetap gunakan lima tahap yang sudah ditentukan:

Datang
Daftar
Periksa
Resep
Pulang

Gunakan Lucide icons yang relevan.

Namun jangan membuatnya sekadar strip lima icon.

Jadikan journey sebagai miniature system flow.

Saat masuk viewport:
- tahap pertama aktif
- connection bergerak
- tahap kedua aktif
- connection berikutnya aktif
- sampai tahap terakhir

Gunakan GSAP timeline.

Jika memungkinkan, hubungkan visual journey dengan
system network language dari Hero.

Jadi:

PATIENT JOURNEY
→
SYSTEM DATA FLOW

bukan sekadar icon animation.

Pada prefers-reduced-motion:
semua state langsung berada pada final state.
```

---

# 8. STAT — DATA AS VISUAL STORY

```text
Implementasikan stat block dari DESIGN.md.

Pertahankan content yang memang sudah ditentukan.

Jangan membuat statistic block terlihat seperti dashboard SaaS.

Gunakan oversized editorial typography.

Jika menggunakan count-up:
- mulai saat masuk viewport
- gunakan easing subtle
- jangan membuat angka berlebihan

Angka harus menjadi bagian dari composition.

Caption tetap jelas dan mudah dibaca.

Jika statistic belum terverifikasi dari sumber project,
jangan menganggapnya sebagai fakta.
Gunakan placeholder atau content yang tersedia.
```

---

# 9. AMBIENT DATA FLOW

```text
Implementasikan Box E dari WIREFRAME.md.

Buat horizontal data flow:

Pendaftaran → RME → Billing

Gunakan CSS/GSAP, bukan WebGL.

Buat beberapa data particles bergerak sepanjang path.

Visual harus terasa seperti:
DATA IS MOVING THROUGH THE SYSTEM.

Buat animasi subtle dan continuous.

Jangan membuatnya seperti loading animation.

Pada prefers-reduced-motion:
ubah menjadi static directional flow.
```

---

# 10. PROBLEM — SYSTEM FRAGMENTATION

```text
Buat ProblemSection.tsx berdasarkan content DESIGN.md.

Jangan membuatnya hanya:
text kiri + stat card kanan.

Tema visual:
HEALTHCARE IS COMPLEX.

Visual awal:
- fragmented nodes
- disconnected lines
- separated information
- broken workflow

Saat scroll:
fragment tersebut perlahan:
- bergerak
- mendekat
- terhubung
- membentuk system map

Story:

FRAGMENTATION
→
CONNECTION

Title dan body tetap mengikuti content resmi.

Stat block versi lengkap tetap dapat digunakan,
tetapi visualnya harus menjadi bagian dari composition.

Jangan membuat klaim baru.
```

---

# 11. MODULES — INTERACTIVE HEALTHCARE ECOSYSTEM

```text
Buat ModulesSection.tsx.

JANGAN membuat tujuh module card identik.

Gunakan tujuh modul dari DESIGN.md.

Tampilkan sebagai satu interconnected ecosystem.

Gunakan:
- central system
- spatial nodes
- connection lines
- module labels
- contextual information

Desktop:
hover sebuah node:
- node aktif
- connection terkait aktif
- node lain sedikit meredup
- information panel muncul

Mobile:
tap sebuah node:
- node aktif
- expandable information panel

Module harus terasa sebagai bagian dari satu system,
bukan tujuh produk berbeda.

Pertahankan visual language dari Hero.

Gunakan asymmetric composition.

Tidak semua module harus memiliki ukuran visual yang sama.
```

---

# 12. MODULES — SYSTEM TRANSFORMATION

```text
Tambahkan scroll-driven transformation pada ModulesSection.

State 1:
MODULES AS NODES

State 2:
MODULES AS SYSTEM

State 3:
SYSTEM AS ECOSYSTEM

Saat scroll:
- connection semakin jelas
- node bergerak ke posisi baru
- central system berkembang
- relationship antar module menjadi lebih jelas

Di akhir section,
ecosystem perlahan menyusun dirinya menjadi visual transition
menuju Process section.

Gunakan GSAP ScrollTrigger.

Jangan membuat animation terlalu panjang.
```

---

# 13. PROCESS — SYSTEM DEPLOYMENT

```text
Buat ProcessSection.tsx berdasarkan empat tahap dari DESIGN.md:

01 Assessment
02 Migrasi Data
03 Pelatihan Tim
04 Go-Live & Pendampingan

Jangan membuat timeline corporate standar.

Tema visual:
WATCHING A SYSTEM BEING DEPLOYED.

Gunakan:
- oversized numbers
- system lines
- progress indicator
- technical annotations
- changing visual states

Saat scroll:
stage aktif satu per satu.

Stage sebelumnya tetap menjadi history.

Setiap stage harus memiliki visual composition yang berbeda.

Visual progression:

ASSESS
→
MIGRATE
→
ENABLE PEOPLE
→
GO LIVE
```

---

# 14. PROCESS — HORIZONTAL STORYTELLING

```text
Jika kompatibel dengan WIREFRAME.md dan tidak mengganggu usability,
gunakan horizontal storytelling pada desktop.

Vertical scroll mengontrol horizontal movement:

01
ASSESSMENT

→

02
MIGRASI DATA

→

03
PELATIHAN TIM

→

04
GO-LIVE & PENDAMPINGAN

Gunakan pinning dengan durasi wajar.

Setiap stage memiliki:
- number
- title
- description
- unique composition

Jangan membuat empat panel identik.

Mobile:
kembali menjadi vertical scrolling.

Pastikan tidak ada horizontal overflow pada mobile.
```

---

# 15. SERVICES — THREE SYSTEM STATES

```text
Jika services section tersedia dalam content project,
jangan membuat tiga service card identik.

Representasikan services sebagai system states.

System Development:
BUILDING

System Implementation:
DEPLOYING

System Reverse-Engineering:
DECONSTRUCTING
→
UNDERSTANDING
→
IMPROVING

Gunakan visual yang berbeda untuk setiap state.

Untuk Reverse-Engineering,
buat visual system architecture yang terurai:

SYSTEM
↓
MODULES
↓
DATA
↓
ARCHITECTURE
↓
UNDERSTANDING
↓
IMPROVEMENT

Animasi terjadi saat scroll.

Tetap gunakan hanya layanan yang benar-benar tersedia
dalam content project.
```

---

# 16. TRUST — EDITORIAL DATA

```text
Buat TrustBandSection berdasarkan content yang tersedia.

Jangan membuat tiga statistic cards biasa.

Jika angka resmi dan terverifikasi tersedia di DESIGN.md,
gunakan angka tersebut.

Contoh format jika memang tersedia:

12+
YEARS

98%
UPTIME

0
DOWNTIME

Jika data belum terverifikasi:
JANGAN menganggapnya sebagai fakta.

Gunakan placeholder atau content yang tersedia.

Visual:
- oversized typography
- large whitespace
- technical annotation
- subtle count-up

Angka harus terasa seperti editorial composition,
bukan dashboard.
```

---

# 17. FINAL CTA — ECOSYSTEM CONVERGENCE

```text
Buat FooterSection.tsx berdasarkan DESIGN.md.

Jangan membuat CTA biasa.

Gunakan visual convergence.

System nodes yang sebelumnya tersebar:
→ bergerak menuju central point
→ connection lines terbentuk
→ system menjadi tenang

Kemudian tampilkan closing CTA.

Gunakan headline resmi dari DESIGN.md.

CTA:
Jadwalkan Demo

Gunakan mailto link jika memang ditentukan.

Final visual story:

FRAGMENTED SYSTEM
→
CONNECTED SYSTEM
→
ONE DIGITAL HEALTHCARE ECOSYSTEM

Disclaimer strip tetap berada di bagian paling bawah
sesuai DESIGN.md.
```

---

# 18. ASSEMBLY — ONE CONTINUOUS EXPERIENCE

```text
Sekarang susun seluruh website di page.tsx.

Gunakan section yang sudah dibuat.

Urutan mengikuti DESIGN.md dan WIREFRAME.md.

Pastikan storytelling terasa continuous:

NAVBAR
↓
SYSTEM ENTRANCE
↓
SYSTEM ACTIVATION
↓
PATIENT JOURNEY
↓
SYSTEM / DATA
↓
FRAGMENTATION
↓
MODULE ECOSYSTEM
↓
SYSTEM DEPLOYMENT
↓
SERVICES
↓
TRUST
↓
ECOSYSTEM CONVERGENCE
↓
CTA

Jangan membuat setiap section terasa seperti halaman berbeda.

Shared visual language:
- typography
- system lines
- node language
- data particles
- technical grid
- color system
- motion language

Namun setiap section HARUS memiliki visual rhythm berbeda.

Jangan mengulang pola:

CARD
↓
FADE
↓
CARD
↓
FADE
↓
CARD
↓
FADE

Gunakan variasi:
- immersive scene
- asymmetric layout
- oversized typography
- system map
- horizontal storytelling
- pinned section
- spatial visualization
- editorial composition
- negative space
- transformation
```

---

# 19. OUT-OF-THE-BOX VISUAL AUDIT

```text
Sekarang lakukan visual audit keseluruhan website.

Jangan hanya mengecek apakah website bekerja.

Evaluasi secara kritis:

1. Apakah first viewport langsung terasa berbeda dari corporate website biasa?

2. Apakah futuristic feeling berasal dari interaction,
   system visualization, typography, dan composition,
   bukan hanya gradient/glow?

3. Apakah website terasa out-of-the-box?

4. Apakah scrolling terasa seperti mengendalikan sebuah system?

5. Apakah ada minimal 3 memorable visual moments?

6. Apakah section memiliki visual rhythm yang berbeda?

7. Apakah typography cukup berani?

8. Apakah terlalu banyak card?

9. Apakah terlalu banyak rounded containers?

10. Apakah terlalu banyak glassmorphism?

11. Apakah terlalu banyak glow?

12. Apakah terlalu banyak animation?

13. Apakah ada visual yang terasa seperti generic SaaS template?

14. Apakah healthcare technology tetap menjadi konteks utama?

15. Apakah desain tetap credible untuk perusahaan profesional?

Jika ditemukan:
- generic card layout
- repetitive sections
- excessive glassmorphism
- excessive glow
- excessive gradient
- excessive animation
- generic SaaS appearance

JANGAN hanya menambahkan efek.

REFACTOR COMPOSITION DAN INTERACTION.

Tujuan:
membuat website terasa seperti

"an immersive digital healthcare experience"

bukan:

"a corporate website with animations".
```

---

# 20. RESPONSIVE + ACCESSIBILITY + PERFORMANCE

```text
Sekarang lakukan responsive refinement.

Test minimal:

1440px
1280px
1024px
768px
390px
375px

Desktop boleh memiliki:
- complex network visualization
- pinned scenes
- horizontal storytelling
- spatial composition
- advanced motion

Mobile harus:
- vertical
- readable
- touch friendly
- simplified
- tetap mempertahankan futuristic identity

Jangan memaksa desktop animation ke mobile.

Pastikan:
- tidak ada horizontal overflow
- tidak ada content keluar viewport
- touch interaction bekerja
- tap state bekerja
- typography tidak terlalu besar
- CTA mudah ditekan

Accessibility:
- semantic HTML
- keyboard navigation
- visible focus state
- sufficient contrast
- reduced motion support
- informative labels
- no interaction yang hanya dapat digunakan dengan mouse
```

---

# 21. FINAL VERIFICATION

```text
Sekarang lakukan final verification.

Jalankan:

npm run build

Perbaiki seluruh:
- TypeScript errors
- Next.js errors
- build errors
- lint errors
- runtime errors

Kemudian:

npm run dev

Buka preview dan lakukan visual verification.

Cek:

1. Navbar
2. Hero
3. Network
4. Patient Journey
5. Data Flow
6. Problem
7. Modules
8. Process
9. Services
10. Trust
11. Footer

Periksa juga browser console.

Pastikan tidak ada:
- hydration error
- console error
- broken image
- broken asset
- GSAP error
- Three.js error
- layout shift
- horizontal overflow
- animation memory leak

Pastikan:
- GSAP cleanup benar
- Three.js cleanup benar
- IntersectionObserver cleanup benar
- ScrollTrigger cleanup benar
- Lenis cleanup benar jika digunakan

Test prefers-reduced-motion.

Pastikan semua animation:
- berhenti
- disederhanakan
- atau langsung berada di final state

Final visual quality target:

FUTURISTIC
+
OUT-OF-THE-BOX
+
HEALTHCARE TECHNOLOGY
+
IMMERSIVE SCROLLTELLING
+
PREMIUM
+
CREDIBLE

Jangan mengorbankan usability hanya demi visual.

Jangan menambahkan fakta perusahaan yang tidak tersedia.

BUILD THE EXPERIENCE.

DO NOT MERELY DESCRIBE IT.
```

---

# FINAL PRINCIPLE

```text
The website should not feel like a collection of sections.

It should feel like one evolving system.

The visitor enters the system.

The system activates.

The system fragments.

The system connects.

The ecosystem expands.

The system is deployed.

The ecosystem converges.

Then the visitor reaches Agung Nitya.

Make the website memorable through EXPERIENCE,
not through decoration.
```
