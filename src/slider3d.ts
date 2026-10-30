/**
 * Tilted 3D Circular Ring Carousel & Dedicated Core Item Page ("Halaman Barang & Jenis-Jenisnya")
 * PT Agung Wijaya Nitya · Katalog Resmi INAPROC LKPP
 */

import rawProducts from "./data/inaprocAllProducts.json";

export interface RawInaprocItem {
  id: string;
  index: number;
  name: string;
  slug: string;
  type: string;
  category: string;
  brand: string;
  price: number;
  priceFormatted: string;
  origin: string;
  scale: string;
  tkdn: number | null;
  unitSold: number;
  stockAvailability: boolean;
  image: string;
  images: string[];
  location: string;
  labels: string[];
  url: string;
}

export interface ClassifiedVariant {
  product: RawInaprocItem;
  subType: string;
  localImage: string | null;
}

export interface CoreItem3D {
  id: string;
  orderLabel: string;
  shortTitle: string;
  title: string;
  subtitle: string;
  description: string;
  theme: "gold" | "crimson" | "navy" | "charcoal" | "bronze" | "slate";
  coverImage: string;
  iconSvg: string;
  subTypesSummary: string[];
}

export const CORE_ITEMS_3D: CoreItem3D[] = [
  {
    id: "kamera",
    orderLabel: "01",
    shortTitle: "Kamera & Visual",
    title: "Kamera & Dokumentasi Visual",
    subtitle: "Camcorder 4K, Mirrorless, DSLR, Konferensi, CCTV & Drone",
    description:
      "Rangkaian lengkap perangkat kamera dokumentasi, camcorder profesional, kamera mirrorless/DSLR, kamera konferensi ruang rapat, CCTV keamanan, drone pemetaan, gimbal stabilizer, hingga pencahayaan studio.",
    theme: "crimson",
    coverImage: "/products/sony-pxw-z200.png",
    subTypesSummary: [
      "Camcorder Profesional 4K",
      "Kamera Mirrorless & DSLR",
      "Kamera Konferensi Video",
      "CCTV & Body Camera",
      "Drone & Gimbal Stabilizer",
      "Lensa, Lighting & Dry Cabinet",
    ],
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3.5"/></svg>`,
  },
  {
    id: "server",
    orderLabel: "02",
    shortTitle: "Server & Data Center",
    title: "Server & Pusat Data",
    subtitle: "Rack Server 2U, Tower Server Xeon, KVM & InRow Cooling",
    description:
      "Infrastruktur komputasi pusat data instansi yang mencakup rackmount server dual-socket, tower server enterprise, konsol KVM switch, serta sistem pendingin presisi ruang server.",
    theme: "navy",
    coverImage: "/products/server-dell-r760xs.png",
    subTypesSummary: [
      "Rack Server Enterprise (1U/2U)",
      "Tower Server Xeon",
      "KVM Console Switch 8-16 Port",
      "Pendingin Ruang Server (InRow)",
    ],
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="7" rx="2"/><rect x="2" y="14" width="20" height="7" rx="2"/><line x1="6" y1="6.5" x2="6.01" y2="6.5"/><line x1="6" y1="17.5" x2="6.01" y2="17.5"/></svg>`,
  },
  {
    id: "pc-workstation",
    orderLabel: "03",
    shortTitle: "Workstation & PC",
    title: "Workstation, PC All-in-One & Laptop",
    subtitle: "Workstation Xeon/RTX, All-in-One PC, Desktop SFF & Notebook",
    description:
      "Perangkat komputasi kerja mulai dari workstation bersertifikasi ISV untuk pemodelan teknik, komputer meja All-in-One hemat ruang, PC desktop SFF, hingga laptop operasional.",
    theme: "gold",
    coverImage: "/products/workstation-lenovo-p7.jpeg",
    subTypesSummary: [
      "Workstation Performa Tinggi",
      "All-in-One (AIO) PC 21.5\"-24\"",
      "PC Desktop & Small Form Factor",
      "Laptop & Notebook Institusi",
    ],
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  },
  {
    id: "ups",
    orderLabel: "04",
    shortTitle: "UPS & Daya Cadangan",
    title: "UPS & Proteksi Daya Listrik",
    subtitle: "Smart-UPS Rackmount, Online UPS 20-30kVA & Line Interactive",
    description:
      "Sistem cadangan daya tanpa jeda (Uninterruptible Power Supply) gelombang sinus murni untuk melindungi server, jaringan, dan perangkat laboratorium dari gangguan listrik.",
    theme: "charcoal",
    coverImage: "/products/ups-apc-smc3000i.jpeg",
    subTypesSummary: [
      "UPS Online Kapasitas Besar (20 sampai 30kVA)",
      "UPS Rackmount Server (2U)",
      "UPS Tower & Line Interactive",
    ],
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  },
  {
    id: "monitor-display",
    orderLabel: "05",
    shortTitle: "Monitor & Video Wall",
    title: "Monitor Diagnostik, Signage & Video Wall",
    subtitle: "Monitor Medis 8MP, Video Wall 3×3, Interactive Board 86\" & TV",
    description:
      "Layar visual resolusi tinggi untuk ruang kendali, radiologi diagnostik DICOM, papan tulis interaktif ruang rapat, digital signage informasi publik, serta smart TV komersial.",
    theme: "bronze",
    coverImage: "/products/monitor-lg-32hl512d.jpeg",
    subTypesSummary: [
      "Monitor Diagnostik Resolusi Tinggi",
      "Sistem Video Wall 2×2 & 3×3",
      "Interactive Flat Panel 86\"",
      "Digital Signage UHD 55\"-98\"",
      "Smart TV Komersial",
    ],
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>`,
  },
  {
    id: "jaringan",
    orderLabel: "06",
    shortTitle: "Switch & Jaringan",
    title: "Switch, Wi-Fi 6 & Infrastruktur Optik",
    subtitle: "Managed PoE Switch, Access Point, Router, SFP+ & Fiber Optik",
    description:
      "Perangkat konektivitas jaringan korporat mencakup switch PoE terkelola Layer 2+, router core, access point Wi-Fi 6 indoor/outdoor, modul transceiver SFP+, dan kabel fiber optik.",
    theme: "slate",
    coverImage: "/images/card-server-storage.jpg",
    subTypesSummary: [
      "Network Switch & Core Router",
      "Access Point Wi-Fi 6 Indoor/Outdoor",
      "Modul Optical Transceiver SFP+",
      "Kabel & Patch Cord Fiber/UTP Cat6",
    ],
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="14" width="20" height="6" rx="1.5"/><path d="M6 17h.01M10 17h.01M14 17h4"/><path d="M8.5 8.5a5 5 0 0 1 7 0"/><path d="M6 6a8.5 8.5 0 0 1 12 0"/></svg>`,
  },
  {
    id: "audio-sound",
    orderLabel: "07",
    shortTitle: "Audio & Konferensi",
    title: "Sistem Audio, Konferensi & Tata Suara",
    subtitle: "Conference Mic, Mixer, Power Amplifier, Speaker & Soundcard",
    description:
      "Perangkat tata suara aula dan ruang rapat resmi yang meliputi mikrofon delegasi/chairman, power amplifier multi-kanal, ceiling speaker, line array, mixer, serta soundcard.",
    theme: "gold",
    coverImage: "/products/behringer-um2.png",
    subTypesSummary: [
      "Sistem Konferensi & Mikrofon Rapat",
      "Speaker Aula, Ceiling & Soundbar",
      "Power & Mixer Amplifier",
      "Audio Interface, Mixer & Processor",
      "Headphone Studio & Stand Mic",
    ],
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>`,
  },
  {
    id: "printer-scanner",
    orderLabel: "08",
    shortTitle: "Printer & Scanner",
    title: "Printer, Scanner Dokumen & Barcode",
    subtitle: "Scanner Dokumen A4, Printer Ink Tank A3/A4, LaserJet & Thermal",
    description:
      "Peralatan pencetakan dan digitalisasi arsip mulai dari document scanner dupleks cepat, printer multifungsi A3/A4, printer dot matrix rangkap, hingga barcode scanner.",
    theme: "crimson",
    coverImage: "/images/card-workstation-pc.jpg",
    subTypesSummary: [
      "Scanner Dokumen Kecepatan Tinggi",
      "Printer Ink Tank & LaserJet Kantor",
      "Printer Thermal & Barcode Scanner",
      "Printer Dot Matrix & Pita",
      "Signature Pad Tanda Tangan Digital",
    ],
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>`,
  },
  {
    id: "telepon-ip",
    orderLabel: "09",
    shortTitle: "Telepon IP & Kiosk",
    title: "Telepon IP, PABX, Kiosk & Biometrik",
    subtitle: "IP Phone Gigabit, IP-PBX Appliance, Kiosk Anjungan & Akses Wajah",
    description:
      "Sistem telekomunikasi kantor berbasis SIP/VoIP, mesin anjungan pelayanan mandiri layar sentuh (kiosk antrian), serta terminal pengenalan wajah dan sidik jari.",
    theme: "navy",
    coverImage: "/images/card-commercial-display-render.jpg",
    subTypesSummary: [
      "Telepon IP & Server IP-PBX",
      "Kiosk Touchscreen & Mesin Antrian",
      "Terminal Biometrik & Sidik Jari",
      "Docking Station Data",
    ],
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  },
  {
    id: "storage-nas",
    orderLabel: "10",
    shortTitle: "NAS, SSD & Storage",
    title: "NAS, SSD Portabel & Media Penyimpanan",
    subtitle: "Synology DiskStation NAS, SSD Eksternal 2TB, HDD 5TB & Periferal",
    description:
      "Solusi penyimpanan cadangan data terpusat (NAS), solid-state drive portabel berkecepatan tinggi, hard drive eksternal, kartu memori, serta periferal input komputer.",
    theme: "charcoal",
    coverImage: "/images/ups-smart-online.jpg",
    subTypesSummary: [
      "NAS (Network Attached Storage)",
      "SSD Portabel & Hardisk Eksternal",
      "Kartu Memori & Perangkat Bergerak",
      "Periferal Mouse & Keyboard",
    ],
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
  },
  {
    id: "proyektor",
    orderLabel: "11",
    shortTitle: "Proyektor & Layar",
    title: "Proyektor Laser & Layar Presentasi",
    subtitle: "Laser Projector 8000 Lumens, Proyektor Rapat, Wall & Tripod Screen",
    description:
      "Perangkat proyeksi visual auditorium dan ruang sidang mulai dari proyektor laser 8000 lumens hingga layar proyektor gantung (wallscreen) dan tripod portabel.",
    theme: "bronze",
    coverImage: "/images/card-commercial-display-render.jpg",
    subTypesSummary: [
      "Proyektor Laser & Ruang Rapat",
      "Layar Proyektor Wallscreen & Tripod",
    ],
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="10" rx="2"/><circle cx="15" cy="12" r="2.5"/><line x1="6" y1="12" x2="9" y2="12"/><line x1="6" y1="17" x2="5" y2="20"/><line x1="18" y1="17" x2="19" y2="20"/></svg>`,
  },
  {
    id: "ac-pendingin",
    orderLabel: "12",
    shortTitle: "AC & Pendingin",
    title: "AC Ruangan, Kulkas Medis & Dispenser",
    subtitle: "Kulkas Farmasi Lab, AC Split/Inverter 1-2 PK, Air Cooler & Dispenser",
    description:
      "Pengatur suhu ruangan kerja dan penyimpanan khusus yang mencakup refrigerator farmasi berstandar klinis, AC split inverter/standar, evaporative air cooler, dan dispenser.",
    theme: "slate",
    coverImage: "/products/rak-display-obat.png",
    subTypesSummary: [
      "AC Split & Inverter 1-2 PK",
      "Kulkas Medis & Farmasi (Refrigerator)",
      "Industrial Air Cooler 13.000 CMH",
      "Dispenser Air Bottom Loading",
    ],
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h20"/><path d="M20 16v-4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4"/><path d="M12 2v4"/><path d="M8 19l-1 3"/><path d="M16 19l1 3"/><path d="M12 19v3"/></svg>`,
  },
  {
    id: "rak-lemari-arsip",
    orderLabel: "13",
    shortTitle: "Rak & Lemari Arsip",
    title: "Rak Besi, Rak Stainless & Kabinet Arsip",
    subtitle: "Rak Stainless SUS 304, Rak Medium Duty, Close Rack 42U & Filing Cabinet",
    description:
      "Sistem penyimpanan fisik gudang, ruang server, dan ruang arsip meliputi rak stainless steel 4 susun, rak gudang beban menengah, kabinet server 42U, serta lemari arsip.",
    theme: "gold",
    coverImage: "/products/rak-stainless-steel.png",
    subTypesSummary: [
      "Rak Stainless Steel & Display Medis",
      "Rak Gudang Medium Duty",
      "Lemari Arsip & Filing Cabinet Besi",
      "Server Close Rack 42U & Wallmount",
    ],
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></svg>`,
  },
  {
    id: "lemari-b3-lab",
    orderLabel: "14",
    shortTitle: "Lemari B3 & Alat Lab",
    title: "Lemari B3 & Instrumen Ukur Laboratorium",
    subtitle: "Lemari Bahan Berbahaya B3, Light Meter, Multimeter, Clamp Meter & APAR",
    description:
      "Peralatan keselamatan kerja dan instrumen pengukuran teknis laboratorium meliputi lemari penyimpanan bahan berbahaya dan beracun (B3), lux meter, multimeter, dan APAR CO2.",
    theme: "crimson",
    coverImage: "/products/lemari-penyimpanan-b3.png",
    subTypesSummary: [
      "Lemari Penyimpanan Bahan Berbahaya (B3)",
      "Alat Ukur Listrik & Cahaya (Meter)",
      "Thermometer Hygrometer Digital",
      "Tabung Pemadam Api (APAR CO2)",
    ],
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  },
  {
    id: "kursi-meja",
    orderLabel: "15",
    shortTitle: "Kursi & Meja Kerja",
    title: "Kursi Kantor, Meja Kerja & Furnitur",
    subtitle: "Kursi Direktur/Staf Ergonomis, Meja Kerja Jati/Kantor, Sofa & Blinds",
    description:
      "Furnitur penunjang ruang kerja instansi meliputi kursi kerja ergonomis sandaran tinggi/rendah, meja kerja kayu jati dan partisi, sofa ruang tunggu, serta tirai vertikal.",
    theme: "navy",
    coverImage: "/products/rak-medium-duty.png",
    subTypesSummary: [
      "Kursi Direktur & Manager",
      "Kursi Kerja Staf & Tamu",
      "Meja Kerja Kantor & Kayu Jati",
      "Sofa Ruang Tamu & Vertical Blinds",
    ],
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 11V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6"/><path d="M5 11h14a2 2 0 0 1 2 2v3H3v-3a2 2 0 0 1 2-2Z"/><path d="M12 16v5"/><path d="M8 21h8"/></svg>`,
  },
  {
    id: "troli-kebersihan",
    orderLabel: "16",
    shortTitle: "Troli & Perkakas",
    title: "Troli Logistik, Kebersihan & Perkakas",
    subtitle: "Troli Linen/Barang, Tempat Sampah 240L, Vacuum Industri & Perkakas",
    description:
      "Sarana logistik rumah sakit/instansi, tempat sampah beroda kapasitas 240 liter, mesin penghisap debu wet/dry kapasitas besar, kompresor, hingga perkakas bengkel teknis.",
    theme: "charcoal",
    coverImage: "/products/krisbow-pedal-240l.png",
    subTypesSummary: [
      "Troli Linen & Troli Barang 300kg",
      "Tempat Sampah Roda 240L & Vacuum",
      "Mesin Bor, Gergaji & Kompresor",
      "Perkakas Teknis & Alat Pelindung Diri",
    ],
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="19" r="2"/><circle cx="17" cy="19" r="2"/><path d="M3 5h2l2.4 10.2a2 2 0 0 0 2 1.5h8.8a2 2 0 0 0 2-1.6L21.5 8H6"/></svg>`,
  },
];

// Classify every physical product in the 742-item INAPROC snapshot into one of the 16 Core Items + its exact Sub-Type ("Jenis")
export function classifyCatalogProduct(p: RawInaprocItem): {
  coreId: string;
  subType: string;
  localImage: string | null;
} {
  const n = p.name.toLowerCase();
  const s = p.slug.toLowerCase();

  // Local high-res image matcher for known products
  let localImage: string | null = null;
  if (s.includes("sony-pxw-z200")) localImage = "/products/sony-pxw-z200.png";
  else if (s.includes("dell-power-edge-r760xs")) localImage = "/products/server-dell-r760xs.png";
  else if (s.includes("lenovo-thinkstation-p7")) localImage = "/products/workstation-lenovo-p7.jpeg";
  else if (s.includes("apc-smart-ups")) localImage = "/products/ups-apc-smc3000i.jpeg";
  else if (s.includes("32hl512d")) localImage = "/products/monitor-lg-32hl512d.jpeg";
  else if (s.includes("rak-stainless-steel")) localImage = "/products/rak-stainless-steel.png";
  else if (s.includes("rak-display-obat")) localImage = "/products/rak-display-obat.png";
  else if (s.includes("rak-medium-duty")) localImage = "/products/rak-medium-duty.png";
  else if (s.includes("lemari-penyimpanan-b3")) localImage = "/products/lemari-penyimpanan-b3.png";
  else if (s.includes("behringer-u-phoria-um2")) localImage = "/products/behringer-um2.png";
  else if (s.includes("troli-linen")) localImage = "/products/troli-linen.png";
  else if (s.includes("krisbow-tempat-sampah-pedal")) localImage = "/products/krisbow-pedal-240l.png";
  else if (s.includes("krisbow-tempat-sampah-tutup")) localImage = "/products/krisbow-sampah-240l.png";

  // 1. KAMERA & DOKUMENTASI VISUAL
  if (
    /sony pxw|sony a7|sony a6700|sony alpha|alpha a7|alpha 7|a6400|canon eos|aver|cam340|hikvision.*camera|hikvision.*cctv|paket cctv|ip cctv|nvr 64|fd9369|ib9369|ib9389|ib9380|nd9541|gimbal|crane m2|dji|drone mavic|neewer|gvm|yongnuo|dry box|dry cabinet|libec tripod|rover 66 tripod|encoder de/.test(
      n
    )
  ) {
    let subType = "Aksesoris & Studio Visual";
    if (/pxw|camcorder|encoder/.test(n)) subType = "Camcorder & Broadcast Video";
    else if (/sony a7|sony alpha|alpha a7|alpha 7|sony a6700|a6400|canon eos/.test(n))
      subType = "Kamera Mirrorless & DSLR";
    else if (/aver|cam340/.test(n)) subType = "Kamera Konferensi Video";
    else if (/cctv|body camera|nvr|fd9369|ib9369|ib9389|ib9380|nd9541/.test(n))
      subType = "CCTV, NVR & Body Camera";
    else if (/dji matrice|d-rtk|drone mavic/.test(n)) subType = "Drone Pemetaan & RTK";
    else if (/gimbal|dji rs|crane m2|tripod/.test(n)) subType = "Gimbal Stabilizer & Tripod";
    else if (/lensa|lens/.test(n)) subType = "Lensa Kamera";
    else if (/neewer|gvm|lighting/.test(n)) subType = "Lighting Video Studio";
    else if (/dry/.test(n)) subType = "Dry Cabinet Penyimpanan Kamera";
    return { coreId: "kamera", subType, localImage: localImage || "/products/sony-pxw-z200.png" };
  }

  // 2. SERVER & PUSAT DATA
  if (
    /power\s*edge|proliant|altos r3|altos t1|st160|precision cooling|kvm console|aten.*kvm|0x2x16|msa 2060/.test(
      n
    )
  ) {
    let subType = "Rack Server Enterprise (1U/2U)";
    if (/altos t1|ml30/.test(n)) subType = "Tower Server Xeon";
    else if (/precision cooling/.test(n)) subType = "Pendingin Ruang Server (InRow)";
    else if (/kvm|0x2x16/.test(n)) subType = "KVM Console Switch Server";
    else if (/msa 2060/.test(n)) subType = "SAN Storage Array Server";
    return {
      coreId: "server",
      subType,
      localImage: localImage || "/products/server-dell-r760xs.png",
    };
  }

  // 3. WORKSTATION & PC
  if (
    /thinkstation|workstation|hp z6|thinkcentre|veriton|expertcenter|optiplex|zoan|pc aio|all in one pc|aio a3202|lenovo pc|mypc|my pc|mybook|notebook|\bnb p1412/.test(
      n
    )
  ) {
    let subType = "All-in-One (AIO) PC";
    if (/thinkstation|hp z6|workstation/.test(n)) subType = "Workstation Performa Tinggi";
    else if (/optiplex|dg500mer|vn4|ic 3xid/.test(n)) subType = "PC Desktop & Small Form Factor";
    else if (/notebook|mybook|\bnb p1412/.test(n)) subType = "Laptop & Notebook Institusi";
    return {
      coreId: "pc-workstation",
      subType,
      localImage: localImage || "/products/workstation-lenovo-p7.jpeg",
    };
  }

  // 4. UPS & PROTEKSI DAYA
  if (/\bups\b|smart-ups|smart ups|keor|prolink ups|ica ups|ica line|daker dk|pdu fase/.test(n)) {
    let subType = "UPS Tower & Line Interactive";
    if (/keor|srtg|20kva|30kva/.test(n)) subType = "UPS Online Kapasitas Besar (20-30kVA)";
    else if (/2u|rack|rmi2u|pdu/.test(n)) subType = "UPS Rackmount & Power Distribution";
    return { coreId: "ups", subType, localImage: localImage || "/products/ups-apc-smc3000i.jpeg" };
  }

  // 5. MONITOR, SIGNAGE & VIDEO WALL
  if (
    /monitor|signage|video wall|videowall|createboard|smart tv|google tv|led tv|55tnf5j|running text|bracket.*ava/.test(
      n
    )
  ) {
    let subType = "Monitor & Display Komersial";
    if (/diagnostic|32hl512d/.test(n)) subType = "Monitor Diagnostik 8MP";
    else if (/video wall|videowall|mwall/.test(n)) subType = "Sistem Video Wall";
    else if (/createboard|55tnf5j/.test(n)) subType = "Interactive Board & Touch Display";
    else if (/signage|running text/.test(n)) subType = "Digital Signage & Running Text";
    else if (/tv/.test(n)) subType = "Smart TV Komersial";
    return {
      coreId: "monitor-display",
      subType,
      localImage: localImage || "/products/monitor-lg-32hl512d.jpeg",
    };
  }

  // 6. SWITCH & JARINGAN OPTIK
  if (
    /switch|aruba|ruijie|ubiquiti|unifi|mikrotik|mikrobits|routerboard|cloud core router|css326|fortigate|ainos|transceiver|sfp|netviel|panduit|netkey|utp|fiber|serat optik|patch cord|patch panel|patchlink|keystone|faceplate|otb|converter rs232|wire meter|kabel hdmi/.test(
      n
    )
  ) {
    let subType = "Kabel, Patch Panel & Fiber Optik";
    if (/switch|rg-es|rg-nbs|cx 6000|1930|css326|router|crs317|ccr2004|fortigate|ainos/.test(n))
      subType = "Switch Managed, PoE & Core Router";
    else if (/ap27|ap25|unifi|access point|wi-fi/.test(n)) subType = "Access Point Wi-Fi 6";
    else if (/sfp|transceiver/.test(n)) subType = "Modul Optical Transceiver SFP+";
    return { coreId: "jaringan", subType, localImage: localImage || "/images/card-server-storage.jpg" };
  }

  // 7. AUDIO & KONFERENSI
  if (
    /\btoa\b|speaker|soundbar|sound system|soundsystem|amplifier|microphone|stand mic|mixing console|soundcard|sennheiser|jbl|bose|aubern|huper|samson|superlux|polytron pas|ts-690|z-5b|z-mx9200|zs-f2000|zs-hs1500|z-fb152|z-7b|da-1000|dp-sp3|ws-422/.test(
      n
    )
  ) {
    let subType = "Speaker Ruangan, Line Array & Soundbar";
    if (/soundcard|mixing|mg06|dp-sp3|z-mx9200/.test(n))
      subType = "Audio Interface, Mixer & Processor";
    else if (/amplifier|za-|da-1000|zw-s/.test(n)) subType = "Power & Mixer Amplifier";
    else if (/ts820|ts821|ts-821|ts-690|conference|chairman/.test(n))
      subType = "Sistem Konferensi & Unit Rapat";
    else if (/sennheiser|headphone/.test(n)) subType = "Headphone Monitoring Studio";
    else if (/stand mic|samson|superlux|betavo|ws-422/.test(n))
      subType = "Mikrofon Wireless & Stand";
    return { coreId: "audio-sound", subType, localImage: localImage || "/products/behringer-um2.png" };
  }

  // 8. PRINTER & SCANNER
  if (
    /printer|scanner|ecotank|officejet|laserjet|lq-2190|workforce|ds-1630|ds-1730|ds-570|zebra|ds9308|sato|ribbon|ink 003|kertas label|wacom|stu-540|topaz signature/.test(
      n
    )
  ) {
    let subType = "Printer Ink Tank & LaserJet";
    if (/scanner.*ds-|workforce ds/.test(n)) subType = "Scanner Dokumen Kecepatan Tinggi";
    else if (/zebra|ds9308|sato|t82x|p-touch|thermal|kertas label/.test(n))
      subType = "Printer Thermal & Barcode Scanner";
    else if (/lq-2190|ribbon|ink 003/.test(n)) subType = "Printer Dot Matrix & Tinta/Pita";
    else if (/wacom|stu-540|signature/.test(n)) subType = "Signature Pad Tanda Tangan Digital";
    return {
      coreId: "printer-scanner",
      subType,
      localImage: localImage || "/images/card-workstation-pc.jpg",
    };
  }

  // 9. TELEPON IP, PABX & KIOSK
  if (
    /yealink|yeastar|yaestar|fanvil|kiosk|mesin antrian|fingerprint|face recognition|dock station|flexcode|revo w|b-scan tenprint|istartek gps/.test(
      n
    )
  ) {
    let subType = "Telepon IP & Server PABX";
    if (/kiosk|anjungan|mesin antrian/.test(n)) subType = "Kiosk Touchscreen & Mesin Antrian";
    else if (/fingerprint|face recognition|flexcode|revo|tenprint/.test(n))
      subType = "Biometrik Sidik Jari & Wajah";
    else if (/dock station|gps/.test(n)) subType = "Docking Station & Pelacak Unit";
    return {
      coreId: "telepon-ip",
      subType,
      localImage: localImage || "/images/card-commercial-display-render.jpg",
    };
  }

  // 10. NAS, SSD & PENYIMPANAN DATA
  if (
    /synology|diskstation|\bssd\b|hardisk|hard drive|seagate|western digital|microsd|sandisk|sdxc|iphone|samsung galaxy|logitech|mouse|keyboard|usb hub/.test(
      n
    )
  ) {
    let subType = "SSD Portabel & Hardisk Eksternal";
    if (/synology|diskstation/.test(n)) subType = "NAS (Network Attached Storage)";
    else if (/microsd|sandisk|sdxc/.test(n)) subType = "Kartu Memori Kecepatan Tinggi";
    else if (/iphone|samsung galaxy/.test(n)) subType = "Perangkat Bergerak Operasional";
    else if (/logitech|mouse|keyboard|usb hub/.test(n)) subType = "Periferal Mouse, Keyboard & Hub";
    return {
      coreId: "storage-nas",
      subType,
      localImage: localImage || "/images/ups-smart-online.jpg",
    };
  }

  // 11. PROYEKTOR & LAYAR
  if (/projector|proyektor|wallscreen|layar screen/.test(n)) {
    let subType = "Proyektor Laser & Ruang Rapat";
    if (/screen|layar/.test(n)) subType = "Layar Proyektor Wallscreen & Tripod";
    return {
      coreId: "proyektor",
      subType,
      localImage: localImage || "/images/card-commercial-display-render.jpg",
    };
  }

  // 12. AC, PENDINGIN & DISPENSER
  if (
    /\bac\b|panasonic 1 pk|panasonic 2 pk|daikin|air cooler|pharmacy refrigerator|dispenser|miyako wd|pembersih saluran udara/.test(
      n
    )
  ) {
    let subType = "AC Split & Inverter Ruangan";
    if (/pharmacy refrigerator/.test(n)) subType = "Kulkas Medis & Farmasi";
    else if (/air cooler|pembersih/.test(n)) subType = "Industrial Air Cooler & Sirkulasi";
    else if (/dispenser|wd-185/.test(n)) subType = "Dispenser Air Institusi";
    return {
      coreId: "ac-pendingin",
      subType,
      localImage: localImage || "/products/rak-display-obat.png",
    };
  }

  // 13. RAK BESI & LEMARI ARSIP
  if (
    /rak stainless|rak medium|rak display|lemari arsip|filing cabinet|lemari obat|indorack|easy rack|close rack|wallmount rack|42u \*/.test(
      n
    )
  ) {
    let subType = "Lemari Arsip & Filing Cabinet Besi";
    if (/indorack|easy rack|close rack|wallmount|42u/.test(n))
      subType = "Server Close Rack 42U & Wallmount";
    else if (/rak stainless|rak medium|rak display/.test(n))
      subType = "Rak Stainless Steel, Medis & Gudang";
    return {
      coreId: "rak-lemari-arsip",
      subType,
      localImage: localImage || "/products/rak-stainless-steel.png",
    };
  }

  // 14. LEMARI B3 & ALAT LAB
  if (/lemari penyimpanan b3|light meter|multimeter|clamp meter|thermometer|hygrometer|co2/.test(n)) {
    let subType = "Alat Ukur Listrik & Cahaya (Meter)";
    if (/b3/.test(n)) subType = "Lemari Penyimpanan Bahan Berbahaya (B3)";
    else if (/thermometer|hygrometer/.test(n)) subType = "Thermometer & Hygrometer Digital";
    else if (/co2/.test(n)) subType = "Tabung Pemadam Kebakaran (APAR CO2)";
    return {
      coreId: "lemari-b3-lab",
      subType,
      localImage: localImage || "/products/lemari-penyimpanan-b3.png",
    };
  }

  // 15. KURSI & MEJA KERJA
  if (/kursi|meja|task desk|sofa|blinds|cermin|papan akrilik|indachi/.test(n)) {
    let subType = "Kursi Kerja & Direktur";
    if (/meja|task desk/.test(n)) subType = "Meja Kerja Kantor & Kayu Jati";
    else if (/sofa|veral 3 seater/.test(n)) subType = "Sofa Ruang Tamu Institusi";
    else if (/blinds|cermin|papan/.test(n)) subType = "Vertical Blinds & Interior Ruang";
    return {
      coreId: "kursi-meja",
      subType,
      localImage: localImage || "/products/rak-medium-duty.png",
    };
  }

  // 16. TROLI, KEBERSIHAN & PERKAKAS
  let subType = "Perkakas Teknis & Operasional";
  if (/troli|trd mid/.test(n)) subType = "Troli Linen & Troli Barang 300-500kg";
  else if (/sampah|vacuum|sapu|keset|kontainer/.test(n))
    subType = "Tempat Sampah 240L & Vacuum Industri";
  else if (/drill|saw|kompresor|compressor|hot press|solder|obeng|tang|kunci|palu|vg 5500|shimizu/.test(n))
    subType = "Mesin Kerja, Pompa & Perkakas";
  else if (/safety|earmuff|sarung tangan|helmet|kimono|perlak|bantal|double sink/.test(n))
    subType = "Perlengkapan K3, Medis & Fasilitas";

  return {
    coreId: "troli-kebersihan",
    subType,
    localImage: localImage || "/products/krisbow-pedal-240l.png",
  };
}

// Precompute grouped items per Core Item ID
const allPhysicalProducts = (rawProducts as RawInaprocItem[]).filter(
  (p) => p.type === "Barang" || /cctv|kamera|server|rack|printer|scanner|kiosk/i.test(p.name)
);

export interface CoreItemBundle {
  core: CoreItem3D;
  items: Array<{
    product: RawInaprocItem;
    subType: string;
    localImage: string;
  }>;
  subTypes: Array<{
    name: string;
    count: number;
  }>;
  minPrice: number | null;
  maxPrice: number | null;
}

export const CORE_ITEM_BUNDLES: Record<string, CoreItemBundle> = {};

CORE_ITEMS_3D.forEach((core) => {
  CORE_ITEM_BUNDLES[core.id] = {
    core,
    items: [],
    subTypes: [],
    minPrice: null,
    maxPrice: null,
  };
});

// Deduplicate by normalized product name within each category so varieties are clean and distinct
const seenNamesPerCore: Record<string, Set<string>> = {};

allPhysicalProducts.forEach((p) => {
  // Exclude pure service maintenance lines when grouping physical goods
  if (p.type === "Jasa" || /^jasa |^pemeliharaan |^maintenance /i.test(p.name.trim())) {
    return;
  }
  const { coreId, subType, localImage } = classifyCatalogProduct(p);
  const bundle = CORE_ITEM_BUNDLES[coreId];
  if (!bundle) return;

  if (!seenNamesPerCore[coreId]) seenNamesPerCore[coreId] = new Set();
  const normName = p.name.trim().toLowerCase().replace(/\s+/g, " ");
  // If we already have a priced version of the exact same name, skip the Rp 0 duplicate
  if (seenNamesPerCore[coreId].has(normName) && p.price === 0) {
    return;
  }
  seenNamesPerCore[coreId].add(normName);

  bundle.items.push({
    product: p,
    subType,
    localImage: localImage || bundle.core.coverImage,
  });
});

// Sort items within each bundle: priced items first, then by price descending
Object.values(CORE_ITEM_BUNDLES).forEach((bundle) => {
  bundle.items.sort((a, b) => {
    const aPriced = a.product.price > 0 ? 1 : 0;
    const bPriced = b.product.price > 0 ? 1 : 0;
    if (aPriced !== bPriced) return bPriced - aPriced;
    return b.product.price - a.product.price;
  });

  const subMap = new Map<string, number>();
  let minP: number | null = null;
  let maxP: number | null = null;

  bundle.items.forEach((entry) => {
    subMap.set(entry.subType, (subMap.get(entry.subType) || 0) + 1);
    const pr = entry.product.price;
    if (pr > 0) {
      if (minP === null || pr < minP) minP = pr;
      if (maxP === null || pr > maxP) maxP = pr;
    }
  });

  bundle.minPrice = minP;
  bundle.maxPrice = maxP;
  bundle.subTypes = Array.from(subMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
});

function formatRupiah(num: number): string {
  return "Rp " + num.toLocaleString("id-ID");
}

export function initCatalog3DSlider(): void {
  const stage = document.getElementById("catalog-3d-stage");
  if (!stage) return;

  const cardsContainer = document.getElementById("catalog-3d-cards");
  const prevBtn = document.getElementById("catalog-3d-prev") as HTMLButtonElement | null;
  const nextBtn = document.getElementById("catalog-3d-next") as HTMLButtonElement | null;
  const counterCurrent = document.getElementById("catalog-3d-counter-current");
  const counterTotal = document.getElementById("catalog-3d-counter-total");
  const activeTitle = document.getElementById("catalog-3d-active-title");
  const openActiveBtn = document.getElementById("catalog-3d-open-active") as HTMLButtonElement | null;
  const quickPillsWrap = document.getElementById("catalog-3d-quick-pills");

  if (!cardsContainer) return;

  const totalItems = CORE_ITEMS_3D.length; // 16 unique core items
  const stepAngle = 360 / totalItems; // 22.5 degrees per card

  let currentAngle = 0;
  let targetAngle = 0;
  let activeIndex = 0;
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let dragMovedPx = 0;
  let dragStartAngle = 0;
  let autoplayTimer: number | null = null;

  function getRadius(): number {
    const width = window.innerWidth;
    if (width < 640) return 440;
    if (width < 1024) return 560;
    return 680;
  }

  function getCameraOffsetZ(): number {
    const width = window.innerWidth;
    if (width < 640) return 190;
    if (width < 1024) return 250;
    return 315;
  }

  // Render card inner HTML (used on both front face and back face so the full 360° tilted ring is readable just like the reference image)
  function renderCardFaceContent(item: CoreItem3D): string {
    const bundle = CORE_ITEM_BUNDLES[item.id];
    const totalVar = bundle ? bundle.items.length : 0;
    const totalSub = bundle ? bundle.subTypes.length : 0;

    return `
      <div class="c3d-card-notch" aria-hidden="true"></div>
      <div class="c3d-card-header">
        <div class="c3d-card-meta-row">
          <span class="c3d-card-num">${escapeHtml(item.orderLabel)}</span>
          <span class="c3d-card-count-pill">${totalVar} Unit · ${totalSub} Jenis</span>
        </div>
        <h3 class="c3d-card-heading">${escapeHtml(item.title)}</h3>
        <p class="c3d-card-sub">${escapeHtml(item.subtitle)}</p>
      </div>

      <div class="c3d-card-visual">
        <div class="c3d-card-glow" aria-hidden="true"></div>
        <img
          src="${item.coverImage}"
          alt="${escapeHtml(item.title)}"
          class="c3d-card-img"
          draggable="false"
        />
      </div>

      <div class="c3d-card-footer">
        <span class="c3d-card-cta-text">Buka Halaman &amp; Jenis</span>
        <span class="c3d-card-cta-arrow" aria-hidden="true">→</span>
      </div>
    `;
  }

  // Render all 16 unique core item cards in the 3D ring
  cardsContainer.innerHTML = CORE_ITEMS_3D.map((item, index) => {
    const bundle = CORE_ITEM_BUNDLES[item.id];
    const totalVar = bundle ? bundle.items.length : 0;
    const faceHtml = renderCardFaceContent(item);

    return `
      <article
        class="c3d-card c3d-theme-${item.theme}"
        data-index="${index}"
        data-core-id="${item.id}"
        id="c3d-card-${item.id}"
        tabindex="0"
        role="button"
        aria-label="${escapeHtml(item.title)}, lihat ${totalVar} daftar barang beserta jenis-jenisnya"
      >
        <div class="c3d-card-face">
          ${faceHtml}
        </div>
      </article>
    `;
  }).join("");

  // Render quick category pills below or above stage for instant keyboard/click access
  if (quickPillsWrap) {
    quickPillsWrap.innerHTML = CORE_ITEMS_3D.map((item, index) => {
      const bundle = CORE_ITEM_BUNDLES[item.id];
      const count = bundle ? bundle.items.length : 0;
      return `
        <button
          type="button"
          class="c3d-quick-pill ${index === 0 ? "active" : ""}"
          data-index="${index}"
          data-core-id="${item.id}"
        >
          <span class="c3d-qp-num">${escapeHtml(item.orderLabel)}</span>
          <span class="c3d-qp-name">${escapeHtml(item.shortTitle)}</span>
          <span class="c3d-qp-count">${count}</span>
        </button>
      `;
    }).join("");
  }

  if (counterTotal) {
    counterTotal.textContent = String(totalItems).padStart(2, "0");
  }

  const cardElements = cardsContainer.querySelectorAll<HTMLElement>(".c3d-card");
  const quickPillElements = quickPillsWrap
    ? quickPillsWrap.querySelectorAll<HTMLButtonElement>(".c3d-quick-pill")
    : [];

  function setupCylinderGeometry(): void {
    const radius = getRadius();
    cardElements.forEach((card, index) => {
      // Negative angle + negative translateZ places cards on the inner concave wall of the cylinder facing the viewer
      const cardAngle = -index * stepAngle;
      card.dataset.angle = String(cardAngle);
      card.style.transform = `rotateY(${cardAngle}deg) translateZ(${-radius}px)`;
    });
  }

  function renderCylinder(): void {
    const offsetZ = getCameraOffsetZ();
    // Place the viewer inside the cylinder (translateZ(+offsetZ)) so center cards curve inward (-Z) and side wings curve closer (+Z)
    cardsContainer.style.transform = `translateZ(${offsetZ}px) rotateY(${currentAngle}deg)`;

    let bestIndex = 0;
    let minFacingDiff = 999;

    cardElements.forEach((card, index) => {
      const baseAngle = -index * stepAngle;
      let facingAngle = (baseAngle + currentAngle) % 360;
      if (facingAngle > 180) facingAngle -= 360;
      if (facingAngle < -180) facingAngle += 360;

      const absFacing = Math.abs(facingAngle);

      if (absFacing < minFacingDiff) {
        minFacingDiff = absFacing;
        bestIndex = index;
      }

      card.classList.remove("active", "front", "flank", "side", "rear", "is-back-facing");

      // Show the concave front panorama (cards in front of the viewer inside the circle) and hide cards behind the viewer
      if (absFacing <= 82) {
        card.style.visibility = "visible";
        card.style.pointerEvents = "auto";
        if (absFacing < 14) {
          card.classList.add("active", "front");
          card.style.opacity = "1";
          card.style.zIndex = "50";
        } else if (absFacing < 48) {
          card.classList.add("flank");
          card.style.opacity = "1";
          card.style.zIndex = "35";
        } else if (absFacing <= 72) {
          card.classList.add("side");
          card.style.opacity = "1";
          card.style.zIndex = "20";
        } else {
          // Smooth edge fade at the outer rim of the concave arc (72° to 82°)
          const edgeRatio = Math.max(0, (82 - absFacing) / 10);
          card.classList.add("side");
          card.style.opacity = edgeRatio.toFixed(2);
          card.style.zIndex = "10";
        }
      } else {
        card.classList.add("rear");
        card.style.opacity = "0";
        card.style.visibility = "hidden";
        card.style.pointerEvents = "none";
        card.style.zIndex = "1";
      }
    });

    if (bestIndex !== activeIndex) {
      activeIndex = bestIndex;
      updateMetadata(activeIndex);
    }
  }

  function updateMetadata(idx: number): void {
    if (counterCurrent) {
      counterCurrent.textContent = String(idx + 1).padStart(2, "0");
    }
    const currentItem = CORE_ITEMS_3D[idx];
    if (currentItem) {
      const bundle = CORE_ITEM_BUNDLES[currentItem.id];
      const count = bundle ? bundle.items.length : 0;
      const subCount = bundle ? bundle.subTypes.length : 0;
      if (activeTitle) {
        activeTitle.textContent = `${currentItem.title} (${count} Barang · ${subCount} Jenis)`;
      }
      if (openActiveBtn) {
        openActiveBtn.dataset.coreId = currentItem.id;
        const btnLabel = openActiveBtn.querySelector(".c3d-open-active-text");
        if (btnLabel) {
          btnLabel.textContent = `Buka Halaman ${currentItem.shortTitle} (${count} Jenis)`;
        }
      }
    }

    quickPillElements.forEach((pill, i) => {
      pill.classList.toggle("active", i === idx);
    });
  }

  function animate(): void {
    if (!isDragging) {
      const diff = targetAngle - currentAngle;
      if (Math.abs(diff) > 0.02) {
        currentAngle += diff * 0.085;
      } else {
        currentAngle = targetAngle;
      }
    }
    renderCylinder();
    requestAnimationFrame(animate);
  }

  function rotateToIndex(index: number): void {
    const normalizedIndex = ((index % totalItems) + totalItems) % totalItems;
    const targetBase = normalizedIndex * stepAngle;
    const k = Math.round((currentAngle - targetBase) / 360);
    targetAngle = targetBase + k * 360;
    resetAutoplay();
  }

  function nextSlide(): void {
    targetAngle += stepAngle;
    resetAutoplay();
  }

  function prevSlide(): void {
    targetAngle -= stepAngle;
    resetAutoplay();
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => prevSlide());
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => nextSlide());
  }

  if (openActiveBtn) {
    openActiveBtn.addEventListener("click", () => {
      const coreId = openActiveBtn.dataset.coreId || CORE_ITEMS_3D[activeIndex]?.id;
      if (coreId) {
        openCoreItemPage(coreId, true);
      }
    });
  }

  // Quick pills: click rotates to that item AND opens its page on second click, or directly opens if clicked
  quickPillElements.forEach((pill, index) => {
    pill.addEventListener("click", () => {
      const coreId = pill.dataset.coreId;
      rotateToIndex(index);
      if (coreId) {
        openCoreItemPage(coreId, true);
      }
    });
  });

  // Reliable card click handler: supports mouse clicks, laptop trackpad taps, and mobile touch
  let lastOpenTime = 0;
  function handleCardSelect(index: number, coreId: string): void {
    const now = performance.now();
    if (now - lastOpenTime < 400) return;
    lastOpenTime = now;
    rotateToIndex(index);
    openCoreItemPage(coreId, true);
  }

  let cardPressX = 0;
  let cardPressY = 0;
  let cardPressTime = 0;
  let cardPressTarget: HTMLElement | null = null;

  cardElements.forEach((card, index) => {
    const coreId = card.dataset.coreId || CORE_ITEMS_3D[index]?.id;
    if (!coreId) return;

    card.addEventListener("pointerdown", (e: PointerEvent) => {
      cardPressX = e.clientX;
      cardPressY = e.clientY;
      cardPressTime = performance.now();
      cardPressTarget = card;
    });

    card.addEventListener("pointerup", (e: PointerEvent) => {
      if (cardPressTarget !== card) return;
      const moved = Math.hypot(e.clientX - cardPressX, e.clientY - cardPressY);
      const duration = performance.now() - cardPressTime;
      // If movement is under 18px and pressed for under 700ms, this is a clean, deliberate tap/click
      if (moved < 18 && duration < 700) {
        handleCardSelect(index, coreId);
      }
      cardPressTarget = null;
    });

    card.addEventListener("click", (e) => {
      if (dragMovedPx > 18) {
        e.preventDefault();
        return;
      }
      handleCardSelect(index, coreId);
    });

    card.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleCardSelect(index, coreId);
      }
    });
  });

  const DRAG_THRESHOLD_PX = 18;

  // Pointer drag on carousel ring
  stage.addEventListener("pointerdown", (e: PointerEvent) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    dragMovedPx = 0;
    dragStartAngle = currentAngle;
    stage.classList.add("is-dragging");
    pauseAutoplay();
  });

  window.addEventListener(
    "pointermove",
    (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      const moved = Math.hypot(deltaX, deltaY);
      dragMovedPx = moved;
      if (moved > 4) {
        currentAngle = dragStartAngle - deltaX * 0.22;
      }
    },
    { passive: true }
  );

  const onPointerUp = () => {
    if (!isDragging) return;
    isDragging = false;
    stage.classList.remove("is-dragging");

    if (dragMovedPx >= DRAG_THRESHOLD_PX) {
      targetAngle = Math.round(currentAngle / stepAngle) * stepAngle;
    }
    dragMovedPx = 0;
    resetAutoplay();
  };

  window.addEventListener("pointerup", onPointerUp);
  window.addEventListener("pointercancel", onPointerUp);

  // Pause autoplay while hovering or touching stage so card doesn't move away during click
  stage.addEventListener("mouseenter", () => pauseAutoplay());
  stage.addEventListener("mouseleave", () => {
    if (!isDragging) resetAutoplay();
  });
  stage.addEventListener("touchstart", () => pauseAutoplay(), { passive: true });
  stage.addEventListener("touchend", () => {
    if (!isDragging) resetAutoplay();
  }, { passive: true });

  stage.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    }
  });

  const AUTOPLAY_INTERVAL_MS = 2800;

  function startAutoplay(): void {
    stopAutoplay();
    autoplayTimer = window.setInterval(() => {
      // Auto-rotate every 2.8 seconds whenever the detail page is not open and user is not dragging
      if (!isDragging && !document.body.classList.contains("item-page-open")) {
        targetAngle += stepAngle;
      }
    }, AUTOPLAY_INTERVAL_MS);
  }

  function stopAutoplay(): void {
    if (autoplayTimer !== null) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function pauseAutoplay(): void {
    stopAutoplay();
  }

  function resetAutoplay(): void {
    stopAutoplay();
    startAutoplay();
  }

  // Resume autoplay if tab visibility changes
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      pauseAutoplay();
    } else {
      resetAutoplay();
    }
  });

  window.addEventListener(
    "resize",
    () => {
      setupCylinderGeometry();
    },
    { passive: true }
  );

  // Initialize Dedicated Core Item Detail Page ("Halaman Barang & Jenis-Jenisnya")
  initCoreItemPageSystem((coreId) => {
    const idx = CORE_ITEMS_3D.findIndex((c) => c.id === coreId);
    if (idx >= 0) rotateToIndex(idx);
  });

  setupCylinderGeometry();
  updateMetadata(0);
  animate();
  startAutoplay();
}

// ─────────────────────────────────────────────────────────────────────────────
// DEDICATED CORE ITEM PAGE CONTROLLER ("Halaman Barang & Jenis-Jenisnya")
// Opens when any card in the 3D circle is clicked or via URL ?barang=<id>
// ─────────────────────────────────────────────────────────────────────────────

let currentOpenCoreId: string | null = null;
let currentSelectedSubType = "Semua";
let currentSearchQuery = "";
let currentSortMode: "default" | "price-asc" | "price-desc" | "name-asc" = "default";
let savedScrollY = 0;

function initCoreItemPageSystem(onSyncSlider: (coreId: string) => void): void {
  const pageView = document.getElementById("item-category-page");
  if (!pageView) return;

  const backBtn = document.getElementById("icp-back-btn");
  const switcherRail = document.getElementById("icp-switcher-rail");
  const searchInput = document.getElementById("icp-search-input") as HTMLInputElement | null;
  const sortSelect = document.getElementById("icp-sort-select") as HTMLSelectElement | null;
  const resetFilterBtn = document.getElementById("icp-reset-filter-btn");

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      closeCoreItemPage(true);
    });
  }

  // Render switcher rail for all 16 core items
  if (switcherRail) {
    switcherRail.innerHTML = CORE_ITEMS_3D.map((item) => {
      const count = CORE_ITEM_BUNDLES[item.id]?.items.length || 0;
      return `
        <button
          type="button"
          class="icp-nav-pill"
          data-core-id="${item.id}"
        >
          <span>${escapeHtml(item.orderLabel)} · ${escapeHtml(item.shortTitle)}</span>
          <span class="icp-nav-pill-badge">${count}</span>
        </button>
      `;
    }).join("");

    switcherRail.querySelectorAll<HTMLButtonElement>(".icp-nav-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        const cid = btn.dataset.coreId;
        if (cid) {
          onSyncSlider(cid);
          openCoreItemPage(cid, true);
        }
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      currentSearchQuery = searchInput.value.trim();
      renderCoreItemPageProducts();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      currentSortMode = sortSelect.value as typeof currentSortMode;
      renderCoreItemPageProducts();
    });
  }

  if (resetFilterBtn) {
    resetFilterBtn.addEventListener("click", () => {
      currentSelectedSubType = "Semua";
      currentSearchQuery = "";
      currentSortMode = "default";
      if (searchInput) searchInput.value = "";
      if (sortSelect) sortSelect.value = "default";
      renderCoreItemSubTypeTabs();
      renderCoreItemPageProducts();
    });
  }

  // Close with Escape key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && currentOpenCoreId !== null) {
      closeCoreItemPage(true);
    }
  });

  // Handle browser back/forward navigation
  window.addEventListener("popstate", () => {
    const params = new URLSearchParams(window.location.search);
    const barangId = params.get("barang");
    if (barangId && CORE_ITEM_BUNDLES[barangId]) {
      onSyncSlider(barangId);
      openCoreItemPage(barangId, false);
    } else if (currentOpenCoreId !== null) {
      closeCoreItemPage(false);
    }
  });

  // Check initial URL on page load
  const initialParams = new URLSearchParams(window.location.search);
  const initialBarang = initialParams.get("barang");
  if (initialBarang && CORE_ITEM_BUNDLES[initialBarang]) {
    onSyncSlider(initialBarang);
    openCoreItemPage(initialBarang, false);
  }
}

export function openCoreItemPage(coreId: string, pushHistory: boolean): void {
  const bundle = CORE_ITEM_BUNDLES[coreId];
  const pageView = document.getElementById("item-category-page");
  if (!bundle || !pageView) return;

  if (currentOpenCoreId === null) {
    savedScrollY = window.scrollY;
  }

  currentOpenCoreId = coreId;
  currentSelectedSubType = "Semua";
  currentSearchQuery = "";
  currentSortMode = "default";

  const searchInput = document.getElementById("icp-search-input") as HTMLInputElement | null;
  const sortSelect = document.getElementById("icp-sort-select") as HTMLSelectElement | null;
  if (searchInput) searchInput.value = "";
  if (sortSelect) sortSelect.value = "default";

  if (pushHistory) {
    const url = new URL(window.location.href);
    url.searchParams.set("barang", coreId);
    url.hash = "";
    window.history.pushState({ barang: coreId }, "", url.toString());
  }

  // Update Hero Banner of the Item Page
  const eyebrowEl = document.getElementById("icp-hero-eyebrow");
  const titleEl = document.getElementById("icp-hero-title");
  const descEl = document.getElementById("icp-hero-desc");
  const imgEl = document.getElementById("icp-hero-img") as HTMLImageElement | null;
  const statUnitsEl = document.getElementById("icp-stat-units");
  const statSubtypesEl = document.getElementById("icp-stat-subtypes");
  const statPriceEl = document.getElementById("icp-stat-price");
  const quoteLinkEl = document.getElementById("icp-hero-quote-btn") as HTMLAnchorElement | null;

  if (eyebrowEl) {
    eyebrowEl.textContent = `BARANG INTI ${bundle.core.orderLabel} // KATALOG RESMI INAPROC LKPP`;
  }
  if (titleEl) {
    titleEl.textContent = bundle.core.title;
  }
  if (descEl) {
    descEl.textContent = bundle.core.description;
  }
  if (imgEl) {
    imgEl.src = bundle.core.coverImage;
    imgEl.alt = bundle.core.title;
  }
  if (statUnitsEl) {
    statUnitsEl.textContent = `${bundle.items.length} Unit & Tipe`;
  }
  if (statSubtypesEl) {
    statSubtypesEl.textContent = `${bundle.subTypes.length} Jenis Kategori`;
  }
  if (statPriceEl) {
    if (bundle.minPrice && bundle.maxPrice) {
      statPriceEl.textContent =
        bundle.minPrice === bundle.maxPrice
          ? formatRupiah(bundle.minPrice)
          : `${formatRupiah(bundle.minPrice)} s/d ${formatRupiah(bundle.maxPrice)}`;
    } else {
      statPriceEl.textContent = "Sesuai Etalase INAPROC";
    }
  }
  if (quoteLinkEl) {
    quoteLinkEl.href = `mailto:info@agungwijayanitya.com?subject=${encodeURIComponent(
      `Permintaan Penawaran ${bundle.core.title} - Agung Wijaya Nitya`
    )}`;
  }

  // Highlight active pill in switcher rail
  const switcherRail = document.getElementById("icp-switcher-rail");
  if (switcherRail) {
    switcherRail.querySelectorAll<HTMLButtonElement>(".icp-nav-pill").forEach((btn) => {
      const isAct = btn.dataset.coreId === coreId;
      btn.classList.toggle("active", isAct);
      if (isAct) {
        btn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    });
  }

  renderCoreItemSubTypeTabs();
  renderCoreItemPageProducts();

  // Show the page view and scroll to top
  pageView.hidden = false;
  document.body.classList.add("item-page-open");
  window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
}

export function closeCoreItemPage(pushHistory: boolean): void {
  const pageView = document.getElementById("item-category-page");
  if (!pageView) return;

  currentOpenCoreId = null;
  pageView.hidden = true;
  document.body.classList.remove("item-page-open");

  if (pushHistory) {
    const url = new URL(window.location.href);
    url.searchParams.delete("barang");
    window.history.pushState({}, "", url.toString());
  }

  // Return to the 3D catalog section smoothly
  const katalogSection = document.getElementById("katalog");
  if (katalogSection) {
    const top = katalogSection.getBoundingClientRect().top + window.scrollY - 60;
    window.scrollTo({ top: savedScrollY > 100 ? savedScrollY : top, behavior: "instant" as ScrollBehavior });
  }
}

function renderCoreItemSubTypeTabs(): void {
  if (!currentOpenCoreId) return;
  const bundle = CORE_ITEM_BUNDLES[currentOpenCoreId];
  const tabsWrap = document.getElementById("icp-subtype-tabs");
  if (!bundle || !tabsWrap) return;

  const allTabHtml = `
    <button
      type="button"
      class="icp-subtype-tab ${currentSelectedSubType === "Semua" ? "active" : ""}"
      data-subtype="Semua"
    >
      <span class="icp-st-name">Semua Jenis ${escapeHtml(bundle.core.shortTitle)}</span>
      <span class="icp-st-count">${bundle.items.length}</span>
    </button>
  `;

  const subTabsHtml = bundle.subTypes
    .map((st) => {
      const isAct = currentSelectedSubType === st.name;
      return `
        <button
          type="button"
          class="icp-subtype-tab ${isAct ? "active" : ""}"
          data-subtype="${escapeHtml(st.name)}"
        >
          <span class="icp-st-name">${escapeHtml(st.name)}</span>
          <span class="icp-st-count">${st.count}</span>
        </button>
      `;
    })
    .join("");

  tabsWrap.innerHTML = allTabHtml + subTabsHtml;

  tabsWrap.querySelectorAll<HTMLButtonElement>(".icp-subtype-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentSelectedSubType = btn.dataset.subtype || "Semua";
      renderCoreItemSubTypeTabs();
      renderCoreItemPageProducts();
    });
  });
}

function renderCoreItemPageProducts(): void {
  if (!currentOpenCoreId) return;
  const bundle = CORE_ITEM_BUNDLES[currentOpenCoreId];
  const resultsContainer = document.getElementById("icp-products-container");
  const resultsCountEl = document.getElementById("icp-results-count");
  const emptyStateEl = document.getElementById("icp-empty-state");

  if (!bundle || !resultsContainer) return;

  let filtered = bundle.items.filter((entry) => {
    if (currentSelectedSubType !== "Semua" && entry.subType !== currentSelectedSubType) {
      return false;
    }
    if (currentSearchQuery) {
      const q = currentSearchQuery.toLowerCase();
      const matchName = entry.product.name.toLowerCase().includes(q);
      const matchBrand = entry.product.brand.toLowerCase().includes(q);
      const matchSub = entry.subType.toLowerCase().includes(q);
      return matchName || matchBrand || matchSub;
    }
    return true;
  });

  if (currentSortMode === "price-asc") {
    filtered = [...filtered].sort((a, b) => {
      const pa = a.product.price > 0 ? a.product.price : Number.MAX_SAFE_INTEGER;
      const pb = b.product.price > 0 ? b.product.price : Number.MAX_SAFE_INTEGER;
      return pa - pb;
    });
  } else if (currentSortMode === "price-desc") {
    filtered = [...filtered].sort((a, b) => b.product.price - a.product.price);
  } else if (currentSortMode === "name-asc") {
    filtered = [...filtered].sort((a, b) => a.product.name.localeCompare(b.product.name, "id"));
  }

  if (resultsCountEl) {
    resultsCountEl.textContent = `Menampilkan ${filtered.length} dari ${bundle.items.length} barang dalam ${
      currentSelectedSubType === "Semua" ? `${bundle.subTypes.length} jenis` : `jenis "${currentSelectedSubType}"`
    }`;
  }

  if (filtered.length === 0) {
    resultsContainer.innerHTML = "";
    if (emptyStateEl) emptyStateEl.hidden = false;
    return;
  }

  if (emptyStateEl) emptyStateEl.hidden = true;

  // Group by subType ("Jenis") when showing "Semua" and default sort, so the user clearly sees every "Jenis" section!
  if (currentSelectedSubType === "Semua" && currentSortMode === "default" && !currentSearchQuery) {
    const groupsHtml = bundle.subTypes
      .map((st) => {
        const groupItems = filtered.filter((item) => item.subType === st.name);
        if (groupItems.length === 0) return "";
        const cardsHtml = groupItems.map((entry) => renderProductVariantCard(entry, bundle.core)).join("");
        return `
          <div class="icp-subtype-group">
            <div class="icp-subtype-group-header">
              <div class="icp-subtype-title-wrap">
                <span class="icp-subtype-marker" aria-hidden="true"></span>
                <h3 class="icp-subtype-group-title">${escapeHtml(st.name)}</h3>
              </div>
              <span class="icp-subtype-group-badge">${groupItems.length} Tipe Tersedia</span>
            </div>
            <div class="icp-products-grid">
              ${cardsHtml}
            </div>
          </div>
        `;
      })
      .join("");

    resultsContainer.innerHTML = groupsHtml;
  } else {
    const cardsHtml = filtered.map((entry) => renderProductVariantCard(entry, bundle.core)).join("");
    resultsContainer.innerHTML = `
      <div class="icp-products-grid">
        ${cardsHtml}
      </div>
    `;
  }
}

function renderProductVariantCard(
  entry: { product: RawInaprocItem; subType: string; localImage: string },
  core: CoreItem3D
): string {
  const p = entry.product;
  const brandClean =
    p.brand && p.brand !== "Generik / Multi-brand" ? p.brand : core.shortTitle.toUpperCase();
  const priceDisplay = p.price > 0 ? p.priceFormatted : "Harga di Etalase INAPROC";
  const priceNote = p.price > 0 ? "Termasuk PPN · e-Katalog LKPP" : "Lihat rincian harga resmi di INAPROC";

  return `
    <article class="icp-item-card">
      <div class="icp-item-media">
        <span class="icp-item-subtype-pill">${escapeHtml(entry.subType)}</span>
        <span class="icp-item-origin-pill ${p.origin === "PDN" ? "is-pdn" : "is-impor"}">${escapeHtml(
          p.origin
        )}</span>
        <img
          src="${entry.localImage}"
          alt="${escapeHtml(p.name)}"
          class="icp-item-img"
          loading="lazy"
        />
      </div>

      <div class="icp-item-body">
        <div class="icp-item-brand-row">
          <span class="icp-item-brand">${escapeHtml(brandClean)}</span>
          <span class="icp-item-cat">${escapeHtml(p.category)}</span>
        </div>

        <h4 class="icp-item-title">${escapeHtml(p.name)}</h4>

        <div class="icp-item-price-box">
          <span class="icp-item-price">${escapeHtml(priceDisplay)}</span>
          <span class="icp-item-price-sub">${escapeHtml(priceNote)}</span>
        </div>

        <div class="icp-item-actions">
          <a
            href="${p.url}"
            target="_blank"
            rel="noopener noreferrer"
            class="icp-btn-inaproc"
            aria-label="Buka ${escapeHtml(p.name)} di INAPROC LKPP (tab baru)"
          >
            <span>Lihat di INAPROC</span>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <a
            href="mailto:info@agungwijayanitya.com?subject=${encodeURIComponent(
              `Penawaran Unit: ${p.name}`
            )}"
            class="icp-btn-quote"
            aria-label="Minta penawaran untuk ${escapeHtml(p.name)}"
          >
            Penawaran
          </a>
        </div>
      </div>
    </article>
  `;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
