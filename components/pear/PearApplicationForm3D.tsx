"use client";

import React, { useState } from "react";
import { User, Building, Mail, FileText, Send, CheckCircle2 } from "lucide-react";

export default function PearApplicationForm3D() {
  const [formData, setFormData] = useState({
    name: "",
    agency: "",
    email: "",
    requirement: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // Simulate submission / mailto preparation
    setIsSubmitted(true);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Container with subtle 3D perspective */}
      <div className="relative p-6 sm:p-8 rounded-3xl pear-glass-card border border-white/20 shadow-2xl backdrop-blur-xl">
        {/* Glow ambient background behind the card */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-accent/20 via-transparent to-accent/10 blur-xl -z-10 opacity-70" />

        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/40 bg-accent/10 mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold">
              Permohonan Pengadaan Resmi
            </span>
          </div>
          <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-white">
            Mulai Kemitraan Pengadaan
          </h3>
          <p className="font-sans text-xs sm:text-sm text-white/70 mt-1">
            Sampaikan kebutuhan unit atau rencana paket e-Purchasing instansi Anda.
            Tim kami akan merespons dalam waktu 1×24 jam kerja.
          </p>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent flex items-center justify-center text-accent mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-editorial text-xl text-white font-medium mb-1">
              Permohonan Terkirim
            </h4>
            <p className="font-sans text-xs sm:text-sm text-white/75 max-w-xs mb-4">
              Terima kasih, Bapak/Ibu {formData.name}. Rincian pengadaan telah kami
              catat dan akan segera ditindaklanjuti ke email {formData.email}.
            </p>
            <a
              href={`mailto:info@agungwijayanitya.com?subject=Permohonan%20Pengadaan%20-%20${encodeURIComponent(
                formData.agency || "Instansi"
              )}&body=Nama:%20${encodeURIComponent(formData.name)}%0AInstansi:%20${encodeURIComponent(
                formData.agency
              )}%0AKebutuhan:%20${encodeURIComponent(formData.requirement)}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-navy font-semibold text-xs hover:bg-accent-hover transition-colors"
            >
              Buka di Email Klien Instansi →
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Nama Pemohon */}
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-white/40 pointer-events-none">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="Nama & Jabatan"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl pear-glass-pill text-white placeholder-white/40 font-sans text-xs sm:text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                />
              </div>

              {/* Instansi / Dinas */}
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-white/40 pointer-events-none">
                  <Building className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="Instansi / Satuan Kerja"
                  value={formData.agency}
                  onChange={(e) =>
                    setFormData({ ...formData, agency: e.target.value })
                  }
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl pear-glass-pill text-white placeholder-white/40 font-sans text-xs sm:text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                />
              </div>
            </div>

            {/* Email Resmi */}
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-white/40 pointer-events-none">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                required
                placeholder="Email Dinas / Kantor Instansi"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl pear-glass-pill text-white placeholder-white/40 font-sans text-xs sm:text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
            </div>

            {/* Rincian Kebutuhan */}
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-white/40 pointer-events-none">
                <FileText className="w-4 h-4" />
              </span>
              <textarea
                rows={3}
                placeholder="Rincian paket pengadaan, perkiraan kuantitas, atau nomor RUP..."
                value={formData.requirement}
                onChange={(e) =>
                  setFormData({ ...formData, requirement: e.target.value })
                }
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl pear-glass-pill text-white placeholder-white/40 font-sans text-xs sm:text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-accent text-navy font-semibold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-accent-hover hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg shadow-accent/25"
            >
              <Send className="w-4 h-4" />
              Kirim Permohonan Pengadaan
            </button>

            <p className="text-center text-[10px] text-white/40 font-mono tracking-wide">
              KERAHASIAAN DOKUMEN & SPESIFIKASI PENGADAAN DIJAMIN SESUAI REGULASI LKPP
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
