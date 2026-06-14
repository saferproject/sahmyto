import type { NextConfig } from "next";

// Derive next/image remote patterns from the configured backend image host so
// they never drift from the env URLs (previously hardcoded to a stale host).
const imageAssetsUrl = process.env.NEXT_PUBLIC_IMAGE_ASSETS_URL;

function imageRemotePatterns() {
  if (!imageAssetsUrl) return [];

  const url = new URL(imageAssetsUrl);
  const base = {
    protocol: url.protocol.replace(":", "") as "http" | "https",
    hostname: url.hostname,
    ...(url.port ? { port: url.port } : {}),
  };

  return [
    { ...base, pathname: "/assets/images/**" },
    { ...base, pathname: "/storage/images/**" },
  ];
}

const nextConfig: NextConfig = {
  devIndicators: { position: "top-right" },
  reactCompiler: true,
  allowedDevOrigins: ["192.168.0.167"],
  // output: 'export',
  images: {
    remotePatterns: imageRemotePatterns(),
  },
};

export default nextConfig;
