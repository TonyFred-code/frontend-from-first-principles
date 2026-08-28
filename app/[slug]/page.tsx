import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllChapterFiles, getChapterBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import matter from "gray-matter";
import fs from "fs";
import path from "path";

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
    <article>
      <h1>{chapter.frontmatter.title}</h1>
      <MDXRemote source={chapter.content} />
    </article>
  );
}
