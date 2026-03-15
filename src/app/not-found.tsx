import Link from 'next/link';
import styles from './not-found.module.scss';
import { routes } from '@config/routes';

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.code}>404</div>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.description}>
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Link href={routes.products.getRoute()} className={styles.link}>
          Back to products
        </Link>
      </div>
    </div>
  );
}