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

function cspDirective() {
  const isDev = process.env.NODE_ENV === "development";

  const imgSources = ["'self'", "data:", "blob:"];
  const connectSources = ["'self'"];

  if (isDev) connectSources.push("ws:");

  for (const envUrl of [
    process.env.NEXT_PUBLIC_API_URL,
    process.env.NEXT_PUBLIC_IMAGE_ASSETS_URL,
  ]) {
    if (!envUrl) continue;

    const source = new URL(envUrl);
    const host = `${source.protocol}//${source.host}`;

    if (!imgSources.includes(host)) imgSources.push(host);
    if (!connectSources.includes(host)) connectSources.push(host);
  }

  return [
    "default-src 'self'",
    // Next.js bootstraps via inline scripts; dev additionally needs eval for
    // Fast Refresh. Styles stay inline for Emotion/Tailwind.
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    `img-src ${imgSources.join(" ")}`,
    `connect-src ${connectSources.join(" ")}`,
    "font-src 'self' data:",
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
  ].join("; ");
}

const nextConfig: NextConfig = {
  output: "standalone",
  devIndicators: { position: "top-right" },
  reactCompiler: true,
  allowedDevOrigins: ["192.168.100.120"],
  images: {
    remotePatterns: imageRemotePatterns(),
    // Dev backend runs on a LAN/private IP; Next 16 blocks optimizing remote
    // images that resolve to a private IP (SSRF guard). Allow it in dev only —
    // the production image host is public, so the guard stays on there.
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "Content-Security-Policy", value: cspDirective() }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: false,
      },
      {
        source: "/dashboard",
        destination: "/dashboard/karbooms",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
