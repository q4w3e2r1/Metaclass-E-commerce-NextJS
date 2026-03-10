import Link from 'next/link';
import { Card, CartButton } from '@components'
import styles from './RelatedProducts.module.scss'
import type { Product } from '@app-types/product';
import { routes } from '@config/routes'

type RelatedProductsProps = {
    products: Product[];
}

export const RelatedProducts = ({ products }: RelatedProductsProps) => {
    if (!products.length) return null;
    return (
        <div className={styles.related}>
            <div className={styles.title}>Related items</div>
            <div className={styles.relatedProducts}>
                {products.map((product: Product) => {
                    const imageUrl =
                        product.images?.[0]?.formats?.small?.url ||
                        product.images?.[0]?.url ||
                        "";
                    return (
                        <Link
                            key={product.documentId}
                            href={routes.product.getRoute(product.documentId)}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <Card
                                image={imageUrl}
                                title={product.title}
                                subtitle={product.description}
                                contentSlot={<span>{product.price}</span>}
                                actionSlot={
                                    <CartButton productId={product.id} />
                                }
                            />
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default RelatedProducts