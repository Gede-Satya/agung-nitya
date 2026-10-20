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
    whatsapp: "+62 812-3900-1288",
    web: "agungwijayanitya.com",
    katalogUrl: "https://katalog.inaproc.id/agung-wijaya-nitya",
    footerCopy: "© PT. Agung Wijaya Nitya. Unlocking Innovation, Empowering Possibilities.",
  },

  hero: {
    eyebrow: "PT. AGUNG WIJAYA NITYA — KABUPATEN BADUNG, BALI",
    h1: "Mitra pengadaan perangkat IT dan kebutuhan institusi.",
    sub: "Perangkat keras, perangkat lunak, peralatan, dan layanan purnajual untuk instansi pemerintah dan swasta. Hadir di INAPROC, PaDi UMKM, LPSE, dan platform pengadaan lainnya.",
  },

  pilar: {
    eyebrow: "CH. 01 — EMPAT PILAR",
    h2: "Empat pilar, satu mitra.",
    items: [
      {
        title: "Software & IT Services",
        description: "Layanan dan solusi perangkat lunak untuk operasional institusi.",
      },
      {
        title: "Computers & Electronics",
        description: "Perdagangan, perawatan, dan perbaikan perangkat komputer dan elektronik.",
      },
      {
        title: "Equipment & Supplies",
        description: "Peralatan dan perlengkapan institusi, dari penyimpanan hingga perlengkapan kantor.",
      },
      {
        title: "Service & Support",
        description: "Pemeliharaan, penyewaan peralatan, dan dukungan purnajual.",
      },
    ] as Pillar[],
  },

  produk: {
    eyebrow: "CH. 02 — PRODUK & LAYANAN",
    h2: "Dari perangkat keras sampai layanan, dalam satu rangkaian.",
    beats: [
      {
        label: "HARDWARE",
        title: "Dimulai dari perangkat keras yang tepat",
        text: "UPS, monitor, server rack, rak dan lemari penyimpanan, hingga perlengkapan institusi lainnya.",
      },
      {
        label: "SOFTWARE",
        title: "Dihidupkan oleh perangkat lunak dan layanan IT",
        text: "Dukungan sistem operasional dan integrasi solusi yang sesuai kebutuhan institusi.",
      },
      {
        label: "SERVICE",
        title: "Dijaga oleh layanan pemeliharaan hardware",
        text: "Pemeliharaan preventif dan korektif supaya perangkat kerja tetap andal beroperasi.",
      },
    ],
    note: "Ratusan produk dan layanan sudah terdaftar di katalog INAPROC.",
  },

  caraPengadaan: {
    eyebrow: "CH. 03 — CARA PENGADAAN",
    h2: "Pengadaan yang sederhana dan transparan.",
    steps: [
      {
        num: "01",
        title: "Pilih",
        desc: "Telusuri produk kami di katalog INAPROC atau PaDi UMKM, atau hubungi kami untuk kebutuhan khusus.",
      },
      {
        num: "02",
        title: "Minta penawaran",
        desc: "Sampaikan kebutuhan dan spesifikasi teknis, kami kirimkan penawaran resmi.",
      },
      {
        num: "03",
        title: "Pesan",
        desc: "Lakukan pemesanan langsung melalui platform pengadaan resmi yang Anda gunakan.",
      },
      {
        num: "04",
        title: "Terima dan dukung",
        desc: "Pengiriman unit, serah terima Berita Acara (BAST), dan dukungan purnajual berkesinambungan.",
      },
    ] as StepItem[],
  },

  faq: {
    eyebrow: "CH. 04 — PERTANYAAN UMUM",
    h2: "Pertanyaan yang sering diajukan.",
    items: [
      {
        q: "Di platform apa PT. Agung Wijaya Nitya terdaftar?",
        a: "INAPROC, PaDi UMKM, LPSE, dan platform pengadaan lainnya.",
      },
      {
        q: "Produk apa saja yang tersedia?",
        a: "Perangkat IT (misalnya UPS, monitor, server rack), peralatan penyimpanan dan perlengkapan institusi, serta layanan pemeliharaan hardware.",
      },
      {
        q: "Apakah tersedia layanan pemeliharaan?",
        a: "Ya, layanan pemeliharaan hardware tersedia dan tercantum di katalog kami.",
      },
      {
        q: "Bagaimana jika kebutuhan saya tidak ada di katalog?",
        a: "Hubungi kami dan sampaikan kebutuhan Anda, kami bantu carikan solusinya.",
      },
      {
        q: "Di mana lokasi perusahaan?",
        a: "Kabupaten Badung, Bali.",
      },
    ] as FaqItem[],
  },

  footer: {
    h2: "Butuh pengadaan perangkat IT atau perlengkapan institusi?",
    cta: "Minta Penawaran",
    address: "Kabupaten Badung, Bali",
    email: "info@agungwijayanitya.com",
    whatsapp: "+62 812-3900-1288",
    web: "agungwijayanitya.com",
    katalogUrl: "https://katalog.inaproc.id/agung-wijaya-nitya",
    tagline: "© PT. Agung Wijaya Nitya. Unlocking Innovation, Empowering Possibilities.",
  },
};
