import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CatalogExplorer from "@/components/catalog/CatalogExplorer";
import { ArrowLeft, ExternalLink, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Katalog Produk & Solusi INAPROC LKPP | PT Agung Wijaya Nitya",
  description:
    "Jelajahi seluruh daftar produk terverifikasi, spesifikasi teknis, dan jasa pemeliharaan TI PT Agung Wijaya Nitya yang tersedia di e-Katalog Elektronik INAPROC LKPP.",
};

export default function KatalogPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] text-ink flex flex-col selection:bg-accent/20 selection:text-ink">
      {/* Standard Dual-Tier Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main id="konten-katalog" className="flex-1 w-full pt-20 sm:pt-24 pb-16 sm:pb-24">
        <div className="shell flex flex-col gap-8 sm:gap-10">
          {/* Breadcrumb & Navigation Back */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 hover:text-ink transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Beranda</span>
            </Link>
            <span className="text-slate-400">
              Beranda / <strong className="text-ink font-semibold">Katalog INAPROC</strong>
            </span>
          </div>

          {/* Catalog Header Hero Banner */}
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/8 w-fit shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span className="text-xs font-semibold text-accent tracking-wide uppercase">
                e-Katalog Resmi Lembaga Kebijakan Pengadaan (LKPP)
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink leading-tight">
              Katalog Produk & Solusi Pengadaan
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Jelajahi seluruh 742 produk perangkat TI, sistem informasi/software, peralatan, dan jasa pemeliharaan yang disediakan secara resmi oleh <strong>PT Agung Wijaya Nitya</strong> di platform e-Katalog INAPROC LKPP untuk instansi pemerintah dan BUMN.
            </p>
          </div>

          {/* Interactive Catalog Explorer with Filters, Search, and Factual Cards */}
          <CatalogExplorer />
        </div>
      </main>

      {/* Enterprise Footer */}
      <Footer />
    </div>
  );
}
