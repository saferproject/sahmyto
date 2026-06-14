import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  reactCompiler: true,
  allowedDevOrigins: ["192.168.0.167"],
  // output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.0.207",
        port: "8000",
        pathname: "/assets/images/**",
      },
      {
        protocol: "http",
        hostname: "192.168.0.207",
        port: "8000",
        pathname: "/storage/images/*/**",
      },
    ],
  },
};

export default nextConfig;
