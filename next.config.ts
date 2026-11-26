import type { NextConfig } from "next";

const cloudflareBuild = process.env.CLOUDFLARE_STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  output: cloudflareBuild ? "export" : undefined,
  images: { unoptimized: cloudflareBuild },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: !cloudflareBuild,
  partialPrefetching: !cloudflareBuild,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
