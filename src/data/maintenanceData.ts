export interface MaintenanceComponent {
  id: string;
  number: string;
  name: string;
  category: string;
  services: string[];
  description: string;
  duration: string;
  side: "left" | "right";
  hotspot: {
    x: number; // percentage (0 - 100)
    y: number; // percentage (0 - 100)
  };
}

export const MAINTENANCE_COMPONENTS: MaintenanceComponent[] = [
  {
    id: "layar",
    number: "01",
    name: "Layar & Panel Display",
    category: "Visual & Display",
    services: [
      "Pemeriksaan dead pixel & backlight bleeding",
      "Penggantian panel LCD / IPS resolusi tinggi",
      "Kalibrasi akurasi warna & fleksibel engsel",
    ],
    description:
      "Perbaikan tampilan bergaris, penggantian modul layar retak, serta kalibrasi warna presisi untuk kebutuhan operasional harian instansi.",
    duration: "1 - 2 Jam",
    side: "left",
    hotspot: {
      x: 50,
      y: 22,
    },
  },
  {
    id: "cooling",
    number: "02",
    name: "Cooling Fan & Heat Pipe",
    category: "Termal & Sirkulasi",
    services: [
      "Pembersihan sirip radiator & blower turbin",
      "Penggantian thermal paste konduktivitas tinggi",
      "Uji stres termal di bawah beban kerja penuh",
    ],
    description:
      "Eliminasi debu penyebab overheat, pelumasan bearing kipas pendingin, dan re-pasta termal untuk mencegah penurunan performa (throttling).",
    duration: "45 Menit",
    side: "left",
    hotspot: {
      x: 40,
      y: 39,
    },
  },
  {
    id: "motherboard",
    number: "03",
    name: "Motherboard (RAM & SSD)",
    category: "Komputasi & Sirkuit",
    services: [
      "Upgrade kapasitas modul RAM DDR4/DDR5",
      "Ekspansi media simpan NVMe SSD PCIe 4.0",
      "Diagnosa sirkuit daya & pembersihan korosi",
    ],
    description:
      "Peningkatan kecepatan pemrosesan data, pemulihan integritas sinyal motherboard, serta penggantian modul penyimpanan dengan transfer data cepat.",
    duration: "1 - 3 Jam",
    side: "right",
    hotspot: {
      x: 54,
      y: 52,
    },
  },
  {
    id: "baterai",
    number: "04",
    name: "Baterai & Modul Daya",
    category: "Daya & Kelistrikan",
    services: [
      "Pengecekan kesehatan sel (health & cycle count)",
      "Penggantian modul baterai bergaransi resmi",
      "Kalibrasi sirkuit pengisian & proteksi lonjakan",
    ],
    description:
      "Pemeriksaan penurunan kapasitas baterai, pergantian sel baterai bersertifikasi keselamatan kerja, dan jaminan daya tahan mobilitas kerja.",
    duration: "30 - 60 Menit",
    side: "left",
    hotspot: {
      x: 46,
      y: 68,
    },
  },
  {
    id: "bottom-cover",
    number: "05",
    name: "Bottom Cover & Rangka Sasis",
    category: "Struktur Fisik",
    services: [
      "Penggantian casing bawah & bezel sasis",
      "Perbaikan & pengencangan engsel buka-tutup",
      "Pemasangan bantalan karet (feet) & filter ventilasi",
    ],
    description:
      "Pemulihan kekokohan sasis perangkat, perbaikan engsel layar yang longgar atau patah, serta perlindungan rongga udara dari partikel asing.",
    duration: "1 Jam",
    side: "right",
    hotspot: {
      x: 46,
      y: 83,
    },
  },
];
