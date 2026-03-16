import CategoriesPage from '@pages/CategoriesPage';

import { Suspense } from 'react';

import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Categories',
  description:
    'Explore our wide range of categories to find exactly what you are looking for.',
};

export default function Categories() {
  return (
    <Suspense fallback={null}>
      <CategoriesPage />
    </Suspense>
  );
}
