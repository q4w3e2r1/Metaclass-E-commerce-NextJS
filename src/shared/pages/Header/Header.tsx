import Link from 'next/link';
import styles from './Header.module.scss';
import { routes } from '@config/routes';
import Image from 'next/image';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
      <Link href={routes.main.getRoute()} className={styles.logo}>
        <div className={styles.logoFrame}>
          <Image src="/Frame.svg" alt="logo" fill />
        </div>
        <div className={styles.logoText}>
          <Image src="/Lalasia.svg" alt="Lalasia" fill />
        </div>
      </Link>
        <ul className={styles.menu}>
          <li className={styles.active}>
          <Link href={routes.products.getRoute()}>Products</Link>
          </li>
          <li>Categories</li>
          <li>About us</li>
        </ul>
        <div className={styles["user-tools"]}>
          <div className={styles.icon}>
            <Image src="/bag-2.svg" alt="cart" fill />
          </div>
          <div className={styles.icon}>
          <Image src="/user.svg" alt="user" fill />
        </div>
      </div>
    </div>
    </header>
  );
};

export default Header;