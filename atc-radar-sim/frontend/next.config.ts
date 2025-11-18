import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  
  // Transpile the shared package
  transpilePackages: ['@atc-radar-sim/shared'],
};

export default nextConfig;
