'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useRef, useMemo } from 'react';
import { Input } from '@components';
import { ArrowDownIcon } from '@components';
import styles from './CatalogPriceFilter.module.scss';

const PRICE_PRESETS = [10, 25, 50, 100, 500, 1000];

export const CatalogPriceFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');

  const activePriceFrom = searchParams.get('priceFrom') ?? '';
  const activePriceTo = searchParams.get('priceTo') ?? '';

  const getTitle = () => {
    if (activePriceFrom && activePriceTo) return `$${activePriceFrom} — $${activePriceTo}`;
    if (activePriceTo) return `Up to $${activePriceTo}`;
    if (activePriceFrom) return `From $${activePriceFrom}`;
    return '';
  };

  const applyFilter = (from: string, to: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (from) params.set('priceFrom', from); else params.delete('priceFrom');
    if (to) params.set('priceTo', to); else params.delete('priceTo');
    params.delete('page');
    router.push(`?${params.toString()}`);
  };

  const handlePreset = (preset: number) => {
    setPriceTo(String(preset));
  };

  const close = () => {
    if (priceFrom !== activePriceFrom || priceTo !== activePriceTo) {
      applyFilter(priceFrom, priceTo);
    }
    setIsOpen(false);
  };

  const handleOpen = () => {
    setPriceFrom(activePriceFrom);
    setPriceTo(activePriceTo);
    setIsOpen(true);
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onBlur={(e) => {
        if (containerRef.current?.contains(e.relatedTarget as Node)) return;
        close();
      }}
    >
      <div
        className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ''}`}
        onClick={() => isOpen ? close() : handleOpen()}
      >
        <Input
          value={isOpen ? '' : getTitle()}
          onChange={() => {}}
          placeholder="Price"
          afterSlot={<ArrowDownIcon color="secondary" />}
          cursor='pointer'
          readOnly
        />
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Price up to</div>
            <div className={styles.presets}>
              {PRICE_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  className={`${styles.preset} ${priceTo === String(preset) ? styles.presetActive : ''}`}
                  onClick={() => handlePreset(preset)}
                >
                  ${preset}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>Custom range</div>
            <div className={styles.range}>
              <Input
                value={priceFrom}
                onChange={(v) => setPriceFrom(v.replace(/\D/g, ''))}
                placeholder="From"
              />
              <span className={styles.rangeSeparator}>—</span>
              <Input
                value={priceTo}
                onChange={(v) => setPriceTo(v.replace(/\D/g, ''))}
                placeholder="To"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogPriceFilter