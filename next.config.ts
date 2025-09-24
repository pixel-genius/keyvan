import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  images: {
    // Disable Next.js image optimization to avoid upstream 400 on `?url=` param
    // unoptimized: true,
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
  // async headers() {
  //   return [
  //     {
  //       source: "/manifest.json",
  //       headers: [
  //         {
  //           key: "Content-Type",
  //           value: "application/manifest+json",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
