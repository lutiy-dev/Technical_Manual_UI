(() => {
  const key = '__EPS_PWA_INSTALL_PROMPT__';

  window[key] = window[key] || null;

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    window[key] = event;
    window.dispatchEvent(new Event('eps-pwa-install-ready'));
  });

  window.addEventListener('appinstalled', () => {
    window[key] = null;
    window.dispatchEvent(new Event('eps-pwa-installed'));
  });
})();
