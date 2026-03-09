"use client";
import { Button } from '@components';
import { useCart } from '@hooks/cart/useCartQuery';
import { useState, useEffect, useRef, useMemo } from 'react';
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

    setShowLoading(true);
    
    try {
      if (isInCart) {
        await removeFromCart(productId);
      } else {
        await addToCart(productId);
      }
    } catch (error) {
      setShowLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={className}
      loading={showLoading}
    >
      {children || (isInCart ? "Delete from Cart" : "Add to Cart")}
    </Button>
  );
};

export default CartButton;