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
    <section id="kontak" className="relative z-10 w-full py-20 sm:py-28 bg-studio-mist border-t border-hairline-silver">
      <div className="shell flex flex-col gap-12 sm:gap-16">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-4 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-semibold tracking-[-0.12px] text-slate uppercase">
              Komunikasi & Konsultasi
            </span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl lg:text-[40px] font-semibold leading-tight tracking-tight text-ink">
            Hubungi Kami untuk{" "}
            <span className="text-pricing-blue">Kebutuhan Pengadaan Instansi</span>
          </h2>

          <p className="text-slate text-[15px] sm:text-[17px] leading-[1.47] tracking-[-0.374px]">
            Sampaikan kebutuhan sistem informasi, perangkat keras TI, atau verifikasi ketersediaan produk
            katalog kepada tim kami.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Official Contact Information */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-4 p-6 sm:p-9 rounded-[28px] bg-gallery-white border border-hairline-silver">
              <h3 className="font-heading text-lg font-semibold text-ink">
                Informasi Badan Usaha
              </h3>
              <p className="text-xs text-slate leading-relaxed">
                PT Agung Wijaya Nitya adalah mitra pengadaan resmi yang siap memberikan surat penawaran,
                spesifikasi teknis, dan verifikasi etalase katalog elektronik bagi instansi Anda.
              </p>

              <div className="flex flex-col gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-studio-mist text-pricing-blue border border-hairline-silver shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate">Email Resmi</span>
                    <a
                      href={`mailto:${SITE_CONTENT.company.email}`}
                      className="font-heading text-sm font-medium text-ink hover:text-apple-blue transition-colors"
                    >
                      {SITE_CONTENT.company.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-studio-mist text-pricing-blue border border-hairline-silver shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate">Kontak Telepon</span>
                    <span className="font-heading text-sm font-medium text-slate">
                      {SITE_CONTENT.company.phonePlaceholder}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-studio-mist text-pricing-blue border border-hairline-silver shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate">Domisili Hukum</span>
                    <span className="font-heading text-sm font-medium text-ink">
                      {SITE_CONTENT.company.location} ({SITE_CONTENT.company.legalType})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-[20px] bg-gallery-white border border-hairline-silver text-xs text-slate leading-relaxed">
              <strong className="text-ink">Pemberitahuan Audiens:</strong> Kami menghormati alur resmi pengadaan pemerintah.
              Data yang dikirimkan hanya digunakan untuk keperluan tindak lanjut konsultasi teknis pengadaan instansi.
            </div>
          </div>

          {/* Right Column: Native Server Action Form (Oversized 28px white card, shadowless) */}
          <div className="lg:col-span-7 p-6 sm:p-9 rounded-[28px] bg-gallery-white border border-hairline-silver">
            {state?.success ? (
              <div className="flex flex-col items-center text-center gap-4 py-12">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-ink">
                  Pesan Berhasil Terkirim
                </h3>
                <p className="text-sm text-slate max-w-md">
                  Terima kasih atas komunikasi Anda. Tim PT Agung Wijaya Nitya akan menindaklanjuti pesan Anda melalui email resmi dalam waktu singkat.
                </p>
              </div>
            ) : (
              <form action={formAction} className="flex flex-col gap-5">
                {state?.error && (
                  <div className="flex items-center gap-2.5 p-3.5 rounded-[16px] bg-red-50 border border-red-200 text-error text-xs font-medium">
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
                    <label htmlFor="name" className="text-xs font-medium text-ink">
                      Nama Lengkap <span className="text-pricing-blue">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Nama Anda"
                      className="min-h-[44px] rounded-full border border-hairline-silver bg-studio-mist px-4 py-2.5 text-sm text-ink placeholder:text-slate focus:border-pricing-blue focus:bg-gallery-white focus:outline-none transition-colors"
                    />
                    {state?.fieldErrors?.name && (
                      <span className="text-[11px] text-error font-medium">{state.fieldErrors.name}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-medium text-ink">
                      Email Instansi / Resmi <span className="text-pricing-blue">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="nama@instansi.go.id"
                      className="min-h-[44px] rounded-full border border-hairline-silver bg-studio-mist px-4 py-2.5 text-sm text-ink placeholder:text-slate focus:border-pricing-blue focus:bg-gallery-white focus:outline-none transition-colors"
                    />
                    {state?.fieldErrors?.email && (
                      <span className="text-[11px] text-error font-medium">{state.fieldErrors.email}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="agency" className="text-xs font-medium text-ink">
                      Nama Instansi / Dinas <span className="text-pricing-blue">*</span>
                    </label>
                    <input
                      id="agency"
                      name="agency"
                      type="text"
                      required
                      placeholder="Dinas / Lembaga Instansi"
                      className="min-h-[44px] rounded-full border border-hairline-silver bg-studio-mist px-4 py-2.5 text-sm text-ink placeholder:text-slate focus:border-pricing-blue focus:bg-gallery-white focus:outline-none transition-colors"
                    />
                    {state?.fieldErrors?.agency && (
                      <span className="text-[11px] text-error font-medium">{state.fieldErrors.agency}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-xs font-medium text-ink">
                      Nomor Telepon / WhatsApp (Opsional)
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="08xxxxxxxxxx"
                      className="min-h-[44px] rounded-full border border-hairline-silver bg-studio-mist px-4 py-2.5 text-sm text-ink placeholder:text-slate focus:border-pricing-blue focus:bg-gallery-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-medium text-ink">
                    Pesan Kebutuhan Pengadaan <span className="text-pricing-blue">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Jelaskan kebutuhan sistem informasi, perangkat keras, atau katalog produk yang ingin dikonsultasikan..."
                    className="rounded-[20px] border border-hairline-silver bg-studio-mist p-4 text-sm text-ink placeholder:text-slate focus:border-pricing-blue focus:bg-gallery-white focus:outline-none transition-colors"
                  />
                  {state?.fieldErrors?.message && (
                    <span className="text-[11px] text-error font-medium">{state.fieldErrors.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-pricing-blue px-7 py-3 font-heading text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
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
