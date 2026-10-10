import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

const title = "Agung Nitya — SIMRS Terintegrasi untuk Rumah Sakit";
const description =
  "Agung Nitya adalah Sistem Informasi Manajemen Rumah Sakit berbasis web yang menyatukan pendaftaran, rawat jalan, rawat inap, farmasi, laboratorium, radiologi, rekam medis elektronik, billing, dan logistik dalam satu basis data.";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "Agung Nitya",
  keywords: [
    "SIMRS",
    "Sistem Informasi Manajemen Rumah Sakit",
    "rekam medis elektronik",
    "RME",
    "software rumah sakit",
    "Agung Nitya",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    locale: "id_ID",
    siteName: "Agung Nitya",
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
    <html lang="id" className={fontVariables}>
      <body className="bg-canvas text-ink">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}