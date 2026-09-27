import type { Metadata, Viewport } from 'next';
import './globals.css';
import { withBasePath } from '@/lib/site-path';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://lutiy-dev.github.io/Technical_Manual_UI/';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'ARCHVIZ × AI · ComfyUI Technical Workflow Manual',
  description:
    'Production-focused ComfyUI manual for architectural visualization: workflow engineering, SDXL/FLUX, ControlNet, masks, PEOPLE/PPL, diagnostics and hands-on labs.',
  applicationName: 'ARCHVIZ × AI Manual',
  manifest: withBasePath('/manifest.webmanifest'),
  icons: {
    icon: [
      {
        url: withBasePath('/icons/eps-192.png'),
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: withBasePath('/icons/eps-512.png'),
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: withBasePath('/icons/eps-180.png'),
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: 'ARCHVIZ × AI Manual',
    statusBarStyle: 'default',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
};

export const viewport: Viewport = {
  themeColor: '#0b0d10',
  colorScheme: 'dark light',
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src={withBasePath('/pwa-install-capture.js')} />
      </head>
      <body>{children}</body>
    </html>
  );
}
