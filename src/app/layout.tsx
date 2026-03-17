import Header from '@pages/Header';

import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import '@/shared/styles/globals.scss';

import { Providers } from './providers';

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Lalasia',
  description: 'Магазин мебели и товаров для дома',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={roboto.variable} suppressHydrationWarning>
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
