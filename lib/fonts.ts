/**
 * Single source of truth for typography families (DESIGN.md §4).
 *
 * To switch to Söhne Breit once licensed:
 *   1. Put the .woff2 files in /app/fonts/
 *   2. Replace `displayFont` below with:
 *        import localFont from "next/font/local";
 *        export const displayFont = localFont({
 *          src: [{ path: "../app/fonts/soehne-breit-buch.woff2", weight: "400" },
 *                { path: "../app/fonts/soehne-breit-kraftig.woff2", weight: "500" }],
 *          variable: "--font-heading",
 *          display: "swap",
 *        });
 *   Nothing else in the codebase needs to change: every heading uses the
 *   `font-display` utility, which resolves to `--font-heading`.
 */
import { Inter } from "next/font/google";

/** Heading family (DESIGN.md §4: Inter weight 600 neutral product-page aesthetic) */
export const displayFont = Inter({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-heading",
  display: "swap",
});

/** Body family (DESIGN.md §4: Inter weight 400/500) */
export const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const fontVariables = `${displayFont.variable} ${bodyFont.variable}`;
