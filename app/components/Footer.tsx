import { navLinks, modules, contactLabel, footerMeta, footerTagline } from "@/app/lib/content";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./motion/Reveal";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-border/25 bg-onyx-canvas px-6 pt-20 pb-12 md:px-10">
      <Reveal as="div" variant="up" distance={26} duration={1} start="top 92%" className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          {/* brand */}
          <div className="col-span-12 md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-trust-blue" />
              <span className="font-display text-sm font-semibold tracking-[0.25em] text-ivory-text uppercase">
                Agung Nitya
              </span>
            </div>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-ash-text">
              {footerTagline}
            </p>
            <a
              href="#kontak"
              data-cta-contact
              className="link-underline mt-7 inline-block py-2 font-display text-[clamp(1rem,2.6vw,1.4rem)] tracking-tight text-ivory-text"
            >
              {contactLabel}
            </a>
          </div>

          {/* nav */}
          <div className="col-span-6 md:col-span-2">
            <h3 className="t-eyebrow text-ash-text/70">Navigasi</h3>
            <ul className="mt-5 space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="inline-flex min-h-[40px] items-center text-[15px] text-ash-text transition-colors hover:text-ivory-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-healthcare-blue"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* modules */}
          <div className="col-span-6 md:col-span-5">
            <h3 className="t-eyebrow text-ash-text/70">Modul</h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2">
              {modules.map((m) => (
                <li key={m.id}>
                  <a
                    href="#modul"
                    className="group inline-flex min-h-[40px] items-center gap-1.5 text-[15px] text-ash-text transition-colors hover:text-ivory-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-healthcare-blue"
                  >
                    {m.short}
                    <ArrowUpRight className="h-3.5 w-3.5 text-ash-text/40 transition-colors group-hover:text-trust-blue" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-slate-border/20 pt-7 md:flex-row md:items-center md:justify-between">
          <p className="text-[13px] text-ash-text/70">{footerMeta}</p>
          <p className="max-w-lg text-[13px] leading-relaxed text-ash-text/50">
            Deskripsi modul di halaman ini bersifat umum. Cakupan, jadwal, dan
            spesifikasi layanan ditentukan dalam perjanjian dengan setiap
            fasilitas kesehatan.
          </p>
        </div>
    </Reveal>
    </footer>
  );
}
