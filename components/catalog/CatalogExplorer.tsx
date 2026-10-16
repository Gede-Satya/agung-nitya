"use client";

import React, { useState, useMemo, useId } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  X,
  ExternalLink,
  SlidersHorizontal,
  CheckCircle2,
  Building2,
  MapPin,
  RefreshCw,
  Layers,
  ArrowUpDown,
  ShoppingBag,
} from "lucide-react";
import {
  INAPROC_PRODUCTS,
  CATALOG_CATEGORIES,
  InaprocProduct,
} from "@/src/data/inaprocCatalog";

export default function CatalogExplorer() {
  const searchInputId = useId();
  const sortSelectId = useId();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("semua");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "name">("featured");
  const [selectedOrigin, setSelectedOrigin] = useState<"all" | "PDN" | "Import">("all");
  const [isLoading, setIsLoading] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...INAPROC_PRODUCTS];

    // Filter by Category
    if (selectedCategory !== "semua") {
      result = result.filter((p) => p.categorySlug === selectedCategory);
    }

    // Filter by Origin (PDN vs Import)
    if (selectedOrigin !== "all") {
      result = result.filter((p) => p.origin === selectedOrigin);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.specs.some((s) => s.toLowerCase().includes(q)) ||
          (p.kbkiCode && p.kbkiCode.includes(q))
      );
    }

    // Sort
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.priceRaw - b.priceRaw);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.priceRaw - a.priceRaw);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [searchQuery, selectedCategory, selectedOrigin, sortBy]);

  // Counts per category for pills
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { semua: INAPROC_PRODUCTS.length };
    for (const p of INAPROC_PRODUCTS) {
      counts[p.categorySlug] = (counts[p.categorySlug] || 0) + 1;
    }
    return counts;
  }, []);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("semua");
    setSelectedOrigin("all");
    setSortBy("featured");
  };

  const handleSimulateRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="w-full flex flex-col gap-8 sm:gap-10">
      {/* Official INAPROC Transparency & Sync Notice Banner */}
      <div className="w-full rounded-2xl bg-white border border-black/8 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0 mt-0.5">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                Status Verifikasi Data
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" />
                Data Faktual Terverifikasi
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              Menampilkan kurasi produk dan jasa terverifikasi dengan foto asli, spesifikasi teknis, dan tautan resmi dari etalase toko <strong>PT Agung Wijaya Nitya</strong> di e-Katalog INAPROC LKPP (skala UMKK, Kab. Badung, Bali).
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-black/5">
          <button
            type="button"
            onClick={handleSimulateRefresh}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-700 bg-[#F5F5F7] hover:bg-slate-200 transition-colors cursor-pointer"
            title="Muat ulang data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span>Segarkan</span>
          </button>

          <a
            href="https://katalog.inaproc.id/agung-wijaya-nitya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-accent text-white hover:bg-accent-strong transition-all shadow-xs"
          >
            <span>Buka Toko INAPROC (742 Item)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Control Bar: Search Input, Category Filter, and Sorting */}
      <div className="w-full flex flex-col gap-4">
        {/* Search Input and Sort Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-1">
            <label htmlFor={searchInputId} className="sr-only">
              Cari produk atau jasa di e-Katalog INAPROC
            </label>
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id={searchInputId}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama produk, spesifikasi, atau kata kunci..."
              className="w-full h-11 pl-10 pr-10 rounded-xl bg-white border border-black/10 text-sm text-ink placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-ink transition-colors cursor-pointer"
                aria-label="Hapus kata pencarian"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort & Origin controls */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Origin Pill (All / PDN / Import) */}
            <div className="flex items-center p-1 bg-white border border-black/10 rounded-xl text-xs font-medium text-slate-600 shadow-2xs">
              <button
                type="button"
                onClick={() => setSelectedOrigin("all")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedOrigin === "all"
                    ? "bg-[#F5F5F7] text-ink font-semibold"
                    : "hover:text-ink"
                }`}
              >
                Semua
              </button>
              <button
                type="button"
                onClick={() => setSelectedOrigin("PDN")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedOrigin === "PDN"
                    ? "bg-[#F5F5F7] text-ink font-semibold"
                    : "hover:text-ink"
                }`}
              >
                PDN
              </button>
              <button
                type="button"
                onClick={() => setSelectedOrigin("Import")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedOrigin === "Import"
                    ? "bg-[#F5F5F7] text-ink font-semibold"
                    : "hover:text-ink"
                }`}
              >
                Import
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <label htmlFor={sortSelectId} className="sr-only">
                Urutkan produk berdasarkan
              </label>
              <div className="relative flex items-center">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
                <select
                  id={sortSelectId}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="h-11 pl-8 pr-8 rounded-xl bg-white border border-black/10 text-xs font-medium text-ink focus:outline-none focus:ring-2 focus:ring-accent transition-all shadow-2xs cursor-pointer appearance-none"
                >
                  <option value="featured">Urutkan: Rekomendasi</option>
                  <option value="price-asc">Harga: Terendah</option>
                  <option value="price-desc">Harga: Tertinggi</option>
                  <option value="name">Nama: A - Z</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Category Pills Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATALOG_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            const count = categoryCounts[cat.slug] || 0;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-ink text-white border-ink shadow-sm"
                    : "bg-white text-slate-600 hover:text-ink hover:bg-slate-50 border-black/8"
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-white/20 text-white" : "bg-[#F5F5F7] text-slate-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Result Count and Active Filter Indicators */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Menampilkan <strong>{filteredProducts.length}</strong> produk dan solusi
          {selectedCategory !== "semua" && ` dalam kategori ${CATALOG_CATEGORIES.find((c) => c.slug === selectedCategory)?.name}`}
          {searchQuery && ` untuk "${searchQuery}"`}
        </span>
        {(searchQuery || selectedCategory !== "semua" || selectedOrigin !== "all") && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-accent hover:underline font-medium cursor-pointer"
          >
            Reset Filter
          </button>
        )}
      </div>

      {/* Product Cards Grid or Empty State */}
      {isLoading ? (
        // Loading Skeleton State
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-black/5 p-5 flex flex-col gap-4 animate-pulse shadow-xs"
            >
              <div className="w-full aspect-4/3 bg-slate-100 rounded-xl" />
              <div className="h-4 bg-slate-100 rounded w-1/3" />
              <div className="h-6 bg-slate-100 rounded w-4/5" />
              <div className="h-4 bg-slate-100 rounded w-full" />
              <div className="h-4 bg-slate-100 rounded w-2/3" />
              <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center">
                <div className="h-6 bg-slate-100 rounded w-1/3" />
                <div className="h-9 bg-slate-100 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        // Empty State
        <div className="w-full rounded-2xl bg-white border border-black/8 p-10 sm:p-14 flex flex-col items-center justify-center text-center gap-4 shadow-xs">
          <div className="w-14 h-14 rounded-full bg-[#F5F5F7] text-slate-400 flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <div className="flex flex-col gap-1 max-w-md">
            <h3 className="font-heading text-lg font-semibold text-ink">
              Produk Tidak Ditemukan
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Tidak ada produk yang cocok dengan pencarian{" "}
              {searchQuery && <strong>&ldquo;{searchQuery}&rdquo;</strong>}
              {selectedCategory !== "semua" && ` pada kategori ${CATALOG_CATEGORIES.find((c) => c.slug === selectedCategory)?.name}`}.
              Anda dapat mereset filter atau memeriksa langsung di etalase resmi INAPROC.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#F5F5F7] text-ink hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Reset Semua Filter
            </button>
            <a
              href="https://katalog.inaproc.id/agung-wijaya-nitya"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-accent text-white hover:bg-accent-strong transition-all shadow-xs"
            >
              <span>Cari di Toko Resmi INAPROC</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      ) : (
        // Product Cards Grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Bottom Information & RFQ Guidance */}
      <div className="w-full rounded-2xl bg-white border border-black/8 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs mt-4">
        <div className="flex flex-col gap-1.5 max-w-2xl">
          <span className="text-xs font-semibold text-accent uppercase tracking-wider">
            Pengadaan Skala Instansi & Pemerintahan
          </span>
          <h3 className="font-heading text-xl font-bold text-ink">
            Membutuhkan SKU Produk Lain yang Tercantum di INAPROC?
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            PT Agung Wijaya Nitya memiliki lebih dari 700 produk terdaftar pada etalase e-Katalog LKPP. Jika instansi Anda memerlukan surat penawaran harga resmi (SPH), verifikasi stok, atau konsultasi paket pengadaan khusus, tim kami siap mendampingi.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0 w-full md:w-auto">
          <Link
            href="/#cta-pengadaan"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-ink text-white hover:bg-black/85 transition-all shadow-xs w-full sm:w-auto"
          >
            Minta Penawaran (RFQ)
          </Link>
          <a
            href="https://katalog.inaproc.id/agung-wijaya-nitya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-[#F5F5F7] text-ink hover:bg-slate-200 transition-colors w-full sm:w-auto"
          >
            <span>Katalog Resmi LKPP</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

// Individual Product Card Component
function ProductCard({ product }: { product: InaprocProduct }) {
  const [showAllSpecs, setShowAllSpecs] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group rounded-2xl bg-white border border-black/8 hover:border-black/15 hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden">
      {/* Product Image Stage */}
      <div className="relative w-full aspect-4/3 bg-[#F8F9FA] overflow-hidden flex items-center justify-center p-4">
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide ${
              product.origin === "PDN"
                ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                : "bg-blue-100 text-blue-800 border border-blue-200"
            }`}
          >
            {product.origin}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-white/90 backdrop-blur-xs text-slate-700 border border-black/5">
            {product.type}
          </span>
          {product.soldCount && (
            <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-100 text-amber-800 border border-amber-200">
              Terjual {product.soldCount}
            </span>
          )}
        </div>

        {/* Location Badge */}
        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-white/85 backdrop-blur-xs px-2 py-0.5 rounded-full border border-black/5">
          <MapPin className="w-3 h-3 text-slate-400" />
          <span>{product.location}</span>
        </div>

        {/* Image Display */}
        {product.imageUrl && !imageError ? (
          <div className="relative w-full h-full">
            <Image
              src={product.imageUrl}
              alt={`Foto produk ${product.name} di e-Katalog INAPROC`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain transition-transform duration-500 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400 gap-1.5">
            <ShoppingBag className="w-8 h-8 stroke-1" />
            <span className="text-xs">Foto resmi di INAPROC</span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col gap-3">
        {/* Category & KBKI */}
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-accent uppercase tracking-wider">
            {product.category}
          </span>
          {product.kbkiCode && (
            <span className="font-mono text-[11px] text-slate-400">
              KBKI: {product.kbkiCode}
            </span>
          )}
        </div>

        {/* Product Title */}
        <h3 className="font-heading text-base font-semibold text-ink leading-snug line-clamp-2 min-h-[2.75rem]">
          {product.name}
        </h3>

        {/* Price Tag */}
        <div className="flex flex-col">
          <span className="text-lg font-bold text-ink tracking-tight">
            {product.priceFormatted}
          </span>
          <span className="text-[11px] text-slate-500 font-medium">
            {product.priceNote}
          </span>
        </div>

        {/* Factual Summary */}
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
          {product.summary}
        </p>

        {/* Specifications Preview */}
        <div className="pt-2 border-t border-black/5 flex flex-col gap-1.5 text-xs">
          <span className="font-semibold text-slate-700 text-[11px] uppercase tracking-wider">
            Spesifikasi Utama:
          </span>
          <ul className="flex flex-col gap-1 text-slate-600">
            {(showAllSpecs ? product.specs : product.specs.slice(0, 3)).map((spec, idx) => (
              <li key={idx} className="flex items-start gap-1.5 leading-snug">
                <span className="w-1 h-1 rounded-full bg-accent mt-1.5 shrink-0" />
                <span className="line-clamp-1">{spec}</span>
              </li>
            ))}
          </ul>
          {product.specs.length > 3 && (
            <button
              type="button"
              onClick={() => setShowAllSpecs(!showAllSpecs)}
              className="text-[11px] text-accent hover:underline font-medium text-left mt-0.5 cursor-pointer"
            >
              {showAllSpecs ? "Tampilkan lebih sedikit" : `+${product.specs.length - 3} spesifikasi lainnya`}
            </button>
          )}
        </div>

        {/* Action Button: Direct link to official INAPROC product page */}
        <div className="mt-auto pt-4 border-t border-black/5">
          <a
            href={product.inaprocUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#F5F5F7] text-ink hover:bg-accent hover:text-white transition-all duration-200 cursor-pointer shadow-2xs group/btn"
          >
            <span>Lihat di INAPROC</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-white transition-colors" />
          </a>
        </div>
      </div>
    </article>
  );
}
