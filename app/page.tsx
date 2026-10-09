/**
 * Phase 0 placeholder. Sections are built in Phase 3 (see DESIGN.md §8);
 * the 3D scene mounts in Phase 1. Kept as a Server Component so all
 * content is server-rendered and readable without JavaScript.
 */
export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Lewati ke konten utama
      </a>
      <main id="main" className="shell flex min-h-svh flex-col justify-center gap-8 py-24">
        <p className="type-eyebrow text-muted">SIMRS berbasis web</p>
        <h1 className="type-display max-w-[14ch] text-ink">
          Satu sistem untuk seluruh rumah sakit Anda.
        </h1>
        <p className="type-body max-w-[56ch] text-muted">
          Agung Nitya menyatukan pendaftaran, layanan klinis, penunjang, dan
          administrasi dalam satu basis data yang aman.
        </p>
        <div>
          <a
            href="#demo"
            className="inline-flex min-h-11 items-center rounded-full bg-blue px-7 text-sm font-medium text-canvas transition-opacity hover:opacity-90"
          >
            Jadwalkan Demo
          </a>
        </div>
      </main>
    </>
  );
}
