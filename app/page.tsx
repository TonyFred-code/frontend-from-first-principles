import { getAllChapters } from "@/lib/content";
import { ChapterList } from "@/components/ChapterList";

export default function HomePage() {
  const chapters = getAllChapters();

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <ChapterList chapters={chapters} />
    </div>
  );
}
