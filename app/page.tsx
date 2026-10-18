import Navbar from "@/components/layout/Navbar";
import HeroShowcase from "@/components/sections/HeroShowcase";
import TrustMetricsSection from "@/components/sections/TrustMetricsSection";
import KategoriProdukSection from "@/components/sections/KategoriProdukSection";
import KatalogSection from "@/components/sections/KatalogSection";
import PemeliharaanHardwareSection from "@/components/sections/PemeliharaanHardwareSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import EkosistemPengadaanSection from "@/components/sections/EkosistemPengadaanSection";
import CtaPengadaanSection from "@/components/sections/CtaPengadaanSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main id="konten-utama" className="min-h-screen bg-canvas text-ink relative selection:bg-accent/30 selection:text-ink">
      {/* Compact sticky header */}
      <Navbar />

      {/* Hero Stage: navy band with hardware lineup & interface preview */}
      <HeroShowcase />

      {/* Trust bar (verified credentials) + key metrics */}
      <TrustMetricsSection />

      {/* Kategori Produk & Layanan: 4 high-impact cards */}
      <KategoriProdukSection />

      {/* Galeri Interaktif: e-Katalog INAPROC */}
      <KatalogSection />

      {/* Hardware Maintenance & Exploded View */}
      <PemeliharaanHardwareSection />

      {/* Kenapa Memilih Kami */}
      <WhyChooseUsSection />

      {/* Ekosistem Pengadaan Resmi & SLA Jaminan Kontrak */}
      <EkosistemPengadaanSection />

      {/* CTA: dark navy card with gold action */}
      <CtaPengadaanSection />

      {/* Enterprise Footer */}
      <Footer />
    </main>
  );
}
