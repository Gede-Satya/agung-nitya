import { Geist } from "next/font/google";

/**
 * Single source of truth for typography (DESIGN.md §6).
 * Family: Geist — a modern grotesk used for both display and body copy.
 * Fallback: system sans-serif stack.
 */
export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const fontVariables = geist.variable;
