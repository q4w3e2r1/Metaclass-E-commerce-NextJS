import { dehydrate, QueryClient } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import CatalogPage from '@pages/CatalogPage';
import { getProductsInfinite } from '@api/products';

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
    queryKey: ['products', 'infinite', [], ''],
    queryFn: () => getProductsInfinite({ page: 1, pageSize: 9 }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogPage />
    </HydrationBoundary>
  );
}