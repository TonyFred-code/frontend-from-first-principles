import Link from "next/link";
import { getAllChapters } from "@/lib/content";

export default function HomePage() {
  const chapters = getAllChapters();

  return (
    <main>
      <h1>Frontend from First Principles</h1>
      <ul>
        {chapters.map((chapter, index) => (
          <li key={chapter.slug}>
            <Link href={`/${chapter.slug}`}>
              {index + 1}. {chapter.title}
            </Link>
            <p>{chapter.description}</p>
            <span>{chapter.readTime}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
