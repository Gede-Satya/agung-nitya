export type Scene =
  | "grid"
  | "network"
  | "orbits"
  | "waves"
  | "constellation"
  | "bloom"
  | "field"
  | "stream";

export type Tone = "blue" | "ivory" | "dim";

export const navLinks = [
  { label: "Modul", href: "#modul" },
  { label: "Proses", href: "#proses" },
  { label: "Kontak", href: "#kontak" },
];

/* ───────────────────────── Label seksi (DESIGN.md §12–18) ───────────────────────── */

export const labels = {
  problem: "01 — The Problem",
  system: "02 — The System",
  modules: "03 — The Modules",
  process: "04 — The Process",
  trust: "05 — The Trust",
  closing: "06 — The Next Step",
  services: "Layanan",
} as const;

/* ───────────────────────── Hero ───────────────────────── */

export const hero = {
  eyebrow: "SIMRS — Integrated Hospital Information System",
  headline:
    "Rekam medis, farmasi, dan billing rumah sakit Anda, akhirnya bicara satu bahasa.",
  sub: "Agung Nitya membangun SIMRS yang menyatukan setiap unit ke dalam satu basis data — bukan sekadar menghubungkan aplikasi yang berbeda satu per satu.",
  ctaPrimary: "Jadwalkan Demo",
  ctaSecondary: "Lihat Modul",
};

/* ───────────────────────── Masalah ───────────────────────── */

export const problem = {
  eyebrow: labels.problem,
  title:
    "Rumah sakit Anda mungkin punya lebih banyak sistem daripada yang Anda sadari",
  body: "Pendaftaran punya aplikasinya sendiri. Apotek punya yang lain. Kasir berjalan sendiri-sendiri. Data pasien diketik ulang di setiap unit, dan tiap akhir bulan semua sistem direkonsiliasi secara manual.",
  statLine: "1x",
  statCaption:
    "Data pasien dimasukkan sekali di pendaftaran, lalu terbawa otomatis ke rawat jalan, farmasi, laboratorium, hingga klaim BPJS.",
};

/* ───────────────────────── Solusi — 02 — The System ───────────────────────── */

export const solution = {
  label: labels.system,
  headline: "One database. Every unit connected.",
  body: "Pendaftaran, rawat jalan, rawat inap, farmasi, laboratorium, radiologi, rekam medis, dan billing tidak lagi bertukar berkas atau mengetik ulang data. Semua unit membaca dan menulis ke satu basis data yang sama — satu sumber kebenaran untuk seluruh rumah sakit.",
  points: [
    "Satu entri di pendaftaran, terbawa ke seluruh unit",
    "Satu rekam medis yang dibaca semua unit",
    "Satu rekonsiliasi — bukan akhir bulan, setiap saat",
  ],
};

/* ───────────────────────── Patient Journey — human entry point ───────────────────────── */

export type JourneyStep = {
  key: string;
  label: string;
  code: string;
  desc: string;
  signal: string;
};

export const journey = {
  label: "Patient Journey",
  headline: "Satu kunjungan, satu catatan yang mengalir.",
  sub: "Dari kedatangan sampai pulang — data pasien ditulis sekali di setiap tahap, lalu terbawa ke unit berikutnya tanpa diketik ulang.",
  steps: [
    {
      key: "datang",
      label: "Datang",
      code: "ARRIVAL",
      desc: "Kedatangan pasien membuka satu berkas kunjungan yang dipakai seluruh unit.",
      signal: "Kunjungan dibuka",
    },
    {
      key: "daftar",
      label: "Daftar",
      code: "REGISTRATION",
      desc: "Identitas dan nomor antrean tercatat sekali di pendaftaran.",
      signal: "Kartu pasien terisi",
    },
    {
      key: "periksa",
      label: "Periksa",
      code: "CLINICAL",
      desc: "Catatan poliklinik menulis langsung ke rekam medis yang sama.",
      signal: "RME diperbarui",
    },
    {
      key: "resep",
      label: "Resep",
      code: "PHARMACY",
      desc: "Resep elektronik diteruskan ke farmasi tanpa berpindah berkas.",
      signal: "Stok farmasi terpotong",
    },
    {
      key: "pulang",
      label: "Pulang",
      code: "DISCHARGE",
      desc: "Layanan tercatat, tagihan dan klaim tersusun dari data yang sama.",
      signal: "Billing tersusun",
    },
  ] as JourneyStep[],
};

export const journeySteps = journey.steps.map((step) => step.label);

/* ───────────────────────── Ambient data flow ───────────────────────── */

export const dataFlow = {
  label: "Ambient Data Flow",
  headline: "Data bergerak, bukan diketik ulang.",
  sub: "Pendaftaran → RME → Billing. Satu paket data melewati seluruh alur dan tiba di unit berikutnya sebelum staf membukanya.",
  nodes: [
    {
      code: "REG",
      label: "Pendaftaran",
      note: "Identitas dan kunjungan masuk sekali ke satu basis data.",
    },
    {
      code: "RME",
      label: "Rekam Medis",
      note: "Riwayat klinis diperbarui oleh setiap unit yang menangani pasien.",
    },
    {
      code: "BIL",
      label: "Billing",
      note: "Tagihan dan klaim BPJS tersusun dari layanan yang sudah tercatat.",
    },
  ],
};

/* ───────────────────────── Modul — network node ───────────────────────── */

export const modulesIntro = {
  label: labels.modules,
  headline: "Everything the hospital needs.",
  sub: "Setiap unit membaca dan menulis ke satu basis data yang sama. Arahan ke node untuk melihat bagaimana satu modul terkait dengan yang lain.",
};

export type ModuleNode = {
  id: string;
  short: string;
  title: string;
  desc: string;
  hint: string;
  x: number;
  y: number;
  icon: string;
};

export type Edge = {
  from: string;
  to: string;
  curved?: [number, number];
};

export const hubPoint = { x: 50, y: 50 };

export const modules: ModuleNode[] = [
  {
    id: "pendaftaran",
    short: "Pendaftaran",
    title: "Pendaftaran & Rawat Jalan",
    desc: "Kunjungan pasien tercatat sekali, lalu mengalir ke seluruh unit yang membutuhkannya.",
    hint: "Kartu pasien terisi di pendaftaran, terbawa otomatis ke poliklinik dan billing.",
    x: 31,
    y: 29.7,
    icon: "user-plus",
  },
  {
    id: "rawat-inap",
    short: "Rawat Inap",
    title: "Rawat Inap",
    desc: "Admisi, transfer antar ruangan, dan jejak rawat inap dalam satu alur.",
    hint: "Transfer kamar tercatat langsung ke billing dan rekam medis.",
    x: 50,
    y: 17.5,
    icon: "bed-double",
  },
  {
    id: "farmasi",
    short: "Farmasi",
    title: "Farmasi",
    desc: "Obat yang diresepkan langsung memotong stok, tanpa entri ulang.",
    hint: "Resep elektronik langsung memotong stok, tanpa entri ulang.",
    x: 69,
    y: 29.7,
    icon: "pill",
  },
  {
    id: "lab-rad",
    short: "Lab & Radiologi",
    title: "Laboratorium & Radiologi",
    desc: "Permintaan pemeriksaan dan hasil terkirim langsung ke unit yang membutuhkan.",
    hint: "Hasil lab masuk ke rekam medis saat proses selesai, tanpa difotokopi.",
    x: 73.8,
    y: 57.3,
    icon: "microscope",
  },
  {
    id: "billing",
    short: "Billing & BPJS",
    title: "Billing & Klaim BPJS",
    desc: "Tagihan dan klaim tersusun dari data layanan yang sudah tercatat.",
    hint: "Tagihan tersusun otomatis dari layanan yang sudah berjalan di seluruh unit.",
    x: 60.6,
    y: 79.3,
    icon: "receipt",
  },
  {
    id: "rme",
    short: "RME",
    title: "Rekam Medis Elektronik",
    desc: "Riwayat klinis pasien tersimpan satu kali, terbaca oleh semua unit.",
    hint: "Dokter melihat riwayat lengkap tanpa meminta berkas kertas.",
    x: 39.4,
    y: 79.3,
    icon: "file-text",
  },
  {
    id: "aset",
    short: "Aset & Logistik",
    title: "Manajemen Aset & Logistik",
    desc: "Stok, aset, dan pengadaan dihubungkan dengan pemakaian tiap unit.",
    hint: "Pemakaian unit langsung mengubah jumlah stok di gudang.",
    x: 26.3,
    y: 57.3,
    icon: "boxes",
  },
];

export const edges: Edge[] = [
  { from: "hub", to: "pendaftaran", curved: [41, 40] },
  { from: "hub", to: "rawat-inap", curved: [50, 32] },
  { from: "hub", to: "farmasi", curved: [59, 40] },
  { from: "hub", to: "lab-rad", curved: [63, 54] },
  { from: "hub", to: "rme", curved: [44, 65] },
  { from: "hub", to: "billing", curved: [56, 65] },
  { from: "hub", to: "aset", curved: [37, 54] },
  { from: "pendaftaran", to: "rme", curved: [38, 54] },
  { from: "farmasi", to: "rawat-inap", curved: [60, 18] },
  { from: "rme", to: "billing", curved: [47, 84] },
];

/* ───────────────────────── Proses ───────────────────────── */

export const processIntro = {
  label: labels.process,
  headline: "From assessment to go-live.",
  sub: "Empat tahap yang sama — assessment, migrasi, pelatihan tim, dan go-live.",
};

export type Phase = {
  number: "01" | "02" | "03" | "04";
  name: string;
  code: string;
  body: string;
};

export const phases: Phase[] = [
  {
    number: "01",
    name: "Assessment",
    code: "ASSESS",
    body: "Audit alur kerja dan kebutuhan tiap unit — dari pendaftaran hingga billing — untuk memetakan sistem yang harus menyatu.",
  },
  {
    number: "02",
    name: "Migrasi Data",
    code: "MIGRATE",
    body: "Pemindahan data dari sistem yang berjalan ke satu basis data, dengan verifikasi dan rekonsiliasi di tiap tahap.",
  },
  {
    number: "03",
    name: "Pelatihan Tim",
    code: "ENABLE PEOPLE",
    body: "Pelatihan langsung untuk staf medis, farmasi, laboratorium, dan administrasi agar sistem dipakai dengan benar sejak hari pertama.",
  },
  {
    number: "04",
    name: "Go-Live & Pendampingan",
    code: "GO LIVE",
    body: "Peluncuran sistem dengan pendampingan di lapangan hingga seluruh unit beroperasi dalam satu alur.",
  },
];

/* ───────────────────────── Trust band ───────────────────────── */

export const trustIntro = {
  label: labels.trust,
  headline: "Built for continuous operation.",
  sub: "prinsip yang bisa ditelusuri",
};

export type Metric = {
  value: number;
  suffix: string;
  label: string;
  note: string;
};

export const metrics: Metric[] = [
  {
    value: 1,
    suffix: "",
    label: "Satu basis data",
    note: "Seluruh unit membaca dan menulis ke data yang sama — satu sumber kebenaran untuk rumah sakit.",
  },
  {
    value: 5,
    suffix: "",
    label: "Tahap dalam satu berkas",
    note: "Dari kedatangan hingga pulang, kunjungan berjalan pada berkas yang sama.",
  },
  {
    value: 0,
    suffix: "",
    label: "Entri data ulang",
    note: "Ditulis sekali di pendaftaran, lalu terbawa ke seluruh unit berikutnya.",
  },
];

/* ───────────────────────── Kontak & footer ───────────────────────── */

export const contactLabel = "Jadwalkan Demo";

export const closing = {
  label: labels.closing,
  headline: "Siap menyatukan sistem rumah sakit Anda?",
  sub: "Satu basis data. Satu alur. Satu bahasa untuk seluruh unit.",
  cta: "Jadwalkan Demo",
};

export const footerMeta =
  "© 2026 PT. Agung Wijaya Nitya. Semua hak dilindungi.";
export const footerTagline =
  "SIMRS yang menyatukan setiap unit rumah sakit ke dalam satu basis data.";