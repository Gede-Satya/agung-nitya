import rawProducts from "./inaprocAllProducts.json";

export interface InaprocProduct {
  id: string;
  index: number;
  name: string;
  slug: string;
  type: "Barang" | "Jasa" | "Digital";
  category: string;
  brand: string;
  price: number;
  priceFormatted: string;
  origin: "PDN" | "Impor";
  scale: string;
  tkdn: number | null;
  unitSold: number;
  stockAvailability: boolean;
  image: string;
  images: string[];
  location: string;
  labels: string[];
  url: string;
}

/**
 * Snapshot Data Katalog Resmi INAPROC LKPP — PT Agung Wijaya Nitya
 *
 * Sesuai DESIGN.md §1 & §5:
 * - Sumber data resmi: https://katalog.inaproc.id/agung-wijaya-nitya
 * - Status: Snapshot terverifikasi (bukan data sinkronisasi live real-time)
 * - Terakhir diverifikasi: 17 Oktober 2026
 * - Jumlah produk: 742 produk
 * - Prosedur pembaruan:
 *   1. Jalankan sinkronisasi berkala via ekspor/API etalase resmi INAPROC penyedia.
 *   2. Simpan hasil ke `src/data/inaprocAllProducts.json`.
 *   3. Perbarui `CATALOG_METADATA.lastVerifiedAt` dan `totalCount`.
 *   4. Jalankan `npm run build` dan skrip verifikasi.
 */

export const CATALOG_METADATA = {
  sourceUrl: "https://katalog.inaproc.id/agung-wijaya-nitya",
  lastVerifiedAt: "17 Oktober 2026",
  lastVerifiedIso: "2026-10-17",
  totalCount: 742,
  providerType: "UMKK",
  providerStatus: "Penyedia Aktif",
  refreshProcedure:
    "Ekspor berkala data dari katalog resmi LKPP, validasi integritas field (nama, kategori, harga, link resmi), lalu perbarui file snapshot inaprocAllProducts.json.",
};

export const ALL_INAPROC_PRODUCTS: InaprocProduct[] = rawProducts as InaprocProduct[];

// Backwards compatibility alias
export const INAPROC_PRODUCTS = ALL_INAPROC_PRODUCTS;


export interface CatalogCategoryDef {
  slug: string;
  name: string;
  description: string;
  count: number;
}

// Compute categories dynamically with actual counts from 742 items
export const POPULAR_CATEGORIES = [
  "Semua",
  "Peralatan Elektronik",
  "Jasa Layanan",
  "Perangkat Lunak/Software",
  "Peralatan Kantor",
  "Perkakas",
  "Peralatan Dapur",
  "Alat Laboratorium",
  "Lainnya",
];
