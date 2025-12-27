import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Static export for Electron
  images: {
    unoptimized: true, // Required for static export
  },
  // Ensure trailing slashes for file protocol to work correctly with relative paths
  trailingSlash: true,
};

export default nextConfig;
