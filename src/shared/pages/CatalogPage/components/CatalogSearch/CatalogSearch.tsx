import styles from './CatalogSerach.module.scss';
import CatalogSearchInput from './components/CatalogSearchInput';
import CatalogCategoryFilter from './components/CatalogCategoryFilter';
import CatalogPriceFilter from './components/CatalogPriceFilter';
import CatalogSortFilter from './components/CatalogSortFilter';
import ClearFilters from './components/ClearFilters';
import CatalogRatingFilter from './components/CatalogRatingFilter';
import CatalogStockFilter from './components/CatalogStockFilter';

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