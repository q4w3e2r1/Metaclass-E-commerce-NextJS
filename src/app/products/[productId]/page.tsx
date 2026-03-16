import { getProductById } from '@api/products.server';
import ProductPage from '@pages/ProductPage';
import ProductCard from '@pages/ProductPage/components/ProductCard';

import { Suspense } from 'react';

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

  return (
    <Suspense fallback={null}>
      <ProductPage>
        <ProductCard productId={productId} />
      </ProductPage>
    </Suspense>
  );
}
