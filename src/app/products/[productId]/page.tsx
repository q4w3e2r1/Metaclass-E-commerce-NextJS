import ProductPage from '@pages/ProductPage';
import ProductCard from '@pages/ProductPage/components/ProductCard';

export default async function Page({ 
  params 
}: { 
  params: Promise<{ productId: string }> 
}) {
  const { productId } = await params;
  
  return (
    <ProductPage>
      <ProductCard productId={productId} />
    </ProductPage>
  );
}