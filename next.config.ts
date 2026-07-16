import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'openweathermap.org',
      },
      {
        protocol: 'http',
        hostname: 'openweathermap.org',
      }
    ]
  }
};

export default nextConfig;
