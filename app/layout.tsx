import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

const title = "PT Agung Wijaya Nitya | Vendor Pengadaan Barang & Jasa Instansi";
const description =
  "Penyedia aktif UMKK di INAPROC Katalog Elektronik LKPP yang berbasis di Kabupaten Badung, Bali. Melayani pengadaan perangkat keras TI, peralatan kantor & laboratorium, elektronik rumah tangga, dan jasa pemeliharaan untuk instansi pemerintah maupun swasta.";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "PT Agung Wijaya Nitya",
  keywords: [
    "PT Agung Wijaya Nitya",
    "vendor pengadaan barang dan jasa",
    "INAPROC Katalog Elektronik",
    "katalog LKPP",
    "pengadaan perangkat TI",
    "peralatan kantor instansi",
    "peralatan laboratorium",
    "jasa pemeliharaan perangkat TI",
    "penyedia UMKK Badung Bali",
    "pengadaan pemerintah",
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
  themeColor: "#0B1D36",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${fontVariables}`}>
        <body className="bg-canvas text-ink antialiased selection:bg-accent/30 selection:text-ink">
        <a href="#konten-utama" className="skip-link">
          Lewati ke konten utama
        </a>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}