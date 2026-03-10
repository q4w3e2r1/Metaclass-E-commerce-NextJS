import Link from 'next/link';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Товар не найден</h2>
        <p className={styles.description}>
          Возможно, товар был удалён или ссылка устарела
        </p>
        <Link href="/products" className={styles.link}>
          Вернуться к каталогу
        </Link>
      </div>
    </div>
  );
}