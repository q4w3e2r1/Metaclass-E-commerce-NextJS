import '@/shared/styles/globals.scss';
import { Providers } from './providers';
import Header from '@pages/Header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lalasia',
  description: 'Магазин товаров для дома на каждый день',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}