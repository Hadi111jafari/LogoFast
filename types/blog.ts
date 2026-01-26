export interface BlogPost {
  slug: string;
  frontmatter: Frontmatter;
}

export interface Frontmatter {
  title: string;
  description: string;
  date: string;
  author: string;
  authorAvatar?: string;
  coverImage?: string;
}

export interface Post {
  slug: string;
  frontmatter: Frontmatter;
}
