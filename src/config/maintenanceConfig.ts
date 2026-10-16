export interface MaintenanceHotspot {
  label: string;
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
}

export interface MaintenanceStage {
  id: string;
  number: number;
  stepLabel: string;
  title: string;
  shortTitle: string;
  description: string;
  chips: string[];
  deliverable: string;
  scrollStart: number;
  hotspot: MaintenanceHotspot;
}

export interface MaintenanceLaptopConfig {
  frameFolder: string;
  frameCount: number;
  fileExtension: string;
  sectionBadge: string;
  sectionTitle: string;
  stages: MaintenanceStage[];
}

export const MAINTENANCE_CONFIG: MaintenanceLaptopConfig = {
  frameFolder: "/frames/laptop",
  frameCount: 300,
  fileExtension: "webp",
  sectionBadge: "Pemeliharaan & purnajual",
  sectionTitle: "Dirancang untuk dirawat, bukan diganti.",
  stages: [
    {
      id: "inspeksi",
      number: 1,
      stepLabel: "Tahap 1 dari 4",
      title: "Inspeksi & pembersihan",
      shortTitle: "Inspeksi",
      description:
        "Pembukaan panel, pembersihan debu dan kipas, serta pengecekan kondisi fisik perangkat secara menyeluruh.",
      chips: ["Pembersihan kipas", "Cek fisik"],
      deliverable: "Catatan kondisi awal perangkat.",
      scrollStart: 0,
      hotspot: { label: "Kipas & cover bawah", x: 48, y: 72 },
    },
    {
      id: "pendingin",
      number: 2,
      stepLabel: "Tahap 2 dari 4",
      title: "Pasta termal & suhu",
      shortTitle: "Pendingin",
      description:
        "Penggantian pasta termal berkualitas tinggi dan evaluasi stabilitas suhu kerja di bawah beban operasional.",
      chips: ["Ganti pasta termal", "Uji suhu beban"],
      deliverable: "Grafik suhu sebelum dan sesudah.",
      scrollStart: 0.25,
      hotspot: { label: "Pasta termal & heatsink", x: 50, y: 40 },
    },
    {
      id: "komponen",
      number: 3,
      stepLabel: "Tahap 3 dari 4",
      title: "Upgrade & penggantian",
      shortTitle: "Upgrade",
      description:
        "Peningkatan memori kerja, pergantian modul penyimpanan berkecepatan tinggi, serta pembaruan unit baterai.",
      chips: ["RAM & SSD", "Baterai"],
      deliverable: "Daftar komponen terpasang.",
      scrollStart: 0.5,
      hotspot: { label: "RAM, SSD & baterai", x: 52, y: 56 },
    },
    {
      id: "pengujian",
      number: 4,
      stepLabel: "Tahap 4 dari 4",
      title: "Uji fungsi & laporan",
      shortTitle: "Pengujian",
      description:
        "Pemeriksaan fungsi menyeluruh seluruh komponen dan penerbitan berita acara servis resmi untuk instansi.",
      chips: ["Uji fungsi", "Laporan servis"],
      deliverable: "Laporan servis (PDF).",
      scrollStart: 0.75,
      hotspot: { label: "Layar & uji fungsional", x: 54, y: 24 },
    },
  ],
};
