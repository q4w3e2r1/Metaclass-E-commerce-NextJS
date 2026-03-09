
import Image from 'next/image';
import { getProductById } from '@api/products';
import { notFound } from 'next/navigation';
import { Button, CartButton } from '@components';
import styles from './ProductCard.module.scss';
import RelatedProducts from '../RelatedProducts';


interface ProductCardProps {
  productId: string;
}

export const ProductCard = async ({ productId }: ProductCardProps) => {
    const data = await getProductById(productId).catch(() => null);

    if (!data) notFound();

    const imageUrl =
        data.images?.[0]?.formats?.large?.url ||
        data.images?.[0]?.url ||
        "";

    return (
        <div className={styles.card}>
            <div className={styles.main}>
                <Image
                src={imageUrl}
                alt={data.title}
                width={600}
                height={600}
                className={styles.image}
                />
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

            {data.productCategory && (
                <RelatedProducts
                    categoryId={data.productCategory.id}
                    excludeDocumentId={data.documentId}
                />
            )}
        </div>
    );
};

export default ProductCard;