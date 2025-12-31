import type { NextConfig } from "next";

const isElectron = process.env.ELECTRON_BUILD === "true";

const nextConfig: NextConfig = {
  output: isElectron ? "export" : undefined, // Static export ONLY for Electron
  images: {
    unoptimized: isElectron, // Required for static export, but optional for Vercel
  },
  // Ensure trailing slashes for file protocol to work correctly with relative paths
  trailingSlash: isElectron,
};

export default nextConfig;
