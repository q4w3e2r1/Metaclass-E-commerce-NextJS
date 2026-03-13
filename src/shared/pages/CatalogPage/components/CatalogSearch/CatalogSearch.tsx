import styles from './CatalogSerach.module.scss';
import CatalogSearchInput from './components/CatalogSearchInput';
import CatalogCategoryFilter from './components/CatalogCategoryFilter';
import CatalogPriceFilter from './components/CatalogPriceFilter';
import CatalogSortFilter from './components/CatalogSortFilter';

export const CatalogSearch = () => {
    return (
        <div className={styles.root}>
            <CatalogSearchInput />
            <div className={styles.filters}>
                <CatalogCategoryFilter />
                <CatalogPriceFilter />
                <CatalogSortFilter />
            </div>
        </div>
    );
};

export default CatalogSearch;