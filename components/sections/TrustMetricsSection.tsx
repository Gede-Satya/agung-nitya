"use client";

import { motion } from "framer-motion";
import { ShieldCheck, CheckCircle2, Award, MapPin } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site";
import { EASE_OUT } from "@/components/ui/Reveal";

export default function TrustMetricsSection() {
  const { trustBar, metrics } = SITE_CONTENT;

  return (
    <section
      aria-label="Kredensial penyedia dan ringkasan data"
      className="w-full bg-wash border-b border-rule/60"
    >
      <div className="shell py-10 sm:py-12">
        {/* Trust bar — verified credentials only */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {trustBar.items.map((item, i) => {
            const icons = [
              <ShieldCheck key="0" className="h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />,
              <CheckCircle2 key="1" className="h-5 w-5 shrink-0 text-sky-600" aria-hidden="true" />,
              <Award key="2" className="h-5 w-5 shrink-0 text-[#c28e2b]" aria-hidden="true" />,
              <MapPin key="3" className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />,
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

        <p className="mt-3 text-center text-xs text-muted">
          {trustBar.footnote}
        </p>

        {/* Key metrics */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: EASE_OUT }}
              className="rounded-card border border-rule/70 bg-canvas p-5"
            >
              <p className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                {metric.value}
              </p>
              <p className="mt-1.5 text-sm text-muted">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
