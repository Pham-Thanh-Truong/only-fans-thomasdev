import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep default Next.js build behavior
  compress: true,
  poweredByHeader: false,
  // Optimize images
  images: {
    domains: [],
    unoptimized: true, // Disable optimization for Netlify compatibility
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Netlify specific optimizations
  trailingSlash: false,
};

export default nextConfig;
