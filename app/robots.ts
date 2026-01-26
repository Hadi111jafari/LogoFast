/**
 * Robots.txt Configuration
 *
 * Tells search engines which pages to crawl.
 *
 * Rules:
 * - Allow all pages (userAgent: "*", allow: "/")
 * - Point to sitemap for efficient crawling
 *
 * Learn more: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */

import { MetadataRoute } from "next";
import { config } from "@/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${config.siteUrl}/sitemap.xml`,
  };
}
