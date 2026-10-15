import Navbar from "@/components/layout/Navbar";
import ScrollStory from "@/components/layout/ScrollStory";

/**
 * Landing Page PT Agung Wijaya Nitya
 * - FASE 2: Animasi scroll dekonstruksi perangkat 3D (Hero -> Hardware -> Software -> Layanan)
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-canvas text-primary relative">
      <Navbar />
      <ScrollStory />
    </main>
  );
}
