import { Suspense } from 'react';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import ProductPage from '@pages/ProductPage';
import ProductCard from '@pages/ProductPage/components/ProductCard';
import { getProductById, getRelatedProductsByCategory } from '@api/products.server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = await getProductById(productId);

  if (!product) return { title: 'Product not found' };

  return {
    title: product.title,
    description: product.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId),
  });

  const product = queryClient.getQueryData<Awaited<ReturnType<typeof getProductById>>>(['product', productId]);

  if (product?.productCategory) {
    await queryClient.prefetchQuery({
      queryKey: ['relatedProducts', product.productCategory.id, productId],
      queryFn: () => getRelatedProductsByCategory(product.productCategory!.id, productId),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={null}>
        <ProductPage>
          <ProductCard productId={productId} />
        </ProductPage>
      </Suspense>
    </HydrationBoundary>
  );
}