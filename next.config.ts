import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Product Videos now lives on the combined Product Demo & Videos page.
    return [{ source: "/resources/videos", destination: "/demo#videos", permanent: true }];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-**",
      },
    ],
  },
};

export default nextConfig;
