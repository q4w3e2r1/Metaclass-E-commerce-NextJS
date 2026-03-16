// CartItem.tsx
'use client';
import CheckBox from '@components/CheckBox';

import { useState } from 'react';

import Image from 'next/image';

import styles from './CartItem.module.scss';

type CartItemProps = {
  id: number;
  image: string;
  title: string;
  price: number;
  quantity: number;
  selected: boolean;
  onSelect: (id: number, checked: boolean) => void;
  onRemove: (id: number) => void;
  onQuantityChange: (id: number, quantity: number) => void;
};

export const CartItem = ({
  id,
  image,
  title,
  price,
  quantity,
  selected,
  onSelect,
  onRemove,
  onQuantityChange,
}: CartItemProps) => {
  return (
    <div className={styles.item}>
      <CheckBox
        checked={selected}
        onChange={(checked) => onSelect(id, checked)}
      />

      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="80px"
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.title}>{title}</div>

        <div className={styles.priceRow}>
          <div>
            <div className={styles.price}>${price * quantity}</div>
            {quantity > 1 && (
              <div className={styles.pricePerUnit}>${price} each</div>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.removeBtn}
            onClick={() => onRemove(id)}
          >
            Delete
          </button>

          <div className={styles.quantity}>
            <button
              type="button"
              className={styles.quantityBtn}
              onClick={() => onQuantityChange(id, Math.max(1, quantity - 1))}
            >
              −
            </button>
            <span className={styles.quantityValue}>{quantity}</span>
            <button
              type="button"
              className={styles.quantityBtn}
              onClick={() => onQuantityChange(id, quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
