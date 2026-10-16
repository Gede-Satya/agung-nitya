import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

const title =
  "PT Agung Wijaya Nitya - Solusi Sistem Informasi & Perangkat TI untuk Instansi";
const description =
  "Mitra pengadaan solusi sistem informasi, implementasi sistem terpadu, dan perangkat teknologi informasi untuk instansi pemerintah. Terdaftar aktif di INAPROC Katalog Elektronik.";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "PT Agung Wijaya Nitya",
  keywords: [
    "PT Agung Wijaya Nitya",
    "INAPROC Katalog Elektronik",
    "pengadaan solusi sistem informasi",
    "perangkat TI instansi",
    "pembuatan sistem kustom",
    "implementasi sistem TI",
    "reverse-engineering sistem",
    "SIMDINKES",
    "pengadaan pemerintah Badung Bali",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    locale: "id_ID",
    siteName: "PT Agung Wijaya Nitya",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${fontVariables}`}>
      <body className="bg-canvas text-primary antialiased selection:bg-accent/30 selection:text-primary">
        <a href="#konten-utama" className="skip-link">
          Lewati ke konten utama
        </a>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}