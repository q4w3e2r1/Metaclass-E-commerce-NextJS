import {
  getCategories,
  getTopProductsByCategory,
} from '@api/categories.server';

import styles from './CategoriesList.module.scss';
import CategoryCard from './components/CategoryCard';

export const CategoriesList = async () => {
  const categories = await getCategories();

  const categoriesWithProducts = await Promise.all(
    categories.map(async (category) => {
      const { items, total } = await getTopProductsByCategory(category.id);
      return { category, products: items, total };
    })
  );

  return (
    <div className={styles.list}>
      <div className={styles.results}>
        <h2 className={styles.total}>Total categories</h2>
        <div className={styles.amount}>{categories.length}</div>
      </div>

      <div className={styles.listCards}>
        {categoriesWithProducts.map(({ category, products, total }) => (
          <CategoryCard
            total={total}
            key={category.id}
            category={category}
            products={products}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
