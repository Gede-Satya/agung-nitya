import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CatalogExplorer from "@/components/catalog/CatalogExplorer";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site";

export const metadata: Metadata = {
  title: "Katalog Produk & Solusi INAPROC LKPP | PT Agung Wijaya Nitya",
  description:
    "Jelajahi daftar produk perangkat TI, komputasi, dan peralatan PT Agung Wijaya Nitya yang terdaftar di e-Katalog Elektronik INAPROC LKPP.",
};

export default function KatalogPage() {
  const company = SITE_CONTENT.company;

  return (
    <div className="min-h-screen bg-wash text-ink flex flex-col selection:bg-accent/20 selection:text-ink">
      {/* Standard Header */}
      <Navbar />

      {/* Main Content Area */}
      <main id="konten-katalog" className="flex-1 w-full pt-20 sm:pt-24 pb-16 sm:pb-24">
        <div className="shell flex flex-col gap-8 sm:gap-10">
          {/* Breadcrumb & Navigation Back */}
          <div className="flex items-center justify-between text-xs text-muted pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 hover:text-ink transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Beranda</span>
            </Link>
            <span className="text-muted">
              Beranda / <strong className="text-ink font-semibold">Katalog INAPROC</strong>
            </span>
          </div>

          {/* Catalog Header Hero Banner */}
          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-canvas border border-rule w-fit shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span className="text-xs font-semibold text-accent tracking-wide uppercase">
                Etalase Resmi INAPROC LKPP ({company.inaprocProviderType})
              </span>
            </div>

            <h1 className="font-heading type-h2 text-ink">
              Katalog Produk & Solusi Pengadaan
            </h1>

            <p className="type-body text-muted">
              Daftar barang, peralatan, dan perangkat komputasi yang disediakan oleh <strong>{company.name}</strong> pada platform e-Katalog INAPROC LKPP untuk instansi pemerintah dan publik.
            </p>
          </div>

          {/* Interactive Catalog Explorer with Filters, Search, and Factual Cards */}
          <CatalogExplorer />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
