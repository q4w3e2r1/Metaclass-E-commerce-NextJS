'use client';
import { Button } from '@components';

import { useCallback, useEffect, useState } from 'react';

import CheckBox from '@/shared/components/common/CheckBox';
import { useCart } from '@/shared/hooks/cart/useCartQuery';

import styles from './CartModal.module.scss';
import CartItem from './components/CartItem';

type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const { cart, addToCart, removeFromCart, deleteFromCart, isLoading } =
    useCart();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const items = cart ?? [];
  const allSelected = items.length > 0 && selectedIds.size === items.length;

  const handleSelect = (id: number, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      checked ? next.add(id) : next.delete(id);
      return next;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(
      checked ? new Set(items.map((i) => i.product.id)) : new Set()
    );
  };

  const handleRemove = async (productId: number) => {
    await deleteFromCart(productId);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(productId);
      return next;
    });
  };

  const handleRemoveSelected = async () => {
    const toDelete = [...selectedIds];
    setSelectedIds(new Set());
    await Promise.all(toDelete.map((id) => deleteFromCart(id)));
  };

  const handleQuantityChange = (id: number, newQty: number) => {
    const item = items.find((i) => i.product.id === id);
    if (!item) return;
    if (newQty > item.quantity) {
      addToCart(id);
    } else if (newQty < item.quantity && newQty > 0) {
      removeFromCart(id);
    }
  };

  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Cart</h2>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        {items.length > 0 && (
          <div className={styles.selectAll}>
            <CheckBox checked={allSelected} onChange={handleSelectAll} />
            <span className={styles.selectAllText}>Select all</span>
            <button
              type="button"
              className={styles.removeSelectedBtn}
              onClick={handleRemoveSelected}
              disabled={selectedIds.size === 0}
            >
              Delete selected
            </button>
          </div>
        )}

        <div className={styles.items}>
          {isLoading ? (
            <div className={styles.loading}>Loading...</div>
          ) : items.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>🛒</div>
              <div className={styles.emptyTitle}>Cart is empty</div>
              <div className={styles.emptySubtitle}>
                Add something from the catalog
              </div>
            </div>
          ) : (
            items.map((item) => {
              const imageUrl =
                item.product.images?.[0]?.formats?.small?.url ||
                item.product.images?.[0]?.url ||
                '';

              return (
                <CartItem
                  key={item.id}
                  id={item.product.id}
                  image={imageUrl}
                  title={item.product.title}
                  price={item.product.price}
                  quantity={item.quantity}
                  selected={selectedIds.has(item.product.id)}
                  onSelect={handleSelect}
                  onRemove={handleRemove}
                  onQuantityChange={handleQuantityChange}
                />
              );
            })
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.total}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalValue}>${total}</span>
            </div>
            <Button>Checkout</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
