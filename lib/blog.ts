/**
 * Blog Post Utilities
 *
 * Handles reading and parsing MDX blog posts.
 *
 * Blog structure:
 * - Posts stored in /app/(public)/blog/posts/*.mdx
 * - Each post has frontmatter (metadata) and content (MDX)
 * - Posts auto-sorted by date (newest first)
 *
 * Frontmatter format:
 * ```mdx
 * ---
 * title: "Your Post Title"
 * description: "Brief description"
 * date: "2024-01-15"
 * author: "Your Name"
 * authorAvatar: "/avatar.jpg"
 * coverImage: "/cover.jpg"
 * ---
 *
 * Your MDX content here...
 * ```
 *
 * Used by:
 * - /blog/page.tsx - Lists all posts
 * - /blog/[slug]/page.tsx - Displays single post
 */

import path from "path";
import { readFile, readdir } from "fs/promises";
import matter from "gray-matter";
import { BlogPost } from "@/types/blog";

const postsDirectory = path.join(process.cwd(), "app/(public)/blog/posts");

/**
 * Gets all blog posts with metadata
 *
 * Reads all .mdx files from posts directory,
 * extracts frontmatter, and returns sorted by date.
 *
 * Called by: /blog/page.tsx
 *
 * @returns Array of blog posts sorted by date (newest first)
 *
 * Example:
 * ```typescript
 * const posts = await getAllPosts();
 * // [
 * //   { slug: "my-post", frontmatter: { title: "...", date: "..." } },
 * //   ...
 * // ]
 * ```
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  const filenames = await readdir(postsDirectory);

  const posts = await Promise.all(
    filenames
      .filter((file) => file.endsWith(".mdx"))
      .map(async (filename) => {
        const slug = filename.replace(".mdx", "");
        const fullPath = path.join(postsDirectory, filename);
        const fileContents = await readFile(fullPath, "utf8");
        const { data } = matter(fileContents);

        return {
          slug,
          frontmatter: {
            title: data.title || "Untitled",
            description: data.description || "No description",
            date: data.date || new Date().toISOString(),
            author: data.author || "Anonymous",
            authorAvatar: data.authorAvatar,
            coverImage: data.coverImage,
          },
        };
      }),
  );

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime(),
  );
}

/**
 * Gets a single blog post by slug
 *
 * Returns the full MDX content including frontmatter.
 *
 * Called by: /blog/[slug]/page.tsx
 *
 * @param slug - URL slug (filename without .mdx)
 * @returns Full MDX file content
 *
 * Example:
 * ```typescript
 * const content = await getPostBySlug("my-post");
 * // "---\ntitle: My Post\n---\n\nPost content..."
 * ```
 */
export async function getPostBySlug(slug: string): Promise<string> {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  return readFile(filePath, "utf8");
}
