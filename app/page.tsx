import Navbar from "@/components/layout/Navbar";
import ScrollStory from "@/components/layout/ScrollStory";
import VerificationSection from "@/components/sections/VerificationSection";
import SupportingPillarsSection from "@/components/sections/SupportingPillarsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";

/**
 * Landing Page PT Agung Wijaya Nitya
 * - FASE 1 & 2: 3D deconstruction & scroll story (Pilar 1 & 2)
 * - FASE 3: Section verifikasi legalitas/INAPROC, pilar pendukung statis (Pilar 3 & 4), form kontak server action, dan footer
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-canvas text-ink relative selection:bg-accent/15 selection:text-ink">
      <Navbar />
      <ScrollStory />
      <VerificationSection />
      <SupportingPillarsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
