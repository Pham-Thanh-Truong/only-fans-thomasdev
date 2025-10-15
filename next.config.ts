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
  // Headers for PDF files
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
