/**
 * Single Source of Truth for site copy, verified facts, and navigation (DESIGN.md §1, §3, §4, §6).
 * No unconfirmed claims, fabricated specifications, or placeholder contacts.
 */

export interface NavLink {
  label: string;
  href: string;
  id: string;
}

export interface CategoryCard {
  badge: string;
  title: string;
  desc: string;
  image: string;
  alt: string;
}

export interface WorkflowItem {
  title: string;
  desc: string;
}

export interface SpotlightCategory {
  id: string;
  tag: string;
  title: string;
  headline: string;
  description: string;
  target: string;
  image: string;
  imageAlt: string;
  catalogUrl?: string;
}

export interface SiteContent {
  company: {
    name: string;
    legalType: string;
    location: string;
    email: string;
    phonePlaceholder: string;
    inaprocUrl: string;
    inaprocProviderType: string;
    inaprocStatus: string;
    activeProductsCount: number;
    activeProductsDate: string;
    lastVerifiedAt: string;
    whatsappUrl?: string; // Unconfirmed/placeholder; kept empty or hidden per DESIGN.md §1
  };
  navigation: {
    links: NavLink[];
    primaryAction: {
      label: string;
      href: string;
    };
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: {
      label: string;
      href: string;
    };
    ctaSecondary: {
      label: string;
      href: string;
    };
    categoryChips: string[];
    trustPoints: string[];
  };
  liniPengadaan: {
    eyebrow: string;
    title: string;
    subtitle: string;
    profileLinkText: string;
    cards: CategoryCard[];
  };
  ekosistem: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    profileLinkText: string;
    cardTitle: string;
    workflowItems: WorkflowItem[];
    cardFooterNotice: string;
    ctaActionText: string;
  };
  unitPengadaan: {
    title: string;
    subtitle: string;
    notice: string;
    spotlights: SpotlightCategory[];
  };
  contact: {
    sectionId: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    directEmailLabel: string;
    catalogProfileLabel: string;
  };
  footer: {
    tagline: string;
    description: string;
    columns: {
      title: string;
      links: { label: string; href: string; external?: boolean }[];
    }[];
  };
  headline: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    ctaPrimary: {
      label: string;
      href: string;
    };
  };
  pillars: {
    id: string;
    order: number;
    title: string;
    subtitle: string;
    description: string;
    badge?: string;
    isHeadline?: boolean;
    is3dFocus?: boolean;
    capabilities: string[];
  }[];
  spotlights: SpotlightCategory[];
  kbliCategories: {
    name: string;
    scope: string;
  }[];
}

export const SITE_CONTENT: SiteContent = {
  company: {
    name: "PT Agung Wijaya Nitya",
    legalType: "Perseroan Terbatas",
    location: "Kabupaten Badung, Bali",
    email: "info@agungwijayanitya.com",
    // Nomor kontak sebelumnya belum terverifikasi; tinggalkan TODO sampai dikonfirmasi pemilik
    phonePlaceholder: "TODO: Konfirmasi kontak telepon resmi",
    inaprocUrl: "https://katalog.inaproc.id/agung-wijaya-nitya",
    inaprocProviderType: "UMKK",
    inaprocStatus: "Penyedia Aktif",
    // 742 produk per pengamatan 17 Oktober 2026 di katalog.inaproc.id
    activeProductsCount: 742,
    activeProductsDate: "17 Oktober 2026",
    lastVerifiedAt: "17 Oktober 2026",
    whatsappUrl: undefined, // Disembunyikan per DESIGN.md §1 & §13 sampai nomor terkonfirmasi
  },

  navigation: {
    links: [
      { label: "Beranda", href: "/", id: "hero" },
      { label: "Lini Produk", href: "/#lini-utama", id: "lini-utama" },
      { label: "Katalog", href: "/katalog", id: "katalog" },
      { label: "Layanan", href: "/#pemeliharaan", id: "pemeliharaan" },
      { label: "Ekosistem", href: "/#ekosistem", id: "ekosistem" },
      { label: "Kontak", href: "/#kontak", id: "kontak" },
    ],
    primaryAction: {
      label: "Minta Penawaran",
      href: "/#kontak",
    },
  },

  hero: {
    badge: "Penyedia Aktif INAPROC Katalog Elektronik",
    title: "Pengadaan perangkat TI untuk instansi dan proyek pemerintah.",
    subtitle:
      "Komputer, server, UPS, dan display dengan penawaran resmi, tersedia juga lewat e-katalog INAPROC.",
    ctaPrimary: {
      label: "Lihat Katalog",
      href: "/katalog",
    },
    ctaSecondary: {
      label: "Minta Penawaran",
      href: "/#kontak",
    },
    categoryChips: [
      "Komputer & Workstation",
      "Server Rack & Storage",
      "Backup Power (UPS)",
      "Commercial Display",
    ],
    trustPoints: [
      "Tersedia di E-Katalog INAPROC",
      "Penyedia Kategori UMKK",
      "Penawaran & Faktur Pajak Resmi",
      "Dukungan BoQ & Administrasi Tender",
    ],
  },

  liniPengadaan: {
    eyebrow: "Lini Pengadaan",
    title: "Kenali lini pengadaan utama.",
    subtitle:
      "Dukungan komprehensif mulai dari pusat data, komputasi meja, hingga display modern.",
    profileLinkText: "Lihat profil INAPROC",
    cards: [
      {
        badge: "Pusat Data & Server",
        title: "Server, storage, dan UPS untuk keandalan operasional.",
        desc: "Penyediaan infrastruktur pusat data, unit komputasi rak redundan, dan sistem proteksi daya cadangan untuk kontinuitas fasilitas instansi.",
        image: "/images/card-server-storage.jpg",
        alt: "Ilustrasi server rack dan unit penyimpanan data pusat data",
      },
      {
        badge: "Produktivitas Kerja",
        title: "Laptop bisnis, PC desktop, dan periferal kerja instansi.",
        desc: "Platform perangkat kerja terkelola untuk pemenuhan kebutuhan operasional harian dinas, instansi, dan fasilitas layanan publik.",
        image: "/images/card-workstation-pc.jpg",
        alt: "Ilustrasi laptop dan workstation bisnis perkantoran",
      },
      {
        badge: "Fasilitas & Display Komersial",
        title: "Smart display, monitor komersial, dan perlengkapan ruang modern.",
        desc: "Panel display beresolusi tinggi untuk ruang rapat, ruang pertemuan, signage informasi, serta perlengkapan pendukung fasilitas instansi.",
        image: "/images/card-commercial-display.jpg",
        alt: "Ilustrasi monitor dan display komersial untuk ruang instansi",
      },
    ],
  },

  ekosistem: {
    eyebrow: "Ekosistem Pengadaan Resmi",
    title: "Transparan dari BoQ hingga Berita Acara.",
    paragraphs: [
      "PT Agung Wijaya Nitya terdaftar sebagai penyedia aktif pada platform INAPROC Katalog Elektronik dengan kualifikasi usaha UMKK di Kabupaten Badung, Bali.",
      "Melayani mekanisme purchase order korporat dan pengadaan instansi dengan dokumen penawaran dan administrasi yang dapat diverifikasi langsung di profil resmi INAPROC kami.",
    ],
    profileLinkText: "Cek profil INAPROC kami",
    cardTitle: "Standar Prosedur Pengadaan AWN",
    workflowItems: [
      {
        title: "Konsultasi & Penelaahan BoQ",
        desc: "Penyelarasan daftar kebutuhan barang dan spesifikasi teknis anggaran instansi.",
      },
      {
        title: "Pilihan Jalur Transaksi",
        desc: "Dukungan transaksi melalui e-Katalog LKPP atau penawaran langsung.",
      },
      {
        title: "Pemeriksaan Pra-Kirim (Pre-Delivery)",
        desc: "Verifikasi kelengkapan fisik dan fungsional unit sebelum serah terima.",
      },
      {
        title: "Kelengkapan Faktur & Administrasi",
        desc: "Faktur pajak, kwitansi resmi, dan berita acara serah terima barang (BAST).",
      },
      {
        title: "Dukungan Penjelasan Teknis",
        desc: "Pendampingan informasi pengoperasian dan verifikasi fungsional unit.",
      },
    ],
    cardFooterNotice:
      "Dokumen penawaran tersedia dalam format resmi untuk PPK & pejabat pengadaan.",
    ctaActionText: "Minta penawaran",
  },

  unitPengadaan: {
    title: "Unit siap pengadaan.",
    subtitle: "Sorotan kategori perangkat andalan untuk pengadaan semester ini.",
    notice: "Ketersediaan dan spesifikasi diselaraskan dengan etalase resmi INAPROC",
    spotlights: [
      {
        id: "server-rack",
        tag: "Rack Server",
        title: "Infrastruktur Server & Komputasi Rak",
        headline: "Tenaga komputasi terstruktur untuk fasilitas instansi.",
        description:
          "Solusi server rack dan unit penyimpanan data yang dapat disesuaikan dengan kebutuhan tata kelola sistem informasi dan ruang server instansi.",
        target: "Ruang server instansi, pusat data lokal, fasilitas komputasi terpusat",
        image: "/images/card-server-storage.jpg",
        imageAlt: "Ilustrasi unit server rack untuk fasilitas pusat data",
        catalogUrl: "https://katalog.inaproc.id/agung-wijaya-nitya",
      },
      {
        id: "workstation-pc",
        tag: "Komputasi Meja",
        title: "Komputer Kerja & Laptop Kantor",
        headline: "Keandalan komputasi harian untuk armada staf instansi.",
        description:
          "Penyediaan PC desktop dan unit laptop bisnis dengan spesifikasi standar operasional kantor untuk menunjang produktivitas administratif.",
        target: "Ruang kerja pegawai, divisi administrasi, staf operasional",
        image: "/images/card-workstation-pc.jpg",
        imageAlt: "Ilustrasi unit komputer kerja dan laptop bisnis",
        catalogUrl: "https://katalog.inaproc.id/agung-wijaya-nitya",
      },
      {
        id: "ups-protection",
        tag: "Proteksi Daya",
        title: "Unit Catu Daya Cadangan (UPS)",
        headline: "Perlindungan stabilitas daya untuk perangkat kritis.",
        description:
          "Sistem proteksi pasokan daya listrik cadangan untuk menjaga kontinuitas operasional server, stasiun kerja, dan jaringan dari lonjakan atau pemadaman.",
        target: "Ruang server, perangkat jaringan, stasiun kontrol operasional",
        image: "/images/ups-smart-online.jpg",
        imageAlt: "Ilustrasi unit UPS cadangan daya operasional",
        catalogUrl: "https://katalog.inaproc.id/agung-wijaya-nitya",
      },
      {
        id: "commercial-display",
        tag: "Display Komersial",
        title: "Monitor & Display Ruang Rapat",
        headline: "Kejelasan visual presisi untuk koordinasi dan presentasi.",
        description:
          "Panel layar besar dan monitor profesional untuk kebutuhan ruang rapat, aula serbaguna, pemaparan data dinas, dan visualisasi informasi publik.",
        target: "Ruang rapat pimpinan, aula instansi, media informasi publik",
        image: "/images/card-commercial-display.jpg",
        imageAlt: "Ilustrasi monitor dan display visual ruangan",
        catalogUrl: "https://katalog.inaproc.id/agung-wijaya-nitya",
      },
    ],
  },

  contact: {
    sectionId: "kontak",
    eyebrow: "Konsultasi Pengadaan",
    title: "Siap memenuhi kebutuhan pengadaan Anda.",
    subtitle:
      "Hubungi kami untuk penawaran harga resmi, surat penawaran teknis, atau konfirmasi ketersediaan etalase e-Katalog. Cantumkan daftar kebutuhan (BoQ) agar kami dapat menyiapkan penawaran dengan tepat.",
    directEmailLabel: "Kirim detail BoQ via Email",
    catalogProfileLabel: "Lihat profil INAPROC",
  },

  footer: {
    tagline: "Mitra Pengadaan Perangkat TI & Solusi Terdaftar INAPROC",
    description:
      "Berbasis di Kabupaten Badung, Bali — melayani pengadaan instansi pemerintah dan organisasi dengan dokumen penawaran yang transparan dan dapat diverifikasi.",
    columns: [
      {
        title: "Navigasi",
        links: [
          { label: "Beranda", href: "/" },
          { label: "Lini Produk", href: "/#lini-utama" },
          { label: "Katalog INAPROC", href: "/katalog" },
          { label: "Layanan Pemeliharaan", href: "/#pemeliharaan" },
          { label: "Alur Pengadaan", href: "/#ekosistem" },
        ],
      },
      {
        title: "Kredensial & Portal",
        links: [
          {
            label: "Profil INAPROC LKPP",
            href: "https://katalog.inaproc.id/agung-wijaya-nitya",
            external: true,
          },
          { label: "Katalog Elektronik", href: "/katalog" },
          { label: "Permintaan Penawaran", href: "/#kontak" },
        ],
      },
    ],
  },

  headline: {
    badge: "Penyedia Aktif INAPROC Katalog Elektronik",
    title: "Pengadaan Perangkat TI & Solusi",
    titleAccent: "untuk Instansi",
    subtitle:
      "Mitra pengadaan komputasi, infrastruktur TI, dan etalase katalog elektronik untuk instansi pemerintah serta organisasi.",
    ctaPrimary: {
      label: "Lihat Katalog",
      href: "/katalog",
    },
  },

  pillars: [
    {
      id: "it-hardware",
      order: 1,
      title: "Perangkat TI",
      subtitle: "Komputasi & Pemrosesan Data",
      description: "Penyediaan komputer kerja, stasiun pemrosesan data, dan periferal operasional instansi.",
      badge: "Infrastruktur",
      isHeadline: true,
      is3dFocus: true,
      capabilities: [
        "Komputer Kerja & Mini PC Instansi",
        "Perangkat Keras Jaringan & Elektronik Kantor",
        "Peralatan Penunjang Fasilitas",
      ],
    },
    {
      id: "services-rental",
      order: 2,
      title: "Servis & Pemeliharaan",
      subtitle: "Keandalan & Kontinuitas Operasional",
      description: "Layanan perbaikan teknis dan pemeliharaan komponen berkala.",
      badge: "Layanan Teknis",
      is3dFocus: false,
      capabilities: [
        "Pemeliharaan Komponen Perangkat TI",
        "Pemeriksaan & Diagnosa Fisik",
      ],
    },
  ],

  spotlights: [
    {
      id: "server-rack",
      tag: "Rack Server",
      title: "Infrastruktur Server & Komputasi Rak",
      headline: "Tenaga komputasi terstruktur untuk fasilitas instansi.",
      description:
        "Solusi server rack dan unit penyimpanan data yang dapat disesuaikan dengan kebutuhan tata kelola sistem informasi.",
      target: "Ruang server instansi, pusat data lokal",
      image: "/images/card-server-storage.jpg",
      imageAlt: "Ilustrasi unit server rack",
    },
  ],

  kbliCategories: [
    {
      name: "Perdagangan Komputer & Elektronik",
      scope: "Penyediaan unit komputer, periferal, perlengkapan pemrosesan data, dan suku cadang.",
    },
    {
      name: "Reparasi & Pemeliharaan",
      scope: "Jasa perbaikan dan pemeliharaan peralatan komputasi dan komunikasi.",
    },
  ],
};
