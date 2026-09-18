# Skill · EPS PWA Release

## Trigger

Use this skill whenever changing install behavior, manifest, service worker, launcher icons, standalone display, PWA caching, or GitHub Pages packaging.

## Goal

Deliver a real installable EPS PWA, not a generic browser shortcut.

## Required release chain

`SOURCE → BUILD → PAGES ASSEMBLY → DEPLOY → ARTIFACT CHECK → FRESH INSTALL TEST`

## Install UX

Prefer native browser installation.

Capture `beforeinstallprompt` early, before React hydration.

Store the deferred event and trigger `prompt()` from the visible Install button.

Do not use blocking `window.alert()` as the normal fallback.

Fallback instructions should be inline or toast-like.

## GitHub Pages packaging

The Pages preparation step must include:

- `manifest.webmanifest`
- `sw.js`
- `pwa-install-capture.js`
- `icons/`
- required favicon/static metadata

Do not assume `public/` content automatically exists at the final project-root path.

## Icon contract

Maintain:

- 180×180 Apple touch icon
- 192×192 PNG
- 512×512 PNG
- 512×512 maskable manifest entry

Keep EPS branding consistent with the site brand mark.

## Android QA

After changing icon metadata:

1. remove the old installed PWA/shortcut;
2. reload the site;
3. install again;
4. verify EPS launcher art;
5. launch and verify standalone mode.

Browser/launcher caches can preserve old icon metadata.

## Service worker

Cache the app shell and useful static assets.

Do not aggressively cache large `resources/` or `downloads/` libraries.

## Report

Do not say “PWA fixed” until build + deploy succeeded and the final artifact contains all required PWA files.

A real device install test is the final acceptance step.
