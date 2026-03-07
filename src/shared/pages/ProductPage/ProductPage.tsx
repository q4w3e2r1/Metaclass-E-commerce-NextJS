'use client';
import { useRouter } from 'next/navigation';
import { ArrowDownIcon } from '@components';
import styles from './ProductPage.module.scss'
import ProductCard from './components/ProductCard';
import { useEffect } from 'react';

interface ProductPageProps {
  productId: string;
}

export const ProductPage = ({ productId }: ProductPageProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.productPage}>
      <div className={styles.product}>
        <div className={styles.backward} onClick={handleBack}>
          <div className={styles.icon}><ArrowDownIcon /></div>
          Назад
        </div>
        <ProductCard productId={productId} />
      </div>
    </div>
  );
};

export default ProductPage;