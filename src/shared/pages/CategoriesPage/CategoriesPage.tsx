  import styles from './CategoriesPage.module.scss'
  import CategoriesHeader from './components/CategoriesHeader';
  import CategoriesList from './components/CategoriesList';

  const CatalogPage = () => {

    return (
      <div className={styles.wrap}>
        <div className={styles.root}>
          <CategoriesHeader/>
          <CategoriesList />
        </div>
      </div>
    )
  };

  export default CatalogPage;
