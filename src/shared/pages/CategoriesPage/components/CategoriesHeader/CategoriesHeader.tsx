import styles from './CategoriesHeader.module.scss';

export const CategoriesHeader = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Categories</h1>
      <div className={styles.description}>
        Explore our wide range of categories to find exactly what you are
        looking for. From furniture to electronics, we have something for
        everyone.
      </div>
    </div>
  );
};

export default CategoriesHeader;
