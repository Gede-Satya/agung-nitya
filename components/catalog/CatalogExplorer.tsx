"use client";

import React, {
  useState,
  useMemo,
  useId,
  useCallback,
  useRef,
} from "react";
import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Search,
  X,
  ExternalLink,
  CheckCircle2,
  Building2,
  MapPin,
  RefreshCw,
  ArrowUpDown,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Boxes,
  AlertTriangle,
  SlidersHorizontal,
} from "lucide-react";
import {
  ALL_INAPROC_PRODUCTS,
  POPULAR_CATEGORIES,
  CATALOG_METADATA,
} from "@/src/data/inaprocCatalog";
import { SITE_CONTENT } from "@/src/content/site";
import { Badge } from "@/components/ui/Badge";
import { Drawer } from "@/components/ui/Drawer";

const ITEMS_PER_PAGE_OPTIONS = [12, 24, 48];

export default function CatalogExplorer() {
  const searchInputId = useId();
  const sortSelectId = useId();
  const sortSelectMobileId = useId();
  const typeSelectId = useId();
  const perPageSelectId = useId();

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Read URL query parameters as the single source of truth (DESIGN.md §5)
  const urlQ = searchParams.get("q") ?? "";
  const selectedCategory = searchParams.get("kategori") ?? "Semua";
  const selectedOrigin = (searchParams.get("asal") as "all" | "PDN" | "Impor") ?? "all";
  const selectedType =
    (searchParams.get("tipe") as "all" | "Barang" | "Jasa" | "Digital") ?? "all";
  const sortBy =
    (searchParams.get("sort") as "default" | "price-asc" | "price-desc" | "name" | "name-desc") ??
    "default";
  const currentPage = Math.max(1, Number(searchParams.get("hal")) || 1);

  // Controlled search input with React 19 safe sync
  const [prevUrlQ, setPrevUrlQ] = useState(urlQ);
  const [searchInputValue, setSearchInputValue] = useState(urlQ);
  if (urlQ !== prevUrlQ) {
    setPrevUrlQ(urlQ);
    setSearchInputValue(urlQ);
  }

  const [itemsPerPage, setItemsPerPage] = useState(24);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Helper to update URL query params
  const updateUrl = useCallback(
    (updates: {
      q?: string;
      kategori?: string;
      asal?: string;
      tipe?: string;
      sort?: string;
      hal?: number;
    }) => {
      const params = new URLSearchParams(searchParams.toString());

      const nextQ = updates.q !== undefined ? updates.q : searchInputValue;
      const nextCategory = updates.kategori !== undefined ? updates.kategori : selectedCategory;
      const nextOrigin = updates.asal !== undefined ? updates.asal : selectedOrigin;
      const nextType = updates.tipe !== undefined ? updates.tipe : selectedType;
      const nextSort = updates.sort !== undefined ? updates.sort : sortBy;
      const nextPage = updates.hal !== undefined ? updates.hal : currentPage;

      if (nextQ.trim()) params.set("q", nextQ.trim());
      else params.delete("q");

      if (nextCategory && nextCategory !== "Semua") params.set("kategori", nextCategory);
      else params.delete("kategori");

      if (nextOrigin && nextOrigin !== "all") params.set("asal", nextOrigin);
      else params.delete("asal");

      if (nextType && nextType !== "all") params.set("tipe", nextType);
      else params.delete("tipe");

      if (nextSort && nextSort !== "default") params.set("sort", nextSort);
      else params.delete("sort");

      if (nextPage > 1) params.set("hal", String(nextPage));
      else params.delete("hal");

      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(newUrl, { scroll: false });
    },
    [
      searchParams,
      pathname,
      router,
      searchInputValue,
      selectedCategory,
      selectedOrigin,
      selectedType,
      sortBy,
      currentPage,
    ]
  );

  // Debounced search input sync to URL
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleSearchChange = (value: string) => {
    setSearchInputValue(value);

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      updateUrl({ q: value, hal: 1 });
    }, 350);
  };

  const handleCategorySelect = (category: string) => {
    updateUrl({ kategori: category, hal: 1 });
  };

  const handleOriginSelect = (origin: "all" | "PDN" | "Impor") => {
    updateUrl({ asal: origin, hal: 1 });
  };

  const handleTypeSelect = (type: "all" | "Barang" | "Jasa" | "Digital") => {
    updateUrl({ tipe: type, hal: 1 });
  };

  const handleSortSelect = (sort: "default" | "price-asc" | "price-desc" | "name" | "name-desc") => {
    updateUrl({ sort });
  };

  const handleResetFilters = () => {
    setSearchInputValue("");
    setHasError(false);
    updateUrl({
      q: "",
      kategori: "Semua",
      asal: "all",
      tipe: "all",
      sort: "default",
      hal: 1,
    });
  };

  const handleSimulateRefresh = () => {
    setIsLoading(true);
    setHasError(false);
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };

  // Dynamic category counts across snapshot
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

  // Filtered and sorted products
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
    if (searchInputValue.trim()) {
      const q = searchInputValue.toLowerCase().trim();
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
    } else if (sortBy === "name-desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [searchInputValue, selectedCategory, selectedOrigin, selectedType, sortBy]);

  // Pagination calculation
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, startIndex, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    updateUrl({ hal: page });

    const el = document.getElementById("catalog-results");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Pagination range with ellipsis
  const paginationRange = useMemo(() => {
    const range: (number | string)[] = [];
    const delta = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= safeCurrentPage - delta && i <= safeCurrentPage + delta)
      ) {
        range.push(i);
      } else if (range[range.length - 1] !== "...") {
        range.push("...");
      }
    }
    return range;
  }, [safeCurrentPage, totalPages]);

  // Active filter count for mobile badge
  const activeFilterCount =
    (selectedCategory !== "Semua" ? 1 : 0) +
    (selectedOrigin !== "all" ? 1 : 0) +
    (selectedType !== "all" ? 1 : 0);

  // Check if any filter is active
  const hasActiveFilters = Boolean(
    searchInputValue.trim() ||
      selectedCategory !== "Semua" ||
      selectedOrigin !== "all" ||
      selectedType !== "all" ||
      sortBy !== "default"
  );

  return (
    <div className="w-full flex flex-col gap-6 sm:gap-8">
      {/* =========================================================================
          DATA FRESHNESS & SNAPSHOT STATUS NOTE (DESIGN.md §5)
          Clear provenance, lastVerifiedAt date, and persistent INAPROC link.
         ========================================================================= */}
      <div className="w-full rounded-card bg-canvas border border-rule p-4 sm:p-6 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-control bg-accent/10 flex items-center justify-center shrink-0 text-accent">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-ink">
                Etalase Resmi INAPROC LKPP — {SITE_CONTENT.company.name}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-pill text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Snapshot {CATALOG_METADATA.totalCount} Produk (Per {CATALOG_METADATA.lastVerifiedAt})
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-pill text-xs font-medium bg-wash text-accent border border-rule">
                {CATALOG_METADATA.providerType} • {CATALOG_METADATA.providerStatus}
              </span>
            </div>
            <p className="text-xs text-muted max-w-2xl leading-relaxed">
              Data katalog diverifikasi dari etalase LKPP pada {CATALOG_METADATA.lastVerifiedAt}. Seluruh spesifikasi, ketersediaan, dan harga resmi dapat dikonfirmasi langsung pada tautan resmi INAPROC.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 self-stretch md:self-auto justify-end">
          <button
            onClick={handleSimulateRefresh}
            type="button"
            aria-label="Segarkan data katalog"
            className="p-2.5 min-h-11 min-w-11 flex items-center justify-center rounded-control border border-rule bg-canvas hover:bg-wash text-muted transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
            title="Muat ulang data snapshot"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-accent" : ""}`} />
          </button>
          <a
            href={CATALOG_METADATA.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 px-4 py-2.5 rounded-control text-xs font-semibold bg-accent text-on-accent hover:bg-accent-hover transition-colors shadow-2xs group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <span>Buka di INAPROC</span>
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* =========================================================================
          MOBILE CONTROLS (< 1024px)
          Compact layout: Search + Filter Sheet Button + Sort Select (DESIGN.md §5 & §9)
         ========================================================================= */}
      <div className="flex lg:hidden flex-col gap-3">
        {/* Search Input Mobile */}
        <div className="relative flex items-center w-full">
          <Search className="w-4 h-4 text-muted absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchInputValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Cari produk (cth: Sony, Epson, Server)..."
            aria-label="Cari nama produk, brand, atau kategori"
            className="w-full pl-10 pr-9 min-h-11 text-sm bg-canvas border border-rule rounded-control focus:outline-hidden focus:ring-2 focus:ring-accent/20 focus:border-accent text-ink placeholder:text-muted transition-all shadow-2xs"
          />
          {searchInputValue && (
            <button
              type="button"
              onClick={() => handleSearchChange("")}
              className="absolute right-3 p-1.5 text-muted hover:text-ink transition-colors cursor-pointer"
              aria-label="Hapus kata kunci pencarian"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Mobile Filter Button & Sort */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex-1 min-h-11 px-4 py-2 rounded-control bg-canvas border border-rule hover:bg-wash flex items-center justify-between text-xs font-medium text-ink transition-colors shadow-2xs cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-accent" />
              <span>Filter & Kategori</span>
            </span>
            {activeFilterCount > 0 && (
              <span className="h-5 min-w-5 px-1.5 rounded-pill bg-accent text-on-accent text-[11px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="w-[170px] relative">
            <label htmlFor={sortSelectMobileId} className="sr-only">
              Urutkan berdasarkan
            </label>
            <select
              id={sortSelectMobileId}
              value={sortBy}
              onChange={(e) =>
                handleSortSelect(
                  e.target.value as "default" | "price-asc" | "price-desc" | "name" | "name-desc"
                )
              }
              className="w-full min-h-11 py-2 pl-3 pr-8 text-xs bg-canvas border border-rule rounded-control appearance-none focus:outline-hidden focus:ring-2 focus:ring-accent/20 focus:border-accent text-ink transition-all shadow-2xs cursor-pointer"
            >
              <option value="default">Default</option>
              <option value="name">Nama A → Z</option>
              <option value="name-desc">Nama Z → A</option>
              <option value="price-asc">Harga Terendah</option>
              <option value="price-desc">Harga Tertinggi</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Active Filter Chips on Mobile */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {selectedCategory !== "Semua" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-ink text-on-accent text-xs">
                <span>{selectedCategory}</span>
                <button
                  type="button"
                  onClick={() => handleCategorySelect("Semua")}
                  className="hover:opacity-75 cursor-pointer"
                  aria-label={`Hapus filter kategori ${selectedCategory}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            {selectedOrigin !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-wash border border-rule text-ink text-xs font-medium">
                <span>Asal: {selectedOrigin}</span>
                <button
                  type="button"
                  onClick={() => handleOriginSelect("all")}
                  className="hover:opacity-75 cursor-pointer"
                  aria-label="Hapus filter asal"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            {selectedType !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-wash border border-rule text-ink text-xs font-medium">
                <span>Tipe: {selectedType}</span>
                <button
                  type="button"
                  onClick={() => handleTypeSelect("all")}
                  className="hover:opacity-75 cursor-pointer"
                  aria-label="Hapus filter tipe"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-accent font-semibold hover:underline whitespace-nowrap ml-1 cursor-pointer"
            >
              Reset semua
            </button>
          </div>
        )}
      </div>

      {/* =========================================================================
          DESKTOP SEARCH & FILTER TOOLBAR (>= 1024px) (DESIGN.md §5)
         ========================================================================= */}
      <div className="hidden lg:flex flex-col gap-4">
        <div className="grid grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="col-span-5 relative">
            <label htmlFor={searchInputId} className="sr-only">
              Cari nama produk, brand, atau kategori
            </label>
            <div className="relative flex items-center w-full">
              <Search className="w-4 h-4 text-muted absolute left-3.5 pointer-events-none" />
              <input
                id={searchInputId}
                type="text"
                value={searchInputValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Cari dari 742 produk (cth: Sony, Epson, SIMDINKES, Server)..."
                className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-canvas border border-rule rounded-control focus:outline-hidden focus:ring-2 focus:ring-accent/20 focus:border-accent text-ink placeholder:text-muted transition-all shadow-2xs"
              />
              {searchInputValue && (
                <button
                  type="button"
                  onClick={() => handleSearchChange("")}
                  className="absolute right-3 text-muted hover:text-ink transition-colors p-0.5 cursor-pointer"
                  aria-label="Hapus kata kunci pencarian"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Type Filter */}
          <div className="col-span-2">
            <label htmlFor={typeSelectId} className="sr-only">
              Filter Tipe Produk
            </label>
            <div className="relative">
              <select
                id={typeSelectId}
                value={selectedType}
                onChange={(e) =>
                  handleTypeSelect(e.target.value as "all" | "Barang" | "Jasa" | "Digital")
                }
                className="w-full py-2.5 pl-3 pr-8 text-xs bg-canvas border border-rule rounded-control appearance-none focus:outline-hidden focus:ring-2 focus:ring-accent/20 focus:border-accent text-ink transition-all shadow-2xs cursor-pointer"
              >
                <option value="all">Semua Tipe</option>
                <option value="Barang">Tipe: Barang</option>
                <option value="Jasa">Tipe: Jasa Layanan</option>
                <option value="Digital">Tipe: Digital / Software</option>
              </select>
              <Boxes className="w-3.5 h-3.5 text-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Origin Filter (PDN / Impor) */}
          <div className="col-span-2">
            <div className="flex p-0.5 bg-wash rounded-control border border-rule h-full items-center">
              <button
                type="button"
                onClick={() => handleOriginSelect("all")}
                className={`flex-1 py-1.5 text-xs font-medium rounded-[10px] transition-all cursor-pointer ${
                  selectedOrigin === "all"
                    ? "bg-canvas text-ink shadow-2xs font-semibold"
                    : "text-muted hover:text-ink"
                }`}
              >
                Semua Asal
              </button>
              <button
                type="button"
                onClick={() => handleOriginSelect("PDN")}
                className={`flex-1 py-1.5 text-xs font-medium rounded-[10px] transition-all cursor-pointer ${
                  selectedOrigin === "PDN"
                    ? "bg-canvas text-emerald-800 shadow-2xs font-semibold"
                    : "text-muted hover:text-ink"
                }`}
              >
                PDN
              </button>
              <button
                type="button"
                onClick={() => handleOriginSelect("Impor")}
                className={`flex-1 py-1.5 text-xs font-medium rounded-[10px] transition-all cursor-pointer ${
                  selectedOrigin === "Impor"
                    ? "bg-canvas text-accent shadow-2xs font-semibold"
                    : "text-muted hover:text-ink"
                }`}
              >
                Impor
              </button>
            </div>
          </div>

          {/* Sorting Control */}
          <div className="col-span-3">
            <label htmlFor={sortSelectId} className="sr-only">
              Urutkan berdasarkan
            </label>
            <div className="relative">
              <select
                id={sortSelectId}
                value={sortBy}
                onChange={(e) =>
                  handleSortSelect(
                    e.target.value as "default" | "price-asc" | "price-desc" | "name" | "name-desc"
                  )
                }
                className="w-full py-2.5 pl-3 pr-8 text-xs bg-canvas border border-rule rounded-control appearance-none focus:outline-hidden focus:ring-2 focus:ring-accent/20 focus:border-accent text-ink transition-all shadow-2xs cursor-pointer"
              >
                <option value="default">Urutkan: Default INAPROC</option>
                <option value="name">Nama: A → Z</option>
                <option value="name-desc">Nama: Z → A</option>
                <option value="price-asc">Harga: Terendah → Tertinggi</option>
                <option value="price-desc">Harga: Tertinggi → Terendah</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
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
                type="button"
                onClick={() => handleCategorySelect(cat)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-pill text-xs font-medium whitespace-nowrap transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent ${
                  isSelected
                    ? "bg-ink text-on-accent shadow-2xs font-semibold"
                    : "bg-canvas text-muted border border-rule hover:bg-wash hover:text-ink"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-pill font-semibold ${
                    isSelected
                      ? "bg-white/20 text-on-accent"
                      : "bg-wash text-muted border border-rule"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          RESULTS COUNT & ACTIVE FILTER SUMMARY
         ========================================================================= */}
      <div
        id="catalog-results"
        aria-live="polite"
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted pt-2 border-t border-rule"
      >
        <div className="flex items-center gap-2 flex-wrap">
          {!isLoading && (
            <span className="font-medium text-ink">
              Menampilkan {totalItems === 0 ? 0 : startIndex + 1}–
              {Math.min(startIndex + itemsPerPage, totalItems)} dari {totalItems} produk
            </span>
          )}

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              type="button"
              className="text-accent hover:underline font-semibold flex items-center gap-1 ml-2 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
            >
              <X className="w-3.5 h-3.5" />
              Reset filter
            </button>
          )}
        </div>

        {/* Items Per Page Selector */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <label htmlFor={perPageSelectId} className="text-muted hidden sm:inline">
            Tampilkan:
          </label>
          <select
            id={perPageSelectId}
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="py-1 px-2 text-xs bg-canvas border border-rule rounded-control text-ink focus:outline-hidden focus:border-accent cursor-pointer"
          >
            {ITEMS_PER_PAGE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt} per halaman
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* =========================================================================
          CATALOG STATES: Loading, Error, Empty Source, No Matches, Product Grid
         ========================================================================= */}
      {hasError ? (
        /* Error State (DESIGN.md §5) */
        <div className="w-full rounded-card bg-canvas border border-rule p-12 text-center flex flex-col items-center justify-center gap-4 shadow-xs">
          <div className="w-14 h-14 rounded-full bg-wash flex items-center justify-center text-muted">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div className="flex flex-col gap-1 max-w-md">
            <h3 className="text-base font-semibold text-ink">
              Katalog data tidak dapat dimuat
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              Terjadi kendala saat menyinkronkan data snapshot etalase. Silakan coba kembali atau kunjungi langsung profil penyedia di INAPROC LKPP.
            </p>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleSimulateRefresh}
              type="button"
              className="px-4 py-2.5 rounded-control text-xs font-semibold bg-accent text-on-accent hover:bg-accent-hover transition-colors shadow-2xs cursor-pointer"
            >
              Coba Muat Ulang
            </button>
            <a
              href={CATALOG_METADATA.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-control text-xs font-semibold bg-wash text-ink hover:bg-wash/80 border border-rule transition-colors"
            >
              <span>Profil INAPROC</span>
              <ExternalLink className="w-3.5 h-3.5 text-muted" />
            </a>
          </div>
        </div>
      ) : isLoading ? (
        /* Loading Skeleton */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 animate-pulse" aria-busy="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-96 rounded-card bg-canvas border border-rule p-4 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-3">
                <div className="w-full aspect-square bg-wash rounded-control" />
                <div className="h-4 w-24 bg-wash rounded-sm" />
                <div className="h-5 w-full bg-wash rounded-sm" />
                <div className="h-3 w-32 bg-wash rounded-sm" />
              </div>
              <div className="h-10 w-full bg-wash rounded-control mt-4" />
            </div>
          ))}
        </div>
      ) : ALL_INAPROC_PRODUCTS.length === 0 ? (
        /* Empty Source State (DESIGN.md §5) */
        <div className="w-full rounded-card bg-canvas border border-rule p-12 text-center flex flex-col items-center justify-center gap-4 shadow-xs">
          <div className="w-14 h-14 rounded-full bg-wash flex items-center justify-center text-muted">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <div className="flex flex-col gap-1 max-w-md">
            <h3 className="text-base font-semibold text-ink">
              Belum ada produk yang ditampilkan
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              Saat ini data katalog sedang disinkronkan. Silakan kunjungi profil resmi penyedia di INAPROC LKPP untuk melihat daftar penawaran aktif.
            </p>
          </div>
          <div className="pt-2">
            <a
              href={CATALOG_METADATA.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-control text-xs font-semibold bg-accent text-on-accent hover:bg-accent-hover transition-colors shadow-2xs"
            >
              <span>Buka Profil INAPROC</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      ) : paginatedProducts.length > 0 ? (
        /* Product Grid (DESIGN.md §5) */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {paginatedProducts.map((product) => (
            <article
              key={product.id}
              className="group rounded-card bg-canvas border border-rule hover:border-accent/40 p-4 flex flex-col justify-between transition-all duration-200 hover:shadow-xs relative"
            >
              {/* Top Section: Media & Badges */}
              <div className="flex flex-col gap-3">
                {/* Image Container */}
                <div className="relative w-full aspect-square rounded-control overflow-hidden bg-wash border border-rule/60 flex items-center justify-center">
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
                    <ShoppingBag className="w-12 h-12 text-muted/40" />
                  )}

                  {/* Badges Overlay */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
                    <Badge variant="neutral">
                      {product.type}
                    </Badge>
                    {product.tkdn !== null && (
                      <Badge variant="tkdn">
                        TKDN {product.tkdn}%
                      </Badge>
                    )}
                  </div>

                  <div className="absolute top-2 right-2">
                    <Badge variant={product.origin === "PDN" ? "pdn" : "impor"}>
                      {product.origin}
                    </Badge>
                  </div>
                </div>

                {/* Category & Brand */}
                <div className="flex items-center justify-between text-xs text-muted gap-2">
                  <span className="truncate font-semibold text-accent">
                    {product.category}
                  </span>
                  {product.brand && (
                    <span className="truncate max-w-[120px] text-muted font-normal">
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

                {/* Location & Scale */}
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span className="flex items-center gap-1 truncate">
                    <MapPin className="w-3.5 h-3.5 text-muted shrink-0" />
                    {product.location}
                  </span>
                  <span>•</span>
                  <span className="shrink-0">{product.scale}</span>
                </div>
              </div>

              {/* Bottom Section: Official Price & Persistent INAPROC Link */}
              <div className="flex flex-col gap-3 pt-3 mt-3 border-t border-rule/60">
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-muted font-medium">
                    Harga resmi termasuk PPN
                  </span>
                  <span className="text-base font-bold text-ink">
                    {product.priceFormatted}
                  </span>
                </div>

                <a
                  href={product.url || CATALOG_METADATA.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Buka etalase resmi ${product.name} di INAPROC LKPP (tab baru)`}
                  className="w-full min-h-11 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-control text-xs font-semibold bg-wash text-ink hover:bg-accent hover:text-on-accent transition-all group/btn border border-rule/70 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span>Lihat di INAPROC</span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted group-hover/btn:text-on-accent transition-colors" />
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* No Matches State (DESIGN.md §5) */
        <div className="w-full rounded-card bg-canvas border border-rule p-12 text-center flex flex-col items-center justify-center gap-4 shadow-xs">
          <div className="w-14 h-14 rounded-full bg-wash flex items-center justify-center text-muted">
            <Search className="w-7 h-7" />
          </div>
          <div className="flex flex-col gap-1 max-w-md">
            <h3 className="text-base font-semibold text-ink">
              Produk tidak ditemukan
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              Tidak ada produk yang cocok dengan kriteria pencarian &ldquo;{searchInputValue}&rdquo; atau filter yang dipilih. Silakan reset filter atau kunjungi etalase resmi.
            </p>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleResetFilters}
              type="button"
              className="px-4 py-2.5 min-h-11 rounded-control text-xs font-semibold bg-accent text-on-accent hover:bg-accent-hover transition-colors shadow-2xs cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
            >
              Reset Semua Filter
            </button>
            <a
              href={CATALOG_METADATA.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 px-4 py-2.5 rounded-control text-xs font-semibold bg-wash text-ink hover:bg-wash/80 border border-rule transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span>Buka Etalase INAPROC</span>
              <ExternalLink className="w-3.5 h-3.5 text-muted" />
            </a>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGINATION CONTROLS
         ========================================================================= */}
      {totalPages > 1 && !isLoading && !hasError && paginatedProducts.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-rule">
          <span className="text-xs text-muted order-2 sm:order-1">
            Halaman {safeCurrentPage} dari {totalPages} ({totalItems} total produk)
          </span>

          <nav
            aria-label="Navigasi halaman katalog"
            className="flex items-center gap-1 order-1 sm:order-2"
          >
            {/* Previous Page */}
            <button
              onClick={() => handlePageChange(safeCurrentPage - 1)}
              disabled={safeCurrentPage === 1}
              type="button"
              aria-label="Halaman sebelumnya"
              className="p-2 min-h-11 min-w-11 flex items-center justify-center rounded-control border border-rule bg-canvas hover:bg-wash disabled:opacity-30 disabled:pointer-events-none text-ink transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Page Number Buttons */}
            {paginationRange.map((page, index) => {
              if (page === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-2 py-1 text-xs text-muted select-none"
                  >
                    ...
                  </span>
                );
              }

              const isCurrent = page === safeCurrentPage;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(Number(page))}
                  type="button"
                  aria-current={isCurrent ? "page" : undefined}
                  className={`min-w-10 min-h-10 px-2 rounded-control text-xs font-semibold transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent ${
                    isCurrent
                      ? "bg-accent text-on-accent shadow-2xs font-bold"
                      : "bg-canvas border border-rule text-muted hover:bg-wash hover:text-ink"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {/* Next Page */}
            <button
              onClick={() => handlePageChange(safeCurrentPage + 1)}
              disabled={safeCurrentPage === totalPages}
              type="button"
              aria-label="Halaman berikutnya"
              className="p-2 min-h-11 min-w-11 flex items-center justify-center rounded-control border border-rule bg-canvas hover:bg-wash disabled:opacity-30 disabled:pointer-events-none text-ink transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </nav>
        </div>
      )}

      {/* =========================================================================
          MOBILE FILTER DRAWER (DESIGN.md §5 & §9)
         ========================================================================= */}
      <Drawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        title="Filter & Kategori"
        description="Pilih kategori, tipe pengadaan, dan asal produk"
        footer={
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                handleResetFilters();
                setIsMobileFilterOpen(false);
              }}
              className="flex-1 min-h-11 px-4 py-2 rounded-control border border-rule bg-canvas text-xs font-medium text-ink hover:bg-wash transition-colors cursor-pointer"
            >
              Reset Filter
            </button>
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(false)}
              className="flex-1 min-h-11 px-4 py-2 rounded-control bg-accent text-xs font-semibold text-on-accent hover:bg-accent-hover transition-colors shadow-2xs cursor-pointer"
            >
              Terapkan ({totalItems} Produk)
            </button>
          </div>
        }
      >
        <div className="flex flex-col gap-6">
          {/* Section 1: Kategori */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-semibold text-ink uppercase tracking-wider">
              Kategori Produk
            </span>
            <div className="flex flex-col gap-1.5">
              {POPULAR_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                const count = categoryCounts[cat] || 0;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategorySelect(cat)}
                    className={`flex items-center justify-between p-3 rounded-control text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-accent/10 border border-accent/30 text-accent font-semibold"
                        : "bg-wash border border-rule/50 text-ink hover:bg-canvas"
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-xs text-muted">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Tipe Produk */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-semibold text-ink uppercase tracking-wider">
              Tipe Pengadaan
            </span>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "all", label: "Semua Tipe" },
                { value: "Barang", label: "Barang" },
                { value: "Jasa", label: "Jasa Layanan" },
                { value: "Digital", label: "Digital" },
              ].map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() =>
                    handleTypeSelect(t.value as "all" | "Barang" | "Jasa" | "Digital")
                  }
                  className={`p-2.5 rounded-control text-xs font-medium text-center transition-colors cursor-pointer ${
                    selectedType === t.value
                      ? "bg-accent text-on-accent font-semibold shadow-2xs"
                      : "bg-wash border border-rule text-ink hover:bg-canvas"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Asal Produk */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-semibold text-ink uppercase tracking-wider">
              Asal Produk
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "all", label: "Semua" },
                { value: "PDN", label: "PDN" },
                { value: "Impor", label: "Impor" },
              ].map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => handleOriginSelect(o.value as "all" | "PDN" | "Impor")}
                  className={`p-2.5 rounded-control text-xs font-medium text-center transition-colors cursor-pointer ${
                    selectedOrigin === o.value
                      ? "bg-accent text-on-accent font-semibold shadow-2xs"
                      : "bg-wash border border-rule text-ink hover:bg-canvas"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
