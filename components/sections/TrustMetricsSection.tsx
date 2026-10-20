"use client";

import { motion } from "framer-motion";
import { ShieldCheck, CheckCircle2, Award, MapPin } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site";
import { EASE_OUT } from "@/components/ui/Reveal";

export default function TrustMetricsSection() {
  const { trustBar } = SITE_CONTENT;

  return (
    <section
      aria-label="Kredensial penyedia"
      className="w-full bg-wash border-b border-rule/60"
    >
      <div className="shell py-6 sm:py-8">
        {/* Trust bar — verified credentials only */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {trustBar.items.map((item, i) => {
            const icons = [
              <ShieldCheck key="0" className="h-5 w-5 shrink-0 text-accent-ink" aria-hidden="true" />,
              <CheckCircle2 key="1" className="h-5 w-5 shrink-0 text-accent-ink" aria-hidden="true" />,
              <Award key="2" className="h-5 w-5 shrink-0 text-accent-ink" aria-hidden="true" />,
              <MapPin key="3" className="h-5 w-5 shrink-0 text-accent-ink" aria-hidden="true" />,
            ];
            const icon = icons[i % icons.length];

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EASE_OUT }}
                className="flex items-center gap-2.5 rounded-card border border-rule/70 bg-canvas px-3.5 py-3 shadow-2xs"
              >
                {icon}
                <span className="min-w-0">
                  <span className="block truncate font-heading text-sm font-semibold text-ink">
                    {item.label}
                  </span>
                  <span className="block truncate text-xs text-muted">
                    {item.detail}
                  </span>
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
