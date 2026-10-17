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
    image: "/products/sony-pxw-z200.png",
    title: "Sony PXW-Z200 4K Camcorder",
    category: "Peralatan Studio & Audio Visual",
    href: "https://katalog.inaproc.id/agung-wijaya-nitya/sony-pxw-z200-4k-hdr-xdcam-professional-camcorder",
    isPlaceholder: false,
  },
  {
    image: "/products/behringer-um2.png",
    title: "Behringer U-PHORIA UM2 Soundcard",
    category: "Peralatan Audio",
    href: "https://katalog.inaproc.id/agung-wijaya-nitya/behringer-u-phoria-um2-soundcard",
    isPlaceholder: false,
  },
  {
    image: "/products/krisbow-sampah-240l.png",
    title: "Krisbow Tempat Sampah Tutup Angkat 240L",
    category: "Sanitasi & Kebersihan",
    href: "https://katalog.inaproc.id/agung-wijaya-nitya/krisbow-tempat-sampah-tutup-angkat-plastik-dengan-roda-240-liter",
    isPlaceholder: false,
  },
  {
    image: "/products/krisbow-pedal-240l.png",
    title: "Krisbow Tempat Sampah Pedal 240L",
    category: "Sanitasi & Kebersihan",
    href: "https://katalog.inaproc.id/agung-wijaya-nitya/krisbow-tempat-sampah-pedal-plastik-dengan-roda-240-liter",
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
