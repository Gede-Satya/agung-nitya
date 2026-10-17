import { Inter } from "next/font/google";

/**
 * Single source of truth for typography (DESIGN.md §6).
 * Family: Inter with weights 400 (body), 500 (labels/buttons), and 600 (headings).
 * Fallback: system sans-serif stack.
 */
export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const fontVariables = inter.variable;
