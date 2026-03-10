import type { NextConfig } from "next";
import path from "path";

const apiUrl = new URL(process.env.NEXT_PUBLIC_API_URL || '');

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    scrollRestoration: true,
  },
  sassOptions: {
    loadPaths: [path.resolve('./src/shared')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'front-school.minio.ktsdev.ru',
      },
    ],
  },
  
};

export default nextConfig;