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
