'use client'

import Link from 'next/link';
import { Card, CartButton } from '@components'
import { useRelatedProductsByCategory } from '@hooks/products/useRelatedProductsByCategoryQuery';
import styles from './RelatedProducts.module.scss'
import { useCart } from '@hooks/cart/useCartQuery';
import { useMemo } from 'react';
import type { Product } from '@app-types/product';
import { routes } from '@config/routes'

type RelatedProductsProps = {
    categoryId: number, 
    excludeDocumentId: string
}

export const RelatedProducts = ({categoryId, excludeDocumentId}: RelatedProductsProps) => {

    const { data, isLoading } = useRelatedProductsByCategory(
        categoryId,
        excludeDocumentId
    );
    const { cart } = useCart();

    const cartProductIds = useMemo(() => {
        if (!cart) return new Set<number>();
        return new Set(cart.map((item) => item.product.id));
    }, [cart]);

    if (isLoading) return <div>Loading...</div>;

    const products = data?.items ?? [];

    return (
        <div className={styles.related}>
            <div className={styles.title}>Related items</div>
            <div className={styles.relatedProducts}>
                {products.map((product: Product) => {
                    const imageUrl =
                        product.images?.[0]?.formats?.small?.url ||
                        product.images?.[0]?.url ||
                        "";
                    const isInCart = cartProductIds.has(product.id);
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
                                    <CartButton productId={product.id} isInCart={isInCart} />
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