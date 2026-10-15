import Navbar from "@/components/layout/Navbar";
import HeroShowcase from "@/components/sections/HeroShowcase";
import LiniPengadaanSection from "@/components/sections/LiniPengadaanSection";
import EkosistemPengadaanSection from "@/components/sections/EkosistemPengadaanSection";
import UnitSiapPengadaanSection from "@/components/sections/UnitSiapPengadaanSection";
import CtaPengadaanSection from "@/components/sections/CtaPengadaanSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#1d1d1f] relative selection:bg-[#0071e3]/20 selection:text-[#1d1d1f]">
      {/* Dual-Tier Apple Header */}
      <Navbar />

      {/* Hero Stage: Hardware Lineup & Floating Capsule */}
      <HeroShowcase />

      {/* Lini Pengadaan Utama: 3 High-Impact Cards */}
      <LiniPengadaanSection />

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
