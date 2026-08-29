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

export function getAllChapters(): ChapterFrontmatter[] {
  const files = getAllChapterFiles().sort(); // filenames sort correctly since they're zero-padded (01-, 02-...)

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
      const { data } = matter(raw);
      return data as ChapterFrontmatter;
    })
    .filter((chapter) => chapter.published);
}

export function getAdjacentChapters(slug: string): {
  prev: ChapterFrontmatter | null;
  next: ChapterFrontmatter | null;
} {
  const chapters = getAllChapters();
  const index = chapters.findIndex((c) => c.slug === slug);

  if (index === -1) return { prev: null, next: null };

  return {
    prev: index > 0 ? chapters[index - 1] : null,
    next: index < chapters.length - 1 ? chapters[index + 1] : null,
  };
}
