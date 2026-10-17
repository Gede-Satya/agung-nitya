"use client";

import React, { useState, useMemo, useId, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  X,
  ExternalLink,
  CheckCircle2,
  Building2,
  MapPin,
  RefreshCw,
  Layers,
  ArrowUpDown,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Filter,
  ShieldCheck,
  Tag,
  Boxes,
} from "lucide-react";
import {
  ALL_INAPROC_PRODUCTS,
  POPULAR_CATEGORIES,
  InaprocProduct,
} from "@/src/data/inaprocCatalog";

const ITEMS_PER_PAGE_OPTIONS = [12, 24, 48];

export default function CatalogExplorer() {
  const searchInputId = useId();
  const sortSelectId = useId();
  const typeSelectId = useId();
  const perPageSelectId = useId();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [selectedOrigin, setSelectedOrigin] = useState<"all" | "PDN" | "Impor">("all");
  const [selectedType, setSelectedType] = useState<"all" | "Barang" | "Jasa" | "Digital">("all");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "name">("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(24);
  const [isLoading, setIsLoading] = useState(false);

  // Reset to page 1 on filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedOrigin, selectedType, sortBy, itemsPerPage]);

  // Dynamic category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Semua: ALL_INAPROC_PRODUCTS.length };
    for (const p of ALL_INAPROC_PRODUCTS) {
      if (POPULAR_CATEGORIES.includes(p.category)) {
        counts[p.category] = (counts[p.category] || 0) + 1;
      } else {
        counts["Lainnya"] = (counts["Lainnya"] || 0) + 1;
      }
    }
    return counts;
  }, []);

  // Filtered and sorted list
  const filteredProducts = useMemo(() => {
    let result = [...ALL_INAPROC_PRODUCTS];

    // Filter by Category
    if (selectedCategory !== "Semua") {
      if (selectedCategory === "Lainnya") {
        result = result.filter(
          (p) =>
            !POPULAR_CATEGORIES.filter((c) => c !== "Semua" && c !== "Lainnya").includes(p.category)
        );
      } else {
        result = result.filter((p) => p.category === selectedCategory);
      }
    }

    // Filter by Origin
    if (selectedOrigin !== "all") {
      result = result.filter((p) => p.origin === selectedOrigin);
    }

    // Filter by Type
    if (selectedType !== "all") {
      result = result.filter((p) => p.type === selectedType);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [searchQuery, selectedCategory, selectedOrigin, selectedType, sortBy]);

  // Pagination calculation
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, startIndex, itemsPerPage]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("Semua");
    setSelectedOrigin("all");
    setSelectedType("all");
    setSortBy("default");
    setCurrentPage(1);
  };

  const handleSimulateRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    // Smooth scroll to top of product list
    const el = document.getElementById("catalog-results");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Generate pagination buttons with ellipsis
  const paginationRange = useMemo(() => {
    const range: (number | string)[] = [];
    const delta = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      } else if (range[range.length - 1] !== "...") {
        range.push("...");
      }
    }
    return range;
  }, [currentPage, totalPages]);

  return (
    <div className="w-full flex flex-col gap-8 sm:gap-10">
      {/* Official INAPROC Store Sync Status Header */}
      <div className="w-full rounded-card bg-canvas border border-rule p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-control bg-accent/10 flex items-center justify-center shrink-0 text-accent">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-ink">
                Etalase Resmi INAPROC LKPP — PT Agung Wijaya Nitya
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-pill text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" />
                Snapshot 742 Produk (Per {ALL_INAPROC_PRODUCTS.length > 0 ? "17 Oktober 2026" : "Katalog"})
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-pill text-xs font-medium bg-wash text-accent border border-rule">
                <ShieldCheck className="w-3 h-3" />
                Penyedia UMKK Aktif
              </span>
            </div>
            <p className="text-xs text-muted max-w-2xl">
              Memuat data snapshot 742 barang, jasa pemeliharaan, dan sistem informasi dari etalase penyedia LKPP. Seluruh harga dan spesifikasi resmi dapat dikonfirmasi langsung di tautan INAPROC terkait.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 self-stretch md:self-auto justify-end">
          <button
            onClick={handleSimulateRefresh}
            aria-label="Refresh data katalog"
            className="p-2.5 rounded-control border border-rule hover:bg-wash text-muted transition-colors"
            title="Muat ulang data"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-accent" : ""}`} />
          </button>
          <a
            href="https://katalog.inaproc.id/agung-wijaya-nitya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-control text-xs font-semibold bg-accent text-on-accent hover:bg-accent-hover transition-all shadow-2xs group"
          >
            <span>Buka di INAPROC</span>
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Search & Filter Control Bar */}
      <div className="w-full flex flex-col gap-4">
        {/* Top Filter Row: Search Input + Sort + Origin + Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="sm:col-span-2 lg:col-span-5 relative">
            <label htmlFor={searchInputId} className="sr-only">
              Cari nama produk, brand, atau kategori
            </label>
            <div className="relative flex items-center w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                id={searchInputId}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari dari 742 produk (cth: Sony, Epson, SIMDINKES, Soundcard)..."
                className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-white border border-black/10 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-accent/20 focus:border-accent text-ink placeholder:text-slate-400 transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 text-slate-400 hover:text-ink transition-colors p-0.5"
                  aria-label="Hapus kata kunci pencarian"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Type Filter */}
          <div className="lg:col-span-2">
            <label htmlFor={typeSelectId} className="sr-only">
              Filter Tipe
            </label>
            <div className="relative">
              <select
                id={typeSelectId}
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as any)}
                className="w-full py-2.5 pl-3 pr-8 text-xs bg-white border border-black/10 rounded-xl appearance-none focus:outline-hidden focus:ring-2 focus:ring-accent/20 focus:border-accent text-ink transition-all shadow-2xs"
              >
                <option value="all">Semua Tipe</option>
                <option value="Barang">Tipe: Barang</option>
                <option value="Jasa">Tipe: Jasa Layanan</option>
                <option value="Digital">Tipe: Digital / Software</option>
              </select>
              <Boxes className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Origin Filter */}
          <div className="lg:col-span-2">
            <div className="flex p-0.5 bg-slate-100 rounded-xl border border-black/5 h-full items-center">
              <button
                onClick={() => setSelectedOrigin("all")}
                className={`flex-1 py-1.5 text-[11px] font-medium rounded-lg transition-all ${
                  selectedOrigin === "all"
                    ? "bg-white text-ink shadow-2xs font-semibold"
                    : "text-slate-500 hover:text-ink"
                }`}
              >
                Semua Asal
              </button>
              <button
                onClick={() => setSelectedOrigin("PDN")}
                className={`flex-1 py-1.5 text-[11px] font-medium rounded-lg transition-all ${
                  selectedOrigin === "PDN"
                    ? "bg-white text-emerald-700 shadow-2xs font-semibold"
                    : "text-slate-500 hover:text-ink"
                }`}
              >
                PDN
              </button>
              <button
                onClick={() => setSelectedOrigin("Impor")}
                className={`flex-1 py-1.5 text-[11px] font-medium rounded-lg transition-all ${
                  selectedOrigin === "Impor"
                    ? "bg-white text-blue-700 shadow-2xs font-semibold"
                    : "text-slate-500 hover:text-ink"
                }`}
              >
                Impor
              </button>
            </div>
          </div>

          {/* Sorting */}
          <div className="lg:col-span-3">
            <label htmlFor={sortSelectId} className="sr-only">
              Urutkan berdasarkan
            </label>
            <div className="relative">
              <select
                id={sortSelectId}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full py-2.5 pl-3 pr-8 text-xs bg-white border border-black/10 rounded-xl appearance-none focus:outline-hidden focus:ring-2 focus:ring-accent/20 focus:border-accent text-ink transition-all shadow-2xs"
              >
                <option value="default">Urutkan: Default INAPROC</option>
                <option value="price-asc">Harga: Terendah → Tertinggi</option>
                <option value="price-desc">Harga: Tertinggi → Terendah</option>
                <option value="name">Nama: A → Z</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Category Filter Pills with Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {POPULAR_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = categoryCounts[cat] || 0;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-ink text-white shadow-2xs"
                    : "bg-white text-slate-600 border border-black/8 hover:bg-slate-50 hover:text-ink"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header Info & Active Filters Count */}
      <div id="catalog-results" className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-black/6">
        <div className="flex items-center gap-2">
          <span className="font-medium text-ink">
            Menampilkan {totalItems === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + itemsPerPage, totalItems)} dari {totalItems} produk
          </span>
          {(searchQuery || selectedCategory !== "Semua" || selectedOrigin !== "all" || selectedType !== "all" || sortBy !== "default") && (
            <button
              onClick={handleResetFilters}
              className="text-accent hover:underline font-semibold flex items-center gap-1 ml-2"
            >
              <X className="w-3 h-3" />
              Reset filter
            </button>
          )}
        </div>

        {/* Items Per Page Selector */}
        <div className="flex items-center gap-2">
          <label htmlFor={perPageSelectId} className="text-slate-400 hidden sm:inline">
            Tampilkan:
          </label>
          <select
            id={perPageSelectId}
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="py-1 px-2 text-xs bg-white border border-black/10 rounded-lg text-ink focus:outline-hidden focus:border-accent"
          >
            {ITEMS_PER_PAGE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt} per halaman
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading Skeleton State */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white border border-black/8 p-4 flex flex-col gap-3 animate-pulse"
            >
              <div className="w-full aspect-square rounded-xl bg-slate-100" />
              <div className="h-4 bg-slate-100 rounded-md w-3/4" />
              <div className="h-3 bg-slate-100 rounded-md w-1/2" />
              <div className="h-6 bg-slate-100 rounded-md w-2/3 mt-2" />
              <div className="h-9 bg-slate-100 rounded-xl w-full mt-auto" />
            </div>
          ))}
        </div>
      ) : paginatedProducts.length > 0 ? (
        /* Product Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {paginatedProducts.map((product) => {
            return (
              <div
                key={product.id}
                className="group rounded-2xl bg-white border border-black/8 hover:border-black/15 p-4 flex flex-col justify-between transition-all duration-200 hover:shadow-md relative"
              >
                {/* Top Section: Media & Badges */}
                <div className="flex flex-col gap-3">
                  {/* Image Container */}
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#F5F5F7] border border-black/5 flex items-center justify-center">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <ShoppingBag className="w-12 h-12 text-slate-300" />
                    )}

                    {/* Floating Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/90 backdrop-blur-xs text-ink shadow-2xs border border-black/5">
                        {product.type}
                      </span>
                      {product.tkdn && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-600 text-white shadow-2xs">
                          TKDN {product.tkdn}%
                        </span>
                      )}
                    </div>

                    <div className="absolute top-2 right-2">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-semibold shadow-2xs ${
                          product.origin === "PDN"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}
                      >
                        {product.origin}
                      </span>
                    </div>
                  </div>

                  {/* Category & Brand */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 gap-2">
                    <span className="truncate font-medium text-accent">
                      {product.category}
                    </span>
                    {product.brand && (
                      <span className="truncate max-w-[110px] text-slate-500 font-normal">
                        {product.brand}
                      </span>
                    )}
                  </div>

                  {/* Product Title */}
                  <h3
                    className="text-sm font-semibold text-ink line-clamp-2 leading-snug group-hover:text-accent transition-colors"
                    title={product.name}
                  >
                    {product.name}
                  </h3>

                  {/* Metadata: Location & Scale */}
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      {product.location}
                    </span>
                    <span>•</span>
                    <span className="shrink-0">{product.scale}</span>
                  </div>
                </div>

                {/* Bottom Section: Price & CTA */}
                <div className="flex flex-col gap-3 pt-3 mt-3 border-t border-black/5">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                      Harga Termasuk Pajak (PPN)
                    </span>
                    <span className="text-base font-bold text-ink">
                      {product.priceFormatted}
                    </span>
                  </div>

                  {/* INAPROC Direct Button */}
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-[#F5F5F7] text-ink hover:bg-accent hover:text-white transition-all group/btn"
                  >
                    <span>Lihat di INAPROC</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-white transition-colors" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="w-full rounded-2xl bg-white border border-black/8 p-12 text-center flex flex-col items-center justify-center gap-4 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
            <Search className="w-8 h-8" />
          </div>
          <div className="flex flex-col gap-1 max-w-md">
            <h3 className="text-base font-semibold text-ink">
              Produk tidak ditemukan
            </h3>
            <p className="text-xs text-slate-500">
              Tidak ada produk yang cocok dengan kata kunci &ldquo;{searchQuery}&rdquo; atau filter yang dipilih. Silakan coba kata kunci lain atau reset filter.
            </p>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-accent text-white hover:bg-accent-strong transition-all shadow-2xs"
            >
              Reset Semua Filter
            </button>
            <a
              href="https://katalog.inaproc.id/agung-wijaya-nitya"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-ink hover:bg-slate-200 transition-colors"
            >
              <span>Buka Etalase INAPROC</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-black/8">
          <span className="text-xs text-slate-500 order-2 sm:order-1">
            Halaman {currentPage} dari {totalPages} ({totalItems} total produk)
          </span>

          <nav
            aria-label="Navigasi halaman katalog"
            className="flex items-center gap-1 order-1 sm:order-2"
          >
            {/* Previous Page */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Halaman sebelumnya"
              className="p-2 rounded-lg border border-black/8 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none text-ink transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Page Number Buttons */}
            {paginationRange.map((page, index) => {
              if (page === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-2 py-1 text-xs text-slate-400 select-none"
                  >
                    ...
                  </span>
                );
              }

              const isCurrent = page === currentPage;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(Number(page))}
                  aria-current={isCurrent ? "page" : undefined}
                  className={`min-w-8 h-8 px-2 rounded-lg text-xs font-semibold transition-all ${
                    isCurrent
                      ? "bg-accent text-white shadow-2xs"
                      : "bg-white border border-black/8 text-slate-600 hover:bg-slate-50 hover:text-ink"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {/* Next Page */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Halaman berikutnya"
              className="p-2 rounded-lg border border-black/8 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none text-ink transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
