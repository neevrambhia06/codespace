import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Catch unintended usage of legacy React patterns
  reactStrictMode: true,

  // A stray package-lock.json in the parent (M:\FST) directory makes Next.js
  // infer the wrong workspace root. Pin it explicitly to this project.
  turbopack: {
    root: path.join(__dirname),
  },

  // Experimental: enable partial prerendering (PPR) in the future by
  // uncommenting the line below once the feature stabilizes.
  // experimental: { ppr: true },
};

export default nextConfig;
