import runtimeCaching from "next-pwa/cache";
import type { NextConfig } from "next";
import withPWA from "next-pwa";

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
    ];
  },
};

const withPWAWrapped = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  fallbacks: {
    document: "/offline.html",
  },
});

export default withPWAWrapped(nextConfig);
