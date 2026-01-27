import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },

  // Transpile the shared package
  transpilePackages: ['@atc-radar-sim/shared'],

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.INTERNAL_API_URL || 'http://localhost:5001'}/:path*`, // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
