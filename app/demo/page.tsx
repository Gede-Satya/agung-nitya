import WorksWheelDemo from "@/components/ui/demo";

export const metadata = {
  title: "9 Modul SIMRS — 3D Works Wheel | Agung Nitya",
  description: "Interactive 3D Wheel exploration of 9 SIMRS modules on pure white background",
};

export default function DemoPage() {
  return (
    <main className="min-h-screen w-full bg-white text-ink">
      <WorksWheelDemo />
    </main>
  );
}
