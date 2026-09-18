'use client';

import { useEffect, useState } from 'react';
import { Check, Download, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { withBasePath } from '@/lib/site-path';

type InstallChoice = {
  outcome: 'accepted' | 'dismissed';
  platform: string;
};

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<InstallChoice>;
};

type NavigatorWithStandalone = Navigator & {
  standalone?: boolean;
};

type PwaWindow = Window & {
  __EPS_PWA_INSTALL_PROMPT__?: BeforeInstallPromptEvent | null;
};

export function PwaInstall() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [hint, setHint] = useState<string | null>(null);

  useEffect(() => {
    const standaloneMedia = window.matchMedia('(display-mode: standalone)');
    const appleStandalone =
      (window.navigator as NavigatorWithStandalone).standalone === true;
    const pwaWindow = window as PwaWindow;

    setInstalled(standaloneMedia.matches || appleStandalone);
    setIsIOS(/iphone|ipad|ipod/i.test(window.navigator.userAgent));

    if (pwaWindow.__EPS_PWA_INSTALL_PROMPT__) {
      setInstallPrompt(pwaWindow.__EPS_PWA_INSTALL_PROMPT__);
    }

    if ('serviceWorker' in navigator) {
      void navigator.serviceWorker
        .register(withBasePath('/sw.js'), {
          scope: withBasePath('/'),
        })
        .then(() => navigator.serviceWorker.ready)
        .catch((error) => {
          console.warn('EPS Manual service worker registration failed', error);
        });
    }

    const onInstallReady = () => {
      setInstallPrompt(pwaWindow.__EPS_PWA_INSTALL_PROMPT__ ?? null);
      setHint(null);
    };

    const onInstalled = () => {
      pwaWindow.__EPS_PWA_INSTALL_PROMPT__ = null;
      setInstallPrompt(null);
      setInstalled(true);
      setHint(null);
    };

    const onDisplayModeChange = (event: MediaQueryListEvent) => {
      setInstalled(event.matches);
    };

    window.addEventListener('eps-pwa-install-ready', onInstallReady);
    window.addEventListener('eps-pwa-installed', onInstalled);
    window.addEventListener('appinstalled', onInstalled);
    standaloneMedia.addEventListener('change', onDisplayModeChange);

    return () => {
      window.removeEventListener('eps-pwa-install-ready', onInstallReady);
      window.removeEventListener('eps-pwa-installed', onInstalled);
      window.removeEventListener('appinstalled', onInstalled);
      standaloneMedia.removeEventListener('change', onDisplayModeChange);
    };
  }, []);

  if (installed) return null;

  async function install() {
    const pwaWindow = window as PwaWindow;
    const prompt = installPrompt ?? pwaWindow.__EPS_PWA_INSTALL_PROMPT__ ?? null;

    if (prompt) {
      setHint(null);
      await prompt.prompt();
      const choice = await prompt.userChoice;

      pwaWindow.__EPS_PWA_INSTALL_PROMPT__ = null;
      setInstallPrompt(null);

      if (choice.outcome === 'accepted') {
        setInstalled(true);
      }
      return;
    }

    if (isIOS) {
      setHint('Safari: Поделиться → На экран Домой.');
      return;
    }

    setHint(
      'Chrome/Edge ещё не выдал системный install prompt. Обнови страницу один раз и нажми «Установить» снова.',
    );
  }

  return (
    <div className="pwa-install-wrap">
      <Button
        className="pwa-install-button"
        variant="ghost"
        size="sm"
        onClick={() => void install()}
        title="Установить учебник как приложение"
        aria-label="Установить учебник как приложение"
      >
        <Download size={16} />
        <span>Установить</span>
      </Button>

      {hint && (
        <div className="pwa-install-hint" role="status">
          <Info size={14} />
          <span>{hint}</span>
          <button
            type="button"
            onClick={() => setHint(null)}
            aria-label="Закрыть подсказку"
            title="Закрыть"
          >
            <Check size={13} />
          </button>
        </div>
      )}
    </div>
  );
}
