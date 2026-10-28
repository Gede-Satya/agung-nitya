import Navbar from "@/components/layout/Navbar";
import HeroShowcase from "@/components/sections/HeroShowcase";
import TrustMetricsSection from "@/components/sections/TrustMetricsSection";
import KategoriProdukSection from "@/components/sections/KategoriProdukSection";
import KatalogSection from "@/components/sections/KatalogSection";
import EkosistemPengadaanSection from "@/components/sections/EkosistemPengadaanSection";
import CtaPengadaanSection from "@/components/sections/CtaPengadaanSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="konten-utama" className="w-full bg-[#071324] text-white">
        {/* 1. Hero Sinematik Video */}
        <HeroShowcase />
        {/* 2. Trust Metrics */}
        <TrustMetricsSection />
        {/* 3. Layanan & Bidang Utama */}
        <KategoriProdukSection />
        {/* 4. Baru Katalog LKPP 3D Showcase */}
        <KatalogSection />
        {/* 5. Tentang & Ekosistem Pengadaan */}
        <EkosistemPengadaanSection />
        {/* 6. Kontak & Konsultasi */}
        <CtaPengadaanSection />
      </main>
    </>
  );
}
