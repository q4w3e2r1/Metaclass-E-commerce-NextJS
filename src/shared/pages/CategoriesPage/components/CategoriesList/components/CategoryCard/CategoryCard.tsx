import Image from 'next/image';
import Link from 'next/link';
import { routes } from '@config/routes';
import styles from './CategoryCard.module.scss';
import type { Product } from '@app-types/product';

type ProductCategoryDto = {
  id: number;
  documentId: string;
  title: string;
};

type CategoryCardProps = {
  category: ProductCategoryDto;
  products: Product[];
  total: number;
};

const CategoryCard = ({ category, products, total }: CategoryCardProps) => {
  const images = products
    .map((p) => p.images?.[0]?.formats?.small?.url || p.images?.[0]?.url)
    .filter(Boolean)
    .slice(0, 4);

  const gridImages = [
    ...images,
    ...Array(Math.max(0, 4 - images.length)).fill(null),
  ];

  const formatCount = (total: number, pageSize: number = 4): string => {
    if (total <= pageSize) return `${total} products`;
    const rounded = Math.floor(total / pageSize) * pageSize;
    return `${rounded}+ products`;
  };

  return (
    <Link
      href={routes.products.getRoute() + `?categories=${category.id}`}
      className={styles.card}
    >
      <div className={styles.grid}>
        {gridImages.map((src, i) => (
          <div key={i} className={styles.cell}>
            {src ? (
              <Image
                src={src}
                alt={`${category.title} ${i + 1}`}
                fill
                className={styles.image}
              />
            ) : (
              <div className={styles.placeholder} />
            )}
          </div>
        ))}
      </div>

      <div className={styles.content}>
        <div className={styles.title}>{category.title}</div>
        <div className={styles.count}>{formatCount(total)}</div>
      </div>
    </Link>
  );
};

export default CategoryCard;