/**
 * Sitemap Generator
 *
 * Auto-generates sitemap.xml for search engines.
 * Includes all static pages and blog posts.
 *
 * How it works:
 * 1. Lists all static pages (homepage, privacy, etc.)
 * 2. Reads all blog posts from /app/(public)/blog/posts/
 * 3. Combines into single sitemap
 * 4. Auto-updates when you add new blog posts
 *
 * Access at: yoursite.com/sitemap.xml
 *
 * Learn more: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

import { MetadataRoute } from "next";
import { config } from "@/config";
import { getAllPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const routes = [
    {
      url: config.siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${config.siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${config.siteUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${config.siteUrl}/tos`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  // Get all blog posts
  const posts = await getAllPosts();

  // Add blog posts to sitemap
  const blogRoutes = posts.map((post) => ({
    url: `${config.siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...blogRoutes];
}
