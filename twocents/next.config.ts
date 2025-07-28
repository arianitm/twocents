import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // ✅ disables default loader
  },
  // /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // ✅ Skip ESLint on build
  },
};

module.exports = nextConfig;

export default nextConfig;
