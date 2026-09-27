import { ManualPageEn } from '@/components/manual-page-en';
import { LocalePreferenceRedirect } from '@/components/language-switch';
import { manualChapters } from '@/lib/manual-data-en';

export default function Home() {
  return (
    <>
      <LocalePreferenceRedirect />
      <ManualPageEn chapter={manualChapters[0]} />
    </>
  );
}
