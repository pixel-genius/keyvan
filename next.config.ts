import type { NextConfig } from "next";
import nextPwa from "next-pwa";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://tanbaku.com",
        port: "3000",
        pathname: "/**",
      },
    ],
    unoptimized: true, // This can help with some image loading issues
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: true,
            titleProp: true,
            ref: true,
          },
        },
      ],
    });
    return config;
  },
};

const withPWA = nextPwa({
  dest: "public", // where service-worker.js will be generated
  disable: process.env.NODE_ENV === "development", // disable in dev
  register: true,
});

export default withPWA(nextConfig);
