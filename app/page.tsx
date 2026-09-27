import { ManualPage } from '@/components/manual-page-en';
import { manualChapters } from '@/lib/manual-data-en';

export default function HomePage() {
  return <ManualPage chapter={manualChapters[0]} />;
}
