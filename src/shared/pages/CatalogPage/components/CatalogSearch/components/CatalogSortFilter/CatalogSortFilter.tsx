'use client';
import { MultiDropdown } from '@components';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';

type Option = { key: string; value: string };

const SORT_OPTIONS: Option[] = [
  { key: 'price:asc', value: 'Cheapest first ↑' },
  { key: 'price:desc', value: 'Most expensive first ↓' },
];

export const CatalogSortFilter = () => {
  const [pending, setPending] = useState<Option[] | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const selected = useMemo(() => {
    const sort = searchParams.get('sort');
    return SORT_OPTIONS.filter((o) => o.key === sort);
  }, [searchParams]);

  const displayed = pending ?? selected;

  const handleChange = (selected: Option[]) => {
    if (!selected.length) {
      setPending([]);
      return;
    }
    const last = selected[selected.length - 1];
    setPending(displayed.some((o) => o.key === last.key) ? [] : [last]);
  };

  const handleClose = () => {
    if (pending === null) return;
    const params = new URLSearchParams(searchParams.toString());
    if (!pending.length) {
      params.delete('sort');
    } else {
      params.set('sort', pending[pending.length - 1].key);
    }
    params.delete('page');
    router.push(`?${params.toString()}`);
    setPending(null);
  };

  return (
    <MultiDropdown
      options={SORT_OPTIONS}
      value={displayed}
      onChange={handleChange}
      onClose={handleClose}
      getTitle={(v) => v.length ? v[v.length - 1].value : 'Sort by price'}
    />
  );
};

export default CatalogSortFilter;