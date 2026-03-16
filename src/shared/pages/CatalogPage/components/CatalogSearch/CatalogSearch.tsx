import styles from './CatalogSerach.module.scss';
import CatalogCategoryFilter from './components/CatalogCategoryFilter';
import CatalogPriceFilter from './components/CatalogPriceFilter';
import CatalogRatingFilter from './components/CatalogRatingFilter';
import CatalogSearchInput from './components/CatalogSearchInput';
import CatalogSortFilter from './components/CatalogSortFilter';
import CatalogStockFilter from './components/CatalogStockFilter';
import ClearFilters from './components/ClearFilters';

export const CatalogSearch = () => {
  return (
    <div className={styles.root}>
      <CatalogSearchInput />
      <div className={styles.filters}>
        <CatalogCategoryFilter />
        <CatalogPriceFilter />
        <CatalogSortFilter />
        <CatalogRatingFilter />
        <CatalogStockFilter />
      </div>
      <ClearFilters />
    </div>
  );
};

export default CatalogSearch;
