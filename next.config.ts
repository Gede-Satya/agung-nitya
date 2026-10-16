import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "asset.inaproc.id",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "katalog.inaproc.id",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    // Tree-shake large barrel packages used by the scene and UI.
    optimizePackageImports: ["three", "@react-three/drei", "gsap"],
  },
};

export default nextConfig;
