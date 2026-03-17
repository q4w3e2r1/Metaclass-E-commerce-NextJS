'use client';
import { getToken } from '@api/auth/store';
import { Button } from '@components';
import { routes } from '@config/routes';
import { useCart } from '@hooks/cart/useCartQuery';

import { useMemo } from 'react';
import type { ReactNode } from 'react';

import { usePathname, useRouter } from 'next/navigation';

interface CartButtonProps {
  productId: number;
  className?: string;
  children?: ReactNode;
}

export const CartButton = ({
  productId,
  className = '',
  children,
}: CartButtonProps) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const router = useRouter();
  const pathname = usePathname();

  const isInCart = useMemo(() => {
    return cart?.some((item) => item.product.id === productId) ?? false;
  }, [cart, productId]);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const token = getToken();
    if (!token) {
      router.push(`${routes.auth.getRoute()}?redirect=${pathname}`);
      return;
    }

    if (isInCart) {
      await removeFromCart(productId);
    } else {
      await addToCart(productId);
    }
  };

  return (
    <Button onClick={handleClick} className={className} minWidth={155}>
      {children || (isInCart ? 'Delete from Cart' : 'Add to Cart')}
    </Button>
  );
};

export default CartButton;
