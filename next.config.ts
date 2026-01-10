import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/gcs",
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
