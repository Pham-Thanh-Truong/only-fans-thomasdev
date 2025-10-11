import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep default Next.js build behavior
  compress: true,
  poweredByHeader: false,
  // Optimize images
  images: {
    domains: [],
  },
};

export default nextConfig;
