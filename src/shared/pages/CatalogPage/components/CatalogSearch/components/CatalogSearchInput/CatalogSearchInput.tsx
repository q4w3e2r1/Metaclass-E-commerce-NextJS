'use client';
import { Button, Input } from '@components';

import { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import styles from './CatalogSearchInput.module.scss';

export const CatalogSearchInput = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setSearchValue(searchParams.get('search') ?? '');
  }, [searchParams]);

  const handleSearchSubmit = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (!searchValue.trim()) {
      params.delete('search');
    } else {
      params.set('search', searchValue.trim());
    }

    params.delete('page');
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className={styles.search}>
      <Input
        value={searchValue}
        placeholder="Search product"
        onChange={setSearchValue}
      />
      <Button onClick={handleSearchSubmit} minWidth={137}>
        Find now
      </Button>
    </div>
  );
};

export default CatalogSearchInput;
