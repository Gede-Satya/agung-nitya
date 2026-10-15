/**
 * PT Agung Wijaya Nitya — Data & Content Repository
 * Single Source of Truth for site copy, verified facts, and pillar weightings.
 * (DESIGN.md §1, §2, §3)
 */

export interface PillarItem {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  badge?: string;
  isHeadline?: boolean;
  is3dFocus?: boolean;
  capabilities: string[];
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
    /**
     * Jumlah produk tayang di INAPROC Katalog Elektronik per 15 Oktober 2026.
     * CATATAN: Verifikasi ulang sebelum rilis resmi ke produksi.
     */
    activeProductsCount: number;
    activeProductsDate: string;
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
  pillars: PillarItem[];
  softwareHighlight: {
    title: string;
    subtitle: string;
    officialCatalogProduct: {
      name: string;
      category: string;
      description: string;
      note: string;
    };
    services: {
      name: string;
      description: string;
    }[];
  };
  kbliCategories: {
    codeSnippet?: string;
    name: string;
    scope: string;
  }[];
}

export const SITE_CONTENT: SiteContent = {
  company: {
    name: "PT Agung Wijaya Nitya",
    legalType: "Perseroan Terbatas",
    location: "Kab. Badung, Bali",
    email: "info@agungwijayanitya.com",
    // Nomor di situs lama tidak lengkap; gunakan placeholder TODO sampai data resmi diverifikasi
    phonePlaceholder: "TODO: Konfirmasi kontak telepon resmi",
    inaprocUrl: "https://katalog.inaproc.id/agung-wijaya-nitya",
    inaprocProviderType: "UMKK",
    inaprocStatus: "Penyedia Aktif",
    // 742 produk tayang per 15 Okt 2026 — verifikasi ulang sebelum rilis
    activeProductsCount: 742,
    activeProductsDate: "15 Oktober 2026",
  },

  headline: {
    badge: "Penyedia Aktif INAPROC Katalog Elektronik",
    title: "Mitra Pengadaan Solusi Sistem Informasi &",
    titleAccent: "Perangkat TI untuk Instansi",
    subtitle:
      "Mendukung Pejabat Pembuat Komitmen (PPK) dan instansi pemerintah dengan penyediaan perangkat lunak kustom, infrastruktur komputasi, dan pemenuhan katalog elektronik yang kredibel.",
    ctaPrimary: {
      label: "Lihat Profil di INAPROC",
      href: "https://katalog.inaproc.id/agung-wijaya-nitya",
    },
  },

  /**
   * Empat Pilar Pengadaan (urutan bobot dapat diubah di sini tanpa merombak komponen visual).
   */
  pillars: [
    {
      id: "software-services",
      order: 1,
      title: "Software & Jasa TI",
      subtitle: "Solusi Inti & Rekayasa Sistem",
      description:
        "Pengembangan sistem informasi terintegrasi, implementasi infrastruktur aplikasi, serta rekayasa ulang (reverse-engineering) perangkat lunak instansi.",
      badge: "Pilar Utama",
      isHeadline: true,
      is3dFocus: true,
      capabilities: [
        "Pembuatan Sistem Informasi Kustom",
        "Implementasi & Integrasi Sistem",
        "Reverse-Engineering Sistem Terpasang",
        "SIMDINKES Layanan Manajemen & SDM Kesehatan (Tayang di Katalog)",
      ],
    },
    {
      id: "it-hardware",
      order: 2,
      title: "Perangkat TI",
      subtitle: "Komputasi & Pemrosesan Data",
      description:
        "Penyediaan unit komputer kerja, perangkat keras pemrosesan, stasiun pemindai data, dan periferal operasional instansi.",
      badge: "Infrastruktur",
      is3dFocus: true,
      capabilities: [
        "Komputer Kerja & Mini PC Instansi",
        "Perangkat Pemindai Data & Dokumen",
        "Perangkat Keras Jaringan & Elektronik Kantor",
      ],
    },
    {
      id: "equipment-supplies",
      order: 3,
      title: "Peralatan & Perlengkapan",
      subtitle: "Fasilitas & Penunjang Kerja",
      description:
        "Pengadaan rak server, lemari arsip, instrumen pendukung laboratorium, dan perlengkapan fasilitas kesehatan terdaftar.",
      badge: "Katalog Pendukung",
      is3dFocus: false,
      capabilities: [
        "Rak Perangkat & Lemari Penyimpanan",
        "Peralatan Laboratorium Umum",
        "Perlengkapan Fasilitas & Penunjang Kesehatan",
      ],
    },
    {
      id: "services-rental",
      order: 4,
      title: "Servis & Sewa",
      subtitle: "Pemeliharaan & Kontinuitas Operasional",
      description:
        "Layanan perbaikan teknis, pemeliharaan sistem berkala, serta skema sewa perangkat komputasi untuk operasional fleksibel instansi.",
      badge: "Layanan Teknis",
      is3dFocus: false,
      capabilities: [
        "Reparasi & Pemeliharaan Perangkat TI",
        "Penyewaan Komputer & Perangkat Elektronik",
        "Pendampingan Teknis & Konsultasi Pengadaan",
      ],
    },
  ],

  softwareHighlight: {
    title: "Software & Jasa Rekayasa Sistem",
    subtitle:
      "Solusi perangkat lunak berbasis kebutuhan riil instansi pemerintah dan layanan publik.",
    officialCatalogProduct: {
      name: "SIMDINKES Layanan Manajemen dan SDM Kesehatan",
      category: "Perangkat Lunak Terdaftar INAPROC",
      description:
        "Satu produk perangkat lunak resmi yang telah tayang di katalog elektronik untuk tata kelola administrasi dan sumber daya kesehatan.",
      note: "Produk spesifik terdaftar di etalase resmi INAPROC.",
    },
    services: [
      {
        name: "Pembuatan Sistem",
        description:
          "Rancang bangun arsitektur sistem informasi berbasis web dan jaringan lokal sesuai alur kerja birokrasi dan standar keamanan data.",
      },
      {
        name: "Implementasi Sistem",
        description:
          "Proses deployment, migrasi data, konfigurasi server, serta pendampingan teknis bagi operator dan administrator instansi.",
      },
      {
        name: "Reverse-Engineering Sistem",
        description:
          "Analisis dan pemetaan kembali arsitektur sistem lama untuk modernisasi, bridging data, atau peningkatan keandalan infrastruktur.",
      },
    ],
  },

  kbliCategories: [
    {
      name: "Software & Jasa TI",
      scope: "Pengembangan piranti lunak, konsultasi teknologi, dan pemeliharaan sistem terpadu.",
    },
    {
      name: "Perdagangan Komputer & Elektronik",
      scope: "Penyediaan unit komputer, periferal, perlengkapan pemrosesan data, dan suku cadang.",
    },
    {
      name: "Reparasi & Perbaikan",
      scope: "Jasa perbaikan dan pemeliharaan peralatan komputasi dan komunikasi.",
    },
    {
      name: "Perdagangan Besar Perlengkapan Laboratorium & Kedokteran",
      scope: "Distribusi instrumen laboratorium, perlengkapan umum, dan perangkat penunjang.",
    },
    {
      name: "Jasa Sewa Peralatan",
      scope: "Penyewaan mesin kantor, perangkat komputasi, dan peralatan kerja instansi.",
    },
    {
      name: "Konsultasi & Jasa Penunjang",
      scope: "Layanan konsultansi manajemen TI dan jasa pendukung operasional.",
    },
  ],
};
