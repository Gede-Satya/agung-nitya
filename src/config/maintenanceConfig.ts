export interface MaintenanceStage {
  id: string;
  number: string;
  kicker: string;
  title: string;
  body: string;
  chips: string[];
  scrollStart: number; // 0 to 1
  marker: {
    x: number; // 0 to 1 relative to frame width
    y: number; // 0 to 1 relative to frame height
  };
}

export interface MaintenanceLaptopConfig {
  frameFolder: string;
  frameCount: number;
  fileExtension: string;
  sectionBadge: string;
  sectionTitle: string;
  caption: string;
  stages: MaintenanceStage[];
}

export const MAINTENANCE_CONFIG: MaintenanceLaptopConfig = {
  frameFolder: "/frames/laptop",
  frameCount: 300,
  fileExtension: "webp",
  sectionBadge: "Pemeliharaan & Purnajual",
  sectionTitle: "Dirancang untuk dirawat, bukan diganti.",
  caption: "Ilustrasi layanan pemeliharaan",
  stages: [
    {
      id: "inspeksi",
      number: "01",
      kicker: "INSPEKSI",
      title: "Inspeksi & Pembersihan",
      body: "Pembukaan panel, pembersihan debu dan kipas, serta pengecekan fisik perangkat.",
      chips: ["Pembersihan kipas", "Cek fisik"],
      scrollStart: 0,
      marker: { x: 0.52, y: 0.68 },
    },
    {
      id: "pendingin",
      number: "02",
      kicker: "PERAWATAN PENDINGIN",
      title: "Pasta Termal & Suhu",
      body: "Penggantian pasta termal dan pengecekan suhu kerja setelah perawatan.",
      chips: ["Pasta termal", "Uji suhu"],
      scrollStart: 0.25,
      marker: { x: 0.50, y: 0.38 },
    },
    {
      id: "komponen",
      number: "03",
      kicker: "KOMPONEN",
      title: "Upgrade & Penggantian",
      body: "Penambahan RAM, penggantian SSD, baterai, dan suku cadang lain.",
      chips: ["RAM", "SSD", "Baterai"],
      scrollStart: 0.5,
      marker: { x: 0.48, y: 0.55 },
    },
    {
      id: "pengujian",
      number: "04",
      kicker: "PENGUJIAN",
      title: "Uji Fungsi & Laporan",
      body: "Uji fungsi menyeluruh dan berita acara servis untuk arsip instansi.",
      chips: ["Berita acara", "Uji fungsi"],
      scrollStart: 0.75,
      marker: { x: 0.52, y: 0.22 },
    },
  ],
};
