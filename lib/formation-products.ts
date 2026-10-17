export interface FormationProduct {
  image: string;
  title: string;
  category: string;
  href: string;
  isPlaceholder?: boolean;
}

export type Work = FormationProduct;

export const formationProducts: FormationProduct[] = [
  {
    image: "/products/server-dell-r760xs.png",
    title: "DELL PowerEdge R760xs Rack Server",
    category: "Pusat Data & Server",
    href: "https://katalog.inaproc.id/agung-wijaya-nitya/dell-power-edge-r760xs",
    isPlaceholder: false,
  },
  {
    image: "/products/workstation-lenovo-p7.jpeg",
    title: "Lenovo ThinkStation P7 Workstation",
    category: "Komputasi Meja & Workstation",
    href: "https://katalog.inaproc.id/agung-wijaya-nitya/lenovo-thinkstation-p7",
    isPlaceholder: false,
  },
  {
    image: "/products/ups-apc-smc3000i.jpeg",
    title: "APC Smart-UPS SMC3000I-C 3000VA LCD",
    category: "Backup Power (UPS)",
    href: "https://katalog.inaproc.id/agung-wijaya-nitya/apc-smart-ups-smc3000i-c-3000va-lcd-230v",
    isPlaceholder: false,
  },
  {
    image: "/products/monitor-lg-32hl512d.jpeg",
    title: "LG 8MP Diagnostic Monitor 32HL512D",
    category: "Display & Monitor Komersial",
    href: "https://katalog.inaproc.id/agung-wijaya-nitya/lg-8mp-diagnostic-monitor-32hl512d",
    isPlaceholder: false,
  },
  {
    image: "/products/rak-stainless-steel.png",
    title: "Rak Stainless Steel 4 Susun",
    category: "Penyimpanan & Rak Stainless",
    href: "https://katalog.inaproc.id/agung-wijaya-nitya/rak-stainless-steel",
    isPlaceholder: false,
  },
  {
    image: "/products/rak-display-obat.png",
    title: "Rak Display Obat dan Alkes",
    category: "Peralatan Medis & Rumah Sakit",
    href: "https://katalog.inaproc.id/agung-wijaya-nitya/rak-display-obat-dan-alkes",
    isPlaceholder: false,
  },
  {
    image: "/products/lemari-penyimpanan-b3.png",
    title: "Lemari Penyimpanan B3 Kuning",
    category: "Lemari Khusus Bahan Berbahaya",
    href: "https://katalog.inaproc.id/agung-wijaya-nitya/lemari-penyimpanan-b3",
    isPlaceholder: false,
  },
  {
    image: "/products/rak-medium-duty.png",
    title: "Rak Medium Duty Pergudangan",
    category: "Rak Pergudangan & Heavy Duty",
    href: "https://katalog.inaproc.id/agung-wijaya-nitya/rak-medium-duty",
    isPlaceholder: false,
  },
  {
    image: "/products/troli-linen.png",
    title: "Troli Linen Rumah Sakit",
    category: "Peralatan Rumah Sakit / Troli",
    href: "https://katalog.inaproc.id/agung-wijaya-nitya/troli-linen",
    isPlaceholder: false,
  },
  {
    image: "/products/jasa-pemeliharaan.png",
    title: "Jasa Pemeliharaan / Penggantian Kabel 90W",
    category: "Jasa Pemeliharaan TI",
    href: "https://katalog.inaproc.id/agung-wijaya-nitya/jasa-pemeliharaan-penggantian-kabel-adaptor-daya-90w",
    isPlaceholder: false,
  },
];
