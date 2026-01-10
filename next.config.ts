import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gcollinsandsons.com",
      },
    ],
  },
};

export default nextConfig;
