import { ManualPage } from '@/components/manual-page';
import { manualChapters } from '@/lib/manual-data';

export default function ProjectRussianRootPage() {
  return <ManualPage chapter={manualChapters[0]} />;
}
