import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

const title = "PT Agung Wijaya Nitya | Katalog dan Solusi Pengadaan";
const description =
  "Penyedia aktif UMKK pada INAPROC Katalog Elektronik untuk kebutuhan perangkat komputasi, infrastruktur TI, dan perlengkapan instansi pemerintah.";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "PT Agung Wijaya Nitya",
  keywords: [
    "PT Agung Wijaya Nitya",
    "INAPROC Katalog Elektronik",
    "katalog LKPP",
    "pengadaan perangkat TI",
    "perangkat komputasi instansi",
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
      <body className="bg-canvas text-ink antialiased selection:bg-accent/20 selection:text-ink">
        <a href="#konten-utama" className="skip-link">
          Lewati ke konten utama
        </a>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}