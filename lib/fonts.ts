import { Geist, Geist_Mono, Newsreader } from "next/font/google";

export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-editorial",
  display: "swap",
});

export const fontVariables = `${geist.variable} ${geistMono.variable} ${newsreader.variable}`;
