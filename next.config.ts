import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.tanbaku.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tanbaku.com",
        pathname: "/**",
      },
    ],
    unoptimized: true, // This can help with some image loading issues
  },
  async headers() {
    return [
      {
        source: "/manifest.json",
        headers: [
          {
            key: "Content-Type",
            value: "application/manifest+json",
          },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript",
          },
          {
            key: "Cache-Control",
            value: "no-cache",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
