import Navbar from "@/components/layout/Navbar";
import HeroShowcase from "@/components/sections/HeroShowcase";
import LiniPengadaanSection from "@/components/sections/LiniPengadaanSection";
import PemeliharaanHardwareSection from "@/components/sections/PemeliharaanHardwareSection";
import EkosistemPengadaanSection from "@/components/sections/EkosistemPengadaanSection";
import UnitSiapPengadaanSection from "@/components/sections/UnitSiapPengadaanSection";
import CtaPengadaanSection from "@/components/sections/CtaPengadaanSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main id="konten-utama" className="min-h-screen bg-canvas text-ink relative selection:bg-accent/20 selection:text-ink">
      {/* Dual-Tier Apple Header */}
      <Navbar />

      {/* Hero Stage: Hardware Lineup & Floating Capsule */}
      <HeroShowcase />

      {/* Lini Pengadaan Utama: 3 High-Impact Cards */}
      <LiniPengadaanSection />

      {/* Scroll-Driven Hardware Maintenance & Exploded View Architecture */}
      <PemeliharaanHardwareSection />

      {/* Ekosistem Pengadaan Resmi & SLA Jaminan Kontrak */}
      <EkosistemPengadaanSection />

      {/* Unit Siap Pengadaan: 4 Product Cards Grid */}
      <UnitSiapPengadaanSection />

      {/* CTA: RFQ Pill & Direct Consultation */}
      <CtaPengadaanSection />

      {/* Enterprise Footer */}
      <Footer />
    </main>
  );
}
