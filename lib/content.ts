import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

const WORDS_PER_MINUTE = 200;

export type ChapterFrontmatter = {
  title: string;
  slug: string;
  readTime: string;
  description: string;
  published: boolean;
  date: string;
  updated?: string;
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

  return {
    frontmatter: {
      ...(data as ChapterFrontmatter),
      readTime: calculateReadTime(content),
    },
    content,
  };
}
export function getAllChapters(): ChapterFrontmatter[] {
  const files = getAllChapterFiles().sort();

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        ...(data as ChapterFrontmatter),
        readTime: calculateReadTime(content),
      };
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

export type Heading = { text: string; slug: string };

export function extractHeadings(content: string): Heading[] {
  const matches = [...content.matchAll(/^##\s+(.+)$/gm)];
  return matches.map((m) => ({
    text: m[1].trim(),
    slug: m[1]
      .trim()
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-"),
  }));
}

export function calculateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
  return `${minutes} min`;
}

export function getDisplayDate(frontmatter: ChapterFrontmatter): string {
  return frontmatter.updated ?? frontmatter.date;
}
