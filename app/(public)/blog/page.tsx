import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";
import { Post } from "@/types/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles and guides about",
};
export default async function BlogPage() {
  const posts = await getAllPosts();
  const [featured] = posts;

  return (
    <div className="flex px-4 max-w-7xl mx-auto min-h-svh w-full justify-center bg-background">
      <section className="py-32 w-full">
        <div className="container">
          <div className="mb-16 text-center">
            <h1 className="text-5xl font-medium md:text-6xl">
              Insights and Trends Blog
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Stay updated with the latest insights, trends, and tips across
              various topics.
            </p>
          </div>

          {featured && <FeaturedPost post={featured} />}

          <h2 className="text-2xl font-medium md:text-3xl mb-8">All Posts</h2>

          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              No posts yet. Check back soon!
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function FeaturedPost({ post }: { post: Post }) {
  return (
    <div className="mx-auto max-w-7xl mb-16">
      <Link href={`/blog/${post.slug}`} className="block group">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:gap-16">
          <Image
            src={post.frontmatter.coverImage || "/placeholder.png"}
            alt={post.frontmatter.title}
            width={800}
            height={450}
            className="aspect-video rounded object-cover transition-transform group-hover:scale-101"
            priority
          />
          <div className="flex flex-col items-start gap-4">
            <span className="inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground">
              Featured
            </span>
            <h2 className="text-2xl font-semibold md:max-w-lg lg:text-3xl group-hover:text-primary transition-colors">
              {post.frontmatter.title}
            </h2>
            <p className="text-muted-foreground md:max-w-lg">
              {post.frontmatter.description}
            </p>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>{post.frontmatter.author}</span>
              <span>•</span>
              <time>
                {format(new Date(post.frontmatter.date), "MMMM d, yyyy")}
              </time>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded border bg-card transition-all"
    >
      <div className="aspect-video overflow-hidden">
        <Image
          src={post.frontmatter.coverImage || "/placeholder.png"}
          alt={post.frontmatter.title}
          width={600}
          height={340}
          className="size-full object-cover transition-transform group-hover:scale-101"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 gap-3">
        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
          {post.frontmatter.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {post.frontmatter.description}
        </p>
        <div className="mt-auto flex items-center gap-3 text-sm text-muted-foreground">
          <span>{post.frontmatter.author}</span>
          <span>•</span>
          <time>{format(new Date(post.frontmatter.date), "MMM d, yyyy")}</time>
        </div>
      </div>
    </Link>
  );
}
