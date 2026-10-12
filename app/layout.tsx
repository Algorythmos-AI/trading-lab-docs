import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Provider } from '@/components/provider';
import { appName } from '@/lib/shared';
import './global.css';

export const metadata: Metadata = {
  title: { default: appName, template: `%s · ${appName}` },
  description: 'What is built on each trading platform, how it runs, where it stands and where it is heading.',
  robots: { index: false, follow: false },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
