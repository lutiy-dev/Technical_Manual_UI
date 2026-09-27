'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { withBasePath } from '@/lib/site-path';

type ManualLocale = 'en' | 'ru';

function chapterHref(locale: ManualLocale, slug?: string) {
  const normalized = slug && slug !== 'workflow-engineering-overview' ? slug : 'workflow-engineering-overview';
  return locale === 'ru' ? `/ru/${normalized}` : `/${normalized}`;
}

export function LanguageSwitch({
  locale,
  slug,
}: {
  locale: ManualLocale;
  slug?: string;
}) {
  const pathname = usePathname();

  useEffect(() => {
    window.localStorage.setItem('archviz-manual-locale', locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const enHref = withBasePath(chapterHref('en', slug));
  const ruHref = withBasePath(chapterHref('ru', slug));

  return (
    <nav className="language-switch" aria-label="Language">
      <a
        href={enHref}
        className={locale === 'en' ? 'active' : ''}
        aria-current={locale === 'en' ? 'page' : undefined}
        onClick={() => window.localStorage.setItem('archviz-manual-locale', 'en')}
      >
        EN
      </a>
      <span aria-hidden="true">|</span>
      <a
        href={ruHref}
        className={locale === 'ru' ? 'active' : ''}
        aria-current={locale === 'ru' ? 'page' : undefined}
        onClick={() => window.localStorage.setItem('archviz-manual-locale', 'ru')}
      >
        RU
      </a>
      <span className="sr-only">{pathname}</span>
    </nav>
  );
}

export function LocalePreferenceRedirect() {
  useEffect(() => {
    const preferred = window.localStorage.getItem('archviz-manual-locale');
    if (preferred !== 'ru') return;
    const base = withBasePath('/ru/workflow-engineering-overview');
    if (!window.location.pathname.includes('/ru/')) {
      window.location.replace(base);
    }
  }, []);

  return null;
}
