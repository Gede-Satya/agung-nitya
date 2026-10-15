import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";

/**
 * FASE 1: HANYA satu frame hero untuk persetujuan.
 * - Perangkat 3D generik (sleek mini-PC pipih bersudut membulat)
 * - Headline posisi baru pengadaan
 * - Satu tombol aksi: Lihat Profil di INAPROC
 * - Belum ada scroll motion
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-canvas text-primary relative flex flex-col justify-between">
      <Navbar />
      <HeroSection />
    </main>
  );
}
