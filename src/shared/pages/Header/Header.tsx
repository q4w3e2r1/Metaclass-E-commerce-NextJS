'use client';
import { routes } from '@config/routes';
import CartModal from '@pages/CartModal';

import { useState } from 'react';
import { getToken } from '@/shared/api/auth/store';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import styles from './Header.module.scss';
import { useCart } from '@/shared/hooks/cart/useCartQuery';

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();
  const cartCount = cart?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  const handleCartClick = () => {
    const token = getToken();
    if (!token) {
      router.push(`${routes.auth.getRoute()}?redirect=${pathname}`);
      return;
    }
    setIsCartOpen(true);
  };
  return (
    <>
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
            <li
              className={
                pathname === routes.products.getRoute() ? styles.active : ''
              }
            >
              <Link href={routes.products.getRoute()}>Products</Link>
            </li>
            <li
              className={
                pathname === routes.categories.getRoute() ? styles.active : ''
              }
            >
              <Link href={routes.categories.getRoute()}>Categories</Link>
            </li>
            <li>About us</li>
          </ul>
          <div className={styles['user-tools']}>
            <button
              type="button"
              className={styles.iconBtn}
              onClick={handleCartClick}
            >
              <div className={styles.cartIconWrapper}>
                <div className={styles.icon}>
                  <Image src="/bag-2.svg" alt="cart" fill />
                </div>
                {cartCount > 0 && (
                  <span className={styles.badge}>
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </div>
            </button>
            <div className={styles.icon}>
              <Image src="/user.svg" alt="user" fill />
            </div>
          </div>
        </div>
      </header>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;