import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from any hostname (news article thumbnails if added later)
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
