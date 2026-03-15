"use client";
import { Button } from '@components';
import { useCart } from '@hooks/cart/useCartQuery';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getToken } from '@api/auth/store';
import { routes } from '@config/routes';
import type { ReactNode } from 'react';

interface CartButtonProps {
  productId: number;
  className?: string;
  children?: ReactNode;
}

export const CartButton = ({ 
  productId, 
  className = '',
  children 
}: CartButtonProps) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const [showLoading, setShowLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  const isInCart = useMemo(() => {
    return cart?.some(item => item.product.id === productId) ?? false;
  }, [cart, productId]);
  
  const prevIsInCartRef = useRef(isInCart);

  useEffect(() => {
    if (prevIsInCartRef.current !== isInCart && showLoading) {
      setShowLoading(false);
    }
    prevIsInCartRef.current = isInCart;
  }, [isInCart, showLoading]);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const token = getToken();
    if (!token) {
      router.push(`${routes.auth.getRoute()}?redirect=${pathname}`);
      return;
    }

    setShowLoading(true);
    
    try {
      if (isInCart) {
        await removeFromCart(productId);
      } else {
        await addToCart(productId);
      }
    } catch {
      setShowLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={className}
      loading={showLoading}
      minWidth={155}
    >
      {children || (isInCart ? "Delete from Cart" : "Add to Cart")}
    </Button>
  );
};

export default CartButton;