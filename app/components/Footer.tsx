import { navLinks, modules, contactLabel, footerMeta, footerTagline } from "@/app/lib/content";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./motion/Reveal";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-border/25 bg-onyx-canvas px-4 pt-16 pb-10 md:px-6">
      <Reveal as="div" variant="up" distance={26} duration={1} start="top 92%" className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-12 gap-x-3 gap-y-12">
          {/* brand */}
          <div className="col-span-12 md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-trust-blue" />
              <span className="font-display text-sm font-semibold tracking-[0.25em] text-ivory-text uppercase">
                Agung Nitya
              </span>
            </div>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-ash-text">
              {footerTagline}
            </p>
            <a
              href="#kontak"
              data-cta-contact
              className="link-underline mt-6 inline-block py-2 font-display text-[clamp(1rem,2.6vw,1.4rem)] tracking-tight text-ivory-text"
            >
              {contactLabel}
            </a>
          </div>

          {/* nav */}
          <div className="col-span-6 md:col-span-2">
            <h3 className="text-[10px] tracking-[0.3em] text-ash-text/70 uppercase">
              Navigasi
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="inline-flex min-h-[36px] items-center text-[13px] text-ash-text transition-colors hover:text-ivory-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-healthcare-blue"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* modules */}
          <div className="col-span-6 md:col-span-5">
            <h3 className="text-[10px] tracking-[0.3em] text-ash-text/70 uppercase">
              Modul
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {modules.map((m) => (
                <li key={m.id}>
                  <a
                    href="#modul"
                    className="group inline-flex min-h-[36px] items-center gap-1.5 text-[13px] text-ash-text transition-colors hover:text-ivory-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-healthcare-blue"
                  >
                    {m.short}
                    <ArrowUpRight className="h-3 w-3 text-ash-text/40 transition-colors group-hover:text-trust-blue" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-slate-border/20 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[11px] tracking-wide text-ash-text/70">{footerMeta}</p>
          <p className="max-w-lg text-[10px] leading-relaxed tracking-wide text-ash-text/50">
            Deskripsi modul di halaman ini bersifat umum. Cakupan, jadwal, dan
            spesifikasi layanan ditentukan dalam perjanjian dengan setiap
            fasilitas kesehatan.
          </p>
        </div>
    </Reveal>
    </footer>
  );
}
