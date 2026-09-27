'use client';

import { useEffect, useMemo, useState } from 'react';
import { withBasePath } from '@/lib/site-path';

const STORAGE_KEY = 'archviz-manual-language';

type Locale = 'en' | 'ru';

function localPath(pathname: string) {
  const base = withBasePath('/').replace(/\/$/, '');
  if (base && pathname.startsWith(base)) {
    return pathname.slice(base.length) || '/';
  }
  return pathname || '/';
}

function normalizeRoute(path: string) {
  const clean = path.replace(/\/+$/, '') || '/';
  return clean === '/' ? '/' : clean;
}

export function LanguageSwitch() {
  const [pathname, setPathname] = useState('');

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  const state = useMemo(() => {
    const route = normalizeRoute(localPath(pathname || withBasePath('/')));
    const isRu = route === '/ru' || route.startsWith('/ru/');
    const locale: Locale = isRu ? 'ru' : 'en';
    const englishRoute = isRu ? route.replace(/^\/ru(?=\/|$)/, '') || '/' : route;
    const russianRoute = englishRoute === '/' ? '/ru' : `/ru${englishRoute}`;
    return {
      locale,
      enHref: withBasePath(englishRoute),
      ruHref: withBasePath(russianRoute),
    };
  }, [pathname]);

  function remember(locale: Locale) {
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // Navigation remains functional when storage is unavailable.
    }
  }

  return (
    <nav className="language-switch" aria-label="Language">
      <a
        href={state.enHref}
        className={state.locale === 'en' ? 'active' : undefined}
        aria-current={state.locale === 'en' ? 'page' : undefined}
        onClick={() => remember('en')}
      >
        EN
      </a>
      <span aria-hidden="true">|</span>
      <a
        href={state.ruHref}
        className={state.locale === 'ru' ? 'active' : undefined}
        aria-current={state.locale === 'ru' ? 'page' : undefined}
        onClick={() => remember('ru')}
      >
        RU
      </a>
    </nav>
  );
}

export function LanguagePreferenceRedirect() {
  useEffect(() => {
    let preferred: string | null = null;
    try {
      preferred = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      return;
    }
    if (preferred !== 'ru') return;

    const route = normalizeRoute(localPath(window.location.pathname));
    if (route !== '/') return;

    const target = withBasePath('/ru');
    if (window.location.pathname !== target && window.location.pathname !== `${target}/`) {
      window.location.replace(target);
    }
  }, []);

  return null;
}
