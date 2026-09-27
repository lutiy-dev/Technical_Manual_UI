import { notFound } from 'next/navigation';
import { ManualPage } from '@/components/manual-page-en';
import { chapterBySlug, manualChapters } from '@/lib/manual-data-en';

export function generateStaticParams() {
  return manualChapters.map((chapter) => ({ slug: chapter.slug }));
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = chapterBySlug[slug];

  if (!chapter) notFound();

  return <ManualPage chapter={chapter} />;
}
