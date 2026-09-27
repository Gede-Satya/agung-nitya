import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/* DESIGN.md §3 — display / headline face (pengganti Söhne Breit). */
const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "Agung Nitya — SIMRS untuk Rumah Sakit & Klinik",
  description:
    "Agung Nitya membangun SIMRS yang menyatukan setiap unit rumah sakit ke dalam satu basis data — pendaftaran, rawat inap, farmasi, laboratorium, rekam medis, hingga billing dan klaim BPJS.",
  keywords: [
    "Agung Nitya",
    "SIMRS",
    "Sistem Informasi Manajemen Rumah Sakit",
    "rekam medis elektronik",
    "RME",
    "hospital information system",
    "sistem rumah sakit",
  ],
  openGraph: {
    title: "Agung Nitya — SIMRS untuk Rumah Sakit & Klinik",
    description:
      "Satu basis data untuk seluruh unit rumah sakit Anda. Rekam medis, farmasi, dan billing akhirnya bicara satu bahasa.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${grotesk.variable} bg-deep-canvas`}>
      <body className="bg-deep-canvas text-primary-text antialiased">
        {children}
      </body>
    </html>
  );
}