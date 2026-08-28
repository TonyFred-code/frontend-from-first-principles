import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllChapterFiles, getChapterBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import Link from "next/link.js";
import { ChapterCheckbox } from "@/components/ChapterCheckbox";

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
  return { title: chapter?.frontmatter.title ?? "Chapter not found" };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);

  if (!chapter) notFound();

  return (
    <article className="max-w-2xl mx-auto px-6 py-12">
      <Link
        href="/"
        className="font-mono text-sm text-blueprint-line hover:text-signal-red transition-colors"
      >
        ← back
      </Link>

      <p className="font-mono text-xs text-blueprint-line mt-6">
        {chapter.frontmatter.readTime}
      </p>
      <h1 className="font-display text-4xl text-signal-orange mt-2 mb-4">
        {chapter.frontmatter.title}
      </h1>

      <ChapterCheckbox slug={chapter.frontmatter.slug} />

      <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-signal-orange prose-a:text-signal-orange mt-8">
        <MDXRemote source={chapter.content} />
      </div>
    </article>
  );
}
