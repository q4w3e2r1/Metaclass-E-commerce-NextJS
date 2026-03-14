'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@components';

const FILTER_PARAMS = ['categories', 'sort', 'priceFrom', 'priceTo', 'rating', 'inStock'];

export const ClearFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const hasFilters = FILTER_PARAMS.some((param) => searchParams.has(param));

  const handleClear = () => {
    const params = new URLSearchParams(searchParams.toString());
    FILTER_PARAMS.forEach((param) => params.delete(param));
    params.delete('page');
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Button onClick={handleClear} disabled={!hasFilters}
    style={{width:"160px"}}
    >
      Clear filters
    </Button>
  );
};

export default ClearFilters