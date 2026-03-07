'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './Header.module.scss';

export const Header = () => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => router.push("/")}>
            <img src="/Frame.svg" alt="logo" />
            <img src="/Lalasia.svg" alt="Lalasia" />
        </div>
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