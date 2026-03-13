'use client';
import { useRouter } from 'next/navigation';
import { ArrowDownIcon } from '@components';
import styles from './ProductPage.module.scss';
import { useEffect } from 'react';

interface ProductPageProps {
  children: React.ReactNode;
}

export const ProductPage = ({ children }: ProductPageProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
        window.scrollTo(0, 0);
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.productPage}>
      <div className={styles.product}>
        <button className={styles.backward} onClick={handleBack}>
          <div className={styles.icon}><ArrowDownIcon /></div>
          Назад
        </button>
        {children}
      </div>
    </div>
  );
};

export default ProductPage;