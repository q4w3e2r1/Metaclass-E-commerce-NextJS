'use client';
import CheckBox from '@components/CheckBox';

import { useRouter, useSearchParams } from 'next/navigation';

import styles from './CatalogStockFilter.module.scss';

export const CatalogStockFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const isInStock = searchParams.get('inStock') === 'true';

  const handleChange = (checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (checked) {
      params.set('inStock', 'true');
    } else {
      params.delete('inStock');
    }
    params.delete('page');
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <label className={styles.label}>
      <CheckBox checked={isInStock} onChange={handleChange} />
      <span className={`${styles.text} ${isInStock ? styles.active : ''}`}>
        Only in stock
      </span>
    </label>
  );
};

export default CatalogStockFilter;
