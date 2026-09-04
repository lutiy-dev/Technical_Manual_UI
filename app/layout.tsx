import type { Metadata } from 'next';
import './globals.css';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://people-ppl-hansen-manual.ogorkov.chatgpt.site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'PEOPLE / PPL — Hansen Technical Manual',
  description:
    'Интерактивный технический учебник по PEOPLE/PPL ветке Epspoziciya_archviz_ph_sdxlflux_v001.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
