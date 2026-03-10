import Link from 'next/link';
import styles from './Header.module.scss';
import { routes } from '@config/routes';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href={routes.main.getRoute()} className={styles.logo}>
          <img src="/Frame.svg" alt="logo" />
          <img src="/Lalasia.svg" alt="Lalasia" />
        </Link>
        <ul className={styles.menu}>
          <li className={styles.active}>Products</li>
          <li>Categories</li>
          <li>About us</li>
        </ul>
        <div className={styles["user-tools"]}>
          <img src="/bag-2.svg" alt="cart" />
          <img src="/user.svg" alt="user" />
        </div>
      </div>
    </header>
  );
};

export default Header;