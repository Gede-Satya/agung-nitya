export interface Pillar {
  title: string;
  description: string;
}

export interface StepItem {
  num: string;
  title: string;
  desc: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export const CONTENT = {
  brand: {
    name: "PT. Agung Wijaya Nitya",
    tagline: "Unlocking Innovation, Empowering Possibilities.",
    eyebrow: "PT. AGUNG WIJAYA NITYA — KABUPATEN BADUNG, BALI",
    location: "Kabupaten Badung, Bali",
    email: "info@agungwijayanitya.com",
    web: "agungwijayanitya.com",
    katalogUrl: "https://katalog.inaproc.id/agung-wijaya-nitya",
    footerCopy: "© PT. Agung Wijaya Nitya. Unlocking Innovation, Empowering Possibilities.",
  },

  hero: {
    eyebrow: "PENGADAAN UNTUK INSTITUSI & BISNIS",
    h1: "Pengadaan Perangkat IT dan Perlengkapan Institusi",
    sub: "Dukungan untuk kebutuhan teknologi dan operasional bisnis maupun institusi.",
    ctaPrimary: "Minta Penawaran",
    ctaSecondary: "Jelajahi Produk",
  },

  pilar: {
    eyebrow: "BIDANG UTAMA",
    h2: "Fokus layanan dan pengadaan institusi.",
    sub: "Solusi terpercaya untuk kebutuhan infrastruktur fisik teknologi dan perlengkapan institusi.",
    items: [
      {
        title: "Komputer & Perangkat IT",
        description: "Pengadaan komputer desktop, monitor institusi, dan perangkat keras teknologi kerja.",
      },
      {
        title: "Daya & Rak Server",
        description: "Penyediaan UPS (Uninterruptible Power Supply), server rack, dan infrastruktur fisik ruang server.",
      },
      {
        title: "Perlengkapan Institusi",
        description: "Peralatan penyimpanan, rak arsip berkas, dan perlengkapan penunjang aktivitas institusi.",
      },
      {
        title: "Pemeliharaan Hardware",
        description: "Layanan pemeliharaan teknis perangkat keras untuk memastikan keandalan operasional perangkat.",
      },
    ] as Pillar[],
  },

  produk: {
    eyebrow: "KATALOG & LAYANAN",
    h2: "Produk perangkat keras dan perlengkapan institusi.",
    sub: "Daftar kategori utama yang disediakan untuk kebutuhan pengadaan Anda.",
    beats: [
      {
        label: "01 // IT HARDWARE",
        title: "Perangkat Keras Komputer & Daya",
        text: "UPS (Uninterruptible Power Supply), monitor kerja, server rack, komputer desktop, dan perlengkapan teknologi institusi.",
      },
      {
        label: "02 // INSTITUTIONAL SUPPLIES",
        title: "Perlengkapan & Penyimpanan Institusi",
        text: "Rak penyimpanan berkas/dokumen, lemari arsip kerja, serta peralatan pendukung operasional fasilitas institusi.",
      },
      {
        label: "03 // HARDWARE MAINTENANCE",
        title: "Pemeliharaan & Servis Perangkat Keras",
        text: "Layanan pemeliharaan hardware secara teknis, pemeriksaan fisik berkala, dan penanganan keandalan perangkat kerja.",
      },
    ],
  },

  caraPengadaan: {
    eyebrow: "ALUR KERJA",
    h2: "Pengadaan yang terstruktur dan transparan.",
    sub: "Tahapan konsultasi hingga pengiriman barang yang jelas dan akuntabel.",
    steps: [
      {
        num: "01",
        title: "Konsultasi Kebutuhan",
        desc: "Sampaikan spesifikasi perangkat keras atau perlengkapan institusi yang Anda butuhkan beserta estimasi volume.",
      },
      {
        num: "02",
        title: "Penawaran Resmi",
        desc: "Kami menyusun penawaran harga resmi (quotation) dengan rincian spesifikasi teknis yang transparan.",
      },
      {
        num: "03",
        title: "Pemesanan",
        desc: "Pemesanan diproses melalui mekanisme resmi yang disepakati atau melalui tautan e-Katalog LKPP.",
      },
      {
        num: "04",
        title: "Pengiriman & Pemeriksaan",
        desc: "Pengiriman barang ke lokasi institusi disertai verifikasi fisik unit untuk memastikan kesesuaian pesanan.",
      },
    ] as StepItem[],
  },

  faq: {
    eyebrow: "PERTANYAAN UMUM",
    h2: "Pertanyaan yang sering diajukan.",
    sub: "Keterangan resmi mengenai pengadaan dan layanan PT. Agung Wijaya Nitya.",
    items: [
      {
        q: "Di mana katalog resmi PT. Agung Wijaya Nitya dapat diakses?",
        a: "Katalog resmi dapat diakses melalui e-Katalog INAPROC / LKPP pada tautan katalog.inaproc.id/agung-wijaya-nitya atau menghubungi kami langsung.",
      },
      {
        q: "Produk apa saja yang menjadi fokus PT. Agung Wijaya Nitya?",
        a: "Fokus kami adalah pengadaan perangkat keras IT (UPS, monitor, komputer desktop, server rack), perlengkapan penyimpanan institusi, serta layanan pemeliharaan hardware.",
      },
      {
        q: "Apakah PT. Agung Wijaya Nitya menyediakan software atau aplikasi rumah sakit (SIMRS)?",
        a: "Tidak. PT. Agung Wijaya Nitya tidak menjual atau mengembangkan software SIMRS. Kami berfokus pada pengadaan perangkat keras (hardware), perlengkapan institusi, dan jasa pemeliharaan hardware.",
      },
      {
        q: "Apakah tersedia layanan pemeliharaan hardware?",
        a: "Ya, kami menyediakan layanan pemeliharaan dan perawatan teknis perangkat keras untuk instansi dan perkantoran.",
      },
      {
        q: "Di mana lokasi kantor PT. Agung Wijaya Nitya?",
        a: "Perusahaan berdomisili resmi di Kabupaten Badung, Bali.",
      },
    ] as FaqItem[],
  },

  footer: {
    eyebrow: "KONSULTASI & KEMITRAAN",
    h2: "Butuh pengadaan perangkat IT atau perlengkapan institusi?",
    sub: "Hubungi kami untuk permintaan penawaran harga resmi dan konsultasi spesifikasi teknis pengadaan Anda.",
    location: "Kabupaten Badung, Bali",
    email: "info@agungwijayanitya.com",
    katalogUrl: "https://katalog.inaproc.id/agung-wijaya-nitya",
    tagline: "© PT. Agung Wijaya Nitya. Unlocking Innovation, Empowering Possibilities.",
  },
};
