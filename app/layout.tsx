import type { Metadata } from 'next';
import './globals.css';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://lutiy-dev.github.io/Technical_Manual_UI/';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'EPSPOZICIYA ARCHVIZ · Technical Workflow Manual',
  description:
    'Интерактивное техническое руководство по полному графу Epspoziciya_archviz_ph_sdxlflux_v001, включая PEOPLE/PPL, SDXL, ControlNet, FLUX и output.',
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
