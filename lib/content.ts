import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type ChapterFrontmatter = {
  title: string;
  slug: string;
  readTime: string;
  description: string;
  published: boolean;
};

export type Chapter = {
  frontmatter: ChapterFrontmatter;
  content: string;
};

export function getAllChapterFiles(): string[] {
  return fs.readdirSync(CONTENT_DIR).filter((file) => file.endsWith(".mdx"));
}

export function getChapterBySlug(slug: string): Chapter | null {
  const files = getAllChapterFiles();
  const match = files.find((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const { data } = matter(raw);
    return data.slug === slug;
  });

  if (!match) return null;

  const raw = fs.readFileSync(path.join(CONTENT_DIR, match), "utf-8");
  const { data, content } = matter(raw);

  return { frontmatter: data as ChapterFrontmatter, content };
}
