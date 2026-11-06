import type { NextConfig } from "next";

// A fully static site: `next build` writes plain HTML/CSS/JS to out/, which any
// static host can serve (Cloudflare Pages, GitHub Pages, Vercel, S3).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  images: { unoptimized: true },
};

export default nextConfig;
