"use client";

import {
  ShieldCheck,
  Store,
  FileCheck2,
  BadgeCheck,
  ArrowUpRight,
  Building2,
} from "lucide-react";

export default function EkosistemPengadaanSection() {
  const verifiedSummary = [
    { label: "Platform", value: "INAPROC E-Katalog LKPP" },
    { label: "Kualifikasi", value: "UMKK Aktif" },
    { label: "Domisili", value: "Badung, Bali" },
    { label: "Dukungan Pajak", value: "Faktur Pajak & BAST Lengkap" },
  ];

  const pillars = [
    {
      icon: Store,
      title: "Etalase Resmi INAPROC",
      desc: "Katalog elektronik resmi LKPP yang dapat diverifikasi langsung oleh instansi.",
    },
    {
      icon: FileCheck2,
      title: "Kepatuhan Administrasi & Pajak",
      desc: "Didukung legalitas lengkap, faktur pajak resmi, kwitansi, serta BAST standar audit.",
    },
    {
      icon: BadgeCheck,
      title: "Jaminan Unit & Purna Jual",
      desc: "Unit teruji ketat dengan garansi resmi dan pendampingan teknis responsif.",
    },
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Konsultasi & Penelaahan BoQ",
      desc: "Penyelarasan daftar kebutuhan barang dan spesifikasi teknis anggaran instansi.",
    },
    {
      step: "02",
      title: "Pilihan Jalur Transaksi",
      desc: "Dukungan transaksi melalui e-Purchasing Katalog LKPP atau Purchase Order langsung.",
    },
    {
      step: "03",
      title: "Pemeriksaan Pra-Kirim",
      desc: "Verifikasi kelengkapan fisik dan uji fungsi unit sebelum dikirim ke lokasi.",
    },
    {
      step: "04",
      title: "Serah Terima & Administrasi",
      desc: "Penyerahan barang disertai BAST, faktur pajak, dan dokumen penagihan lengkap.",
    },
    {
      step: "05",
      title: "Pendampingan Operasional",
      desc: "Penjelasan teknis penggunaan unit dan akses jalur pemeliharaan berkala.",
    },
  ];

  return (
    <section
      id="ekosistem"
      aria-label="Tentang Kami dan Ekosistem Pengadaan Resmi"
      className="w-full bg-[#FFFFFF] scroll-mt-16 sm:scroll-mt-20 border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20 lg:py-24">
        {/* =========================================================
            BAGIAN 1: Hero Split 2 Kolom (Headline + Kartu Verifikasi)
            ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:items-center">
          {/* Kolom Kiri: Headline & Deskripsi */}
          <div className="lg:col-span-7">
            {/* A5: Eyebrow proporsional */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-50/90 border border-[#C8A227]/40 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#C8A227]" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#C8A227]">
                EKOSISTEM PENGADAAN RESMI
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] leading-tight tracking-tight">
              Transparan dari BoQ hingga Berita Acara.
            </h2>

            <p className="mt-5 text-base sm:text-lg text-[#475569] leading-relaxed">
              PT Agung Wijaya Nitya terdaftar sebagai penyedia aktif pada platform
              INAPROC Katalog Elektronik dengan kualifikasi usaha UMKK di Kabupaten
              Badung, Bali.
            </p>

            <p className="mt-3 text-base sm:text-lg text-[#475569] leading-relaxed">
              Melayani mekanisme purchase order korporat dan pengadaan instansi
              dengan dokumen penawaran dan administrasi yang dapat diverifikasi
              langsung di profil resmi INAPROC kami.
            </p>
          </div>

          {/* Kolom Kanan: Verified Vendor Summary Card */}
          <div className="lg:col-span-5">
            {/* A2: Shadow halus & border resmi yang tegas */}
            <div className="bg-[#F8FAFC] border border-slate-300 rounded-2xl p-6 sm:p-7 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
              {/* Header Kartu */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-[#C8A227]/40 flex items-center justify-center text-[#C8A227] shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-[#0F172A]">
                      Status Verifikasi Penyedia
                    </h3>
                    <p className="text-xs text-[#475569]">
                      Profil Kredensial Pengadaan
                    </p>
                  </div>
                </div>

                {/* A1: Badge Terverifikasi kontras tinggi (WCAG AA) */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-emerald-100 text-emerald-900 border-2 border-emerald-400 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  Terverifikasi
                </span>
              </div>

              {/* Daftar Key-Value dengan pemisah yang lebih terlihat */}
              <dl className="divide-y divide-slate-300/80 my-5">
                {verifiedSummary.map((item) => (
                  <div
                    key={item.label}
                    className="py-3 flex items-center justify-between text-sm first:pt-0 last:pb-0"
                  >
                    <dt className="text-slate-600 font-medium">{item.label}</dt>
                    <dd className="text-[#0F172A] font-semibold text-right">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* A4: Tombol Aksi Utama (Navy) */}
              <a
                href="https://katalog.inaproc.id/agung-wijaya-nitya"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B192C] text-white px-5 py-3.5 text-sm font-semibold transition-all duration-200 hover:bg-[#162a45] shadow-sm hover:shadow-md active:scale-[0.99] group"
              >
                <span>Cek profil INAPROC kami</span>
                <ArrowUpRight className="w-4 h-4 text-[#C8A227] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* A6: Keseimbangan kolom — micro-bar info verifikasi */}
            <div className="mt-3.5 flex items-center justify-center gap-2 px-3 text-xs text-slate-500 font-medium text-center">
              <Building2 className="w-3.5 h-3.5 text-[#C8A227] shrink-0" />
              <span>Data terafiliasi resmi dengan LPSE &amp; Katalog Elektronik LKPP</span>
            </div>
          </div>
        </div>

        {/* =========================================================
            BAGIAN 2: 3 Pilar Kredibilitas (A3)
            ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-14 pt-12 border-t border-slate-200">
          {pillars.map((pilar) => {
            const Icon = pilar.icon;
            return (
              <div key={pilar.title} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0B192C] text-[#C8A227] flex items-center justify-center shrink-0 shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-[#0F172A] mb-1.5">
                    {pilar.title}
                  </h3>
                  {/* A3: Ringkas maks ~12 kata & warna text-slate-700 */}
                  <p className="text-sm leading-relaxed text-slate-700">
                    {pilar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* =========================================================
            BAGIAN 3: 5 Langkah Alur Pengadaan (B1-B7)
            ========================================================= */}
        <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-3xl p-8 lg:p-10">
          {/* Sub-judul stepper */}
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8A227] block mb-1">
              ALUR TRANSAKSI & PENYERAHAN PEKERJAAN
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
              Tahapan Terstruktur Sesuai Regulasi Pengadaan
            </h3>
          </div>

          {/* B7: Tampilan Desktop (>= 1024px) Horizontal Stepper */}
          <div className="hidden lg:grid lg:grid-cols-5 lg:gap-6 relative">
            {/* B3: Garis penghubung tepat dari pusat lingkaran 1 ke 5 (tanpa menggantung) */}
            <div
              aria-hidden="true"
              className="absolute top-5 left-[10%] right-[10%] h-[2px] bg-slate-300/80 z-0"
            />

            {workflowSteps.map((step, idx) => {
              const isFirst = idx === 0;
              return (
                <div
                  key={step.step}
                  className="relative z-10 flex flex-col items-start bg-transparent"
                >
                  {/* B2: Lingkaran nomor - 01 full emas, 02-05 border emas latar putih */}
                  <div
                    className={`w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center mb-4 shadow-xs shrink-0 z-10 ${
                      isFirst
                        ? "bg-[#C8A227] text-[#0B192C]"
                        : "bg-white border-2 border-[#C8A227] text-[#9A7B1C]"
                    }`}
                  >
                    {step.step}
                  </div>

                  {/* B1: Judul seragam dengan min-height agar deskripsi sejajar */}
                  <h4 className="font-heading text-sm font-bold text-[#0F172A] mb-1.5 leading-snug min-h-[2.5rem]">
                    {step.title}
                  </h4>

                  {/* B6: Warna deskripsi text-slate-700 */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* B7: Tampilan Mobile & Tablet (< 1024px) Vertical Stepper */}
          <div className="flex flex-col lg:hidden">
            {workflowSteps.map((step, idx) => {
              const isFirst = idx === 0;
              const isLast = idx === workflowSteps.length - 1;

              return (
                <div
                  key={step.step}
                  className="relative flex items-start gap-4 pb-7 last:pb-0"
                >
                  {/* B3 & B7: Garis vertikal antar lingkaran */}
                  {!isLast && (
                    <div
                      aria-hidden="true"
                      className="absolute top-10 left-5 -ml-[1px] w-[2px] h-[calc(100%-2rem)] bg-slate-300/80 z-0"
                    />
                  )}

                  {/* B2: Badge nomor lingkaran */}
                  <div
                    className={`w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center shadow-xs shrink-0 z-10 relative ${
                      isFirst
                        ? "bg-[#C8A227] text-[#0B192C]"
                        : "bg-white border-2 border-[#C8A227] text-[#9A7B1C]"
                    }`}
                  >
                    {step.step}
                  </div>

                  {/* Konten langkah */}
                  <div className="flex-1 pt-1.5">
                    <h4 className="font-heading text-sm sm:text-base font-bold text-[#0F172A] mb-1 leading-snug">
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* B4: CTA Penutup di Bawah Stepper */}
          <div className="mt-10 pt-8 border-t border-slate-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-[#0F172A]">
                Siap memulai pengadaan untuk instansi Anda?
              </p>
              <p className="text-xs text-slate-600 mt-0.5">
                Konsultasikan BoQ atau ajukan permintaan penawaran resmi dari tim kami.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <a
                href="#kontak"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#C8A227] px-6 py-2.5 text-sm font-bold text-[#0B192C] transition-colors hover:bg-[#B38F1D] shadow-xs active:scale-[0.98]"
              >
                Mulai Konsultasi BoQ
              </a>
              <a
                href="#kontak"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 active:scale-[0.98]"
              >
                Minta Penawaran
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
