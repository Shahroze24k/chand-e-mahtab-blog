import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // For Node.js hosting
  images: {
    unoptimized: true // For static hosting
  },
  serverExternalPackages: ['prisma'],
  // Ensure dynamic routes work properly
  generateBuildId: async () => {
    return 'build-' + Date.now()
  }
};

export default nextConfig;
