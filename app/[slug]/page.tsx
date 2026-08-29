import { MDXRemote } from "next-mdx-remote/rsc";
import {
  extractHeadings,
  getAdjacentChapters,
  getAllChapterFiles,
  getChapterBySlug,
} from "@/lib/content";
import { notFound } from "next/navigation";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import Link from "next/link.js";
import { ChapterCheckbox } from "@/components/ChapterCheckbox";
import { ChapterNav } from "@/components/ChapterNav";
import rehypePrettyCode from "rehype-pretty-code";
import {
  MobileTableOfContents,
  TableOfContents,
} from "@/components/TableOfContents";
import rehypeSlug from "rehype-slug";

export function generateStaticParams() {
  const files = getAllChapterFiles();
  return files.map((file) => {
    const raw = fs.readFileSync(
      path.join(process.cwd(), "content", file),
      "utf-8",
    );
    const { data } = matter(raw);
    return { slug: data.slug };
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);

  if (!chapter) return { title: "Chapter not found" };

  const { title, description } = chapter.frontmatter;

  return {
    title,
    description,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);

  if (!chapter) notFound();

  const { prev, next } = getAdjacentChapters(chapter.frontmatter.slug);
  const headings = extractHeadings(chapter.content);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 flex gap-12">
      <article className="max-w-2xl flex-1">
        <Link
          href="/"
          className="font-mono text-sm text-line hover:text-signal-red transition-colors"
        >
          ← back
        </Link>

        <p className="font-mono text-xs text-line mt-6">
          {chapter.frontmatter.readTime}
        </p>
        <h1 className="font-display text-4xl text-signal-orange mt-2 mb-4">
          {chapter.frontmatter.title}
        </h1>

        <ChapterCheckbox slug={chapter.frontmatter.slug} />

        <MobileTableOfContents headings={headings} />

        <div className="prose dark:prose-invert max-w-none prose-headings:font-display prose-headings:text-signal-orange prose-a:text-signal-orange prose-pre:bg-transparent prose-pre:p-0 mt-8">
          <MDXRemote
            source={chapter.content}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  rehypeSlug,
                  [
                    rehypePrettyCode,
                    {
                      theme: { light: "github-light", dark: "github-dark" },
                      keepBackground: false,
                    },
                  ],
                ],
              },
            }}
          />
        </div>

        <ChapterNav prev={prev} next={next} />
      </article>

      <TableOfContents headings={headings} />
    </div>
  );
}
