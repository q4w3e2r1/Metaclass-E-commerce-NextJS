import React from 'react';

import Image from 'next/image';

import Text from '../Text';
import styles from './Card.module.scss';

export type CardProps = {
  className?: string;
  image: string;
  captionSlot?: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  contentSlot?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  actionSlot?: React.ReactNode;
  priority?: boolean;
  price?: number;
  discountPercent?: number;
};

const Card: React.FC<CardProps> = ({
  className = '',
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
  priority = false,
  price,
  discountPercent,
}) => {
  const hasDiscount = discountPercent && discountPercent > 0 && price;
  const discountedPrice = hasDiscount
    ? Math.round(price * (1 - discountPercent / 100))
    : null;

  return (
    <div className={`${styles.card} ${className}`} onClick={onClick}>
      <div className={styles.imageWrapper}>
        {hasDiscount && (
          <div className={styles.discountBadge}>-{discountPercent}%</div>
        )}
        <Image
          src={image}
          alt={`Картинка карточки ${title}`}
          fill
          sizes="(max-width: 768px) 100vw, 360px"
          className={styles.image}
          priority={priority}
        />
      </div>
      <div className={styles.contentCard}>
        <div className={styles.contentText}>
          {captionSlot && (
            <Text view="p-14" tag="p" weight="medium" color="secondary">
              {captionSlot}
            </Text>
          )}
          <Text color="primary" weight="medium" maxLines={2} tag="p" view="p-20">
            {title}
          </Text>
          <Text color="secondary" weight="normal" maxLines={3} tag="p" view="p-16">
            {subtitle}
          </Text>
        </div>
        <div className={styles.footer}>
          <div className={styles.priceBlock}>
            {hasDiscount ? (
              <>
                <span className={styles.priceNew}>${discountedPrice}</span>
                <span className={styles.priceOld}>${price}</span>
              </>
            ) : (
              <div className={styles.contentSlot}>${contentSlot}</div>
            )}
          </div>
          {actionSlot}
        </div>
      </div>
    </div>
  );
};

export default Card;