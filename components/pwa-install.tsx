'use client';

import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
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

export function PwaInstall() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const standaloneMedia = window.matchMedia('(display-mode: standalone)');
    const appleStandalone =
      (window.navigator as NavigatorWithStandalone).standalone === true;

    setInstalled(standaloneMedia.matches || appleStandalone);
    setIsIOS(/iphone|ipad|ipod/i.test(window.navigator.userAgent));

    if ('serviceWorker' in navigator) {
      void navigator.serviceWorker
        .register(withBasePath('/sw.js'), {
          scope: withBasePath('/'),
        })
        .catch((error) => {
          console.warn('EPS Manual service worker registration failed', error);
        });
    }

    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    const onInstalled = () => {
      setInstallPrompt(null);
      setInstalled(true);
    };

    const onDisplayModeChange = (event: MediaQueryListEvent) => {
      setInstalled(event.matches);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener('appinstalled', onInstalled);
    standaloneMedia.addEventListener('change', onDisplayModeChange);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('appinstalled', onInstalled);
      standaloneMedia.removeEventListener('change', onDisplayModeChange);
    };
  }, []);

  if (installed) return null;

  async function install() {
    if (installPrompt) {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setInstalled(true);
      }
      setInstallPrompt(null);
      return;
    }

    if (isIOS) {
      window.alert(
        'На iPhone/iPad: открой меню «Поделиться» в Safari → выбери «На экран Домой». После добавления учебник будет запускаться как отдельное приложение без адресной строки.',
      );
      return;
    }

    window.alert(
      'В Chrome или Edge открой меню браузера и выбери «Установить приложение» / «Установить EPS Manual». Если пункт ещё не появился, обнови страницу один раз.',
    );
  }

  return (
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
  );
}
