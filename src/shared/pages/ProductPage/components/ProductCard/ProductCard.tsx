import {
  getProductById,
  getRelatedProductsByCategory,
} from '@api/products.server';
import { Button, CartButton } from '@components';

import { notFound } from 'next/navigation';

import RelatedProducts from '../RelatedProducts';
import ImageSlider from './components';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  productId: string;
}

export const ProductCard = async ({ productId }: ProductCardProps) => {
  const data = await getProductById(productId).catch(() => null);

  if (!data) notFound();

  const relatedProducts = data.productCategory
    ? await getRelatedProductsByCategory(
        data.productCategory.id,
        data.documentId
      ).catch(() => null)
    : null;

  const images = (data.images ?? [])
    .map((img) => img.formats?.large?.url || img.url)
    .filter(Boolean);

  return (
    <div className={styles.card}>
      <div className={styles.main}>
        <ImageSlider images={images} alt={data.title} />
        <div className={styles.content}>
          <div className={styles.title}>{data.title}</div>
          <div className={styles.description}>{data.description}</div>
          <div className={styles.price}>${data.price}</div>
          <div className={styles.buttons}>
            <Button>Buy now</Button>
            <CartButton productId={data.id} />
          </div>
        </div>
      </div>

      {relatedProducts && <RelatedProducts products={relatedProducts.items} />}
    </div>
  );
};

export default ProductCard;
