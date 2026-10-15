"use client";

import React, { useActionState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { submitContactAction, ContactFormState } from "@/app/actions/contact";
import { SITE_CONTENT } from "@/src/content/site";

export default function ContactSection() {
  const [state, formAction, isPending] = useActionState<ContactFormState | null, FormData>(
    submitContactAction,
    null
  );

  return (
    <section id="kontak" className="relative z-10 w-full py-20 sm:py-28 bg-canvas border-t border-border">
      <div className="shell flex flex-col gap-12 sm:gap-16">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-graphite px-3 py-1 text-xs text-muted">
            <span className="font-medium text-primary">Komunikasi & Konsultasi</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight text-primary">
            Hubungi Kami untuk{" "}
            <span className="text-accent">Kebutuhan Pengadaan Instansi</span>
          </h2>

          <p className="text-muted text-base sm:text-lg leading-relaxed">
            Sampaikan kebutuhan sistem informasi, perangkat keras TI, atau verifikasi ketersediaan produk
            katalog kepada tim kami.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Official Contact Information */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-3 p-6 rounded-2xl bg-graphite/50 border border-border">
              <h3 className="font-heading text-lg font-semibold text-primary">
                Informasi Badan Usaha
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                PT Agung Wijaya Nitya adalah mitra pengadaan resmi yang siap memberikan surat penawaran,
                spesifikasi teknis, dan verifikasi etalase katalog elektronik bagi instansi Anda.
              </p>

              <div className="flex flex-col gap-4 pt-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted">Email Resmi</span>
                    <a
                      href={`mailto:${SITE_CONTENT.company.email}`}
                      className="font-heading text-sm font-medium text-primary hover:text-accent transition-colors"
                    >
                      {SITE_CONTENT.company.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted">Kontak Telepon</span>
                    <span className="font-heading text-sm font-medium text-muted/80">
                      {SITE_CONTENT.company.phonePlaceholder}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted">Domisili Hukum</span>
                    <span className="font-heading text-sm font-medium text-primary">
                      {SITE_CONTENT.company.location} ({SITE_CONTENT.company.legalType})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface/30 border border-border/50 text-xs text-muted leading-relaxed">
              <strong>Pemberitahuan Audiens:</strong> Kami menghormati alur resmi pengadaan pemerintah.
              Data yang dikirimkan hanya digunakan untuk keperluan tindak lanjut konsultasi teknis pengadaan instansi.
            </div>
          </div>

          {/* Right Column: Native Server Action Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-graphite/60 border border-border shadow-sm">
            {state?.success ? (
              <div className="flex flex-col items-center text-center gap-4 py-12">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-primary">
                  Pesan Berhasil Terkirim
                </h3>
                <p className="text-sm text-muted max-w-md">
                  Terima kasih atas komunikasi Anda. Tim PT Agung Wijaya Nitya akan menindaklanjuti pesan Anda melalui email resmi dalam waktu singkat.
                </p>
              </div>
            ) : (
              <form action={formAction} className="flex flex-col gap-5">
                {state?.error && (
                  <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{state.error}</span>
                  </div>
                )}

                {/* Honeypot field for spam prevention */}
                <input
                  type="text"
                  name="website_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-medium text-primary">
                      Nama Lengkap <span className="text-accent">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Nama Anda"
                      className="min-h-[44px] rounded-xl border border-border bg-surface/60 px-4 py-2.5 text-sm text-primary placeholder:text-muted/60 focus:border-accent focus:outline-none transition-colors"
                    />
                    {state?.fieldErrors?.name && (
                      <span className="text-[11px] text-red-400">{state.fieldErrors.name}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-medium text-primary">
                      Email Instansi / Resmi <span className="text-accent">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="nama@instansi.go.id"
                      className="min-h-[44px] rounded-xl border border-border bg-surface/60 px-4 py-2.5 text-sm text-primary placeholder:text-muted/60 focus:border-accent focus:outline-none transition-colors"
                    />
                    {state?.fieldErrors?.email && (
                      <span className="text-[11px] text-red-400">{state.fieldErrors.email}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="agency" className="text-xs font-medium text-primary">
                      Nama Instansi / Dinas <span className="text-accent">*</span>
                    </label>
                    <input
                      id="agency"
                      name="agency"
                      type="text"
                      required
                      placeholder="Dinas / Lembaga / RSUD"
                      className="min-h-[44px] rounded-xl border border-border bg-surface/60 px-4 py-2.5 text-sm text-primary placeholder:text-muted/60 focus:border-accent focus:outline-none transition-colors"
                    />
                    {state?.fieldErrors?.agency && (
                      <span className="text-[11px] text-red-400">{state.fieldErrors.agency}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-xs font-medium text-primary">
                      Nomor Telepon / WhatsApp (Opsional)
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="08xxxxxxxxxx"
                      className="min-h-[44px] rounded-xl border border-border bg-surface/60 px-4 py-2.5 text-sm text-primary placeholder:text-muted/60 focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-medium text-primary">
                    Pesan Kebutuhan Pengadaan <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Jelaskan kebutuhan sistem informasi, perangkat keras, atau katalog produk yang ingin dikonsultasikan..."
                    className="rounded-xl border border-border bg-surface/60 p-4 text-sm text-primary placeholder:text-muted/60 focus:border-accent focus:outline-none transition-colors"
                  />
                  {state?.fieldErrors?.message && (
                    <span className="text-[11px] text-red-400">{state.fieldErrors.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 font-heading text-sm font-medium text-white shadow-sm transition-all hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                  <span>{isPending ? "Mengirim Pesan..." : "Kirim Pesan"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
