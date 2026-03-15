'use client';
import { Card, CartButton, ProductCardSkeleton } from '@components'
import styles from './ProductsList.module.scss'
import { useInfiniteProducts } from "@hooks/products/useInfiniteProducts";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useMemo, Fragment } from 'react';
import { useCart } from '@hooks/cart/useCartQuery';
import { useInfiniteScroll } from '@hooks/useInfiniteScroll';
import { routes } from '@config/routes'

const SKELETON_COUNT = 6;
const SKELETON_ITEMS = Array.from({ length: SKELETON_COUNT }, (_, i) => i);

export const ProductsList = () => {
  const { cart } = useCart();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const categoryIds = useMemo(() => {
    return searchParams.get("categories")?.split(",").filter(Boolean) ?? [];
  }, [searchParams]);
  const sort = searchParams.get("sort") ?? undefined;
  const priceFrom = searchParams.get("priceFrom") ?? undefined;
  const priceTo = searchParams.get("priceTo") ?? undefined;
  const rating = searchParams.get("rating") ?? undefined;
  const inStock = searchParams.get("inStock") === "true" || undefined;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteProducts(categoryIds, search, 1, sort, priceFrom, priceTo, rating, inStock);

  const totalPages = data?.pages.length ?? 0;

  const {
    loaderRef,
    observePage,
  } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    totalPages
  });

  const total = data?.pages?.[0]?.pagination?.total ?? 0;

  const cartProductIds = useMemo(() => {
    if (!cart) return new Set<number>();
    return new Set(cart.map((item) => item.product.id));
  }, [cart]);

  if (isLoading) {
    return (
      <div className={styles.list}>
        <div className={styles.listCards}>
          {SKELETON_ITEMS.map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!isLoading && total === 0) {
    return (
      <div className={styles.list}>
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🔍</div>
          <div className={styles.emptyTitle}>No products found</div>
          <div className={styles.emptySubtitle}>Try changing your search or filters</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      <div className={styles.results}>
        <h2 className={styles.total}>Total products</h2>
        <div className={styles.amount}>{total}</div>
      </div>

      <div className={styles.listCards}>
        {data?.pages.map((page, pageIndex) => {
          const pageNumber = pageIndex + 1;

          return (
            <Fragment key={pageIndex}>
              {page.items.map((product, productIndex) => {
                const imageUrl =
                  product.images?.[0]?.formats?.small?.url ||
                  product.images?.[0]?.url ||
                  "";

                return (
                  <div
                    key={product.documentId}
                    className={styles.cardWrapper}
                  >
                    {productIndex === 0 && (
                      <div
                        data-page={pageNumber}
                        ref={observePage(pageNumber)}
                        className={styles.pageAnchor}
                        aria-hidden="true"
                      />
                    )}
                    <Link
                      href={routes.product.getRoute(product.documentId)}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Card
                        image={imageUrl}
                        title={product.title}
                        priority={productIndex === 0 && pageIndex === 0}
                        subtitle={product.description}
                        contentSlot={<span>{product.price}</span>}
                        actionSlot={
                          <CartButton
                            productId={product.id}
                          />
                        }
                      />
                    </Link>
                  </div>
                );
              })}
            </Fragment>
          );
        })}
      </div>

      {hasNextPage && (
        <div ref={loaderRef} className={styles.loader} />
      )}
    </div>
  );
};

export default ProductsList;