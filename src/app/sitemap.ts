import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/carriers", "/brokers", "/workspaces", "/ike", "/apps", "/pricing", "/go", "/security", "/about", "/privacy", "/terms"].map((p) => ({
    url: `${SITE_URL}${p}`,
    changeFrequency: p === "" || p === "/pricing" ? "weekly" : "monthly",
    priority: p === "" ? 1 : p === "/pricing" ? 0.9 : 0.6,
  }));
}
