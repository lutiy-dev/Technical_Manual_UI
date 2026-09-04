import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ManualPage } from '@/components/manual-page';
import { chapterBySlug, manualChapters } from '@/lib/manual-data';

export function generateStaticParams() {
  return manualChapters.map((chapter) => ({ slug: chapter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chapter = chapterBySlug[slug];
  if (!chapter) return {};

  return {
    title: `${chapter.navTitle} · PEOPLE / PPL Manual`,
    description: chapter.lede,
  };
}

export default async function GitHubPagesChapterRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = chapterBySlug[slug];

  if (!chapter) notFound();
  return <ManualPage chapter={chapter} />;
}
