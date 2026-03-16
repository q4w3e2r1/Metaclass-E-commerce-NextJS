import Link from 'next/link';

import styles from '../../not-found.module.scss';

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Product not found</h2>
        <p className={styles.description}>
          The product may have been removed or the link is outdated
        </p>
        <Link href="/products" className={styles.link}>
          Back to catalog
        </Link>
      </div>
    </div>
  );
}
