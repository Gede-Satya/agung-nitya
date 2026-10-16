export interface InaprocProduct {
  id: string;
  name: string;
  category: string;
  categorySlug: "ti-audiovisual" | "sanitasi" | "penyimpanan" | "medis-farmasi";
  priceFormatted: string;
  priceRaw: number;
  priceNote: string;
  type: "Barang" | "Jasa";
  origin: "PDN" | "Import";
  scale: "UMKK";
  location: string;
  soldCount?: number;
  summary: string;
  specs: string[];
  imageUrl: string;
  inaprocUrl: string;
  kbkiCode?: string;
}

export interface CatalogCategory {
  slug: "semua" | "ti-audiovisual" | "sanitasi" | "penyimpanan" | "medis-farmasi";
  name: string;
  description: string;
}

export const CATALOG_CATEGORIES: CatalogCategory[] = [
  {
    slug: "semua",
    name: "Semua Kategori",
    description: "Seluruh produk dan jasa terverifikasi di etalase resmi INAPROC.",
  },
  {
    slug: "ti-audiovisual",
    name: "TI & Audio Visual",
    description: "Perangkat studio perekaman, soundcard, dan jasa pemeliharaan TI.",
  },
  {
    slug: "sanitasi",
    name: "Sanitasi & Kebersihan",
    description: "Tempat sampah beroda standar pilah sampah kapasitas 240L.",
  },
  {
    slug: "penyimpanan",
    name: "Penyimpanan & Rak",
    description: "Rak stainless steel, rak pergudangan baja, dan lemari keselamatan B3.",
  },
  {
    slug: "medis-farmasi",
    name: "Medis & Farmasi",
    description: "Rak display obat/alkes terkunci dan troli linen rumah sakit.",
  },
];

export const INAPROC_PRODUCTS: InaprocProduct[] = [
  {
    id: "sony-pxw-z200",
    name: "Sony PXW-Z200 4K HDR XDCAM Professional Camcorder",
    category: "Peralatan Studio & Audio Visual",
    categorySlug: "ti-audiovisual",
    priceFormatted: "Rp 110.150.000,00",
    priceRaw: 110150000,
    priceNote: "Termasuk PPN 12%",
    type: "Barang",
    origin: "Import",
    scale: "UMKK",
    location: "Kab. Badung, Bali",
    kbkiCode: "4732300001",
    summary:
      "Camcorder profesional 4K UHD berkinerja tinggi untuk kebutuhan broadcast, liputan dokumentasi instansi, dan integrasi studio audio visual modern.",
    specs: [
      "Resolusi: 4K UHD (3840 x 2160)",
      "Sensor: 13.2 x 8.8 mm (1\"-Type) CMOS",
      "Lensa: 20x Optical Zoom, prosesor BIONZ XR",
      "Fitur Cerdas: AI Subject Recognition AF, Variable ND Filter",
      "Konektivitas: 12G-SDI, 3G-SDI, HDMI Type-A, USB-C, LAN, Wi-Fi 2.4/5GHz, XLR",
      "Storage: Dual Slot CFexpress Type A / SDXC",
      "Garansi: Resmi 1 Tahun",
    ],
    imageUrl: "/products/sony-pxw-z200.png",
    inaprocUrl:
      "https://katalog.inaproc.id/agung-wijaya-nitya/sony-pxw-z200-4k-hdr-xdcam-professional-camcorder",
  },
  {
    id: "behringer-um2",
    name: "Behringer U-PHORIA UM2 Soundcard",
    category: "Peralatan Audio & Studio",
    categorySlug: "ti-audiovisual",
    priceFormatted: "Rp 1.645.000,00",
    priceRaw: 1645000,
    priceNote: "Termasuk PPN 12%",
    type: "Barang",
    origin: "Import",
    scale: "UMKK",
    location: "Kab. Badung, Bali",
    summary:
      "Antarmuka audio USB 2x2 audiophile dengan preamp mikrofon XENYX berteknologi phantom power +48V untuk rekaman vokal dan instrumen jernih.",
    specs: [
      "Koneksi: USB 2.0 Audio Interface 2x2",
      "Preamp: XENYX Mic Preamp dengan +48V Phantom Power",
      "Input: 1x Mic/Line (XLR/TRS combo), 1x Instrument (TS)",
      "Output: 2x RCA stereo, 1x Headphone jack 1/4\"",
      "Resolusi: 48 kHz resolusi audio presisi",
      "Monitoring: Direct Monitor latency-free",
    ],
    imageUrl: "/products/behringer-um2.png",
    inaprocUrl:
      "https://katalog.inaproc.id/agung-wijaya-nitya/behringer-u-phoria-um2-soundcard",
  },
  {
    id: "jasa-pemeliharaan-90w",
    name: "Jasa Pemeliharaan/Penggantian Kabel Adaptor Daya 90W",
    category: "Jasa Pemeliharaan TI",
    categorySlug: "ti-audiovisual",
    priceFormatted: "Rp 1.515.000,00",
    priceRaw: 1515000,
    priceNote: "Termasuk PPN 12%",
    type: "Jasa",
    origin: "PDN",
    scale: "UMKK",
    location: "Kab. Badung, Bali",
    summary:
      "Layanan servis teknis perbaikan dan penggantian kabel adaptor daya perangkat TI 90W dengan pengujian beban dan berita acara serah terima resmi.",
    specs: [
      "Kapasitas: Adaptor daya laptop / PC hingga 90W",
      "Pekerjaan: Pembongkaran panel, perbaikan jalur, terminasi kabel baru",
      "Uji Fungsi: Pengukuran tegangan output & stabilitas arus beban",
      "Dokumentasi: Berita acara servis teknis resmi untuk arsip instansi",
      "Kualifikasi: Teknisi bersertifikasi perangkat keras TI",
    ],
    imageUrl: "/products/jasa-pemeliharaan.png",
    inaprocUrl:
      "https://katalog.inaproc.id/agung-wijaya-nitya/jasa-pemeliharaan-penggantian-kabel-adaptor-daya-90w",
  },
  {
    id: "krisbow-sampah-240l",
    name: "Krisbow Tempat Sampah Tutup Angkat Plastik Dengan Roda 240 Liter",
    category: "Sanitasi & Kebersihan",
    categorySlug: "sanitasi",
    priceFormatted: "Rp 1.616.000,00",
    priceRaw: 1616000,
    priceNote: "Termasuk PPN 12%",
    type: "Barang",
    origin: "PDN",
    scale: "UMKK",
    location: "Kab. Badung, Bali",
    summary:
      "Bak sampah berkapasitas besar 240L berbahan plastik HDPE berkepadatan tinggi yang tahan cuaca panas dan bahan kimia korosif.",
    specs: [
      "Kapasitas: 240 Liter",
      "Material: Virgin High-Density Polyethylene (HDPE)",
      "Mobilitas: 2 Roda karet kokoh anti selip",
      "Model Tutup: Tutup angkat rapat penahan bau",
      "Standar: Tahan paparan sinar UV dan bahan kimia pembersih",
      "Warna: Hijau dengan tutup kuning (kode pilah sampah)",
    ],
    imageUrl: "/products/krisbow-sampah-240l.png",
    inaprocUrl:
      "https://katalog.inaproc.id/agung-wijaya-nitya/krisbow-tempat-sampah-tutup-angkat-plastik-dengan-roda-240-liter",
  },
  {
    id: "krisbow-pedal-240l",
    name: "Krisbow Tempat Sampah Pedal Plastik Dengan Roda 240 Liter",
    category: "Sanitasi & Kebersihan",
    categorySlug: "sanitasi",
    priceFormatted: "Rp 1.616.000,00",
    priceRaw: 1616000,
    priceNote: "Termasuk PPN 12%",
    type: "Barang",
    origin: "PDN",
    scale: "UMKK",
    location: "Kab. Badung, Bali",
    summary:
      "Tempat sampah higienis 240 liter beroda dengan mekanisme pedal injak bawah untuk membuka tutup tanpa sentuhan langsung tangan pengelola.",
    specs: [
      "Kapasitas: 240 Liter",
      "Mekanisme: Pedal injak kokoh berbahan baja dilapisi polimer",
      "Material: Plastik HDPE tahan benturan",
      "Mobilitas: 2 Roda karet padat berdaya tahan tinggi",
      "Higienitas: Operasional bebas kontak tangan (hands-free)",
      "Warna: Kuning (sesuai standar pemilahan limbah)",
    ],
    imageUrl: "/products/krisbow-pedal-240l.png",
    inaprocUrl:
      "https://katalog.inaproc.id/agung-wijaya-nitya/krisbow-tempat-sampah-pedal-plastik-dengan-roda-240-liter",
  },
  {
    id: "rak-stainless-steel",
    name: "Rak Stainless Steel",
    category: "Penyimpanan & Rak Stainless",
    categorySlug: "penyimpanan",
    priceFormatted: "Rp 4.999.999,00",
    priceRaw: 4999999,
    priceNote: "Termasuk PPN 12%",
    type: "Barang",
    origin: "PDN",
    scale: "UMKK",
    location: "Kab. Badung, Bali",
    summary:
      "Rak susun 4 tingkat berbahan baja tahan karat (stainless steel) food-grade untuk instalasi gizi, laboratorium, pantry kantor, dan area steril rumah sakit.",
    specs: [
      "Jumlah Tingkat: 4 Tingkat",
      "Material: Stainless Steel anti karat & higienis",
      "Kaki Penopang: Dilengkapi bantalan leveling perata lantai",
      "Konstruksi: Sambungan las presisi berdaya beban tinggi",
      "Perawatan: Tahan cairan pembersih disinfektan dan alkohol",
    ],
    imageUrl: "/products/rak-stainless-steel.png",
    inaprocUrl: "https://katalog.inaproc.id/agung-wijaya-nitya/rak-stainless-steel",
  },
  {
    id: "rak-display-obat",
    name: "Rak Display Obat dan Alkes",
    category: "Peralatan Medis & Farmasi",
    categorySlug: "medis-farmasi",
    priceFormatted: "Rp 23.865.000,00",
    priceRaw: 23865000,
    priceNote: "Termasuk PPN 12%",
    type: "Barang",
    origin: "PDN",
    scale: "UMKK",
    location: "Kab. Badung, Bali",
    soldCount: 2,
    summary:
      "Lemari display terpadu untuk farmasi dan faskes dengan sekat akrilik bening transparan untuk inventaris obat dan 6 pintu kabinet berkunci di bagian bawah.",
    specs: [
      "Bagian Atas: Kompartemen bertingkat dengan sekat akrilik bening",
      "Bagian Bawah: 6 Pintu kabinet penyimpanan berkunci tersendiri",
      "Material Rangka: Panel laminasi tebal dengan tepian PVC",
      "Keamanan: Kunci individual untuk penyimpanan obat/alkes khusus",
      "Penggunaan: Apotek, instalasi farmasi RS, klinik, dan puskesmas",
    ],
    imageUrl: "/products/rak-display-obat.png",
    inaprocUrl:
      "https://katalog.inaproc.id/agung-wijaya-nitya/rak-display-obat-dan-alkes",
  },
  {
    id: "lemari-penyimpanan-b3",
    name: "Lemari Penyimpanan B3",
    category: "Lemari Khusus & Keselamatan",
    categorySlug: "penyimpanan",
    priceFormatted: "Rp 16.930.000,00",
    priceRaw: 16930000,
    priceNote: "Termasuk PPN 12%",
    type: "Barang",
    origin: "PDN",
    scale: "UMKK",
    location: "Kab. Badung, Bali",
    summary:
      "Lemari keselamatan standar industri untuk penyimpanan bahan berbahaya dan beracun (B3), cairan kimia, serta reagen laboratorium.",
    specs: [
      "Pintu: Pintu ganda dengan handle tanam dan kunci pengaman",
      "Peringatan: Simbol standar biohazard & limbah B3 internasional",
      "Material: Pelat baja kokoh dengan lapisan pelindung anti korosi",
      "Sirkulasi: Lubang ventilasi pencegah akumulasi gas berbahaya",
      "Standar K3: Memenuhi regulasi keselamatan pengelolaan B3",
    ],
    imageUrl: "/products/lemari-penyimpanan-b3.png",
    inaprocUrl: "https://katalog.inaproc.id/agung-wijaya-nitya/lemari-penyimpanan-b3",
  },
  {
    id: "rak-medium-duty",
    name: "Rak Medium Duty",
    category: "Pergudangan & Logistik",
    categorySlug: "penyimpanan",
    priceFormatted: "Rp 7.159.500,00",
    priceRaw: 7159500,
    priceNote: "Termasuk PPN 12%",
    type: "Barang",
    origin: "PDN",
    scale: "UMKK",
    location: "Kab. Badung, Bali",
    soldCount: 1,
    summary:
      "Rak pergudangan bertingkat tipe medium-duty dengan konstruksi rangka baja berpalang diagonal untuk penyimpanan logistik dan inventaris instansi.",
    specs: [
      "Kapasitas Beban: Medium duty per shelving",
      "Konstruksi: Rangka baja tiang perforated dengan penguat diagonal",
      "Finishing: Cat bubuk elektrostatis (powder coating) anti gores",
      "Tingkat: 6 Level rak yang dapat diatur ketinggiannya",
      "Aplikasi: Gudang logistik, ruang arsip dinas, bengkel operasional",
    ],
    imageUrl: "/products/rak-medium-duty.png",
    inaprocUrl: "https://katalog.inaproc.id/agung-wijaya-nitya/rak-medium-duty",
  },
  {
    id: "troli-linen",
    name: "Troli Linen",
    category: "Perlengkapan Medis & Rumah Sakit",
    categorySlug: "medis-farmasi",
    priceFormatted: "Rp 8.600.000,00",
    priceRaw: 8600000,
    priceNote: "Termasuk PPN 12%",
    type: "Barang",
    origin: "PDN",
    scale: "UMKK",
    location: "Kab. Badung, Bali",
    summary:
      "Troli pengangkut linen medis dan operasional faskes berangka pipa stainless steel kokoh dilengkapi kantung kanvas tebal tahan basah yang dapat dilepas.",
    specs: [
      "Rangka: Pipa tubular stainless steel tahan karat",
      "Kantung: Kain kanvas tebal heavy-duty dengan pengait logam",
      "Roda: 4 Roda swivel caster 360 derajat (2 roda berpengunci)",
      "Higienitas: Kantung kain mudah dilepas untuk dicuci dan disterilkan",
      "Kapasitas: Dirancang untuk distribusi linen bersih/kotor rumah sakit",
    ],
    imageUrl: "/products/troli-linen.png",
    inaprocUrl: "https://katalog.inaproc.id/agung-wijaya-nitya/troli-linen",
  },
];
