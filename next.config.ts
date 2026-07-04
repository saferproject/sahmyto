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
  output: "standalone",
  devIndicators: { position: "top-right" },
  reactCompiler: true,
  allowedDevOrigins: ["192.168.100.12"],
  images: {
    remotePatterns: imageRemotePatterns(),
    // Dev backend runs on a LAN/private IP; Next 16 blocks optimizing remote
    // images that resolve to a private IP (SSRF guard). Allow it in dev only —
    // the production image host is public, so the guard stays on there.
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
