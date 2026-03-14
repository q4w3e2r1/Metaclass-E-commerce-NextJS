'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { MultiDropdown } from '@components';

type Option = { key: string; value: string };

const RATING_OPTIONS: Option[] = [
  { key: '1', value: '★☆☆☆☆ 1' },
  { key: '2', value: '★★☆☆☆ 2' },
  { key: '3', value: '★★★☆☆ 3' },
  { key: '4', value: '★★★★☆ 4' },
  { key: '5', value: '★★★★★ 5 only' },
];

export const CatalogRatingFilter = () => {
  const [pending, setPending] = useState<Option[] | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const selected = RATING_OPTIONS.filter(
    (o) => o.key === searchParams.get('rating')
  );

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
      params.delete('rating');
    } else {
      params.set('rating', pending[0].key);
    }
    params.delete('page');
    router.push(`?${params.toString()}`, { scroll: false });
    setPending(null);
  };

  return (
    <MultiDropdown
      options={RATING_OPTIONS}
      value={displayed}
      onChange={handleChange}
      onClose={handleClose}
      getTitle={(v) => v.length ? v[0].value : 'Rating'}
    />
  );
};

export default CatalogRatingFilter;