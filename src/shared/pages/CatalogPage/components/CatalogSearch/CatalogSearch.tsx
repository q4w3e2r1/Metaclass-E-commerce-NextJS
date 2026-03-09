import styles from './CatalogSerach.module.scss';
import CatalogSearchInput from './components/CatalogSearchInput';
import CatalogCategoryFilter from './components/CatalogCategoryFilter';

export const CatalogSearch = () => {
    return (
        <div className={styles.root}>
            <CatalogSearchInput />
            <CatalogCategoryFilter />
        </div>
    );
};

export default CatalogSearch;