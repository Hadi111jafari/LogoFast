import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import matter from "gray-matter";
import { type Frontmatter } from "@/types/blog";
import { compileMDX } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let source: string;
  try {
    source = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  const { data: frontmatter, content: mdxContent } = matter(source);

  const { content } = await compileMDX({
    source: mdxContent,
    options: { parseFrontmatter: false },
  });

  return (
    <div className="min-h-screen bg-background">
      <article className="mx-auto max-w-4xl px-4 py-12 md:py-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-base text-muted-foreground hover:text-foreground transition-colors mb-8 md:mb-10"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to all articles
        </Link>

        <PostHeader frontmatter={frontmatter as Frontmatter} />
        <div className="prose dark:prose-invert mt-12 md:mt-16">{content}</div>
      </article>
    </div>
  );
}

function PostHeader({ frontmatter }: { frontmatter: Frontmatter }) {
  return (
    <header className="space-y-8">
      {frontmatter.coverImage && (
        <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-muted">
          <Image
            src={frontmatter.coverImage}
            alt={frontmatter.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          {frontmatter.title}
        </h1>
        {frontmatter.description && (
          <p className="text-xl text-muted-foreground md:text-2xl">
            {frontmatter.description}
          </p>
        )}
        <div className="flex items-center gap-4 pt-4 border-t">
          {frontmatter.authorAvatar && (
            <Image
              src={frontmatter.authorAvatar}
              alt={frontmatter.author}
              width={48}
              height={48}
              className="rounded-full ring-2 ring-border"
            />
          )}
          <div className="flex flex-col">
            <span className="font-medium text-foreground">
              {frontmatter.author}
            </span>
            <time className="text-sm text-muted-foreground">
              {format(new Date(frontmatter.date), "MMMM d, yyyy")}
            </time>
          </div>
        </div>
      </div>
    </header>
  );
}
