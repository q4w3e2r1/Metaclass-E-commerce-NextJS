import { Suspense } from 'react';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import CatalogPage from '@pages/CatalogPage';
import { getProductsInfiniteServer } from '@api/products.server';
import { Metadata } from 'next';

export const revalidate = 600;

export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse our catalog of products',
};

export default async function ProductsPage() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
    },
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['products', 'infinite'],
    queryFn: () => getProductsInfiniteServer({ page: 1, pageSize: 9 }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={null}>
        <CatalogPage />
      </Suspense>
    </HydrationBoundary>
  );
}